import logo from './logo.svg';
import './App.css';
import Login from "./containers/Login";
import React, { Component, useContext }  from 'react';
// import {Routes,Route} from 'react-router'
import { Route, Routes } from "react-router-dom"
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import Dashboard from './components/Dashboard/Dashboard';
import Companies from './components/Companies/Companies';
import Inventory from './components/Inventory/Inventory';
// import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import CompanyForm from './components/Companies/CompanyForm';
import { AuthContext } from './AuthProvider';

function App() {
  const { authState } = useContext(AuthContext);
  console.log('authState ' + JSON.stringify(authState))

  console.log('authState.token ' + authState.token)
  console.log('authState.token === null ' + authState.token === 'null')
  return (

  <div className='App '>
    <Navbar /> 
    <Routes>
      {authState.role === '1' && (
        <>
          <Route path='/companies' element={<Companies/>} />
          <Route path='/companyForm' element={<CompanyForm/>} />
          <Route path='/inventory' element={<Inventory/>} />
        </>

        )}
        {authState.role === '1' || authState.role === '2' ? (
          <Route path='/' element={<Dashboard/>} />
        ):
          <Route path='/' element={<RegisterForm/>} />
        }
      <Route path='/login' element={<LoginForm/>} />
      <Route path='/register' element={<RegisterForm/>} />
    </Routes>
    {/* <Footer /> */}
  </div>

  );
}

export default App;
