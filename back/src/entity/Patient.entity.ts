import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity({ name: "patients" })
  export class Patient {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({ nullable: false })
    name: string;
  
    @Column({ nullable: false })
    email: string;
  
    @Column({ nullable: false })
    password: string;
  
    @Column({ default: "patient" })
    role: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @Column('jsonb', { nullable: true, default: {} })
    condition: string;

    @Column({ default: 5 })
    score: number;
 
  }