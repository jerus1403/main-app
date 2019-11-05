import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  View,
  Button,
  FlatList
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";

import { GetUserData } from "../utils/utils";

const Home = props => {
  // [token, setToken] = useState(null);
  // [tokenData, setTokenData] = useState({});

  const getToken = async () => {
    const data = await GetUserData();
    const convertedData = JSON.parse(data);
    const { expiredToken, userData } = convertedData;
    const date = new Date(expiredToken);
    console.log(convertedData, "USER DATA");
  };
  const getTime = async () => {
    const data = await GetUserData();
    const convertedData = JSON.parse(data);
    const { expiredToken, userData } = convertedData;
    const expToken = new Date(expiredToken);
    const date = new Date().getTime();
    const exp = new Date(date - expToken);
    console.log(new Date().getTime(), "TODAY");
    console.log(expiredToken, "DATE");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is Home Screen</Text>
      <Button title='Get Token' onPress={getToken} />
      <Button title='Get Date' onPress={getTime} />
    </View>
  );
};

Home.navigationOptions = {
  headerTitle: "Home"
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginTop: 50,
    textAlign: "center"
  },
  container: {
    paddingTop: 50
  }
});

const mapStateToProps = state => {
  return {
    authState: state
  };
};

export default connect(mapStateToProps)(Home);
