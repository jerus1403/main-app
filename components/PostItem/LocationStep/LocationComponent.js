import React, {
  useState,
  useReducer,
  useCallback,
  useEffect,
  useRef
} from "react";

import { useDispatch, connect } from "react-redux";
import {
  StyleSheet,
  Platform,
  Text,
  ScrollView,
  Image,
  TextInput,
  View,
  Button,
  FlatList,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Picker,
  Dimensions,
  Modal
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import { Ionicons } from "@expo/vector-icons";
import Geocode from "react-geocode";
import { GOOGLE_API_KEY } from "react-native-dotenv";
import * as Location from "expo-location";
import * as Permission from "expo-permissions";

import ButtonModule from "../../UI/ButtonModule";
import PinIcon from "../../../assets/pin_icon.png";
import { colors } from "../../../styleUtility/colors";
import { fonts } from "../../../styleUtility/fonts";

const LocationComponent = ({
  latitude,
  longitude,
  city,
  setLatitude,
  setLongitude,
  setCity
}) => {
  [isModalOpen, setLocationModal] = useState(false);

  const permission = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      alert("You need to grant the location access first!");
      return false;
    }
    return true;
  };

  const saveLocation = name => {
    Geocode.fromAddress(name, GOOGLE_API_KEY).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        setLatitude(lat);
        setLongitude(lng);
      },
      error => {
        alert(error);
      }
    );
  };

  const getLocationHandler = async () => {
    const isPermissionGranted = await permission();
    if (!isPermissionGranted) {
      return;
    }
    try {
      const currentLocation = await Location.getCurrentPositionAsync({
        timeOut: 5000
      });
      setLatitude(currentLocation.coords.latitude);
      setLongitude(currentLocation.coords.longitude);
      Geocode.fromLatLng(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude,
        GOOGLE_API_KEY
      ).then(
        response => {
          const address = response.results[4].formatted_address;
          setCity(address);
        },
        error => {
          console.log(error);
        }
      );
    } catch (err) {
      alert("Location is not granted");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={PinIcon} style={styles.pinIcon} />
      <Text style={[styles.heading, fonts.label]}>Locate Your Service</Text>
      {latitude && longitude && city ? (
        <View>
          <Text style={[styles.locationText, fonts.subHeading]}>{city}</Text>
          <ButtonModule
            style={styles.editButton}
            onPress={() => setLocationModal(true)}
          >
            <Text style={styles.editText}>Edit</Text>
          </ButtonModule>
        </View>
      ) : (
        <ButtonModule
          style={styles.getLocationButton}
          onPress={() => setLocationModal(true)}
        >
          <Text style={styles.iconText}>Get Location</Text>
        </ButtonModule>
      )}

      <Modal animationType='slide' visible={isModalOpen}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={[styles.headerText, fonts.label]}>Set Location</Text>
          </View>
          <View style={styles.innerContainer}>
            <ButtonModule
              style={styles.locationBtnContainer}
              onPress={getLocationHandler}
            >
              <Ionicons name='ios-pin' size={20} color={colors.white} />
              <Text style={[fonts.text, styles.iconText]}>
                Get current location
              </Text>
            </ButtonModule>
            <Text style={[fonts.text, styles.or]}>or</Text>
            <TextInput
              style={styles.inputBox}
              placeholder={city ? city : "City Name"}
              placeholderTextColor={colors.lightBlack}
              onChangeText={text => setCity(text)}
            />
          </View>
          <View style={styles.footerButtonContainer}>
            <ButtonModule
              onPress={() => setLocationModal(false)}
              style={[styles.footerButton, styles.cancelBtn]}
            >
              <Text style={styles.footerBtnText}>Cancel</Text>
            </ButtonModule>
            <ButtonModule
              style={[styles.footerButton, styles.saveBtn]}
              onPress={() => {
                saveLocation(city);
                setLocationModal(false);
              }}
            >
              <Text style={styles.footerBtnText}>Save</Text>
            </ButtonModule>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  locationText: {
    color: colors.tomato
  },
  editButton: {
    alignItems: "center"
  },
  editText: {
    color: colors.darkGreen,
    textDecorationLine: "underline"
  },
  pinIcon: {
    width: 100,
    height: 100
  },
  heading: {
    marginTop: 10,
    marginBottom: 20
  },
  getLocationButton: {
    alignItems: "center",
    backgroundColor: colors.darkGreen,
    paddingVertical: 10,
    borderRadius: 5,
    width: "70%"
  },
  modalContainer: {
    flex: 1,
    flexDirection: "column"
  },
  modalHeader: {
    flex: 1 / 12,
    backgroundColor: colors.theme,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 10
  },
  headerText: {
    color: colors.white
  },
  innerContainer: {
    flex: 10 / 12,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width
  },
  locationBtnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.darkGreen,
    paddingVertical: 10,
    width: "70%",
    marginVertical: 5,
    borderRadius: 5
  },
  iconText: {
    color: colors.white,
    fontWeight: "500",
    fontSize: 18,
    marginLeft: 5
  },
  or: {
    color: colors.fadedGrey
  },
  inputBox: {
    height: 40,
    width: "70%",
    paddingHorizontal: 5,
    marginVertical: 5,
    borderColor: colors.fadedGrey,
    color: colors.fadedGrey,
    borderWidth: 1
  },
  footerButtonContainer: {
    flex: 1 / 12,
    flexDirection: "row"
  },
  footerButton: {
    paddingVertical: 7,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    backgroundColor: colors.theme,
    borderWidth: 1,
    borderColor: colors.white
  },
  footerBtnText: {
    color: colors.white
  },
  cancelBtn: {
    backgroundColor: colors.fadedGrey
  },
  saveBtn: {
    backgroundColor: colors.darkGreen
  }
});

export default LocationComponent;
