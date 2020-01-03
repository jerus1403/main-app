import {
  ADD_IMAGES,
  ADD_CATEGORIES,
  ADD_TITLE,
  ADD_DESCRIPTION,
  ADD_LOCATION,
  ADD_RATE
} from "../types/types";

const initialState = {
  imageList: [],
  categoryList: [],
  title: null,
  description: null,
  location: {
    latitute: null,
    longiture: null
  },
  rate: null
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_IMAGES:
      return {
        ...state,
        imageList: action.payload
      };
    case ADD_CATEGORIES:
      return {
        ...state,
        categoryList: action.payload
      };
    case ADD_TITLE:
      return {
        ...state,
        title: action.payload
      };
    case ADD_DESCRIPTION:
      return {
        ...state,
        description: action.payload
      };
    case ADD_LOCATION:
      return {
        ...state,
        location: {
          latitute: action.payload.lat,
          longiture: action.payload.long
        }
      };
    case ADD_RATE:
      return {
        ...state,
        rate: action.payload
      };
    default:
      return state;
  }
};

export default postReducer;
