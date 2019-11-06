import React, { Component } from 'react';


import api, { API_KEY } from '../../services/api';

export default class VideoDetails extends Component{
    state = {
        video : {},
        snippet: {},
        statistics: {},
    }
    
    async componentDidMount(){
        const { video_id } = this.props.video_id;
        const response = await api.get(`videos?id=${video_id}&part=snippet,statistics&key=${API_KEY}`);

        this.setState({
            video: response.data.items[0],
            snippet : response.data.items[0].snippet,
            statistics : response.data.items[0].statistics,

        })
        console.log(response.data.items[0]);

        console.log(this.state.snippet);
        console.log(this.state.statistics);
    }
    render(){
        const { video : { id }, snippet, statistics  } = this.state;
        
        return(
            <div className="container">
                <div className= "return-page">
                    <a href = "#"><i className="fas fa-chevron-left"></i></a>
                </div>
                <div className="video">
                    <h2>{snippet.title}</h2>
                    <iframe width="560" height="315" src={`https://www.youtube.com/embed/${id}`} title="Embed Video"></iframe>
                    <div className= "video-statistics">
                        <div className= "channel-likes">
                        
                            <h3>
                                {snippet.channelTitle}
                                <i className="fas fa-thumbs-up">{statistics.likeCount}</i>
                                <i className="fas fa-thumbs-down">{statistics.dislikeCount}</i>                     
                            </h3>
                        </div>
                        <p>{snippet.description}</p>
                        <h4>
                        <i className="fas fa-eye">{statistics.viewCount}</i>
                        </h4>

                    </div>
                </div>
            </div>
        )
    }
}