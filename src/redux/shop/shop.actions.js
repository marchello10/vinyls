import ShopActionTypes from './shop.types';

export const updateGenres = (genresMap) => ({
    type: ShopActionTypes.UPDATE_GENRES,
    payload: genresMap
});