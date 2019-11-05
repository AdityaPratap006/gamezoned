import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.styles.scss';

//import AuthStatusView from "../auth-status-view/auth-status-view.component";


const Navbar = () => {
    return (
        <div className = 'navbar' >
            <Link className='menu-item' to='/home'> Hm </Link>
            <Link className='menu-item' to='/top-trending'> Tr </Link>
            <Link className='menu-item' to='/my-posts'> My </Link>
            <Link className='menu-item' to='/account'>Ac</Link>
        </div>
    )
}

export default Navbar;
