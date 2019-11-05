import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { getState } from "redux";

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

import {
  GetAccessToken,
  ClearStorage,
  SetAccessToken,
  SetUserAttribute
} from "../../utils/utils";

const POOL_DATA = {
  UserPoolId: `us-east-1_UIj3Jxl1F`,
  ClientId: `10m7rsgelk6p12c7cme6mkm8h`
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(POOL_DATA);

export const signUpRequestSuccess = result => ({
  type: SIGN_UP_SUCCESS,
  payload: result
});

export const signUpRequestFailed = err => ({
  type: SIGN_UP_FAILED,
  payload: err
});

export const verifySuccess = result => ({
  type: SIGN_UP_VERIFY_SUCCESS,
  payload: result
});

export const verifyFailed = err => ({
  type: SIGN_UP_VERIFY_FAILED,
  payload: err
});

export const logInSuccess = result => ({
  type: LOGIN_SUCCESS,
  payload: result
});

export const logInFailed = err => ({
  type: LOGIN_FAILED,
  payload: err
});

export const logOut = () => ({
  type: LOG_OUT
});

export const RegisterUser = (email, password) => {
  return dispatch => {
    dispatch({ type: SIGN_UP_REQUEST });
    const attributeList = [];
    const dataEmail = {
      Name: "email",
      Value: email
    };

    const emailAttribute = new AmazonCognitoIdentity.CognitoUserAttribute(
      dataEmail
    );
    attributeList.push(emailAttribute);

    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        console.log(JSON.stringify(err), "SIGN_UP ERROR");
        dispatch(signUpRequestFailed(err));
        return;
      }
      console.log(result, "SIGN_UP RESULT");
      dispatch(signUpRequestSuccess(result));
    });
  };
};

export const VerifyUser = (email, code) => {
  return dispatch => {
    dispatch({ type: SIGN_UP_VERIFY_REQUEST });
    const userData = {
      Username: email,
      Pool: userPool
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        console.log(err, "VERIFY SIGN UP ERROR");
        dispatch(verifyFailed(err));
        return err;
      }
      console.log(result, "VERIFY SIGN UP RESULT");
      dispatch(verifySuccess(result));
      alert("Congrats! Now you can log in with your email and password!");
    });
  };
};

export const SignInUser = (
  email,
  password,
  navigationObject,
  setLoading,
  setSignInError
) => {
  return dispatch => {
    dispatch({ type: LOGIN_REQUEST });
    const authenticationData = {
      Username: email,
      Password: password
    };
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      authenticationData
    );
    const userData = {
      Username: email,
      Pool: userPool
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: result => {
        setLoading(false);
        const token = result.getAccessToken().getJwtToken();
        SetAccessToken(token, result);
        dispatch(logInSuccess(result));
        navigationObject.navigate("App");
      },
      onFailure: err => {
        setLoading(false);
        setSignInError(err.message);
        dispatch(logInFailed(err.message));
      }
    });
  };
};

export const addAttribute = async (value, type, setLoading) => {
  let attributeList = [];
  let attribute;
  if (type === "name") {
    attribute = {
      Name: "name",
      Value: value
    };
  } else if (type === "birthday") {
    attribute = {
      Name: "birthdate",
      Value: value
    };
  } else if (type === "address") {
    attribute = {
      Name: "address",
      Value: value
    };
  }
  var cognitoAttribute = new AmazonCognitoIdentity.CognitoUserAttribute(
    attribute
  );
  attributeList.push(cognitoAttribute);

  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser != null) {
    cognitoUser.getSession((err, session) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      cognitoUser.updateAttributes(attributeList, (err, result) => {
        if (err) {
          setLoading(false);
          console.log("Attribute Error", err);
          return;
        }
        setLoading(false);
        console.log("Attribtue result: " + result);
      });
    });
  }
};

export const retrieveUserData = (
  setLoading,
  setName,
  setEmail,
  setAddress,
  setBirthdate
) => {
  //Get cognito user from storage
  userPool.storage.sync(function(err, result) {
    if (err) {
      setLoading(false);
      console.log(err, "ERROR RETRIEVE");
    } else if (result === "SUCCESS") {
      //Get Current User
      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser != null) {
        //Get Session
        cognitoUser.getSession((err, session) => {
          if (err) {
            alert(err.message);
          }
          //Get user Attributes
          cognitoUser.getUserAttributes((err, userData) => {
            if (err) {
              alert(err.message);
              return;
            }
            setLoading(false);
            userData.map(item => {
              if (item.getName() === "name") {
                setName(item.getValue());
              } else if (item.getName() === "email") {
                setEmail(item.getValue());
              } else if (item.getName() === "birthdate") {
                setBirthdate(item.getValue());
              } else if (item.getName() === "address") {
                setAddress(item.getValue());
              }
              console.log(userData, "ATTRIBUTES");
            });
          });
        });
      }
    }
  });
};

export const SignOutUser = navigationObject => {
  return dispatch => {
    dispatch(logOut);
    ClearStorage();
    navigationObject.navigate("Auth");
  };
};
