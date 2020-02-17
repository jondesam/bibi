import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BibimForm from './BibimForm';
import { getBibims } from '../../actions/bibim';
import { get } from 'http';

const Bibim = ({
  getBibims,
  bibim,
  match: {
    params: { id }
  }
}) => {
  useEffect(() => {
    getBibims();
  }, [getBibims]);

  console.log('bibim', bibim);

  return (
    <div>
      <h1 className='large text-primary'>All Bibims</h1>
      <h2>{id}</h2>
    </div>
  );
};

Bibim.propTypes = {};

const mapStateToProps = state => ({
  bibim: state.bibim
});

export default connect(mapStateToProps, { getBibims })(Bibim);
