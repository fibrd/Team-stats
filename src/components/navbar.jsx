import React from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function NavBar({ user }) {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<Link className="navbar-brand" to="/">
				Sokolici
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNav">
				<div className="navbar-nav">
					<NavLink className="nav-item nav-link" to="/players">
						Players
					</NavLink>
					{!user && (
						<>
							<NavLink className="nav-item nav-link" to="/login">
								Login
							</NavLink>
							<NavLink
								className="nav-item nav-link"
								to="/register"
							>
								Register
							</NavLink>
						</>
					)}
					{user && (
						<>
							<NavLink
								className="nav-item nav-link"
								to="/profile"
							>
								{user.name}
							</NavLink>
							<NavLink className="nav-item nav-link" to="/logout">
								Logout
							</NavLink>
						</>
					)}
				</div>
			</div>
		</nav>
	)
}
