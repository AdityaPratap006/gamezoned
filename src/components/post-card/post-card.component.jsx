import React, { useState, useEffect } from 'react';
import './post-card.styles.scss';

import { connect } from 'react-redux';

import { addLikeByUser } from '../../redux/likes_by_user/likes_by_user.actions';

const PostCard = ({id,data:{ title, developedBy, postedByUserName , createdAt, likeCount}, currentUser, likes_by_user, addLikeByUser}) => {
 
    const [liked, setLiked] = useState((likes_by_user.filter(like => (like.data.postId === id)).length > 0))
    const [postLikeCount, setPostLikeCount] = useState(likeCount);

    const likePost = () => {

        setLiked(true);
        setPostLikeCount(postLikeCount + 1)

        return fetch('/.netlify/functions/post-like',{
            method:"POST",
            body:JSON.stringify({
                postId:id,
                userId:currentUser.faunadbUserId,
            })
        })
        .then(res => res.json())
        .then(likeData => {
            addLikeByUser(likeData);
        })
        .catch(err => console.log(err))
    }

    //let displayLikes = 0;

    useEffect(()=>{
        setLiked((likes_by_user.filter(like => (like.data.postId === id)).length > 0))
        setPostLikeCount(likeCount)

    })

    
    

    return (
        <div className='post-card' >
            <h3>{postedByUserName}</h3>
            <h4>{new Date(createdAt).toLocaleString() }</h4>
            <h1>
                {title}
            </h1>
            <h3>
                {developedBy}
            </h3>
            <p onClick={() => {
               if(!liked){
                   likePost()
                }
            }}>
              {liked?'liked!!':'_ _'}  {(postLikeCount === 0)?likeCount:postLikeCount} Likes
            </p>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    likes_by_user: state.likes_by_user.likes_by_user
})

const mapDispatchToProps = dispatch => ({
    addLikeByUser: like => dispatch(addLikeByUser(like))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostCard);


//previously used code just kept for reference, not required as such
 /*const [userOfThisPost, setUserOfThisPost] = useState(null);

    const fetchUser = (userId) => {
        return fetch(`/.netlify/functions/user-fetch`, {
        method: 'POST',
        body: JSON.stringify({
            id:userId
        })
        
        }).then(response => {
        return response.json()
        })
    }

    

    useEffect(()=>{
        
    fetchUser(postedBy)
        .then(res => res.data)
        .then(data => {
            setUserOfThisPost(data.name)
        })
        .catch(err => console.log(err))

    },[userOfThisPost])*/