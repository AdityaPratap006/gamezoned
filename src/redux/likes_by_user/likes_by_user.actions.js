import { SET_LIKES_BY_USER, ADD_LIKE_BY_USER } from './likes_by_user.types';

export const setLikesByUser = (allLikedPosts) => ({
    type: SET_LIKES_BY_USER,
    payload: allLikedPosts
})

export const addLikeByUser = (likedPost) => ({
    type: ADD_LIKE_BY_USER,
    payload: likedPost
})