import React from 'react'
import './App.css'

import Navbar from './components/navbar'
import Players from './components/players'

function App() {
	return (
		<>
			<Navbar />
			<main className="container">
				<Players />
			</main>
		</>
	)
}

export default App
