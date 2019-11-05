import React from 'react';
import './signup-login.styles.scss';

import AuthStatusView from '../../components/auth-status-view/auth-status-view.component';

const SignupLoginPage = () => {
    console.log('signin')
    return (
        <div className='signup-login-page'>
            <div className='welcome-card'>
                <h1>HOLAAAA!</h1>
                <AuthStatusView />
            </div>
        </div>
    )
}

export default SignupLoginPage
