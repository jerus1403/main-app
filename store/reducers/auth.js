import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILED,
  SIGN_UP_VERIFY_REQUEST,
  SIGN_UP_VERIFY_SUCCESS,
  SIGN_UP_VERIFY_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOG_OUT
} from "../types/types";

const initialState = {
  signUpSuccess: false,
  signUpFailed: false,
  signUpPending: false,
  verifySuccess: false,
  verifyFailed: false,
  verifyPending: false,
  signUpPayload: null,
  errorMessage: null,
  logInPending: false,
  logInSuccess: false,
  logInFailed: false,
  logInPayload: null,
  logInError: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return {
        ...state,
        signUpPending: true
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpPending: false,
        signUpSuccess: true,
        signUpFailed: false,
        signUpPayload: action.payload
      };
    case SIGN_UP_FAILED:
      return {
        ...state,
        signUpPending: false,
        signUpFailed: true,
        errorMessage: action.payload
      };
    case SIGN_UP_VERIFY_REQUEST:
      return {
        ...state,
        verifyPending: true
      };
    case SIGN_UP_VERIFY_FAILED:
      return {
        ...state,
        verifyPending: false,
        verifyFailed: true,
        errorMessage: action.payload
      };
    case SIGN_UP_VERIFY_SUCCESS:
      return {
        ...state,
        verifyPending: false,
        verifySuccess: true,
        verifyFailed: false,
        errorMessage: null
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        logInPending: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        errorMessage: null,
        signUpFailed: false,
        verifyFailed: false,
        logInPending: false,
        logInSuccess: true,
        logInFailed: false,
        signUpPayload: null,
        logInPayload: action.payload
      };
    case LOGIN_FAILED:
      return {
        ...state,
        logInPending: false,
        logInFailed: true,
        logInSuccess: false,
        logInError: action.payload
      };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
