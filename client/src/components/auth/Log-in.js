import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';

const Login = props => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    // console.log('email and password', email, password);
    // console.log('props', props);

    props.login(email, password);
    // console.log('login');
  };

  if (props.isAuthenticated) {
    return <Redirect to='/' />;
  }
  // console.log(props);

  return (
    <Fragment>
      <h1 className='mid text-primary'>Sign Into Your Account</h1>

      <form className='form' onSubmit={onSubmit} autoComplete='on'>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}

            // required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChange}
            minLength={6}
            autoComplete='on'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => {
  // console.log('state aaa', state);

  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};
export default connect(mapStateToProps, { login })(Login);
