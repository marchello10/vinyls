import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import './header.styles.scss';

const Header = ({ currentUser, hidden }) => {

    return (
        <div className='header'>
            <Link className='name-container' to='/'>
                Vinyl Shop
            </Link>
            <div className='options'>
                <Link className='option' to='/all'>ALL VINYLS</Link>
                <Link className='option' to='/genres'>GENRES</Link>
                {
                    currentUser ?
                        (<div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>)
                        :
                        (<Link className='option' to='/signin'>SIGN IN</Link>)
                }
                <CartIcon />
            </div>
            { hidden ? null : <CartDropdown />}
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);