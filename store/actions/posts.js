import {
  ADD_POST,
  ADD_POST_PENDING,
  ADD_POST_FAILED,
  GET_USER_POST_PENDING,
  GET_USER_POST_FAILED,
  GET_USER_POST_SUCCESS
} from "../types/types";
import { POST_API } from "react-native-dotenv";

export const addPost = (
  postId,
  userId,
  categoryList,
  title,
  description,
  imageList,
  latitude,
  longitude,
  rate
) => {
  return async dispatch => {
    dispatch({ type: ADD_POST_PENDING });
    let imgPathList = [];
    imageList.map(item => {
      const imgUrl = `https://post-images-main-app.s3.amazonaws.com/user/${userId}/post/${postId}/${item.filename}`;
      const imgObj = {
        url: imgUrl,
        filename: item.filename
      };
      imgPathList.push(imgObj);
    });
    const post = {
      postId: postId,
      userId: userId,
      categoryList: categoryList,
      title: title,
      description: description,
      imgPathList: imgPathList,
      latitude: latitude,
      longitude: longitude,
      rate: rate
    };
    const bodyData = {
      post: post,
      imageList: imageList
    };

    const response = await fetch(POST_API, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    });

    const responseData = await response.json();
    if (!responseData) {
      const error = { message: "There's something wrong with the internet!" };
      dispatch({ type: ADD_POST_FAILED, payload: error });
    } else {
      if (responseData.Error || responseData.message) {
        dispatch({ type: ADD_POST_FAILED, payload: responseData.Error });
      } else if (responseData.result) {
        alert("Your post has been successfully added!");
        dispatch({
          type: ADD_POST,
          payload: responseData.result
        });
      }
    }
    console.log(responseData, "RESPONSE DATA");
  };
};

export const getUserPost = userId => {
  return async dispatch => {
    dispatch({ type: GET_USER_POST_PENDING });
    const response = await fetch(
      `https://yr19pxohlc.execute-api.us-east-1.amazonaws.com/dev/get-user-posts/${userId}`
    );
    const responseData = await response.json();
    console.log(userId, "ID ACTION");
    console.log(responseData, "RESPONSE DATA");
    if (!responseData) {
      const error = { message: "Something wrong with the internet!" };
      dispatch({ type: GET_USER_POST_FAILED, payload: error });
    } else {
      if (responseData && responseData.message) {
        dispatch({ type: GET_USER_POST_FAILED, payload: responseData.message });
      } else if (responseData && responseData.result) {
        dispatch({
          type: GET_USER_POST_SUCCESS,
          payload: responseData.result.data.Items
        });
      }
    }
  };
};
