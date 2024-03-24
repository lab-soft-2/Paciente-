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

    static async deleteByEmail(req: Request, res: Response) {

        const { email } = req.body;

        const repository = new PatientRepository(getRepository(Patient))

        const entity = await repository.findOneByEmail(email)

        return res.status(200).json(entity)
    }



}