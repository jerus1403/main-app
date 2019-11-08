import React, { useEffect } from "react";
import { View, StatusBar, ActivityIndicator, StyleSheet } from "react-native";

import { GetAccessToken, GetUserData } from "../utils/utils";

const AuthLoadingScreen = props => {
  useEffect(() => {
    const tryLogin = async () => {
      const token = await GetAccessToken();
      props.navigation.navigate(token ? "App" : "Auth");
    };
    tryLogin();
  }, []);

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
