import React from 'react';

import { connect } from 'react-redux';

import { selectGenre } from '../../redux/shop/shop.selectors';
import GenreItem from '../../components/genre-item/genre-item.component';

import './genre.styles.scss';

const GenrePage = ({ genre }) => (
    <div className='genre-page'>
        <h2 className='title'>{genre.title}</h2>
        <div className='items'>
            {
                genre.items.map((item) =>
                    <GenreItem key={item.id} item={item} />
                )
            }
        </div>
    </div>
);

const mapStateToProps = (state, ownProps) => ({
    genre: selectGenre(ownProps.match.params.genreId)(state)
});

export default connect(mapStateToProps)(GenrePage);