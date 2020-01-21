import React, { useEffect } from "react";
import { useDispatch, connect, getState } from "react-redux";
import { View, StatusBar, ActivityIndicator, StyleSheet } from "react-native";

import { GetAccessToken, GetUserData } from "../utils/utils";
import * as Profile from "../store/actions/profile";

const AuthLoadingScreen = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Profile.getUserId());
    const tryLogin = async () => {
      const token = await GetAccessToken();
      props.navigation.navigate(token ? "App" : "Auth");
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle='default' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default AuthLoadingScreen;
