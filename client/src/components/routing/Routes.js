import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../routing/PrivateRoute';
import { connect } from 'react-redux';

import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import AllPosts from '../posts/AllPosts';
import Post from '../post/Post';
import NotFound from '../layout/NotFound';
import CreateBibim from '../bibim/CreateBibim';
import Bibims from '../bibim/Bibims-createPost';
import BibimProfile from '../bibim/BibimProfile';

const Routes = ({ profile: { _id }, auth: { isAuthenticated } }) => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        {isAuthenticated === true ? (
          <Route exact path='/' component={Posts} />
        ) : (
          <Route exact path='/' component={AllPosts} />
        )}

        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:id' component={Profile} />
        <Route exact path='/create-post' component={Bibims} />

        <Route exact path='/all-posts' component={AllPosts} />
        <Route exact path='/posts/:id' component={Post} />

        <PrivateRoute exact path={`/profile/${_id}`} component={Profile} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />

        <PrivateRoute exact path='/bibims/:id' component={BibimProfile} />

        <PrivateRoute exact path='/createBibim' component={CreateBibim} />

        <Route component={NotFound} />
      </Switch>
    </section>
  );
};
const mapStateToProps = state => {
  return {
    profile: state.profile,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Routes);
