import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';

import { getCurrentProfile, deleteAccount } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  auth,
  bibim: { bibims },
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
  bibimid,
  param,
  match
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const currentBibim = bibims.filter(bibim => match.params.id === bibim._id);
  // console.log('currentBibim post', currentBibim);

  // currentBibim.posts.map(post => <p>{post.name}</p>);

  // return <div>Dashboard</div>;
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {currentBibim.length > 0 ? (
        <div>
          <p className='lead'>
            <i className='fas fa-window-maximize' /> Welcome to{' '}
            {user && currentBibim[0].name}
          </p>
          <p>Bibim Name : {bibims && currentBibim[0].name}</p>
          <p>Creater : {currentBibim[0].createrName}</p>
          <p>description :{currentBibim[0].description}</p>
          <p>subscription : {currentBibim[0].subscription.length}</p>
          <p>like : {currentBibim[0].likes.length}</p>
          <p>number of posts : {currentBibim[0].posts.length}</p>
          <div className='posts'>
            {currentBibim[0].posts.map(post => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </div>
      ) : (
        <p>Go back</p>
      )}
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
  // console.log('dashboard state', state);

  return {
    auth: state.auth,
    profile: state.profile,
    bibim: state.bibim
  };
};

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);