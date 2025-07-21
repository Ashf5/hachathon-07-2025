import validator from 'validator';
import { addAvailbility, fetchAllAvailableDays, updateSlot } from "../models/available_model.js";

export async function getAvailableDays(req, res) {
    try {
        let days = await fetchAllAvailableDays();
        res.status(200).json(days);
    }catch(e) {
        console.log(e);
        res.status(500).json({msg: 'Error fetching available slots'});
    }
}


// TODO add auth to this function 
export async function addTimeSlot(req, res) {
    let {date, start_time, end_time} = req.body;
    if (!validator.isDate(date) || !validator.isTime(start_time) || !validator.isTime(end_time)) {
        res.status(400).json('invalid data received in body');
        return;
    }

    try {
        let newSlot = await addAvailbility(date, start_time, end_time);
        res.status(201).json(newSlot);
    }catch(e) {
        console.log(e);
        res.status(500).json({msg: 'Error creating new slot'});
    }
}

