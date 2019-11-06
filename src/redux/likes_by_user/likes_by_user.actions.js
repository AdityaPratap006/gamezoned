import { SET_LIKES_BY_USER } from './likes_by_user.types';

export const setLikesByUser = (likes) => ({
    type: SET_LIKES_BY_USER,
    payload: likes
})