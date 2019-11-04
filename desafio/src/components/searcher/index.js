import React, { Component } from 'react';

import api, { API_KEY } from '../../services/api';

import './styles.css';

export default class Seacher extends Component{
    
        
//Declarando e definindo as váriaveis para o Input
    constructor(props){
        
        super(props);
        this.state = {
            value: '',
            videos: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    //Acionado na mudança do Input
    handleChange(event) {
        this.setState({value:event.target.value});
    }
    //Faz a requisição na API e salva as informações em videos
    loadVideos = async () =>{
        const response = await api.get(`?part=id,snippet&maxResults=24&q=${this.state.value}&key=${API_KEY}`);

        this.setState({videos: response.data.items})
        console.log(response.data);
        console.log(this.state.videos);

        const { snippet } = response.data.items;
        console.log(snippet);
    }
    handleSubmit(event) {
        this.loadVideos();
        //alert(`Um nome foi enviado ${this.state.value}`);
        event.preventDefault();
        const divEl = document.querySelector('div[class=content]');
        divEl.setAttribute("style", "margin-top:0.5rem;");
//
    }
    render(){
        return(
            <div className="container">
                <div className= "content">
                    <form onSubmit={this.handleSubmit} className= "form-searcher">
                        <input type ="search" className = "youtube-searcher" placeholder ="Pesquisar" value= {this.state.value} onChange = {this.handleChange}/>
                    </form> 
                </div>
                <div className="video-list">
                    {this.state.videos.map(videos => (
                        <article key={videos.id.videoId}>
                            <img alt= "thumbnail" src = {videos.snippet.thumbnails.medium.url}></img>
                            <div className ="video-details">
                                <strong>{videos.snippet.title}</strong>
                                <h4>{videos.snippet.channelTitle}</h4>
                                <p>{videos.snippet.description}</p>
                                <a href="#">DETALHES DO VIDEO</a>
                            </div>
                            
                        </article>


                    ))}
                </div>    
            </div>
        )
    }
     
}