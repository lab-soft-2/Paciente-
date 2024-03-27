import { Repository } from 'typeorm'
import { Patient } from './entity'

export class PatientRepository {
	constructor(private readonly db: Repository<Patient>) { }

	async findAll(): Promise<Patient[] | undefined> {
		return await this.db.find()
	}

	async findOneById(id: string): Promise<Patient | undefined> {
		return await this.db.findOne({
			where: {
				id
			}
		}) ?? undefined
	}

	async findOneByEmail(email: string): Promise<Patient | undefined> {
		// return await this.db.query(`
		// 	SELECT * FROM patients WHERE email = $1
		// `, [email])
		return await this.db.findOne({
			where: {
				email
			}
		}) ?? undefined
	}

	async create(patient: Patient): Promise<Patient> {
		return await this.db.save(patient)
	}

	async update(patient: Patient): Promise<Patient> {
		return await this.db.save(patient)
	}

	async updateScore(patient: Patient, score: number): Promise<Patient> {
		// patient.score = score
		console.log(JSON.stringify(patient, null, "  "));
		console.log(JSON.stringify(score, null, "  "));
		console.log(JSON.stringify(patient.score, null, "  "));
		return await this.db.save(patient)
	// 	return await this.db.query(`
	// 	UPDATE  patients
	// 	SET score = $1
	// 	WHERE email = $2;
	// `, [score, email])
	}

	async updateCondition(patient: Patient,condition:string): Promise<Patient> {
		patient.condition = condition
		console.log(JSON.stringify(patient, null, "  "));
		console.log(JSON.stringify(condition, null, "  "));
		console.log(JSON.stringify(patient.condition, null, "  "));
		return await this.db.save(patient)

		// return await this.db.query(`
		// 	UPDATE  patients
		// 	SET condition = $1
		// 	WHERE email = $2;
		// `, [condition, email])

	}

	async deleteByEmail(email: string) {
		return await this.db.delete({ email: email })
	}

}