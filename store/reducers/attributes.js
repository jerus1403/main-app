import { CHANGE_NAME, CHANGE_BIRTHDATE, CHANGE_ADDRESS } from "../types/types";

const initialState = {
  name: null,
  birthdate: null,
  address: null
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
    default:
      return state;
  }
};

export default attributesReducer;
