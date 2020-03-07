import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PostItem from './PostItem';

import { getBibims } from '../../actions/bibim.ts';
import { getPosts } from '../../actions/post';
import { getCurrentProfile } from '../../actions/profile';

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
    getPosts(2, 5);
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
      <div className='lead'>
        <h1 className='mid text-primary'>Welcome to Bibimi</h1>
      </div>

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
