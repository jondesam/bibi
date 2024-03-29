import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../reduxActions/post';
import { getCurrentProfile } from '../../reduxActions/profile';

const PostForm = ({
  addPost,
  bibim: { bibims },
  currentBibim,
  profile: { profile },
  getCurrentProfile
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  let initialData = {
    text: '',
    bibimId: currentBibim ? currentBibim._id : ''
  };

  const [formData, setFormData] = useState(initialData);

  let { text, bibimId } = formData;

  // if (currentBibim !== undefined) {
  //   setFormData({ text: '', bibim: });
  // }

  const onChange = e => {
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  let placeholder = '';

  if (currentBibim) {
    placeholder = 'Create a post in ' + currentBibim.bibimName + ' bibip';
  }

  return (
    <div className='post-form bg-light p-1 '>
      {currentBibim === undefined ? (
        <div className='small text-primary'>
          <select
            className=' select-css'
            name='bibimId'
            size='1'
            value={bibimId}
            onChange={onChange}
          >
            <option value=''>Select from your Bibips </option>

            {profile !== null
              ? profile.subscriptions.map(subscription => (
                  <option key={subscription._id} value={subscription.bibimId}>
                    {subscription.bibimName}
                  </option>
                ))
              : null}
          </select>
        </div>
      ) : null}

      <form
        className='form '
        onSubmit={e => {
          e.preventDefault();

          addPost(formData);
          setFormData({
            text: '',
            bibimId: currentBibim ? currentBibim._id : ''
          });
        }}
      >
        <textarea
          className='form small '
          name='text'
          cols='20'
          rows='5'
          placeholder={placeholder}
          value={text}
          onChange={onChange}
          required
        />
        <input type='submit' className='btn-side btn-dark ' value='Submit' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  bibim: state.bibim,
  profile: state.profile
});

export default connect(mapStateToProps, { addPost, getCurrentProfile })(
  PostForm
);
