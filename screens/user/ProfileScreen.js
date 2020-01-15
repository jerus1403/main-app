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
  ImageBackground,
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
    const getUserAttributes = async () => {
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
        // console.log(result, "RESULT");
      }
    };
    getUserAttributes();
    console.log(props, "PROFILE");
  }, []);
  if (profileImage) {
    // console.log(profileImage, "PROFILE IMAGE");
  }
  // console.log(attributes.picture, "PROFILE ATTRIBUTE IMG");
  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <View style={styles.indicator}>
          <ActivityIndicator size='large' color={colors.theme} />
        </View>
      ) : (
        <View>
          <ImageBackground style={styles.backgroundSection}>
            {attributes.picture == null && profileImage ? (
              <View style={styles.userImageContainer}>
                <View style={styles.userImageFrame}>
                  <Image
                    source={{
                      uri: `https://profile-image-main-app.s3.amazonaws.com/f829c9af-0fc7-4245-8df3-52b77857abbc.jpg`
                    }}
                    style={styles.userImage}
                  />
                </View>

                <Text style={styles.name}>
                  {attributes.name === null && name ? name : attributes.name}
                </Text>
              </View>
            ) : (
              <View style={styles.userImageContainer}>
                <View style={styles.userImageFrame}>
                  <Image
                    source={{
                      uri: `https://profile-image-main-app.s3.amazonaws.com/f829c9af-0fc7-4245-8df3-52b77857abbc.jpg`
                    }}
                    style={styles.userImage}
                  />
                </View>
                <Text style={styles.name}>
                  {attributes.name === null && name ? name : attributes.name}
                </Text>
              </View>
            )}
          </ImageBackground>
          <View style={styles.accountSettingSection}>
            <View style={styles.listItem}>
              <Text style={styles.label}>Birthday</Text>
              <Text>
                {attributes.birthdate === null && birthdate
                  ? birthdate
                  : attributes.birthdate}
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.label}>Address</Text>
              <Text>
                {attributes.address === null && address
                  ? address
                  : attributes.address}
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.label}>Email</Text>
              <Text>{email ? email : ""}</Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

Profile.navigationOptions = ({ navigation }) => ({
  headerTitle: "Profile",
  // headerStyle: {
  //   backgroundColor: colors.theme
  // },
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
  container: {
    flex: 1
  },
  backgroundSection: {
    height: 150,
    backgroundColor: colors.theme
  },
  userImageContainer: {
    alignSelf: "center",
    position: "absolute",
    top: 50
  },
  userImageFrame: {
    padding: 5,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightBlack
  },
  userImage: {
    height: 160,
    width: 160,
    borderRadius: 10
  },
  name: {
    // position: "relative",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold"
  },
  userDetailText: {
    fontSize: 16
  },
  accountSettingSection: {
    position: "relative",
    top: 110,
    minHeight: 100,
    justifyContent: "space-between",
    paddingHorizontal: 20
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBlack,
    paddingVertical: 10
  },
  label: {
    color: colors.theme,
    fontWeight: "bold"
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
