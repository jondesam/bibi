import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost, bibim: { bibims } }) => {
  const [formData, setFormData] = useState({
    text: '',
    bibim: ''
  });

  const { text, bibim } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  console.log('props PostForm', bibims);

  return (
    <div className='post-form'>
      <div className='small text-primary'>
        <select name='bibim' size='1' value={bibim} onChange={onChange}>
          <option value=''>- Please select a Bibim -</option>
          {bibims.map(bibim => (
            <option key={bibim._id} value={bibim.name}>
              {' '}
              {bibim.name}
            </option>
          ))}
        </select>
      </div>

      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();

          addPost(formData);

          setFormData({
            text: '',
            bibim: ''
          });
        }}
      >
        <textarea
          className='form my-1'
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          onChange={onChange}
          // required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  bibim: state.bibim
});

export default connect(mapStateToProps, { addPost })(PostForm);
