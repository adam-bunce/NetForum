import { React, Component }  from 'react';
import {Link} from 'react-router-dom'
import './posts.css'

import Post from '../Post/Post'
import PostForm from '../postForm/PostForm';
import Header from '../Header/Header';

export default class Posts extends Component{
  constructor(props){
    super(props)
    this.state = {image_size: '20%'}
    this.changeImageSize = this.changeImageSize.bind(this);
    }


    changeImageSize(){
        if (this.state.image_size === 'auto'){
            this.setState({image_size: '20%'})
        }else{
            this.setState({image_size: 'auto'})
        }
    }

    
  render(){
    let threadImage;
    if (this.props.thread.threadImage){
        threadImage = <div className='image' onClick={this.changeImageSize}> 
                        <img id="image" className='mouseOverImage' src={this.props.thread.threadImage}  
                         width={this.state.image_size} alt="postImage" /> 
                      </div>
    }

    return(
      <>
        <PostForm threadID = {this.props.thread.threadID}/>
        <Header text={ `Thread ` + this.props.thread.threadID}/>
        <div className='postsContainer'>
      <div>
        <Link  to={{}} className='oldStyleBorders ntd' onClick={() => window.location.reload()}>  [ refresh ]</Link>     
          <Link  to="/" className='oldStyleBorders ntd'>  [ back to catalog ]</Link>
          </div>
          <div className='borderBox'> 

            <div className='postMetaData'>
              <u className='OP'> OP </u>
              {this.props.thread.createdAt} <br/> 
            </div>

            {threadImage}
            {this.props.thread.threadText}
          </div>

          {this.props.posts.map( x => <Post postData = {x}/>)}
        </div>
      </>
    )
  }

}