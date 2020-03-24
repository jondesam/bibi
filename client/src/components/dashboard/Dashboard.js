import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardAction';
import Experience from './Experience';
import Education from './Education';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Profile from '../profile/Profile';
import EditProfile from '../profile-forms/EditProfile';

const Dashboard = ({
  getCurrentProfile,
  auth,

  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <Fragment>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.userNname}
      </p>
      <Fragment>
        <p> Bibips </p>

        {profile !== null
          ? profile.subscriptions.map(bibim => (
              <p key={bibim._id}>{bibim.bibimName}</p>
            ))
          : null}

        <EditProfile></EditProfile>
        <div className='my-2'>
          <button className='btn btn-danger' onClick={() => deleteAccount()}>
            Delete My Account
          </button>
        </div>
      </Fragment>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile
  };
};

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
