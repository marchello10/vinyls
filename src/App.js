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

import { auth, createUserProfileDocument, firestore, convertCollectionsSnapshotToMap } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';
import { updateGenres } from './redux/shop/shop.actions';

const HomepageWithSpinner = WithSpinner(Homepage);
const AllVinylsPageWithSpinner = WithSpinner(AllVinylsPage);
const GenresPageWithSpinner = WithSpinner(GenresPage); 

class App extends React.Component {
  state = {
    loading: true
  };

  unsubscribeFromAuth = null;
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { setCurrentUser, updateGenres } = this.props;

    //firebase auth
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
      } else {
        setCurrentUser(userAuth); //null
      }
    });

    // get shop data from firestore
    const genreRef = firestore.collection('genres');

    genreRef.onSnapshot(async (snapshot) => {
      const genresMap = convertCollectionsSnapshotToMap(snapshot);
      updateGenres(genresMap);
      this.setState({ loading: false });
    });
  };

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  };

  render() {
    const { loading } =  this.state;
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' 
            render={(props) => <HomepageWithSpinner isLoading={loading} { ...props} />} />
          <Route exact path='/all' 
            render={(props) => <AllVinylsPageWithSpinner isLoading={loading} { ...props} />} />
          <Route path='/genres' 
            render={(props) => <GenresPageWithSpinner isLoading={loading} { ...props} />} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact
            path='/signin'
            render={() =>
              this.props.currentUser ?
                (<Redirect to='/' />
                ) : (
                  <SignInSignUpPage />)} />
        </Switch>
      </div>
    )
  }
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  updateGenres: genresMap => dispatch(updateGenres(genresMap))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
