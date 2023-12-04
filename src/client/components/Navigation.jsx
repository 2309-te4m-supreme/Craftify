import React from 'react';
import { Link } from 'react-router-dom';

function Navigation({ token }) {
  return (
    <nav className='nav-bar'>
      <Link to='/products'>Home</Link>
      <Link to='/users'>Users</Link>
      <Link to='/register'>Register</Link> 
      {token ? (
        <Link to='/users/me'>My Account</Link>
        ) : (
          <Link to='/login'>Login</Link>
      )}
    </nav>
  );
}

export default Navigation;

// Remove or edit "REGISTER" at a later time.