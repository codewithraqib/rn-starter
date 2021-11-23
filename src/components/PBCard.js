import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {colors, dimensions} from '../theme';

const PBCard = props => {
  return (
    <View
      style={[
        props.whiteBackground
          ? {
              ...styles.containerWhite,
              padding:
                props.padding || props.padding === 0 ? props.padding : 10,
              marginBottom: props.marginBottom ? props.marginBottom : 0,
            }
          : props.secondaryBackground
          ? {
              ...styles.secondaryBackground,
              padding:
                props.padding || props.padding === 0 ? props.padding : 10,
              marginBottom: props.marginBottom ? props.marginBottom : 0,
            }
          : {
              ...styles.container,
              padding:
                props.padding || props.padding === 0 ? props.padding : 10,
              marginBottom: props.marginBottom ? props.marginBottom : 0,
            },
        props.style,
      ]}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: dimensions.vw * 100 - 40,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 8,
    // backgroundColor: '#ffffff',
    backgroundColor: '#efefef',
    // backgroundColor: 'rgba(255, 255, 255, 1)',
    elevation: Platform.OS === 'android' ? 3 : 2,
    shadowColor: '#000',
    shadowOpacity: Platform.OS === 'android' ? 0.5 : 0.4,
    shadowOffset:
      Platform.OS === 'android' ? {width: 3, height: 3} : {width: 0, height: 0},
    shadowRadius: Platform.OS === 'android' ? 3 : 1,
  },
  containerWhite: {
    width: dimensions.vw * 100 - 40,
    marginHorizontal: 20,
    marginTop: 20,
    // backgroundColor: '#efefef',
    // backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  secondaryBackground: {
    width: dimensions.vw * 100 - 40,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: '#efefef',
    // backgroundColor: 'rgba(196,90,90, 0.6)',
    elevation: Platform.OS === 'android' ? 6 : 2,
    shadowColor: '#000',
    shadowOpacity: Platform.OS === 'android' ? 0.5 : 0.4,
    shadowOffset:
      Platform.OS === 'android' ? {width: 3, height: 3} : {width: 0, height: 0},
    shadowRadius: Platform.OS === 'android' ? 5 : 1,
  },
});

export default PBCard;
