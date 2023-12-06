import React from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { LuMenuSquare } from "react-icons/lu";
import { AiFillCloseCircle } from "react-icons/ai";

function Navigation({ token }) {
  const navRef = useRef();

  const showNavigation = () => {
    navRef.current.classList.toggle("responsive_nav");
  }

  return (
    <header>
      <nav ref={navRef} className='nav-bar'>
        <Link to='/products' href='/#'>Home</Link>
        <Link to='/admin' href='/#'>Admin</Link>
        <Link to='/register' href='/#'>Sign Up</Link> 
        {token ? (
          <Link to='/users/me' href='/#'>My Account</Link>
          ) : (
            <Link to='/login' href='/#'>Login</Link>
            )} 
        <button className='nav-close-button' onClick={showNavigation}>
          <AiFillCloseCircle />
        </button>
      </nav>
        <button className='nav-button' onClick={showNavigation}>
          <LuMenuSquare />
        </button>
    </header>
  );
}

export default Navigation;

// Remove or edit "REGISTER" at a later time.