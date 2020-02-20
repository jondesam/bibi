import { ADD_BIBIM, GET_BIBIMS, POST_ERROR } from '../actions/types';

const initialState = {
  bibims: [], //list of all bibims
  bibim:null, //bibim info for post
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_BIBIM:
      console.log('bibims : ', state.bibims);

      return {
        ...state,
        bibims: [payload, ...state.bibims]
      };
    case GET_BIBIMS:
      return {
        ...state,
        bibims: payload
      };

    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    default:
      return state;
  }
}
