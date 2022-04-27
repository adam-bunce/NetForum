import axios from 'axios'
import React, { Component }  from 'react'
import FileBase from 'react-file-base64'
import './postForm.css';

export default class PostForm extends Component{
  constructor(props){
    super(props)

    this.state = {
        inputBoxText: '',
        filename: ''
    }

    this.setInputtedTextToVariable = this.setInputtedTextToVariable.bind(this);
    this.createPost = this.createPost.bind(this);
    this.setInputtedFile = this.setInputtedFile.bind(this);
  }


  // create post using api call and information inputted into form
    async createPost(){
        try{
            await axios.post("http://localhost:8000/api/posts", {postText: this.state.inputBoxText, inThread: this.props.threadID, selectedFile: this.state.filename || null})
            
        }catch (error){
            console.log(error.message)
        }
  }
  

  setInputtedTextToVariable(event){
    this.setState({inputBoxText: event.target.value})
  }


  setInputtedFile(event){
    this.setState({filename: event.target.value})
  }


  render(){
      return(
        <div className='centerBox'>
          <form className='postFormBox'>
              Add Post <br/>
              <input type="text" onChange={this.setInputtedTextToVariable}></input> <br/>
              <FileBase type='file' multiple={false} onDone={({base64}) => this.setState({filename: base64}) }/> <br/>
              <input  className='oldStyleBorders' type="submit"  value="Post" onClick={this.createPost}></input>
          </form>
        </div>
      )
  }

}


