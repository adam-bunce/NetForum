import './App.css';
import axios from 'axios'
import React, { Component }  from 'react'

import Header from './components/Header/Header'
import PostForm from './components/postForm/PostForm'
import Posts from './components/Posts/Posts'

class App extends Component{
  constructor(props){
    super(props)

    this.state = {posts: null, }
    this.getPosts = this.getPosts.bind(this);
  }

  // gets posts from 'http://localhost:5000/posts using api call
  async getPosts(){
    try {
      const { data } = await axios.get("http://localhost:8000/api/posts")
      this.setState({posts: data})
    } catch (error) {
      console.log(error.message);
    }
  };

  // on page load try to get posts
  componentDidMount(){
    this.getPosts()
  }

  render(){
    if (!this.state.posts){
      return(
        <>
          <Header />
          <div className='loadingData'>
              <img src="output-onlinegiftools.gif"></img>
          </div>
        </>)

    }

    return (
      <div>
         <Header />
         <PostForm />
         <Posts posts={this.state.posts} />
      </div>
      );
    }
}

export default App; 
