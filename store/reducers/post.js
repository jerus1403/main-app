import { ADD_IMAGES } from "../types/types";

const initialState = {
  imageList: []
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_IMAGES:
      return {
        ...state,
        imageList: action.payload
      };
    default:
      return state;
  }
};

export default postReducer;
