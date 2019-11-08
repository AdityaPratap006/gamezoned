import React, { useState, useEffect } from 'react';
import './Trending.styles.scss';

import { connect } from 'react-redux';

import PostsContainer from '../../components/posts-container/posts-container.component';
import Loader from '../../components/loader/loader.component';

import { setLikesByUser } from '../../redux/likes_by_user/likes_by_user.actions';
import { setTrendingPosts } from '../../redux/trending_posts/trending_posts.actions';


const TrendingPage = ({currentUser, trending_posts, setTrendingPosts, setLikesByUser}) => {

    

    const getTrendingPosts = async () => {

        return fetch('/.netlify/functions/trending-posts-fetch',{
            method:"POST"
        })
        .then(res => res.json())
    }

    const fetchLikesByCurrentUser = async (userId) => {
        return fetch('/.netlify/functions/all-likes-by-user-fetch',{
            method:'POST',
            body: JSON.stringify({
                id:userId
            })
        })
        .then(res => res.json())
    }
    
    const [loadingUI, setLoadingUI] = useState(true);

    
    useEffect(()=>{

        getTrendingPosts()
        .then(posts => {
            console.log('Fetched Trending Posts!');

            if(currentUser){
                fetchLikesByCurrentUser(currentUser.faunadbUserId)
                .then(likesData => {
                    setTrendingPosts(posts);
                    setLikesByUser(likesData);
                    setLoadingUI(false);
                })
                .catch(err => console.log(err))
            }

           
        })
        .catch(err => console.log(err))

    },[setTrendingPosts, currentUser, setLikesByUser])

     
    return (
        <div className='trending-page'>
            <h3 className='trending-page-title'>Top Trending Games!</h3>
            {
                !loadingUI && trending_posts.length
                ?<PostsContainer  postList={trending_posts} />
                :<Loader/>
            } 
        </div>
    )
}


const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    likes_by_user: state.likes_by_user.likes_by_user,
    trending_posts: state.trending_posts.trending_posts
})

const mapDispatchToProps = dispatch => ({
    setLikesByUser: likes => dispatch(setLikesByUser(likes)),
    setTrendingPosts: posts =>  dispatch(setTrendingPosts(posts))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TrendingPage);
