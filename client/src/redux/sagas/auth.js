import {
	takeEvery,
	takeLatest,
	put,
	call,
	fork,
	delay,
} from 'redux-saga/effects'
import {
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOAD_USER_REQUEST,
	USER_LOADED,
	AUTH_ERROR,
	SET_ALERT,
	REMOVE_ALERT,
	SET_LOADING,
} from './../constants'
import { registerUser, loginUser, keepLogged } from './../api/auth'
import setAuthToken from './../../utils/setAuthToken'

function* watchRegister() {
	yield takeLatest(REGISTER_REQUEST, workerRegister)
}

function* workerRegister({ payload }) {
	try {
		yield put({ type: SET_LOADING })
		const res = yield call(registerUser, payload)
		yield put({ type: REGISTER_SUCCESS, payload: res.token })
		yield call(workerKeepLogged)
	} catch (error) {
		yield put({ type: REGISTER_FAIL })
		yield put({
			type: SET_ALERT,
			payload: `Registe fail, ${error.message}`,
		})
		yield delay(2500)
		yield put({ type: REMOVE_ALERT })
	}
}

function* watchLogin() {
	yield takeLatest(LOGIN_REQUEST, workerLogin)
}

function* workerLogin({ payload }) {
	try {
		yield put({ type: SET_LOADING })
		const res = yield call(loginUser, payload)
		yield put({ type: LOGIN_SUCCESS, payload: res.token })
		yield call(workerKeepLogged)
	} catch (error) {
		yield put({ type: LOGIN_FAIL })
		yield put({
			type: SET_ALERT,
			payload: `Login fail, ${error.message}`,
		})
		yield delay(2500)
		yield put({ type: REMOVE_ALERT })
	}
}

function* watchKeepLogged() {
	yield takeEvery(LOAD_USER_REQUEST, workerKeepLogged)
}

function* workerKeepLogged() {
	if (localStorage.token) {
		setAuthToken(localStorage.token)
	}
	try {
		const res = yield keepLogged()
		yield put({ type: USER_LOADED, payload: res })
	} catch (error) {
		yield put({ type: AUTH_ERROR })
	}
}

const userSagas = [fork(watchRegister), fork(watchKeepLogged), fork(watchLogin)]

export default userSagas
