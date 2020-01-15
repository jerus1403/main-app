import {
  ADD_POST,
  ADD_POST_PENDING,
  ADD_POST_FAILED,
  GET_USER_POST_PENDING,
  GET_USER_POST_FAILED,
  GET_USER_POST_SUCCESS
} from "../types/types";

const initialState = {
  addPostPending: false,
  addPostStatus: null,
  addPostError: null,
  addPostPayload: [],
  getUserPostPending: false,
  getUserPostStatus: null,
  getUserPostError: null,
  loadedUserPosts: [],
  allPosts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_PENDING:
      return {
        ...state,
        addPostPending: true
      };
    case ADD_POST_FAILED:
      return {
        ...state,
        addPostPending: false,
        addPostStatus: false,
        addPostError: action.payload,
        addPostPayload: []
      };
    case ADD_POST:
      return {
        ...state,
        addPostPending: false,
        addPostStatus: true,
        addPostError: null,
        addPostPayload: action.payload
      };
    case GET_USER_POST_PENDING:
      return {
        ...state,
        getUserPostPending: true
      };
    case GET_USER_POST_FAILED:
      return {
        ...state,
        getUserPostPending: false,
        getUserPostStatus: false,
        getUserPostError: action.payload,
        loadedUserPosts: []
      };
    case GET_USER_POST_SUCCESS:
      return {
        ...state,
        getUserPostPending: false,
        getUserPostStatus: true,
        loadedUserPosts: action.payload
      };
    default:
      return state;
  }
};
