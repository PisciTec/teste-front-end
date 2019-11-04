import React, { Component } from 'react';

import api, { API_KEY } from '../../services/api';

import './styles.css';
export default class Seacher extends Component{
    state ={
        videos: []
    }
    constructor(props){
        
        super(props);
        this.state = {
            value: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange(event) {
        this.setState({value:event.target.value});
    }
    loadVideos = async () =>{
        const response = await api.get(`?part=id,snippet&maxResults=24&q=${this.state.value}&key=${API_KEY}`);

        this.setState({videos: response.data.items})
        console.log(response.data);
        console.log(this.state.videos);
    }
    handleSubmit(event) {
        this.loadVideos();
        alert(`Um nome foi enviado ${this.state.value}`);
        event.preventDefault();
    }
    render(){
        return(
            <div className= "content">
                <form onSubmit={this.handleSubmit} className= "form-searcher">
                    <input type ="search" className = "youtube-searcher" placeholder ="Pesquisar" value= {this.state.value} onChange = {this.handleChange}/>
                </form> 
            </div>
        )
    } 
}