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

    static async updatePatient(req: Request, res: Response) {

        const { email, password, name, conditions, score } = req.body;

        const repository = new PatientRepository(getRepository(Patient))

        const entity = await repository.findOneByEmail(email)
        if(entity){
            for (let key in Object.entries(req.body)) {
                if (key == 'password' || key == 'name' || key == 'conditions' || key == 'score') {
                    entity[key] = req.body[key]
                }
            }
    
            await repository.save(entity)
            return res.status(200).json(entity)
        }
        return res.status(400).json({"erro":"paciente nao encontrado"})
    }



}