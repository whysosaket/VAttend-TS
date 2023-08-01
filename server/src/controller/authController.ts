import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";

import User from "../models/User";
import CustomRequest from "../types/CustomRequest";

import bcrypt from "bcrypt";
import md5 from "md5";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

const createUser = async (req: CustomRequest, res: Response) => {
  let success = false;

  // Checking if requester is a admin/authoised or not
  const requester = await User.findById(req.user.id, "admin name");
  if (!requester?.admin) {
    return res.status(400).json({ success, error: "No Access!!!" });
  }

  // checking if employee id is 10 digits long and it contains only digits
  if (
    req.body.employee_id.length != 10 ||
    !req.body.employee_id.match(/^[0-9]+$/)
  ) {
    return res
      .status(400)
      .json({
        success,
        error:
          "Employee ID must be 10 digits long! and it must contain only digits",
      });
  }

  // Saving req data into a variable
  let data = req.body;

  try {
    // Checking if user already exists
    let user = await User.findOne({ employee_id: data.employee_id });
    if (user) {
      res
        .status(400)
        .json({
          success,
          error: "Sorry, a user with this employee id already exists!",
        });
      return null;
    }

    // Using bcrypt to generate a secured password
    // Crating a salt from bcrypt
    const securedPassword = await bcrypt.hash(data.password.toString(), 10);

    // Make the name's first letter capital of every word
    data.name = data.name.replace(/\w\S*/g, function (txt: string) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    // Creating the user
    user = await User.create({
      name: data.name,
      password: securedPassword,
      employee_id: data.employee_id,
      admin: data.admin,
    });

    const returnData = {
      user: {
        id: user.id,
      },
    };
    success = true;
    return res.json({ success, info: "Account Created Successfully!!" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Something Went Wrong!" });
  }
};

const loginUser = async (req: Request, res: Response) => {
  let success = false;

  const { employee_id, password } = req.body;

  try {
    let user = await User.findOne({ employee_id }).exec();

    if (!user) {
      return res
        .status(400)
        .json({ error: "Please, login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(
      password.toString(),
      user.password
    );
    if (!passwordCompare) {
      return res
        .status(400)
        .json({ error: "Please, login with correct credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const authtoken = jwt.sign(payload, JWT_SECRET);
    const devicetoken = md5(user.employee_id) + Math.random();
    success = true;
    return res.json({ success, authtoken, devicetoken });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Something Went Wrong!" });
  }
};

export { createUser, loginUser };
