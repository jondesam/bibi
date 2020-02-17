import axios from 'axios';

import { ADD_BIBIM, POST_ERROR, GET_BIBIMS } from './types';
import { setAlert } from './alert';

//Add bibim
export const createBibim = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  console.log('Create Bibim');

  try {
    const res = await axios.post('/api/bibim/create', formData, config);

    console.log('res addPost', res);

    dispatch({
      type: ADD_BIBIM,
      payload: res.data
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    console.log(err);

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status }
    });
  }
};

// Get posts
export const getBibims = () => async dispatch => {
  try {
    const res = await axios.get('/api/bibim');

    dispatch({
      type: GET_BIBIMS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
