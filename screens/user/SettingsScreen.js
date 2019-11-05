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

const SettingsScreen = props => {
  const dispatch = useDispatch();
  [isLoading, setLoading] = useState(false);
  [value, onChangeText] = useState("Your Name");

  const settingList = [
    {
      name: "Change Name",
      route: "ChangeName"
    },
    {
      name: "Verify Birthday",
      route: "VerifyBirthday"
    },
    {
      name: "Verify Address",
      route: "VerifyAddress"
    }
  ];
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.subTitle}>Account</Text>
      {settingList.map(item => {
        return (
          <TouchableOpacity
            key={item.route}
            style={styles.listItem}
            onPress={() => props.navigation.navigate(item.route)}
          >
            <Text style={styles.functionalButton}>{item.name}</Text>
            <Ionicons
              style={styles.buttonIcon}
              name='ios-arrow-forward'
              size={20}
              color={colors.easyGreen}
            />
          </TouchableOpacity>
        );
      })}
    </KeyboardAvoidingView>
  );
};

SettingsScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: "Settings",
  headerLeft: () => {
    return (
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <Ionicons name='ios-arrow-back' size={20} color={colors.white}>
          {" "}
          Profile
        </Ionicons>
      </TouchableOpacity>
    );
  },
  headerStyle: {
    backgroundColor: colors.theme,
    color: colors.white
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  backButton: {
    marginLeft: 15
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 5
  },
  listItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: colors.lightWhite
  },
  functionalButton: {
    marginLeft: 5
  },
  buttonIcon: {
    position: "absolute",
    top: 7,
    right: 10
  }
});

export default SettingsScreen;
