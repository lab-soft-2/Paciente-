import express from 'express'
import { env } from './config/env'
import {logger} from './config/logger'
import { errorHandler } from "./middleware/errorHandler"
import {PatientRepository} from './core/components/patient/repository'
import {getRepository, MainDataSource} from './config/db/data-source'
import {Patient} from './core/components/patient/entity'
import { exameRouter } from "./core/components/exame/router";
import { acompanhamentoRouter } from "./core/components/acompanhamento/router";
import { consultaRouter } from "./core/components/consulta/router";
import { documentoRouter } from "./core/components/documento/router";
import { patientRouter } from "./core/components/patient/router";
import { relacionamentoRouter } from "./core/components/relacionamentos/router";

const PORT = env.serverPort
const log = logger({ context: 'App' })

async function main() {
	const app = express()
	// Nao funciona com formdata, usar json raw
	app.use(express.json())

	await MainDataSource.initialize()
	log.info('Database connected successfully!')

	app.get(`/${env.appName}/health`, (req, res) => {
		return res.status(200).send()
	})

	app.use(errorHandler);

	app.use("/acompanhamento", acompanhamentoRouter);
	app.use("/consulta", consultaRouter);
	app.use("/documento", documentoRouter);
	app.use("/exame", exameRouter);
	app.use("/patient", patientRouter);
	app.use("/relacionamento", relacionamentoRouter);


	// app.get('/teste', async (req, res) => {
	// 	const repository = new PatientRepository(getRepository(Patient))
	// 	const patient = new Patient('teste1@on.com','senha','teste1')

	// 	repository.create(patient)

	// 	const entity = await repository.findOneByEmail('teste1@on.com')

	// 	return res.status(200).json(entity)

	// })


	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`)
	})
}



main().catch(error => {
	log.error('catch main application')
	log.error(error)
	process.exit(1)
})
