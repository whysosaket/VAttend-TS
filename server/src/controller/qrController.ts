import dotenv from 'dotenv';
dotenv.config();

import { Request, Response } from 'express';

import QRCode from 'qrcode';
import md5 from 'md5';
import dateM from '../utils/datetime';

const ADDRESS_SECRET = process.env.ADDRESS_SECRET as string;
const ADD_SERVER = process.env.ADD_SERVER as string;

const generateQR = async (req: Request, res: Response) => {
    try {
        let datetime = dateM();
        // Crating a salt from bcrypt
        var sURI = md5(datetime+ADDRESS_SECRET);
        const securedURI = sURI.replaceAll("/", "slash");
      
        const uri = ADD_SERVER+"/api/scan/" + securedURI;
        QRCode.toDataURL(uri, function (err, imgurl) {
          res.json({success: true, imgurl, uri});
        });
    
      } catch (error) {
        console.log(error);
        res.json({ error: "Something Went Wrong!" });
      }
};

export { generateQR }