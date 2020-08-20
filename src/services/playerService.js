import http from './httpService'
import { apiUrl } from '../config.json'

const apiEndpoint = `${apiUrl}/players`

const getPlayer = (playerId) => {
	return http.get(`${apiEndpoint}/${playerId}`)
}

const getPlayers = () => {
	return http.get(apiEndpoint)
}

const deletePlayer = (playerId) => {
	return http.delete(`${apiEndpoint}/${playerId}`)
}

const savePlayer = (player) => {
	if (player._id) {
		const body = { ...player }
		delete body._id
		return http.put(`${apiEndpoint}/${player._id}`, body)
	}

	return http.post(apiEndpoint, player)
}

export { deletePlayer, getPlayer, getPlayers, savePlayer }
