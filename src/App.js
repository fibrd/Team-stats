import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import LoginForm from './components/loginForm'
import NavBar from './components/navBar'
import NotFound from './components/notFound'
import PlayerForm from './components/playerForm'
import Players from './components/players'
import RegisterForm from './components/registerForm'

function App() {
	return (
		<>
			<NavBar />
			<main className="container">
				<Switch>
					<Route path="/register" component={RegisterForm} />
					<Route path="/login" component={LoginForm} />
					<Route path="/players/:id" component={PlayerForm} />
					<Route path="/players" component={Players} />
					<Route path="/not-found" component={NotFound} />
					<Redirect from="/" exact to="/players" />
					<Redirect to="/not-found" />
				</Switch>
			</main>
		</>
	)
}

export default App
