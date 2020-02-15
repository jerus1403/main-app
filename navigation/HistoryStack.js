import { createStackNavigator } from "react-navigation-stack";

import HistoryScreen from "../screens/history/HistoryScreen";
import PostViewScreen from "../screens/history/PostViewScreen";
import PostEditScreen from "../screens/history/PostEditScreen";
import PostItemScreen from "../screens/post/PostItemScreen";

export const HistoryStack = createStackNavigator(
  {
    HistoryScreen: HistoryScreen,
    PostViewScreen: PostViewScreen
    // PostEditScreen: PostEditScreen
  },
  {
    mode: "modal"
  },
  {
    initialRouteName: "HistoryScreen"
  }
);
