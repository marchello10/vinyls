import ShopActionTypes from './shop.types';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchGenresStart = () => ({
    type: ShopActionTypes.FETCH_GENRES_START,
});

export const fetchGenresSuccess = genresMap => ({
    type: ShopActionTypes.FETCH_GENRES_SUCCESS,
    payload: genresMap
})

export const fetchGenresFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_GENRES_FAILURE,
    payload: errorMessage
})

//redux thunk
export const fetchGenresStartAsync = () => {
    return dispatch => {
        const genreRef = firestore.collection('genres');
        dispatch(fetchGenresStart());

        //code inside runs when request resolves
        genreRef
            .get()
            .then(snapshot => {
                const genresMap = convertCollectionsSnapshotToMap(snapshot);
                dispatch(fetchGenresSuccess(genresMap));
            })
            .catch(error => dispatch(fetchGenresFailure(error.message)));
    };
};

