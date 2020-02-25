import React, { Fragment, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addSubscription, removeSubscription } from '../../actions/bibim';
import { getCurrentProfile } from '../../actions/profile';

const BibimItem = ({
  addSubscription,
  getCurrentProfile,
  removeSubscription,
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
  console.log('subscriptions', subscriptions);

  let buttonTitle = 'Subscribe';

  if (profile !== null) {
    const result = subscriptions.filter(element =>
      element.profileId.includes(profile._id)
    );
    if (result.length === 0) {
      buttonTitle = 'Subscribe';
    } else {
      buttonTitle = 'Unubscribe';
    }
  }

  const clickAction = (_id, profile) => {
    if (buttonTitle === 'Subscribe') {
      addSubscription(_id, profile);
    } else {
      removeSubscription(_id, profile);
    }
  };

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
            onClick={() => clickAction(_id, profile)}
          >
            {buttonTitle}
          </button>

          {/* postuser === logged in user */}
        </Fragment>
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
