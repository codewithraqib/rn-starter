import React from 'react'
import {SafeAreaView, Platform, View, StyleSheet} from 'react-native';
import { dimensions } from 'src/theme';

const PBSafeView = props => {
    return Platform.OS === "android" ? (
      <View style={[styles.flex, props.style]}>{props.children}</View>
    ) : (
      <SafeAreaView style={[styles.flex, styles.fullHeight, props.style]}>
        <View style={{ flex: 1 }}>{props.children}</View>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        // backgroundColor:"#fff333"
    },
    fullHeight:{
        height:dimensions.vh*100,
        marginTop:-dimensions.vh*1.2
    }
})

export default PBSafeView;
