import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import allPostsReducer from './all_posts/all-posts.reducer';
import likesByUserReducer from './likes_by_user/likes_by_user.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user','likes_by_user']
}

const rootReducer = combineReducers({
    user: userReducer,
    all_posts: allPostsReducer,
    likes_by_user: likesByUserReducer
});

export default persistReducer(persistConfig, rootReducer);