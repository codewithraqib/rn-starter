import React, {PureComponent} from 'react';
import {Text, View, TextInput, Platform, StyleSheet, Image} from 'react-native';
// import Image from 'react-native-scalable-image';
// import IonIcon from 'react-native-vector-icons/Ionicons';
import {colors, dimensions} from '../theme';
// import PBCalendar from './PBCalendar';
import DateService from '../services/dateService';
import {PBText} from '.';
import PBTouchable from './PBTouchable';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
// import CarpoolCalendar from './CarpoolCalendar';

class PBInput extends PureComponent {
  // const {disable,placeholder,error,errorMessage,value,onTextChange,onChange,onBlur,password,type,iconLeft,showPasswordIcon} = props;
  // ["default","email-address","numeric","phone-pad","number-pad","ascii-capable","numbers-and-punctuation","url","name-phone-pad","decimal-pad","twitter","web-search","visible-password"]
  constructor(props) {
    super(props);
    this.state = {
      isPassowrd: this.props.password,
      showCalendar: false,
    };
  }

  onDateChange = day => {
    this.props.onDateChange(day);
    this.setState({showCalendar: false});
  };

  render() {
    const {
      label,
      disable,
      placeholder,
      error,
      errorMessage,
      value,
      onTextChange,
      onChange,
      onFocus,
      onBlur,
      password,
      type,
      iconLeft,
      iconRight,
      rightIconColor,
      onRightIconPress,
      showPasswordIcon,
      onDateChange,
      selectedDate,
      calendarTitle,
      codeandphone,
      countryCode,
      onCountryCodeChange,
    } = this.props;
    return (
      <View style={[styles.inputContainer, this.props.containerStyle]}>
        {label ? (
          <View style={styles.labelTextContainer}>
            <Text bold={true} style={styles.labelText}>
              {label}
            </Text>
          </View>
        ) : null}
        <View
          style={[
            styles.inputWrapper,
            // { borderColor: error ? "#f00" : "#bbb" },
            this.props.style,
          ]}>
          {iconLeft ? (
            <View style={styles.iconContainer}>
              <Image style={styles.cityBoxIcon} height={18} source={iconLeft} />
            </View>
          ) : null}

          {codeandphone ? (
            <View>
              <TextInput
                value={countryCode}
                style={[
                  styles.countryCodeContainer,
                  this.props.textStyle,
                  disable ? {color: '#bbb'} : null,
                ]}
                // disable={true}
                placeholderTextColor="#333"
                editable={disable ? false : true}
                keyboardType={type === 'number' ? 'numeric' : type}
                autoCorrect={false}
                onChangeText={text => onCountryCodeChange(text)}
                textContentType="none"
              />
            </View>
          ) : null}

          {type != 'date' ? (
            <TextInput
              style={[
                styles.textInput,
                this.props.textStyle,
                disable ? {color: '#bbb'} : null,
              ]}
              onChangeText={text =>
                onChange ? onChange(text) : onTextChange(text)
              }
              onEndEditing={e => onBlur(e.nativeEvent.text)}
              onFocus={e => (onFocus ? onFocus(e.nativeEvent.text) : null)}
              value={value}
              placeholder={placeholder}
              placeholderTextColor="#666"
              editable={disable ? false : true}
              keyboardType={type === 'number' ? 'numeric' : type}
              secureTextEntry={this.state.isPassowrd}
              autoCorrect={false}
              textContentType="none"
              autoCapitalize={type == 'email-address' ? 'none' : 'sentences'}
            />
          ) : (
            <PBTouchable
              style={{width: '100%'}}
              onPress={() => this.setState({showCalendar: true})}>
              <View
                style={{
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  flex: 1,
                  paddingHorizontal: 5,
                }}>
                {selectedDate ? (
                  <PBText>
                    {' '}
                    {DateService.changeDateFormat(
                      selectedDate,
                      'yyyy-mm-dd',
                      'dd-mm-yyyy',
                    )}{' '}
                  </PBText>
                ) : (
                  <PBText style={{color: '#bbb'}}> {placeholder} </PBText>
                )}
              </View>
            </PBTouchable>
          )}
          {iconRight ? (
            <View style={styles.iconContainerRight}>
              <Image
                onPress={onRightIconPress ? onRightIconPress : () => {}}
                style={[styles.cityBoxIconRight, {tintColor: rightIconColor}]}
                height={18}
                source={iconRight}
              />
            </View>
          ) : null}
          {showPasswordIcon && password ? (
            <View>
              <PBTouchable
                onPress={() =>
                  this.setState({
                    isPassowrd: !this.state.isPassowrd,
                  })
                }>
                <View style={styles.showPasswordContainer}>
                  {this.state.isPassowrd ? (
                    <FontAwesome5Icon name="eye-slash" />
                  ) : (
                    <FontAwesome5Icon name="eye" />
                  )}
                </View>
              </PBTouchable>
            </View>
          ) : null}
        </View>
        {error ? (
          <View style={styles.errorTextContainer}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}
        {/* <CarpoolCalendar
              onBackButtonPress={() =>
                this.setState({ showCalendar: false })
              }
              onBackdropPress={() =>
                this.setState({ showCalendar: false })
              }
              showCalendar={this.state.showCalendar}
              onDateChange={(day) => this.onDateChange(day)}
              selectedDate={selectedDate}
              title={calendarTitle}
              minDate={this.props.minDate}
            /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingVertical: 5,
  },
  inputWrapper: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    // borderRadius: 8,
    flexDirection: 'row',
    height: dimensions.vw * 11,
    alignItems: 'center',
  },
  iconContainer: {
    height: '100%',
    width: 40,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countryCodeContainer: {
    height: '100%',
    color: '#464647',
    width: '100%',
    fontFamily: Platform.OS === 'android' ? 'Nunito-Regular' : 'Nunito-Regular',
    fontSize: 14,
    marginLeft: 10,
    // flex: 1,
    paddingVertical: 0,
    // margin: 0,
    marginVertical: 0,
    paddingLeft: 0,
    marginRight: 0,
    paddingRight: 0,
  },

  iconContainerRight: {
    height: '100%',
    width: 40,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // position:"absolute",
    // right:10,
  },
  textInput: {
    height: '100%',
    paddingHorizontal: 10,
    color: '#464647',
    fontFamily: Platform.OS === 'android' ? 'Nunito-Regular' : 'Nunito-Regular',
    fontSize: 14,
    flex: 1,
    paddingVertical: 0,
    margin: 0,
    marginVertical: 0,
  },
  showPasswordContainer: {
    height: '100%',
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorTextContainer: {
    paddingHorizontal: 2,
    paddingTop: 5,
  },
  errorText: {
    color: '#ff5700',
    fontSize: 11,
    fontFamily: Platform.OS === 'android' ? 'Nunito-Regular' : 'Nunito-Regular',
  },
  labelTextContainer: {
    paddingHorizontal: 2,
    marginBottom: 3,
  },
  labelText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily:
      Platform.OS === 'android' ? 'Nunito-SemiBold' : 'Nunito-SemiBold',
  },
  showPasswordIcon: {
    tintColor: '#ccc',
  },
});

export default PBInput;
