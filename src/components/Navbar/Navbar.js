import React, { useContext, useState } from 'react';
import './Navbar.css';
import { AuthContext } from '../../AuthProvider';
import { Link } from "react-router-dom";

export default function Navbar() {
  const { authState } = useContext(AuthContext);
// console.log('authState ' + JSON.stringify(authState))

// console.log('authState.token ' + authState.token)
// console.log('authState.token === null ' + authState.token === 'null')

const { setAuthInfo } = useContext(AuthContext);
const [toggleMenu, setToggleMenu] = useState(false);

  return(
<nav className='navbar navbar-expand-lg navbar-light'>
  <div className='container'>
    <Link to="/">
      <a className='navbar-brand nav-link navbar-nav'>Home</a>
    </Link>
    <button 
      className='navbar-toggler navbar-toggler-right' 
      type='button' 
      aria-controls='navbarNav' 
      aria-expanded='false' 
      aria-label='Toggle navigation'
      onClick={() => setToggleMenu(!toggleMenu)}>
      <span className='navbar-toggler-icon'></span>
    </button>
    <div className={`collapse navbar-collapse ${toggleMenu ? 'show' : ''}`} id='navbarNav'>
      {(authState.token === 'null' && authState.role === 'null')? (
        <ul className='navbar-nav ml-auto'>
          <li className='nav-item'>
            <Link to="/">
              <a className='nav-link navbar-nav'>Home</a>
            </Link>
          </li>
          <li className='nav-item'>
            <Link to="/login">
              <a className='nav-link'>Log In </a>
            </Link>
          </li>
          <li className='nav-item'>
            <Link to="/register">
              <a className='nav-link'>Sign In</a>
            </Link>
          </li>
        </ul>          
      ):
      <ul className='navbar-nav ml-auto'>
        <Link to="/">
          <a className='nav-link navbar-nav'>Home</a>
        </Link>
        {authState.role === '1' && (
        <>
          <li className='nav-item'>
            <Link to="/companies">
              <a className='nav-link'>Companies </a>
            </Link>
          </li>
        </>
        )}
        <button
          className='button'
          onClick={() => {setAuthInfo({ token: null, role: null });window.location.reload()}}
        >
          <Link to="/">
            <li className='nav-item'>
              <a className='nav-link'>Log Out</a>
            </li>
          </Link>
        </button>
      </ul> 
      }
    </div>
  </div>
</nav>
  );
}



