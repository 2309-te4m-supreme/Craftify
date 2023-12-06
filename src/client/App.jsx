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
  const token = localStorage.getItem("token");
  console.log(token);

  return (
    <>
    <div className='whole-page'>
      <div className='header'>
          <h1 className='logo-header'>Craftify</h1>
        <Navigation token={token}/>
      </div>
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/products' element={<Products />}/>
          <Route path='/products/:productId' element={<SingleProduct />}/>
          <Route path='/users/:userId' element={<SingleUser token={token} />}/>
          <Route path='/admin/products/:productId' element={<EditProduct />}/>
          <Route path='/admin' element={<Admin token={token} />}/>
          <Route path='/users/me' element={<MyAccount token={token} />}/>
          <Route path='/admin/users/:userId' element={<EditUser token={token} />}/>
        </Routes>
    </div>
    </>
  );
}

export default App;