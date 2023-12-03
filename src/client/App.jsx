import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/Products';
import SingleProduct from './components/SingleProduct'
import Navigation from './components/Navigation';
import MyAccount from './components/MyAccount';
import Users from './components/Users';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
    <div className='header'>
        <h1 className='logo-header'>Craftify</h1>
      <Navigation token={token}/>
    </div>
      <Routes>
        <Route path='/login' element={<Login setToken={setToken}/>}/>
        <Route path='/register' element={<Register setToken={setToken}/>}/>
        <Route path='/products/:productId' element={<SingleProduct />}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/users/:userId' element={<MyAccount/>}/>
      </Routes>
    </>
  );
}

export default App;

