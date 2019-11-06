import React, { Component } from 'react';
import VideoDetails from '../../components/video_details';


export default class Video extends Component{
    render(){
        return(
            <div className="section">   
                <VideoDetails video_id ={this.props.match.params}/>
            </div>
        )
    } 
}