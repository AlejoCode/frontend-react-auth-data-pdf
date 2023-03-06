import React, { useState, useEffect } from 'react';
import './Dashboard.css';

export default function Dashboard() {

    const [companies, setCompanies] = useState([]);

    useEffect(() => {
      async function fetchCompanies() {
        const response = await fetch('https://backend-nodejs-auth-data-pdf.herokuapp.com/api/companies');
        const data = await response.json();
        setCompanies(data);
      }
      fetchCompanies();
    }, []);

  return(
    <div className='wrapper bg-dark d-flex align-items-center justify-content-center'>
    <div className='dashboard row p-3'>
      <div className='col-12'>
        <h2>Companies List</h2>
        <div className='row mt-4'>
          {companies.map((company) => (
            <div className='col-12 p-2' key={company._id}>
              <div className='card p-4'>
                <div className='card-body'>
                  <h5 className='card-title'>{company.companyname}</h5>
                  <h6 className='card-subtitle mb-2 text-muted'>{company.nit}</h6>
                  <p className='card-text'>{company.address}</p>
                  <p className='card-text'>{company.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );

}