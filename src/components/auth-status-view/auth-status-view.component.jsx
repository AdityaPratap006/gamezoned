import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import IdentityModal, { useIdentityContext  } from 'react-netlify-identity-widget';
import 'react-netlify-identity-widget/styles.css';

import './auth-status-view.styles.scss';

import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/user/user.actions';

function AuthStatusView({setCurrentUser}) {
    const identity = useIdentityContext();
    const [dialog, setDialog] = useState(false);

    const name = (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.full_name) || 'NoName';
    
    const isLoggedIn = identity && identity.isLoggedIn;
  
     
  
    return (
      <div>
        <div>
          { 
            (!isLoggedIn)?
            (<div className='my-btn'  onClick={() => setDialog(true)}>
              Log In
            </div>)
            :(<Link className='my-btn'  to="/account"   >
               Account
             </Link>)
          }
        </div>
        <IdentityModal
          showDialog={dialog}
          onCloseDialog={() => setDialog(false)}
          onLogin={(user) => {
            console.log('hello ', user.user_metadata)
            setCurrentUser(user);
          }}
          onSignup={(user) =>{ 
              console.log('welcome ', user.user_metadata)
              setCurrentUser(user);
            }}
          onLogout={() => {
              console.log('bye ', name)
              setCurrentUser(null);
            }}
        />
      </div>
    )
}

const  mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch( setCurrentUser(user) )
})

export default connect(
  null,
  mapDispatchToProps
)(AuthStatusView);
