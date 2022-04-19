import { React, Component }  from 'react';
import './posts.css'
import Post from '../Post/Post'
import PostForm from '../postForm/PostForm';
import Header from '../Header/Header';

export default class Posts extends Component{
  constructor(props){
    super(props)

  }

  render(){
      return(
        <>
        <PostForm />


       <Header text="Posts"/>

        <div className='postsContainer'>
        {this.props.posts.map( x => <Post postData = {x}/>)}
        </div>
        </>
      )
  }

}