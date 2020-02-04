import React, { useState, useReducer, useCallback, useEffect } from "react";
import { useDispatch, connect, getState } from "react-redux";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  RefreshControl,
  View,
  Image,
  Button,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Modal,
  Platform,
  TouchableHighlight
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styleUtility/colors";
import { fonts } from "../../styleUtility/fonts";

const PostEditScreen = () => {
  return (
    <View>
      <Text>POST EDIT SCREEN</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  closeButton: {
    marginRight: 7
  },
  closeBtnText: {
    color: colors.white
  }
});

PostEditScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: "Edit Post",
  headerRight: () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.closeButton}
      >
        <Text style={styles.closeBtnText}>Close</Text>
      </TouchableOpacity>
    );
  },
  headerLeft: null,
  headerStyle: {
    backgroundColor: colors.theme,
    color: colors.white
  },
  headerTintColor: colors.white
});

export default PostEditScreen;
