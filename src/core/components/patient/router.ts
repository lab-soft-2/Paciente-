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

Router.get(
  "/user/delete/email",
  PatientController.deleteByEmail
);


Router.post("/signup", PatientController.signup);


export { Router as patientRouter };