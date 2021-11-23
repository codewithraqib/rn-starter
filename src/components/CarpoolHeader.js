import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import Image from 'react-native-scalable-image';
import PBText from './PBText';
import {dimensions, colors} from '../theme';
import PBTouchable from './PBTouchable';
import CommonService from '../services/commonService';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const CarpoolHeader = ({
  menuIcon,
  menuIconStyle,
  backIcon,
  leftIcon,
  rightIcon,
  rightIcon2,
  label,
  labelBold,
  labelDark,
  onLefIconPress,
  onRightIconPress,
  onRightIcon2Press,
  componentId,
  leftIconColor,
  rightIconColor,
  leftIconHeight,
  rightIconHeight,
  rightIconStyle,
  rightIconStyle2,
  noSpace,
  showHomeIcon,
  homeIconColor,
  middleIcon,
  middleIconImage,
  middleIconPress,
  notificationDot,
  colored,
}) => {
  return (
    <View style={[styles.header, colored ? {backgroundColor: '#992d2b'} : {}]}>
      {label ? (
        <View style={styles.label}>
          {/* {console.log("Component Id", componentId)} */}
          <PBText style={{color: labelDark ? '#464647' : '#fff', fontSize: 19}}>
            {label}
            {noSpace ? '' : ' '}
          </PBText>
          {labelBold ? (
            <PBText
              bold={true}
              style={{color: labelDark ? '#464647' : '#fff', fontSize: 19}}>
              {labelBold}
            </PBText>
          ) : null}
        </View>
      ) : null}
      {menuIcon ? (
        <View style={[styles.homeMenu, {marginLeft: -15, zIndex: 9}]}>
          {/* <PBTouchable> */}
          <PBTouchable onPress={CommonService.openCloserMenu}>
            <View
              style={[
                styles.homeMenuInnerMenu,
                {marginLeft: 0},
                menuIconStyle,
              ]}>
              <FontAwesome5Icon
                style={{fontSize: 18, color: leftIconColor}}
                name={'bars'}
              />
            </View>
          </PBTouchable>
        </View>
      ) : null}
      {backIcon ? (
        <View
          style={{
            width: 30,
            height: 30,
            marginBottom: 5,
          }}>
          <PBTouchable onPress={() => CommonService.goBack(componentId)}>
            <View
              style={{
                height: '100%',
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FontAwesome5Icon
                style={{color: '#fff', fontSize: 16}}
                name={'angle-left'}
              />
            </View>
          </PBTouchable>
        </View>
      ) : null}
      {leftIcon ? (
        <View style={styles.homeMenu}>
          <PBTouchable onPress={onLefIconPress}>
            <View style={styles.homeMenuInner}>
              <Image
                style={{tintColor: leftIconColor}}
                height={leftIconHeight ? leftIconHeight : 25}
                source={leftIcon}
              />
            </View>
          </PBTouchable>
        </View>
      ) : null}
      {middleIcon ? (
        <PBTouchable onPress={middleIconPress}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '60%',
              flex: 1,
              position: 'absolute',
              top: 0,
              left: 20,
              marginLeft: '16%',
            }}>
            <Image
              // style={{marginLeft:dimensions.vw*4}}
              height={25}
              source={middleIconImage}
            />
          </View>
        </PBTouchable>
      ) : null}

      {rightIcon ? (
        <View style={styles.homeMenu}>
          <PBTouchable onPress={onRightIconPress}>
            <View style={[styles.homeMenuInner, rightIconStyle]}>
              <Image
                style={{tintColor: rightIconColor}}
                height={rightIconHeight ? rightIconHeight : 25}
                source={rightIcon}
              />
              {notificationDot ? (
                <View
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 0,
                    width: 8,
                    height: 8,
                    borderRadius: 5,
                    backgroundColor: colors.secondaryBG,
                  }}
                />
              ) : null}
            </View>
          </PBTouchable>
        </View>
      ) : null}
      {rightIcon2 ? (
        <View style={styles.homeMenu}>
          <PBTouchable onPress={onRightIcon2Press}>
            <View style={[styles.homeMenuInner, rightIconStyle2]}>
              <Image
                style={{tintColor: rightIconColor}}
                height={rightIconHeight ? rightIconHeight : 25}
                source={rightIcon2}
              />
              {notificationDot ? (
                <View
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 20,
                    width: 8,
                    height: 8,
                    borderRadius: 5,
                    backgroundColor: colors.secondaryBG,
                  }}
                />
              ) : null}
            </View>
          </PBTouchable>
        </View>
      ) : null}
      {showHomeIcon ? (
        <View style={styles.homeMenu}>
          <PBTouchable onPress={() => CommonService.goToHome(componentId)}>
            <View style={[styles.homeMenuInner, rightIconStyle]}>
              <Image
                style={{
                  tintColor: homeIconColor ? homeIconColor : '#464647',
                  marginTop: -4,
                }}
                height={rightIconHeight ? rightIconHeight : dimensions.vw * 5.5}
                source={require('../assets/icons/home.png')}
              />
            </View>
          </PBTouchable>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    width: dimensions.vw * 100,
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    // top: -5,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    // height: 50,
    marginTop: Platform.OS === 'ios' ? null : 20,
    // paddingTop: 5,
    height: 66,
    // backgroundColor: '#ffaaee',
    alignItems: 'center',
  },

  homeMenu: {
    marginTop: -4,
  },
  homeMenuInnerMenu: {
    padding: 5,
    paddingLeft: 6,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: -6,
  },
  backIconInner: {
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: -1,
    paddingVertical: 10,
    // marginTop: -5,
  },
  homeMenuInner: {
    padding: 5,
    paddingHorizontal: 9,
    paddingRight: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default CarpoolHeader;
