import { SET_ALL_POSTS } from './all-posts.types';

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

        default:
            return state;
    }
}

export default allPostsReducer;