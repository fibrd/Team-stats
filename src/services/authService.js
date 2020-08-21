import jwtDecode from 'jwt-decode'
import http from './httpService'
import { apiUrl } from '../config.json'

const apiEndpoint = `${apiUrl}/auth`
const tokenKey = 'token'

export const getJwt = () => {
	try {
		return localStorage.getItem(tokenKey)
	} catch (error) {
		return null
	}
}

http.setJwt(getJwt())

export const login = async (email, password) => {
	const { data: jwt } = await http.post(apiEndpoint, {
		email,
		password,
	})
	localStorage.setItem(tokenKey, jwt)
}

export const logout = () => {
	localStorage.removeItem(tokenKey)
}

export const loginWithJwt = async (jwt) => {
	localStorage.setItem(tokenKey, jwt)
}

export const getCurrentUser = () => {
	try {
		const jwt = localStorage.getItem(tokenKey)
		return jwtDecode(jwt)
	} catch (ex) {
		return null
	}
}

export default {
	getCurrentUser,
	getJwt,
	login,
	loginWithJwt,
	logout,
}
