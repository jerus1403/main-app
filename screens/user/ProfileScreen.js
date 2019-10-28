import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  View,
  Button,
  FlatList
} from "react-native";
import { connect, useDispatch } from "react-redux";

import * as authActions from "../../store/actions/auth";

const Profile = props => {
  const dispatch = useDispatch();
  const logUserOut = async () => {
    await dispatch(authActions.SignOutUser(props.navigation));
  };
  return (
    <View style={styles.container}>
      <Button title='Sign Out' onPress={logUserOut} />
    </View>
  );
};

Profile.navigationOptions = {
  headerTitle: "Profile"
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: "center"
  },
  container: {
    paddingTop: 10
  }
});

const mapStateToProps = state => {
  return {
    authState: state
  };
};

export default connect(mapStateToProps)(Profile);
