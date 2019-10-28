import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

import { FORGOT_PASSWORD } from "../../store/types/types";

const POOL_DATA = {
  UserPoolId: `us-east-1_UIj3Jxl1F`,
  ClientId: `10m7rsgelk6p12c7cme6mkm8h`
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(POOL_DATA);

export const forgotPasswordEmail = data => ({
  type: FORGOT_PASSWORD,
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
        dispatch(forgotPasswordEmail(email));
        navigationObject.navigate("ResetPassword");
      },
      onFailure: err => {
        setLoading(false);
        setEmailError(err.message);
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
