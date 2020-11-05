import ShopActionTypes from './shop.types';

const INITIAL_STATE = {
    genres: null
}

const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ShopActionTypes.UPDATE_GENRES :
            return {
                ...state,
                genres: action.payload
            }
        default:
            return state;
    }
}

export default shopReducer;