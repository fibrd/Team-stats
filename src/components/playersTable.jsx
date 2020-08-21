import React from 'react'
import { Link } from 'react-router-dom'

import Done from './reusable/done'
import Table from './reusable/table'
import auth from '../services/authService'

export default function PlayersTable({
	onDelete,
	onSort,
	players,
	sortColumn,
}) {
	const columns = [
		{
			path: 'name',
			label: 'Name',
			content: (player) => (
				<Link to={`/players/${player._id}`}>{player.name}</Link>
			),
		},
		{ path: 'number', label: '#' },
		{ path: 'fineTotal', label: 'Total' },
		{ path: 'finePaid', label: 'Paid' },
		{
			key: 'done',
			content: (player) => (
				<Done done={player.finePaid >= player.fineTotal} />
			),
		},
	]

	const user = auth.getCurrentUser()
	const deleteColumn = {
		key: 'delete',
		content: (player) => (
			<i
				onClick={() => onDelete(player)}
				className="fa fa-trash-o clickable"
			></i>
		),
	}

	if (user && user.isAdmin) {
		columns.push(deleteColumn)
	}

	return (
		<Table
			columns={columns}
			data={players}
			onSort={onSort}
			sortColumn={sortColumn}
		/>
	)
}
