import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../reduxActions/profile';

const CreateProfile = props => {
  const [formData, setFormData] = useState({
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  });

  const { bio, twitter, facebook, linkedin, youtube, instagram } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    props.createProfile(formData);
  };
  //   useEffect(() => {
  //     getCurrentProfile();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [getCurrentProfile]);

  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Let's get some information to make your
        profile stand out
      </p>

      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'></div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Tell us a little about yourself</small>
        </div>
        <div className='my-2'></div>
        <Fragment>
          <div className='form-group social-input'>
            <i className='fab fa-twitter fa-2x' />
            <input
              type='text'
              placeholder='Twitter URL'
              name='twitter'
              value={twitter}
              onChange={e => onChange(e)}
            />
          </div>

          <div className='form-group social-input'>
            <i className='fab fa-facebook fa-2x' />
            <input
              type='text'
              placeholder='Facebook URL'
              name='facebook'
              value={facebook}
              onChange={e => onChange(e)}
            />
          </div>

          <div className='form-group social-input'>
            <i className='fab fa-youtube fa-2x' />
            <input
              type='text'
              placeholder='YouTube URL'
              name='youtube'
              value={youtube}
              onChange={e => onChange(e)}
            />
          </div>

          <div className='form-group social-input'>
            <i className='fab fa-linkedin fa-2x' />
            <input
              type='text'
              placeholder='Linkedin URL'
              name='linkedin'
              value={linkedin}
              onChange={e => onChange(e)}
            />
          </div>

          <div className='form-group social-input'>
            <i className='fab fa-instagram fa-2x' />
            <input
              type='text'
              placeholder='Instagram URL'
              name='instagram'
              value={instagram}
              onChange={e => onChange(e)}
            />
          </div>
        </Fragment>

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

// CreateProfile.propTypes = {
//   createProfile: PropTypes.func.isRequired,
//   getCurrentProfile: PropTypes.func.isRequired,
//   profile: PropTypes.object.isRequired
// };

export default connect(null, { createProfile })(CreateProfile);
