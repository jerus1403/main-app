import {
  ADD_POST,
  ADD_POST_FAILED,
  DELETE_POST_FAILED,
  DELETE_POST_SUCCESS,
  GET_USER_POST_FAILED,
  GET_USER_POST_SUCCESS
} from "../types/types";

const initialState = {
  addPostStatus: null,
  addPostError: null,
  addPostPayload: [],
  deletePostStatus: null,
  deletePostError: null,
  getUserPostStatus: null,
  getUserPostError: null,
  loadedUserPosts: [],
  allPosts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_FAILED:
      return {
        ...state,
        addPostStatus: false,
        addPostError: action.payload,
        addPostPayload: []
      };
    case ADD_POST:
      return {
        ...state,
        addPostStatus: true,
        addPostError: null,
        addPostPayload: action.payload
      };
    case DELETE_POST_FAILED:
      return {
        ...state,
        deletePostStatus: false,
        deletePostError: action.payload
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        deletePostStatus: true,
        loadedUserPosts: state.loadedUserPosts.filter(
          post => post.postId !== action.postId
        )
      };
    case GET_USER_POST_FAILED:
      return {
        ...state,
        getUserPostStatus: false,
        getUserPostError: action.payload,
        loadedUserPosts: []
      };
    case GET_USER_POST_SUCCESS:
      return {
        ...state,
        getUserPostStatus: true,
        loadedUserPosts: action.payload
      };
    default:
      return state;
  }
};
