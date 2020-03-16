import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import Linkify from 'react-linkify';

import {
  addComment,
  deleteComment,
  addLike,
  removeLike,
  deletePost,
  addPost
} from '../../actions/post';
import { log } from 'util';

const CommentItem = ({
  postId,
  comment: { _id, text: textOri, name, avatar, user, date, likes, comments },
  post,
  auth,
  deleteComment,
  deletePost,
  addComment,
  addPost
}) => {
  const componentDecorator = (href, textOri, key) => (
    <a href={href} key={key} target='_blank' rel='noopener noreferrer'>
      {textOri}
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

  //comment form///
  useEffect(() => {
    setFormData(initialData);
  }, []);

  let initialData = {
    text: '',
    bibimName: post.bibimName,
    parentPost: _id,
    bibim: post.bibim
  };

  const [formData, setFormData] = useState(initialData);

  let { text } = formData;

  const onChange = e => {
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [openBox, setOpenBox] = useState(false);

  console.log(formData, post);

  const clcikReply = () => {
    setOpenBox(!openBox);
  };

  // const deleteBoth = (postId, _id) => {
  //   console.log('deleteBoth');

  //   deleteComment(postId, _id);
  //   deletePost(_id);
  // };

  const addBoth = e => {
    e.preventDefault();
    addPost(formData);
    addComment(formData);

    setFormData(initialData);
    console.log('CALLED');
  };

  return (
    <div className=' bg-white p-1 my-05  post-item'>
      <Linkify
        componentDecorator={componentDecorator}
        className='mbottom-025  text-normal'
      >
        {textOri}
      </Linkify>
      {/* <p className='mbottom-025  text-normal'>{text}</p> */}
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
                      // onClick={() => deleteBoth(postId, _id)}
                      type='button'
                      className='btn   '
                    >
                      <p> Delete</p>
                    </button>
                  )
                : null}

              {openBox ? (
                <div className='post-form'>
                  <form
                    className='form my-05 '
                    onSubmit={e => {
                      addBoth(e);
                    }}
                  >
                    <textarea
                      name='text'
                      cols='10'
                      rows='5'
                      placeholder='Comment the post'
                      value={text}
                      onChange={onChange}
                      required
                      className='small-nomargin '
                    />

                    <input
                      type='submit'
                      className='btn btn-dark my-1'
                      value='Submit'
                    />
                  </form>
                </div>
              ) : null}
              {comments ? <p>comemnt here</p> : <p>none</p>}

              {/* postuser === logged in user */}
            </Fragment>
          ) : null}
        </div>
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

export default connect(mapStateToProps, {
  deleteComment,
  deletePost,
  addComment,
  addPost
})(CommentItem);

{
  /* {auth.user
                ? user === auth.user._id && (
                    <button
                      onClick={() => deletePost(_id)}
                      type='button'
                      className='btn'
                    >
                      <p> Delete</p>
                    </button>
                  )
                : null} */
}
