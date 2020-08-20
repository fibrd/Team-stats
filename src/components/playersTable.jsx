import React from 'react'
import { Link } from 'react-router-dom'

import Done from './reusable/done'
import Table from './reusable/table'

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
		{
			key: 'delete',
			content: (player) => (
				<i
					onClick={() => onDelete(player)}
					className="fa fa-trash-o clickable"
				></i>
			),
		},
	]
	return (
		<Table
			columns={columns}
			data={players}
			onSort={onSort}
			sortColumn={sortColumn}
		/>
	)
}
