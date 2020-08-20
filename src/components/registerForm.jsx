import React, { useState } from 'react'
import Joi from 'joi-browser'

import Form from './reusable/form'

export default function RegisterForm() {
	const [data, setData] = useState({
		username: '',
		password: '',
		name: '',
	})

	const [inputs] = useState([
		{
			name: 'username',
			label: 'Username',
			otherProps: { autoFocus: true },
		},
		{ name: 'password', label: 'Password', type: 'password' },
		{ name: 'name', label: 'Name' },
	])

	const schema = {
		username: Joi.string().email().required().label('Username'),
		password: Joi.string().min(5).required().label('Password'),
		name: Joi.string().required().label('Name'),
	}

	const handleSubmit = () => {
		// Calling the server
		console.log('Registered')
	}

	return (
		<div>
			<h1 className="mb-4">Register</h1>
			<Form
				buttonLabel="register"
				data={data}
				inputs={inputs}
				setData={setData}
				schema={schema}
				onSubmit={handleSubmit}
			/>
		</div>
	)
}
