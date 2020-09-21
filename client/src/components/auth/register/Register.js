import React, { useState } from 'react'
import './register.scss'
import { connect } from 'react-redux'
import { register } from './../../../redux/actions/auth'

import { Link, Redirect } from 'react-router-dom'

import Loader from '../../layouts/loader/Loader'
import AuthAlert from './../../layouts/alert/AuthAlert'
import ComponentAlert from './../../layouts/alert/ComponentAlert'

const Register = ({ register, auth: { isAuthenticated, loading } }) => {
	let [error, setError] = useState({
		errorStatus: false,
		msg: '',
		alertType: '',
	})
	const { msg, alertType, errorStatus } = error
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	})
	const { name, email, password, password2 } = form

	const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

	const onSubmit = (e) => {
		e.preventDefault()
		if (name.length < 2) {
			setError({
				errorStatus: true,
				msg: 'name is too short',
				alertType: 'warning',
			})
			setTimeout(() => {
				setError({ msg: '', alertType: '', errorStatus: false })
			}, 2500)
		} else if (password.length < 6) {
			setError({
				errorStatus: true,
				msg: 'Password is too short, 6 chars at least expected',
				alertType: 'warning',
			})
			setTimeout(() => {
				setError({ msg: '', alertType: '', errorStatus: false })
			}, 2500)
		} else if (password !== password2) {
			setError({
				errorStatus: true,
				msg: 'Passwords do not match',
				alertType: 'warning',
			})
			setTimeout(() => {
				setError({ msg: '', alertType: '', errorStatus: false })
			}, 2500)
		} else {
			register(form)
			setForm({
				name: '',
				email: '',
				password: '',
				password2: '',
			})
		}
	}

	if (isAuthenticated && !loading) {
		return <Redirect to='/' />
	}

	return (
		<div className='register'>
			<span className='text-lead login__lead'>Api- консолька</span>
			<AuthAlert />
			{errorStatus && <ComponentAlert msg={msg} alertType={alertType} />}
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label className='text-common'>Email</label>
					<input
						type='email'
						className='form-control'
						value={email}
						name='email'
						onChange={onChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label className='text-common'>Name</label>
					<input
						type='text'
						className='form-control'
						value={name}
						name='name'
						onChange={onChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label className='text-common'>Password</label>
					<input
						type='password'
						className='form-control'
						value={password}
						name='password'
						onChange={onChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label className='text-common'>Confirm password</label>
					<input
						type='password'
						className='form-control'
						value={password2}
						name='password2'
						onChange={onChange}
						required
					/>
				</div>
				<small className='form-text mx-right text-right text-grey'>
					Already registered?
				</small>
				<div className='d-flex justify-content-between mt-2'>
					<button type='submit' className='btn btn-success'>
						{!loading ? 'Sign up' : <Loader />}
					</button>
					<Link to='/login' className='btn btn-info mr-2'>
						Log in
					</Link>
				</div>
			</form>
		</div>
	)
}

const mapStateToProps = (state) => ({
	auth: state.auth,
})

export default connect(mapStateToProps, { register })(Register)
