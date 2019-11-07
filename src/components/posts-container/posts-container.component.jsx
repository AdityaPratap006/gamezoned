import React, { useEffect} from 'react';
import './posts-container.styles.scss';

import { connect } from 'react-redux';

import PostCard from '../post-card/post-card.component';

const PostsContainer = ({ all_posts, likes_by_user }) => {

    useEffect(() => {
    
    }, [likes_by_user])

    return (
        all_posts
            ? (
                <React.Fragment>

                    <div className='posts-container'>

                        {
                            all_posts.map(post => {

                                const isPostLikedByUser = (likes_by_user.find(like => {
                                    console.log('likedPost: ',like)
                                    return (like.ref['@ref'].id === post.ref['@ref'].id);
                                }))? true : false;

                                 return(<PostCard
                                    key={post.ref['@ref'].id}
                                    id={post.ref['@ref'].id}
                                    data={post.data}
                                    isPostLikedByUser={isPostLikedByUser}
                                />)
                            })
                        }

                    </div>
                </React.Fragment>

            ) : (
                <div>Loading....</div>
            )
    )
}

const mapStateToProps = state => ({
    all_posts: state.all_posts.all_posts,
    likes_by_user: state.likes_by_user.likes_by_user
})

export default connect(
    mapStateToProps,
    null
)(PostsContainer);
