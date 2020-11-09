import ShopActionTypes from './shop.types';

const INITIAL_STATE = {
    genres: null,
    isFetching: false,
    errorMessage: undefined
}

const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ShopActionTypes.FETCH_GENRES_START :
            return {
                ...state,
                isFetching: true
            }
        case ShopActionTypes.FETCH_GENRES_SUCCESS :
            return {
                ...state,
                isFetching: false,
                genres: action.payload
            }
        case ShopActionTypes.FETCH_GENRES_FAILURE :
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export default shopReducer;