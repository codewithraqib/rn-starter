import React, {Component} from 'react';
import {View, StyleSheet, Text, Platform} from 'react-native';
import PBTouchable from './PBTouchable';
import {colors, dimensions} from '../theme';

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
                : 4,
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
            <View style={[{...styles.mainContainer}]}>
              <Text
                style={[
                  styles.buttonText,
                  props.buttonTextStyle,
                  props.secondaryButton ? styles.primaryText : styles.whiteText,
                ]}>
                {props.title}
              </Text>
            </View>
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
    marginTop: Platform.OS === 'android' ? 0 : 4,
    borderColor: colors.primaryBG,
    borderWidth: 1,
    borderRadius: 8,
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
    textAlign: 'right',
    backgroundColor: 'transparent',
    fontFamily: Platform.OS === 'android' ? 'Nunito-Regular' : 'Nunito-Regular',
    fontSize: 17,
  },

  whiteText: {
    color: '#fff',
  },
  primaryText: {
    color: colors.primaryBG,
  },
});
