import React, { useState, useReducer, useCallback, useEffect } from "react";
import { Dimensions } from "react-native";
import { useDispatch, connect } from "react-redux";
import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
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

const ChangeProfilePictureModal = props => {
  const submitHandler = async event => {
    event.preventDefault();
  };

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <Text style={styles.header}>Change your profile picture</Text>
      <View style={styles.imageHolder}></View>
      <View style={styles.button}>
        <Button
          title='TAKE PHOTO'
          color={colors.white}
          onPress={submitHandler}
        />
      </View>
      <View style={styles.button}>
        <Button
          title='SELECT PHOTO'
          color={colors.white}
          onPress={submitHandler}
        />
      </View>
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
  imageHolder: {
    backgroundColor: colors.invisible,
    width: 200,
    height: 200,
    borderWidth: 1,
    borderStyle: "dashed"
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 25
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

export default ChangeProfilePictureModal;
