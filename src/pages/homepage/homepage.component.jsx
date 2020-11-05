import React from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

import GenrePreview from '../../components/genre-preview/genre-preview.component';
import { selectGenresForPreview } from '../../redux/shop/shop.selectors';

const Homepage = ({ genres }) => {

    return (
        <div>
            {
                genres.map(({id, ...genreProps}) => (
                    <GenrePreview key={id} { ...genreProps }/>
                ))
            }
        </div>
    )

}

const mapStateToProps = createStructuredSelector({
    genres: selectGenresForPreview
});

export default connect(mapStateToProps)(Homepage);