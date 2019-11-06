import React, { useState, useEffect } from 'react';
import './post-card.styles.scss';

import { connect } from 'react-redux';

const PostCard = ({id,data:{ title, developedBy, postedByUserName , createdAt, likeCount}, currentUser}) => {

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

    const likePost = () => {

        return fetch('/.netlify/functions/post-like',{
            method:"POST",
            body:JSON.stringify({
                postId:id,
                userId:currentUser.faunadbUserId,
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log('Liked!')
        })
        .catch(err => console.log(err))
    }

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
               likePost()
            }}>
                {likeCount} Likes
            </p>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(
    mapStateToProps,
    null
)(PostCard);
