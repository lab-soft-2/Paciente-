import * as express from "express";
import { PatientController } from "../controllers/patient.controllers";
const Router = express.Router();

Router.get(
  "/users",
  PatientController.getUsers
);


Router.post("/signup", PatientController.signup);

Router.delete(
  "/delete/:id",
  PatientController.deleteUser
);
export { Router as patientRouter };