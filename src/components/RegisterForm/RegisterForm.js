import React, { useState, useContext } from 'react';
import './RegisterForm.css';
import bcrypt from 'bcryptjs';
import { AuthContext } from '../../AuthProvider';
import { useNavigate } from 'react-router-dom';
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
function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [showToast, setShowToast] = useState(false);
  const saltRounds = 10; // number of salt rounds to use for hashing
  const { setAuthInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    
    try {
      console.log('register - before password : ' + password)
      const hashedPassword = await hashPassword(password, saltRounds); // hash the password
      console.log('register - after hashed password : ' + hashedPassword)
     
      const response = await fetch('https://backend-nodejs-auth-data-pdf.herokuapp.com/api/users', {
        method: 'POST',
        body: JSON.stringify({ email: email, password: hashedPassword, name: name, role: role }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        const data = await response.json();
        setAuthInfo({ token: data.token, role: data.role });
        setShowToast(true);
      } else {
        throw new Error('Failed to register');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='wrapper bg-dark d-flex align-items-center justify-content-center'>
        <Toast show={showToast} onClose={() => {setShowToast(false);navigate('/');window.location.reload()}} className="toast-overlay">
        <Toast.Header >
          <strong className="mr-auto">Registered!</strong>
        </Toast.Header>
        <Toast.Body>"You have successfully register!"</Toast.Body>
      </Toast>
      <div className='register rounded p-4'>
        <div className='d-flex align-items-center justify-content-center'>
          <h2 className='mb-3'> Register</h2>
        </div>
        <form onSubmit={handleSubmit} className='needs-validation'>
        <div className='form-group was-validated mb-3 rounded'>
            <label htmlFor='name' className='form-label'>
              Name
            </label>
            <input
              type='text'
              className='form-control'
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
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
          <div className='form-group was-validated mb-3 rounded'>
            <label htmlFor='confirmPassword' className='form-label'>
              Confirm Password
            </label>
            <input
              type='password'
              className='form-control'
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </div>
          <div className='form-group was-validated mb-3 rounded'>
            <label htmlFor='role' className='form-label'>
              Role
            </label>
            <select
              className='form-control'
              value={role}
              onChange={(event) => setRole(event.target.value)}
              required
            >
              <option value='' disabled>Select a role</option>
              <option value='1'>Admin</option>
              <option value='2'>User</option>
            </select>
          </div>
          <div className='d-flex align-items-center justify-content-center'>
            <button type='submit' className='btn btn-success block mt-2'>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;