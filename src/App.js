import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import Homepage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import AllVinylsPage from './pages/all-vinyls/all-vinyls.component';
import GenresPage from './pages/genres/genres.component';
import SignInSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import WithSpinner from './components/with-spinner/with-spinner.component';

import { fetchGenresStartAsync } from './redux/shop/shop.actions';
import { selectIsGenresFetching, selectIsGenresLoaded  } from './redux/shop/shop.selectors';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';

const HomepageWithSpinner = WithSpinner(Homepage);
const AllVinylsPageWithSpinner = WithSpinner(AllVinylsPage);
const GenresPageWithSpinner = WithSpinner(GenresPage); 

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser, fetchGenresStartAsync } = this.props;

    //firebase auth
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.get().then(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
      } else {
        setCurrentUser(userAuth); //null
      }
    });

    //get data from firestore
    fetchGenresStartAsync();
  };

  render() {
    const { currentUser, isFetching, isLoaded } = this.props;

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' 
            render={(props) => <HomepageWithSpinner isLoading={!isLoaded} { ...props} />} />
          <Route exact path='/all' 
            render={(props) => <AllVinylsPageWithSpinner isLoading={isFetching} { ...props} />} />
          <Route path='/genres' 
            render={(props) => <GenresPageWithSpinner isLoading={!isLoaded} { ...props} />} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact
            path='/signin'
            render={() =>
              currentUser ?
                (<Redirect to='/' />
                ) : (
                  <SignInSignUpPage />)} />
        </Switch>
      </div>
    )
  }
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isFetching: selectIsGenresFetching,
  isLoaded: selectIsGenresLoaded
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  fetchGenresStartAsync: () => dispatch(fetchGenresStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
