import { Router, Response } from "express";

import {fetchAllRecords} from "../controller/recordController";
import fetchUser from "../middleware/fetchuser";

export default (router: Router) => {
    router.route("/api/records/fetchallrecords").get(fetchUser, (req: any, res: Response)=>fetchAllRecords(req, res));
}