import {
  GET_FACEBOOK_DATA_SUCCESS,
  GET_PROFILE,
  LOGIN_SUCCESS,
  REGISTER_USER,
  SAVE_MOBILE_PASSWORD,
  SET_MUSIC_TOGGLE_BUTTON,
  SET_QUIZ_RESULT,
  SET_PROFILE,
  GET_NOTIFICATION,
  GET_NOTIFICATION_DETAIL,
  QUIZ_IN_FOCUS,
  SET_ALL_ADS,
  SET_QUIZ_TO_PLAY_DATA,
} from './actions';

export const DEFAULT = {};

export default function data(state = DEFAULT, action = {}) {
  const {type, payload} = action;

  switch (type) {
    case GET_FACEBOOK_DATA_SUCCESS: {
      return {
        ...state,
        user: payload,
      };
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginData: payload,
      };
    }

    case SET_PROFILE: {
      return {
        ...state,
        profileData: payload,
      };
    }

    case SAVE_MOBILE_PASSWORD: {
      return {
        ...state,
        saveMobilePassword: payload,
      };
    }
    case SET_MUSIC_TOGGLE_BUTTON: {
      return {
        ...state,
        musicButtonValue: payload,
      };
    }
    case SET_QUIZ_RESULT: {
      return {
        ...state,
        quizResults: payload,
      };
    }
    case GET_NOTIFICATION: {
      return {
        ...state,
        notifications: payload,
      };
    }
    case QUIZ_IN_FOCUS: {
      return {
        ...state,
        quizInFocus: payload,
      };
    }

    case SET_ALL_ADS: {
      return {
        ...state,
        allAds: payload,
      };
    }

    case SET_QUIZ_TO_PLAY_DATA: {
      return {
        ...state,
        quizToPlayData: payload,
      };
    }
    default:
      return state;
  }
}
