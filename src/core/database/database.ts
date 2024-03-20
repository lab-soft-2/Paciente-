import pg from 'pg'
import {env} from '../../config/env'
import {logger} from '../../config/logger'

const log = logger({ context: 'DatabaseConnector' })
export class Database {
	private static instance: Database | undefined
	private connectionPool: pg.Pool | undefined
	private constructor(private readonly config: pg.PoolConfig) {}

	static getInstance(): Database {
		if(!this.instance) {
			this.instance = new Database({ connectionString: env.database})
		}

		return this.instance
	}

	async connect(): Promise<pg.PoolClient> {
		try {
			this.connectionPool = (new pg.Pool(this.config))
			const conn = await this.connectionPool.connect()
			log.info('Database connected!')
			return conn
		} catch (err: any) {
			log.error(`Error connecting to database. Reason: ${err.message}`)
			throw err
		}
	}

	async disconnect(): Promise<void> {
		try {
			await this.connectionPool?.end()
			log.info('Database has been disconnected!')
		} catch (err: any) {
			log.error('Error disconnecting to database. Reason:', { err })
			throw err
		}
	}
	async client(): Promise<pg.PoolClient> {
		try {
			return await this.connect()
		} catch (err: any) {
			log.error(`Error getting client. Reason: ${err.message}`)
			throw err
		}
	}
}
