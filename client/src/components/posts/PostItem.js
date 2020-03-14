import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
import Modal from 'react-modal';
import Register from '../auth/Register-.js';
import Linkify from 'react-linkify';

Modal.setAppElement('#root');

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, user, likes, comments, date, bibimName, bibim }
}) => {
  const clickAction = (_id, value) => {
    if (auth.isAuthenticated === true) {
      if (value === 'like') {
        addLike(_id);
      } else if (value === 'unlike') {
        removeLike(_id);
      }
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
        <Linkify
          componentDecorator={componentDecorator}
          className='mbottom-025  text-normal'
        >
          {text}
        </Linkify>

        <div className=''>
          <Link className='text-normal xsmall' to={`/profile/${user}`}>
            <p className='inline text-normal ph'> {name} </p>
          </Link>
          <Link to={`/bibims/${bibim}`}>
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

          <div>
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
                        className='btn'
                      >
                        <p> Delete</p>
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
