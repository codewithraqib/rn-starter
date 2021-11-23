import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Animated, View} from 'react-native';
import {colors, dimensions} from '../theme';
import PBText from './PBText';

class BlinkingText extends Component {
  myInterval;
  constructor(props) {
    super(props);
    this.state = {
      bgColor: 'primary',
      fadeAnim: new Animated.Value(0.9),
    };
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      this.setState(previousState => {
        return {
          bgColor: previousState.bgColor == 'primary' ? 'secondary' : 'primary',
        };
      });

      this.state.fadeAnim == 0.9
        ? Animated.timing(this.state.fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }).start()
        : Animated.timing(this.state.fadeAnim, {
            toValue: 0.9,
            duration: 1000,
            useNativeDriver: true,
          }).start();
      // this.setState((previousState) => {
      //   return {
      //     fadeAnim: previousState.fadeAnim == 0 ? this.fadeIn : this.fadeOut,
      //   };
      // });
    }, 500);
  }

  // fadeIn = () => {
  //   // Will change fadeAnim value to 1 in 5 seconds
  //   Animated.timing(this.state.fadeAnim, {
  //     toValue: 1,
  //     duration: 500,
  //   }).start();
  // };

  // fadeOut = () => {
  //   // Will change fadeAnim value to 0 in 5 seconds
  //   Animated.timing(this.state.fadeAnim, {
  //     toValue: 0,
  //     duration: 500,
  //   }).start();
  // };

  render() {
    // console.log("props re", this.props)
    return (
      <Animated.View
        style={[
          this.state.bgColor == 'primary'
            ? styles.primaryBG
            : styles.secondaryBG,
          styles.item,
          {opacity: this.state.fadeAnim},
        ]}>
        <PBText
          style={{color: '#fff', fontSize: this.props.fontSize}}
          textBold={true}>
          {this.props.text}
        </PBText>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBG: {
    backgroundColor: '#fff',
    // backgroundColor: colors.primaryBG,
  },
  secondaryBG: {
    backgroundColor: '#ff0000',
    // backgroundColor: colors.secondaryBG,
  },
  item: {
    height: 10,
    width: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
});

export default BlinkingText;
