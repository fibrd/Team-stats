import React, { useState, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import auth from './services/authService'
import LoginForm from './components/loginForm'
import Logout from './components/logout'
import NavBar from './components/navBar'
import NotFound from './components/notFound'
import PlayerForm from './components/playerForm'
import Players from './components/players'
import RegisterForm from './components/registerForm'
import ProtectedRoute from './components/reusable/protectedRoute'

function App() {
	const [user, setUser] = useState()

	useEffect(() => {
		setUser(auth.getCurrentUser())
	}, [])

	return (
		<>
			<NavBar user={user} />
			<main className="container">
				<Switch>
					<Route path="/register" component={RegisterForm} />
					<Route path="/login" component={LoginForm} />
					<Route path="/logout" component={Logout} />
					<ProtectedRoute
						path="/players/:id"
						component={PlayerForm}
					/>
					<Route
						path="/players"
						render={(props) => <Players {...props} user={user} />}
					/>
					<Route path="/not-found" component={NotFound} />
					<Redirect from="/" exact to="/players" />
					<Redirect to="/not-found" />
				</Switch>
			</main>
		</>
	)
}

export default App
