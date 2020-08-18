import React from 'react'

export default function TableBody({ columns, data }) {
	const renderCell = (item, column) => {
		if (column.content) return column.content(item)
		return item[column.path]
	}

	return (
		<tbody>
			{data.map((item) => (
				<tr key={item._id}>
					{columns.map((column) => (
						<td key={column.path || column.key}>
							{renderCell(item, column)}
						</td>
					))}
				</tr>
			))}
		</tbody>
	)
}
