import './threadForm.css';
import axios from 'axios'
import React, { Component }  from 'react'
import FileBase from 'react-file-base64'


// 99% of this code is duplicated from postForm, could combine into one component where api endpoint is passed as prop...?
export default class ThreadForm extends Component{
  constructor(props){
    super(props)

    this.state = {
        inputBoxText: '',
        filename: ''
    }

    this.setInputtedTextToVariable = this.setInputtedTextToVariable.bind(this);
    this.createThread = this.createThread.bind(this);
    this.setInputtedFile = this.setInputtedFile.bind(this);
  }

  // create post using api call and information inputted into form
    async createThread(){
        try{
            await axios.post("http://localhost:8000/api/threads", {threadText: this.state.inputBoxText, threadImage: this.state.filename || null})
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
          <form className='threadFormBox'>
              Create New Thread <br/>
              <input type="text" onChange={this.setInputtedTextToVariable}></input><br/>
              <FileBase type='file' multiple={false} onDone={({base64}) => this.setState({filename: base64}) }/>
              <br></br>
              <input type="submit"  value="Post" onClick={this.createThread}></input>
          </form>
        </div>
      )
  }


}


