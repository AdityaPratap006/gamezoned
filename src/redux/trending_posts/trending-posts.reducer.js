import { SET_TRENDING_POSTS } from './trending-posts.types';
import { ADD_LIKE_BY_USER, REMOVE_LIKE_BY_USER } from '../likes_by_user/likes_by_user.types';

const INITIAL_STATE = {
    trending_posts:[]
}

const trendingPostsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_TRENDING_POSTS:
            return {
                ...state,
                trending_posts: action.payload
            }
        
        case ADD_LIKE_BY_USER:
        case REMOVE_LIKE_BY_USER:
            let index = state.trending_posts.findIndex(post => post.ref['@ref'].id === action.payload.ref['@ref'].id);
            state.trending_posts[index] = action.payload;
            return {
                ...state
            }
               
        default:
            return state;
    }
}

export default trendingPostsReducer;