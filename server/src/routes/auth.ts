import { Router, Response } from "express";

import { createUser, loginUser } from "../controller/authController";
import fetchuser from "../middleware/fetchuser";

export default (router: Router) => {
    router.route("/api/auth/login").post((req: any, res: Response)=>loginUser(req, res));
    router.route("/api/auth/createuser").post(fetchuser, (req: any, res: Response)=>createUser(req, res));
}