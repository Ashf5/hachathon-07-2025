import conn from '../config/config.js';
import { createUserData } from './user_model.js';

export async function createBookingData(bookingDetails) {
    let {name, email, phone, address, date, time} = {...bookingDetails};
    if(!name || !email || !phone || !address || !date || !time) throw new Error('Create booking model function received missing data');


    let bookingData = await conn.transaction(async trx => {

        let user = await createUserData({name, email, phone, address}, trx);
        if (!user.name && !user.email) throw new Error('Error in transaction, couldn\'t create user');

        let slot = await trx('availability').select(['id', 'is_booked']).where({date, start_time: time}).first();
        if (!slot) throw new Error('Error in transaction, can\'t get slot data');
        if(slot.is_booked === true) throw new Error('Slot already taken');
        await trx('availability').update({is_booked: true}).where({id: slot.id});

        let booking = await trx('bookings').insert({slot: slot.id, user_id: user.id}, ['*']);
        if (!booking[0]) throw new Error('Error in booking model, couldn\'t create booking');
        return bookingDetails;
        
    })
    return bookingData
}

const sampleBookingDetails = {
  name: "John Doe the second",
  email: "john@example.com",
  phone: "555-9999",
  address: "101 Main Street",
  date: "2025-07-25",
  time: "10:00"
};

createBookingData(sampleBookingDetails).then(data => console.log(data))