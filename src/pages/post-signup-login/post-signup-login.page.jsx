import React, {useEffect} from 'react';

import AuthStatusView from '../../components/auth-status-view/auth-status-view.component';

import { connect } from 'react-redux';

import { setCurrentUser } from '../../redux/user/user.actions';

const PostSignupLoginPage = ({currentUser, setCurrentUser}) => {

    useEffect(()=>{
        setCurrentUser(null)
        console.log('YEAHHHHHH')
    })

    return (
        <div>
            <h3>You've Signed up!</h3>
            <h2>Now Please Login again to confirm</h2> 
            <AuthStatusView/>
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
