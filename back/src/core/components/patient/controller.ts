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
        res.set('Access-Control-Allow-Origin', '*');

        return res
            .status(200)
            .json({ message: "User created successfully", patient });
    }

    static async getByEmail(req: Request, res: Response) {

        const { email } = req.body;

        const repository = new PatientRepository(getRepository(Patient))

        const entity = await repository.findOneByEmail(email)
        res.set('Access-Control-Allow-Origin', '*');
        return res.status(200).json(entity)
    }

    static async getAll(req: Request, res: Response) {

        const repository = new PatientRepository(getRepository(Patient))

        const entity = await repository.findAll()
        res.set('Access-Control-Allow-Origin', '*');
        return res.status(200).json(entity)
    }

    static async deleteByEmail(req: Request, res: Response) {

        const { email } = req.body;

        const repository = new PatientRepository(getRepository(Patient))

        const entity = await repository.deleteByEmail(email)
        res.set('Access-Control-Allow-Origin', '*');
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
            res.set('Access-Control-Allow-Origin', '*');
            return res.status(200).json(patient)
        }
        res.set('Access-Control-Allow-Origin', '*');
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
            res.set('Access-Control-Allow-Origin', '*');
            return res.status(200).json(patient)
        }
        res.set('Access-Control-Allow-Origin', '*');
        return res.status(400).json({ "erro": "paciente nao encontrado ou score nao enviado" })
    }

    static async medicPostDocumento(req: Request, res: Response) {

        const { paciente, profissional, documento } = req.body;

        const repository = new DocumentoRepository(getRepository(Documento))

        const newDocumento = new Documento(paciente, profissional);
        newDocumento.file = documento


        repository.create(newDocumento)
        res.set('Access-Control-Allow-Origin', '*');
        return res
            .status(200)
            .json({ message: "Documento created successfully", newDocumento });
    }

    static async finalizarConsulta(req: Request, res: Response) {

        const { paciente, medico, newcondition, consulta } = req.body;
        console.log(newcondition)

        const repositoryConsulta = new ConsultaRepository(getRepository(Consulta))
        const repositoryPatient = new PatientRepository(getRepository(Patient))

        const consultaUpdate = await repositoryConsulta.findOneById(consulta)
        const pacienteUpdate = await repositoryPatient.findOneByEmail(paciente)

        if (consultaUpdate && 'consulta' in newcondition) {
            consultaUpdate.status = newcondition['consulta']
            consultaUpdate.inicio = new Date().toDateString()
            repositoryConsulta.create(consultaUpdate)
        }
        if (pacienteUpdate && 'paciente' in newcondition) {
            pacienteUpdate.condition = newcondition['paciente']
            repositoryPatient.create(pacienteUpdate)
        }
        res.set('Access-Control-Allow-Origin', '*');
        return res
            .status(200)
            .json({ "Consulta finalizada ": {
                "consulta": consultaUpdate, 
                "paciente":pacienteUpdate
            } });
    }




    static async patientLogin(req: Request, res: Response) {
        const log = logger({ context: 'App' })

        const { email, password } = req.body;

        const repository = new PatientRepository(getRepository(Patient))

        const patient = await repository.findOneByEmail(email)



        if (patient?.password == password) {
            res.set('Access-Control-Allow-Origin', '*');
            return res.status(200).json(patient)
        }
        res.set('Access-Control-Allow-Origin', '*');
        return res.status(400).json({ "erro": "Erro de autenticacao" })
    }

    static async patientGetDocumentos(req: Request, res: Response) {
        const log = logger({ context: 'App' })

        const { email } = req.body;

        const repository = new DocumentoRepository(getRepository(Documento))

        const documentos = await repository.findAllByEmail(email)

        if (documentos) {
            if (documentos.length > 0) {
                res.set('Access-Control-Allow-Origin', '*');
                return res.status(200).json(documentos)
            }
        }
        res.set('Access-Control-Allow-Origin', '*');
        return res.status(400).json({ "erro": "Documentos nao encontrados" })
    }

    static async patientGetConsultas(req: Request, res: Response) {
        const log = logger({ context: 'App' })

        const { email } = req.body;

        const repository = new ConsultaRepository(getRepository(Consulta))

        const consulta = await repository.findAllByEmail(email)
        if (consulta) {
            if (consulta.length > 0) {
                res.set('Access-Control-Allow-Origin', '*');
                return res.status(200).json(consulta)
            }
        }
        res.set('Access-Control-Allow-Origin', '*');
        return res.status(400).json({ "erro": "consultas nao encontradas" })
    }

    static async medicGetConsultas(req: Request, res: Response) {
        const log = logger({ context: 'App' })

        const { email } = req.body;

        const repository = new ConsultaRepository(getRepository(Consulta))

        const consulta = await repository.findAllByEmailMedic(email)
        if (consulta) {
            if (consulta.length > 0) {
                res.set('Access-Control-Allow-Origin', '*');
                return res.status(200).json(consulta)
            }
        }
        res.set('Access-Control-Allow-Origin', '*');
        return res.status(400).json({ "erro": "consultas nao encontradas" })
    }

    static async patientPostExame(req: Request, res: Response) {
        const log = logger({ context: 'App' })

        const { email, exame } = req.body;

        const repository = new ExameRepository(getRepository(Exame))

        const novoexame = new Exame(email);
        novoexame.file = exame

        repository.create(novoexame)
        res.set('Access-Control-Allow-Origin', '*');
        return res
            .status(200)
            .json({ message: "Exame created successfully", novoexame });
    }

    static async patientGetExame(req: Request, res: Response) {
        const log = logger({ context: 'App' })

        const { email } = req.body;

        const repository = new ExameRepository(getRepository(Exame))

        

        const exames = await repository.findAllByEmail(email)
        res.set('Access-Control-Allow-Origin', '*');
        return res
            .status(200)
            .json({ message: "Exame listados:", exames });
    }

    static async patientPostConsulta(req: Request, res: Response) {
        const log = logger({ context: 'App' })

        const { paciente, medico, data, duracao } = req.body;

        const repository = new ConsultaRepository(getRepository(Consulta))

        const consulta = new Consulta(medico, paciente);

        const dataIni = new Date(data)

        consulta.inicio = dataIni.toDateString()
        consulta.duracao = duracao
        repository.create(consulta)
        res.set('Access-Control-Allow-Origin', '*');
        return res
            .status(200)
            .json({ message: "Consulta created successfully", consulta });
    }

    static async patientGetMedicos(req: Request, res: Response) {
        const log = logger({ context: 'App' })

        const http = require('node:http')

        // const { paciente, medico, data, duracao } = req.body;

        // fazer request para o medico_db  medico/user/all


        const resp = http.get({
            hostname: process.env.MEDIC_SERVICE_HOST ?? 'localhost',
            // 3001 é para testes locais
            port: process.env.MEDIC_SERVICE_PORT ?? 3001,
            path: '/medico/user/all',

        }, (resp) => {
            let data = '';
            // Um bloco de dados foi recebido.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // Toda a resposta foi recebida. Exibir o resultado.
            resp.on('end', () => {
                res.set('Access-Control-Allow-Origin', '*');
                return res
                    .status(200).json(JSON.parse(data))
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message );
        })
    }


}