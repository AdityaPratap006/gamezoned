import React from 'react';

import AuthStatusView from '../../components/auth-status-view/auth-status-view.component';

const SignupLoginPage = () => {
    console.log('signin')
    return (
        <div style={{
            width:'100vw',
            maxWidth:'100%',
            minHeight:'100vh'
        }}>
            <h1>HOLAAAA</h1>
            <AuthStatusView/>
        </div>
    )
}

export default SignupLoginPage
