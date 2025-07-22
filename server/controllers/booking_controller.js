
import validator from 'validator';
import { createBookingData, fetchAllBookings, fetchBooking, updateStatusDb } from '../models/booking_model.js';

export async function createBooking(req, res) {
    // some basic validation using validator library
    let {name, email, phone, address, date, time} = req.body;
    
    try {
        if(!name || !validator.isEmail(email) || !validator.isMobilePhone(phone, 'any', {strictMode: false}) || !address || !validator.isISO8601(date) || !validator.isTime(time, {mode:'withSeconds'})) throw new Error('Create booking model function received missing data');
    }catch (e) {
        console.log(e);
        res.status(400).json({msg: 'Improper data received.'});
        return;
    }

    let bookingData;
    try {
        bookingData = await createBookingData({name, email, phone, address, date, time});
    }catch(e) {
        console.log(e);
        if(e.message) {
            res.status(500).json({msg: e.message});
            return;
        }
        res.status(500).json({msg: 'error creating booking. Please try again'});
        return;
    }
    res.status(201).json(bookingData);
}


// TODO add auth for all lower functions
export async function getAllBookings(req, res) {
    // returns all bookings
    let data;
    try {
        data = await fetchAllBookings();
    }catch (e) {
        console.log(e);
        res.status(500).json({msg: 'Error fetching bookings'});
        return;
    }
    
    res.status(200).json(data.rows);

}

// returns bookings by email
export async function getBookingsByEmail(req, res) {
    let email = req.params.email;
    if (!validator.isEmail(email)) {
        res.status(400).json({msg: 'invalid email given'});
        return;
    }

    let data;
    try {
        data = await fetchBooking(email);
    }catch(e) {
        res.status(500).json({msg: 'Error fetching booking'});
        return;
    }
    res.status(200).json(data);
}


// updates status of the booking
export async function updateBookingStatus(req, res) {
    let id = Number(req.params.id);
    let {status} = {...req.body};
    let options = ['pending', 'confirmed', 'cancelled', 'completed'];
    if (!options.includes(status)) {
        res.status(400).json({msg: 'not a valid status'});
        return;
    }else if (!id) {
        res.status(400).json('not a valid id');
        return;
    }

    try {
        let updated = await updateStatusDb(id, status);
        if (updated.length === 0) {
            res.status(404).json('Booking not found');
            return;
        }
        res.status(201).json(updated);
        return;
    }catch (e) {
        console.log(e);
        res.status(500).json({msg: 'Error updating booking'});
    }
}