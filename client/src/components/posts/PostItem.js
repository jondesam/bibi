import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import {
  addLike,
  removeLike,
  deletePost,
  getPost
} from '../../reduxActions/post';
import Modal from 'react-modal';
import Register from '../auth/Register-.js';
import Linkify from 'react-linkify';

Modal.setAppElement('#root');

const PostItem = ({
  getPost,
  addLike,
  removeLike,
  deletePost,
  auth,
  post: {
    _id,
    text,
    userName,
    user,
    likes,
    comments,
    date,
    bibimName,
    bibimId,
    parentId
  },
  postState
}) => {
  const clickAction = _id => {
    if (auth.isAuthenticated === true) {
      addLike(_id);
    } else {
      setModalIsOpen(true);
    }
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const componentDecorator = (href, text, key) => (
    <a href={href} key={key} target='_blank' rel='noopener noreferrer'>
      {text}
    </a>
  );

  return (
    <div>
      <div className='bg-white p-1 my-05 post-item'>
        <div className='m-0-0-025-0 '>
          <Link className='text-normal xsmall' to={`/profile/${user}`}>
            <p className='inline text-normal ph'>{userName} </p>
          </Link>
          <Link to={`/bibims/${bibimId}`}>
            {bibimName && (
              <p className='inline text-normal ph my-1 xsmall'>
                {' '}
                in <span>{bibimName} </span>bibip
              </p>
            )}
          </Link>

          <p className='post-date inline my-1 xsmall'>
            {' '}
            on <Moment format='MM/DD/YYYY'>{date}</Moment>
          </p>
        </div>

        <Linkify
          componentDecorator={componentDecorator}
          className='mbottom-025  text-normal'
        >
          {text}
        </Linkify>

        <div className=''>
          <div>
            {_id !== null ? (
              <Fragment>
                <button
                  onClick={() => clickAction(_id, 'like')}
                  type='button'
                  className='btn btn-light'
                >
                  <i className='fas fa-heart'></i>{' '}
                  <span>
                    {likes ? (
                      likes.length > 0 ? (
                        <span>{likes.length}</span>
                      ) : null
                    ) : null}
                  </span>
                </button>

                {_id ? (
                  <Link to={`/posts/${_id}`} className='btn btn-primary'>
                    {comments.length > 1 ? (
                      <p>
                        <span className='comment-count'>{comments.length}</span>{' '}
                        Comments
                      </p>
                    ) : comments.length === 1 ? (
                      <p>
                        <span className='comment-count'>{comments.length}</span>{' '}
                        Comment
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
                        className='btn'
                      >
                        <i className='far fa-trash-alt'></i>
                      </button>
                    )
                  : null}

                {/* postuser === logged in user */}
              </Fragment>
            ) : null}
          </div>

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

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  // post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth,
  bibim: state.bibim,
  postState: state.post
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deletePost,
  getPost
})(PostItem);
