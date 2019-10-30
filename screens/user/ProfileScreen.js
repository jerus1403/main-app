import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  View,
  Button,
  FlatList,
  Image
} from "react-native";
import { connect, useDispatch } from "react-redux";

import * as authActions from "../../store/actions/auth";

import { colors } from "../../styleUtility/colors";
import IconImage from "../../assets/icon.png";

const Profile = props => {
  const dispatch = useDispatch();
  const logUserOut = () => {
    dispatch(authActions.SignOutUser(props.navigation));
  };
  useEffect(() => {
    props.navigation.setParams({
      logOutButton: logUserOut
    });
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.backgroundSection}>
        <Text style={styles.title}>Name</Text>
        <Text style={styles.title}>Email</Text>
        <Image source={IconImage} style={styles.profileImage} />
      </View>
      <View style={styles.profileSection}>
        <Button title='Change' />
      </View>
    </ScrollView>
  );
};

Profile.navigationOptions = ({ navigation }) => ({
  headerTitle: "Profile",
  headerRight: () => {
    const { params = {} } = navigation.state;
    return (
      <Button
        title='Log Out'
        onPress={params.logOutButton}
        color={colors.theme}
      />
    );
  }
});

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: "center"
  },
  container: {
    flex: 1
  },
  backgroundSection: {
    paddingTop: 20,
    height: 200,
    backgroundColor: colors.theme
  },
  profileImage: {
    position: "relative",
    alignSelf: "center",
    top: 40,
    height: 200,
    width: 200,
    borderRadius: 200 / 2
  },
  profileSection: {}
});

const mapStateToProps = state => {
  return {
    authState: state
  };
};

export default connect(mapStateToProps)(Profile);
