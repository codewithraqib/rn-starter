// @flow

import {set, isEmpty} from 'lodash';
import CommonService from './commonService';

export default async function App_Service({url, method, params, hasFile}) {
  const headers = {};

  if (hasFile) {
    set(headers, 'Content-Type', 'multipart/form-data');
    set(headers, 'Accept', 'application/json');
  } else {
    set(headers, 'Accept', 'application/json');
    set(headers, 'Content-Type', 'application/json');
  }

  try {
    if (CommonService.token) {
      set(headers, 'Authorization', `Bearer ${CommonService.token}`);
    }
  } catch (e) {
    console.log('fffffff');
  }

  const reqBody = {
    method,
    headers,
  };

  // if (!isEmpty(params)) {
  //   reqBody.body = JSON.stringify(params);
  // }

  if (!isEmpty(params) && !hasFile) {
    reqBody.body = JSON.stringify(params);
  } else if (!isEmpty(params)) {
    const data = new FormData();
    for (let key in params) {
      data.append(key, params[key]);
    }
    reqBody.body = data;
  }

  // console.log('api url ====================', url);
  // console.log('api reqBody ====================', {reqBody});

  return fetch(url, reqBody)
    .then(response => {
      // console.log('Response from API in restservice-----', response);
      return response.json();
    })
    .then(data => {
      // console.log('Response ==========', data);
      return {
        result: 'ok',
        data,
      };
    })
    .catch(e => {
      console.log('error', e);
      return {
        result: 'error',
        message: 'Please check your internet connection!',
      };
    });
}
