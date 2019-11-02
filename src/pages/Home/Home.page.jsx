import React from 'react';

import { connect } from 'react-redux';

const HomePage = ({currentUser}) => {
    console.log(currentUser)
    return (
        <div>
            {
            currentUser?<h1>HOME SWEET HOME!</h1>:<h1>OOPs</h1>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps,null)(HomePage);
