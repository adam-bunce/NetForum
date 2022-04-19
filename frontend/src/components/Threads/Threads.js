import { React, Component }  from 'react';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';

import './threads.css'
import Thread from '../Thread/Thread';

export default class Threads extends Component{
  constructor(props){
    super(props)

  }

  render(){
     
      return(
        <div className='threadContainer'>
            {/* each thread should have its own onclick redirect thing that renders the posts with that thread ID */}
            {this.props.threadData.map( x => 

              
                <Thread threadData = {x}



            />)}
        </div>
      )
  }

}