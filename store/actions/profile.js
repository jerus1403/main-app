import { ADD_PROFILE_API, GET_PROFILE_IMG_API } from "react-native-dotenv";
import {
  CHANGE_PICTURE_SUCCESS,
  CHANGE_PICTURE_FAILED,
  GET_USER_ID,
  GET_PROFILE_IMG_SUCCESS,
  GET_PROFILE_IMG_FAILED
} from "../types/types";
import { GetUserData } from "../../utils/utils";

export const getUserId = () => {
  return async dispatch => {
    const userData = await GetUserData();
    const jsonData = JSON.parse(userData);
    const userId = jsonData.userData.accessToken.payload.username;
    dispatch({ type: GET_USER_ID, payload: userId });
  };
};

export const postProfilePicture = (userId, imageObject) => {
  return async dispatch => {
    const data = {
      userId,
      imageObject
    };
    const bodyData = JSON.stringify(data);
    const options = {
      method: "POST",
      body: bodyData
    };

    const response = await fetch(ADD_PROFILE_API, options);
    if (!response) {
      alert("Please check your internet connection");
    } else {
      if (response.status !== 200) {
        dispatch({ type: CHANGE_PICTURE_FAILED, payload: response.Error });
      } else if (response.status === 200) {
        dispatch({ type: CHANGE_PICTURE_SUCCESS, payload: imageObject });
      }
    }
    // const jsonResponse = await response.json();
  };
};

export const getProfilePicture = userId => {
  return async dispatch => {
    const url = GET_PROFILE_IMG_API + userId;
    const response = await fetch(url);
    const jsonResponse = await response.json();
    if (!response) {
      alert("Please check your internet connection");
    } else {
      if (response.status !== 200) {
        dispatch({ type: GET_PROFILE_IMG_FAILED, payload: jsonResponse.Error });
      } else if (response.status === 200) {
        dispatch({
          type: GET_PROFILE_IMG_SUCCESS,
          payload: jsonResponse.result
        });
      }
    }
  };
};
