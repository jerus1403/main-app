import { CHANGE_NAME } from "../types/types";

const initialState = {
  name: null
};

const attributesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_NAME:
      return {
        ...state,
        name: action.payload
      };
    default:
      return state;
  }
};

export default attributesReducer;
