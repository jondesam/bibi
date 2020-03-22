import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import Linkify from 'react-linkify';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CcItem from './CcItem';
import {
  getPost,
  getComments,
  addComment,
  deleteComment,
  addLike,
  removeLike,
  deletePost
} from '../../actions/post';

const CommentItem = ({
  getPost,
  getComments,
  postId,

  post: {
    _id,
    text,
    userName,
    avatar,
    user,
    date,
    likes,
    tick,
    bibimName,
    posts,
    post
  }, //post to show from Post.js
  commentsFromState,
  auth,
  deleteComment
}) => {
  // useEffect(() => {
  //   getPost(postId);
  // }, []);
  const componentDecorator = (href, text, key) => (
    <a href={href} key={key} target='_blank' rel='noopener noreferrer'>
      {text}
    </a>
  );

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

  const postIdsToCheck = [];

  commentsFromState.post.comments.map(comment => {
    postIdsToCheck.push(comment._id);
    // postIdsToCheck.map(String);
  });

  useEffect(() => {
    getComments(1, 10, true, postIdsToCheck);
  }, [getComments, tick]);

  // commentsFromState.comments.map(comment.)

  // let postToShow = [];
  // postFromState.filter(comment => {
  //   console.log(comment.text);

  //   postToShow.push(comment._id);
  // });

  // let postToShow = [];
  // postToShow = postBelow.filter(post => post._id);

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
              {/* comment form */}
              {openBox ? (
                <CommentForm postId={_id} bibimName={bibimName}></CommentForm>
              ) : null}

              {/* postuser === logged in user */}
            </Fragment>
          ) : null}

          {commentsFromState.comments.map(post =>
            postIdsToCheck.includes(post.parentId) &&
            post.parentId === postId ? (
              <CcItem post={post} postId={post._id} key={post._id}></CcItem>
            ) : null
          )}

          {/* <div className='comments'>
            {postFromState.post.comments
              ? postFromState.post.comments.map(comment => (
                  <CcItem
                    // post={post}
                    key={comment._id}
                    post={comment}
                    postId={_id}
                  />
                ))
              : null}
          </div> */}
        </div>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,

  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  commentsFromState: state.post
});

export default connect(mapStateToProps, {
  deleteComment,
  getPost,
  getComments
})(CommentItem);
