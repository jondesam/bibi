import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
}) => {
  // console.log('CommentItem _id', _id, postId, auth);
  console.log('auth', auth);

  return (
    <div className=' bg-white p-1 my-05  post-item'>
      <div>
        <p className='mbottom-025  text-normal'>{text}</p>
        <Link className='text-normal xsmall' to={`/profile/${user}`}>
          <p className='inline ph'>by {name} </p>
        </Link>
        <p className='post-date inline my-1 xsmall'>
          on <Moment format='MM/DD/YYYY'>{date}</Moment>
        </p>{' '}
        {auth.isAuthenticated === true
          ? user === auth.user._id && (
              <button
                onClick={() => deleteComment(postId, _id)}
                type='button'
                className='btn-side   '
              >
                <p className='xxsmall '> Delete</p>
              </button>
            )
          : null}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
