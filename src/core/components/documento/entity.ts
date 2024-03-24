import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'documentos' })
export class Documento {
    @PrimaryGeneratedColumn('uuid')
    	id?: string

    @Column({ nullable: false, type: 'varchar', length: 255 })
    	paciente: string

    @Column({ nullable: false, type: 'varchar', length: 255 })
    	profissional: string

    @CreateDateColumn()
    	created_at?: Date

    @Column( { type: 'text' })
		file?: string

    
    constructor(email: string, paciente: string) {
    	this.paciente = paciente
    	this.profissional = profissional
    }
}