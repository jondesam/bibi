import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
import Modal from 'react-modal';
import Register from '../auth/Register.tsx';

Modal.setAppElement('#root');

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: {
    _id,
    text,
    name,
    avatar,
    user,
    likes,
    comments,
    date,
    bibimName,
    bibim
  },
  noReplyBtn
}) => {
  const clickAction = (_id, value) => {
    if (auth.isAuthenticated === true) {
      if (value === 'like') {
        console.log('like');

        addLike(_id);
      } else if (value === 'unlike') {
        console.log('unlike');

        removeLike(_id);
      }
    } else {
      setModalIsOpen(true);
    }
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <div className='bg-white p-1 my-1 post-item'>
        <div>
          <p className='my-1  text-normal'>{text}</p>
          <Link className='text-normal' to={`/profile/${user}`}>
            <p className='inline text-normal ph'> by {name} </p>
          </Link>
          <Link to={`/bibims/${bibim}`}>
            {bibimName && (
              <p className='inline text-normal ph'>
                {' '}
                in <span>{bibimName} </span>bibim
              </p>
            )}
          </Link>

          <p className='post-date'>
            Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
          </p>

          {_id !== null ? (
            <Fragment>
              <button
                onClick={() => clickAction(_id, 'like')}
                type='button'
                className='btn btn-light'
              >
                <i className='fas fa-thumbs-up' />{' '}
                <span>
                  {likes.length > 0 ? <span>{likes.length}</span> : null}
                </span>
              </button>

              <button
                onClick={() => clickAction(_id, 'unlike')}
                type='button'
                className='btn btn-light'
              >
                <i className='fas fa-thumbs-down' />
              </button>

              {_id ? (
                <Link to={`/posts/${_id}`} className='btn btn-primary'>
                  {comments.length > 1 ? (
                    <p>
                      <span className='comment-count'>{comments.length}</span>{' '}
                      commnets
                    </p>
                  ) : comments.length === 1 ? (
                    <p>
                      <span className='comment-count'>{comments.length}</span>{' '}
                      comment
                    </p>
                  ) : (
                    <p>Reply</p>
                  )}
                </Link>
              ) : null}

              {auth.user
                ? user === auth.user._id && (
                    <button
                      onClick={() => deletePost(_id)}
                      type='button'
                      className='btn btn-danger'
                    >
                      <i className='fas fa-times' />
                    </button>
                  )
                : null}

              {/* postuser === logged in user */}
            </Fragment>
          ) : null}

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            style={{
              content: { top: '130px', bottom: '30px', padding: '40px' }
            }}
          >
            <Register></Register>
          </Modal>
        </div>
      </div>
    </div>
  );
};

//SHOULD WORK BUT.....
// {auth.user_id
//   ? user === auth.user._id && (
//       <button
//         onClick={() => deletePost(_id)}
//         type='button'
//         className='btn btn-danger'
//       >
//         <i className='fas fa-times' />
//         <p>adf</p>
//       </button>
//     )
//   : null}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth,
  bibim: state.bibim
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
