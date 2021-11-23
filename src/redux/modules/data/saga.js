// @flow

import {App_Service} from 'src/services';

import {take, put, call, fork, all} from 'redux-saga/effects';

import {
  GET_FACEBOOK_DATA,
  fetchDataActionCreators,
  REGISTER_USER,
  LOGIN_SCREEN,
  GENERATE_OTP,
  VERIFY_OTP,
  GET_QUIZ_LIST,
  GET_PROFILE,
  BUY_QUIZ,
  ADD_REMOVE_WALLET_AMOUNT,
  SUBMIT_PARTICULAR_ANSWER,
  GET_QUIZ_DETAILS,
  GET_QUIZ_CATEGORIES,
  GET_MY_QUIZES,
  GET_TRANSACTION_REPORT,
  CREATE_PASSWORD,
  GET_BANNER,
  GET_PAYTM_CHECKSUM,
  GET_NOTIFICATION,
  GET_NOTIFICATION_DETAIL,
  GET_CMS_DATA,
  UPDATE_BANK_DETAILS,
  UPDATE_PERSONAL_DETAILS,
  UPDATE_PROFILE_IMAGE,
  WITHDRAW_AMOUNT,
  STORE_DEVICE_ID,
  GET_WITHDRAW_REQUESTS,
  CANCEL_WITHDRAW_REQUEST,
  RESEND_OTP_WITH_PASSWORD,
  UPDATE_KYC_DOCUMENT,
  GET_ALL_ADS,
} from './actions';
import AppData from 'src/services/appData';

const callback = (response, callback) => {
  if (callback)
    if (response.result === 'ok' && response.data) {
      callback({success: true, data: response.data});
    } else {
      callback({
        success: false,
        error: 'Login Failed try after sometime',
      });
    }
};

export function* asyncGetFacebookUserData({payload}) {
  const {facebookToken} = payload;

  // eslint-disable-next-line
  const url = `https://graph.facebook.com/v2.11/me?access_token=${facebookToken}&fields=id,name,email,picture{url}`;

  try {
    const response = yield call(App_Service, {url, method: 'GET'});

    if (response.result === 'ok') {
      yield put(
        fetchDataActionCreators.getFacebookUserDataSuccess(response.data),
      );
    }
  } catch (e) {
    console.log(e);
  }
}

export function* watchGetFacebookUserData() {
  while (true) {
    const action = yield take(GET_FACEBOOK_DATA);
    yield* asyncGetFacebookUserData(action);
  }
}

export function* asyncRegisterUser({payload}) {
  // const { facebookToken } = payload;

  // eslint-disable-next-line
  const url = AppData.BASE_URL + 'api/v1/register';

  try {
    const response = yield call(App_Service, {
      url,
      method: 'POST',
      params: payload.data,
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchRegisterUser() {
  while (true) {
    const action = yield take(REGISTER_USER);
    yield* asyncRegisterUser(action);
  }
}

export function* asyncLoginUser({payload}) {
  // const { facebookToken } = payload;

  // eslint-disable-next-line
  const url = AppData.BASE_URL + 'api/v1/login';

  try {
    const response = yield call(App_Service, {
      url,
      method: 'POST',
      params: payload.data,
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchLoginUser() {
  while (true) {
    const action = yield take(LOGIN_SCREEN);
    yield* asyncLoginUser(action);
  }
}

export function* asyncGenerateOtp({payload}) {
  // const { facebookToken } = payload;
  console.log("+++payload for resend password",payload.data)

  // eslint-disable-next-line
  const url = AppData.BASE_URL + 'api/v1/resendotp';

  try {
    const response = yield call(App_Service, {
      url,
      method: 'POST',
      params: payload.data,
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchGenerateOtp() {
  while (true) {
    const action = yield take(GENERATE_OTP);
    yield* asyncGenerateOtp(action);
  }
}

export function* asyncVerifyOtp({payload}) {
  // const { facebookToken } = payload;

  // eslint-disable-next-line
  const url = AppData.BASE_URL + 'api/v1/verifyotp';

  try {
    const response = yield call(App_Service, {
      url,
      method: 'POST',
      params: payload.data,
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchVerifyOtp() {
  while (true) {
    const action = yield take(VERIFY_OTP);
    yield* asyncVerifyOtp(action);
  }
}

export function* asyncGetQuizList({payload}) {
  // const { facebookToken } = payload;

  console.log('Payload in quiz list is', payload);

  // eslint-disable-next-line
  const url =
    // AppData.BASE_URL + 'api/v1/quiz/by-category/1';
    AppData.BASE_URL + `api/v1/quiz/by-category/${payload.category}`;

  console.log('url in quiz list is', url);

  try {
    const response = yield call(App_Service, {
      url,
      method: 'GET',
      params: payload.data,
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchGetQuizList() {
  while (true) {
    const action = yield take(GET_QUIZ_LIST);
    yield* asyncGetQuizList(action);
  }
}

export function* asyncGetProfile({payload}) {
  // eslint-disable-next-line
  const url = AppData.BASE_URL + `api/v1/profile`;

  try {
    const response = yield call(App_Service, {
      url,
      method: 'GET',
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchGetProfile() {
  while (true) {
    const action = yield take(GET_PROFILE);
    yield* asyncGetProfile(action);
  }
}

//BUY QUIZ
export function* asyncBuyQuiz({payload}) {
  // eslint-disable-next-line
  const url = AppData.BASE_URL + `api/v1/quiz/buy/${payload.quizId}`;

  console.log('URL TO BUY QUIZ', url);

  try {
    const response = yield call(App_Service, {
      url,
      method: 'POST',
      params: payload.data,
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchBuyQuiz() {
  while (true) {
    const action = yield take(BUY_QUIZ);
    yield* asyncBuyQuiz(action);
  }
}

//ADD OR REMOVE WALLET AMOUNT
export function* asyncAddRemoveWalletAmount({payload}) {
  // eslint-disable-next-line
  const url = AppData.BASE_URL + `api/v1/walet/add-remove-money`;

  console.log('Payload is', payload.data);

  try {
    const response = yield call(App_Service, {
      url,
      method: 'PUT',
      params: payload.data,
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchAddRemoveWalletAmount() {
  while (true) {
    const action = yield take(ADD_REMOVE_WALLET_AMOUNT);
    yield* asyncAddRemoveWalletAmount(action);
  }
}

//SUBMIT PARTICULAR ANSWER OF QUIZ
export function* asyncSubmitParticularAnswer({payload}) {
  // eslint-disable-next-line
  const url = AppData.BASE_URL + 'api/v1/answers';

  try {
    const response = yield call(App_Service, {
      url,
      method: 'POST',
      params: payload.data,
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchSubmitParticularAnswer() {
  while (true) {
    const action = yield take(SUBMIT_PARTICULAR_ANSWER);
    yield* asyncSubmitParticularAnswer(action);
  }
}

//GET QUIZ DETAILS
export function* asyncGetQuizDetails({payload}) {
  // eslint-disable-next-line
  const url = AppData.BASE_URL + `api/v1/quiz/${payload.id}`;

  console.log('Get quiz details url is', url);

  try {
    const response = yield call(App_Service, {
      url,
      method: 'GET',
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchGetQuizDetails() {
  while (true) {
    const action = yield take(GET_QUIZ_DETAILS);
    yield* asyncGetQuizDetails(action);
  }
}

//GET QUIZ CATEGORIES
export function* asyncGetQuizCategories({payload}) {
  // eslint-disable-next-line
  const url = AppData.BASE_URL + 'api/v1/category/list';

  try {
    const response = yield call(App_Service, {
      url,
      method: 'GET',
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchGetQuizCategories() {
  while (true) {
    const action = yield take(GET_QUIZ_CATEGORIES);
    yield* asyncGetQuizCategories(action);
  }
}

//GET MY QUIZES
export function* asyncGetMyQuizes({payload}) {
  // eslint-disable-next-line
  const url = AppData.BASE_URL + 'api/v1/my-quizzes';

  try {
    const response = yield call(App_Service, {
      url,
      method: 'GET',
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchGetMyQuizes() {
  while (true) {
    const action = yield take(GET_MY_QUIZES);
    yield* asyncGetMyQuizes(action);
  }
}

//GET TRANSACTION REPORTS
export function* asyncGetTransactionReport({payload}) {
  // eslint-disable-next-line
  const url = AppData.BASE_URL + 'api/v1/transactions';

  try {
    const response = yield call(App_Service, {
      url,
      method: 'GET',
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchGetTransactionReport() {
  while (true) {
    const action = yield take(GET_TRANSACTION_REPORT);
    yield* asyncGetTransactionReport(action);
  }
}

/// CREATE A NEW PASSWORD
export function* asyncCreatePassword({payload}) {
  const url = AppData.BASE_URL + 'api/v1/reset-password';

  console.log('+++payload loginWithPin is', payload.data);

  try {
    const response = yield call(App_Service, {
      url,
      method: 'POST',
      params: payload.data,
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchCreatePassword() {
  while (true) {
    const action = yield take(CREATE_PASSWORD);
    yield* asyncCreatePassword(action);
  }
}

/// Get Banner
export function* asyncGetBanner({payload}) {
  const url = AppData.BASE_URL + 'api/v1/banners';

  try {
    const response = yield call(App_Service, {
      url,
      method: 'GET',
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchGetBanner() {
  while (true) {
    const action = yield take(GET_BANNER);
    yield* asyncGetBanner(action);
  }
}

/// Get Checksum from paytm
export function* asyncGetPaytmChecksum({payload}) {
  const url = `https://bigbagsalesventure.com/api/generatpaytmhashes?customers_id=${
    payload.data.cust_id
  }&amount=${payload.data.amount}`;

  console.log('Url is', url);

  try {
    const response = yield call(App_Service, {
      url,
      method: 'GET',
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchGetPaytmChecksum() {
  while (true) {
    const action = yield take(GET_PAYTM_CHECKSUM);
    yield* asyncGetPaytmChecksum(action);
  }
}

/// Get Notification
export function* asyncGetNotification({payload}) {
  const url = AppData.BASE_URL + 'api/v1/notifications';

  try {
    const response = yield call(App_Service, {
      url,
      method: 'GET',
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchGetNotification() {
  while (true) {
    const action = yield take(GET_NOTIFICATION);
    yield* asyncGetNotification(action);
  }
}

/// Get Notification Details
export function* asyncGetNotificationDetail({payload}) {
  console.log('payload for notification details ', payload);
  const url = AppData.BASE_URL + `api/v1/notifications/${payload.data}`;

  try {
    const response = yield call(App_Service, {
      url,
      method: 'GET',
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchGetNotificationDetail() {
  while (true) {
    const action = yield take(GET_NOTIFICATION_DETAIL);
    yield* asyncGetNotificationDetail(action);
  }
}

/// Get CMS Data
export function* asyncGetCMSData({payload}) {
  console.log('payload for notification details ', payload);
  const url = AppData.BASE_URL + `api/v1/cms/name/${payload.type}`;

  try {
    const response = yield call(App_Service, {
      url,
      method: 'GET',
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchGetCMSData() {
  while (true) {
    const action = yield take(GET_CMS_DATA);
    yield* asyncGetCMSData(action);
  }
}

/// Update bank details
export function* asyncUpdateBankDetails({payload}) {
  const url = AppData.BASE_URL + `api/v1/profile/bank-details`;
  try {
    const response = yield call(App_Service, {
      url,
      method: 'PUT',
      params: payload.data,
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchUpdateBankDetails() {
  while (true) {
    const action = yield take(UPDATE_BANK_DETAILS);
    yield* asyncUpdateBankDetails(action);
  }
}

/// UPDATE PERSONAL DETAILS
export function* asyncUpdatePersonalDetails({payload}) {
  const url = AppData.BASE_URL + `api/v1/profile`;

  try {
    const response = yield call(App_Service, {
      url,
      method: 'PUT',
      params: payload.data,
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchUpdatePersonalDetails() {
  while (true) {
    const action = yield take(UPDATE_PERSONAL_DETAILS);
    yield* asyncUpdatePersonalDetails(action);
  }
}

/// UPDATE PERSONAL DETAILS
export function* asyncUpdateProfileImage({payload}) {
  const url = AppData.BASE_URL + `api/v1/profile/pic`;

  try {
    const response = yield call(App_Service, {
      url,
      method: 'POST',
      params: payload.image,
      hasFile: true,
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchUpdateProfileImage() {
  while (true) {
    const action = yield take(UPDATE_PROFILE_IMAGE);
    yield* asyncUpdateProfileImage(action);
  }
}

/// UPDATE KYC DETAILS
export function* asyncUpdateKycDocument({payload}) {
  const url = AppData.BASE_URL + `api/v1/profile/document`;
  console.log('+++in saga payload is', payload);
  try {
    const response = yield call(App_Service, {
      url,
      method: 'POST',
      params: payload.data,
      hasFile: true,
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchUpdateKycDocument() {
  while (true) {
    const action = yield take(UPDATE_KYC_DOCUMENT);
    yield* asyncUpdateKycDocument(action);
  }
}
/// UPDATE PERSONAL DETAILS
export function* asyncWithdrawAmount({payload}) {
  const url = AppData.BASE_URL + `api/v1/withdraw-request`;

  try {
    const response = yield call(App_Service, {
      url,
      method: 'POST',
      params: payload.data,
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchWithdrawAmount() {
  while (true) {
    const action = yield take(WITHDRAW_AMOUNT);
    yield* asyncWithdrawAmount(action);
  }
}

/// STORE DEVICE ID
export function* asyncStoreDeviceId({payload}) {
  const url = AppData.BASE_URL + `api/v1/profile/store-device-id`;

  try {
    const response = yield call(App_Service, {
      url,
      method: 'PUT',
      params: payload.data,
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchStoreDeviceId() {
  while (true) {
    const action = yield take(STORE_DEVICE_ID);
    yield* asyncStoreDeviceId(action);
  }
}

//GET WITHDRAW REQUESTS
export function* asyncGetWithdrawRequests({payload}) {
  // eslint-disable-next-line
  const url = AppData.BASE_URL + 'api/v1/withdraw-requests';

  try {
    const response = yield call(App_Service, {
      url,
      method: 'GET',
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchGetWithdrawRequests() {
  while (true) {
    const action = yield take(GET_WITHDRAW_REQUESTS);
    yield* asyncGetWithdrawRequests(action);
  }
}

/// UPDATE PERSONAL DETAILS
export function* asyncCancelWithdrawRequest({payload}) {
  const url = AppData.BASE_URL + `api/v1/cancel-withdraw-request`;

  try {
    const response = yield call(App_Service, {
      url,
      method: 'POST',
      params: payload.data,
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchCancelWithdrawRequest() {
  while (true) {
    const action = yield take(CANCEL_WITHDRAW_REQUEST);
    yield* asyncCancelWithdrawRequest(action);
  }
}

//RESEND OTP WITH PASSWORD
export function* asyncResendOtpWithPassword({payload}) {
  const url = AppData.BASE_URL + 'api/v1/resendotp-with-password';

  try {
    const response = yield call(App_Service, {
      url,
      method: 'POST',
      params: payload.data,
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchResendOtpWithPassword() {
  while (true) {
    const action = yield take(RESEND_OTP_WITH_PASSWORD);
    yield* asyncResendOtpWithPassword(action);
  }
}

//GET_ALL_ADS
export function* asyncGetAllAds({payload}) {
  // eslint-disable-next-line
  const url = AppData.BASE_URL + `api/v1/ads`;

  try {
    const response = yield call(App_Service, {
      url,
      method: 'GET',
    });
    // yield put(fetchDataActionCreators.hideLoader());
    callback(response, payload.callback);
  } catch (e) {
    // yield put(fetchDataActionCreators.hideLoader());
    console.log(e);
  }
}

export function* watchGetAllAds() {
  while (true) {
    const action = yield take(GET_ALL_ADS);
    yield* asyncGetAllAds(action);
  }
}

export default function*() {
  yield all([
    fork(watchGetFacebookUserData),
    fork(watchRegisterUser),
    fork(watchLoginUser),
    fork(watchGenerateOtp),
    fork(watchVerifyOtp),
    fork(watchGetQuizList),
    fork(watchGetProfile),
    fork(watchBuyQuiz),
    fork(watchAddRemoveWalletAmount),
    fork(watchSubmitParticularAnswer),
    fork(watchGetQuizDetails),
    fork(watchGetQuizCategories),
    fork(watchGetMyQuizes),
    fork(watchGetTransactionReport),
    fork(watchCreatePassword),
    fork(watchGetBanner),
    fork(watchGetPaytmChecksum),
    fork(watchGetNotification),
    fork(watchGetNotificationDetail),
    fork(watchGetCMSData),
    fork(watchUpdateBankDetails),
    fork(watchUpdatePersonalDetails),
    fork(watchUpdateProfileImage),
    fork(watchUpdateKycDocument),
    fork(watchWithdrawAmount),
    fork(watchGetWithdrawRequests),
    fork(watchCancelWithdrawRequest),
    fork(watchResendOtpWithPassword),
    fork(watchGetAllAds),
  ]);
}
