import React from 'react';
import { Route } from 'react-router-dom';

import GenresMenu from '../../components/genres-menu/genres-menu.component';
import GenrePage from '../../pages/genre/genre.component';

import './genres.styles.scss';

const GenresPage = ({ match }) => (
    <div className='genres-menu'>
        <Route exact path={`${match.path}`} component={GenresMenu} />
        <Route path={`${match.path}/:genreId`} component={GenrePage} />
    </div>
);

export default GenresPage;