import React, { useState, useReducer, useCallback, useEffect } from "react";
import { useDispatch, connect } from "react-redux";

import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  View,
  Button,
  FlatList,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert
} from "react-native";

// import { styles } from "../styleUtility/styleSheet";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import * as authActions from "../../store/actions/auth";
import { colors } from "../../styleUtility/colors";
import { GetAccessToken } from "../../utils/utils";
import authReducer from "../../store/reducers/auth";
import { FORM_INPUT_UPDATE, formReducer } from "../../utils/formReducer";

const AuthScreen = props => {
  const {
    signUpPending,
    signUpSuccess,
    signUpPayload,
    signUpFailed,
    verifySuccess,
    verifyFailed,
    verifyPending,
    verifyPayload,
    logInPending,
    logInSuccess,
    logInFailed,
    logInError,
    errorMessage
  } = props.authState.auth;

  [isSignUp, setSignUp] = useState(true);
  [isLoading, setLoading] = useState(false);
  [signInerror, setSignInError] = useState();
  [signUpError, setSignUpError] = useState(null);

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: ""
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  const [codeState, dispatchCodeState] = useReducer(formReducer, {
    inputValues: {
      verifyCode: ""
    },
    inputValidities: {
      verifyCode: false
    },
    formIsValid: false
  });
  /**
   *  SIGN UP SUBMIT FUNCTION
   */
  const signUpHandler = async event => {
    event.preventDefault();
    let action;
    if (isSignUp && !signUpSuccess) {
      action = authActions.RegisterUser(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else if (signUpSuccess && signUpPayload.user.username) {
      action = authActions.VerifyUser(
        signUpPayload.user.username,
        codeState.inputValues.verifyCode
      );
    }
    await dispatch(action);
  };
  useEffect(() => {
    if (signInerror) {
      Alert.alert("ERROR", signInerror, [{ text: "OK" }]);
    }
    props.navigation.setParams({
      headerText: `${isSignUp ? "Register" : "Log In"}`
    });
  }, [signInerror, isSignUp, signUpError]);
  /**
   *  SIGN IN SUBMIT FUNCTION
   */
  const signInHandler = async () => {
    setSignInError(null);
    setLoading(true);
    await dispatch(
      authActions.SignInUser(
        formState.inputValues.email,
        formState.inputValues.password,
        props.navigation,
        setLoading,
        setSignInError
      )
    );
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        input: inputIdentifier,
        value: inputValue,
        isValid: inputValidity
      });
    },
    [dispatchFormState]
  );
  const codeInputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchCodeState({
        type: FORM_INPUT_UPDATE,
        input: inputIdentifier,
        value: inputValue,
        isValid: inputValidity
      });
    },
    [dispatchCodeState]
  );

  // console.log(props.authState.auth, "REDUCER STATE");
  return (
    <KeyboardAvoidingView style={styles.screen}>
      <Card style={styles.authContainer}>
        {signUpPending ? (
          <ActivityIndicator size='large' color='tomato' />
        ) : (
          <ScrollView>
            <Text
              style={
                signUpSuccess
                  ? styles.verifyTitle
                  : signUpFailed
                  ? styles.errorMessage
                  : null
              }
            >
              {signUpSuccess && !verifySuccess ? "Verify Code" : null}
            </Text>
            <Text style={errorMessage ? styles.errorMessage : null}>
              {errorMessage ? errorMessage.message : null}
            </Text>
            {!signUpSuccess || (signUpSuccess && verifySuccess) ? (
              <Input
                id='email'
                label='Email'
                keyboardType='email-address'
                required
                email
                autoCapitalize='none'
                errorText='Please enter a valid email address.'
                onInputChange={inputChangeHandler}
                initialValue=''
              />
            ) : null}
            {signUpSuccess && verifyPending ? (
              <ActivityIndicator size='large' color='tomato' />
            ) : (
              <>
                <Input
                  id={
                    signUpSuccess && !verifySuccess ? "verifyCode" : "password"
                  }
                  label={signUpSuccess && !verifySuccess ? "Code" : "Password"}
                  keyboardType='default'
                  secureTextEntry
                  required
                  type={
                    signUpSuccess && !verifySuccess ? "verifyCode" : "password"
                  }
                  minLength={signUpSuccess && !verifySuccess ? 6 : 8}
                  maxLength={signUpSuccess && !verifySuccess ? 6 : 255}
                  autoCapitalize='none'
                  errorText={
                    signUpSuccess
                      ? "Please enter a valid code."
                      : "Please enter a valid password."
                  }
                  onInputChange={
                    signUpSuccess && !verifySuccess
                      ? codeInputChangeHandler
                      : inputChangeHandler
                  }
                  initialValue=''
                />
                {signUpSuccess && !verifySuccess ? (
                  <Button
                    title='Submit'
                    color='green'
                    disabled={formState.formIsValid ? false : true}
                    onPress={signUpHandler}
                  />
                ) : (
                  <>
                    {isLoading ? (
                      <ActivityIndicator size='small' color='tomato' />
                    ) : (
                      <Button
                        title={isSignUp ? "Sign Up" : "Log In"}
                        color='green'
                        disabled={formState.formIsValid ? false : true}
                        onPress={isSignUp ? signUpHandler : signInHandler}
                      />
                    )}
                    <Button
                      title={`Switch to ${isSignUp ? "Log In" : "Sign Up"}`}
                      color='tomato'
                      onPress={() => setSignUp(prevState => !prevState)}
                    />
                    <Text
                      style={styles.forgotPassword}
                      onPress={() =>
                        props.navigation.navigate("ForgotPassword")
                      }
                    >
                      Forgot password
                    </Text>
                  </>
                )}
              </>
            )}
          </ScrollView>
        )}
      </Card>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.theme
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  errorMessage: {
    color: "red",
    textAlign: "center"
  },
  verifyTitle: {
    fontSize: 20,
    textAlign: "center",
    color: "tomato"
  },
  signUpButton: {
    marginTop: 20,
    backgroundColor: "green"
  },
  disabledButton: {
    marginTop: 20,
    backgroundColor: colors.invisible
  },
  forgotPassword: {
    color: colors.fadedGrey,
    fontStyle: "italic",
    textAlign: "center",
    textDecorationLine: "underline"
  }
});

const mapStateToProps = state => {
  return {
    authState: state
  };
};

export default connect(mapStateToProps)(AuthScreen);
