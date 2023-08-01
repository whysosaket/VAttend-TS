import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
dotenv.config();

import {merge} from 'lodash';

const fetchdevice = (req: Request, res: Response, next: NextFunction)=>{
    
    const token = req.header('device-token');

    if(!token){
        res.status(401).send({error: "Token Validation Error!"})
    }

    try{
    merge(req, {device: token});
    return next();
    }catch(error){
        res.status(401).send({error: "Token Validation Error!"})
    }
}

export default fetchdevice;