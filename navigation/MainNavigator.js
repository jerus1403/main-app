import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import AuthLoadingScreen from "../screens/AuthLoadingScreen";

import { SettingStack } from "./SettingNavigator";
import { AuthStack } from "./AuthNavigator";
import { TabNavigator } from "./BottomTabNavigator";

const MainNavigator = createStackNavigator(
  {
    Tab: TabNavigator,
    Settings: SettingStack
  },
  {
    headerMode: "none"
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
