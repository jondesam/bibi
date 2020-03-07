import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import { addSubscription, removeSubscription } from '../../actions/bibim.ts';
import { Link } from 'react-router-dom';

import {
  getCurrentProfile,
  getProfiles,
  deleteAccount,
  getProfileById
} from '../../actions/profile';

import { getBibims } from '../../actions/bibim';

import Profile from '../profile/Profile';
import PostForm from '../posts/PostForm.js';

const BibimProfile = ({
  getProfileById,
  getBibims,
  addSubscription,
  removeSubscription,
  getProfiles,
  getCurrentProfile,
  bibim: { bibims },
  auth: { user },
  profile: { profile, loading, profiles },
  match
}) => {
  console.log('profiel', profile);

  const currentBibim = bibims.filter(bibim => match.params.id === bibim._id);

  //  if currentBibim.filter(bibim => bibim.bibimId === )

  let inintialTitle = null;

  let [text, setTitle] = useState(inintialTitle);

  useEffect(() => {
    getCurrentProfile();
  }, []);

  useEffect(() => {
    getProfiles();
  }, []);

  useEffect(() => {
    getBibims();
  }, []);

  console.log('bibims', bibims);

  // console.log('current profile', profile);

  if (currentBibim.length > 0 && profile !== null) {
    const result = currentBibim[0].subscriptions.filter(element =>
      element.profileId.includes(profile._id)
    );
    console.log('result', result);

    if (result.length === 0) {
      inintialTitle = 'Subscribe';
    } else {
      inintialTitle = 'Unsubscribe';
    }
    console.log('inintialTitle 1', inintialTitle);
  }

  console.log('inintialTitle 2', inintialTitle);

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

  console.log('currentBibim', currentBibim);

  console.log('profile', profile);

  return loading === null ? (
    <p>Please Go Back</p>
  ) : (
    <Fragment>
      {currentBibim.length > 0 ? (
        <div>
          <p className='lead'>
            <i className='fas fa-window-maximize' /> {currentBibim[0].name}{' '}
            Bibim
          </p>

          <div className='bibim-profile'>
            {user !== null ? (
              <PostForm currentBibim={currentBibim[0]}></PostForm>
            ) : null}

            <div className=' bg-light p-1 bibim-intro '>
              <p>{currentBibim[0].description}</p>

              <p>
                Created by {'  '}
                <Link to={`/profile/${currentBibim.creater}`}>
                  <span>{currentBibim[0].createrName}</span>{' '}
                </Link>
              </p>

              <p>
                Subscriptions :{' '}
                {currentBibim[0].subscriptions &&
                  currentBibim[0].subscriptions.length}
              </p>
              <p>Total posts : {currentBibim[0].posts.length}</p>
              {user !== null ? (
                <button
                  type='button'
                  className='btn btn-dark '
                  onClick={() => clickAction(currentBibim[0]._id, profile)}
                >
                  {text === null ? inintialTitle : text}
                </button>
              ) : null}
            </div>
          </div>

          <div className='posts post-item'>
            {currentBibim[0].posts.map(post => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </div>
      ) : (
        <Spinner></Spinner>
      )}
    </Fragment>
  );
};

// BibimProfile.propTypes = {
//   // getCurrentProfile: PropTypes.func.isRequired,
//   deleteAccount: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired
//   // profile: PropTypes.object.isRequired
// };

const mapStateToProps = state => {
  // console.log('state profile', state);

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
  deleteAccount,
  getBibims,
  getProfiles,
  getProfileById
})(BibimProfile);
