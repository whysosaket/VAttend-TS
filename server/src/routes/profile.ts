import { Router, Response } from "express";

import { fetchUsers, updatePassword } from "../controller/profileController";
import fetchUser from "../middleware/fetchuser";

export default (router: Router) => {
    router.route("/api/profile/").get(fetchUser, (req: any, res: Response)=>fetchUsers(req, res));
    router.route("/api/profile/updatepassword").post(fetchUser, (req: any, res: Response)=>updatePassword(req, res));
}