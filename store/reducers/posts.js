import { ADD_POST } from "../types/types";
import Post from "../../models/post";

const initialState = {
  allPosts: [],
  userPosts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      const newPost = {
        postId: action.postData.postId,
        usedId: action.postData.userId,
        categoryList: action.postData.categoryList,
        imageList: action.postData.imageList,
        title: action.postData.title,
        description: action.postData.description,
        latitude: action.postData.latitude,
        longitude: action.postData.longitude,
        rate: action.postData.rate
      };
      return {
        ...state,
        allPosts: state.allPosts.concat(newPost)
      };
    default:
      return state;
  }
};
