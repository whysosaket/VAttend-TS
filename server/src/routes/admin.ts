import { Router, Response } from "express";

import {
    fetchAllUsers,
    fetchAllRecords,
    fetchUsers,
    fetchUserRecords,
    deleteUser,
  } from "../controller/adminController";
import fetchUser from "../middleware/fetchuser";

export default (router: Router) => {
    router.route("/api/admin/fetchallusers").get(fetchUser, (req: any, res: Response)=>fetchAllUsers(req, res));
    router.route("/api/admin/fetchallrecords").get(fetchAllRecords);
    router.route("/api/admin/fetchuser").post(fetchUser, (req: any, res: Response)=>fetchUsers(req, res));
    router.route("/api/admin/fetchuserrecords").post(fetchUser, (req: any, res: Response)=>fetchUserRecords(req, res));
    router.route("/api/admin/deleteuser").delete(fetchUser, (req: any, res: Response)=>deleteUser(req, res));
}