import { takeLatest, put, call, fork, delay } from 'redux-saga/effects'
import {
	CONSOLE_REQUEST,
	CONSOLE_SUCCESS,
	CONSOLE_FAIL,
	SET_ALERT,
	REMOVE_ALERT,
	CONSOLE_HISTORY,
	SET_LOADING,
} from './../constants'
import { sendRequest } from './../api/console'

function* watchGetRequest() {
	yield takeLatest(CONSOLE_REQUEST, workerGetRequest)
}

function* workerGetRequest({ payload }) {
	try {
		yield put({ type: SET_LOADING })
		const res = yield call(sendRequest, payload)
		yield put({ type: CONSOLE_SUCCESS, payload: res })
		yield put({ type: CONSOLE_HISTORY, payload: payload })
	} catch (error) {
		yield put({ type: CONSOLE_FAIL })
		yield put({
			type: SET_ALERT,
			payload: error.message,
		})
		yield delay(2500)
		yield put({ type: REMOVE_ALERT })
		yield put({ type: CONSOLE_HISTORY, payload: payload })
	}
}

const consoleSagas = [fork(watchGetRequest)]

export default consoleSagas
