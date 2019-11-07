import React, { useEffect } from 'react';
import './Home.styles.scss';

import { connect } from 'react-redux';
//import  { useIdentityContext  } from 'react-netlify-identity-widget';

import { setAllPosts } from '../../redux/all_posts/all-posts.actions';
import { setLikesByUser } from '../../redux/likes_by_user/likes_by_user.actions';

import PostsContainer from '../../components/posts-container/posts-container.component';

const HomePage = ({currentUser, setAllPosts, setLikesByUser, all_posts}) => {

    const fetchAllPosts = async () => {

        return fetch('/.netlify/functions/all-posts-fetch',{
                method:'POST'
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
    
    useEffect(() => {
        
       

        fetchAllPosts()
        .then(postsData => {
            
            const compareByTimePosted = (postA, postB) => {

                //Decending order
                return (new Date(postB.data.createdAt) <= new Date(postA.data.createdAt))?-1:1; 
            }

            //most recent posts
            postsData.sort(compareByTimePosted);

            if(currentUser){
                fetchLikesByCurrentUser(currentUser.faunadbUserId)
                .then(likesData => {
                    setAllPosts(postsData);
                    setLikesByUser(likesData);
                })
                .catch(err => console.log(err))
            }
           
        })
        .catch(err => console.log(err))



    }, [setAllPosts, setLikesByUser, currentUser])

    useEffect(()=>{
         
    },[])
    
    return (
        <div className='home-page'>
            <PostsContainer postList={all_posts}/>
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
