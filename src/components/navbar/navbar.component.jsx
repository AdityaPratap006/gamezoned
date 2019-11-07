import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.styles.scss';

//import AuthStatusView from "../auth-status-view/auth-status-view.component";


const Navbar = () => {
    return (
        <div className = 'navbar' >
            <Link className='menu-item' to='/home'> Hm </Link>
            <Link className='menu-item' to='/trending'> Tr </Link>
            <Link className='menu-item' to='/share-post'> Sh </Link>
            <Link className='menu-item' to='/account'>Ac</Link>
        </div>
    )
}

export default Navbar;
