import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'relacionamentos' })
export class Relacionamento {
    @PrimaryGeneratedColumn('uuid')
    	id?: string

    @Column({ nullable: false, type: 'varchar', length: 255 })
    	paciente: string

    @Column({ nullable: false, type: 'varchar', length: 255 })
    	profissional: string

	@Column({ nullable: false, type: 'varchar', length: 255, unique: true })
    	documento?: string

    @CreateDateColumn()
    	created_at?: Date

    @UpdateDateColumn()
    	updated_at?: Date

	@Column({ type: 'date' })
    	fim?: string

    @Column( { default: {}, type: 'jsonb' })
    	status?: string
    
    constructor(profissional: string, paciente: string) {
    	this.paciente = paciente
    	this.profissional = profissional
    }
}