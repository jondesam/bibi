import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment, getPost } from '../../reduxActions/post';


// <<<<<<< HEAD
// import { addComment, getPost } from '../../reduxActions/post';
// =======
// import { addComment, getPost } from '../../actions/post';
// >>>>>>> d410acb49722d1164145aedefed4b8d1105b6446

const CommentForm = ({
  postId,
  addComment,
  bibimName,
  topParentId,
  bibimId
}) => {
  let initialData = {
    commentText: '',
    bibimName,
    parentId: postId,
    topParentId,
    bibimId
  };

  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [getPost]);

  let { commentText } = formData;

  const onChange = e => {
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='post-form'>
      {topParentId === postId ? (
        <div className='bg-primary p'>
          <h3>Leave a Comment</h3>
        </div>
      ) : null}

      <form
        className='form my-05 '
        onSubmit={e => {
          e.preventDefault();
          addComment(formData);

          setFormData(initialData);
        }}
      >
        <textarea
          name='commentText'
          cols='10'
          rows='5'
          placeholder='Any thought about it...?'
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
