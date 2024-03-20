import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Patient } from "../entity/Patient.entity";
import { encrypt } from "../helper/encrypt";
import * as cache from "memory-cache";

export class PatientController {
  static async signup(req: Request, res: Response) {
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAA');
    console.log('req');
    const { name, email, password, role } = req.body;
    const encryptedPassword = await encrypt.encryptpass(password);
    const user = new Patient();
    user.name = name;
    user.email = email;
    user.password = encryptedPassword;
    user.role = role;

    const userRepository = AppDataSource.getRepository(Patient);
    await userRepository.save(user);



    return res
      .status(200)
      .json({ message: "User created successfully", user });
  }

  static async getUsers(req: Request, res: Response) {
    const data = cache.get("data");
    if (data) {
      console.log("serving from cache");
      return res.status(200).json({
        data,
      });
    } else {
      console.log("serving from db");
      const userRepository = AppDataSource.getRepository(Patient);
      const users = await userRepository.find();

      cache.put("data", users, 6000);
      return res.status(200).json({
        data: users,
      });
    }
  }


}