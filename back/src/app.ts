import express from 'express'
import { env } from './config/env'
import {Database} from './core/database/database'
import {logger} from './config/logger'

const PORT = env.serverPort
const log = logger({ context: 'App' })

async function main() {
	const app = express()
	const db = Database.getInstance()

	await db.connect()
	log.info('Database connected successfully!')

	app.get(`/${env.appName}/health`, (req, res) => {
		return res.status(200).send()
	})

	app.get('/', (req, res) => {
		res.send('Hello World!')
	})

	app.get('/home', (req, res) => {
		res.send('Hello World!2')
	})


	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`)
	})
}



main().catch(error => {
	log.error('catch main application')
	log.error(error)
	process.exit(1)
})
