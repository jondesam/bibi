import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addBibim } from '../../actions/bibim';

const BibimForm = ({ addBibim }) => {
  const [formData, setFormData] = useState({
    bibimName: '',
    description: ''
    // subscriptions:[{profileId: , userId:}]
  });

  const { bibimName, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className='post-form'>
      {/* <div className='bg-primary p'><h3>Create New Bibip</h3></div> */}

      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();

          addBibim(formData);

          setFormData({
            bibimName: '',
            description: ''
          });
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            name='bibimName'
            value={bibimName}
            placeholder='Bibim Name'
            onChange={onChange}
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            name='description'
            value={description}
            placeholder='Description'
            onChange={onChange}
          />
        </div>

        <input type='submit' className='btn btn-primary my-1' />
      </form>
    </div>
  );
};

// BibimForm.propTypes = {
//   addPost: PropTypes.func.isRequired
// };

export default connect(null, { addBibim })(BibimForm);
