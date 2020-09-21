import React, { useEffect } from 'react'
import './App.scss'
import { Switch, Route } from 'react-router-dom'
import store from './redux/store'
import { keepLogged } from './redux/actions/auth'
import PrivateRoute from './routing/PrivateRoute'

import Login from './components/auth/login/Login'
import Register from './components/auth/register/Register'
import Console from './components/console/Console'

const App = () => {
	useEffect(() => {
		store.dispatch(keepLogged())
	}, [])

	return (
		<div className='app'>
			<Switch>
				<Route exact path='/login' component={Login} />
				<Route exact path='/register' component={Register} />
				<PrivateRoute exact path='/' component={Console} />
			</Switch>
		</div>
	)
}

export default App
