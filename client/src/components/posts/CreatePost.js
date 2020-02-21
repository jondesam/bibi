import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostForm from './PostForm';

class CreatePost extends Component {
  render() {
    return (
      <div>
        <PostForm></PostForm>
      </div>
    );
  }
}

CreatePost.propTypes = {};

export default CreatePost;
