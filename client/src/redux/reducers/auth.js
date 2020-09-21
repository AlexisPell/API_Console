import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGOUT,
	SET_ALERT,
	REMOVE_ALERT,
	SET_LOADING,
} from './../constants'

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null,
	error: '',
}

export default (state = initialState, action) => {
	switch (action.type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload,
			}
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload)
			return {
				...state,
				token: action.payload,
				isAuthenticated: true,
				loading: false,
			}
		case AUTH_ERROR:
		case LOGOUT:
		case REGISTER_FAIL:
		case LOGIN_FAIL:
			localStorage.removeItem('token')
			localStorage.removeItem('requests')
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
			}
		case SET_LOADING:
			return {
				...state,
				loading: true,
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
