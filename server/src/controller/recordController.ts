import { Response } from "express";

import Record from "../models/Record";
import CustomRequest from "../types/CustomRequest";

const fetchAllRecords = async (req: CustomRequest, res: Response) => {
    function addMinutes(date: Date, minutes: number) {
        return new Date(date.getTime() + minutes * 60000);
      }
      try {
        var records = await Record.find(
          { user: req.user.id },
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

export {fetchAllRecords};