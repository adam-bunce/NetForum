import axios from 'axios'
import React, { Component }  from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import './App.css';

import Header from './components/Header/Header'
import Posts from './components/Posts/Posts'
import Threads from './components/Threads/Threads';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';


class App extends Component{
  constructor(props){
    super(props)

    this.state = {posts: null, threads: null}
    this.getPosts = this.getPosts.bind(this);
    this.getThreads = this.getThreads.bind(this);
  }


  async getPosts(){
    try {
      const { data } = await axios.get("http://localhost:8000/api/posts")
      this.setState({posts: data})
    } catch (error) {
      console.log(error.message);
    }
  };


  async getThreads(){
    try {
      const { data } = await axios.get("http://localhost:8000/api/threads")
      this.setState({threads: data})
    } catch (error) {
      console.log(error.message);
    }
  };


  componentDidMount(){
    this.getPosts()
    this.getThreads()
  }

  render(){
    // render loading gif if the posts/threads havent been gotten
    if (!this.state.posts || !this.state.threads){
      return(
        <>
          <Header text="NetForum" />
          <div className='loadingData'>
              <img src="output-onlinegiftools.gif" alt="loading"></img>
          </div>
        </>)

    }

    // render threads if posts/threads have been gotten
    return (
      <>
        <BrowserRouter>
          <Header text="NetForum" />
          <ScrollToTop /> 

          <Routes>
            <Route path="/" element={<Threads threadData = {this.state.threads}/>} />

            {/* filter the posts being passed in to the posts prop by filter the json posts object based on the threadID (x.threadID) and the post's object's inThread attribute */}
            {/* literally no clue what this does anymore ngl */}
            {this.state.threads.map( x => <Route path={`/thread` + x.threadID} element={<Posts posts={this.state.posts.filter(post => post.inThread === x.threadID)} thread = {x}/>} />)}

            {/* render if the path doesnt exist */}
            <Route path="*" element={<img src="pageNotFound.gif" alt="page not found"/>} />
            
          </Routes>
        </BrowserRouter>
      </>
      );
    } 
}

export default App; 
