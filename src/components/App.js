import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import axios from 'axios';
import Post from './Post/Post'




let baseURL = 'https://practiceapi.devmountain.com/api/posts';


class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.filter = this.filter.bind(this)
  }
  

  // getting the API and setting the state of the app to the data.
  componentDidMount() {
   axios.get(baseURL)
   .then( (response)=> {
    this.setState({ posts: response.data })
    console.log('success')
    }).catch(err => console.log(err))
  }






  //you want to be able to update any post. To do so, you need the id of the post that is being edited, and the text that is being passed. 
  //the id is a query 
  //the text is an object, body.

  updatePost(id, text) {
  axios.put(`${baseURL}?id=${id}`, {text})
  .then( res =>{
    this.setState({ posts: res.data })
  })
  }

  deletePost(id) {
    axios.delete(`${baseURL}?id=${id}`)
    .then( (res)=> {
      this.setState({ posts: res.data})
    })
  }

  createPost(text) {
    axios.post(baseURL, {text})
    .then((res)=>{
      this.setState({posts: res.data})
    }).catch(err=>console.log(err))
  }

  filter(text){
    axios.get(encodeURI(`${baseURL}/filter?text=${text}`))
    .then((res)=>{
      this.setState({posts: res.data})
    })
  }






  render() {
    const { posts } = this.state;
    
    return (
      <div className="App__parent">
        <Header 
          filter={this.filter}  
        />

        <section className="App__content">

        <Compose 
          createPost ={this.createPost}
        />

        { posts.map( (post) => <Post 
          text={ post.text } 
          date={ post.date } 
          key={ post.id } 
          updatePostFn = { this.updatePost }
          id ={ post.id }
          deletePost={ this.deletePost }
        />)}
        
        </section>
      </div>
    );
  }
}

export default App;
