import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createProfile,
  getCurrentProfile,
  deleteAccount
} from '../../actions/profile';

const initialState = {
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: ''
};

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  deleteAccount,
  history
}) => {
  const [formData, setFormData] = useState(initialState);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const { bio, twitter, facebook, linkedin, youtube, instagram } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className='mid text-primary'>Edit Your Profile</h1>

      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={onChange}
          />
          <small className='form-text'>Tell us a little about yourself</small>
        </div>
        <Fragment>
          <div className='form-group social-input'>
            <i className='fab fa-twitter fa-2x' />
            <input
              type='text'
              placeholder='Twitter URL'
              name='twitter'
              value={twitter}
              onChange={onChange}
            />
          </div>

          <div className='form-group social-input'>
            <i className='fab fa-facebook fa-2x' />
            <input
              type='text'
              placeholder='Facebook URL'
              name='facebook'
              value={facebook}
              onChange={onChange}
            />
          </div>

          <div className='form-group social-input'>
            <i className='fab fa-youtube fa-2x' />
            <input
              type='text'
              placeholder='YouTube URL'
              name='youtube'
              value={youtube}
              onChange={onChange}
            />
          </div>

          <div className='form-group social-input'>
            <i className='fab fa-linkedin fa-2x' />
            <input
              type='text'
              placeholder='Linkedin URL'
              name='linkedin'
              value={linkedin}
              onChange={onChange}
            />
          </div>

          <div className='form-group social-input'>
            <i className='fab fa-instagram fa-2x' />
            <input
              type='text'
              placeholder='Instagram URL'
              name='instagram'
              value={instagram}
              onChange={onChange}
            />
          </div>
        </Fragment>

        <input type='submit' className='btn btn-primary my-1' />
      </form>

      <button className='btn btn-danger' onClick={() => deleteAccount()}>
        Delete My Account
      </button>
    </Fragment>
  );
};

// <Link className='btn btn-light my-1' to='/dashboard'>
// Go Back
// </Link>

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
  deleteAccount
})(withRouter(EditProfile));
