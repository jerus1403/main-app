import React, { useState, useReducer, useCallback, useEffect } from "react";
import { useDispatch, connect, getState } from "react-redux";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  RefreshControl,
  View,
  Image,
  Dimensions,
  Button,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import MapView, { Circle } from "react-native-maps";

import { colors } from "../../styleUtility/colors";
import { fonts } from "../../styleUtility/fonts";

const MapSectionModule = ({ latitude, longitude, city }) => {
  const mapRegion = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };
  const latLng = {
    latitude: latitude,
    longitude: longitude
  };
  return (
    <View style={styles.container}>
      <View style={styles.cityContainer}>
        <Text style={styles.cityText}>{city}</Text>
      </View>
      <View style={styles.mapContainer}>
        <MapView initialRegion={mapRegion} style={styles.myMap}>
          <Circle
            center={latLng}
            radius={3000}
            strokeColor='rgba(242, 121, 53, 0.4)'
            fillColor='rgba(242, 121, 53, 0.4)'
          />
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    marginBottom: 10
  },
  cityContainer: {
    marginBottom: 5
  },
  label: {
    color: colors.fadedGrey
  },
  cityText: {
    color: colors.darkBlue,
    fontSize: 15,
    fontWeight: "700"
  },
  mapContainer: {
    height: 200,
    width: "100%"
  },
  myMap: {
    height: "100%",
    width: "100%"
  }
});

export default MapSectionModule;
