import React, { useState, useContext } from 'react';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { AuthContext } from '../../AuthProvider';
import { Toast } from 'react-bootstrap';

function hashPassword(password, saltRounds) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginToast, setShowLoginToast] = useState(false);
  const saltRounds = 10; // number of salt rounds to use for hashing
  const { setAuthInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

        const hashedPassword = await hashPassword(password, saltRounds);
        console.log('after - after hashed password : ' + hashedPassword)

        fetch('https://backend-nodejs-auth-data-pdf.herokuapp.com/api/auth', {
        method: 'POST',
        body: JSON.stringify({ email: email, password: hashedPassword }),
        headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
        console.log('response is : ' + JSON.stringify(response))
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to authenticate');
        }
        })
        .then(async data => {
            const dataPassword = data.searchResult.password
            const dataRole = data.searchResult.role
            // compare the hashed password in the response with the plain text password
            const match = await bcrypt.compare(password, dataPassword);
            if (match) {
                // Set the auth state and save to local storage
                setAuthInfo({ token: {}, role:dataRole });
                console.log('authenticated successfully');
                setShowLoginToast(true);

        } else {
            console.log('incorrect password');
        }
        })
        .catch(error => {
        console.error(error);
        });

      } catch (error) {
        console.error(error);
      }
    
  };
  return (
  <div className='wrapper bg-dark d-flex align-items-center justify-content-center'>
          <Toast show={showLoginToast} onClose={() => {setShowLoginToast(false);navigate('/');window.location.reload()}} className="toast-overlay">
        <Toast.Header >
          <strong className="mr-auto">Logged In!</strong>
        </Toast.Header>
        <Toast.Body>"You have successfully logged in!"</Toast.Body>
      </Toast>
        <div className='login rounded p-4'>
            <div className='d-flex align-items-center justify-content-center'>
            <h2 className='mb-3'> Login</h2>
            </div>
            <form onSubmit={handleSubmit} className='needs-validation'>
            <div className='form-group was-validated mb-3 rounded'>
                <label htmlFor='email' className='form-label'>
                Email Address
                </label>
                <input
                type='email'
                className='form-control'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                />
            </div>
            <div className='form-group was-validated mb-3 rounded'>
                <label htmlFor='password' className='form-label'>
                Password
                </label>
                <input
                type='password'
                className='form-control'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                />
            </div>

            <div className='d-flex align-items-center justify-content-center'>
                <button type='submit' className='btn btn-success block mt-2'>
                Log In
                </button>
            </div>
            </form>
        </div>
        </div>

  );
}

export default LoginForm;