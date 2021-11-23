// @flow

import React, {PureComponent} from 'react';
import {StyleSheet, View, Image as Img, Animated} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {connectData} from 'src/redux';
import {HOME_SCREEN} from 'src/navigation';
import CommonService from 'src/services/commonService';

class WelcomeScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      text: 'PLAY',
    };

    setTimeout(() => {
      this.goToRegister();
    }, 1000);
  }

  goToRegister = () => {
    CommonService.goToScreenHideTopBar(this.props.componentId, HOME_SCREEN);
  };

  componentDidMount() {
    SplashScreen.hide();
  }

  componentWillUnmount() {}

  render() {
    return <View style={styles.flex} />;
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

// export default WelcomeScreen;
export default connectData()(WelcomeScreen);
