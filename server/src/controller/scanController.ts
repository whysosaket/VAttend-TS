import dotenv from 'dotenv';
dotenv.config();

import md5 from 'md5';
import dateM from '../utils/datetime';

import Record from '../models/Record';
import User from '../models/User';
import Device from '../models/Device';
import Present from '../models/Present';
import distance from '../utils/distance';

import { Request, Response } from 'express';
import CustomRequest from '../types/CustomRequest';

const ADD_REACT = process.env.ADD_REACT as string;
const ADDRESS_SECRET = process.env.ADDRESS_SECRET as string;

const office_location = [process.env.OFFICE_LATITUDE, process.env.OFFICE_LONGITUDE] as any;
const minimum_distance = [process.env.MINIMUM_DISTANCE] as any;

interface newCustomRequest extends CustomRequest {
   device: string;
}

const scan = async (req: newCustomRequest, res: Response) => {
    const uri = req.params.id.replaceAll("slash", "/");
    const uriO = md5(dateM()+ADDRESS_SECRET);
    const passwordCompare =  uri == uriO;
        if(!passwordCompare){
            return res.status(400).json({success: false,error: "Sorry, Code Expired!"})
        }

    try{
        let success = false;

        // checking if device token is available and valid
        // available
        const devicet = req.device;
        if(devicet=="null") {
            return res.status(401).json({success, error: "Device Validation Error!"});
        }

        // Checking if device token already exists in the collection
        const device = await Device.findOne({device: devicet}).exec();
        if(device) {
            return res.status(401).json({success, error: "This device has already marked the attendence!"});
        }


        // Checking if user has already marked a attendence
        const presentUser = await Present.findOne({employee_id: req.user.id}).exec();
        if(presentUser) {
            return res.status(401).json({success, error: "Your Attendence is already marked for today!"});
        }


        const { location } = req.body;
        
        const dist = distance(office_location[0], office_location[1], location[0], location[1]);
        
        let present = false;

        if(dist<minimum_distance) present = true; 

        let record = await Record.create( {
            user: req.user.id,
            location: location,
            distance: dist,
            present: present
        })

        // saving the device token to db if marked present
        if(present) {
            let d = await Device.create({
                device: devicet
            })

            let u = await Present.create({
                employee_id: req.user.id
            })
        }

        const users:any = await User.findById(req.user.id,'employee_id name');
        
        // This function is responsible to add 5hrs and 30 mins so that attendence made on heroku is controlled
        function addMinutes(date: Date, minutes: number) {
            return new Date(date.getTime() + minutes*60000);
        }

        // This below line is so that server detects if it is on a localhost(my home wifi/my phone wifi)
        const nowTime = (process.env.ADD_REACT==="http://192.168.29.73:3000")||(process.env.ADD_REACT==="http://192.168.43.233:9000")?record.date.toTimeString().split(" ")[0]:addMinutes(record.date, 330).toTimeString().split(" ")[0];
        const nowDate = (process.env.ADD_REACT==="http://192.168.29.73:3000")||(process.env.ADD_REACT==="http://192.168.43.233:9000")?record.date.toDateString():addMinutes(record.date, 330).toDateString();
        success = true;

        
        if(present) res.json({success, present: true, distance: dist, name: users.name, employee_id: users.employee_id, time: nowTime, date: nowDate});
        else res.json({success, present: false, distance: dist, name: users.name, employee_id: users.employee_id, time: nowTime, date: nowDate});

    }catch(error){
        console.log(error);
        res.json({success: false, error: "Somthing went wrong!"})
    }
};

const getScan = async (req: Request, res: Response) => {
    res.redirect(ADD_REACT+'/scanned/'+req.params.id);
};

export {scan, getScan};