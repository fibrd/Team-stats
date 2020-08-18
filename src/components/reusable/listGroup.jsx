import React from 'react'

export default function ListGroup({
	items,
	itemSelected,
	onSelect,
	textProperty = 'label',
	valueProperty = 'id',
}) {
	return (
		<ul className="list-group clickable">
			{items.map((item) => (
				<li
					key={item[valueProperty]}
					onClick={() => onSelect(item)}
					className={
						itemSelected && itemSelected === item
							? 'list-group-item active'
							: 'list-group-item'
					}
				>
					{item[textProperty]}
				</li>
			))}
		</ul>
	)
}
