import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import {connectData, data} from 'src/redux';
import CarpoolHeader from 'src/components/CarpoolHeader';
import FullQuizBG from 'src/components/FullQuizBG';
import AppData from 'src/services/appData';
import Toast from 'react-native-easy-toast';
import OneSignal from 'react-native-onesignal';
import PBSafeView from 'src/components/PBSafeView';

class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};

    //onsignal code  -------------
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId(AppData.ONE_SIGNAL_APP_ID);

    OneSignal.promptForPushNotificationsWithUserResponse(response => {});

    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        let notification = notificationReceivedEvent.getNotification();
      },
    );

    OneSignal.setNotificationOpenedHandler(notification => {
      // setTimeout(() => {
      //   CommonService.goToScreenHideTopBar(
      //     CommonService.mainComponentId,
      //     NOTIFICATION_SCREEN,
      //   );
      // }, 2000);
    });

    OneSignal.getDeviceState()
      .then()
      .then(device => {
        this.setState({deviceState: device});
      });
  }

  render() {
    return (
      <PBSafeView style={styles.flex}>
        <FullQuizBG color={true} type={1} />

        <CarpoolHeader
          menuIcon={true}
          leftIconColor="#fff"
          labelDark={false}
          componentId={this.props.componentId}
          labelAndMiddleIcon={true}
          labelAndMiddleIconText={'Leaderboard'}
          labelAndMiddleIconTextColor={'#fff'}
          // colored={true}
        />

        <Toast ref="toast" />
      </PBSafeView>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default connectData()(HomeScreen);
