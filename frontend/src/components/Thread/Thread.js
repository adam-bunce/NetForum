import { React, Component }  from 'react';
import './thread.css'

export default class Thread extends Component{
    
    render(){
        // render the post image only if it exists
        let threadImage;
        if (this.props.threadData.threadImage != null){
            threadImage = 
                <div className='dib'> 
                    <img id="image" src={this.props.threadData.threadImage} alt="threadImage" width="55%"/> 
                </div>
        }else{
            threadImage = <div></div>
        }

        return(
            <div className='threadBox mouseOverThread'>
                {threadImage}
                <div className='ntd'>{this.props.threadData.threadText}</div>
                <div className='threadMetaData ntd'> ID: {this.props.threadData.threadID} Created: {this.props.threadData.createdAt} </div>
            </div>
    )}

}