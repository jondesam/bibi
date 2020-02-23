import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addSubscription } from '../../actions/bibim';
import { getCurrentProfile } from '../../actions/profile';

const BibimItem = ({
  removeLike,
  deletePost,
  addSubscription,
  getCurrentProfile,
  bibim: {
    _id,
    createrName,
    date,
    likes,
    name,
    description,
    creater,
    subscriptions
  },
  profile: { profile }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  console.log('profile', profile);
  // const profileId = profile._id;
  const formData = { _id, profile };

  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/bibims/${_id}`}>
          <p className='my-1'> {name}</p>
        </Link>
      </div>
      <div>
        <p className='my-1'>description : {description}</p>
        <Link to={`/profile/${creater}`}>
          <h4>Creater : {createrName}</h4>
        </Link>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>

        <Fragment>
          <button
            type='button'
            className='btn btn-light'
            onClick={() => addSubscription(_id, profile)}
          >
            Subscribe
            <span>
              {subscriptions.length > 0 && <span>{subscriptions.length}</span>}
            </span>
          </button>
          <button
            //   onClick={() => addLike(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-up' />{' '}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button
            onClick={() => removeLike(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-down' />
          </button>
          {/* postuser === logged in user */}
          <button
            onClick={() => deletePost(_id)}
            type='button'
            className='btn btn-danger'
          >
            <i className='fas fa-times' />
          </button>
        </Fragment>
      </div>
    </div>
  );
};
BibimItem.defaultProps = {
  showActions: true
};

// BibimItem.propTypes = {
//   post: PropTypes.object.isRequired,
//   auth: PropTypes.object.isRequired,
//   addLike: PropTypes.func.isRequired,
//   removeLike: PropTypes.func.isRequired,
//   deletePost: PropTypes.func.isRequired,
//   showActions: PropTypes.bool
// };

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { addSubscription, getCurrentProfile })(
  BibimItem
);
