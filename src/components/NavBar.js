import React from 'react'
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './navbar.css'

const NavBar = () => {
    const {isLoggedIn, sessionId, logout} = useAuth();
    return (
        <nav className='navbar'>
        <h2 className='heading'>Welcome to pet store</h2>
        <ul className='navbar-links'>
            <li>
            <NavLink to="" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Pet</NavLink>
            </li>
            { !isLoggedIn && !sessionId &&
            <li>
            <NavLink to="login" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Login</NavLink>
            </li>
            }
            { isLoggedIn && sessionId &&
            <li className='logout-item'>
            <button onClick={() => logout()} className='logout-btn'>Logout</button>
            </li>
            }
        </ul>
        </nav>
    )
}

export default NavBar
