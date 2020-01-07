import {
  ADD_IMAGES,
  ADD_CATEGORIES,
  ADD_TITLE,
  ADD_DESCRIPTION,
  ADD_LOCATION,
  ADD_RATE,
  ADD_POST_ID,
  ADD_USER_ID
} from "../types/types";

export const addFunc = (type, payload) => ({
  type: type,
  payload: payload
});

export const addPostId = id => {
  return dispatch => {
    dispatch(addFunc(ADD_POST_ID, id));
  };
};

export const addUserId = id => {
  return dispatch => {
    dispatch(addFunc(ADD_USER_ID, id));
  };
};

export const addImages = imageList => {
  return dispatch => {
    dispatch(addFunc(ADD_IMAGES, imageList));
  };
};

export const addCategories = categoryList => {
  return dispatch => {
    dispatch(addFunc(ADD_CATEGORIES, categoryList));
  };
};

export const addTitle = title => {
  return dispatch => {
    dispatch(addFunc(ADD_TITLE, title));
  };
};

export const addDescription = description => {
  return dispatch => {
    dispatch(addFunc(ADD_DESCRIPTION, description));
  };
};

export const addLocation = location => {
  return dispatch => {
    dispatch(addFunc(ADD_LOCATION, location));
  };
};

export const addRate = rate => {
  return dispatch => {
    dispatch(addFunc(ADD_RATE, rate));
  };
};
