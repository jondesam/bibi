import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';

import { getProfileById } from '../../reduxActions/profile';
import ProfilePosts from '../posts/ProfilePosts';
import { logout } from '../../reduxActions/auth';

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
  logout
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {/* <Link to='/profiles' className='btn btn-light'>
            Back To Profiles
          </Link> */}
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link
                to='/edit-profile'
                className='btn btn-margin-bottom btn-dark'
              >
                Edit Profile
              </Link>
            )}

          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link
                to='/all-posts'
                className='btn btn-margin-bottom btn-light'
                onClick={() => logout()}
              >
                Log out
              </Link>
            )}

          <div className='profile-grid mtop-01'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
          </div>
          <ProfilePosts match={match}></ProfilePosts>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById, logout })(Profile);
