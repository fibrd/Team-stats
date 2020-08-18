import React from 'react'

import Done from './reusable/done'
import Table from './reusable/table'

export default function PlayersTable({
	onCheck,
	onDelete,
	onSort,
	players,
	sortColumn,
}) {
	const columns = [
		{ path: 'firstname', label: 'First Name' },
		{ path: 'lastname', label: 'Last Name' },
		{ path: '_id', label: 'Number' },
		{ path: 'finesTotal', label: 'Fines Total' },
		{ path: 'finesPaid', label: 'Fines Paid' },
		{
			key: 'done',
			content: (player) => (
				<Done
					done={player.finesPaid >= player.finesTotal}
					onCheck={() => onCheck(player)}
				/>
			),
		},
		{
			key: 'delete',
			content: (player) => (
				<button
					onClick={() => onDelete(player)}
					className="btn btn-danger btn-sm"
				>
					Delete
				</button>
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
