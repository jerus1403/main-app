import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Text, View, StyleSheet } from "react-native";

import AuthScreen from "../screens/user/AuthScreen";
import ForgotPasswordScreen from "../screens/user/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/user/ResetPasswordScreen";

export const AuthStack = createStackNavigator({
  Auth: {
    screen: AuthScreen,
    navigationOptions: props => ({
      headerTitle: () => {
        const { params = {} } = props.navigation.state;
        return (
          <View>
            <Text style={styles.title}>{params.headerText}</Text>
          </View>
        );
      }
    })
  },
  ForgotPassword: {
    screen: ForgotPasswordScreen,
    navigationOptions: props => ({
      headerTitle: "FORGOT PASSWORD"
    })
  },
  ResetPassword: {
    screen: ResetPasswordScreen,
    navigationOptions: props => ({
      headerTitle: "RESET PASSWORD"
    })
  }
});

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    textAlign: "center",
    color: "tomato",
    textTransform: "uppercase",
    fontWeight: "600"
  }
});
