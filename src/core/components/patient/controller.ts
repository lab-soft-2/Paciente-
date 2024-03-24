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

        const patient = new Patient(email, password, name);
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

        const { email,  condition } = req.body;

        const repository = new PatientRepository(getRepository(Patient))

        const patient = await repository.findOneByEmail(email)
        if(patient && condition){
            patient.condition = condition
            console.log(JSON.stringify(condition, null, "  "));
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
            
            console.log(JSON.stringify(patient, null, "  "));
            
            const updatePatient = await repository.update(patient)

            console.log(JSON.stringify(updatePatient, null, "  "));
            return res.status(200).json(updatePatient)
        }
        return res.status(400).json({"erro":"paciente nao encontrado ou score nao enviado"})
    }

}