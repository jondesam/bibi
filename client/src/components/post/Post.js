import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';

import { getPost } from '../../actions/post';
import Modal from 'react-modal';
import Register from '../auth/Register-.js';
import Login from '../auth/Log-in';

const Post = ({ getPost, post: { post, loading, tick }, match, auth }) => {
  const clickAction = value => {
    if (value === 'register') {
      setActiveModal('register');
    } else if (value === 'login') {
      setActiveModal('login');
    }
  };

  console.log('tick', tick);

  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id, tick]);

  const [activeModal, setActiveModal] = useState('');

  // console.log('post : ', post);

  return post === null ? (
    <Spinner />
  ) : post._id !== match.params.id ? null : (
    <Fragment>
      <Link to='/' className='btn'>
        Back To Post
      </Link>

      <PostItem post={post} showActions={false} noReplyBtn={true} />

      <div>
        {auth.isAuthenticated === true ? (
          <CommentForm postId={post._id} bibimName={post.bibimName} />
        ) : (
          <div className='bg-white p-05 '>
            <p className={'small-nomargin text-primary'}>
              Log in or sign up to leave a comment
            </p>
            <button
              onClick={() => clickAction('register')}
              type='button'
              className='btn btn-light p-025-1'
            >
              Register
            </button>
            <button
              onClick={() => clickAction('login')}
              type='button'
              className='btn btn-light p-025-1'
            >
              Login
            </button>
          </div>
        )}
      </div>

      <div className='comments'>
        {post.comments !== null
          ? post.comments.map(comment => (
              <CommentItem
                key={comment._id}
                postId={comment._id}
                post={comment}

                //there is no comments here when it loads
              />
            ))
          : null}
      </div>
      <Modal
        isOpen={activeModal === 'register'}
        onRequestClose={() => setActiveModal(false)}
        style={{
          content: { top: '130px', bottom: '30px', padding: '40px' }
        }}
      >
        <Register></Register>
      </Modal>

      <Modal
        isOpen={activeModal === 'login'}
        onRequestClose={() => setActiveModal(false)}
        style={{
          content: { top: '130px', bottom: '30px', padding: '40px' }
        }}
      >
        <Login></Login>
      </Modal>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  bibim: state.bibim,
  auth: state.auth
});

export default connect(mapStateToProps, { getPost })(Post);
