import { createStackNavigator } from "react-navigation-stack";

import SettingsScreen from "../screens/user/SettingsScreen";
import ChangeNameModal from "../screens/user/ChangeNameModal";
import VerifyBirthdayModal from "../screens/user/VerifyBirthdayModal";
import VerifyAddressModal from "../screens/user/VerifyAddressModal";
import ChangeProfilePictureModal from "../screens/user/ChangeProfilePictureModal";

export const SettingStack = createStackNavigator(
  {
    SettingScreen: { screen: SettingsScreen },
    ChangeName: {
      screen: ChangeNameModal
    },
    VerifyBirthday: {
      screen: VerifyBirthdayModal
    },
    VerifyAddress: {
      screen: VerifyAddressModal
    },
    ChangeProfilePicture: {
      screen: ChangeProfilePictureModal
    }
  },
  {
    mode: "modal"
  }
);
