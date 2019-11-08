import React from 'react';
import { connect } from 'react-redux';
import './Account.styles.scss';

import AuthStatusView from '../../components/auth-status-view/auth-status-view.component';


const AccountPage = ({currentUser}) => {
 
    return (
      <div className='account-page'>
        <h1 style={{color: 'whitesmoke'}}>Holaaa! {currentUser && currentUser.data && currentUser.data.name.split(' ')[0]}</h1>
        
        <div className='user-details'>
            <div>
              <h4>Full Name:</h4>
              <h4>{currentUser && currentUser.data && currentUser.data.name}</h4>
            </div>
            <div>
              <h4>Email:</h4>
              <h4>{currentUser && currentUser.data && currentUser.data.email}</h4>
            </div>
            <div>
                <h4>Joined:</h4>
                <h4>{currentUser && currentUser.data && new Date(currentUser.data.created_at).toLocaleString() }</h4>
            </div>
        </div>

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
