import { SET_TRENDING_POSTS } from './trending-posts.types';

export const setTrendingPosts = (posts) => ({
    type:SET_TRENDING_POSTS,
    payload:posts
})