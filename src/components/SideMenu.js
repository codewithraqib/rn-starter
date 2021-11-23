import React, {PureComponent} from 'react';
import {
  View,
  ScrollView,
  Platform,
  Image as Img,
  StyleSheet,
  AppState,
  Switch,
  Linking,
} from 'react-native';

import {connectData} from 'src/redux';
import {Navigation} from 'react-native-navigation';
import {
  PROFILE_SCREEN,
  HOME_SCREEN,
  WALLET_SCREEN,
  NOTIFICATION_SCREEN,
  CONTACT_US_SCREEN,
  PRIVACY_POLICY_SCREEN,
  REFER_AND_EARN_SCREEN,
  MY_QUIZES_SCREEN,
  QUIZ_RULES,
  HOW_TO_PLAY_SCREEN,
  FREQUENTLY_ASKED_QUESTIONS_SCREEN,
  LOGIN_SCREEN,
  TERMS_SCREEN,
  ABOUT_US,
  LEGALITY_SCREEN,
} from '../navigation/Screens';
import PBText from './PBText';
import CommonService from 'src/services/commonService';
import PBTouchable from './PBTouchable';
import {colors, dimensions} from '../theme';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Image from 'react-native-scalable-image';
import {Neomorph} from 'react-native-neomorph-shadows';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import PBModal from './PBModal';
import WebView from 'react-native-webview';
import AppData from 'src/services/appData';
import AdBanner from 'src/components/AdBanner';
import Toast from 'react-native-easy-toast';

const menuItems = [
  {
    id: '0',
    name: 'Home',
    src: 'home',
    screen: HOME_SCREEN,
    title: 'my account',
  },
  {
    id: '1',
    name: 'My Profile',
    src: 'user',
    screen: PROFILE_SCREEN,
    title: 'my account',
  },
  {
    id: '2',
    name: 'Wallet',
    src: 'wallet',
    screen: WALLET_SCREEN,
    title: 'wallet',
  },
  {
    id: '3',
    name: 'Notifications',
    src: 'bell',
    screen: NOTIFICATION_SCREEN,
    title: 'Notifications',
  },
  {
    id: '4',
    name: 'My Quizes',
    src: 'check-circle',
    screen: MY_QUIZES_SCREEN,
    title: 'connect doctor',
  },
  {
    id: '5',
    name: 'Refer and Earn ',
    src: 'file-alt',
    screen: REFER_AND_EARN_SCREEN,
    title: 'connect',
  },
  {
    id: '6',
    name: 'How to play',
    src: 'play-circle',
    screen: HOW_TO_PLAY_SCREEN,
    title: 'cart',
  },
  {
    id: '12',
    name: 'About us',
    src: 'question-circle',
    screen: ABOUT_US,
    title: 'about',
  },
  {
    id: '7',
    name: 'Privacy Policy',
    src: 'file-alt',
    screen: PRIVACY_POLICY_SCREEN,
    title: 'cart',
  },
  {
    id: '8',
    name: 'Contact us',
    src: 'address-book',
    screen: CONTACT_US_SCREEN,
    title: 'cart',
  },
  {
    id: '9',
    name: 'Quiz rules',
    src: 'book-open',
    screen: QUIZ_RULES,
    title: 'quiz-rules',
  },
  {
    id: '10',
    name: 'FAQs',
    src: 'question-circle',
    screen: FREQUENTLY_ASKED_QUESTIONS_SCREEN,
    title: 'faqs',
  },

  {
    id: '11',
    name: 'Terms and conditions',
    src: 'question-circle',
    screen: TERMS_SCREEN,
    title: 'tnc',
  },
  {
    id: '13',
    name: 'Legality',
    src: 'question-circle',
    screen: LEGALITY_SCREEN,
    title: 'legal',
  },
];

const MenuItem = props => {
  return (
    <PBTouchable onPress={props.onMenuItemPresed}>
      <View style={styles.menuItem}>
        <View style={styles.iconContainer}>
          {/* <Image height={18} style={styles.icon} source={props.icon} /> */}
          <FontAwesome5Icon
            style={{fontSize: 24, color: colors.primaryBG}}
            name={props.icon}
          />
        </View>
        <View style={styles.labelContainer}>
          <PBText style={styles.label} dark={true}>
            {props.label}
          </PBText>
        </View>
      </View>
    </PBTouchable>
  );
};

const WelcomeContainer = props => {
  // console.log('Props in side menu', props);
  return (
    <View style={styles.welcomeContainer}>
      <View style={styles.welcomeAndLogut}>
        <View style={styles.welcomeImageContainer}>
          <View
            style={{
              padding: 10,
              backgroundColor: '#151a2e',
              borderRadius: 50,
              marginRight: 10,
              height: 80,
              width: 80,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
            <Image
              style={[styles.welcomeImage]}
              source={require('../assets/icons/qpedia2d.png')}
              width={50}
              // onPress={props.gotoProfileAndOpenCamera}
            />
          </View>

          <View style={styles.userNameContainer}>
            <View style={{flexDirection: 'row'}}>
              <PBText
                dark={true}
                bold={true}
                style={{fontSize: 12, color: Colors.primaryColor}}>
                {props.loginData && props.loginData.name}
              </PBText>
            </View>
            <View style={{marginTop: dimensions.vw * 2}}>
              <Neomorph
                // inner={this.state.inner} // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={{
                  shadowRadius: 5,
                  borderRadius: 4,
                  backgroundColor: colors.primaryBG,
                  width: dimensions.vw * 25,
                  height: dimensions.vw * 6.5,
                }}>
                <PBTouchable onPress={() => props.showLogout(true)}>
                  <View
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <PBText bold white style={{fontSize: 11}}>
                      Log out
                    </PBText>

                    <FontAwesome5Icon
                      name="share-square"
                      style={{color: '#fff', marginLeft: 5}}
                    />
                  </View>
                </PBTouchable>
              </Neomorph>
            </View>
          </View>
        </View>

        {/* <View style={{marginLeft: dimensions.vw * 5}}>
          <Neomorph
            // inner={this.state.inner} // <- enable shadow inside of neomorph
            swapShadows // <- change zIndex of each shadow color
            style={{
              shadowRadius: 5,
              borderRadius: 10,
              backgroundColor: '#ccc',
              width: dimensions.vw * 25,
              height: dimensions.vw * 6.5,
            }}>
            <PBTouchable onPress={() => props.showLogout(true)}>
              <View
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <PBText bold={true} primary={true} style={{fontSize: 15}}>
                  Log out
                </PBText>

                <FontAwesome5Icon
                  name="share-square"
                  style={{color: colors.primaryColor, marginLeft: 5}}
                />
              </View>
            </PBTouchable>
          </Neomorph>
        </View> */}
      </View>

      <View style={styles.musicButton}>
        <FontAwesome5Icon
          style={{fontSize: 16, color: colors.lightPrimaryBG}}
          name="music"
        />
        <Switch
          trackColor={{false: '#767577', true: colors.primaryBG}}
          thumbColor={props.isEnabled ? colors.lightPrimaryBG : '#f4f3f4'}
          // ios_backgroundColor="#3e3e3e"
          onValueChange={props.toggleSwitch}
          value={props.isEnabled}
        />
      </View>
    </View>
  );
};

class SideMenu extends PureComponent {
  static displayName = 'SideMenu';
  constructor(props) {
    super(props);
    this.state = {
      showLogoutModal: false,
      isEnabled: true,
    };
  }

  componentDidMount() {
    try {
      // play the file tone.mp3
      // SoundPlayer.playSoundFile('tone', 'mp3')
      // or play from url
      // this.props.data.musicButtonValue ?
      // SoundPlayer.playUrl(
      //   'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3',
      // );
      // : null
      setTimeout(() => {
        this.webview &&
          this.webview.injectJavaScript(
            'document.getElementById("audio").play();',
          );
      }, 2000);
    } catch (e) {
      console.warn(`cannot play the sound file`, e);
    }

    AppState.addEventListener('change', this._handleAppStateChange);

    let sideMenuAd =
      this.props.data.allAds &&
      this.props.data.allAds.find(val => val.name === 'side_menu');

    if (sideMenuAd && sideMenuAd.image != '') {
      this.setState({sideMenuAd});
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    console.log('App State: ' + nextAppState);

    if (nextAppState === 'background') {
      // SoundPlayer.stop();
      this.webview &&
        this.webview.injectJavaScript(
          'document.getElementById("audio").pause();',
        );
    } else {
      // SoundPlayer.stop();
      this.webview &&
        this.webview.injectJavaScript(
          'document.getElementById("audio").play();',
        );
    }

    this.setState({
      appState: nextAppState,
    });
  };

  // componentDidUpdate() {
  //   // this.webview.injectJavaScript('document.getElementById("audio").pause();');
  // }

  onMenuItemPresed = mItem => {
    Navigation.mergeOptions('leftSideDrawer', {
      sideMenu: {
        left: {
          visible: false,
        },
      },
    });

    CommonService.goToScreenHideTopBar('AppRoot', mItem.screen);
  };

  toggleSwitch = val => {
    if (this.state.isEnabled) {
      console.warn('Sound stopped');
      // SoundPlayer.stop();
      this.webview &&
        this.webview.injectJavaScript(
          'document.getElementById("audio").pause();',
        );
      this.setState({isEnabled: !this.state.isEnabled});
    } else {
      console.warn('Sound resumed');
      // SoundPlayer.playUrl(
      //   'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3',
      // );
      this.webview &&
        this.webview.injectJavaScript(
          'document.getElementById("audio").play();',
        );
      this.setState({isEnabled: !this.state.isEnabled});
    }
  };

  renderMenuScroll = () => {
    return (
      <ScrollView style={{maxHeight: dimensions.vh * 75}}>
        <WelcomeContainer
          //   gotoProfileAndOpenCamera={this.gotoProfileAndOpenCamera}
          //   gotoEditProfile={this.gotoEditProfile}
          //   welcomeText={'Name'}
          loginData={this.props.data.profileData}
          isEnabled={this.state.isEnabled}
          toggleSwitch={val => this.toggleSwitch(val)}
          showLogout={() => this.setState({showLogoutModal: true})}
          // welcomeState={this.state}
        />
        {/* <View style={styles.pinkBox} /> */}
        <View style={styles.menuContainer}>
          {menuItems.map(
            (item, key) => (
              // item.id != 9 ||
              // !this.props.data.loginData ? (
              <MenuItem
                key={key}
                id={item.id}
                icon={item.src}
                label={item.name}
                onMenuItemPresed={() => this.onMenuItemPresed(item)}
              />
            ),
            // ) : null,
          )}
        </View>
      </ScrollView>
    );
  };

  renderSocialIcons = () => {
    return (
      <View style={styles.socialIconContainer}>
        <View style={styles.socialIcon}>
          <PBTouchable>
            <View>
              <FontAwesome5Icon
                style={{fontSize: 26, color: '#151a2e'}}
                name="facebook"
              />
            </View>
          </PBTouchable>
        </View>

        <View style={styles.socialIcon}>
          <PBTouchable>
            <View>
              <FontAwesome5Icon
                style={{fontSize: 26, color: '#151a2e'}}
                name="instagram"
              />
            </View>
          </PBTouchable>
        </View>

        <View style={styles.socialIcon}>
          <PBTouchable>
            <View>
              <FontAwesome5Icon
                style={{fontSize: 26, color: '#151a2e'}}
                name="twitter"
              />
            </View>
          </PBTouchable>
        </View>

        <View style={styles.socialIcon}>
          <PBTouchable>
            <View>
              <FontAwesome5Icon
                style={{fontSize: 26, color: '#151a2e'}}
                name="youtube"
              />
            </View>
          </PBTouchable>
        </View>
      </View>
    );
  };

  logout = () => {
    // console.log('Logout called');
    this.setState({showLogoutModal: false});

    Navigation.mergeOptions('leftSideDrawer', {
      sideMenu: {
        left: {
          visible: false,
        },
      },
    });
    setTimeout(() => {
      CommonService.goToScreenHideTopBar('AppRoot', LOGIN_SCREEN);
    }, 100);
    CommonService.logout();
  };

  goToAd = link => {
    Linking.canOpenURL(link).then(supported => {
      if (supported) {
        Linking.openURL(link);
      } else {
        this.refs.toast.show(
          'Advertiser dont have a valid link, contact administrator!',
        );
      }
    });
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>{this.renderMenuScroll()}</View>
        {/* <View style={{marginTop: 20}}>{this.renderSocialIcons()}</View> */}
        <View style={[styles.footerBgImgContainer]}>
          <View style={styles.footerTextContainer}>
            <PBText white={true} bold={true}>
              App Version : 1.0 (release)
            </PBText>
          </View>
          <Img
            style={[styles.footerBgImg]}
            source={require('../assets/bgs/bg-inner-bottom.png')}
          />
        </View>

        <PBModal
          showModal={this.state.showLogoutModal}
          titleText="Do you really want to logoout!"
          showButton1={true}
          button1Text="No, Stay"
          button1Press={() => {
            this.setState({showLogoutModal: false});
          }}
          showButton2={true}
          button2Text="Yes, Go on!"
          button2Press={this.logout}
        />

        {/* <View>
          <WebView
            ref={ref => (this.webview = ref)}
            originWhitelist={['*']}
            mediaPlaybackRequiresUserAction={false} // Allow autoplay
            useWebKit={true}
            style={{
              backgroundColor: '#00f',
              position: 'absolute',
              maxHeight: 0,
            }}
            source={{
              html:
                // '<audio id="audio" loop> <source src="http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3" type="audio/mp3" /> </audio>',
                '<audio id="audio" loop> <source src="https://bracecodes.in/others/qpedia-music.mpeg" type="audio/mp3" /> </audio>',
            }}
          />
        </View> */}

        <Toast ref="toast" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: '#fff',
    justifyContent: 'space-between',
    borderRadius: 20,
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    // marginBottom:-10,
    // paddingBottom:15
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  welcomeImageContainer: {
    padding: 15,
    paddingTop: 15,
    paddingLeft: 20,
    marginBottom: 0,
    flexDirection: 'row',
    // backgroundColor: '#F00',
  },

  welcomeAndLogut: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 0,
    backgroundColor: '#ccc',
  },
  welcomeImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeText: {
    color: '#FDE9E0',
    fontSize: 17,
  },
  userNameContainer: {
    justifyContent: 'center',
  },
  pinkBox: {
    backgroundColor: '#FDE9E0',
    height: dimensions.vh * 8,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },

  menuContainer: {
    // height:dimensions.vh*40,
    paddingLeft: 15,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  menuHeader: {
    paddingTop: 25,
    paddingLeft: 10,
  },
  menuHeaderText: {
    fontSize: 14,
  },
  menuItem: {
    width: '100%',
    flexDirection: 'row',
    height: 42,
    alignItems: 'center',
    paddingLeft: 10,
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 30,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -5,
  },
  icon: {
    width: 20,
    height: 20,
  },
  labelContainer: {
    marginLeft: 10,
  },
  label: {
    fontSize: 15,
    color: '#151a2e',
  },
  offer: {
    position: 'absolute',
    right: 25,
    top: 5,
    alignItems: 'center',
    paddingTop: 5,
  },
  footerContainer: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerImage: {
    width: 50,
    height: 50,
    marginLeft: 2,
    marginRight: 2,
  },
  footerBg: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
  },
  footerBgImgContainer: {
    width: '100%',
    height: 100,
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    // backgroundColor:"blue"
  },
  footerBgImg: {
    width: '100%',
    height: 100,
    resizeMode: 'stretch',
    position: 'relative',
    bottom: 0,
    borderBottomRightRadius: 20,
  },

  footerTextContainer: {
    position: 'absolute',
    bottom: 20,
    zIndex: 100,
    left: 20,
  },

  contactRow: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIconContainer: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconItem: {
    width: (dimensions.vw * 100) / 4,
    // height:(dimensions.vw*100)/4,
    alignItems: 'center',
  },
  contactIcon: {
    marginBottom: 10,
  },
  iconItemInner: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 5,
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: Platform.OS === 'android' ? 'Nunito-Regular' : 'Nunito-Regular',
  },
  footerBold: {
    fontFamily:
      Platform.OS === 'android' ? 'Nunito-SemiBold' : 'Nunito-SemiBold',
  },
  socialIcon: {
    marginHorizontal: 8,
  },
  socialIconContainer: {
    position: 'absolute',
    bottom: 85,
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  musicButton: {
    flexDirection: 'row',
    position: 'absolute',
    top: 15,
    right: 15,
    alignItems: 'center',
  },
  adMainContainer: {
    height: 80,
    position: 'absolute',
    bottom: 0,
  },
});

export default connectData()(SideMenu);
