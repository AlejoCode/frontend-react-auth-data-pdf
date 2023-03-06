import React, { useState, useContext } from 'react';
import './Companies.css';
import { useNavigate } from 'react-router-dom';

function CompanyForm() {
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [nit, setNit] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {

      const response = await fetch('https://backend-nodejs-auth-data-pdf.herokuapp.com/api/companies', {
        method: 'POST',
        body: JSON.stringify({ companyname: companyName, address: address, nit: nit, phone: phone }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('data : ' + data);
        console.log('company created successfully');
        navigate('/');
        // window.location.reload();
      } else {
        throw new Error('Failed to create company');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='wrapper bg-dark d-flex align-items-center justify-content-center'>
    <div className='company rounded p-4'>
      <div className='d-flex align-items-center justify-content-center'>
        <h2 className='mb-3'>Create a new company</h2>
      </div>
      <form onSubmit={handleSubmit} className='needs-validation'>
        <div className='form-group was-validated mb-3 rounded'>
          <label htmlFor='companyName' className='form-label'>
            Company Name
          </label>
          <input
            type='text'
            className='form-control'
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
            required
          />
        </div>
        <div className='form-group was-validated mb-3 rounded'>
          <label htmlFor='address' className='form-label'>
            Address
          </label>
          <input
            type='text'
            className='form-control'
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            required
          />
        </div>
        <div className='form-group was-validated mb-3 rounded'>
          <label htmlFor='nit' className='form-label'>
            NIT
          </label>
          <input
            type='text'
            className='form-control'
            value={nit}
            onChange={(event) => setNit(event.target.value)}
            required
          />
        </div>
        <div className='form-group was-validated mb-3 rounded'>
          <label htmlFor='phone' className='form-label'>
            Phone
          </label>
          <input
            type='text'
            className='form-control'
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
        </div>
        <div className='d-flex align-items-center justify-content-center'>
          <button type='submit' className='btn btn-success block mt-2'>
            Create Company
          </button>
        </div>
      </form>
    </div>
  </div>
  );
}

export default CompanyForm;