import { Router } from "express";

import {scan, getScan} from "../controller/scanController";
import fetchuser from "../middleware/fetchuser";
import fetchdevice from "../middleware/fetchdevice";

export default (router: Router) => {
    router.route("/api/scan/:id").post(fetchuser,fetchdevice, (req: any, res: any)=>scan(req, res));
    router.route("/api/scan/:id").get(getScan);
}