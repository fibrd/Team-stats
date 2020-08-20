import React from 'react'

export default function TableHeader({ columns, onSort, sortColumn }) {
	const raiseSort = (path) => {
		const column = { ...sortColumn }
		if (column.path === path)
			column.order = column.order === 'asc' ? 'desc' : 'asc'
		else {
			column.path = path
			column.order = 'asc'
		}

		onSort(column)
	}
	const renderSortIcon = (column) => {
		if (column.path !== sortColumn.path) return null
		if (sortColumn.order === 'asc')
			return <i className="fa fa-sort-asc"></i>
		return <i className="fa fa-sort-desc"></i>
	}

	return (
		<thead>
			<tr>
				{columns.map((column) => (
					<th
						key={column.path || column.key}
						className={column.path && 'clickable'}
						onClick={column.path && (() => raiseSort(column.path))}
					>
						{column.label} {column.path && renderSortIcon(column)}
					</th>
				))}
			</tr>
		</thead>
	)
}
