import { createStackNavigator } from "react-navigation-stack";

import PostViewScreen from "../screens/history/PostViewScreen";
import PostEditScreen from "../screens/history/PostEditScreen";

export const EditPostStack = createStackNavigator(
  {
    PostViewScreen: PostViewScreen,
    PostEditScreen: PostEditScreen
  },
  {
    mode: "modal"
  }
);
