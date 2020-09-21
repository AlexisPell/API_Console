import React from 'react'
import './loader.scss'

const Loader = () => (
	<div className='loader-wrapper'>
		<div className='lds-ring'>
			<div />
			<div />
			<div />
			<div />
		</div>
	</div>
)

export default Loader
