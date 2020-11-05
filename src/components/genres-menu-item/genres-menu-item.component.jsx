import React from 'react';
import { withRouter } from 'react-router-dom';

import './genres-menu-item.styles.scss';

const GenresMenuItem = ({ genre, match, history }) => (
    <div className='menu-item' 
        onClick={() => history.push(`${match.url}/${genre.routeName}`)}
    >
        <div 
            style={{
                backgroundImage: `url(${genre.items[0].imageUrl})`
            }}
            className='background-image'
        />
        <div className='content'>
            <h1 className='title'>{genre.title}</h1>
            <span className='subtitle'>SHOP NOW</span>
        </div>
    </div>
);

export default withRouter(GenresMenuItem);