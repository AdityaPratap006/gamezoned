import React from 'react';
import './posts-container.styles.scss';

import { connect } from 'react-redux';

import PostCard from '../post-card/post-card.component';

const PostsContainer = ({ postsList }) => {

    const renderPosts = postsList.map(post => (<PostCard
        key={post.ref['@ref'].id}
        id={post.ref['@ref'].id}
        data={post.data}
    />))

    return (
        postsList
            ? (
                <React.Fragment>
                     
                    <div className='posts-container'>
                        
                        {
                            renderPosts
                        }
                         
                    </div>
                </React.Fragment>

            ) : (
                <div>Loading....</div>
            )
    )
}

const mapStateToProps = state => ({
    postsList: state.all_posts.all_posts
})

export default connect(
    mapStateToProps,
    null
)(PostsContainer);
