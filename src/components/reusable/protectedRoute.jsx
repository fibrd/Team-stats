import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from '../../services/authService'

export default function ProtectedRoute({
	component: Component,
	path,
	...otherProps
}) {
	return (
		<Route
			path={path}
			render={(props) => {
				if (!auth.getCurrentUser())
					return (
						<Redirect
							to={{
								pathname: '/login',
								state: { from: props.location },
							}}
						/>
					)
				return <Component {...props} />
			}}
			{...otherProps}
		/>
	)
}
