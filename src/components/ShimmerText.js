import React, { Component } from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import Shimmer from "react-native-shimmer";
import { colors, dimensions } from "../theme";
import PBText from "./PBText";


class ShimmerText extends Component {

    constructor(props){
        super(props)
    }

    render(){
      
        let {intensity, duration, opacity, children} = this.props;
        return (
          <Shimmer
            intensity={intensity}
            duration={duration}
            opacity={opacity}>
            {children}
          </Shimmer>
        );
    }
}

export default ShimmerText;