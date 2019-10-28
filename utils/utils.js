import { AsyncStorage } from "react-native";

export const GetAccessToken = () => {
  let token = AsyncStorage.getItem("token");
  return token;
};
export const GetUserData = () => {
  let userData = AsyncStorage.getItem("userData");
  return userData;
};

export const ClearStorage = () => {
  return AsyncStorage.clear();
};

export const SetAccessToken = (token, userData) => {
  AsyncStorage.setItem("token", JSON.stringify(token));
  AsyncStorage.setItem("userData", JSON.stringify({ userData: userData }));
};
