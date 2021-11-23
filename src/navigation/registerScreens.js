// @flow

import React from 'react';
import {Navigation} from 'react-native-navigation';

import {
  SingleAppScreen,
  Tab1Screen,
  Tab2Screen,
  HomeScreen,
  WelcomeScreen,
} from 'src/screens';
import {Provider} from 'src/redux';

import {
  WELCOME_SCREEN,
  SINGLE_APP_SCREEN,
  TAB1_SCREEN,
  TAB2_SCREEN,
  HOME_SCREEN,
  SIDE_MENU,
} from './Screens';
import SideMenu from 'src/components/SideMenu';

function WrappedComponent(Component) {
  return function inject(props) {
    const EnhancedComponent = () => (
      <Provider>
        <Component {...props} />
      </Provider>
    );

    return <EnhancedComponent />;
  };
}

export default function() {
  Navigation.registerComponent(SINGLE_APP_SCREEN, () =>
    WrappedComponent(SingleAppScreen),
  );
  Navigation.registerComponent(TAB1_SCREEN, () => WrappedComponent(Tab1Screen));
  Navigation.registerComponent(TAB2_SCREEN, () => WrappedComponent(Tab2Screen));
  Navigation.registerComponent(WELCOME_SCREEN, () =>
    WrappedComponent(WelcomeScreen),
  );
  Navigation.registerComponent(HOME_SCREEN, () => WrappedComponent(HomeScreen));
  Navigation.registerComponent(SIDE_MENU, () => WrappedComponent(SideMenu));
  console.info('All screens have been registered...');
}
