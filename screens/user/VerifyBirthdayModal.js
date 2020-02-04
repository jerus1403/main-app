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
  Alert,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../styleUtility/colors";
import { fonts } from "../../styleUtility/fonts";
import * as authActions from "../../store/actions/auth";

const VerifyBirthdayModal = props => {
  const dispatch = useDispatch();
  [isSubmitLoading, setSubmitLoading] = useState(false);
  [value, onChangeText] = useState("");
  [birthdate, setBirthdate] = useState();

  useEffect(() => {
    //Get User Attributes
    const getUserData = async () => {
      await authActions.retrieveUserData(null, null, null, setBirthdate);
    };
    getUserData();
  });

  const submitHandler = async event => {
    event.preventDefault();
    const type = "birthdate";
    setSubmitLoading(true);
    await dispatch(authActions.addAttribute(value, type));
    setSubmitLoading(false);
    props.navigation.navigate("SettingScreen");
  };

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <Text style={styles.header}>Verify Your Birthdate</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeText(text)}
        value={value}
        placeholder={birthdate ? birthdate : ""}
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

VerifyBirthdayModal.navigationOptions = ({ navigation }) => ({
  headerTitle: "Verify Birthdate",
  headerLeft: () => {
    return (
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons
          name='ios-arrow-back'
          size={25}
          color={colors.white}
        ></Ionicons>
      </TouchableOpacity>
    );
  },
  headerStyle: {
    backgroundColor: colors.theme
  },
  headerTitleStyle: fonts.screenHeader
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.lightWhite,
    paddingTop: 40
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 25
  },
  backButton: {
    paddingHorizontal: 15
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

export default VerifyBirthdayModal;
