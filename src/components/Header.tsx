import React from 'react'
import { Link } from 'react-router-dom'
interface IMyProps {
  playerdata: any;
}
const Header = (props:IMyProps) => {
  return (
      <>
      <div className="container-fluid">
        <div className='head-tabs position-relative my-3'>
          <div className='row mx-0'>
            <div className='col-md-10 mx-auto'>
              <img className='position-absolute start-0 logo' src='../logo.png' alt='Logo'/>
              <h5 className='position-absolute end-0'><small className='text-white'>{props?.playerdata?.data?.username},</small> ${props?.playerdata?.data?.balance}</h5>
            </div>
          </div>  
          <ul className="nav nav-tabs justify-content-center" role="tablist">
            <li className="nav-item">
              <Link to="/live" className="nav-link text-uppercase rounded-0 " data-toggle="tab">Live Casino</Link>
            </li>
            <li className="nav-item">
              <Link to="/casino" className="nav-link text-uppercase rounded-0 " data-toggle="tab" >Casino</Link>
            </li>
          </ul>
        </div>  
      </div>

</>
  )
}

export default Header