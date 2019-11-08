import React from 'react';
import './signup-login.styles.scss';

import AuthStatusView from '../../components/auth-status-view/auth-status-view.component';

const SignupLoginPage = () => {
    console.log('signin')
    return (
        <div className='signup-login-page'>
            
            <h3>Welcome to GameZoned!!!</h3>
            
            <div className='welcome-card'>
                <h1>HOLAAAA!</h1>
                <AuthStatusView />
            </div>
        </div>
    )
}

export default SignupLoginPage
