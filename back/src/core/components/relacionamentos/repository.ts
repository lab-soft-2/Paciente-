import { Repository } from 'typeorm'
import { Relacionamento } from './entity'

export class RelacionamentoRepository {
	constructor(private readonly db: Repository<Relacionamento>) {}

	async findOneById(id: string): Promise<Relacionamento | undefined> {
		return await this.db.findOne({
			where: {
				id
			}
		}) ?? undefined
	}

	async findOneByEmail (email: string): Promise<Relacionamento | undefined> {
		return await this.db.findOne({
			where: {
				email
			}
		}) ?? undefined
	}

	async create (relacionamento: Relacionamento): Promise<Relacionamento> {
		return await this.db.save(relacionamento)
	}

}