import {
	CONSOLE_REQUEST,
	SET_CURRENT,
	CLEAR_LOCAL_STORAGE,
} from './../constants'

export const sendRequest = (req) => ({
	type: CONSOLE_REQUEST,
	payload: req,
})

export const setCurrent = (req) => ({ type: SET_CURRENT, payload: req })

export const clearLocalStorage = () => ({ type: CLEAR_LOCAL_STORAGE })
