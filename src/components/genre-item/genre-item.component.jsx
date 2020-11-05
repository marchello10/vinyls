import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';

import { addItem } from '../../redux/cart/cart.actions';

import './genre-item.styles.scss'

const GenreItem = ({ item, addItem }) => {
    const { price, imageUrl, name } = item;
    return (
        <div className='genre-item'>
            <div 
                className='image'
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />
            <div className='genre-footer'>
                <span className='name'>{name}</span>
                <span className='price'>{`€${price}`}</span>
            </div>
            <CustomButton 
                onClick={() => addItem(item)}
                //className='custom-button' 
                inverted
            >
                Add to cart 
            </CustomButton>
        </div>
    )};

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
});

export default connect(null, mapDispatchToProps)(GenreItem);