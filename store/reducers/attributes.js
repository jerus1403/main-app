import {
  CHANGE_NAME,
  CHANGE_BIRTHDATE,
  CHANGE_ADDRESS,
  CHANGE_PICTURE_SUCCESS,
  CHANGE_PICTURE_FAILED,
  GET_USER_ID,
  GET_PROFILE_IMG_FAILED,
  GET_PROFILE_IMG_SUCCESS,
  LOG_OUT
} from "../types/types";

const initialState = {
  name: null,
  birthdate: null,
  address: null,
  userId: null,
  postProfileImageStatus: null,
  profileImage: null,
  profileImageError: null,
  getProfileImgStatus: null,
  getProfileImgSuccess: null,
  getProfileImgError: null
};

const attributesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_NAME:
      return {
        ...state,
        name: action.payload
      };
    case CHANGE_BIRTHDATE:
      return {
        ...state,
        birthdate: action.payload
      };
    case CHANGE_ADDRESS:
      return {
        ...state,
        address: action.payload
      };
    case CHANGE_PICTURE_SUCCESS:
      return {
        ...state,
        postProfileImageStatus: true,
        profileImage: action.payload
      };
    case CHANGE_PICTURE_FAILED:
      return {
        ...state,
        postProfileImageStatus: false,
        profileImageError: action.payload
      };
    case GET_USER_ID:
      return {
        ...state,
        userId: action.payload
      };
    case GET_PROFILE_IMG_FAILED:
      return {
        ...state,
        getProfileImgStatus: false,
        getProfileImgError: action.payload
      };
    case GET_PROFILE_IMG_SUCCESS:
      return {
        ...state,
        getProfileImgStatus: true,
        getProfileImgSuccess: action.payload
      };
    case LOG_OUT:
      return {
        initialState
      };
    default:
      return state;
  }
};

export default attributesReducer;
