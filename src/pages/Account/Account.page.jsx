import React from 'react';
import { connect } from 'react-redux';

import AuthStatusView from '../../components/auth-status-view/auth-status-view.component';

import {setCurrentUser} from '../../redux/user/user.actions';

const AccountPage = ({currentUser, setCurrentUser}) => {
 
    
    console.log('Account')
    return (
      <div>
        <h1>Hi {(currentUser.user_metadata && currentUser.user_metadata.full_name) || (currentUser.name)}!</h1>
        <AuthStatusView/>
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
