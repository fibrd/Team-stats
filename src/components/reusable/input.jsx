import React from 'react'

export default function Input({ error, name, label, ...otherProps }) {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<input
				className="form-control"
				id={name}
				name={name}
				{...otherProps}
			/>
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	)
}
