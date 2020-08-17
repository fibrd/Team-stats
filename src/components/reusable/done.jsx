import React from 'react'

export default function Done({ done = false, onCheck }) {
	const classes = done ? 'fa fa-check-square-o' : 'fa fa-square-o'

	return (
		<i
			onClick={onCheck}
			style={{ cursor: 'pointer' }}
			className={classes}
			aria-hidden="true"
		></i>
	)
}
