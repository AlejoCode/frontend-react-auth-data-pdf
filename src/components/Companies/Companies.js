import React, { useState, useEffect, useContext } from 'react';
import CompanyForm from "./CompanyForm";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';

export default function Companies() {
  const { authState } = useContext(AuthContext);


  const [companies, setCompanies] = useState([]);
  const [editingCompany, setEditingCompany] = useState(null);
  const [updatedCompany, setUpdatedCompany] = useState({
    companyname: '',
    address: '',
    nit: '',
    phone: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://backend-nodejs-auth-data-pdf.herokuapp.com/api/companies')
      .then((response) => response.json())
      .then((data) => setCompanies(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (obj) => {
    let id = obj._id
    console.log('id : ' +(id) )
    try {
      const response = await fetch(`https://backend-nodejs-auth-data-pdf.herokuapp.com/api/companies/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setCompanies(companies.filter((company) => company._id !== id));
      } else {
        throw new Error('Failed to delete company');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    setUpdatedCompany({
      companyname: company.companyname,
      address: company.address,
      nit: company.nit,
      phone: company.phone
    });
  };

  const handleUpdate = async (event) => {
    // event.preventDefault();
    console.log('editingCompany : ' + JSON.stringify(editingCompany))
    try {
      const response = await fetch(`https://backend-nodejs-auth-data-pdf.herokuapp.com/api/companies/${editingCompany._id}`, {
        method: 'PUT',
        body: JSON.stringify(editingCompany),
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        setCompanies(companies.map((company) => (company._id === editingCompany._id ? updatedCompany : company)));
        setEditingCompany(null);
        console.log('company updated successfully : ' + JSON.stringify(response));
      } else {
        throw new Error('Failed to update company');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setEditingCompany(null);
    setUpdatedCompany({
      companyname: '',
      address: '',
      nit: '',
      phone: ''
    });
  };

  const handleInputChange = (company) => {
    setUpdatedCompany({
      ...company
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const handleAdd = (values) => {
    setCompanies([...companies, values]);
    setModalOpen(false);
  };
  
  return(

    
    <div className='wrapper bg-dark d-flex align-items-center justify-content-center'>
      <div className='company rounded p-4'>
      {/* {(authState.token === 'null' && authState.role === 'null')? (
      <div>please login for using the aplication, if you dont have an account you can register for free</div>
      ):( */}
        <><div className='d-flex align-items-center justify-content-center'>
              <h2 className='mb-3'>Companies CRUD</h2>
            </div><div className='container my-5'>
                <table className='table table-striped table-hover'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Company Name</th>
                      <th>Address</th>
                      <th>NIT</th>
                      <th>Phone</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map((company, index) => (
                      <tr key={company._id}>
                        <th scope='row'>{index + 1}</th>
                        <td>
                          {company._id === editingId ? (
                            <input
                              type='text'
                              className='form-control'
                              value={editingCompany.companyname}
                              onChange={(event) => setEditingCompany({
                                ...editingCompany,
                                companyname: event.target.value,
                              })} />
                          ) : (
                            company.companyname
                          )}
                        </td>
                        <td>
                          {company._id === editingId ? (
                            <input
                              type='text'
                              className='form-control'
                              value={editingCompany.address}
                              onChange={(event) => setEditingCompany({
                                ...editingCompany,
                                address: event.target.value,
                              })} />
                          ) : (
                            company.address
                          )}
                        </td>
                        <td>
                          {company._id === editingId ? (
                            <input
                              type='text'
                              className='form-control'
                              value={editingCompany.nit}
                              onChange={(event) => setEditingCompany({
                                ...editingCompany,
                                nit: event.target.value,
                              })} />
                          ) : (
                            company.nit
                          )}
                        </td>
                        <td>
                          {company._id === editingId ? (
                            <input
                              type='text'
                              className='form-control'
                              value={editingCompany.phone}
                              onChange={(event) => setEditingCompany({
                                ...editingCompany,
                                phone: event.target.value,
                              })} />
                          ) : (
                            company.phone
                          )}
                        </td>
                        <td>
                          {company._id === editingId ? (
                            <>
                              <button
                                className='btn btn-success'
                                onClick={() => { handleUpdate(company); handleInputChange(company); } }
                              >
                                Update
                              </button>
                              <button
                                className='btn btn-danger mx-2'
                                onClick={() => cancelEditing()}
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className='btn btn-primary mx-2'
                                onClick={() => { setEditingId(company._id); handleEdit(company); } }
                              >
                                Edit
                              </button>
                              <button
                                className='btn btn-danger'
                                onClick={() => handleDelete(company)}
                              >
                                Delete
                              </button>
                              <button
                                className='btn btn-secondary mx-2'
                                onClick={() => { navigate(`/inventory?companyId=${company._id}`); } }
                              >
                                Inventory
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div><div className='row'>
                <div className='col-12'>
                  <Link to="/companyForm">
                    <button
                      className='btn btn-success'
                      onClick={() => { } }
                    >
                      Create Company
                    </button>
                  </Link>

                </div>
              </div></>

{/* )} */}


  </div>      
  </div>
  );

}