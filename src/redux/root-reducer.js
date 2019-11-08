import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import allPostsReducer from './all_posts/all-posts.reducer';
import likesByUserReducer from './likes_by_user/likes_by_user.reducer';
import trendingPostsReducer from './trending_posts/trending-posts.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user' ]
}

const rootReducer = combineReducers({
    user: userReducer,
    all_posts: allPostsReducer,
    likes_by_user: likesByUserReducer,
    trending_posts: trendingPostsReducer
});

export default persistReducer(persistConfig, rootReducer);