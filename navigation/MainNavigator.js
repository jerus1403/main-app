import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import InboxScreen from "../screens/InboxScreen";
import PostItemScreen from "../screens/PostItemScreen";
import HistoryScreen from "../screens/HistoryScreen";
import AuthScreen from "../screens/user/AuthScreen";
import ProfileScreen from "../screens/user/ProfileScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import ForgotPasswordScreen from "../screens/user/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/user/ResetPasswordScreen";

const InboxStack = createStackNavigator({
  Inbox: {
    screen: InboxScreen
  }
});

const PostStack = createStackNavigator({
  Post: {
    screen: PostItemScreen
  }
});

const HistoryStack = createStackNavigator({
  History: { screen: HistoryScreen }
});

const ProfileStack = createStackNavigator({
  MyAccount: {
    screen: ProfileScreen
  }
});

const AuthStack = createStackNavigator({
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

const MainNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeScreen },
    InboxTab: { screen: InboxStack },
    PostTab: { screen: PostStack },
    HistoryTab: { screen: HistoryStack },
    Profile: {
      screen: ProfileStack
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === "Home") {
          iconName = `ios-home`;
        } else if (routeName === "InboxTab") {
          iconName = `ios-chatboxes`;
        } else if (routeName === "PostTab") {
          iconName = `md-add-circle`;
        } else if (routeName === "HistoryTab") {
          iconName = `ios-time`;
        } else if (routeName === "Profile") {
          iconName = `md-person`;
        }
        return <IconComponent name={iconName} size={32} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray",
      showLabel: false
    }
  }
);

const Navigator = createSwitchNavigator(
  {
    Starter: AuthLoadingScreen,
    App: MainNavigator,
    Auth: AuthStack
    // ForgotPassWord: ForgotPassWordStack
  },
  {
    initialRouteName: "Starter"
  }
);

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    textAlign: "center",
    color: "tomato",
    textTransform: "uppercase",
    fontWeight: "600"
  }
});

export default createAppContainer(Navigator);
