import { Request, Response } from "express";

import Present from "../models/Present";
import User from "../models/User";
import Record from "../models/Record";
import CustomRequest from "../types/CustomRequest";

const fetchAllUsers = async (req: CustomRequest, res: Response) => {
  try {
    let success = false;
    const user = await User.findById(req.user.id);

    // Checking if user exists
    if (!user) {
      return res.status(400).json({ success, error: "Not Authorized!" });
    }

    const isAdmin = user.admin;

    // Checking if found user is a Admin
    if (!isAdmin) {
      return res.status(400).json({ success, error: "Not Authorized!" });
    }

    const users = await User.find({}, "employee_id name admin date");

    success = true;
    res.json({ success, users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error: "Internal Server Error!" });
  }
};

const fetchAllRecords = async (req: Request, res: Response) => {
  try {
    const records = await Record.find({});
    res.json(records);
  } catch (error) {
    console.log(error);
    res.json({ error: "Something Went Wrong!" });
  }
};

const fetchUser = async (req: CustomRequest, res: Response) => {
  try {
    let success = false;
    const user = await User.findById(req.user.id);

    // Checking if user exists
    if (!user) {
      return res.status(400).json({ success, error: "Not Authorized!" });
    }

    const isAdmin = user.admin;

    // Checking if found user is a Admin
    if (!isAdmin) {
      return res.status(400).json({ success, error: "Not Authorized!" });
    }

    let finduser = await User.findById(
      req.body.id,
      "name employee_id date admin"
    );

    // checking if the user is present today
    let presentUser = await Present.findOne({
      employee_id: req.body.id,
    }).exec();
    let isPresent = false;
    if (presentUser) {
      isPresent = true;
    }

    if (!finduser) {
      return res.status(400).json({ error: "User Not Found!" });
    }

    let date = finduser.date.toDateString();
    let time = finduser.date.toTimeString();

    const details = {
      name: finduser.name,
      employee_id: finduser.employee_id,
      admin: finduser.admin,
      date: date,
      time: time,
      present: isPresent,
    };
    success = true;
    return res.json({ success, details });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: "Internal Server Error!" });
  }
};

const fetchUserRecords = async (req: CustomRequest, res: Response) => {
  function addMinutes(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * 60000);
  }
  try {
    // Verification if the request requested is by a admin
    let success = false;
    const user = await User.findById(req.user.id);

    // Checking if user exists
    if (!user) {
      return res.status(400).json({ success, error: "Not Authorized!" });
    }

    const isAdmin = user.admin;

    // Checking if found user is a Admin
    if (!isAdmin) {
      return res.status(400).json({ success, error: "Not Authorized!" });
    }

    var records = await Record.find(
      { user: req.body.id },
      "date distance present location"
    );

    // Below Function Fixes time error i.e. 5hrs and 30 mins
    records.map((record) => {
      record.date = addMinutes(record.date, 330);
    });
    return res.json({ success: true, records });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: "Something Went Wrong!" });
  }
};

const deleteUser = async (req: CustomRequest, res: Response) => {
  try {
    // Verification if the request requested is by a admin
    let success = false;
    const user = await User.findById(req.user.id);

    // Checking if user exists
    if (!user) {
      return res.status(400).json({ success, error: "Not Authorized!" });
    }

    const isAdmin = user.admin;

    // Checking if found user is a Admin
    if (!isAdmin) {
      return res.status(400).json({ success, error: "Not Authorized!" });
    }

    // Performing the delete operation
    await User.findByIdAndDelete(req.body.id);

    return res.json({ success: true, info: "Person Deleted!!!" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: "Something Went Wrong!" });
  }
};

export {
  fetchAllUsers,
  fetchAllRecords,
  fetchUser as fetchUsers,
  fetchUserRecords,
  deleteUser,
};
