import { Repository } from 'typeorm'
import { Acompanhamento } from './entity'

export class AcompanhamentoRepository {
	constructor(private readonly db: Repository<Acompanhamento>) {}

	async findOneById(id: string): Promise<Acompanhamento | undefined> {
		return await this.db.findOne({
			where: {
				id
			}
		}) ?? undefined
	}

	async findOneByEmail (email: string): Promise<Acompanhamento | undefined> {
		return await this.db.query(`
			SELECT * FROM acompanhamentos WHERE email = $1
		`, [email])
	}

	async create (acompanhamento: Acompanhamento): Promise<Acompanhamento> {
		return await this.db.save(acompanhamento)
	}

}