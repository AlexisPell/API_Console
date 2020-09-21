import React, { useState } from 'react'
import './login.scss'
import { connect } from 'react-redux'
import { login } from './../../../redux/actions/auth'

import { Link, Redirect } from 'react-router-dom'

import Loader from '../../layouts/loader/Loader'
import AuthAlert from './../../layouts/alert/AuthAlert'
import ComponentAlert from './../../layouts/alert/ComponentAlert'

const Login = ({ login, auth: { isAuthenticated, loading } }) => {
	const [error, setError] = useState(false)
	const [form, setForm] = useState({
		email: '',
		password: '',
	})
	const { email, password } = form

	const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

	const onSubmit = (e) => {
		e.preventDefault()
		if (password.length < 6) {
			setError(true)
			setTimeout(() => {
				setError(false)
			}, 2500)
		} else {
			login(form)
			setForm({
				email: '',
				password: '',
			})
		}
	}

	if (isAuthenticated && !loading) {
		return <Redirect to='/' />
	}

	return (
		<div className='login'>
			<span className='text-lead login__lead'>Api- консолька</span>
			<AuthAlert />
			{error && (
				<ComponentAlert msg='Password is less than 6 chars' alertType='info' />
			)}
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
				<small className='form-text mx-right text-right text-grey'>
					Not registered yet?
				</small>
				<div className='d-flex justify-content-between mt-2'>
					<button type='submit' className='btn btn-success'>
						{loading ? <Loader /> : 'Log in'}
					</button>
					<Link to='/register' className='btn btn-info mr-2'>
						Sign up
					</Link>
				</div>
			</form>
		</div>
	)
}

const mapStateToProps = (state) => ({
	auth: state.auth,
})

export default connect(mapStateToProps, { login })(Login)
