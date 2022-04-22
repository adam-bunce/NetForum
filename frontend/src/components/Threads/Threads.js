import { React, Component }  from 'react';
import './threads.css'
import Thread from '../Thread/Thread';
import {Link} from 'react-router-dom'
import ThreadForm from '../threadForm/ThreadForm';
import Header from '../Header/Header';

export default class Threads extends Component{
  render(){
  
      return(
        <>
          <ThreadForm />
          <Header text="Threads"/>

          <div className='links'>
            {this.props.threadData.reverse().map( x => <Link className='linkStyle' to={`/thread` + x.threadID} ><Thread threadData = {x}/></Link>)}
          </div> 
        </>
      )
  }

}