import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PostItem from './PostItem';

import { getPosts } from '../../actions/post';
import { logout } from '../../actions/auth.ts';

const AllPosts = ({ getPosts, post: { posts, loading, next, previous } }) => {
  let [page, setPage] = useState(1);

  useEffect(() => {
    getPosts(page, 10);
  }, [page, getPosts]);

  const clickAction = value => {
    if (value === 'pre') {
      setPage(page - 1);
    } else if (value === 'next') {
      setPage(page + 1);
    }
  };

  const postsToShow = posts.filter(post => post.parentId === null);

  return (
    <Fragment>
      <div className='lead'>
        <h1 className='mid text-primary'>All Posts</h1>
      </div>
      <div>
        <div className='posts'>
          {postsToShow.map(post => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>{' '}
        {previous ? (
          <button
            className='btn btn-primary'
            onClick={() => clickAction('pre')}
          >
            {' '}
            Previous
          </button>
        ) : null}
        {next ? (
          <button
            className='btn btn-primary'
            onClick={() => clickAction('next')}
          >
            {' '}
            Next
          </button>
        ) : null}
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
