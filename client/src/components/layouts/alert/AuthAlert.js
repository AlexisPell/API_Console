import React from 'react'
import { connect } from 'react-redux'

const AuthAlert = ({ auth: { error } }) =>
	error !== '' && (
		<div className={`alert alert-warning`} role='alert'>
			{error}
		</div>
	)

const mapStateToProps = (state) => ({
	auth: state.auth,
})

export default connect(mapStateToProps)(AuthAlert)
