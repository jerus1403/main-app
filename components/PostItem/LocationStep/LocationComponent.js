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

const LocationComponent = () => {
  return (
    <View>
      <Text>Location Component</Text>
    </View>
  );
};

export default LocationComponent;
