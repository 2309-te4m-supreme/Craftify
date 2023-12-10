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
import OrderHistory from './components/OrderHistory';
import Logout from './components/Logout';
import Cart from './components/Cart';
import AddProduct from './components/AddProduct';
import Checkout from './components/Checkout';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [ token, setToken ] = useState('');
  

  useEffect(() => {
    const storedToken = (localStorage.getItem("token"));
    setToken(storedToken);
    console.log(storedToken)
  }, [])
 
  console.log(token);

  return (
    <>
    <div className='whole-page'>
      <div className='header'>
          <h1 className='logo-header'>Craftify</h1>
        <Navigation token={token}/>
      </div>
        <Routes>
          <Route path='/login' element={<Login setToken={setToken}/>}/>
          <Route path='/logout' element={<Logout setToken={setToken} />}/>
          <Route path='/register' element={<Register setToken={setToken}/>}/>
          <Route path='/products' element={<Products />}/>
          <Route path='/products/:productId' element={<SingleProduct />}/>
          <Route path='/users/:userId' element={<SingleUser token={token} />}/>
          <Route path='/admin/products/:productId' element={<EditProduct token={token}/>}/>
          <Route path='/admin/addproduct' element={<AddProduct token={token}/>}/>
          <Route path='/admin' element={<Admin token={token} />}/>
          <Route path='/users/me' element={<MyAccount token={token}/>}/>
          <Route path='/orders/:userId' element={<OrderHistory token={token} />}/>
          <Route path='/cart/:userId' element={<Cart token={token}/>}/>
          <Route path='/checkout/:userId' element={<Checkout token={token} />}/>
          <Route path='/admin/users/:userId' element={<EditUser token={token} />}/>
        </Routes>
    </div>
    </>
  );
}

export default App;