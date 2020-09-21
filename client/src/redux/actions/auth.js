import {
	REGISTER_REQUEST,
	LOGIN_REQUEST,
	LOAD_USER_REQUEST,
	LOGOUT,
	SET_ALERT,
} from './../constants'

export const register = (form) => ({ type: REGISTER_REQUEST, payload: form })

export const login = (form) => {
	return {
		type: LOGIN_REQUEST,
		payload: form,
	}
}

export const keepLogged = () => ({ type: LOAD_USER_REQUEST })

export const logout = () => ({ type: LOGOUT })

export const authError = ({ msg, alertType }) => ({
	type: SET_ALERT,
	action: { msg, alertType },
})
