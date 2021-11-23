import React from 'react'
import { View, StyleSheet, Image, Platform } from 'react-native';
import { dimensions } from '../theme';

const PBCarpoolBG = props => {
    return props.short ? (
      <Image
        source={require("../assets/bgs/home_short.png")}
        style={styles.mainBgShort}
      />
    ) : (
      <Image
        source={require("../assets/bgs/main.png")}
        style={styles.mainBgImg}
      />
    );
}

const styles = StyleSheet.create({
  mainBgImg: {
    width: dimensions.vw * 100,
    height: Platform.OS === "ios" ? dimensions.vh * 27 : dimensions.vh * 30,
    resizeMode: "stretch",
    position: "absolute",
    top: Platform.OS === "ios" ? -10 : -20,
  },
  mainBgShort: {
    width: dimensions.vw * 100,
    height: Platform.OS === "ios" ? dimensions.vh * 20 : dimensions.vh * 22,
    resizeMode: "stretch",
    position: "absolute",
    top: Platform.OS === "ios" ? -10 : -20,
  },
});


export default PBCarpoolBG;
