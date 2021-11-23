import React, {PureComponent} from 'react';
import {View, Animated, StyleSheet} from 'react-native';

import PBText from './PBText';
import {dimensions, colors} from '../theme';
import PBTouchable from './PBTouchable';
import {NeomorphBlur} from 'react-native-neomorph-shadows';

class PBTabs extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      menuBg: new Animated.Value(0),
      width: 0,
      height: 0,
      borderRadius: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
      // border:{
      //   borderRightWidth:2,
      //   borderRightColor:'#aaa',
      //   borderLeftWidth:0,
      //   borderLeftColor:'#aaa'
      // }
    };
  }

  componentDidMount() {}

  onTabClick = i => {
    Animated.timing(
      // Animate over time
      this.state.menuBg, // The animated value to drive
      {
        toValue: i * (this.state.width / this.props.tabsArray.length), // Animate to opacity: 1 (opaque)
        duration: 300, // Make it take a while
      },
    ).start();

    this.setState({
      borderRadius: {
        borderTopLeftRadius: i == 0 ? 8 : 0,
        borderBottomLeftRadius: i == 0 ? 8 : 0,
        borderTopRightRadius: this.props.tabsArray.length == i + 1 ? 8 : 0,
        borderBottomRightRadius: this.props.tabsArray.length == i + 1 ? 8 : 0,
      },
      // border:{
      //   borderRightWidth:(this.props.tabsArray.length == i+1 ? 0 : 2),
      //   borderRightColor:'#aaa',
      //   borderLeftWidth:(i == 0 ? 0 : 2),
      //   borderLeftColor:'#aaa'
      // }
    });
    this.props.onTabSelect(i);
  };
  onLayout = event => {
    const {width, height} = event.nativeEvent.layout;
    this.setState({width, height});
  };

  render() {
    const {tabsArray} = this.props;
    return (
      <View
        style={[
          styles.tabs,
          {
            height: this.props.height || 40,
            borderRadius: this.props.radius || 20,
            marginTop: this.props.marginTop || 0,
          },
        ]}
        onLayout={this.onLayout}>
        <NeomorphBlur
          style={{
            shadowRadius: 12,
            borderRadius: 30,
            backgroundColor: '#992d2b',
            width: dimensions.vw * 90,
            height: 30,
          }}>
          <View style={[styles.tabsBgAnimationContainer]}>
            <Animated.View
              style={{
                ...{
                  height: this.state.height + 2,
                  width: this.state.width / 2 + 5,
                  backgroundColor: this.props.activeTabColor || '#660000',
                  marginLeft: 0,
                },
                marginLeft: this.state.menuBg,
                width: this.state.width / tabsArray.length,
                borderRadius: this.props.radius || 20,
              }}
            />
          </View>
          <View style={styles.tabsInner}>
            {tabsArray.map((item, i) => (
              <PBTouchable key={i} onPress={() => this.onTabClick(i)}>
                <View
                  style={[
                    styles.tab,
                    {width: this.state.width / tabsArray.length},
                  ]}>
                  <PBText
                    style={{
                      ...styles.tabsText,
                      color: this.props.textColor || '#fff',
                      fontSize: this.props.fontSize,
                    }}>
                    {item}
                  </PBText>
                </View>
              </PBTouchable>
            ))}
          </View>
        </NeomorphBlur>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // tabs ------
  tabs: {
    width: '100%',
    marginVertical: 10,
    marginTop: 0,
    backgroundColor: '#ccc',
    borderRadius: 8,
    height: 40,
    overflow: 'hidden',
  },
  tabsInner: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
  },
  tabsBgAnimationContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  tab: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsText: {
    fontSize: 14,
    color: '#fff',
  },
});

export default PBTabs;
