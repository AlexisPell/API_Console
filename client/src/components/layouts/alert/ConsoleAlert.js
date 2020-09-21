import React from 'react'
import { connect } from 'react-redux'

const ConsoleAlert = ({ console: { error } }) =>
	error !== '' && (
		<div className={`alert alert-warning w-100`} role='alert'>
			{error}
		</div>
	)

const mapStateToProps = (state) => ({
	console: state.console,
})

export default connect(mapStateToProps)(ConsoleAlert)
