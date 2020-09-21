import React from 'react'
import './consoleHeader.scss'
import { connect } from 'react-redux'
import { logout } from './../../../redux/actions/auth'

const ConsoleHeader = ({ logout, auth: { user } }) => {
	return (
		<div className='header'>
			<div className='text__lead'>Api- консолька</div>
			<div className='header__interface'>
				<div className='header__info'>
					{user && user.email} <span className='text-grey'>:</span>{' '}
					{user && user.name}
				</div>
				<button className='header__btn' onClick={() => logout()}>
					<span>Exit</span>{' '}
					<i className='fas fa-sign-out-alt header__btn-icon'></i>
				</button>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => ({
	auth: state.auth,
})

export default connect(mapStateToProps, { logout })(ConsoleHeader)
