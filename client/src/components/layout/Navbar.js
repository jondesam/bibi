import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { getCurrentProfile } from '../../actions/profile.ts';

const Navbar = ({
  getCurrentProfile,
  auth,
  profile: { profile },

  logout
}) => {
  // console.log('auth', auth, profile);

  // useEffect(() => {
  //   getCurrentProfile();
  // }, [getCurrentProfile]);

  let userId = '';

  if (auth.user !== null) {
    userId = auth.user._id;
  }
  // console.log('userId', userId);

  const authLinks = (
    <Fragment>
      <ul>
        <li>
          <Link to='/createBibim'>Create Bibim</Link>
        </li>
        <li>
          <Link to='/create-post'>Create Post</Link>
        </li>
        <li>
          <Link to='/profiles'>Users</Link>
        </li>
        <li>
          <Link to='/all-posts'>All Posts</Link>
        </li>
        <li>
          <Link to={`/profile/${userId}`}>
            <i className='fas fa-user' />{' '}
            <span className='hide-sm'>Profile</span>
          </Link>
        </li>
        <li>
          <a onClick={logout} href='#!'>
            <i className='fas fa-sign-out-alt' />{' '}
            <span className='hide-sm'>Logout</span>
          </a>
        </li>
      </ul>
    </Fragment>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Users</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  const addItem = e => {
    // Prevent button click from submitting form
    e.preventDefault();

    console.log(`Search pressed`);

    // Create variables for our list, the item to add, and our form
    // let list = this.state.list;
    // const newItem = document.getElementById('addInput');
    // const form = document.getElementById('addItemForm');

    // If our input has a value
    // if (newItem.value != '') {
    //   // Add the new item to the end of our list array
    //   list.push(newItem.value);
    //   // Then we use that to set the state for list
    //   this.setState({
    //     list: list
    //   });
    //   // Finally, we need to reset the form
    //   newItem.classList.remove('is-danger');
    //   form.reset();
    // } else {
    //   // If the input doesn't have a value, make the border red since it's required
    //   newItem.classList.add('is-danger');
    // }
  };

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>Bibimi</Link>
      </h1>
      <section className='section'>
        <form className='form-group social-input' id='addItemForm'>
          <input
            type='text'
            className='input'
            id='addInput'
            placeholder='Search...'
            // value={}
          />
          <button className='button is-info' onClick={addItem}>
            Search
          </button>
        </form>
      </section>
      {!auth.loading && (
        <Fragment>{auth.isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.auth
});

export default connect(mapStateToProps, { logout, getCurrentProfile })(Navbar);
