import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Joi from 'joi-browser'

import Form from './reusable/form'
import auth from '../services/authService'

export default function LoginForm({ location }) {
	const [data, setData] = useState({
		email: '',
		password: '',
	})

	const [errors, setErrors] = useState({})

	const [inputs] = useState([
		{
			name: 'email',
			label: 'E-mail',
			otherProps: { autoFocus: true },
		},
		{ name: 'password', label: 'Password', type: 'password' },
	])

	const schema = {
		email: Joi.string().required().label('E-mail'),
		password: Joi.string().required().label('Password'),
	}

	const handleSubmit = async () => {
		try {
			await auth.login(data.email, data.password)

			window.location = location.state
				? location.state.from.pathname
				: '/'
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const newErrors = { ...errors }
				newErrors.email = ex.response.data
				setErrors(newErrors)
			}
		}
	}

	if (auth.getCurrentUser()) return <Redirect to="/" />

	return (
		<div>
			<h1 className="mb-4">Login</h1>
			<Form
				buttonLabel="login"
				data={data}
				errors={errors}
				inputs={inputs}
				setData={setData}
				setErrors={setErrors}
				schema={schema}
				onSubmit={handleSubmit}
			/>
		</div>
	)
}
