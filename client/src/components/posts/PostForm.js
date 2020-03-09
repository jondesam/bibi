import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import { getCurrentProfile } from '../../actions/profile';

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
    bibim: currentBibim ? currentBibim._id : ''
  };

  const [formData, setFormData] = useState(initialData);

  // console.log('currentBibim', currentBibim.name);

  let { text, bibim } = formData;

  // if (currentBibim !== undefined) {
  //   setFormData({ text: '', bibim: });
  // }



  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  let placeholder = '';
  if (currentBibim) {
    placeholder = 'Create a post in ' + currentBibim.name + ' bibim';
  }

  return (
    <div className='post-form bg-light p-1 my-1'>
      {currentBibim === undefined ? (
        <div className='small text-primary'>
          <select
            className=' select-css'
            name='bibim'
            size='1'
            value={bibim}
            onChange={onChange}
          >
            <option value=''>Select from subscriptions </option>

            {profile !== null
              ? profile.subscriptions.map(subscription => (
                  <option key={subscription._id} value={subscription.bibimId}>
                    {subscription.bibimName}
                  </option>
                ))
              : null}

            {/* {bibims.map(bibim => (
              <option key={bibim._id} value={bibim._id}>
                {' '}
                {bibim.name}
              </option>
            ))} */}
          </select>
        </div>
      ) : null}

      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();

          addPost(formData);

          setFormData({
            text: '',
            bibim: currentBibim ? currentBibim._id : ''
          });
        }}
      >
        <textarea
          className='form my-1'
          name='text'
          cols='20'
          rows='3'
          placeholder={placeholder}
          value={text}
          onChange={onChange}
          required
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
  bibim: state.bibim,
  profile: state.profile
});

export default connect(mapStateToProps, { addPost, getCurrentProfile })(
  PostForm
);
