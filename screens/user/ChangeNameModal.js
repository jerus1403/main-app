import React, { useState, useReducer, useCallback, useEffect } from "react";
import { Dimensions } from "react-native";
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

import { colors } from "../../styleUtility/colors";
import * as authActions from "../../store/actions/auth";

const ChangeNameModal = props => {
  const dispatch = useDispatch();
  [isSubmitLoading, setSubmitLoading] = useState(false);
  [isLoading, setLoading] = useState(false);
  [value, onChangeText] = useState("");
  [name, setName] = useState();

  useEffect(() => {
    //Get User Attributes
    const getUserData = async () => {
      await authActions.retrieveUserData(setLoading, setName);
    };
    getUserData();
  });

  const submitHandler = async event => {
    event.preventDefault();
    const type = "name";
    setSubmitLoading(true);
    await dispatch(authActions.addAttribute(value, type));
    setSubmitLoading(false);
    props.navigation.navigate("SettingScreen");
  };

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <Text style={styles.header}>Change your name</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeText(text)}
        value={value}
        placeholder={name ? name : ""}
      />
      {isSubmitLoading ? (
        <ActivityIndicator size='small' color={colors.theme} />
      ) : (
        <View style={styles.button}>
          <Button title='CHANGE' color={colors.white} onPress={submitHandler} />
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
  input: {
    height: 40,
    width: "90%",
    paddingHorizontal: 5,
    marginHorizontal: 10,
    borderColor: colors.fadedGrey,
    borderWidth: 1
  },
  button: {
    marginTop: 30,
    backgroundColor: colors.theme
  }
});

export default ChangeNameModal;
