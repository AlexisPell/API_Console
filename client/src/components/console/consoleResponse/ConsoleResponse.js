import React, { useState } from 'react'
import './consoleResponse.scss'
import { connect } from 'react-redux'

const ConsoleResponse = ({ console: { request } }) => {
	const [spread, setSpread] = useState(false)
	let classes = 'response__body'
	if (spread) {
		classes = 'response__spread'
	} else {
		classes = 'response__body'
	}

	let response = JSON.stringify(request)

	return (
		<div className='response'>
			<div className='response__text'>
				<span className='text-grey'>Response:</span>
				<span onClick={() => setSpread(!spread)}>
					{!spread ? (
						<span>Развернуть ответ</span>
					) : (
						<span>Свернуть ответ</span>
					)}
				</span>
			</div>
			<div className={classes}>{response === 'null' ? '' : response}</div>
		</div>
	)
}

const mapStateToProps = (state) => ({
	console: state.console,
})

export default connect(mapStateToProps)(ConsoleResponse)
