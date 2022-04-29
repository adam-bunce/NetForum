import axios from 'axios'
import React, { Component }  from 'react'
import FileBase from 'react-file-base64'
import './threadForm.css';

export default class ThreadForm extends Component{
  constructor(props){
    super(props)

 
    this.state = {
        inputBoxText: '',
        filename: '',
        postStatus: ''
    }

    this.setInputtedTextToVariable = this.setInputtedTextToVariable.bind(this);
    this.createThread = this.createThread.bind(this);
    this.setInputtedFile = this.setInputtedFile.bind(this);
  }


  async createThread(){
      try{
        // make sure post creation is valid
          if (this.state.inputBoxText === ""){
            if (this.state.filename === ""){
              this.setState({postStatus: "add a file or text"})
            }
          }else{
            this.setState({postStatus: "posting... (don't refresh)"})
          }
          await axios.post("https://adams-imageboard.herokuapp.com/api/threads", {threadText: this.state.inputBoxText, threadImage: this.state.filename || null})
          this.setState({postStatus: "posted!"})
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
          <form className='threadFormBox' >
              Create New Thread <br/>
              <input type="text" onChange={this.setInputtedTextToVariable} value={this.state.inputBoxText}></input> <br/>
              <FileBase type='file' multiple={false} onDone={({base64}) => this.setState({filename: base64}) }/> <br/>
              <input className='oldStyleBorders' type="button"  value="Post" onClick={this.createThread}></input>
              {this.state.postStatus}
          </form>
        </div>
      ) 
  }


}


