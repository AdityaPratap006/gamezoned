import React from 'react';
import './posts-container.styles.scss';

import { connect } from 'react-redux';

import PostCard from '../post-card/post-card.component';

const PostsContainer = ({ all_posts }) => {



    return (
        all_posts
            ? (
                <React.Fragment>

                    <div className='posts-container'>

                        {
                            all_posts.map(post => (<PostCard
                                key={post.ref['@ref'].id}
                                id={post.ref['@ref'].id}
                                data={post.data}
                            />))
                        }

                    </div>
                </React.Fragment>

            ) : (
                <div>Loading....</div>
            )
    )
}

const mapStateToProps = state => ({
    all_posts: state.all_posts.all_posts
})

export default connect(
    mapStateToProps,
    null
)(PostsContainer);
