import './App.css';
import axios from 'axios'
import React, { Component }  from 'react'
import FileBase from 'react-file-base64'


import Header from './components/Header'

class App extends Component{
  constructor(props){
    super(props)

    this.state = {posts: null,
                  inputBoxText: '',
                  filename: ''}

    this.getPosts = this.getPosts.bind(this);
    this.setInputtedTextToVariable = this.setInputtedTextToVariable.bind(this);
    this.createPost = this.createPost.bind(this);
    this.setInputtedFile = this.setInputtedFile.bind(this);
    this.setText = this.setText.bind(this);
  }




// gets posts from 'http://localhost:5000/posts using api call
async getPosts(){
  

  try {
    const { data } = await axios.get("http://localhost:8000/api/posts")
    console.log(data)
    //var hold = (this.state.posts[4])
    //console.log(hold)
    console.log("---------HOLD---------")
    //var value = JSON.parse(hold)
    //console.log(value.selectedFile)
    console.log(typeof(data))                        // TODO this works, the third image base64 is here, need to display it in the react thing
    console.log("---------/HOLD---------")
    // data comes in as an array not json LOL
    this.setState({posts: data})
  } catch (error) {
    console.log(error.message);
  }
};


async createPost(){
  // console.log('filename: ' + this.state.filename)
  try{
    await axios.post("http://localhost:8000/api/posts", {postText: this.state.inputBoxText, selectedFile: this.state.filename || null})
    console.log('creating post')
  }catch (error){
    console.log(error.message)
  }
}



setText(){
  if (this.state.posts !== {}){
    if ('selectedFile' in this.state.posts[0]){
      return JSON.stringify(this.state.posts[0].selectedFile)
    }
  }
 else{
    return 'empty'
  }

}


setInputtedTextToVariable(event){
  this.setState({inputBoxText: event.target.value})
  console.log("set text")
}


setInputtedFile(event){
  this.setState({filename: event.target.value})
  console.log("set file")
}


componentDidMount(){
  this.getPosts()
}

  render(){

    if (!this.state.posts){
      
      return(
        <>
        <Header />
      <div className='loadingData'>
        <img src="output-onlinegiftools.gif"></img>
      </div>
      </>)
      
    }

    return (
      <div>
         <Header />

        {/* <div>{JSON.stringify(this.state)}</div> <-- that makes inputting  astrin gsuper fucking laggy*/}


        <br></br>
        
        <form>
          
          <input type="text" onChange={this.setInputtedTextToVariable}></input><br/>
          {/* <input type='file' onChange={this.setInputtedFile}></input>  */}

          
          <FileBase type='file' multiple={false} onDone={({base64}) => this.setState({filename: base64}) }/>

          <input type="submit"  value="Post" onClick={this.createPost}></input>
        </form>
     
        <div>{this.setText()}</div>
        <div><img src={ this.state.posts[4].selectedFile } width="200px" alt="Red dot"/></div>
        {this.state.inputBoxText}
      </div>
      );
    }
}

export default App;
