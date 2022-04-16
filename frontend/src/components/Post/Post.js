import { React, Component }  from 'react';
import './post.css'

export default class Header extends Component{
  constructor(props){
    super(props)

    this.state = {image_size: '200px'}
    this.changeImageSize = this.changeImageSize.bind(this);
}



changeImageSize(){
    if (this.state.image_size === '100%'){
        this.setState({image_size: '200px'})
    }else{
        this.setState({image_size: '100%'})
    }
    
  }


//TODO make header, post, post(s) and createPost componenets
render(){

    // render the post image only if it exists
    let postImage;
    if (this.props.postData.selectedFile != null){
        postImage = <div  onClick={this.changeImageSize}> <img id="image" className='mouseOverImage' src={ this.props.postData.selectedFile } width={this.state.image_size} alt="postImage" /> </div>
    }else{
        postImage = <div></div>
    }

    return(

        <div className='borderBox'>
            <div className='postMetaData'>ID {this.props.postData.postID}, {this.props.postData.createdAt} </div>
            <div>{this.props.postData.postText}</div>
            {postImage}
        </div>
    )}
   



}