import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import Dashboard from './components/dashboard/dashboard';
import { clearCurrentProfile } from './actions/profileActions';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import PageNotFound from './components/404/pageNotFound';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

//check for token
if (localStorage.jwtToken) {
  //set the auth token  header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user is authenticated
  store.dispatch(setCurrentUser(decoded));
  //check for expiry
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout the user
    store.dispatch(logoutUser());
    //Create current profile
    store.dispatch(clearCurrentProfile());
    //TODO: clear current profile
    //redirect login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            {/* <div className="container"> */}
            <Switch>
              <Route path="/" component={Landing} exact />
              <Route path="/register" component={Register} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/profiles" component={Profiles} exact />
              <Route path="/profile/:handle" component={Profile} exact />
              <PrivateRoute
                Route
                path="/dashboard"
                component={Dashboard}
                exact
              />
              <PrivateRoute
                Route
                path="/create-profile"
                component={CreateProfile}
                exact
              />
              <PrivateRoute
                Route
                path="/edit-profile"
                component={EditProfile}
                exact
              />
              <PrivateRoute
                Route
                path="/add-experience"
                component={AddExperience}
                exact
              />
              <PrivateRoute
                Route
                path="/add-education"
                component={AddEducation}
                exact
              />
              <PrivateRoute Route path="/feed" component={Posts} exact />
              <PrivateRoute Route path="/post/:id" component={Post} exact />
              <Route component={PageNotFound} exact />
            </Switch>
            {/* </div> */}
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
