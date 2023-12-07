import React, { Fragment } from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { LuMenuSquare } from "react-icons/lu";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { MdAdminPanelSettings } from "react-icons/md";
import { HiHome } from "react-icons/hi2";
import { FiLogOut } from "react-icons/fi";



function Navigation({ token }) {
  const navRef = useRef();

  const showNavigation = () => {
    navRef.current.classList.toggle("responsive_nav");
  }

  return (
    <header>
      <nav ref={navRef} className='nav-bar'>
        <Link to='/products' href='/#' title='Home'><HiHome />
        </Link>
        <Link to='/admin' href='/#' title='Admin'><MdAdminPanelSettings /></Link>
        {token ? (
          <>
            <Link to='/users/me' href='/#' title='My Account'><BsPersonCircle />
            </Link>
            <Link to='/cart/:userId' href='/#' title='Cart'><FaShoppingCart />
            </Link>
            <Link to='/logout' href='/#' title='Logout'><FiLogOut /></Link>
          </>
        ) : (
          <>
            <Link to='/login' href='/#' title='Login'>Login</Link>
            <Link to='/register' href='/#' title='Sign Up'>Sign Up</Link>
          </>
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
