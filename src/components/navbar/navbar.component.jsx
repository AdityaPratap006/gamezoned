import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.styles.scss';

//import AuthStatusView from "../auth-status-view/auth-status-view.component";


const Navbar = () => {
    return (
        <div className = 'navbar' >
            <Link className='menu-item' to='/home'> Home </Link>
            <Link className='menu-item' to='/top-trending'> Top Trending </Link>
            <Link className='menu-item' to='/my-posts'> My Posts </Link>
            <Link className='menu-item' to='/account'>Account</Link>
        </div>
    )
}

export default Navbar;
