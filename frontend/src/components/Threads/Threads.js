import { React, Component }  from 'react';
import './threads.css'
import Thread from '../Thread/Thread';
import {BrowserRouter , Routes, Route, Link} from 'react-router-dom'
import ThreadForm from '../threadForm/ThreadForm';
import Header from '../Header/Header';

export default class Threads extends Component{
  constructor(props){
    super(props)

  }

  render(){
     
      return(
        <>
          <ThreadForm />


          <Header text="Threads"/>
          <div className='links'>
          {/* each thread should have its own onclick redirect thing that renders the posts with that thread ID */}
      
          {this.props.threadData.map( x => 
          
            <Link className='linkStyle' to={`/thread` + x.threadID} >
              <Thread threadData = {x}/>
            </Link>)
          }
          </div> 
         
       
        </>
      )
  }

}