import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'acompanhamentos' })
export class Acompanhamento {
    @PrimaryGeneratedColumn('uuid')
    	id?: string

    @Column({ nullable: false, type: 'varchar', length: 255 })
    	paciente: string

    @Column({ nullable: false, type: 'varchar', length: 255 })
    	profissional: string

    @CreateDateColumn()
    	created_at?: Date

    @UpdateDateColumn()
    	updated_at?: Date

    @Column( { default: {}, type: 'jsonb' })
    	status?: string
    
    constructor(profissional: string, paciente: string) {
    	this.paciente = paciente
    	this.profissional = profissional
    }
}