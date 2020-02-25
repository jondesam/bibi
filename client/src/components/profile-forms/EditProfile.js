import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
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
  deleteAccount,
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!profile) getCurrentProfile();

    if (!loading) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      setFormData(profileData);
    }

    // setFormData({
    //   bio: loading || !profile.bio ? '' : profile.bio,
    //   twitter: loading || !profile.social ? '' : profile.social.twitter,
    //   facebook: loading || !profile.social ? '' : profile.social.facebook,
    //   linkedin: loading || !profile.social ? '' : profile.social.linkedin,
    //   youtube: loading || !profile.social ? '' : profile.social.youtube,
    //   instagram: loading || !profile.social ? '' : profile.social.instagram
    // });
  }, [loading, getCurrentProfile, profile]);

  const { bio, twitter, facebook, linkedin, youtube, instagram } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    // console.log('Submit button');

    createProfile(formData, history, true);
  };

  return (
    <Fragment>
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
        <div className='my-2'>
          <button className='btn btn-danger' onClick={() => deleteAccount()}>
            Delete My Account
          </button>
        </div>
      </form>
    </Fragment>
  );
};

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
