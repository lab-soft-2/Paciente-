import express from 'express'
import { env } from './config/env'
import {logger} from './config/logger'
import {PatientRepository} from './core/components/patient/repository'
import {getRepository, MainDataSource} from './config/db/data-source'
import {Patient} from './core/components/patient/entity'

const PORT = env.serverPort
const log = logger({ context: 'App' })

async function main() {
	const app = express()

	await MainDataSource.initialize()
	log.info('Database connected successfully!')

	app.get(`/${env.appName}/health`, (req, res) => {
		return res.status(200).send()
	})

	app.get('/', (req, res) => {
		res.send('Hello World!')
	})

	app.get('/teste', async (req, res) => {
		const repository = new PatientRepository(getRepository(Patient))

		const entity = await repository.findOneByEmail('email@example.com')

		return res.status(200).json(entity)

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
