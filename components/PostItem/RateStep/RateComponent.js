import React, {
  useState,
  useReducer,
  useCallback,
  useEffect,
  useRef
} from "react";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
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
  Alert,
  TouchableOpacity,
  Picker,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MultiSelect from "react-native-multiple-select";

import { colors } from "../../../styleUtility/colors";
import { fonts } from "../../../styleUtility/fonts";

const RateComponent = ({ rate, setRate }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.heading, fonts.label]}>Your Rate</Text>
      <Text style={[styles.subHeading, fonts.text]}>
        The amount of money you charge for your service per hour.
      </Text>
      <TextInput
        style={styles.inputBox}
        onChangeText={number => setRate(number)}
        value={rate}
        placeholder={rate ? rate : "Your Rate"}
        placeholderTextColor={colors.lightBlack}
        keyboardType='numeric'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  heading: {
    marginBottom: 10
  },
  subHeading: {
    width: "70%",
    fontStyle: "italic"
  },
  inputBox: {
    height: 40,
    width: "70%",
    paddingHorizontal: 5,
    marginVertical: 5,
    borderColor: colors.fadedGrey,
    color: colors.fadedGrey,
    borderWidth: 1
  }
});

export default RateComponent;
