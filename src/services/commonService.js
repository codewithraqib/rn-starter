import storageService from './storageService';
import {Navigation} from 'react-native-navigation';

import {Platform, Keyboard} from 'react-native';
// import * as currencyFormatter from "currency-formatter";
// import * as sha1 from "js-sha1";
import {SIDE_MENU} from '../navigation';
import AppData from './appData';
import DateService from './dateService';

const CommonService = {
  mainComponentId: null,
  token: null,
  airportServiceOptions: ['hacia aeropuerto', 'desde aeropuerto'],
  appSelectedType: null,
  toast: {},
  customerSocket: null,
  driverSocket: null,
  subscribedChannelCusomer: {},
  subscribedChannelDriver: {},
  carpoolSelectedOngoingTripCustomer: null,
  carpoolSelectedBusOngoingTripCustomer: null,
  carpoolSelectedOngoingTripCustomerDriverSide: null,
  carpoolGetOrderDetails: null,
  ratingText: {
    '1': 'Malo',
    '2': 'Regular',
    '3': 'Bueno',
    '4': 'Muy bueno',
    '5': 'Excelente',
  },

  onResponseFromDeepLinkApiCall: ({
    result,
    carpoolSetSearchTrips,
    screenName,
    noResultScreenName,
    noTripsData,
    componentId,
  }) => {
    try {
      // console.log('Data from search', result);
      if (result.data && result.data.status == 'success') {
        carpoolSetSearchTrips(result.data.result);
        if (result.data.result && result.data.result.length)
          CommonService.goToScreenHideTopBar(componentId, screenName);
        else
          CommonService.goToScreenHideTopBar(componentId, noResultScreenName, {
            noTripsData: noTripsData,
          });
      } else
        CommonService.goToScreenHideTopBar(componentId, noResultScreenName, {
          noTripsData: noTripsData,
        });
    } catch (e) {
      console.log(e);
    }
  },

  formatData: jsonArr => {
    if (jsonArr) {
      let keys = jsonArr[0];
      let currArr = [];
      for (let i = 1; i < jsonArr.length; i++) {
        let currentObj = {};
        for (let j = 0; j < keys.length; j++) {
          currentObj[keys[j]] = jsonArr[i][j];
        }
        currArr.push(currentObj);
      }
      return currArr;
    }
  },
  capitalize: str => {
    if (str) {
      let strArr = str.split(' ');
      for (let i = 0; i < strArr.length; i++) {
        if (strArr[i] && strArr[i][0]) {
          strArr[i] =
            strArr[i][0].toUpperCase() + strArr[i].substr(1).toLowerCase();
        }
      }
      return strArr.join(' ');
    }
    return '';
  },
  lowerCase: str => {
    if (str) {
      return str.toLowerCase();
    }
    return str;
  },
  round: (number, digit) => {
    let p = Math.pow(10, digit);
    return Math.round(number * p) / p;
  },

  setSeatLayout: (serviceDetails, route) => {
    try {
      let coachLayoutJson = [];
      let upperAvalibility;
      let originStageDetails;
      let destinationStageDetails;

      let errorMessage;
      if (serviceDetails.code === 416) {
        errorMessage = serviceDetails.message;
      } else {
        let seatDetails = serviceDetails.coach_details.seat_details;
        for (let seat of seatDetails) {
          if (!CommonService.isTrain()) {
            if (typeof coachLayoutJson[seat.row_id] == 'undefined') {
              coachLayoutJson[seat.row_id] = [];
            }
          } else {
            if (typeof coachLayoutJson[seat.floor_no] == 'undefined') {
              coachLayoutJson[seat.floor_no] = [];
            }
            if (
              typeof coachLayoutJson[seat.floor_no][seat.row_id] == 'undefined'
            ) {
              coachLayoutJson[seat.floor_no][seat.row_id] = [];
            }
          }
          let currentSeatJson = {};

          let berthTextPos = seat.type.indexOf('Berth');
          currentSeatJson.rowSpan = berthTextPos !== -1 ? 2 : 1;
          currentSeatJson.isBerth = berthTextPos !== -1 ? true : false;
          currentSeatJson.isReservable = seat.available;
          currentSeatJson.berthType = seat.berthType;
          currentSeatJson.isUpper = seat.floor_no ? seat.floor_no === 1 : false;
          if (currentSeatJson.isUpper) {
            upperAvalibility = currentSeatJson.isUpper;
          }
          currentSeatJson.isLower = !currentSeatJson.isUpper;
          currentSeatJson.object = seat;
          currentSeatJson.number = seat.number;
          currentSeatJson.isLadiesSeat = seat.is_ladies_seat;
          currentSeatJson.isGentsSeat = seat.is_gents_seat;
          currentSeatJson.type = seat.type;
          currentSeatJson.isGangWay = seat.type.indexOf('Gang') !== -1;
          currentSeatJson.isBreak = seat.type.indexOf('Break') !== -1;
          currentSeatJson.isSelected = false;
          if (!CommonService.isTrain()) {
            coachLayoutJson[seat.row_id][seat.col_id] = currentSeatJson;
          } else {
            coachLayoutJson[seat.floor_no][seat.row_id][
              seat.col_id
            ] = currentSeatJson;
          }
        }
        originStageDetails = serviceDetails.boarding_stages;
        destinationStageDetails = serviceDetails.dropoff_stages;
        let boardingStage =
          originStageDetails.length == 1 ? originStageDetails[0] : null;
        let droppingStage =
          destinationStageDetails.length == 1
            ? destinationStageDetails[0]
            : null;

        return {
          coachLayoutJson: coachLayoutJson,
          originStageDetails: originStageDetails,
          destinationStageDetails: destinationStageDetails,
          boardingStage: boardingStage,
          droppingStage: droppingStage,
          upperAvalibility: upperAvalibility,
          route: route,
        };
      }
    } catch (e) {
      console.log(
        'Exception in seat-laout.ts --> defaultCall() --> apiFactory.getServiceDetails(path)',
        e,
      );
    }
  },

  splitRutAndDv: rut => {
    let cValue = rut.replace(/[\.\-]/g, '');
    if (cValue.length == 0) return [null, null];
    if (cValue.length == 1) return [cValue, null];
    let cDv = cValue.charAt(cValue.length - 1);
    let cRut = cValue.substring(0, cValue.length - 1);
    return [cRut, cDv];
  },

  formatRut: value => {
    if (value) {
      let rutAndDv = CommonService.splitRutAndDv(value);
      let cRut = rutAndDv[0];
      let cDv = rutAndDv[1];
      if (!(cRut && cDv)) return cRut || value;
      let rutF = '';
      while (cRut.length > 3) {
        rutF = '.' + cRut.substr(cRut.length - 3) + rutF;
        cRut = cRut.substring(0, cRut.length - 3);
      }
      return cRut + rutF + '-' + cDv;
    }
    return '';
  },

  isRutValid: rut => {
    if (typeof rut !== 'string') return false;
    let cRut = rut.replace(/[\.\-]/g, '');
    if (cRut.length < 2) return false;
    let cDv = cRut.charAt(cRut.length - 1).toUpperCase();
    let nRut = parseInt(cRut.substr(0, cRut.length - 1));
    if (nRut === NaN) return false;
    return (
      CommonService.computeDv(nRut)
        .toString()
        .toUpperCase() === cDv
    );
  },

  isRut: (type, idCardTypes) => {
    let cardType = idCardTypes.filter(t => {
      return t.id == type;
    });
    if (
      cardType &&
      cardType[0] &&
      cardType[0].name &&
      cardType[0].name.toLowerCase().indexOf('rut') > -1
    ) {
      return true;
    }
    return false;
  },

  computeDv: rut => {
    let suma = 0;
    let mul = 2;
    if (typeof rut !== 'number') return;
    rut = rut.toString();
    for (let i = rut.length - 1; i >= 0; i--) {
      suma = suma + rut.charAt(i) * mul;
      mul = (mul + 1) % 8 || 2;
    }
    switch (suma % 11) {
      case 1:
        return 'k';
      case 0:
        return 0;
      default:
        return 11 - (suma % 11);
    }
  },

  copyObject: ob => {
    if (!ob) return {};
    return JSON.parse(JSON.stringify(ob));
  },

  isEMailValid: email => {
    if (email) {
      if (
        email.match(
          /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,6})+$/,
        )
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  storeLoginDetails: (loginData, loginSuccess) => {
    // console.log('Login data to store and callback is', loginData);

    try {
      // global.token = loginData ? loginData.token : null;
      if (loginData) {
        if (loginData && loginData.token) {
          CommonService.token = loginData.token;
        }
      } else {
        // global.xAccess = null;
        // CommonService.token = loginData.token;
      }
      loginSuccess(loginData && loginData.token ? loginData : null);
      loginData && loginData.token
        ? storageService.setItem('loginData', JSON.stringify(loginData))
        : storageService.removeItem('loginData');
    } catch (e) {
      console.log(e);
    }
  },
  logout: props => {
    try {
      storageService.clear();
      if (props) {
        props.setRecentCities(null);
      }

      CommonService.goToScreenHideTopBar();
    } catch (e) {
      console.log(e);
    }
  },
  isLoggedIn: loginData => {
    if (!loginData || (!Object.keys(loginData).length && global.token)) {
      return false;
    }
    return true;
  },

  getStatusName: status => {
    let s = {
      confirmed: 'Confirmado',
      booked: 'Reservados',
      cancelled: 'Anulado',
      pending: 'Pending',
      partial_cancelled: 'Canceledo Parcialmente',
    };
    return s[status];
  },

  // goToScreen: (
  //   component,
  //   screenName,
  //   title,
  //   props = {},
  //   hideHomeButton = false,
  //   showLogoutIcon = false,
  //   hideTopBar = false
  // ) => {
  //   Keyboard.dismiss();
  //   Navigation.push(component, {
  //     component: {
  //       name: screenName,
  //       passProps: props,
  //       options: {
  //         topBar: {
  //           title: {
  //             text: title,
  //             fontFamily:
  //               Platform.OS === "android"
  //                 ? "Nunito-Regular"
  //                 : "Nunito-Regular",
  //             alignment: "center",
  //           },
  //           rightButtons: !hideHomeButton
  //             ? {
  //               id: "rightHomeButton",
  //               icon:
  //                 Platform.OS === "android"
  //                   ? require("../assets/icons/home-icon.png")
  //                   : require("../assets/icons/home-icon-ios.png"),
  //             }
  //             : showLogoutIcon
  //               ? {
  //                 id: "rightHomeButton",
  //                 icon:
  //                   Platform.OS === "android"
  //                     ? require("../assets/icons/logout.png")
  //                     : require("../assets/icons/logout-ios.png"),
  //               }
  //               : null,
  //           ...{ visible: !hideTopBar, height: hideTopBar ? 0 : 56 },
  //         },
  //         statusBar: {
  //           visible: true,
  //           drawBehind: true,
  //         },
  //         animations: {
  //           pop: {
  //             content: {
  //               alpha: {
  //                 from: 1,
  //                 to: 0.1,
  //                 duration: 250,
  //                 startDelay: 0,
  //                 interpolation: "accelerate",
  //               },
  //               y: {
  //                 from: 0,
  //                 to: 600,
  //                 duration: 250,
  //                 startDelay: 0,
  //                 interpolation: "accelerate",
  //               },
  //             },
  //           },
  //           push: {
  //             waitForRender: true,
  //             content: {
  //               alpha: {
  //                 from: 0.1,
  //                 to: 1,
  //                 duration: 250,
  //                 startDelay: 0,
  //                 interpolation: "decelerate",
  //               },
  //               y: {
  //                 from: 600,
  //                 to: 0,
  //                 duration: 250,
  //                 startDelay: 0,
  //                 interpolation: "decelerate",
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });
  // },

  goToScreenHideTopBar: (component, screenName, props = {}) => {
    Keyboard.dismiss();
    Navigation.push(component, {
      component: {
        name: screenName,
        passProps: props,
        options: {
          topBar: {
            visible: false,
            height: 0,
          },
          statusBar: {
            visible: true,
            drawBehind: true,
          },
          animations: {
            pop: {
              content: {
                alpha: {
                  from: 1,
                  to: 0.1,
                  duration: 250,
                  startDelay: 0,
                  interpolation: 'accelerate',
                },
                y: {
                  from: 0,
                  to: 600,
                  duration: 250,
                  startDelay: 0,
                  interpolation: 'accelerate',
                },
              },
            },
            push: {
              waitForRender: true,
              content: {
                alpha: {
                  from: 0.1,
                  to: 1,
                  duration: 250,
                  startDelay: 0,
                  interpolation: 'decelerate',
                },
                y: {
                  from: 600,
                  to: 0,
                  duration: 250,
                  startDelay: 0,
                  interpolation: 'decelerate',
                },
              },
            },
          },
        },
      },
    });
  },

  goToHome: component => {
    Keyboard.dismiss();
    Navigation.popToRoot(component);
  },

  goBack: component => {
    // console.log('Go back called');
    Keyboard.dismiss();
    Navigation.pop(component);
  },

  rightButonHome: (buttonId, component, returnDateSelected = null) => {
    if (buttonId == 'rightHomeButton') {
      if (returnDateSelected) {
        returnDateSelected(null);
      }
      Navigation.popToRoot(component);
    }
  },

  bindNav: ref => {
    Navigation.events().bindComponent(ref);
  },

  setRoot: screen => {
    Keyboard.dismiss();
    Navigation.setRoot({
      root: {
        sideMenu: {
          id: 'leftSideDrawer',
          left: {
            component: {
              name: SIDE_MENU,
              passProps: {
                onMenuSelected: '',
              },
            },
          },
          center: {
            stack: {
              id: 'AppRoot',
              children: [
                {
                  component: {
                    name: screen,
                    options: {
                      topBar: {
                        visible: false,
                        height: 0,
                      },
                      statusBar: {
                        style: 'light',
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      },
    });
  },

  openCloserMenu: () => {
    Navigation.mergeOptions('leftSideDrawer', {
      sideMenu: {
        left: {
          visible: true,
        },
      },
    });
  },

  phoneNumberFormat: (text, len = 9) => {
    if (text) {
      text = (text + '').replace(/[a-zA-Z]/g, '');
      if ((text + '').length > len) {
        text = (text + '').substr(0, len);
      }
    }
    return text;
  },

  onlyNumbers: text => {
    if (text) {
      text = (text + '').replace(/[^0-9]/g, '');
    }
    return text;
  },

  onlyNumericValues: text => {
    if (text.match(/[^0-9]/g)) {
      return false;
    } else return true;
  },

  getOtp: str => {
    let otps = str.match(/(\d{6})/g);
    return otps ? otps[0] : null;
  },

  isEqual: (value, other) => {
    // Get the value type
    var type = Object.prototype.toString.call(value);

    // If the two objects are not the same type, return false
    if (type !== Object.prototype.toString.call(other)) return false;

    // If items are not an object or array, return false
    if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

    // Compare the length of the length of the two items
    var valueLen =
      type === '[object Array]' ? value.length : Object.keys(value).length;
    var otherLen =
      type === '[object Array]' ? other.length : Object.keys(other).length;
    if (valueLen !== otherLen) return false;

    // Compare two items
    var compare = function(item1, item2) {
      // Get the object type
      var itemType = Object.prototype.toString.call(item1);

      // If an object or array, compare recursively
      if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
        if (!CommonService.isEqual(item1, item2)) return false;
      }

      // Otherwise, do a simple comparison
      else {
        // If the two items are not the same type, return false
        if (itemType !== Object.prototype.toString.call(item2)) return false;

        // Else if it's a function, convert to a string and compare
        // Otherwise, just compare
        if (itemType === '[object Function]') {
          if (item1.toString() !== item2.toString()) return false;
        } else {
          if (item1 !== item2) return false;
        }
      }
    };

    // Compare properties
    if (type === '[object Array]') {
      for (var i = 0; i < valueLen; i++) {
        if (compare(value[i], other[i]) === false) return false;
      }
    } else {
      for (var key in value) {
        if (value.hasOwnProperty(key)) {
          if (compare(value[key], other[key]) === false) return false;
        }
      }
    }

    // If nothing failed, return true
    return true;
  },

  // currency: (amount) => {
  //   let formattedAmount = currencyFormatter.format(amount, { code: "CLP" });
  //   return "$" + formattedAmount.replace("$", "").trim().split(",")[0];
  // },

  // generateXAccess: (key, token) => {
  //   let timeNow = Math.floor(new Date().getTime() / 1000);
  //   let t = [timeNow, sha1.hex([key, token, timeNow].join(""))].join(".");
  //   return t;
  // },
  getCurrentTimeUTC: () => {
    var d = new Date();
    return +((d.getTime() + d.getTimezoneOffset() * 60000) / 1000).toFixed(0);
  },

  convertUTCDateToLocalDate: unixTime => {
    if (unixTime == 0) {
      return '-';
    }
    var theDate = new Date(unixTime * 1000);

    let dateString =
      CommonService.preZero(theDate.getDate()) +
      '-' +
      CommonService.preZero(theDate.getMonth() + 1) +
      '-' +
      theDate.getFullYear();
    return dateString;
  },

  convertUTCDateToLocalTime: unixTime => {
    if (unixTime == 0) {
      return '-';
    }
    var theDate = new Date(unixTime * 1000);

    let timeString =
      CommonService.preZero(theDate.getHours()) +
      ':' +
      CommonService.preZero(theDate.getMinutes());
    return timeString;
  },
  // getCurrentTimeUTC:() => {
  //   var d = new Date();
  //   var utcDate = new Date(Date.UTC(d.getFullYear(), d.getMonth() - 1, d.getDate(), d.getHours(), d.getMinutes(), d.getMilliseconds()));
  //   return new Date(new Date().toUTCString().slice(0, -3)).getTime()/1000
  //   // return +(utcDate.getTime() / 1000).toFixed(0);
  // },
  createUploadFormData: (photo, body) => {
    const data = new FormData();

    data.append('document', {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  },
  preZero: n => {
    if (n > 9) {
      return n;
    }
    return '0' + n;
  },
  distance: ({lat1, lon1, lat2, lon2, unit}) => {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == 'K') {
        dist = dist * 1.609344;
      }
      if (unit == 'N') {
        dist = dist * 0.8684;
      }
      if (unit == 'MT') {
        dist = dist * 1.609344 * 1000;
      }
      return dist;
    }
  },
  bearing: ({lat1, lon1, lat2, lon2}) => {
    var dLon = lon2 - lon1;

    var y = Math.sin(dLon) * Math.cos(lat2);
    var x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

    var brng = Math.atan2(x, y);

    brng = Math.toDegrees(brng);
    brng = (brng + 360) % 360;
    brng = 360 - brng;
    return brng;
  },
  // prefIcons: {
  //   ciga: {
  //     icon: require("../assets/carpool/cigerette-circle.png"),
  //     name: "Fumador",
  //   },
  //   music: {
  //     icon: require("../assets/carpool/music-circle.png"),
  //     name: "Música",
  //   },
  //   only_girl: {
  //     icon: require("../assets/carpool/girl-circle.png"),
  //     name: "Solo mujeres",
  //   },
  //   ac: { icon: require("../assets/carpool/ac-circle.png"), name: "A / C" },
  //   luggage: {
  //     icon: require("../assets/carpool/luggage-circle.png"),
  //     name: "Equipaje",
  //   },
  //   conversation: {
  //     icon: require("../assets/carpool/chat-circle.png"),
  //     name: "Conversación",
  //   },
  //   front_seat: {
  //     icon: require("../assets/carpool/seat-forward-circle.png"),
  //     name: "Asiento\ndelantero",
  //   },
  //   baby_seat: {
  //     icon: require("../assets/carpool/seat-babies-circle.png"),
  //     name: "Fumador",
  //   },
  //   pets: {
  //     icon: require("../assets/carpool/paw-circle.png"),
  //     name: "Pet\nfriendly",
  //   },
  // },
  // prefIconsGrey: {
  //   ciga: {
  //     icon: require("../assets/carpool/cigerette-grey-circle.png"),
  //     name: "Fumador",
  //   },
  //   music: {
  //     icon: require("../assets/carpool/music-grey-circle.png"),
  //     name: "Música",
  //   },
  //   only_girl: {
  //     icon: require("../assets/carpool/girl-grey-circle.png"),
  //     name: "Solo mujeres",
  //   },
  //   ac: {
  //     icon: require("../assets/carpool/ac-grey-circle.png"),
  //     name: "A / C",
  //   },
  //   luggage: {
  //     icon: require("../assets/carpool/luggage-grey-circle.png"),
  //     name: "Equipaje",
  //   },
  //   conversation: {
  //     icon: require("../assets/carpool/chat-grey-circle.png"),
  //     name: "Conversación",
  //   },
  //   front_seat: {
  //     icon: require("../assets/carpool/seat-forward-grey-circle.png"),
  //     name: "Asiento\ndelantero",
  //   },
  //   baby_seat: {
  //     icon: require("../assets/carpool/seat-babies-grey-circle.png"),
  //     name: "Fumador",
  //   },
  //   pets: {
  //     icon: require("../assets/carpool/paw-grey-circle.png"),
  //     name: "Pet\nfriendly",
  //   },
  // },
  show3AddressWords: address => {
    let retAdd = [];
    if (address) {
      let addArr = address.split(',');
      let i = 0;
      for (let a of addArr) {
        if (a && i < 3) retAdd.push(a);
        i++;
      }
    }
    return retAdd.join(',');
  },
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  },

  capsuleMenuIcons: [
    {
      icon: require('../assets/icons/icon-clock-line.png'),
      iconActive: require('../assets/icons/icon-clock-line-pink.png'),
      label: 'Horarios',
      sortFeild: 'dep_time',
    },
    {
      icon: require('../assets/icons/icon-bus-line.png'),
      iconActive: require('../assets/icons/icon-bus-line-pink.png'),
      label: 'Empresas',
      sortFeild: 'operator_service_name',
    },
    {
      icon: require('../assets/icons/icon-piggybank-line.png'),
      iconActive: require('../assets/icons/icon-piggybank-line-pink.png'),
      label: 'Precio',
      sortFeild: 'fare_str',
    },
    {
      icon: require('../assets/icons/icon-star-line.png'),
      iconActive: require('../assets/icons/icon-star-line-pink.png'),
      label: 'Ranking',
      sortFeild: 'rating',
    },

    {
      icon: require('../assets/icons/icon-chronometer-line.png'),
      iconActive: require('../assets/icons/icon-chronometer-line-pink.png'),
      label: 'Rápido',
      sortFeild: 'duration',
    },
  ],

  isTrain: () => {
    return CommonService.appSelectedType === 'train';
  },

  ceilNumber: (rnum, rlength = 0) => {
    var newnumber =
      Math.ceil(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
    return newnumber;
  },

  getParameterByName: (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  },
  getPosition: (string, subString, index) => {
    return string ? string.split(subString, index).join(subString).length : -1;
  },
  normalizeAddress: address => {
    return address
      ? address.substr(0, CommonService.getPosition(address, ',', 2))
      : '';
  },
  removeExtraSpacesInString: str => {
    return str ? str.replace(/  +/g, ' ') : '';
  },
  linkify: text => {
    var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    if (text) {
      let url = text.match(urlRegex);
      return url && url.length ? url[0] : '';
    }
    return '';
  },
};

export default CommonService;
