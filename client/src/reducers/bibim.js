import {
  ADD_BIBIM,
  GET_BIBIMS,
  POST_ERROR,
  UPDATE_SUBSCRIPTION
} from '../actions/types';

const initialState = {
  bibims: [], //list of all bibims
  bibim: null, //bibim info for post
  error: {},
  previous: null,
  next: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_BIBIM:
      // console.log('bibims : ', state.bibims);

      return {
        ...state,
        bibims: [payload, ...state.bibims]
      };
    case GET_BIBIMS:
      return {
        ...state,
        bibims: payload.results,
        next: payload.next,
        previous: payload.previous
      };

    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    case UPDATE_SUBSCRIPTION:
      console.log('UPDATE_SUBSCRIPTION', payload);

      return {
        ...state,
        bibims: state.bibims.map(bibim =>
          bibim._id === payload.id
            ? { ...bibim, subscriptions: payload.subscriptions }
            : bibim
        )
      };

    default:
      return state;
  }
}
