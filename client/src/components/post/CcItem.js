import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import Linkify from 'react-linkify';
import PostItem from '../posts/PostItem';
import CommnetItem from '../post/CommentItem';
import CommentForm from './CommentForm';
import {
  getPost,
  addComment,
  deleteComment,
  addLike,
  removeLike,
  deletePost
} from '../../actions/post';

const CcItem = ({
  postId,

  postFromState: {},
  post: { _id, text, name, avatar, user, date, likes },
  auth,
  deleteComment,
  getPost
}) => {
  //   useEffect(() => {
  //     getPost();
  //   }, [getPost]);
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
  //   console.log('post :', post);

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
          <p className='inline ph'>by {name} </p>
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

              {openBox ? <CommentForm></CommentForm> : null}
            </Fragment>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  postFromState: state.post
});

export default connect(mapStateToProps, { deleteComment, getPost })(CcItem);
