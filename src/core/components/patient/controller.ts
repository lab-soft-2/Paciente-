import { Request, Response } from "express";
import { Patient } from "./entity";
import { getRepository, MainDataSource } from './../../../config/db/data-source'

export class PatientController {


    static async signup(req: Request, res: Response) {

        await MainDataSource.initialize()
        log.info('Database connected successfully!')
        const repository = new PatientRepository(getRepository(Patient))

        const user = new Patient();
        user.name = name
        user.email = email
        user.password = password
        repository.create(patient)

        return res
            .status(200)
            .json({ message: "User created successfully", user });
    }

}