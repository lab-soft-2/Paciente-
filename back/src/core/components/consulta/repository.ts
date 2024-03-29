import { Repository } from 'typeorm'
import { Consulta } from './entity'

export class ConsultaRepository {
	constructor(private readonly db: Repository<Consulta>) {}

	async findOneById(id: string): Promise<Consulta | undefined> {
		return await this.db.findOne({
			where: {
				id
			}
		}) ?? undefined
	}

	async findOneByEmail (paciente: string): Promise<Consulta | undefined> {
		return await this.db.findOne({
			where: {
				paciente
			}
		}) ?? undefined
	}

	async create (consulta: Consulta): Promise<Consulta> {
		return await this.db.save(consulta)
	}

}