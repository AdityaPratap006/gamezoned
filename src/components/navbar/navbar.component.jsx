import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './navbar.styles.scss';

import homeActive from '../../assets/home-active.png';
import home from '../../assets/home.png';
import trendingActive from '../../assets/trending-active.png';
import trending from '../../assets/unlike.png';
import shareActive from '../../assets/share-active.png';
import share from '../../assets/share.png';
import accountActive from '../../assets/account-active.png';
import account from '../../assets/account.png';
import logo from '../../assets/logo.png';

const Navbar = () => {

    const [activeLink, setActiveLink] = useState(window.location.hash);
    return (
        <>
            {
                window.innerWidth > 1080 ?
                <div className='logo-container'>
                    <img alt={'logo'} src={logo} />
                </div>
                :null
            }
            <div className='navbar' >
                <Link className='menu-item' to='/home'>
                    <div className='menu-icon' onClick={() => { setActiveLink('#/home') }}>
                        {
                            activeLink === '#/home'
                                ? <img alt='home' src={homeActive} />
                                : <img alt='home' src={home} />
                        }
                    </div>
                </Link>
                <Link className='menu-item' to='/trending'>
                    <div className='menu-icon' onClick={() => { setActiveLink('#/trending') }}>
                        {
                            activeLink === '#/trending'
                                ? <img alt='trending' src={trendingActive} />
                                : <img alt='trending' src={trending} />
                        }
                    </div>
                </Link>
                <Link className='menu-item' to='/share-post'>
                    <div className='menu-icon' onClick={() => { setActiveLink('#/share-post') }}>
                        {
                            activeLink === '#/share-post'
                                ? <img alt='share' src={shareActive} />
                                : <img alt='share' src={share} />
                        }
                    </div>
                </Link>
                <Link className='menu-item' to='/account'>
                    <div className='menu-icon' onClick={() => { setActiveLink('#/account') }}>
                        {
                            activeLink === '#/account'
                                ? <img alt='account' src={accountActive} />
                                : <img alt='account' src={account} />
                        }
                    </div>
                </Link>
            </div>
        </>
    )
}

export default Navbar;
