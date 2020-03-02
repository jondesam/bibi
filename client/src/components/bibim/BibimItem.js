import React, { Fragment, useEffect, useState } from 'react';
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

  let inintialTitle = null;

  if (profile !== null) {
    const result = subscriptions.filter(element =>
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
            {text === null ? inintialTitle : text}
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
