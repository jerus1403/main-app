import { SEND_EMAIL_CODE_SUCCESS } from "../types/types";

const initialState = {
  forgotPasswordEmail: null
};

const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_EMAIL_CODE_SUCCESS:
      return {
        ...state,
        forgotPasswordEmail: action.payload
      };
    default:
      return state;
  }
};

export default forgotPasswordReducer;
