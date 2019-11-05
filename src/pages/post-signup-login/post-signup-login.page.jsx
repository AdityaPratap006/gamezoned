import React from 'react';
import './post-signup-login.styles.scss';

import AuthStatusView from '../../components/auth-status-view/auth-status-view.component';

import { useIdentityContext } from 'react-netlify-identity-widget';


import { connect } from 'react-redux';

import { setCurrentUser } from '../../redux/user/user.actions';

const PostSignupLoginPage = ({currentUser}) => {

    const identity = useIdentityContext();


    return (
        <div className='post-signup-login-page'>
            {
                (identity && identity.isLoggedIn)?(
                <>
                    <h2>You've Signed up!</h2>
                    <h3>Now Please Refresh/Reload the page and Log In again to confirm</h3>
                </>):(
                    <h2>Please Log In to continue</h2>
                )
            }
             {
                 !(identity && identity.isLoggedIn)
                 ?<AuthStatusView />
                 :<button className='refresh-button' onClick={()=>{window.location.reload()}}>Refresh</button>
                 
             }  
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
)(PostSignupLoginPage);
