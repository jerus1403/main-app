import { ADD_POST } from "../types/types";
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
    const data = {
      postId: postId,
      userId: userId,
      categoryList: categoryList,
      title: title,
      description: description,
      imageList: imageList,
      latitude: latitude,
      longitude: longitude,
      rate: rate
    };
    const response = await fetch(POST_API, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();
    console.log(responseData, "RESPONSE DATA");
    dispatch({
      type: ADD_POST,
      postData: {
        postId,
        userId,
        categoryList,
        title,
        description,
        imageList,
        latitude,
        longitude,
        rate
      }
    });
  };
};
