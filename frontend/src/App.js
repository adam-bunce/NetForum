import './App.css';
import axios from 'axios'
import React, { Component }  from 'react'
import {BrowserRouter , Routes, Route, Link} from 'react-router-dom'
import Header from './components/Header/Header'

import PostForm from './components/postForm/PostForm'
import Posts from './components/Posts/Posts'

import ThreadForm from './components/threadForm/ThreadForm';
import Thread from './components/Thread/Thread';
import Threads from './components/Threads/Threads';


class App extends Component{
  constructor(props){
    super(props)

    this.state = {posts: null, threads: null}
    this.getPosts = this.getPosts.bind(this);
    this.getThreads = this.getThreads.bind(this);
  }

  // gets posts from 'http://localhost:8000/posts using api call
  async getPosts(){
    try {
      const { data } = await axios.get("http://localhost:8000/api/posts")
      this.setState({posts: data})
      console.log(data)
    } catch (error) {
      console.log(error.message);
    }
  };


  async getThreads(){
    try {
      const { data } = await axios.get("http://localhost:8000/api/threads")
      this.setState({threads: data})
      console.log("thread data")
      console.log(data)
    } catch (error) {
      console.log(error.message);
    }
  };

  // on page load try to get posts
  componentDidMount(){
    this.getPosts()
    this.getThreads()
  }

  render(){
    
    if (!this.state.posts || !this.state.threads){
      return(
        <>
          <Header text="NetForum" />
          <div className='loadingData'>
              <img src="output-onlinegiftools.gif" alt="loading Image"></img>
          </div>
        </>)

    }

    return (
      <>

          <BrowserRouter>
            <Header text="NetForum"/>

          
            <Routes>
            
              <Route path="/" element={<Threads threadData = {this.state.threads}/>} />
              <Route path="/thread0" element={<Posts posts={this.state.posts} />} />
              <Route path="*" element={<img src="21.gif"></img>} />
            
            </Routes>
          </BrowserRouter>

      
          {/* <Threads threadData = {this.state.threads}/> */}
        {/* <PostForm />
        <Posts posts={this.state.posts} /> */}
        </>
      );
    } 
}

export default App; 
