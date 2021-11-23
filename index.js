// import { Navigation } from 'react-native-navigation';

// // Note:
// // in order to test Redux and MobX separately,
// // please comment unnecessary import, this is important
// // because RNN registers screens for both of them if two imports are presented

// // import { startApp as startReduxApp } from './srcRedux/App';
// import { startApp as startMobXApp } from './srcMobX/App';

// Navigation.events().registerAppLaunchedListener(() => {
//     // startReduxApp();
//     // startMobXApp();
// });

import { Navigation } from 'react-native-navigation';
import { pushTutorialScreen } from 'src/navigation';

import { Platform } from 'react-native';
// import KeyboardManager, { PreviousNextView } from 'react-native-keyboard-manager'


Array.range= function(a, b, step){
  var A= [];
  if(typeof a== 'number'){
      A[0]= a;
      step= step || 1;
      while(a+step<= b){
          A[A.length]= a+= step;
      }
  }
  else{
      var s= 'abcdefghijklmnopqrstuvwxyz';
      if(a=== a.toUpperCase()){
          b=b.toUpperCase();
          s= s.toUpperCase();
      }
      s= s.substring(s.indexOf(a), s.indexOf(b)+ 1);
      A= s.split('');        
  }
  return A;
}

// if (Platform.OS === 'ios') {
//   KeyboardManager.setToolbarPreviousNextButtonEnable(true);
// }
Navigation.events().registerAppLaunchedListener(() => pushTutorialScreen());