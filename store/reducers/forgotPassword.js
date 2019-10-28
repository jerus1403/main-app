import { FORGOT_PASSWORD } from "../types/types";

const initialState = {
  forgotPasswordEmail: null
};

const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD:
      return {
        ...state,
        forgotPasswordEmail: action.payload
      };
    default:
      return state;
  }
};

export default forgotPasswordReducer;
