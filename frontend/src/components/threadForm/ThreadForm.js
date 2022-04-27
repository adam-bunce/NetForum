import axios from 'axios'
import React, { Component }  from 'react'
import FileBase from 'react-file-base64'
import './threadForm.css';

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


  async createThread(){
      try{
          await axios.post("https://adams-imageboard.herokuapp.com/api/threads", {threadText: this.state.inputBoxText, threadImage: this.state.filename || null})
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
              <input type="text" onChange={this.setInputtedTextToVariable}></input> <br/>
              <FileBase type='file' multiple={false} onDone={({base64}) => this.setState({filename: base64}) }/> <br/>
              <input className='oldStyleBorders' type="submit"  value="Post" onClick={this.createThread}></input>
          </form>
        </div>
      )
  }


}


