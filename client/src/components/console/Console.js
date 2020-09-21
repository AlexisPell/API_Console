import React from 'react'
import './console.scss'

import ConsoleHeader from './consoleHeader/ConsoleHeader'
import ConsoleHistory from './consoleHistory/ConsoleHistory'
import ConsoleRequest from './consoleRequest/ConsoleRequest'
import ConsoleResponse from './consoleResponse/ConsoleResponse'

const Console = () => {
	return (
		<div className='console'>
			<ConsoleHeader />
			<ConsoleHistory />
			<div className='console__container'>
				<ConsoleRequest />
				<ConsoleResponse />
			</div>
		</div>
	)
}

export default Console
