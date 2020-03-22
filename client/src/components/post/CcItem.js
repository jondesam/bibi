import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import Linkify from 'react-linkify';
import PostItem from '../posts/PostItem';
import CommentItem from '../post/CommentItem';
import CommentForm from './CommentForm';
import {
  getPost,
  getComments,
  addComment,
  deleteComment,
  addLike,
  removeLike,
  deletePost
} from '../../actions/post';
import { strictEqual } from 'assert';
import { stringify } from 'querystring';

const CcItem = ({
  postId,

  commentsFromState,
  post: { _id, text, userName, avatar, user, date, likes, bibimName },
  auth,
  deleteComment,
  getPost,
  getComments
}) => {
  const parentPostsThatHasComments = [];

  commentsFromState.post.comments.map(comment => {
    parentPostsThatHasComments.push(comment._id);
  });

  useEffect(() => {
    getComments(1, 10, true, parentPostsThatHasComments);
  }, [getComments]);

  const componentDecorator = (href, text, key) => (
    <a href={href} key={key} target='_blank' rel='noopener noreferrer'>
      {text}
    </a>
  );

  let str = postId.toString();

  let commentsShowedHere = [];
  commentsFromState.comments.map(comment => {
    commentsShowedHere.push(comment);
  });

  let postsThatHaveCommentsToShow = [];

  commentsShowedHere.map(comment => {
    if (comment.comments.length > 0) {
      postsThatHaveCommentsToShow.push(comment.comments);
    }
  });

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

  //Click 'Reply' to open comment box
  const [openBox, setOpenBox] = useState(false);

  const clcikReply = () => {
    setOpenBox(!openBox);
  };

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
          {_id !== null ? (
            <Fragment>
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
              <button
                onClick={() => clickAction(_id, 'unlike')}
                type='button'
                className='btn btn-light'
              >
                <i className='fas fa-thumbs-down' />
              </button>
              <div className='btn btn-primary'>
                <p
                  onClick={() => {
                    clcikReply();
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
              {openBox ? (
                <CommentForm postId={_id} bibimName={bibimName}></CommentForm>
              ) : null}

              {commentsShowedHere.map(post =>
                post.comments.length > 0 && postId === post._id
                  ? post.comments.map(comment => (
                      <CommentItem
                        post={comment}
                        key={comment._id}
                        postId={comment._id}
                      ></CommentItem>
                    ))
                  : null
              )}

              {/* {commentsShowedHere.map(post =>
                post._id === postId && post.comments ? (
                  <CommentItem></CommentItem>
                ) : null
              )} */}

              {/* {commentsFromState.comments.map(post =>
                parentPostsThatHasComments.includes(post.parentId) &&
                post._id === postId ? (
                  <CommentItem
                    post={post.comments}
                    key={post._id}
                  ></CommentItem>
                ) : (
                  <p>aaa</p>
                )
              )} */}
            </Fragment>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  commentsFromState: state.post
});

export default connect(mapStateToProps, {
  deleteComment,
  getPost,
  getComments
})(CcItem);
