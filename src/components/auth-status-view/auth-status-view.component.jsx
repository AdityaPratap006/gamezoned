import React, { useState } from 'react';

import IdentityModal, { useIdentityContext  } from 'react-netlify-identity-widget'
import 'react-netlify-identity-widget/styles.css'

function AuthStatusView({setCurrentUser}) {
    const identity = useIdentityContext()
    const [dialog, setDialog] = useState(false)
    const name =
      (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.full_name) || 'NoName'
    const isLoggedIn = identity && identity.isLoggedIn
  
    
  
    return (
      <div>
        <div>
          <h1>{isLoggedIn}</h1>
          <button className="RNIW_btn" onClick={() => setDialog(true)}>
            {isLoggedIn ? `Hello ${name}, Log out here!` : 'Log In'}
          </button>
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

export default AuthStatusView;
