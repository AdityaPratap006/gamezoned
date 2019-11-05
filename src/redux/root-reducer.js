import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import allPostsReducer from './all_posts/all-posts.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user','all_posts']
}

const rootReducer = combineReducers({
    user: userReducer,
    all_posts: allPostsReducer
});

export default persistReducer(persistConfig, rootReducer);