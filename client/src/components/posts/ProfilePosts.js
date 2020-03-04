import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PostItem from './PostItem';

import { getPosts } from '../../actions/post';
import { getProfileById } from '../../actions/profile';

const Posts = ({
  getPosts,

  getProfileById,

  post: { posts, loading },
  profile: { profile },
  bibim: { bibims },
  auth,
  match
}) => {
  console.log('match', match);

  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  ////Have to make case of Guests visiting

  // console.log('auth', auth);

  let userId = match.params.id;

  console.log('userId', userId);

  let postsToShow = [];

  postsToShow = posts.filter(post => post.user === userId);

  // console.log('postsToShow', postsToShow);

  return (
    <Fragment>
      <div className='lead'>
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

Posts.propTypes = {
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
})(Posts);
