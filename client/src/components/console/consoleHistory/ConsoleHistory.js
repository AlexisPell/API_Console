import React, { useEffect, useState } from 'react'
import './consoleHistory.scss'
import { connect } from 'react-redux'
import { clearLocalStorage, setCurrent } from './../../../redux/actions/console'

const ConsoleHistory = ({
	clearLocalStorage,
	setCurrent,
	console: { requests },
}) => {
	let [store, setStore] = useState(requests)

	useEffect(() => {
		setStore(requests)
	}, [requests, clearLocalStorage])

	return (
		<div className='history'>
			{!store && <span>No requests done yet</span>}
			{store &&
				store.length &&
				store.map((req, id) => (
					<div className='history__link' key={id}>
						<div className={`history__icon bg-${req.method}`}></div>
						<span className='text-grey'>{req.url}</span>
						<div
							className='history__link-info'
							onClick={() => {
								setCurrent(req)
							}}
						>
							<div></div>
							<div></div>
							<div></div>
						</div>
					</div>
				))}
			<div
				className='btn btn-sm history__close-btn'
				onClick={() => clearLocalStorage()}
			>
				<i className='fas fa-times'></i>
			</div>
		</div>
	)
}
const mapStateToProps = (state) => ({
	console: state.console,
})

export default connect(mapStateToProps, { clearLocalStorage, setCurrent })(
	ConsoleHistory
)
