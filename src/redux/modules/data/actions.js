// @flow

import {createAction} from 'redux-actions';

export const GET_FACEBOOK_DATA = 'data/GET_FACEBOOK_DATA';
export const REGISTER_USER = 'data/REGISTER_USER';
export const LOGIN_SCREEN = 'data/LOGIN_SCREEN';
export const GENERATE_OTP = 'data/GENERATE_OTP';
export const VERIFY_OTP = 'data/VERIFY_OTP';
export const LOGIN_SUCCESS = 'data/LOGIN_SUCCESS';
export const SAVE_MOBILE_PASSWORD = 'data/SAVE_MOBILE_PASSWORD';
export const GET_FACEBOOK_DATA_SUCCESS = 'data/GET_FACEBOOK_DATA_SUCCESS';
export const SET_MUSIC_TOGGLE_BUTTON = 'data/SET_MUSIC_TOGGLE_BUTTON';
export const GET_QUIZ_LIST = 'data/GET_QUIZ_LIST';
export const SET_QUIZ_RESULT = 'data/SET_QUIZ_RESULT';
export const GET_PROFILE = 'data/GET_PROFILE';
export const SET_PROFILE = 'data/SET_PROFILE';
export const BUY_QUIZ = 'data/BUY_QUIZ';
export const ADD_REMOVE_WALLET_AMOUNT = 'data/ADD_REMOVE_WALLET_AMOUNT';
export const SUBMIT_PARTICULAR_ANSWER = 'data/SUBMIT_PARTICULAR_ANSWER';
export const GET_QUIZ_DETAILS = 'data/GET_QUIZ_DETAILS';
export const GET_QUIZ_CATEGORIES = 'data/GET_QUIZ_CATEGORIES';
export const GET_MY_QUIZES = 'data/GET_MY_QUIZES';
export const GET_TRANSACTION_REPORT = 'data/GET_TRANSACTION_REPORT';
export const CREATE_PASSWORD = 'data/CREATE_PASSWORD';
export const GET_BANNER = 'data/GET_BANNER';
export const GET_PAYTM_CHECKSUM = 'data/GET_PAYTM_CHECKSUM';
export const GET_NOTIFICATION = 'data/GET_NOTIFICATION';
export const GET_NOTIFICATION_DETAIL = 'data/GET_NOTIFICATION_DETAIL';
export const QUIZ_IN_FOCUS = 'data/QUIZ_IN_FOCUS';
export const GET_CMS_DATA = 'data/GET_CMS_DATA';
export const UPDATE_BANK_DETAILS = 'data/UPDATE_BANK_DETAILS';
export const UPDATE_PERSONAL_DETAILS = 'data/UPDATE_PERSONAL_DETAILS';
export const UPDATE_PROFILE_IMAGE = 'data/UPDATE_PROFILE_IMAGE';
export const UPDATE_KYC_DOCUMENT = 'data/UPDATE_KYC_DOCUMENT';
export const WITHDRAW_AMOUNT = 'data/WITHDRAW_AMOUNT';
export const STORE_DEVICE_ID = 'data/STORE_DEVICE_ID';
export const GET_WITHDRAW_REQUESTS = 'data/GET_WITHDRAW_REQUESTS';
export const CANCEL_WITHDRAW_REQUEST = 'data/CANCEL_WITHDRAW_REQUEST';
export const RESEND_OTP_WITH_PASSWORD = 'data/RESEND_OTP_WITH_PASSWORD';
export const GET_ALL_ADS = 'data/GET_ALL_ADS';
export const SET_ALL_ADS = 'data/SET_ALL_ADS';
export const SET_QUIZ_TO_PLAY_DATA = 'data/SET_QUIZ_TO_PLAY_DATA';

export const fetchDataActionCreators = {
  getFacebookUserData: createAction(GET_FACEBOOK_DATA),
  registerUser: createAction(REGISTER_USER),
  loginUser: createAction(LOGIN_SCREEN),
  generateOtp: createAction(GENERATE_OTP),
  verifyOtp: createAction(VERIFY_OTP),
  loginSuccess: createAction(LOGIN_SUCCESS),
  saveMobilePassword: createAction(SAVE_MOBILE_PASSWORD),
  getFacebookUserDataSuccess: createAction(GET_FACEBOOK_DATA_SUCCESS),
  setMusicToggleButton: createAction(SET_MUSIC_TOGGLE_BUTTON),
  getQuizList: createAction(GET_QUIZ_LIST),
  setQuizResults: createAction(SET_QUIZ_RESULT),
  getProfile: createAction(GET_PROFILE),
  setProfile: createAction(SET_PROFILE),
  buyQuiz: createAction(BUY_QUIZ),
  addRemoveWalletAmount: createAction(ADD_REMOVE_WALLET_AMOUNT),
  submitParticularAnswer: createAction(SUBMIT_PARTICULAR_ANSWER),
  getQuizDetails: createAction(GET_QUIZ_DETAILS),
  getQuizCategories: createAction(GET_QUIZ_CATEGORIES),
  getMyQuizes: createAction(GET_MY_QUIZES),
  getTransactionReport: createAction(GET_TRANSACTION_REPORT),
  createPassword: createAction(CREATE_PASSWORD),
  getBanner: createAction(GET_BANNER),
  getPaytmChecksum: createAction(GET_PAYTM_CHECKSUM),
  getNotification: createAction(GET_NOTIFICATION),
  getNotificationDetail: createAction(GET_NOTIFICATION_DETAIL),
  quizInFocus: createAction(QUIZ_IN_FOCUS),
  getCMSData: createAction(GET_CMS_DATA),
  updateBankDetails: createAction(UPDATE_BANK_DETAILS),
  updatePersonalDetails: createAction(UPDATE_PERSONAL_DETAILS),
  updateProfileImage: createAction(UPDATE_PROFILE_IMAGE),
  updateKycDocument: createAction(UPDATE_KYC_DOCUMENT),
  withdrawAmount: createAction(WITHDRAW_AMOUNT),
  storeDeviceId: createAction(STORE_DEVICE_ID),
  getWithdrawRequests: createAction(GET_WITHDRAW_REQUESTS),
  cancelWithdrawRequest: createAction(CANCEL_WITHDRAW_REQUEST),
  resendOtpWithPassword: createAction(RESEND_OTP_WITH_PASSWORD),
  getAllAds: createAction(GET_ALL_ADS),
  setAllAds: createAction(SET_ALL_ADS),
  setQuizToPlayData: createAction(SET_QUIZ_TO_PLAY_DATA),
};
