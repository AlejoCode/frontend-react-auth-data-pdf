import React, { useContext } from 'react';
import './Footer.css';
import { AuthContext } from '../../AuthProvider';

export default function Footer() {
    const { authState } = useContext(AuthContext);

  return(
    <footer className='footer fixed-bottom p-1'>
      <div className='container '>
        <div className='row'>
        {authState ?
        <>
        <div className='col-12'>
        <h6> Done By <a href='https://github.com/AlejoCode' target='_blank' rel='noopener noreferrer'>AlejoCode</a>  </h6>
        <h6> daniel.salgado02@gmail.com </h6>
        <h6> +57 302 741 05 34 </h6>
        </div>
        </>

        :
            <div className='col-12'>
                Please login or register for free !
            </div>
        }
        </div>
      </div>
    </footer>
  );
}




