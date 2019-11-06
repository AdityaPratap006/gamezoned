import React, { useEffect } from 'react';
import './Home.styles.scss';

import { connect } from 'react-redux';
//import  { useIdentityContext  } from 'react-netlify-identity-widget';

import { setAllPosts } from '../../redux/all_posts/all-posts.actions';
import { setLikesByUser } from '../../redux/likes_by_user/likes_by_user.actions';

import PostsContainer from '../../components/posts-container/posts-container.component';

const HomePage = ({currentUser, setAllPosts, setLikesByUser, all_posts}) => {

    const fetchAllPosts = () => {

        return fetch('/.netlify/functions/all-posts-fetch',{
                method:'POST'
            })
            .then(res => res.json())
    }

    const fetchAllLikesByCurrentUser = (userId) => {
        return fetch('/.netlify/functions/all-likes-by-user-fetch',{
            method:'POST',
            body: JSON.stringify({
                id:userId
            })
        })
        .then(res => res.json())
    }
    
    useEffect(() => {
       
        fetchAllPosts()
        .then(postsData => {
            

            fetchAllLikesByCurrentUser(currentUser.faunadbUserId)
            .then(likesData => {
                setAllPosts(postsData);
                setLikesByUser(likesData);
            })
        })
        .catch(err => console.log(err))



    }, [setAllPosts, setLikesByUser, currentUser.faunadbUserId])
    
    return (
        <div className='home-page'>
            <PostsContainer/>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    all_posts: state.all_posts.all_posts,
    likes_by_user: state.likes_by_user.likes_by_user
})

const mapDispatchToProps = dispatch => ({
    setAllPosts: posts => dispatch(setAllPosts(posts)),
    setLikesByUser: likes => dispatch(setLikesByUser(likes))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);
