import React, {Component} from 'react';
import {View, StyleSheet, Text, Platform} from 'react-native';
import PBTouchable from './PBTouchable';
import {colors, dimensions} from '../theme';
import {Neomorph} from 'react-native-neomorph-shadows';

export default class PButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  pressButton = () => {
    if (!this.props.dontDisableOnClick) {
      this.setState({
        disabled: true,
      });

      // enable after 5 second
      setTimeout(() => {
        this.setState({
          disabled: false,
        });
      }, 1000);
    }
    !this.props.disabled
      ? this.props.onPress
        ? this.props.onPress()
        : null
      : null;
  };

  render() {
    let props = this.props;
    return (
      <View
        style={[
          styles.buttonContainerStyle,
          props.secondaryButton ? styles.buttonContainerStyle2 : {},
          {
            borderRadius:
              props.borderRadius || props.borderRadius === 0
                ? props.borderRadius
                : 8,
            marginBottom:
              props.marginBottom || props.marginBottom === 0
                ? props.marginBottom
                : 15,
            marginTop:
              props.marginTop || props.marginTop === 0 ? props.marginTop : 15,
          },
          props.style,
          props.disabled ? {backgroundColor: 'rgba(0,0,0,0.5)'} : null,
        ]}>
        <PBTouchable
          style={[styles.buttonStyle]}
          onPress={this.pressButton}
          onLongPress={() => (props.onLongPress ? props.onLongPress() : null)}
          disabled={this.state.disabled}>
          {props.children ? (
            props.children
          ) : (
            // <Neomorph
            //   // inner={this.state.inner} // <- enable shadow inside of neomorph
            //   swapShadows // <- change zIndex of each shadow color
            //   style={{
            //     shadowRadius: 5,
            //     borderRadius: 10,
            //     backgroundColor: this.props.primaryButton
            //       ? colors.primaryColor
            //       : '#efefef',
            //     width: dimensions.vw * 84,
            //     // width: dimensions.vw * 90,
            //     height: dimensions.vw * 10,
            //     marginTop: 20,
            //     shadowColor: '#D4AF37',
            //   }}>
            <View style={[{...styles.mainContainer}]}>
              <Text
                style={[
                  styles.buttonText,
                  props.buttonTextStyle,
                  props.primaryButtonColor ? styles.blackText : null,
                  props.secondaryButton ? styles.primaryText : null,
                ]}>
                {props.title}
              </Text>
            </View>
            // </Neomorph>
          )}
        </PBTouchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: Platform.OS === 'android' ? 0 : 8,
  },

  LinearGradientStyle: {
    height: dimensions.vw * 11,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  buttonContainerStyle: {
    height: dimensions.vw * 11,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.primaryBG,
  },
  buttonContainerStyle2: {
    backgroundColor: colors.lightPrimary,
  },
  buttonStyle: {
    backgroundColor: 'transparent',
  },

  buttonText: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontFamily: Platform.OS === 'android' ? 'Nunito-Regular' : 'Nunito-Regular',
    fontSize: 17,
    color: '#fff',
  },

  blackText: {
    color: '#151a2e',
  },
  primaryText: {
    color: colors.primaryColor,
  },
});
