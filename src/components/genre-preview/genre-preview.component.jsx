import React from 'react';

import GenreItem from '../genre-item/genre-item.component';

import './genre-preview.styles.scss';

const GenrePreview = ({ title, items }) => {

    return (
        <div className='genre-preview'>
            <h1 className='title'>
                {title.toUpperCase()}
            </h1>
            <div className='preview'>
                {
                    items
                        .filter((item, idx) => idx < 4)
                        .map(( item ) => (
                        <GenreItem key={item.id} item={item} />
                    ))
                }
            </div>
        </div>

    )
}

export default GenrePreview;