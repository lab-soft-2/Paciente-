import {Database} from './database/database'

export class PatientRepository {
	constructor(private readonly db: Database) {}
}
