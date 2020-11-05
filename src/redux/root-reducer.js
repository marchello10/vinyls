import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //localStorage

import shopReducer from './shop/shop.reducer';
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const rootReducuer = combineReducers({
    shop: shopReducer,
    user: userReducer,
    cart: cartReducer
});

export default persistReducer(persistConfig, rootReducuer);