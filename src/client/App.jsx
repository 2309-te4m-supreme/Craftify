import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/Products';
import EditProduct from './components/EditProduct';
import SingleProduct from './components/SingleProduct'
import Navigation from './components/Navigation';
import MyAccount from './components/MyAccount';
import Admin from './components/Admin';
import SingleUser from './components/SingleUser'
import EditUser from './components/EditUser';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
    <div className='whole-page'>
      <div className='header'>
          <h1 className='logo-header'>Craftify</h1>
        <Navigation token={token}/>
      </div>
        <Routes>
          <Route path='/login' element={<Login setToken={setToken}/>}/>
          <Route path='/register' element={<Register setToken={setToken}/>}/>
          <Route path='/products/:productId' element={<SingleProduct />}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/admin/products/:productId' element={<EditProduct/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/users/me' element={<MyAccount token={token}/>}/>
          <Route path='/users/user/:userId' element={<SingleUser/>} />
          <Route path='/admin/users/:userId' element={<EditUser/>} />
        </Routes>
    </div>
    </>
  );
}

export default App;

