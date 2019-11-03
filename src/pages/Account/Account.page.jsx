import React, { useState } from 'react';
import { connect } from 'react-redux';

import IdentityModal from 'react-netlify-identity-widget';

import {setCurrentUser} from '../../redux/user/user.actions';

const AccountPage = ({currentUser, setCurrentUser}) => {
 
    const [dialog, setDialog] = useState(false)
    console.log({currentUser})
    return (
      <div>
        <h1>ACCOUNT!</h1>
        <button  onClick={() => setDialog(true)} >
                 Log Out
        </button>
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
                console.log('bye')
                setCurrentUser(null);
              }}
          />
      </div>
    );
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser
})

const  mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch( setCurrentUser(user) )
})



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountPage);
