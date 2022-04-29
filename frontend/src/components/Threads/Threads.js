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
          <Header text="Catalog"/>
          <div className='threadsContainer'>
          <div ><Link  to={{}} className='oldStyleBorders ntd' onClick={() => window.location.reload()}>[ refresh ]</Link>  </div>
          </div>

          <div className='links'>
            
            {this.props.threadData.map( x => <Link className='linkStyle' to={`/thread` + x.threadID} ><Thread threadData = {x}/></Link>)}
          </div> 
        </>
      )
  }

}