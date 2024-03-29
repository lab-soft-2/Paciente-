import * as express from "express";
import { PatientController } from "./controller";
const Router = express.Router();

Router.get(
  "/user/email",
  PatientController.getByEmail
);

Router.get(
  "/user/all",
  PatientController.getAll
);

Router.post(
  "/user/delete/email",
  PatientController.deleteByEmail
);

Router.post(
  "/user/update/condition",
  PatientController.updatePatientCondition
);
Router.post(
  "/user/update/score",
  PatientController.updatePatientScore
);

Router.post(
  "/postar/documento",
  PatientController.medicPostDocumento
);

// main requests
Router.post(
  "/signup", 
  PatientController.signup
);

Router.post(
  "/login",
  PatientController.patientLogin
);

Router.get(
  "/vizualizar/documento",
  PatientController.patientGetDocumentos
);

Router.get(
  "/vizualizar/agenda",
  PatientController.patientGetConsultas
);

Router.get(
  "/vizualizar/agenda/medico",
  PatientController.medicGetConsultas
);


Router.post(
  "/postar/exame",
  PatientController.patientPostExame
);


Router.get(
  "/vizualizar/medicos",
  PatientController.patientGetMedicos
);

Router.post(
  "/fazer/consulta",
  PatientController.patientPostConsulta
);

export { Router as patientRouter };