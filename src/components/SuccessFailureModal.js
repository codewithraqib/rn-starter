import React from 'react';
import {View, StyleSheet, Image as Img} from 'react-native';
import {dimensions} from '../theme';
import PBModal from './PBModal';
import PButton from './PButton';
import PBText from './PBText';
import Image from 'react-native-scalable-image';
import LottieView from 'lottie-react-native';

const SuccessFailureModal = ({
  showModal,
  onBackButtonPress,
  success,
  titleText,
  bodyText,
  bodyText2,
  onButtonPress,
  buttonText,
  showButton1,
  showButton2,
  button1Press,
  button2Press,
  button1Text,
  button2Text,
  smallIcon,
  modalHeight,
  hideIcon,
}) => {
  return (
    <PBModal
      showModal={showModal}
      titleText={''}
      showButton1={showButton1}
      showButton2={showButton2}
      button1Text={button1Text}
      button2Text={button2Text}
      modalHeight={modalHeight ? modalHeight : null}
      button1Press={() => (button1Press ? button1Press() : null)}
      button2Press={() => (button2Press ? button2Press() : null)}
      onBackButtonPress={() =>
        onBackButtonPress ? onBackButtonPress() : () => {}
      }
      // cardStyle={{ marginTop: -dimensions.vh * 35 }}
    >
      <View style={{padding: 10}}>
        {hideIcon ? null : (
          <View style={{height: 80}}>
            <LottieView
              source={
                success
                  ? require('../assets/anims/checkmark_anim.json')
                  : require('../assets/anims/xmark_anim.json')
              }
              autoPlay={true}
              loop={false}
              // style={{backgroundColor: '#ddd'}}
            />
          </View>
        )}
        {/* <Image
          style={{marginTop: 5, marginBottom: 20, alignSelf: 'center'}}
          width={smallIcon ? dimensions.vw * 18 : dimensions.vw * 28}
          source={
            success
              ? require('../assets/bgs/success_anim.gif')
              : require('../assets/bgs/failure_anim.gif')
          }
        /> */}

        <View style={{marginBottom: 5}}>
          <PBText
            bold={true}
            dark={true}
            style={{textAlign: 'center', fontSize: 15}}>
            {titleText ? titleText : success ? 'Success!' : 'Failure!'}
          </PBText>
        </View>

        {bodyText ? (
          <View style={{marginTop: 3}}>
            <PBText style={{textAlign: 'center', fontSize: 14, lineHeight: 16}}>
              {bodyText}
            </PBText>
          </View>
        ) : null}
        {bodyText2 ? (
          <View style={{marginTop: 20, marginBottom: 35}}>
            <PBText style={{textAlign: 'center', fontSize: 14}}>
              {bodyText2}
            </PBText>
          </View>
        ) : null}

        {!showButton1 ? (
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <PButton
                onPress={onButtonPress}
                // primaryButtonColor={true}
                style={{borderRadius: 10, marginTop: 25}}
                noGradient={true}
                title={buttonText ? buttonText : 'OK, CONTINUAR'}
              />
            </View>
          </View>
        ) : null}
      </View>
    </PBModal>
  );
};

const styles = StyleSheet.create({});

export default SuccessFailureModal;
