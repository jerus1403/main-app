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
  FORGOT_PASSWORD_INPUT_UPDATE,
  formReducer
} from "../../utils/formReducer";

const ForgotPasswordScreen = props => {
  const dispatch = useDispatch();
  [isLoading, setLoading] = useState(false);
  [isEmailError, setEmailError] = useState();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: ""
    },
    inputValidities: {
      email: false
    },
    formIsValid: false
  });

  useEffect(() => {
    if (isEmailError) {
      Alert.alert("ERROR", isEmailError, [{ text: "OK" }]);
    }
  }, [isEmailError]);

  const submitHandler = async event => {
    event.preventDefault();
    setEmailError(null);
    setLoading(true);
    await dispatch(
      forgotPasswordAction.ResetPassword(
        formState.inputValues.email,
        props.navigation,
        setLoading,
        setEmailError
      )
    );
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORGOT_PASSWORD_INPUT_UPDATE,
        input: inputIdentifier,
        value: inputValue,
        isValid: inputValidity
      });
    },
    [dispatchFormState]
  );
  return (
    <KeyboardAvoidingView style={styles.screen}>
      <Ionicons name='ios-lock' size={60} color={colors.theme} />
      <Text style={styles.header}>Forgot Your password</Text>
      <Text style={styles.text}>
        To recover your password, you need to enter your register email address.
        We will send the recovery code to your email.
      </Text>
      <Card style={styles.authContainer}>
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
      </Card>
      {isLoading ? (
        <ActivityIndicator size='small' color={colors.theme} />
      ) : (
        <View style={styles.button}>
          <Button
            title='SEND'
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

export default ForgotPasswordScreen;
