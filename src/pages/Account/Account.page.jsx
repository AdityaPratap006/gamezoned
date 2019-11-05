import React from 'react';
import { connect } from 'react-redux';

import AuthStatusView from '../../components/auth-status-view/auth-status-view.component';


const AccountPage = ({currentUser}) => {
 
    
    console.log('Account')
    return (
      <div>
        <h1>Hi {currentUser && currentUser.data && currentUser.data.name}!</h1>
        <AuthStatusView  postSignUp={false}/>
      </div>
    );
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser
})


export default connect(
  mapStateToProps,
  null
)(AccountPage);
