import { Repository } from 'typeorm'
import { Documento } from './entity'

export class DocumentoRepository {
	constructor(private readonly db: Repository<Documento>) {}

	async findOneById(id: string): Promise<Documento | undefined> {
		return await this.db.findOne({
			where: {
				id
			}
		}) ?? undefined
	}

	async findOneByEmail (email: string): Promise<Documento | undefined> {
		return await this.db.query(`
			SELECT * FROM documentos WHERE email = $1
		`, [email])
	}

	async create (documento: Documento): Promise<Documento> {
		return await this.db.save(documento)
	}

}