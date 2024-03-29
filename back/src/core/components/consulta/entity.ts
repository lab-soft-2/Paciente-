import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'consultas' })
export class Consulta {
    @PrimaryGeneratedColumn('uuid')
    	id?: string

    @Column({ nullable: false, type: 'varchar', length: 255 })
    	paciente: string

    @Column({ nullable: false, type: 'varchar', length: 255 })
    	profissional: string

	@Column({nullable: true, type: 'varchar', length: 255, unique: true })
    	documento?: string

    @CreateDateColumn()
    	created_at?: Date

    @UpdateDateColumn()
    	updated_at?: Date

	@Column({ type: 'date' })
    	inicio?: string

	@Column({ nullable: true})
    	duracao?: number

    @Column( { default: {}, type: 'jsonb' })
    	status?: string
    
    constructor(profissional: string, paciente: string) {
    	this.paciente = paciente
    	this.profissional = profissional
    }
}