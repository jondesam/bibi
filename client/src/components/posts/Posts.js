import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getBibims } from '../../actions/bibim.ts';
import { getPosts } from '../../actions/post';
import { getCurrentProfile } from '../../actions/profile';
import { get } from 'http';

const Posts = ({
  getPosts,
  getCurrentProfile,
  getBibims,
  post: { posts, loading },
  profile: { profile },
  bibim: { bibims }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  useEffect(() => {
    getBibims();
  }, [getBibims]);

  let bibimIDs = [];
  bibimIDs = bibims.map(bibim => bibim._id);

  let subscribedbibimIds = [];
  if (profile !== null) {
    subscribedbibimIds = profile.subscriptions.map(item => item.bibimId);
  }

  let bibimToShow = [];
  bibimToShow = bibimIDs.filter(bibim => subscribedbibimIds.includes(bibim));

  return (
    <Fragment>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome to the community
      </p>

      <div className='posts'>
        {posts.map(post =>
          bibimToShow.includes(post.bibim) ? (
            <PostItem key={post._id} post={post} />
          ) : null
        )}
      </div>
    </Fragment>
  );
};
// {posts.map(post => {
//   if (bibimToShow.includes(post.bibim)) {
//     return <PostItem key={post._id} post={post} />;
//   }
// })}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  profile: state.profile,
  bibim: state.bibim
});

export default connect(mapStateToProps, {
  getPosts,
  getCurrentProfile,
  getBibims
})(Posts);
