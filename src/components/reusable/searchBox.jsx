import React from 'react'

export default function SearchBox({ onChange, value }) {
	return (
		<input
			className="form-control mb-3"
			placeholder="Search..."
			name="query"
			type="search"
			value={value}
			onChange={onChange}
		/>
	)
}
