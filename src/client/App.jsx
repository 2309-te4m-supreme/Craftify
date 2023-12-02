import { useState } from 'react';
import Login from './components/Login';
import Products from './components/Products';
import SingleProduct from './components/SingleProduct'
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
        <Route path='/products' element={<Products/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/products/:productId' element={<SingleProduct />}/>
      </Routes>
    </>
  );
}

export default App;

