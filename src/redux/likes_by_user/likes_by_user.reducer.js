import { SET_LIKES_BY_USER, ADD_LIKE_BY_USER, REMOVE_LIKE_BY_USER } from './likes_by_user.types';

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
        
        case REMOVE_LIKE_BY_USER:
            return {
                ...state,
                 likes_by_user: state.likes_by_user.filter(like => like.ref['@ref'].id === action.payload.ref['@ref'].id)
            } 
    
        default:
            return {
                ...state
            }
    }
}

export default likesByUserReducer;