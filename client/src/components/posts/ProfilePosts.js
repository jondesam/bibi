import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PostItem from './PostItem';

import { getPosts } from '../../reduxActions/post';
import { getProfileById } from '../../reduxActions/profile';

const ProfilePosts = ({
  getPosts,

  getProfileById,

  post: { posts, loading },
  profile: { profile },
  bibim: { bibims },
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

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

  let userId = match.params.id;

  let postsToShow = [];

  postsToShow = posts.filter(post => post.user === userId);

  return (
    <Fragment>
      <div className='posts'>
        {postsToShow.map(post => (
          <PostItem key={post._id} post={post}></PostItem>
        ))}
      </div>
    </Fragment>
  );
};
// {posts.map(post => {
//   if (bibimToShow.includes(post.bibim)) {
//     return <PostItem key={post._id} post={post} />;
//   }
// })}

// <div className='posts'>
// {posts.map(post =>
//   bibimToShow.includes(post.bibim) ? (
//     <PostItem key={post._id} post={post} />
//   ) : null
// )}
// </div>

ProfilePosts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  profile: state.profile,
  bibim: state.bibim,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getPosts,
  getProfileById
})(ProfilePosts);
