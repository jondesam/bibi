import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const BibimItem = ({
  removeLike,
  deletePost,

  bibim: { _id, createrName, date, likes, name, description, creater }
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/bibims/${_id}`}>
        <p className='my-1'>Bibim name : {name}</p>
      </Link>
    </div>
    <div>
      <p className='my-1'>description : {description}</p>
      <Link to={`/profile/${creater}`}>
        <h4>{createrName}</h4>
      </Link>
      <p className='post-date'>
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>

      <Fragment>
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

export default BibimItem;
