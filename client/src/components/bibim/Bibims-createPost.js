import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import { getBibims } from '../../actions/bibim';
import { getCurrentProfile } from '../../actions/profile';

import BibimItem from './BibimItem.js';
import PostForm from '../posts/PostForm.js';

const Bibim = ({
  getBibims,
  getCurrentProfile,
  bibim: { bibims, previous, next },
  match: {
    params: { id }
  }
}) => {
  let [page, setPage] = useState(1);

  const clickAction = value => {
    if (value === 'pre') {
      setPage(page - 1);
    } else if (value === 'next') {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  useEffect(() => {
    getBibims(page, 5);
  }, [page, getBibims]);

  return (
    <div>
      <h1 className='mid text-primary'>Write Post</h1>
      {/* <div className='bg-primary p'></div> */}
      {/* <h2>{id}</h2> */}
      <PostForm></PostForm>
      <h2 className='mid text-primary my-1'>Recent Bibips</h2>
      <div className='bg-primary p'></div>

      <div className='posts'>
        {bibims.map(bibim => (
          <BibimItem key={bibim._id} bibim={bibim} />
        ))}
      </div>
      {previous ? (
        <button className='btn btn-primary' onClick={() => clickAction('pre')}>
          {' '}
          Previous
        </button>
      ) : null}
      {next ? (
        <button className='btn btn-primary' onClick={() => clickAction('next')}>
          {' '}
          Next
        </button>
      ) : null}
    </div>
  );
};

// Bibim.propTypes = {};

const mapStateToProps = state => ({
  bibim: state.bibim
});

export default connect(mapStateToProps, { getBibims, getCurrentProfile })(
  Bibim
);
