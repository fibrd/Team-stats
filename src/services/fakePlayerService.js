const players = [
	{
		_id: 1,
		number: 1,
		name: 'Tadeáš Ondrejička',
		finesTotal: 100,
		finesPaid: 0,
	},
	{
		_id: 2,
		number: 2,
		name: 'František Motlík',
		finesTotal: 100,
		finesPaid: 0,
	},
	{
		_id: 3,
		number: 3,
		name: 'David Viduna',
		finesTotal: 100,
		finesPaid: 0,
	},
	{
		_id: 4,
		number: 4,
		name: 'Max Balej',
		finesTotal: 100,
		finesPaid: 0,
	},
	{
		_id: 5,
		number: 5,
		name: 'Václav Prošek',
		finesTotal: 100,
		finesPaid: 0,
	},
	{
		_id: 6,
		number: 6,
		name: 'Michal Kratochvíl',
		finesTotal: 100,
		finesPaid: 0,
	},
	{
		_id: 7,
		number: 7,
		name: 'Tomáš Bureš',
		finesTotal: 100,
		finesPaid: 0,
	},
	{
		_id: 8,
		number: 8,
		name: 'Dominik Jansa',
		finesTotal: 100,
		finesPaid: 0,
	},
	{
		_id: 9,
		number: 9,
		name: 'David Fábry',
		finesTotal: 100,
		finesPaid: 0,
	},
	{
		_id: 10,
		number: 10,
		name: 'Adam Hofman',
		finesTotal: 100,
		finesPaid: 0,
	},
	{
		_id: 11,
		number: 11,
		name: 'Michal Brandl',
		finesTotal: 100,
		finesPaid: 0,
	},
	{
		_id: 12,
		number: 12,
		name: 'Slavomír Katolický',
		finesTotal: 100,
		finesPaid: 0,
	},
	{
		_id: 13,
		number: 13,
		name: 'Radim Linc',
		finesTotal: 100,
		finesPaid: 0,
	},
	{
		_id: 14,
		number: 14,
		name: 'Marek Dědeček',
		finesTotal: 100,
		finesPaid: 0,
	},
	{
		_id: 15,
		number: 15,
		name: 'Dominik Feichtinger',
		finesTotal: 100,
		finesPaid: 0,
	},
	{
		_id: 16,
		number: 16,
		name: 'Martin Hlava',
		finesTotal: 100,
		finesPaid: 0,
	},
	{
		_id: 17,
		number: 17,
		name: 'Petr Študent',
		finesTotal: 100,
		finesPaid: 0,
	},
	{
		_id: 18,
		number: 18,
		name: 'Ondřej Křížka',
		finesTotal: 100,
		finesPaid: 0,
	},
	{
		_id: 19,
		number: 19,
		name: 'Michal Hlaváček',
		finesTotal: 100,
		finesPaid: 0,
	},
	{
		_id: 22,
		number: 22,
		name: 'Lukáš Obrcián',
		finesTotal: 100,
		finesPaid: 0,
	},
]

const getPlayer = (playerId) => {
	return players.find((p) => p._id === parseInt(playerId))
}

const getPlayers = () => {
	return players
}

const savePlayer = (player) => {
	const playerInDb = players.find((p) => p._id === player._id) || {}
	playerInDb.number = player.number
	playerInDb.name = player.name
	playerInDb.finesTotal = player.finesTotal
	playerInDb.finesPaid = player.finesPaid

	if (!playerInDb._id) {
		playerInDb._id = Date.now()
		players.push(playerInDb)
	}

	return playerInDb
}

export { getPlayer, getPlayers, savePlayer }
