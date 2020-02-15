import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import AuthLoadingScreen from "../screens/AuthLoadingScreen";

import { SettingStack } from "./SettingNavigator";
import { AuthStack } from "./AuthNavigator";
import { TabNavigator } from "./BottomTabNavigator";
import { HistoryStack } from "./HistoryStack";
// import PostViewScreen from "../screens/history/PostViewScreen";
import PostItemScreen from "../screens/post/PostItemScreen";

const MainNavigator = createStackNavigator(
  {
    Tab: { screen: TabNavigator, navigationOptions: { header: null } },
    Settings: { screen: SettingStack, navigationOptions: { header: null } },
    HistoryStack: HistoryStack,
    Post: PostItemScreen
  },
  {
    mode: "modal"
  }
);

const Navigator = createSwitchNavigator(
  {
    Starter: AuthLoadingScreen,
    App: MainNavigator,
    Auth: AuthStack
  },
  {
    initialRouteName: "Starter"
  }
);

export default createAppContainer(Navigator);
