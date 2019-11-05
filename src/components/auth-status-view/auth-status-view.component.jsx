import React, { useState, useEffect } from 'react';

import IdentityModal, { useIdentityContext } from 'react-netlify-identity-widget';
import 'react-netlify-identity-widget/styles.css';

import './auth-status-view.styles.scss';

import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/user/user.actions';

import history from '../../history';

function AuthStatusView({ currentUser, setCurrentUser, setRefresh, refresh, postSignUp }) {
  const identity = useIdentityContext();
  const [dialog, setDialog] = useState(false);

  const name = (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.full_name) || 'NoName';

  useEffect(() => {
    console.log('Ath state comp')
  }, [identity]);

  // console.log(location.pathname);   

  return (
    <div>
      <div>
        {
          (!(identity && identity.isLoggedIn)) ?
            (<div className='my-btn' onClick={() => setDialog(true)} >
              Please Log In
            </div>)
            : (<div className='my-btn' onClick={() => setDialog(true)}  >
              Log Out
             </div>)
        }
      </div>
      <IdentityModal
        showDialog={dialog}
        onCloseDialog={() => setDialog(false)}
        onLogin={(user) => {
          console.log('hello ', user.user_metadata)
          setCurrentUser({
            data: user.user_metadata.created_user.data,
            faunadbUserId: user.user_metadata.created_user.ref['@ref'].id,
            hasUserSignedUp: true,
            isUserLoggedIn: true
          });

          history.push('/home');
        }}
        onSignup={(user) => {
          console.log('welcome ', user.user_metadata)
          setDialog(false);

          setCurrentUser({
            data: user.user_metadata.created_user.data,
            faunadbUserId: user.user_metadata.created_user.ref['@ref'].id,
            hasUserSignedUp: true,
            isUserLoggedIn: false
          });
          history.push('/post-signup-login')
        }}
        onLogout={() => {

          console.log('bye ', name)
          localStorage.clear();
          setCurrentUser({ data: null, isUserLoggedIn: false, hasUserSignedUp: false });
          history.replace('/');

        }}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthStatusView);
