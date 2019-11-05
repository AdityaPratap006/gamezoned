import React, { useEffect } from 'react';
import './Home.styles.scss';

import { connect } from 'react-redux';
//import  { useIdentityContext  } from 'react-netlify-identity-widget';

import { setAllPosts } from '../../redux/all_posts/all-posts.actions';


import PostsContainer from '../../components/posts-container/posts-container.component';

const HomePage = ({currentUser, setAllPosts, all_posts}) => {

    const fetchAllPosts = () => {

        return fetch('/.netlify/functions/all-posts-fetch',{
                method:'POST'
            })
            .then(res => res.json())
    }
    
    useEffect(() => {
       
        fetchAllPosts()
        .then(data => {
            setAllPosts(data)
        })
        .catch(err => console.log(err))

    }, [setAllPosts])
    
    return (
        <div className='home-page'>
            <PostsContainer/>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    all_posts: state.all_posts.all_posts
})

const mapDispatchToProps = dispatch => ({
    setAllPosts: posts => dispatch(setAllPosts(posts))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);
