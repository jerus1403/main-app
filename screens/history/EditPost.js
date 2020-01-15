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
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styleUtility/colors";

const EditPost = props => {
  console.log(props, "EDIT");
  return (
    <ScrollView>
      <Text>{props.navigation.getParam("postId")}</Text>
      <Text>Edit Post Screen</Text>
    </ScrollView>
  );
};

EditPost.navigationOptions = ({ navigation }) => ({
  headerTitle: "Edit Post",
  headerLeft: () => {
    return (
      <TouchableOpacity
        // style={styles.backButton}
        onPress={() => navigation.navigate("History")}
      >
        <Ionicons name='ios-arrow-back' size={20} color={colors.white}>
          {" "}
          Back
        </Ionicons>
      </TouchableOpacity>
    );
  },
  headerStyle: {
    backgroundColor: colors.theme,
    color: colors.white
  }
});

export default EditPost;
