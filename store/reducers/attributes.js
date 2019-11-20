import {
  CHANGE_NAME,
  CHANGE_BIRTHDATE,
  CHANGE_ADDRESS,
  CHANGE_PICTURE
} from "../types/types";

const initialState = {
  name: null,
  birthdate: null,
  address: null,
  picture: null
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
    case CHANGE_PICTURE:
      return {
        ...state,
        picture: action.payload
      };
    default:
      return state;
  }
};

export default attributesReducer;
