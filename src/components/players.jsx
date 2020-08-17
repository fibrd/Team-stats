import React, { useState } from 'react'

import Done from './reusable/done'
import getPlayers from '../services/fakePlayerService'
import { paginate } from '../utilities/paginate'
import Pagination from './reusable/pagination'

export default function Players() {
	const [allPlayers, setAllPlayers] = useState(getPlayers())
	const [perPage] = useState(10)
	const [pageSelected, setPageSelected] = useState(1)

	const handleCheck = (player) => {
		console.log('checking', player)
		const newPlayers = allPlayers.map((p) =>
			p._id !== player._id ? p : { ...p, finesPaid: p.finesTotal }
		)
		setAllPlayers(newPlayers)
	}

	const handleDelete = (player) => {
		const newPlayers = allPlayers.filter((p) => p._id !== player._id)
		setAllPlayers(newPlayers)
	}

	const handlePageChange = (page) => {
		setPageSelected(page)
	}

	if (allPlayers.length === 0)
		return <p>There are no players in the database.</p>

	const players = paginate(allPlayers, pageSelected, perPage)

	return (
		<>
			<p>Showing {players.length} players in the database.</p>
			<table className="table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Fine Total</th>
						<th>Fine Paid</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{players.map((player) => (
						<tr key={player._id}>
							<td>{player.firstname + ' ' + player.lastname}</td>
							<td>{player.finesTotal}</td>
							<td>{player.finesPaid}</td>
							<td>
								<Done
									done={player.finesPaid >= player.finesTotal}
									onCheck={() => handleCheck(player)}
								/>
							</td>
							<td>
								<button
									onClick={() => handleDelete(player)}
									className="btn btn-danger btn-sm"
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<Pagination
				itemsCount={allPlayers.length}
				onPageChange={handlePageChange}
				pageSelected={pageSelected}
				perPage={perPage}
			/>
		</>
	)
}
