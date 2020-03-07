import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from '../actions/types';

const initialState = {
  posts: [], //list of all posts
  post: null, //post info for comment
  loading: true,
  error: {},
  bibim: String,
  next: null,
  previous: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      //console.log('GET_POSTS', 'posts : ', state.posts, 'post : ', state.post);
      console.log('GET_POSTS', payload);

      return {
        ...state,
        posts: payload.results,
        loading: false,
        next: payload.next,
        previous: payload.previous
      };

    case GET_POST:
      // console.log('posts : ', state.posts, 'post : ', state.post);
      return {
        ...state,
        post: payload,
        loading: false
      };

    case ADD_POST:
      // console.log('posts array reducer', state.posts);

      // console.log(
      //   'ADD POST',
      //   'posts : ',
      //   state.posts,
      //   'post : ',
      //   state.post,
      //   'PAYLOAD',
      //   payload
      // );

      return {
        ...state,
        posts: [payload, ...state.posts],
        bibim: payload.bibim,
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
      // console.log(
      //   'posts : ',
      //   state.posts,
      //   'post : ',
      //   state.post,
      //   'payload: ',
      //   payload
      // );

      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false
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
    default:
      return state;
  }
}
