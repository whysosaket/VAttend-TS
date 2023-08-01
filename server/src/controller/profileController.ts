import { Response } from "express";

import User from "../models/User";
import Present from "../models/Present";
import CustomRequest from "../types/CustomRequest";

import bcrypt from "bcrypt";

const fetchUser = async (req: CustomRequest, res: Response) => {
  let success = false;

  try {
    let user = await User.findById(req.user.id, "name employee_id date admin");

    if (!user) {
      return res.status(400).json({ error: "User Not Found!" });
    }

    // checking if the user is present today
    let presentUser = await Present.findOne({
      employee_id: req.user.id,
    }).exec();
    let isPresent = false;
    if (presentUser) {
      isPresent = true;
    }

    let date = user.date.toDateString();
    let time = user.date.toTimeString();

    const details = {
      name: user.name,
      employee_id: user.employee_id,
      admin: user.admin,
      date: date,
      time: time,
      present: isPresent,
    };

    success = true;
    res.json({ success, details });
  } catch (error) {
    console.log(error);
    res.json({ error: "Something Went Wrong!" });
  }
};

const updatePassword = async (req: CustomRequest, res: Response) => {
  let success = false;

  const { oldpassword, newpassword } = req.body;

  try {
    let user = await User.findById(req.user.id).exec();

    if (!user) {
      return res.status(400).json({ error: "Please, Invalid Credentials" });
    }

    const passwordCompare = await bcrypt.compare(
      oldpassword.toString(),
      user.password
    );
    if (!passwordCompare) {
      return res.status(400).json({ error: "Please, Invalid Credentials" });
    }

    // Crating a salt from bcrypt
    const securedPassword = await bcrypt.hash(newpassword.toString(), 10);

    // Updating the Password using above retrieved user
    user.password = securedPassword;
    await user.save();

    success = true;
    res.json({ success, message: "Password Updated Successfully!!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error: "Something Went Wrong!" });
  }
};

export { fetchUser as fetchUsers, updatePassword };
