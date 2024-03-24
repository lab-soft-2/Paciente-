import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'exames' })
export class Exame {
    @PrimaryGeneratedColumn('uuid')
    	id?: string

    @Column({ nullable: false, type: 'varchar', length: 255 })
    	paciente: string

    @CreateDateColumn()
    	created_at?: Date

    @Column( { type: 'text' })
		file?: string

    
    constructor(profissional: string, paciente: string) {
    	this.paciente = paciente
    	this.profissional = profissional
    }
}