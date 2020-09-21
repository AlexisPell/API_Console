import React, { useState, useEffect } from 'react'
import './consoleRequest.scss'
import { connect } from 'react-redux'
import { sendRequest, setCurrent } from './../../../redux/actions/console'

import ConsoleAlert from './../../layouts/alert/ConsoleAlert'
import ComponentAlert from './../../layouts/alert/ComponentAlert'

const ConsoleRequest = ({ sendRequest, setCurrent, console: { current } }) => {
	const [error, setError] = useState({
		errorStatus: false,
		msg: '',
		alertType: '',
	})
	const { errorStatus, msg, alertType } = error

	const [request, setRequest] = useState({
		method: 'get',
		url: '',
		headers: '',
		data: '',
	})
	let { method, url, headers, data } = request

	useEffect(() => {
		if (current) {
			setRequest({
				method: !current.method ? 'get' : current.method,
				url: !current.url ? '' : current.url,
				headers: !current.headers ? '' : current.headers,
				data: !current.data ? '' : current.data,
			})
		}
	}, [current])

	const onChange = (e) =>
		setRequest({ ...request, [e.target.name]: e.target.value })

	const onSubmit = (e) => {
		e.preventDefault()
		if (url === '') {
			setError({ errorStatus: true, msg: 'URL is empty', alertType: 'warning' })
			setTimeout(() => {
				setError({ errorStatus: false, msg: '', alertType: '' })
			}, 2500)
		} else {
			let newRequest = { method, url }
			if (headers !== '')
				newRequest.headers = JSON.parse(JSON.stringify(headers))
			if (data !== '') newRequest.data = JSON.parse(JSON.stringify(data))
			sendRequest(newRequest)
		}
	}

	return (
		<form className='request' onSubmit={onSubmit}>
			<span className='request__text text-grey'>Request:</span>
			<ConsoleAlert />
			{errorStatus && <ComponentAlert msg={msg} alertType={alertType} />}
			<div className='request__params'>
				<div className='request__params-buttons'>
					<button
						className='btn btn-sm btn-primary'
						type='button'
						onClick={() => setRequest({ ...request, method: 'get' })}
					>
						get
					</button>
					<button
						className='btn btn-sm btn-info'
						type='button'
						onClick={() => setRequest({ ...request, method: 'post' })}
					>
						post
					</button>
					<button
						className='btn btn-sm btn-warning'
						type='button'
						onClick={() => setRequest({ ...request, method: 'put' })}
					>
						put
					</button>
					<button
						className='btn btn-sm btn-danger'
						type='button'
						onClick={() => setRequest({ ...request, method: 'delete' })}
					>
						delete
					</button>
				</div>
				<div className='request__params-req-type text-common'>
					<span className='text-grey'>request type:</span>{' '}
					<span>{method.toLocaleUpperCase()}</span>
				</div>
			</div>
			<input
				type='text'
				className='request__params-input form-control'
				placeholder='Type URL for querying'
				name='url'
				value={url}
				onChange={onChange}
			/>
			<span className='request__text text-grey'>Request Headers:</span>
			<textarea
				type='text'
				placeholder='Example: {"Header-name": "Header-info"}, Dont use single quotes, please! :)'
				className='form-control request__headers'
				cols='30'
				rows='11'
				name='headers'
				value={headers}
				onChange={onChange}
			/>
			{method === 'get' ? (
				<span className='request__text text-grey'>
					Request body not available for GET method
				</span>
			) : (
				<>
					<span className='request__text text-grey'>Request Body:</span>
					<textarea
						type='text'
						placeholder='Example: {"Body-name": "Body-info"}, Dont use single quotes, please! :)'
						className='form-control request__body'
						cols='30'
						rows='11'
						name='data'
						value={data}
						onChange={onChange}
					/>
				</>
			)}

			<button className='btn btn-sm btn-success mt-2'>Send req</button>
		</form>
	)
}

const mapStateToProps = (state) => ({
	console: state.console,
})

export default connect(mapStateToProps, { sendRequest, setCurrent })(
	ConsoleRequest
)
