import React from 'react'
import PropTypes from 'prop-types'
import { range } from 'lodash-es'

export default function Pagination({
	itemsCount,
	onPageChange,
	pageSelected,
	perPage,
}) {
	const pagesTotal = Math.ceil(itemsCount / perPage)
	if (pagesTotal === 1) return null
	const pages = range(1, pagesTotal + 1)

	return (
		<nav aria-label="Page navigation example">
			<ul className="pagination">
				{pages.map((p) => (
					<li
						key={p}
						className={
							p === pageSelected
								? 'page-item active'
								: 'page-item'
						}
					>
						<a
							onClick={(e) => {
								e.preventDefault()
								onPageChange(p)
							}}
							className="page-link"
							href="#top"
						>
							{p}
						</a>
					</li>
				))}
			</ul>
		</nav>
	)
}

Pagination.propTypes = {
	itemsCount: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	pageSelected: PropTypes.number.isRequired,
	perPage: PropTypes.number.isRequired,
}
