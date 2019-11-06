import { SET_LIKES_BY_USER, ADD_LIKE_BY_USER } from './likes_by_user.types';

const initialState = {
    likes_by_user: []
}

const likesByUserReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_LIKES_BY_USER:
            return {
                ...state,
                likes_by_user:action.payload
            }
        case ADD_LIKE_BY_USER:
            return {
                ...state,
                 likes_by_user:[
                        ...state.likes_by_user,
                         action.payload
                ]
                
            }
    
        default:
            return {
                ...state
            }
    }
}

export default likesByUserReducer;