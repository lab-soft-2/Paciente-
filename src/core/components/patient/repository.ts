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
		return await this.db.query(`
			SELECT * FROM patients WHERE email = $1
		`, [email])
	}

	async create(patient: Patient): Promise<Patient> {
		return await this.db.save(patient)
	}

	async updateScore(patient: Patient, score: number): Promise<Patient> {
		patient.score = score
		console.log(JSON.stringify(patient, null, "  "));
		console.log(JSON.stringify(score, null, "  "));
		console.log(JSON.stringify(patient.score, null, "  "));
		return await this.db.query(`
		UPDATE  patients
		SET score = $2
		WHERE email = $1
	`, [email,score])
		return await this.db.save(patient)
	}

	async updateCondition(patient: Patient, condition: string): Promise<Patient> {
		patient.condition = condition
		console.log(JSON.stringify(patient, null, "  "));
		console.log(JSON.stringify(condition, null, "  "));
		console.log(JSON.stringify(patient.condition, null, "  "));

		return await this.db.query(`
			UPDATE  patients
			SET condition = $2
			WHERE email = $1
		`, [email,condition])
		
		return await this.db.save(patient)
	}

	async deleteByEmail(email: string) {
		return await this.db.delete({ email: email })
	}

}