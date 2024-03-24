import { Request, Response } from "express";
import {logger} from '../../../config/logger'
import { getRepository, MainDataSource } from './../../../config/db/data-source'
import { Patient } from "./entity";
import {PatientRepository} from './repository'

export class PatientController {


    static async signup(req: Request, res: Response) {
        const log = logger({ context: 'App' })
        await MainDataSource.initialize()
        log.info('Database connected successfully!')

        const { name, email, password } = req.body;
        log.info(req)
        log.info( req.body)
        const repository = new PatientRepository(getRepository(Patient))

        // const patient = new Patient('testeRota@foi.com','testeRota@foi.com','testeRota@foi.com');
        const patient = new Patient(email,password,name);
        repository.create(patient)

        return res
            .status(200)
            .json({ message: "User created successfully", patient });
    }

}