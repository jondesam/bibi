import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
import { getPost } from '../../actions/post';
import post from '../../reducers/post';

const CommentForm = ({ postId, addComment, bibimName }) => {
  useEffect(() => {
    setFormData(initialData);
  }, [getPost]);

  let initialData = {
    commentText: '',
    bibimName,
    parentId: postId
  };

  const [formData, setFormData] = useState(initialData);

  let { commentText } = formData;

  const onChange = e => {
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave a Comment</h3>
      </div>
      <form
        className='form my-05 '
        onSubmit={e => {
          e.preventDefault();
          addComment(formData);
          console.log('aaaa');
          setFormData(initialData);
        }}
      >
        <textarea
          name='commentText'
          cols='10'
          rows='5'
          placeholder='Comment the post'
          value={commentText}
          onChange={onChange}
          required
          // className='small-nomargin '
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(null, { addComment })(CommentForm);
