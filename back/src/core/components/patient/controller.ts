import { Request, Response } from "express";
import * as util from 'util';
import { logger } from '../../../config/logger';
import { getRepository } from './../../../config/db/data-source';

import { Patient } from "./entity";
import { PatientRepository } from './repository';

import { Documento } from "../documento/entity";
import { DocumentoRepository } from '../documento/repository';

import { Exame } from "../exame/entity";
import { ExameRepository } from '../exame/repository';

import { Consulta } from "../consulta/entity";
import { ConsultaRepository } from '../consulta/repository';



export class PatientController {


    static async signup(req: Request, res: Response) {

        const { email, password, name } = req.body;

        const repository = new PatientRepository(getRepository(Patient))

        const patient = new Patient(email, password, name);
        // patient.email = email
        // patient.name = name
        // patient.password = password

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

        const { email, newcondition } = req.body;

        const repository = new PatientRepository(getRepository(Patient))

        const patient = await repository.findOneByEmail(email)


        if (patient && newcondition) {
            patient.condition = newcondition
            repository.update(patient)
            return res.status(200).json(patient)
        }
        return res.status(400).json({ "erro": "paciente nao encontrado ou condicao nao enviada" })
    }

    static async updatePatientScore(req: Request, res: Response) {
        const log = logger({ context: 'App' })

        const { email, score } = req.body;

        const repository = new PatientRepository(getRepository(Patient))

        const patient = await repository.findOneByEmail(email)
        if (patient && score) {
            patient.score = score

            // console.log(JSON.stringify(patient, null, "  "));
            repository.update(patient)
            return res.status(200).json(patient)
        }
        return res.status(400).json({ "erro": "paciente nao encontrado ou score nao enviado" })
    }




    static async patientLogin(req: Request, res: Response) {
        const log = logger({ context: 'App' })

        const { email, password } = req.body;

        const repository = new PatientRepository(getRepository(Patient))

        const patient = await repository.findOneByEmail(email)



        if (patient?.password == password) {
            return res.status(200).json(patient)
        }
        return res.status(400).json({ "erro": "Erro de autenticacao" })
    }

    static async patientGetDocumentos(req: Request, res: Response) {
        const log = logger({ context: 'App' })

        const { email } = req.body;

        const repository = new DocumentoRepository(getRepository(Documento))

        const documentos = await repository.findAllByEmail(email)

        if (documentos) {
            if (documentos.length > 0) {
                return res.status(200).json(documentos)
            }
        }
        return res.status(400).json({ "erro": "Documentos nao encontrados" })
    }

    static async patientGetConsultas(req: Request, res: Response) {
        const log = logger({ context: 'App' })

        const { email } = req.body;

        const repository = new ConsultaRepository(getRepository(Consulta))

        const consulta = await repository.findAllByEmail(email)
        if (consulta) {
            if (consulta.length > 0) {
                return res.status(200).json(consulta)
            }
        }
        return res.status(400).json({ "erro": "consultas nao encontradas" })
    }

    static async patientPostExame(req: Request, res: Response) {
        const log = logger({ context: 'App' })

        const { email, exame } = req.body;

        const repository = new ExameRepository(getRepository(Exame))

        const novoexame = new Exame(email);

        repository.create(novoexame)

        return res
            .status(200)
            .json({ message: "Exame created successfully", novoexame });
    }

    static async patientPostConsulta(req: Request, res: Response) {
        const log = logger({ context: 'App' })

        const { paciente, medico, data, duracao } = req.body;

        const repository = new ConsultaRepository(getRepository(Consulta))

        const consulta = new Consulta(medico, paciente);
        consulta.fim = data.setSeconds(data.getSeconds() - duracao)
        repository.create(consulta)

        return res
            .status(200)
            .json({ message: "Consulta created successfully", consulta });
    }

    static async patientGetMedicos(req: Request, res: Response) {
        const log = logger({ context: 'App' })

        const http = require('node:http')

        // const { paciente, medico, data, duracao } = req.body;

        // fazer request para o medico_db  medico/user/all

        let resp = {}

        resp = http.get({
            hostname: 'localhost',
            port: 3001,
            path: '/medico/user/all',

        }, (resp) => {
            let data = '';
            console.log('1')
            // Um bloco de dados foi recebido.
            resp.on('data', (chunk) => {
                data += chunk;
                console.log('2')
            });

            // Toda a resposta foi recebida. Exibir o resultado.
            resp.on('end', () => {
                console.log('3')
                console.log(JSON.parse(data).explanation);
                resp = data
                console.log('3')
                return (data)
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        })

        console.log('4')

        return res
            .status(200).json(resp ?? {})
        // .json({ message: "Consulta created successfully", novoexame });
    }


}