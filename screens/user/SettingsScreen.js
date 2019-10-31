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

const SettingsScreen = props => {
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
      <Text>SettingsScreen</Text>
      <Button
        title='Change Name'
        onPress={() => props.navigation.navigate("ChangeName")}
      />
    </KeyboardAvoidingView>
  );
};

SettingsScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: "Settings",
  headerLeft: () => {
    return (
      <Button title='Go Back' onPress={() => navigation.navigate("Profile")} />
    );
  }
});
styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.lightWhite
  }
});

export default SettingsScreen;
