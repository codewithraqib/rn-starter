import React, {Component} from 'react';
import {Animated, View, StyleSheet} from 'react-native';
import {colors, dimensions} from '../theme';
import Image from 'react-native-scalable-image';
import PBText from './PBText';
import PBTouchable from './PBTouchable';
import LottieView from 'lottie-react-native';

class NoData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: 'primary',
    };
  }

  render() {
    return (
      <View
        style={[
          {
            width: dimensions.vw * 100 - 40,
            marginHorizontal: 20,
            height: '100%',
          },
        ]}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          {this.props.animation ? (
            <LottieView
              source={this.props.icon}
              autoPlay={true}
              loop={false}
              style={{marginBottom: dimensions.vh * 20}}
            />
          ) : (
            <Image height={dimensions.vw * 18} source={this.props.icon} />
          )}

          <View style={{marginTop: 10}}>
            <PBText primary={true} center={true} bold={true}>
              {this.props.title}
            </PBText>
            <PBText primary={true} center={true} style={{marginTop: 3}}>
              {this.props.desc}
            </PBText>
          </View>

          <View style={{marginTop: 15}}>
            <PBTouchable
              onPress={this.props.onPress ? this.props.onPress : null}>
              <View>
                <View
                  style={{
                    backgroundColor: '#FF5A5E',
                    borderRadius: 10,
                    height: 30,
                    paddingHorizontal: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <PBText style={{color: '#fff'}}>
                    {this.props.buttonText}
                  </PBText>
                </View>
              </View>
            </PBTouchable>
          </View>
        </View>
      </View>
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
    backgroundColor: colors.primaryBG,
  },
  secondaryBG: {
    backgroundColor: colors.secondaryBG,
  },
  item: {
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftWidth: 10,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FF5A5E',
    borderLeftColor: 'transparent',
  },
});

export default NoData;
