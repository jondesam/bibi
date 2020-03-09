import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PostItem from './PostItem';

import { getPosts } from '../../actions/post';
// import { log } from 'util';

const AllPosts = ({ getPosts, post: { posts, loading, next, previous } }) => {
  // let value = '';
  // clickAction(value);

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

  return (
    <Fragment>
      <div>
        <div className='posts'>
          {posts.map(post => (
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
