import { all, fork, takeEvery, call, put, delay } from "redux-saga/effects";

import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
} from "../reducers/user";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api";

function loginAPI(loginData) {
  // 서버에 요청을 보내는 부분
  console.log(loginData);
  return axios.post("/user/login", loginData, {
    withCredentials: true // 쿠키 주고받기
  });
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data); // loginAPI가 성공하면 다음줄 실행
    console.log(result);
    console.log("---------");
    console.log(result.data);
    yield put({
      // put은 dispatch와 동일
      type: LOG_IN_SUCCESS,
      data: result.data
    });
  } catch (e) {
    // loginAPI가 실패
    console.log("로그인 API 불러오지 못했음");
    console.error(e);
    yield put({
      // LOG_IN_FAILURE 실행됨
      type: LOG_IN_FAILURE
    });
  }
}

function* watchLogin() {
  yield takeEvery(LOG_IN_REQUEST, login);
}

function signUpAPI(signUpData) {
  console.log(signUpData);
  return axios.post("/user/", signUpData);
}

function logoutAPI() {
  return axios.post("/user/logout");
}

function* logout() {
  try {
    yield call(logoutAPI);
    yield put({
      type: LOG_OUT_SUCCESS
    });
  } catch (e) {
    console.log("로그아웃 실패");
    console.error(e);
    yield put({
      type: LOG_OUT_FAILURE
    });
  }
}

function* watchLogout() {
  yield takeEvery(LOG_OUT_REQUEST, logout);
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.data); //첫째는 함수 둘째는 인자
    yield put({
      type: SIGN_UP_SUCCESS
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: SIGN_UP_FAILURE,
      error: e
    });
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([fork(watchSignUp), fork(watchLogin), fork(watchLogout)]);
}