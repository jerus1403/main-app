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
import { Ionicons } from "@expo/vector-icons";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import { colors } from "../../styleUtility/colors";
import * as forgotPasswordAction from "../../store/actions/forgotPassword";
import {
  RESET_PASSWORD_INPUT_UPDATE,
  formReducer
} from "../../utils/formReducer";

const ResetPasswordScreen = props => {
  const dispatch = useDispatch();
  [isLoading, setLoading] = useState(false);
  [resetPasswordError, setResetPasswordError] = useState(null);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      verifyCode: "",
      password: ""
    },
    inputValidities: {
      verifyCode: false,
      password: false
    },
    formIsValid: false
  });

  useEffect(() => {
    if (resetPasswordError) {
      Alert.alert("ERROR", resetPasswordError, [{ text: "OK" }]);
    }
  }, [resetPasswordError]);

  const submitHandler = event => {
    event.preventDefault();
    setResetPasswordError(null);
    setLoading(true);
    forgotPasswordAction.ConfirmPassword(
      props.forgotPasswordState.forgotPasswordEmail,
      formState.inputValues.verifyCode,
      formState.inputValues.password,
      props.navigation,
      setLoading,
      setResetPasswordError
    );
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: RESET_PASSWORD_INPUT_UPDATE,
        input: inputIdentifier,
        value: inputValue,
        isValid: inputValidity
      });
    },
    [dispatchFormState]
  );
  console.log(props.forgotPasswordState, "FORGOT STATE RESET SCREEN");
  return (
    <KeyboardAvoidingView style={styles.screen}>
      <Ionicons name='ios-key' size={60} color={colors.theme} />
      <Text style={styles.header}>Reset Your password</Text>
      <Text style={styles.text}>
        Please enter your verification code from your email and new password.
        Make sure your new password has at least one uppercase character, one
        lowercase character, and one number.
      </Text>
      <Card style={styles.authContainer}>
        <Input
          id='verifyCode'
          label='Verification Code'
          keyboardType='default'
          secureTextEntry
          required
          type='verifyCode'
          minLength={6}
          maxLength={6}
          autoCapitalize='none'
          errorText='Please enter a valid code.'
          onInputChange={inputChangeHandler}
          initialValue=''
        />
        <Input
          label='New Password'
          id='password'
          keyboardType='default'
          secureTextEntry
          required
          type='password'
          minLength={8}
          maxLength={255}
          autoCapitalize='none'
          errorText='Please enter a valid password.'
          onInputChange={inputChangeHandler}
          initialValue=''
        />
      </Card>
      {isLoading ? (
        <ActivityIndicator size='small' color={colors.theme} />
      ) : (
        <View style={styles.button}>
          <Button
            title='SUBMIT'
            color={colors.white}
            disabled={formState.formIsValid ? false : true}
            onPress={submitHandler}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.lightWhite,
    paddingTop: 40
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 25
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    paddingRight: 40,
    paddingLeft: 40
  },
  button: {
    marginTop: 30,
    backgroundColor: colors.theme
  }
});

const mapStateToProps = state => {
  return {
    forgotPasswordState: state.forgotPassword
  };
};

export default connect(mapStateToProps)(ResetPasswordScreen);
