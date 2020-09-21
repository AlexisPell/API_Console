import {
	CONSOLE_SUCCESS,
	CONSOLE_FAIL,
	CONSOLE_HISTORY,
	SET_ALERT,
	REMOVE_ALERT,
	SET_LOADING,
	SET_CURRENT,
	CLEAR_LOCAL_STORAGE,
} from './../constants'

const initialState = {
	request: null,
	requests: JSON.parse(localStorage.getItem('requests')),
	error: '',
	loading: true,
	current: null,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_LOADING:
			return {
				...state,
				loading: true,
			}
		case SET_CURRENT:
			return {
				...state,
				current: action.payload,
			}
		case CLEAR_LOCAL_STORAGE:
			localStorage.removeItem('requests')
			return {
				...state,
				requests: JSON.parse(localStorage.getItem('requests')),
			}
		case CONSOLE_SUCCESS:
			return {
				...state,
				request: action.payload,
				loading: false,
			}
		case CONSOLE_HISTORY:
			let localHistory = []
			if (localStorage.getItem('requests')) {
				localHistory = JSON.parse(localStorage.getItem('requests'))
			}
			localHistory.unshift(action.payload)
			localStorage.setItem('requests', JSON.stringify(localHistory))
			return {
				...state,
				requests: JSON.parse(localStorage.getItem('requests')),
			}
		case CONSOLE_FAIL:
			return {
				...state,
				request: null,
				loading: false,
			}
		case SET_ALERT:
			return {
				...state,
				error: action.payload,
			}
		case REMOVE_ALERT:
			return {
				...state,
				error: '',
			}
		default:
			return state
	}
}
