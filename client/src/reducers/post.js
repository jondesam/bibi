import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  GET_COMMENTS,
  GET_COMMENT
} from '../reduxActions/types';

const initialState = {
  posts: [], //list of all posts
  post: null, //post info for comment
  loading: true,
  error: {},
  // bibimId: null,
  next: null,
  previous: null,
  comments: [],
  tick: false,
  comment: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload.results,
        loading: false,
        next: payload.next,
        previous: payload.previous
      };

    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      };

    case GET_COMMENT:
      return {
        ...state,
        comment: payload,
        loading: false
      };

    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        // bibimId: payload.bibimId,
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      };

    case ADD_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: payload,
          parentId: payload.parentId
        },
        loading: false,
        tick: !state.tick
      };

    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            comment => comment._id !== payload
          )
        },
        loading: false
      };

    case GET_COMMENTS:
      return {
        ...state,
        comments: payload.results,
        loading: false,
        next: payload.next,
        previous: payload.previous
      };

    default:
      return state;
  }
}
