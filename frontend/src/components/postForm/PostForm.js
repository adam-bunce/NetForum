import axios from 'axios'
import React, { Component }  from 'react'
import FileBase from 'react-file-base64'
import './postForm.css';

export default class PostForm extends Component{
  constructor(props){
    super(props)

    this.state = {
        inputBoxText: '',
        filename: '',
        postStatus: '',
    }

    this.setInputtedTextToVariable = this.setInputtedTextToVariable.bind(this);
    this.createPost = this.createPost.bind(this);
    this.setInputtedFile = this.setInputtedFile.bind(this);
  }


  // create post using api call and information inputted into form
    async createPost(){


        try{
          if (this.state.inputBoxText === ""){
            if (this.state.filename === ""){
              this.setState({postStatus: "add a file or text"})
            }else{
              this.setState({postStatus: "posting... (don't refresh)"})
            }
          }else{
            this.setState({postStatus: "posting... (don't refresh)"})
          }
          // await isnt async, so this blocks the therad so we can do the status update on post timing here so the user doesnt refresh
            await axios.post("https://adams-imageboard.herokuapp.com/api/posts", {postText: this.state.inputBoxText, inThread: this.props.threadID, selectedFile: this.state.filename || null})
            this.setState({postStatus: "posted"})
            

            
        }catch (error){
            console.log(error.message)
        }

        this.setState({inputBoxText: ""})
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
              <input type="text" onChange={this.setInputtedTextToVariable} value={this.state.inputBoxText}></input> <br/>
              <FileBase type='file' multiple={false} onDone={({base64}) => this.setState({filename: base64}) }/> <br/>
              <input  className='oldStyleBorders' type="button"  value="Post" onClick={this.createPost}></input>
              {this.state.postStatus}
          </form>
          
        </div>
      )
  }

}


