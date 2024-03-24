import {DataSource, EntityTarget, ObjectLiteral, Repository} from 'typeorm'
import { env } from '../env'

export const MainDataSource = new DataSource({
	host: process.env.TYPEORM_HOST ?? 'db',
	port: Number(process.env.TYPEORM_PORT ?? '5432'),
	username: process.env.TYPEORM_USERNAME ?? 'postgres',
	password: process.env.TYPEORM_PASSWORD ?? 'postgres',
	database: process.env.TYPEORM_DATABASE ?? 'patient_db',
	entities: [process.env.TYPEORM_ENTITIES ?? 'src/core/components/**/entity.ts'],
	migrations: [process.env.TYPEORM_MIGRATIONS ?? 'src/config/db/migration/**/*.ts'],
	synchronize: false,
	logging: Boolean(process.env.TYPEORM_LOGGING) ?? true,
	type: 'postgres',
	applicationName: env.appName
})

export const getRepository = <T extends ObjectLiteral>(entity: EntityTarget<T>): Repository<T> => {
	return MainDataSource.getRepository(entity)
}
