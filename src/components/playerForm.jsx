import React, { useState, useEffect } from 'react'
import Joi from 'joi-browser'

import Form from './reusable/form'
import { getPlayer, savePlayer } from '../services/fakePlayerService'

export default function PlayerForm({ history, match }) {
	const [data, setData] = useState({
		number: '',
		name: '',
		finesTotal: '',
		finesPaid: '',
	})
	const [inputs] = useState([
		{ name: 'number', label: 'Number' },
		{ name: 'name', label: 'Name' },
		{ name: 'finesTotal', label: 'Total Fines to Pay' },
		{ name: 'finesPaid', label: 'Already paid' },
	])

	useEffect(() => {
		const playerId = match.params.id
		if (playerId === 'new') return

		const player = getPlayer(playerId)
		if (!player) return history.replace('/not-found')

		setData({
			_id: player._id,
			number: player.number,
			name: player.name,
			finesTotal: player.finesTotal,
			finesPaid: player.finesPaid,
		})
	}, [match.params.id, history])

	const schema = {
		_id: Joi.number(),
		name: Joi.string().required().label('Name'),
		number: Joi.number().min(1).max(99).required().label('Number'),
		finesTotal: Joi.number().min(0).required().label('Fines in Total'),
		finesPaid: Joi.number().min(0).required().label('Fines Paid'),
	}

	const handleSubmit = () => {
		history.push('/players')
		savePlayer(data)
	}

	return (
		<div>
			<h1>Player #{match.params.id}</h1>
			<Form
				buttonLabel="save"
				data={data}
				inputs={inputs}
				schema={schema}
				setData={setData}
				onSubmit={handleSubmit}
			/>
		</div>
	)
}
