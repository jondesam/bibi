import React, { Fragment } from 'react';
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
  let userId = '';

  if (auth.user !== null) {
    userId = auth.user._id;
  }

  const authLinks = (
    <Fragment>
      <ul>
        <li>
          <p className='p-nav'>
            {' '}
            <Link to='/'> Bibips</Link>
          </p>
        </li>
        <li className='  hide-sm'>
          {' '}
          <p className='p-nav'>
            <Link to='/create-bibim'> Create Bibip</Link>
          </p>
        </li>

        <li className=''>
          <p className='p-nav'>
            <Link to='/create-post'> Write Post</Link>
          </p>
        </li>
        {/* <li>
          <Link to='/profiles'>
            <p className='p'>Users</p>
          </Link>
        </li> */}
        <li className=''>
          <p className='p-nav'>
            <Link to='/all-posts'> All</Link>
          </p>
        </li>
        <li className=''>
          <p className='p-nav'>
            <Link to={`/profile/${userId}`}> Profile</Link>
          </p>
        </li>
      </ul>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <ul>
        <li>
          <p className='p-nav'>
            <Link to='/'> Bibips</Link>
          </p>
        </li>
        {/* <li>
        <Link to='/profiles'>Users</Link>
      </li> */}
        <li>
          <p className='p-nav'>
            <Link to='/register'>Register</Link>
          </p>
        </li>
        <li>
          <p className='p-nav'>
            <Link to='/login'>Login</Link>
          </p>
        </li>
      </ul>
    </Fragment>
  );

  // const addItem = e => {
  // Prevent button click from submitting form
  // e.preventDefault();



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
  // };

  return (
    <nav className='navbar bg-dark'>
      <Fragment>
        {/* <section className='section'>
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
      </section> */}
        {!auth.loading && (
          <Fragment>{auth.isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </Fragment>
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
