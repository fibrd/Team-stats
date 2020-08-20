import React, { useState } from 'react'
import Joi from 'joi-browser'
import { capitalize } from 'lodash-es'

import Input from './input'

export default function Form({
	buttonLabel,
	data,
	inputs,
	setData,
	schema,
	onSubmit,
}) {
	const [errors, setErrors] = useState({})

	const validateInput = ({ name, value }) => {
		const obj = { [name]: value }
		const inputSchema = { [name]: schema[name] }
		const { error } = Joi.validate(obj, inputSchema)
		return error ? error.details[0].message : null
	}

	const validate = () => {
		const { error } = Joi.validate(data, schema, { abortEarly: false })
		if (!error) return null

		const newErrors = {}
		for (let item of error.details) newErrors[item.path[0]] = item.message

		return newErrors
	}

	const handleChange = ({ currentTarget: input }) => {
		const newErrors = { ...errors }
		const errorMessage = validateInput(input)
		if (errorMessage) newErrors[input.name] = errorMessage
		else delete newErrors[input.name]

		setErrors(newErrors)
		setData({
			...data,
			[input.name]: input.value,
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		const newErrors = validate()
		setErrors(newErrors || {})
		if (newErrors) return

		onSubmit()
	}

	const renderButton = () => {
		return (
			<button disabled={validate()} className="btn btn-primary">
				{capitalize(buttonLabel)}
			</button>
		)
	}

	const renderInputs = () => {
		return inputs.map((input) => (
			<Input
				key={input.name}
				error={errors[input.name]}
				name={input.name}
				type={input.type || 'text'}
				value={data[input.name]}
				label={input.label}
				onChange={handleChange}
				{...input.otherProps}
			/>
		))
	}

	return (
		<form onSubmit={handleSubmit}>
			{renderInputs()}
			{renderButton()}
		</form>
	)
}
