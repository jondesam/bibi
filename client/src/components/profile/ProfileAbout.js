import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileAbout = ({
  profile: {
    bio,

    subscriptions,
    user: { name }
  }
}) => {
  return (
    <div className='profile-about bg-light p-2'>
      {bio && (
        <Fragment>
          <h2 className='text-primary'>{name}'s Bio</h2>
          <p>{bio}</p>
          <div className='line' />
        </Fragment>
      )}
      <h2 className='text-primary'>Subscribed Bibip </h2>

      {subscriptions.map(bibim => {
        return (
          <Link key={bibim._id} to={`../bibims/${bibim.bibimId}`}>
            <p key={bibim._id}>{bibim.bibimName}</p>
          </Link>
        );
      })}
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
