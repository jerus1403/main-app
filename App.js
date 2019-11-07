import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
// import Reactotron from "reactotron-react-native";

import AppNavigator from "./navigation/MainNavigator";
import authReducer from "./store/reducers/auth";
import forgotPasswordReducer from "./store/reducers/forgotPassword";
import attributes from "./store/reducers/attributes";

// Reactotron.configure().useReactNative();

const rootReducer = combineReducers({
  auth: authReducer,
  forgotPassword: forgotPasswordReducer,
  attributes: attributes
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const getFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};

const App = () => {
  const [fontLoaded, fontLoader] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => fontLoader(true)} />
    );
  }
  return (
    <Provider store={store}>
      <AppNavigator globalState={store} />
    </Provider>
  );
};

export default App;
