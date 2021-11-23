import React, { Component } from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import { colors, dimensions } from "../theme";


class CustomButton extends Component {
    render(){
        return(
            <AwesomeButton
                width={this.props.width}
                onPress={this.props.onPress}
                backgroundColor={this.props.backgroundColor}
                backgroundDarker={this.props.backgroundDarker}
                backgroundShadow={this.props.backgroundShadow}
                raiseLevel= {this.props.raiseLevel}
                style = {this.props.style}
                height = {this.props.height ?  this.props.height : 50} 
             >
                {this.props.text}
          </AwesomeButton> 
        )
    }
}

export default CustomButton;