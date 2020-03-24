import React, { Fragment, useEffect, useState } from 'react';
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
  post: { posts, loading, next, previous },
  profile: { profile },
  bibim: { bibims }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  // useEffect(() => {
  //   getPosts(2, 10);
  // }, [getPosts]);

  useEffect(() => {
    getBibims();
  }, [getBibims]);

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
        <h1 className='mid text-primary'>Welcome to Bibips</h1>
      </div>
      {/* <div className='bg-primary p'></div> */}

      <div className='posts'>
        {posts
          ? posts.map(post => {
              if (bibimToShow.length === 0) {
                return null;
              } else {
                return bibimToShow.includes(post.bibimId) ? (
                  <PostItem key={post._id} post={post} />
                ) : null;
              }
            })
          : null}

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
