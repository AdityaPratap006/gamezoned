import { SET_ALL_POSTS } from './all-posts.types';

export const setAllPosts = (posts) => ({
    type:SET_ALL_POSTS,
    payload:posts
})