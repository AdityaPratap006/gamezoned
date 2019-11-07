import React, { useState } from 'react';
import './post-card.styles.scss';

import UIfx from 'uifx';
import waterDropAudio from '../../assets/273869__beskhu__water-drop.wav';

import { connect } from 'react-redux';

import { addLikeByUser, removeLikeByUser } from '../../redux/likes_by_user/likes_by_user.actions';

const PostCard = ({id,data:{ title, developedBy, postedByUserName , createdAt, likeCount}, currentUser, likes_by_user, addLikeByUser, removeLikeByUser, isPostLikedByUser}) => {
 
    console.log(id, {isPostLikedByUser})
    const [clickable, setClickable] = useState(true)
    const [likedUI, setLikedUI ] = useState(isPostLikedByUser? true : false);
    const [postLikeCount, setPostLikeCount] = useState(likeCount);

    const likePost = async () => {
        setClickable(false);
        setLikedUI(true);
        setPostLikeCount(likeCount+1);
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
           setClickable(true)
        })
        .catch(err => console.log(err))
    }


    const unlikePost = async () => {
        setClickable(false)
        setLikedUI(false)
        setPostLikeCount(likeCount-1);
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
            
            setClickable(true)
        })
        .catch(err => console.log(err))
    }
    
    const waterDrop = new UIfx(
        waterDropAudio,
        {
          volume: 0.6, // number between 0.0 ~ 1.0
          throttleMs: 50
        }
      )

    
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

                if(clickable){
                    waterDrop.play();
                    if(!isPostLikedByUser){
                        likePost();
                     }else{
                         unlikePost();
                     }
                     
                }
            }}>
              { likedUI  ?'liked!!':'_ _'}  { postLikeCount } Likes
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


