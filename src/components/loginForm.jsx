import React, { useState } from 'react'
import Joi from 'joi-browser'

import Form from './reusable/form'

export default function LoginForm() {
	const [data, setData] = useState({
		username: '',
		password: '',
	})

	const [inputs] = useState([
		{
			name: 'username',
			label: 'Username',
			otherProps: { autoFocus: true },
		},
		{ name: 'password', label: 'Password', type: 'password' },
	])

	const schema = {
		username: Joi.string().required().label('Username'),
		password: Joi.string().required().label('Password'),
	}

	const handleSubmit = () => {
		// Calling the server
		console.log('Submitted')
	}

	return (
		<div>
			<h1 className="mb-4">Login</h1>
			<Form
				buttonLabel="login"
				data={data}
				inputs={inputs}
				setData={setData}
				schema={schema}
				onSubmit={handleSubmit}
			/>
		</div>
	)
}
