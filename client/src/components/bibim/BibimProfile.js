import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import { addSubscription, removeSubscription } from '../../actions/bibim.ts';

import { getCurrentProfile, deleteAccount } from '../../actions/profile';

const Dashboard = ({
  addSubscription,
  removeSubscription,
  bibim: { bibims },
  auth: { user },
  profile: { profile, loading },
  match
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  console.log('bibims', bibims);

  const currentBibim = bibims.filter(bibim => match.params.id === bibim._id);

  console.log('currentBibim', currentBibim);

  let inintialTitle = null;

  if (currentBibim.length > 0) {
    const result = currentBibim[0].subscriptions.filter(element =>
      element.profileId.includes(profile._id)
    );

    if (result.length === 0) {
      inintialTitle = 'Subscribe';
    } else {
      inintialTitle = 'Unsubscribe';
    }
  }

  let [text, setTitle] = useState(inintialTitle);

  const clickAction = (_id, profile) => {
    if (text === 'Subscribe') {
      addSubscription(_id, profile);
      setTitle('Unsubscribe');
    } else {
      removeSubscription(_id, profile);
      setTitle('Subscribe');
    }
  };

  // console.log(currentBibim[0].name, currentBibim[0]._id);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {currentBibim.length > 0 ? (
        <div>
          <p className='lead'>
            <i className='fas fa-window-maximize' />{' '}
            {user && currentBibim[0].name} Bibim
          </p>
          <button
            type='button'
            className='btn btn-light'
            onClick={() => clickAction(currentBibim[0]._id, profile)}
          >
            {text === null ? inintialTitle : text}
          </button>

          <p>Bibim Name : {bibims && currentBibim[0].name}</p>
          <p>Creater : {currentBibim[0].createrName}</p>
          <p>Description :{currentBibim[0].description}</p>
          <p>
            Subscription :{' '}
            {currentBibim[0].subscriptions &&
              currentBibim[0].subscriptions.length}
          </p>
          <p>Like : {currentBibim[0].likes.length}</p>
          <p>Number of posts : {currentBibim[0].posts.length}</p>
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

export default connect(mapStateToProps, {
  addSubscription,
  removeSubscription,
  getCurrentProfile,
  deleteAccount
})(Dashboard);
