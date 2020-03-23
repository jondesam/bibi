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
  profile: { profile, loading },
  match
}) => {
  const currentBibim = bibims.filter(bibim => match.params.id === bibim._id);

  let inintialTitle = null;

  let [text, setTitle] = useState(inintialTitle);

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  useEffect(() => {
    getBibims();
  }, [getBibims]);

  if (currentBibim.length > 0 && profile !== null) {
    const result = currentBibim[0].subscriptions.filter(element =>
      element.profileId.includes(profile._id)
    );

    if (result.length === 0) {
      inintialTitle = 'Join';
    } else {
      inintialTitle = 'Joined';
    }
  }

  const clickAction = (_id, profile) => {
    if (text === 'Join') {
      addSubscription(_id, profile);
      setTitle('Joined');
    } else {
      removeSubscription(_id, profile);
      setTitle('Join');
    }
  };

  return loading === null ? (
    <p>Please Go Back</p>
  ) : (
    <Fragment>
      {currentBibim.length > 0 ? (
        <div>
          <p className='lead'>
            <i className='fas fa-window-maximize' /> {currentBibim[0].BibimName}{' '}
            Bibip
          </p>

          <div className='bibim-profile '>
            {user !== null ? (
              <PostForm currentBibim={currentBibim[0]}></PostForm>
            ) : null}

            <div className=' bg-light p-1  bibim-intro '>
              <p className='mbottom-025'>{currentBibim[0].description}</p>

              <p>
                Created by {'  '}
                <Link to={`/profile/${currentBibim[0].creater}`}>
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

BibimProfile.propTypes = {
  // getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
  // profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
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
