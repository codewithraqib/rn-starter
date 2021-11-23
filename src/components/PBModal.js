import React, {PureComponent} from 'react';
import {View, ScrollView, Platform, StyleSheet} from 'react-native';

import Image from 'react-native-scalable-image';
import Modal from 'react-native-modal';

import PBCard from './PBCard';
import PBText from './PBText';
import PButton from './PButton';
import PBTouchable from './PBTouchable';
import {dimensions} from '../theme';

class PBModal extends PureComponent {
  /**
   * type:string
   * showModal:bool
   * icon:imagePath
   * titleText:string
   * bodyText:string
   * showButton1:bool
   * showButton2:bool
   * button1Text:string
   * button2Text:string
   * button1Press:func
   * button2Press:func
   * onBackButtonPress:func
   * onBackdropPress:func
   * buttonTextStyle
   * closeIconPress
   * showCloseIcon
   * onModalIconPress
   * startFromTop:boool,false
   */

  constructor(props) {
    super(props);
  }

  getAlertIcon = () => {
    // console.log("Icon for modal is", this.props.icon)
    if (this.props.type == 'alert') {
      if (this.props.icon) {
        return (
          <View style={styles.iconContainer}>
            {this.props.onModalIconPress ? (
              <PBTouchable onPress={this.props.onModalIconPress}>
                <Image height={60} source={this.props.icon} />
              </PBTouchable>
            ) : (
              <Image height={60} source={this.props.icon} />
            )}
          </View>
        );
      }
    }
    return null;
  };
  getAlertBodyText = () => {
    if (this.props.bodyText) {
      return (
        <View style={styles.alertBodyTextContainer}>
          <PBText style={styles.alertBodyText}>{this.props.bodyText}</PBText>
        </View>
      );
    }
  };

  render() {
    return (
      <Modal
        backdropOpacity={this.props.opacity ? this.props.opacity : 0.5}
        style={{margin: 0}}
        isVisible={this.props.showModal}
        onBackButtonPress={
          this.props.onBackButtonPress ? this.props.onBackButtonPress : () => {}
        }
        onBackdropPress={
          this.props.onBackdropPress ? this.props.onBackdropPress : () => {}
        }
        animationInTiming={this.props.animationTime || 300}
        animationOutTiming={this.props.animationTime || 300}
        backdropTransitionInTiming={this.props.animationTime || 300}
        backdropTransitionOutTiming={this.props.animationTime || 300}>
        <View
          style={[
            styles.modalOuter,
            {
              height: this.props.startFromTop ? '100%' : null,
              width: '90%',
              margin: 0,
            },
          ]}>
          <PBCard
            padding={20}
            style={[
              {
                marginTop: this.props.startFromTop ? dimensions.vh * 8 : null,
                borderRadius: 15,
                width: '100%',
                margin: 10,
                height: this.props.modalHeight
                  ? this.props.modalHeight
                  : Platform.OS === 'ios'
                  ? dimensions.vh * 50
                  : null,
              },
              this.props.cardStyle,
            ]}>
            {this.getAlertIcon()}
            {this.props.titleText ? (
              <View style={styles.titleContainer}>
                <PBText
                  bold={true}
                  style={[
                    styles.titleText,
                    {
                      fontSize: this.props.titleSize
                        ? this.props.titleSize
                        : 15,
                      lineHeight: 20,
                    },
                  ]}>
                  {this.props.titleText}
                </PBText>
              </View>
            ) : null}
            {this.getAlertBodyText()}
            <View style={styles.body}>{this.props.children}</View>
            {this.props.showButton1 || this.props.showButton2 ? (
              <View style={styles.buttonsContainer}>
                {this.props.showButton1 ? (
                  <View style={[styles.buttonContainer]}>
                    <PButton
                      onPress={this.props.button1Press}
                      primaryButtonColor={false}
                      buttonTextStyle={this.props.buttonTextStyle}
                      title={this.props.button1Text}
                      style={{borderRadius: 10}}
                      noGradient={true}
                    />
                  </View>
                ) : null}
                {this.props.showButton2 ? (
                  <View style={styles.buttonContainer}>
                    <PButton
                      secondaryButton={true}
                      title={this.props.button2Text}
                      onPress={this.props.button2Press}
                      buttonTextStyle={this.props.buttonTextStyle}
                      style={{borderRadius: 10, marginTop: 0}}
                      noGradient={true}
                    />
                  </View>
                ) : null}
              </View>
            ) : null}
            {this.props.showCloseIcon ? (
              <PBTouchable onPress={this.props.closeIconPress}>
                <View
                  style={{
                    padding: 5,
                    borderRadius: 16,
                    position: 'absolute',
                    top: 5,
                    right: 5,
                  }}>
                  <Image
                    height={24}
                    source={require('../assets/icons/cross-grey.png')}
                  />
                </View>
              </PBTouchable>
            ) : null}
          </PBCard>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalOuter: {
    width: '100%',
    // height:Platform.OS === 'ios' ? dimensions.vh*90 : null
  },
  iconContainer: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
  titleContainer: {
    alignItems: 'center',
    padding: 12,
    paddingTop: 0,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 15,
  },
  alertBodyTextContainer: {
    alignItems: 'center',
  },
  alertBodyText: {
    textAlign: 'center',
    fontSize: 14,
  },
  buttonsContainer: {
    marginTop: 15,
  },
  buttonContainer: {
    // flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    // maxWidth:'70%',
    width: '100%',
    alignSelf: 'center',
  },
});

export default PBModal;
