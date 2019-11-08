import React, { useState } from 'react';
import './post-card.styles.scss';

import UIfx from 'uifx';
import waterDropAudio from '../../assets/273869__beskhu__water-drop.wav';

import { connect } from 'react-redux';

import { addLikeByUser, removeLikeByUser } from '../../redux/likes_by_user/likes_by_user.actions';


import LikeButton from '../like-button/like-button.component';

const PostCard = ({ id, data: { title, developedBy, year, type, postedByUserName, createdAt, likeCount }, currentUser, likes_by_user, addLikeByUser, removeLikeByUser, isPostLikedByUser }) => {


    const [clickable, setClickable] = useState(true)
    const [likedUI, setLikedUI] = useState(isPostLikedByUser ? true : false);
    const [postLikeCount, setPostLikeCount] = useState(likeCount);

    const likePost = async () => {
        setClickable(false);
        setLikedUI(true);
        setPostLikeCount(likeCount + 1);
        return fetch('/.netlify/functions/post-like', {
            method: "POST",
            body: JSON.stringify({
                postId: id,
                userId: currentUser.faunadbUserId,
            })
        })
            .then(res => res.json())
            .then(likeData => {
                console.log('fetched like data', likeData)
                addLikeByUser(likeData);
                setClickable(true)
            })
            .catch(err => console.log(err))
    }


    const unlikePost = async () => {
        setClickable(false)
        setLikedUI(false)
        setPostLikeCount(likeCount - 1);
        return fetch('/.netlify/functions/post-unlike', {
            method: "POST",
            body: JSON.stringify({
                postId: id,
                userId: currentUser.faunadbUserId,
            })
        })
            .then(res => res.json())
            .then(like => {
                console.log('deleted like', like)
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

    const dateFormat = (dateString) => {

        const monthObj = {
            1: 'Jan', 2:'Feb', 3:'Mar', 4:'Apr', 5:'May', 6:'Jun', 7:'Jul', 8:'Aug', 9:'Sep', 10:'Oct', 11:'Nov', 12:'Dec'
        }

        const array = dateString.split('/');
        const time= array[2].split(':');
        const formattedDate = `${array[1]}  ${monthObj[array[0]]}  ${time[0]}:${time[1]} ${time[2][3]}${time[2][4]}`;
        return formattedDate;
    }


    return (
        <div className='post-card' >
            <div className='header'>
                <h3>{postedByUserName} is playing</h3>
                <p>{dateFormat(new Date(createdAt).toLocaleString())}</p>
            </div>
            <div className='body'>
                <div className='title'>
                    <h1>{title}</h1>
                </div>
                <div className='details'>
                    <p>
                        Developed By: {developedBy}
                    </p>
                    <p>
                        Year of Release: {year}
                    </p>
                    <p>
                        Type: {type}
                    </p>
                </div>

            </div>
            <div className='footer'>
                <div className='like-btn-div' onClick={() => {
                    if (clickable) {
                        waterDrop.play();
                        if (!isPostLikedByUser) {
                            likePost();
                        } else {
                            unlikePost();
                        }
                    }
                }}>
                    <LikeButton liked={likedUI} />
                </div>
                <p >
                    {postLikeCount ? postLikeCount : ''} {postLikeCount === 0 ? 'no likes' : (postLikeCount > 1 ? 'likes' : 'like')}
                </p>
            </div>


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


