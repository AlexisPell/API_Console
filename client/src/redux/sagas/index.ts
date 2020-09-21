import { all } from 'redux-saga/effects'
import userSagas from './auth'
import consoleSagas from './console'

export default function* rootSaga() {
	yield all([...userSagas, ...consoleSagas])
}
