import React from 'react';
import './loader.styles.scss';

import logo from '../../assets/logo.png';

const Loader = () => {
    return (
        <div className='loader-component'>
            <div className='logo-div'>
                <img alt='loading...' src={logo}/>
            </div>
        </div>
    )
}

export default Loader;
