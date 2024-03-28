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
		return await this.db.findOne({
			where: {
				email
			}
		}) ?? undefined
	}

	async create (exame: Exame): Promise<Exame> {
		return await this.db.save(exame)
	}

}