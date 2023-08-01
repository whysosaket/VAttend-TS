import { Router } from "express";
import admin from "./admin";
import auth from "./auth";
import profile from "./profile";
import qr from "./qr";
import records from "./records";
import scan from "./scan";

const router = Router();

export default (): Router => {
  admin(router);
  auth(router);
  profile(router);
  qr(router);
  records(router);
  scan(router);
  return router;
};
