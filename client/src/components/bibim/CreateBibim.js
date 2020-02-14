import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
// import PostItem from './PostItem';
import BibimForm from './BibimForm';
// import { getPosts } from '../../actions/post';

const NewCate = () => {
  return (
    <Fragment>
      <h1 className='large text-primary'>New Bibim</h1>
      <p className='lead'>
        <i className='fas fa-user' />
      </p>
      <BibimForm />
    </Fragment>
  );
};

export default NewCate;
