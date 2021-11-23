import React from 'react'
import { View, StyleSheet, Image } from 'react-native';
import { dimensions } from '../theme';

const BGCarpoolInnerBottom = props => {
    return (
        <Image source={props.grey ? require('../assets/bgs/bg-inner-bottom-grey.png') : require('../assets/bgs/bg-inner-bottom.png')} style={[styles.mainBgImg,props.style]} />
    );
}

const styles = StyleSheet.create({
    mainBgImg:{
        width:dimensions.vw * 100,height:dimensions.vh*50,resizeMode:'stretch',position:'absolute',top:dimensions.vh*65,left:0
    }
})


export default BGCarpoolInnerBottom;
