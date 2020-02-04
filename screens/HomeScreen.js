import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  View,
  Button,
  FlatList,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView from "react-native-maps";

import { GetUserData } from "../utils/utils";
import * as Profile from "../store/actions/profile";

const Home = props => {
  const dispatch = useDispatch();
  // [token, setToken] = useState(null);
  // [tokenData, setTokenData] = useState({});
  const mapRegion = {
    latitude: 32.7763,
    longitude: -96.7969,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };
  const getToken = async () => {
    const data = await GetUserData();
    const convertedData = JSON.parse(data);
    const { expiredToken, userData } = convertedData;
    const date = new Date(expiredToken);
  };
  const getTime = async () => {
    const data = await GetUserData();
    const convertedData = JSON.parse(data);
    const { expiredToken, userData } = convertedData;
    const expToken = new Date(expiredToken);
    const date = new Date().getTime();
    const exp = new Date(date - expToken);
  };

  useEffect(() => {
    dispatch(Profile.getUserId());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>This is Home Screen</Text>
      <Button title='Get Token' onPress={getToken} />
      <Button title='Get Date' onPress={getTime} /> */}
      <MapView initialRegion={mapRegion} style={styles.myMap} />
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
  },
  myMap: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});

const mapStateToProps = state => {
  return {
    state: state
  };
};

export default connect(mapStateToProps)(Home);
