import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { UserPoolId, ClientId } from "react-native-dotenv";

import { SEND_EMAIL_CODE_SUCCESS } from "../../store/types/types";

const POOL_DATA = {
  UserPoolId: UserPoolId,
  ClientId: ClientId
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(POOL_DATA);

export const forgotPasswordSuccess = data => ({
  type: SEND_EMAIL_CODE_SUCCESS,
  payload: data
});

export const ResetPassword = (
  email,
  navigationObject,
  setLoading,
  setEmailError
) => {
  return dispatch => {
    const userData = {
      Username: email,
      Pool: userPool
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.forgotPassword({
      onSuccess: result => {
        setLoading(false);
        console.log(result, "FORGOT PASSWORD SUCCESS");
        dispatch(forgotPasswordSuccess(email));
        navigationObject.navigate("ResetPassword");
        alert("A verification Code has been sent to your email!");
      },
      onFailure: err => {
        setLoading(false);
        setEmailError(err.message);
        dispatch({ type: SEND_EMAIL_CODE_FAILED });
        console.log(err, "FORGOT PASSWORD ERROR");
      }
    });
  };
};

export const ConfirmPassword = (
  email,
  verificationCode,
  newPassword,
  navigationObject,
  setLoading,
  setResetPasswordError
) => {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: email,
      Pool: userPool
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.confirmPassword(verificationCode, newPassword, {
      onSuccess: result => {
        setLoading(false);
        console.log(result, "CONFIRM PASSWORD RESULT");
        alert(
          "Reset password successfully! Now log in with your new password."
        );
        navigationObject.navigate("Auth");
      },
      onFailure: err => {
        setLoading(false);
        setResetPasswordError(err.message);
        console.log(err, "CONFIRM PASSWORD ERROR");
      }
    });
  });
};
