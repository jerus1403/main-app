import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import InboxScreen from "../screens/InboxScreen";
import PostItemScreen from "../screens/post/PostItemScreen";
import HistoryScreen from "../screens/history/HistoryScreen";
import ProfileScreen from "../screens/user/ProfileScreen";
import { colors } from "../styleUtility/colors";

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

export const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeScreen },
    InboxTab: { screen: InboxStack },
    PostTab: PostStack,
    HistoryTab: { screen: HistoryStack },
    Profile: {
      screen: ProfileStack
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        // console.log(navigation, "NAVIGATION");
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === "Home") {
          iconName = `ios-home`;
        } else if (routeName === "InboxTab") {
          iconName = `ios-chatboxes`;
        } else if (routeName === "PostTab") {
          navigation.navigate("PostItemScreen", { type: "default" });
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
      activeTintColor: colors.darkGreen,
      inactiveTintColor: colors.fadedGrey,
      showLabel: false
    }
  }
);
