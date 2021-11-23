import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import AppData from 'src/services/appData';
import {dimensions} from '../theme';
import PBText from './PBText';
import PBTouchable from './PBTouchable';

class AdBanner extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {showAd: true};
  }

  render() {
    console.log('State in ad banner is----', this.state);
    return this.state.showAd ? (
      <PBTouchable
        onPress={() => this.props.goToAd(this.props.ad && this.props.ad.link)}>
        <View>
          <View style={{position: 'absolute', right: 10, top: -20, zIndex: 10}}>
            <PBTouchable onPress={() => this.setState({showAd: false})}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: '#fff',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                }}>
                <PBText style={{marginTop: 0}}>x</PBText>
              </View>
            </PBTouchable>
          </View>
          <Image
            source={
              this.props.ad && this.props.ad.image
                ? {uri: AppData.BASE_URL + this.props.ad.image}
                : require('../assets/images/demo-ad.png')
            }
            style={{
              height: 80,
              width: this.props.sideMenu
                ? dimensions.vw * 85
                : dimensions.vw * 100,
            }}
          />
        </View>
      </PBTouchable>
    ) : null;
  }
}

const styles = StyleSheet.create({});

export default AdBanner;
