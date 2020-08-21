import React, { useState } from 'react'
import Joi from 'joi-browser'

import Form from './reusable/form'
import * as userService from '../services/userService'
import auth from '../services/authService'

export default function RegisterForm() {
	const [data, setData] = useState({
		email: '',
		password: '',
		name: '',
	})

	const [errors, setErrors] = useState({})

	const [inputs] = useState([
		{
			name: 'email',
			label: 'E-mail',
			otherProps: { autoFocus: true },
		},
		{ name: 'password', label: 'Password', type: 'password' },
		{ name: 'name', label: 'Name' },
	])

	const schema = {
		email: Joi.string().email().required().label('E-mail'),
		password: Joi.string().min(5).required().label('Password'),
		name: Joi.string().required().label('Name'),
	}

	const handleSubmit = async () => {
		try {
			const response = await userService.register(data)
			auth.loginWithJwt(response.headers['x-auth-token'])
			window.location = '/'
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const newErrors = { ...errors }
				newErrors.email = ex.response.data
				setErrors(newErrors)
			}
		}
	}

	return (
		<div>
			<h1 className="mb-4">Register</h1>
			<Form
				buttonLabel="register"
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
