import { Router } from "express";

import {generateQR} from "../controller/qrController";

export default (router: Router) => {
    router.route("/api/qr/").get(generateQR);
}