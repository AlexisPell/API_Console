import React, { useState } from 'react'

const ComponentAlert = ({ msg, alertType }) => {
	const [showAlert, setShowAlert] = useState(true)

	if (showAlert) {
		setTimeout(() => {
			setShowAlert(false)
		}, 2500)
	}

	return (
		<>
			{showAlert && (
				<div className={`alert alert-${alertType} w-100`} role='alert'>
					{msg}
				</div>
			)}
		</>
	)
}

export default ComponentAlert
