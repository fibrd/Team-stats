import React from 'react'

export default function Done({ done = false }) {
	const classes = done ? 'fa fa-check-square-o' : 'fa fa-square-o'

	return <i className={classes} aria-hidden="true"></i>
}
