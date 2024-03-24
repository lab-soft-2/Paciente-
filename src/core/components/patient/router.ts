import * as express from "express";
import { PatientController } from "./controller";
const Router = express.Router();

Router.get(
  "/users",
  PatientController.getUsers
);


Router.post("/signup", PatientController.signup);


export { Router as patientRouter };