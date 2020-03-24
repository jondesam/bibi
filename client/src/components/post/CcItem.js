import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import Linkify from 'react-linkify';
import CommentItem from '../post/CommentItem';
import CommentForm from './CommentForm';
import {
  getPost,
  getComments,
  getComment,
  deleteComment,
  addLike,
  removeLike
} from '../../actions/post';

const CcItem = ({
  postId,
  postState: { comment: childComments },
  postState,
  post: { _id, text, userName, user, date, bibimName, comments },
  auth,
  deleteComment
}) => {
  let ok = null;
  if (childComments) {
    ok = true;
  } else {
    ok = false;
  }

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

  return (
    <div>
      {ok === true ? (
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
                      {/* {likes ? (
                likes.length > 0 ? (
                  <span>{likes.length}</span>
                ) : null
              ) : null} */}
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
                    <CommentForm
                      postId={_id}
                      bibimName={bibimName}
                    ></CommentForm>
                  ) : null}

                  {/* postuser === logged in user */}
                </Fragment>
              ) : null}
            </div>
          </div>
          {/* 
          <div className='comments'>
            {childComments.comments
              ? childComments.comments.map(comment => (
                  <CcItem
                    // post={post}
                    key={comment._id}
                    post={comment}
                    postId={comment._id}
                  />
                ))
              : null}
          </div> */}

          {/* {postState.comments.map(post =>
            postIdsToCheck.includes(post.parentId) &&
            post.parentId === postId ? (
              <CcItem post={post} postId={post._id} key={post._id}></CcItem>
            ) : null
          )} */}

          {comments.map(post => (
            <CommentItem post={post} postId={post._id} key={post._id}>
              {' '}
            </CommentItem>
          ))}

          {/* {postState.comments.map(post =>
            postIdsToCheck.includes(post.parentId) &&
            post.parentId === postId ? (
              <CcItem post={post} postId={post._id} key={post._id}></CcItem>
            ) : null
          )} */}
        </div>
      ) : null}
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
  getComment
})(CcItem);
