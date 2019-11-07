import { SET_ALL_POSTS } from './all-posts.types';
import { ADD_LIKE_BY_USER, REMOVE_LIKE_BY_USER } from '../likes_by_user/likes_by_user.types';

const INITIAL_STATE = {
    all_posts:null
}

const allPostsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_ALL_POSTS:
            return {
                ...state,
                all_posts: action.payload
            }
        
        case ADD_LIKE_BY_USER:
        case REMOVE_LIKE_BY_USER:
            let indexAdd = state.all_posts.findIndex(post => post.ref['@ref'].id === action.payload.ref['@ref'].id);
            state.all_posts[indexAdd] = action.payload;
            return {
                ...state
            }
               
        default:
            return state;
    }
}

export default allPostsReducer;