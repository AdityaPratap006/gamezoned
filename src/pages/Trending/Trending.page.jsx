import React, { useEffect } from 'react';
import './Trending.styles.scss';

import { connect } from 'react-redux';

import PostContainer from '../../components/posts-container/posts-container.component';

const TrendingPage = ({all_posts}) => {

    const compareForMostLiked = (postA, postB) => {
        return (postB.data.likeCount - postA.data.likeCount);
    }

    const mostLikedPosts = all_posts || (all_posts && all_posts.concat().sort(compareForMostLiked))

    useEffect(()=>{



    },[mostLikedPosts])


    return (
        <div className='trending-page'>
            <PostContainer postList={mostLikedPosts} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    all_posts: state.all_posts.all_posts
})

export default connect(
    mapStateToProps,
    null
)(TrendingPage);
