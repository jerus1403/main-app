import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  View,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import * as authActions from "../../store/actions/auth";

import { colors } from "../../styleUtility/colors";

const Profile = props => {
  //REDUCER STATE
  const { attributes } = props.authState;

  const dispatch = useDispatch();
  [isLoading, setLoading] = useState(false);
  [name, setName] = useState();
  [birthdate, setBirthdate] = useState();
  [address, setAddress] = useState();
  [email, setEmail] = useState();
  [profileImage, setProfileImage] = useState();

  const logUserOut = () => {
    dispatch(authActions.SignOutUser(props.navigation));
  };

  useEffect(() => {
    props.navigation.setParams({
      logOutButton: logUserOut
    });
    //Get User Attributes
    const getUserData = async () => {
      setLoading(true);
      const result = await authActions.retrieveUserData(
        setLoading,
        setName,
        setEmail,
        setAddress,
        setBirthdate,
        setProfileImage
      );
      if (result) {
        console.log(result, "RESULT");
      }
    };
    getUserData();
  }, []);
  if (profileImage) {
    console.log(profileImage, "PROFILE IMAGE");
  }
  console.log(attributes.picture, "PROFILE ATTRIBUTE IMG");
  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <View style={styles.indicator}>
          <ActivityIndicator size='large' color={colors.theme} />
        </View>
      ) : (
        <View>
          <View style={styles.backgroundSection}>
            {attributes.picture == null && profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.userImage} />
            ) : (
              <Image
                source={{ uri: attributes.picture }}
                style={styles.userImage}
              />
            )}
            <View style={styles.profileSection}>
              <Text style={styles.name}>
                {attributes.name === null && name ? name : attributes.name}
              </Text>
            </View>
          </View>
          <View style={styles.accountSettingSection}>
            <Text>
              <Text>Birthday:</Text>{" "}
              {attributes.birthdate === null && birthdate
                ? birthdate
                : attributes.birthdate}
            </Text>
            <Text>
              Address:{" "}
              {attributes.address === null && address
                ? address
                : attributes.address}
            </Text>
            <Text>Email: {email ? email : ""}</Text>
          </View>
        </View>
      )}
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
        color={colors.lightBlack}
      />
    );
  },
  headerLeft: () => {
    return (
      <TouchableOpacity
        style={styles.settingButton}
        onPress={() => navigation.navigate("Settings")}
      >
        <Ionicons
          name='ios-settings'
          size={30}
          color={colors.lightBlack}
          style={styles.icon}
        />
      </TouchableOpacity>
    );
  }
});

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "40%"
  },
  name: {
    fontSize: 20,
    fontWeight: "bold"
  },

  container: {
    flex: 1
  },
  backgroundSection: {
    flexDirection: "row",
    padding: 20,
    height: "auto",
    backgroundColor: colors.theme
  },
  profileSection: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 20
  },
  userImage: {
    alignSelf: "center",
    height: 180,
    width: 180,
    borderRadius: 180 / 2
  },
  userDetailText: {
    fontSize: 16
  },
  accountSettingSection: {
    minHeight: 100,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.lightWhite
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    // borderColor: colors.fadedGrey
  },
  settingButton: {
    marginHorizontal: 20
  },
  icon: {
    alignSelf: "center"
  }
});

const mapStateToProps = state => {
  return {
    authState: state
  };
};

export default connect(mapStateToProps)(Profile);
