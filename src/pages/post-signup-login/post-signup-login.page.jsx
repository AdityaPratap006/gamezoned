import React, { useState, useEffect} from 'react';

import AuthStatusView from '../../components/auth-status-view/auth-status-view.component';

import { connect } from 'react-redux';

import { setCurrentUser } from '../../redux/user/user.actions';

const PostSignupLoginPage = ({currentUser, setCurrentUser}) => {

    const [refresh, setRefresh ] = useState(false);

    // useEffect(()=>{
    //     setCurrentUser(null)
    //     console.log('YEAHHHHHH')
    // })



    return (
        <div>
            <h3>You've Signed up!</h3>
            <h2>Now Please Log Out and Log In again to confirm</h2> 
            <AuthStatusView refresh={refresh} setRefresh={setRefresh}/>
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
