import React from 'react';
import { Link } from 'react-router-dom';

function Navigation({ token }) {
  return (
    <nav className='nav-bar'>
      <Link to='/products'>Home</Link>
      <Link to='/users'>Users</Link>
      {token ? (
          <Link to='/myaccount'>My Account</Link> //correct to /users/me **waiting on backend**
      ) : (
        <Link to='/login'>Login</Link>
      )}
    </nav>
  );
}

export default Navigation;
