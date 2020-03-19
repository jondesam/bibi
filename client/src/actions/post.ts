import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  GET_COMMENTS
} from './types';
var qs = require('qs');

// Get posts
export const getPosts = (page, limit) => async dispatch => {
  try {
    const res = await axios.get(`/api/posts?page=${page}&limit=${limit}`);

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response }
    });
  }
};

// Get comments
export const getComments = (
  page,
  limit,
  cm,
  postIdsToCheck
) => async dispatch => {
  console.log('jjjjjjjj', page, limit, cm, postIdsToCheck);

  try {
    // const res = await axios.get(`/api/posts/com`);
    const res = await axios.get(
      `/api/posts?page=${page}&limit=${limit}&cm=${cm}`,
      {
        params: { jsonData: postIdsToCheck }
      }
    );
    console.log('res', res);

    dispatch({
      type: GET_COMMENTS,
      payload: res.data
    });
  } catch (err) {
    console.log('rrrr', err);

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response }
    });
  }
};

// Get post
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add like
//id : postId
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);
    console.log('res add like', res.data);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    // console.log('Already liked');

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
  }
};

// Remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);
    console.log('res remove like', res.data);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete post
export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add post
export const addPost = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (!formData.bibimId) {
    dispatch(setAlert('Please select your bibip!', 'danger'));
  }

  try {
    const res = await axios.post('/api/posts', formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
export const addComment = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  console.log('formdata', formData.parentId);

  try {
    const res = await axios.post(
      `/api/posts/comment/${formData.parentId}`,
      formData,
      config
    );

    console.log('res addComment', res.data);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    console.log('err', err);

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
