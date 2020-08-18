import React, { useState, useEffect } from 'react'
import { orderBy } from 'lodash-es'

import getPlayers from '../services/fakePlayerService'
import getSections from '../services/fakeSectionService'
import { paginate } from '../utilities/paginate'
import Pagination from './reusable/pagination'
import ListGroup from './reusable/listGroup'
import PlayersTable from './playersTable'

export default function Players() {
	const [allPlayers, setAllPlayers] = useState([])
	const [sectionSelected, setSectionSelected] = useState(null)
	const [pageSelected, setPageSelected] = useState(1)
	const [perPage] = useState(10)
	const [sections, setSections] = useState()
	const [sortColumn, setSortColumn] = useState({
		path: 'firstname',
		order: 'asc',
	})

	useEffect(() => {
		setAllPlayers(getPlayers())
		setSections(getSections())
	}, [])

	const handleCheck = (player) => {
		const newPlayers = allPlayers.map((p) =>
			p._id !== player._id ? p : { ...p, finesPaid: p.finesTotal }
		)
		setAllPlayers(newPlayers)
	}

	const handleDelete = (player) => {
		const newPlayers = allPlayers.filter((p) => p._id !== player._id)
		setAllPlayers(newPlayers)
	}

	const handleSelect = (section) => {
		setPageSelected(1)
		setSectionSelected(section)
	}

	const handleSort = (column) => {
		setSortColumn(column)
	}

	const handlePageChange = (page) => {
		setPageSelected(page)
	}

	const getData = () => {
		const filtered =
			sectionSelected && sectionSelected.id === 1
				? allPlayers.filter((p) => p.finesPaid >= p.finesTotal)
				: sectionSelected && sectionSelected.id === 2
				? allPlayers.filter((p) => p.finesPaid < p.finesTotal)
				: allPlayers

		const sorted = orderBy(filtered, [sortColumn.path], [sortColumn.order])
		const players = paginate(sorted, pageSelected, perPage)

		return { itemsCount: filtered.length, data: players }
	}

	if (allPlayers.length === 0)
		return <p>There are no players in the database.</p>

	const { itemsCount, data: players } = getData()

	return (
		<div className="row">
			<div className="col-md-2">
				<ListGroup
					items={sections}
					itemSelected={sectionSelected}
					onSelect={handleSelect}
				/>
			</div>
			<div className="col-md">
				<p>Showing {players.length} players in the database.</p>
				<PlayersTable
					onCheck={handleCheck}
					onDelete={handleDelete}
					onSort={handleSort}
					players={players}
					sortColumn={sortColumn}
				/>
				<Pagination
					itemsCount={itemsCount}
					onPageChange={handlePageChange}
					pageSelected={pageSelected}
					perPage={perPage}
				/>
			</div>
		</div>
	)
}
