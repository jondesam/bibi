import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';

import { getPosts } from '../../actions/post';

const AllPosts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Fragment>
      <div>
        <h1 className='large text-primary'>Welcome to Bibimi</h1>
        <div className='posts'>
          {posts.map(post => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>{' '}
      </div>
    </Fragment>
  );
};

AllPosts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(AllPosts);
