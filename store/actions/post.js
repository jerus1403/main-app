import { ADD_IMAGES } from "../types/types";

export const add = arr => ({
  type: ADD_IMAGES,
  payload: arr
});

export const addImages = imageList => {
  return dispatch => {
    dispatch(add(imageList));
  };
};
