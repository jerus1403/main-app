import {
  ADD_POST,
  ADD_POST_PENDING,
  ADD_POST_FAILED,
  ADD_POST_SUCCESS
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
        dispatch({
          type: ADD_POST,
          postData: {
            postId,
            userId,
            categoryList,
            title,
            description,
            imgPathList,
            latitude,
            longitude,
            rate
          }
        });
      }
    }
    console.log(responseData, "RESPONSE DATA");
  };
};
