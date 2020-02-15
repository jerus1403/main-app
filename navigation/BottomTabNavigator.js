import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TextInput,
  View,
  Button,
  TouchableOpacity
} from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import InboxScreen from "../screens/InboxScreen";
import PostItemScreen from "../screens/post/PostItemScreen";
import { HistoryStack } from "../navigation/HistoryStack";
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

const ProfileStack = createStackNavigator({
  MyAccount: {
    screen: ProfileScreen
  }
});

export const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeScreen },
    InboxTab: InboxStack,
    PostTab: {
      screen: () => null,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          return (
            <TouchableOpacity
              style={styles.postButton}
              onPress={() => navigation.navigate("Post")}
            >
              <Ionicons name='ios-create' size={45} color={colors.theme} />
            </TouchableOpacity>
          );
        }
      })
    },
    HistoryTab: HistoryStack,
    Profile: ProfileStack
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
          // }
          // else if (routeName === "PostTab") {
          //   iconName = `md-add-circle`;
        } else if (routeName === "HistoryTab") {
          iconName = `ios-time`;
        } else if (routeName === "Profile") {
          iconName = `md-person`;
        }
        return <IconComponent name={iconName} size={32} color={tintColor} />;
      },
      unmountOnBlur: true
    }),
    tabBarOptions: {
      activeTintColor: colors.darkGreen,
      inactiveTintColor: colors.fadedGrey,
      showLabel: false
    },
    lazy: false
  }
);

const styles = StyleSheet.create({
  postButton: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  }
});
