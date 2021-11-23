import React from 'react';
import {View, StyleSheet, Image, ImageBackground} from 'react-native';
import {colors, dimensions} from '../theme';

const FullQuizBG = props => {
  return props.color ? (
    <View style={styles.coloredBG}>
      <ImageBackground
        source={
          props.type === 2
            ? require('../assets/bgs/top-header.png')
            : require('../assets/bgs/wave-down.png')
        }
        style={{
          width: '100%',
          height: props.type === 2 ? '27%' : '48%',
          // position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: '#fff',
        }}
      />
    </View>
  ) : (
    <Image
      source={
        props.type == 2
          ? require('../assets/images/back2.jpg')
          : require('../assets/images/back5.jpeg')
      }
      style={[styles.mainBgImg, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  mainBgImg: {
    width: dimensions.vw * 100,
    height: dimensions.vh * 150,
    resizeMode: 'stretch',
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
  },
  coloredBG: {
    width: dimensions.vw * 100,
    height: dimensions.vh * 150,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flex: 1,
  },
});

export default FullQuizBG;
