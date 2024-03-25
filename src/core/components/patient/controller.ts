import { Request, Response } from "express";
import * as util from 'util';
import { logger } from '../../../config/logger'
import { getRepository } from './../../../config/db/data-source'
import { Patient } from "./entity";
import { PatientRepository } from './repository'

export class PatientController {


    static async signup(req: Request, res: Response) {

        const { email, password, name } = req.body;

        const repository = new PatientRepository(getRepository(Patient))

        const patient = new Patient();
        patient.email = email
        patient.name = name
        patient.password = password

        repository.create(patient)

        return res
            .status(200)
            .json({ message: "User created successfully", patient });
    }

    static async getByEmail(req: Request, res: Response) {

        const { email } = req.body;

        const repository = new PatientRepository(getRepository(Patient))

        const entity = await repository.findOneByEmail(email)

        return res.status(200).json(entity)
    }

    static async getAll(req: Request, res: Response) {

        const repository = new PatientRepository(getRepository(Patient))

        const entity = await repository.findAll()

        return res.status(200).json(entity)
    }

    static async deleteByEmail(req: Request, res: Response) {

        const { email } = req.body;

        const repository = new PatientRepository(getRepository(Patient))

        const entity = await repository.deleteByEmail(email)

        return res.status(200).json(entity)
    }

    static async updatePatientCondition(req: Request, res: Response) {
        const log = logger({ context: 'App' })

        const { email,  newcondition } = req.body;

        const repository = new PatientRepository(getRepository(Patient))

        const patient = await repository.findOneByEmail(email)
        
        console.log(JSON.stringify(patient, null, "  "))

        if(patient && newcondition){
            patient.condition = newcondition
            console.log(JSON.stringify(newcondition, null, "  "))
            console.log(JSON.stringify(patient, null, "  "))
            // repository.updateCondition(patient,condition)
            repository.update(patient)
            return res.status(200).json(patient)
        }
        return res.status(400).json({"erro":"paciente nao encontrado ou condicao nao enviada"})
    }

    static async updatePatientScore(req: Request, res: Response) {
        const log = logger({ context: 'App' })

        const { email, score } = req.body;

        const repository = new PatientRepository(getRepository(Patient))

        const patient = await repository.findOneByEmail(email)
        if(patient && score){
            patient.score = score
            
            // console.log(JSON.stringify(patient, null, "  "));
            
            // const updatePatient = await repository.updateScore(patient,score)
            repository.update(patient)


            // console.log(JSON.stringify(updatePatient, null, "  "));
            return res.status(200).json(patient)
        }
        return res.status(400).json({"erro":"paciente nao encontrado ou score nao enviado"})
    }

}