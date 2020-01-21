import { CHANGE_PICTURE, GET_USER_ID } from "../types/types";
import { GetUserData } from "../../utils/utils";

export const getUserId = () => {
  return async dispatch => {
    const userData = await GetUserData();
    const jsonData = JSON.parse(userData);
    const userId = jsonData.userData.accessToken.payload.username;
    dispatch({ type: GET_USER_ID, payload: userId });
  };
};

export const changeProfilePicture = result => ({
  type: CHANGE_PICTURE,
  payload: result
});

export const postProfilePicture = imageData => {
  return async dispatch => {
    const url =
      "https://yr19pxohlc.execute-api.us-east-1.amazonaws.com/dev/requestUploadURL";
    const data = JSON.stringify(imageData);
    const options = {
      method: "POST",
      body: data
    };
    dispatch(changeProfilePicture(imageData.uri));
    const response = await fetch(url, options);
    return response;
  };
};

export const getProfilePicture = userId => {
  return async dispatch => {
    const url =
      "https://yr19pxohlc.execute-api.us-east-1.amazonaws.com/dev/getUserProfileImageURL";
    const options = {
      method: "GET",
      body: userId
    };
    const response = await fetch(url, options);
    return response;
  };
};
