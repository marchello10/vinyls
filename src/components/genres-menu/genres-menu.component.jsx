import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectGenresForPreview } from '../../redux/shop/shop.selectors';
import GenresMenuItem from '../genres-menu-item/genres-menu-item.component';

import './genres-menu.styles.scss';

const GenresMenu = ({ genres }) => (
    <div className='genre-menu'>
        {
            genres.map((genre) => (
                <GenresMenuItem key={genre.id} genre={genre} />
            ))
        }
    </div>
)

const mapStateToProps = createStructuredSelector({
    genres: selectGenresForPreview
})

export default connect(mapStateToProps)(GenresMenu);