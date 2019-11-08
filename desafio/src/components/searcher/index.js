import React, { Component } from 'react';

import api, { API_KEY } from '../../services/api';

import './styles.css';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';

export default class Seacher extends Component {
    //Declarando e definindo as váriaveis para o Input
    constructor(props) {

        super(props);
        this.state = {
            value: '',
            videos: [],
            pageToken: '',
            isFetching: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    
    //Acionado na mudança do Input
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    //Faz a requisição na API e salva as informações em videos
     
    loadVideos = async () => {
        try{
            const response = await api.get(`search?part=id,snippet&maxResults=48&q=${this.state.value}&key=${API_KEY}`);

            this.setState({ videos: response.data.items, pageToken : response.data.nextPageToken })
            //console.log(response.data);
            //console.log(this.state.videos);

            //console.log(this.state.pageToken);
     } catch(err){
        let videoEl = document.querySelector('div[className=video-list]')
        let divEl = document.createElement('div')
        divEl.appendChild(document.createTextNode('Não foi encotrado o vídeo'))
        videoEl.appendChild(divEl);

        }
    }

    
    
    loadNewVideos = async () => {
        this.setState({ isFetching: true })
        const response = await api.get(`search?part=id,snippet&maxResults=24&q=${this.state.value}&key=${API_KEY}&pageToken=${this.state.pageToken}`);
        //console.log('Funcionando...');
        //console.log(response.data)
        setTimeout(() => { this.setState({ videos: [...this.state.videos, ...response.data.items], isFetching: false, pageToken : response.data.nextPageToken }); }, 1500 );
    }
    
    handleSubmit(event) {
        this.loadVideos();
        //alert(`Um nome foi enviado ${this.state.value}`);
        event.preventDefault();
        const divEl = document.querySelector('div[class=content]');
        divEl.setAttribute("style", "margin-top:0.5rem;");

    }
    render() {
        
        return (
            <div className="container">
                <div className="content">
                    <form onSubmit={this.handleSubmit} className="form-searcher">
                        <input type="search" className="youtube-searcher" placeholder="Pesquisar"
                            value={this.state.value} onChange={this.handleChange} />
                        <button>
                            <i className="fas fa-search fa-2x"></i>
                        </button>
                    </form>

                </div>
                    <InfiniteScroll
                            dataLength={this.state.videos.length}
                            next={this.loadNewVideos}
                            hasMore={true}
                            loader={this.state.isFetching && <h4>Loading...</h4>}
                        >
                            {this.state.videos.map(videos => (
                        <article key={videos.id.videoId}>
                            <img alt="thumbnail" src={videos.snippet.thumbnails.medium.url}></img>
                            <div className="video-details">
                                <strong>{videos.snippet.title}</strong>
                                <h4>{videos.snippet.channelTitle}</h4>
                                <p>{videos.snippet.description}</p>
                                <Link to={`/video/${videos.id.videoId}`}>DETALHES DO VIDEO</Link>
                            </div>
                        </article>
                    ))}
                        </InfiniteScroll>
            </div>
        )
    }
}
