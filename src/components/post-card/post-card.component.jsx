import React, { useState, useEffect } from 'react';
import './post-card.styles.scss';

import { connect } from 'react-redux';

import { addLikeByUser, removeLikeByUser } from '../../redux/likes_by_user/likes_by_user.actions';

const PostCard = ({id,data:{ title, developedBy, postedByUserName , createdAt, likeCount}, currentUser, likes_by_user, addLikeByUser, removeLikeByUser}) => {
 
    //const [liked, setLiked] = useState((likes_by_user.filter(like => (like.ref['@ref'].id === id)).length > 0))
    const [postLikeCount, setPostLikeCount] = useState(likeCount);

    const likePost = async () => {

        return fetch('/.netlify/functions/post-like',{
            method:"POST",
            body:JSON.stringify({
                postId:id,
                userId:currentUser.faunadbUserId,
            })
        })
        .then(res => res.json())
        .then(likeData => {
            console.log('fetched like data',likeData)
            addLikeByUser(likeData);
            setPostLikeCount(likeCount+1);
        })
        .catch(err => console.log(err))
    }


    const unlikePost = async () => {

        return fetch('/.netlify/functions/post-unlike',{
            method:"POST",
            body:JSON.stringify({
                postId:id,
                userId:currentUser.faunadbUserId,
            })
        })
        .then(res => res.json())
        .then(like => {
            console.log('deleted like',like)
            removeLikeByUser(like);
            setPostLikeCount(likeCount-1);
        })
        .catch(err => console.log(err))
    }

    
    const isPostLikedByUser = (likes_by_user.find(like => {
        //console.log('likedPost: ',like)
        return (like.ref['@ref'].id === id)
    }));
    
    
    return (
        <div className='post-card' >
            <h3>{postedByUserName} is playing</h3>
            <h4>{new Date(createdAt).toLocaleString() }</h4>
            <h1>
                {title}
            </h1>
            <h3>
                {developedBy}
            </h3>
            <p onClick={() => {

               if(!isPostLikedByUser){
                   likePost();
                }else{
                    unlikePost();
                }
            }}>
              {isPostLikedByUser?'liked!!':'_ _'}  { postLikeCount } Likes
            </p>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    likes_by_user: state.likes_by_user.likes_by_user
})

const mapDispatchToProps = dispatch => ({
    addLikeByUser: like => dispatch(addLikeByUser(like)),
    removeLikeByUser: like => dispatch(removeLikeByUser(like))
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