import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BibimForm from './BibimForm';
import { getBibims } from '../../actions/bibim';
import BibimItem from './BibimItem.js';
import PostForm from '../posts/PostForm.js';

const Bibim = ({
  getBibims,
  bibim: { bibims },
  match: {
    params: { id }
  }
}) => {
  useEffect(() => {
    getBibims();
  }, [getBibims]);

  // console.log('bibim.bibims', bibims);

  return (
    <div>
      <h1 className='large text-primary'>Create Post</h1>
      <h2>{id}</h2>
      <PostForm></PostForm>
      <h2 className='small text-primary'>Bibim List</h2>
      <div className='posts'>
        {bibims.map(bibim => (
          <BibimItem key={bibim._id} bibim={bibim} />
        ))}
      </div>
    </div>
  );
};

Bibim.propTypes = {};

const mapStateToProps = state => ({
  bibim: state.bibim
});

export default connect(mapStateToProps, { getBibims })(Bibim);
