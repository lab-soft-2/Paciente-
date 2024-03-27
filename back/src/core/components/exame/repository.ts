import { Repository } from 'typeorm'
import { Exame } from './entity'

export class ExameRepository {
	constructor(private readonly db: Repository<Exame>) {}

	async findOneById(id: string): Promise<Exame | undefined> {
		return await this.db.findOne({
			where: {
				id
			}
		}) ?? undefined
	}

	async findOneByEmail (email: string): Promise<Exame | undefined> {
		return await this.db.query(`
			SELECT * FROM exames WHERE email = $1
		`, [email])
	}

	async create (exame: Exame): Promise<Exame> {
		return await this.db.save(exame)
	}

}