import React, { useState, useEffect, Fragment } from 'react';
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
  addLike
} from '../../reduxActions/post';

const CcItem = ({
  postId,
  postState: {
    comments,
    post: { _id: topParentId }
  },
  postState,
  post: {
    _id,
    text,
    userName,
    user,
    date,
    bibimName,
    bibimId,
    likes,
    parentId
  },
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

  useEffect(() => {
    setOpenBox(false);
  }, [comments]);
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

  return (
    <div className=' bg-white  p-comment m-comment  post-item comment'>
      {text !== null ? (
        <Fragment>
          <div className='m-0-0-025-0 '>
            {' '}
            <Link className='text-normal xsmall' to={`/profile/${user}`}>
              <p className='inline ph'> {userName} </p>
            </Link>
            <p className='post-date inline my-1 xsmall'>
              on <Moment format='MM/DD/YYYY'>{date}</Moment>
            </p>{' '}
          </div>

          <Linkify
            componentDecorator={componentDecorator}
            className='mbottom-025  text-normal'
          >
            {text}
          </Linkify>

          <div>
            <div>
              <button
                onClick={() => clickAction(_id, 'like')}
                type='button'
                className='btn-comment btn-light'
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
              {_id !== null ? (
                <Fragment>
                  <div
                    className='btn-comment btn-primary'
                    onClick={() => {
                      clickReply();
                    }}
                  >
                    <i className='fas fa-reply'></i>{' '}
                  </div>

                  {auth.isAuthenticated === true && null !== auth.user
                    ? user === auth.user._id && (
                        <button
                          onClick={() => deleteComment(parentId, _id)}
                          type='button'
                          className='btn-comment'
                        >
                          <i className='far fa-trash-alt'></i>
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
        </Fragment>
      ) : (
        <p className='text-deleted'>Comment deleted by user</p>
      )}

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
