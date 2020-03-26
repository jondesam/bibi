import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addSubscription, removeSubscription } from '../../reduxActions/bibim';
import { getCurrentProfile } from '../../reduxActions/profile';

const BibimItem = ({
  addSubscription,
  getCurrentProfile,
  removeSubscription,
  bibim: {
    _id,
    createrName,
    date,
    likes,
    bibimName,
    description,
    creater,
    subscriptions
  },
  profile: { profile }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  let inintialTitle = null;

  if (profile !== null) {
    const result = subscriptions.filter(element =>
      element.profileId.includes(profile._id)
    );
    if (result.length === 0) {
      inintialTitle = 'Join';
    } else {
      inintialTitle = 'Joined';
    }
  }

  let [text, setTitle] = useState(inintialTitle);

  const clickAction = (_id, profile) => {
    if (text === 'Join') {
      addSubscription(_id, profile);
      setTitle('Joined');
    } else {
      removeSubscription(_id, profile);
      setTitle('Join');
    }
  };

  return (
    <div className=' bg-white p-025-1 my-05 '>
      <div>
        <Link to={`/bibims/${_id}`}>
          <p className='my-05 ph'> {bibimName}</p>
        </Link>
      </div>
      <div>
        <p className='my-05 text-normal inline'>{description}</p>
        <Link to={`/profile/${creater}`}>
          <p className='text-normal ph'> Created by {createrName}</p>
        </Link>
        <p className='post-date inline'>
          on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>

        <div>
          <button
            type='button'
            className='btn btn-dark my-05'
            onClick={() => clickAction(_id, profile)}
          >
            {text === null ? inintialTitle : text}
          </button>

          {/* postuser === logged in user */}
        </div>
      </div>
    </div>
  );
};
BibimItem.defaultProps = {
  showActions: true
};

// {profile !== null
//   ? subscriptions.filter(element =>
//       element.profileId.includes(profile._id)
//     )
//     ? 'Unsub'
//     : 'Sub'
//   : null}

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

export default connect(mapStateToProps, {
  addSubscription,
  removeSubscription,
  getCurrentProfile
})(BibimItem);
