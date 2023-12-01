import { useState } from 'react';
import reactLogo from './assets/react.svg';
import Login from './components/Login';
import Navigation from './components/Navigation';
import { Route, Routes } from 'react-router-dom';

function App() {


  return (
    <>
    <div className='header'>
        <h1 className='logo-header'>Craftify</h1>
      <Navigation/>
    </div>
      <Routes>
        {/* <Route path='/' element={<Products/>}/> */}
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
  );
}

export default App;

