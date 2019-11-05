import { AsyncStorage } from "react-native";

export const GetAccessToken = () => {
  let token = AsyncStorage.getItem("token");
  return token;
};
export const GetUserData = () => {
  let userData = AsyncStorage.getItem("userData");
  return userData;
};

export const GetUserAttributes = () => {
  let userAttributes = AsyncStorage.getItem("attributes");
  return userAttributes;
};

export const ClearStorage = () => {
  return AsyncStorage.clear();
};

export const SetAccessToken = (token, userData) => {
  AsyncStorage.setItem("token", JSON.stringify(token));
  AsyncStorage.setItem("userData", JSON.stringify({ userData: userData }));
};

export const SetUserAttribute = attributes => {
  AsyncStorage.setItem("attributes", JSON.stringify(attributes));
};
