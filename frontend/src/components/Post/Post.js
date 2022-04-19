import { React, Component }  from 'react';
import './post.css'

export default class Post extends Component{
  constructor(props){
    super(props)

    this.state = {image_size: '50%'}
    this.changeImageSize = this.changeImageSize.bind(this);
    }

    changeImageSize(){
        if (this.state.image_size === 'auto'){
            this.setState({image_size: '50%'})
        }else{
            this.setState({image_size: 'auto'})
        }
    }

    render(){
        // render the post image only if it exists
        let postImage;
        if (this.props.postData.selectedFile != null){
            
            postImage = 
                <div className='dib' onClick={this.changeImageSize}> 
                    <img id="image" className='mouseOverImage' src={this.props.postData.selectedFile} 
                    width={this.state.image_size} alt="postImage" /> 
                </div>
        }else{
            postImage = <div></div>
        }

        return(
            <div className='borderBox'>
                <div className='postMetaData'>ID {this.props.postData.postID}, {this.props.postData.createdAt} , In Thread: {this.props.postData.inThread}</div>
                <div>{this.props.postData.postText}</div>
                {postImage}
            </div>
            
    )}
   



}