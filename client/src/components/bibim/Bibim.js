import React from 'react';
import PropTypes from 'prop-types';
import BibimForm from './BibimForm';

function Bibim(props) {
  return (
    <div>
      <h1 className='large text-primary'>Create Bibim</h1>
      <BibimForm />
    </div>
  );
}

Bibim.propTypes = {};

export default Bibim;
