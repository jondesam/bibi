import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import Linkify from 'react-linkify';
import CommentItem from '../post/CommentItem';
import CommentForm from './CommentForm';
import Modal from 'react-modal';
import Register from '../auth/Register-.js';
import {
  getPost,
  getComments,
  getComment,
  deleteComment,
  addLike,
  removeLike
} from '../../reduxActions/post';

const CcItem = ({
  postId,
  postState: {
    comments,
    post: { _id: topParentId }
  },
  postState,
  post: { _id, text, userName, user, date, bibimName, bibimId, likes },
  auth,
  deleteComment,
  addLike
}) => {
  const clickAction = _id => {
    if (auth.isAuthenticated === true) {
      addLike(_id);
    } else {
      setModalIsOpen(true);
    }
  };

  const componentDecorator = (href, text, key) => (
    <a href={href} key={key} target='_blank' rel='noopener noreferrer'>
      {text}
    </a>
  );

  const [modalIsOpen, setModalIsOpen] = useState(false);

  //Click 'Reply' to open comment box
  const [openBox, setOpenBox] = useState(false);

  const clickReply = () => {
    if (auth.isAuthenticated === true) {
      setOpenBox(!openBox);
    } else {
      setModalIsOpen(true);
    }
  };
  // console.log('CC post', post);

  // console.log('postState', postState);

  return (
    <div className=' bg-white p-1 my-05  post-item'>
      <Linkify
        componentDecorator={componentDecorator}
        className='mbottom-025  text-normal'
      >
        {text}
      </Linkify>

      <div>
        <Link className='text-normal xsmall' to={`/profile/${user}`}>
          <p className='inline ph'>by {userName} </p>
        </Link>
        <p className='post-date inline my-1 xsmall'>
          on <Moment format='MM/DD/YYYY'>{date}</Moment>
        </p>{' '}
        <div>
          <button
            onClick={() => clickAction(_id, 'like')}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-up' />{' '}
            <span>
              {likes ? (
                likes.length > 0 ? (
                  <span>{likes.length}</span>
                ) : null
              ) : null}
            </span>
          </button>
          {_id !== null ? (
            <Fragment>
              <div className='btn btn-primary'>
                <p
                  onClick={() => {
                    clickReply();
                  }}
                >
                  Reply
                </p>
              </div>

              {auth.isAuthenticated === true && null !== auth.user
                ? user === auth.user._id && (
                    <button
                      onClick={() => deleteComment(postId, _id)}
                      type='button'
                      className='btn   '
                    >
                      <p> Delete</p>
                    </button>
                  )
                : null}
              {/* comment form */}
              {/* {openBox ? (
                <CommentForm postId={_id} bibimName={bibimName}></CommentForm>
              ) : null} */}

              {openBox ? (
                <CommentForm
                  postId={_id}
                  bibimName={bibimName}
                  bibimId={bibimId}
                  topParentId={topParentId}
                ></CommentForm>
              ) : null}

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

      {comments.map(comment =>
        comment.parentId === _id ? (
          <CommentItem post={comment} key={comment._id}></CommentItem>
        ) : null
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  postState: state.post
});

export default connect(mapStateToProps, {
  deleteComment,
  getPost,
  getComments,
  getComment,
  addLike
})(CcItem);
