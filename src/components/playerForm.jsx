import React, { useState, useEffect } from 'react'
import Joi from 'joi-browser'

import Form from './reusable/form'
import { getPlayer, savePlayer } from '../services/playerService'

export default function PlayerForm({ history, match }) {
	const [data, setData] = useState({
		number: '',
		name: '',
		fineTotal: '',
		finePaid: '',
	})

	const [errors, setErrors] = useState({})

	const [inputs] = useState([
		{ name: 'number', label: 'Number' },
		{ name: 'name', label: 'Name' },
		{ name: 'fineTotal', label: 'Total Fines to Pay' },
		{ name: 'finePaid', label: 'Already paid' },
	])

	useEffect(() => {
		loadPlayer()
	}, [])

	const schema = {
		_id: Joi.string(),
		name: Joi.string().min(5).required().label('Name'),
		number: Joi.number().min(1).max(99).required().label('Number'),
		fineTotal: Joi.number().min(0).required().label('Fines in Total'),
		finePaid: Joi.number().min(0).required().label('Fines Paid'),
	}

	const loadPlayer = async () => {
		try {
			const playerId = match.params.id
			if (playerId === 'new') return
			const { data: player } = await getPlayer(playerId)
			setData({
				_id: player._id,
				number: player.number,
				name: player.name,
				fineTotal: player.fineTotal,
				finePaid: player.finePaid,
			})
		} catch (ex) {
			if (ex.response && ex.response.status === 404)
				history.replace('/not-found')
		}
	}

	const handleSubmit = async () => {
		await savePlayer(data)
		history.push('/players')
	}

	return (
		<div>
			<h1>Player #{match.params.id}</h1>
			<Form
				buttonLabel="save"
				data={data}
				errors={errors}
				inputs={inputs}
				schema={schema}
				setData={setData}
				setErrors={setErrors}
				onSubmit={handleSubmit}
			/>
		</div>
	)
}
