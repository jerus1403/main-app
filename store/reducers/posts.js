import {
  ADD_POST,
  ADD_POST_PENDING,
  ADD_POST_FAILED,
  ADD_POST_SUCCESS
} from "../types/types";
import Post from "../../models/post";

const initialState = {
  addPostPending: false,
  addPostStatus: null,
  errorPayload: null,
  allPosts: [],
  userPosts: []
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
        errorPayload: action.payload
      };
    case ADD_POST:
      const newPost = {
        postId: action.postData.postId,
        usedId: action.postData.userId,
        categoryList: action.postData.categoryList,
        imgPathList: action.postData.imgPathList,
        title: action.postData.title,
        description: action.postData.description,
        latitude: action.postData.latitude,
        longitude: action.postData.longitude,
        rate: action.postData.rate
      };
      return {
        ...state,
        addPostPending: false,
        addPostStatus: true,
        errorPayload: null,
        allPosts: state.allPosts.concat(newPost)
      };
    default:
      return state;
  }
};
