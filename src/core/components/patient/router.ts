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


Router.post("/signup", PatientController.signup);


export { Router as patientRouter };