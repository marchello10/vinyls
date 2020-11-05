import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectAllVinyls } from '../../redux/shop/shop.selectors';
import GenreItem from '../../components/genre-item/genre-item.component';

import './all-vinyls.styles.scss';

const AllVinylsPage = ({ items }) => (
    <div className='all-vinyls'>
        <div className='items' >
        {
            items.map((item) => (
                <GenreItem key={item.id} item={item} />
            ))
        }        
        </div>
    </div>
);

const mapStateToProps = createStructuredSelector({
    items: selectAllVinyls
});

export default connect(mapStateToProps)(AllVinylsPage);