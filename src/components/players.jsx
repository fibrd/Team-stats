import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { orderBy } from 'lodash-es'

import { getPlayers, deletePlayer } from '../services/playerService'
import getSections from '../services/sectionService'
import { paginate } from '../utilities/paginate'
import Pagination from './reusable/pagination'
import ListGroup from './reusable/listGroup'
import PlayersTable from './playersTable'
import SearchBox from './reusable/searchBox'

export default function Players({ user }) {
	const [allPlayers, setAllPlayers] = useState([])
	const [sectionSelected, setSectionSelected] = useState(null)
	const [pageSelected, setPageSelected] = useState(1)
	const [perPage] = useState(10)
	const [searchQuery, setSearchQuery] = useState('')
	const [sections, setSections] = useState()
	const [sortColumn, setSortColumn] = useState({})

	useEffect(() => {
		loadPlayers()
		setSections(getSections())
	}, [])

	const loadPlayers = async () => {
		const { data: players } = await getPlayers()
		setAllPlayers(players)
	}

	const handleDelete = async (player) => {
		const originalPlayers = allPlayers
		setAllPlayers(allPlayers.filter((p) => p._id !== player._id))

		try {
			await deletePlayer(player._id)
		} catch (ex) {
			if (ex.response && ex.response.status === 404)
				alert('This movie has already been deleted.')
			setAllPlayers(originalPlayers)
		}
	}

	const handleSearch = ({ currentTarget: input }) => {
		setSearchQuery(input.value)
		setPageSelected(1)
		setSectionSelected(null)
	}

	const handleSelect = (section) => {
		setPageSelected(1)
		setSectionSelected(section)
		setSearchQuery('')
	}

	const handleSort = (column) => {
		setSortColumn(column)
	}

	const handlePageChange = (page) => {
		setPageSelected(page)
	}

	const getData = () => {
		let filtered = allPlayers

		if (searchQuery)
			filtered = allPlayers.filter((p) =>
				p.name.toLowerCase().includes(searchQuery.toLowerCase())
			)
		else if (sectionSelected && sectionSelected.id === 1)
			filtered = allPlayers.filter((p) => p.finePaid >= p.fineTotal)
		else if (sectionSelected && sectionSelected.id === 2)
			filtered = allPlayers.filter((p) => p.finePaid < p.fineTotal)

		const sorted = orderBy(filtered, [sortColumn.path], [sortColumn.order])
		const players = paginate(sorted, pageSelected, perPage)

		return { itemsCount: filtered.length, data: players }
	}

	if (allPlayers.length === 0)
		return <p>There are no players in the database.</p>

	const { itemsCount, data: players } = getData()

	return (
		<div className="row">
			<div className="col-md-2 mb-3">
				<ListGroup
					items={sections}
					itemSelected={sectionSelected}
					onSelect={handleSelect}
				/>
			</div>
			<div className="col-md">
				{user && (
					<Link to="/players/new" className="btn btn-secondary mb-3">
						New Player
					</Link>
				)}
				<SearchBox value={searchQuery} onChange={handleSearch} />
				<p>Showing {players.length} players in the database.</p>
				<div className="table-container">
					<PlayersTable
						onDelete={handleDelete}
						onSort={handleSort}
						players={players}
						sortColumn={sortColumn}
					/>
				</div>
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
