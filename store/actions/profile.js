import { CHANGE_PICTURE } from "../types/types";

export const changeProfilePicture = result => ({
  type: CHANGE_PICTURE,
  payload: result
});

export const postProfilePicture = image => {
  return dispatch => {
    const url =
      "https://yr19pxohlc.execute-api.us-east-1.amazonaws.com/dev/requestUploadURL";

    // const formData = new FormData();
    // formData.append("photo", {
    //   data: image
    // });
    // const formData = {
    //   file: image,
    //   name: imageName,
    //   type: `image/${imageType}`
    // };
    const data = JSON.stringify(image);

    const options = {
      method: "POST",
      body: data
    };
    console.log(image.uri, "ACTION");
    dispatch(changeProfilePicture(image.uri));
    return fetch(url, options);
  };
};
