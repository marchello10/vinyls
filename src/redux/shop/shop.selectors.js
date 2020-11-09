import { createSelector } from 'reselect';

const selectShop = state => state.shop

const selectGenres = createSelector(
    [selectShop],
    (shop) => shop.genres
)

export const selectGenresForPreview = createSelector(
    [selectGenres],
    (genres) => genres ? (Object.values(genres)) : null
)

export const selectAllVinyls = createSelector(
    [selectGenresForPreview],
    (genres) => (genres ? 
        [].concat.apply([], genres.map((genre) => genre.items))
        :
        []
    )
);

export const selectGenre = (genreUrl) => createSelector(
    [selectGenres],
    (genres) => genres ? (genres[genreUrl]) : null
);

export const selectIsGenresFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
);

export const selectIsGenresLoaded = createSelector(
    [selectShop],
    shop => !!shop.genres
);