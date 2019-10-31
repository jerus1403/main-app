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

const ChangeNameModal = props => {
  const dispatch = useDispatch();
  [isLoading, setLoading] = useState(false);
  [value, onChangeText] = useState("Your Name");

  const submitHandler = async event => {
    event.preventDefault();
    setLoading(true);
    console.log(value);
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <Text style={styles.header}>Change your name</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeText(text)}
        value={value}
      />
      {isLoading ? (
        <ActivityIndicator size='small' color={colors.theme} />
      ) : (
        <View style={styles.button}>
          <Button title='CHANGE' color={colors.white} onPress={submitHandler} />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

ChangeNameModal.navigationOptions = ({ navigation }) => ({
  headerRight: () => {
    return (
      <Button title='Cancel' onPress={() => navigation.navigate("Profile")} />
    );
  }
});
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
