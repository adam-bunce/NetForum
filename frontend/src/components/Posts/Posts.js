import { React, Component }  from 'react';
import './posts.css'
import Post from '../Post/Post'

export default class Posts extends Component{
  constructor(props){
    super(props)

  }

  render(){
      return(
        <div className='postsContainer'>
        {this.props.posts.map( x => <Post postData = {x}/>)}
        </div>
      )
  }

}