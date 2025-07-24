import conn from '../config/config.js';
import { createUserData } from './user_model.js';

export async function createBookingData(bookingDetails) {
	let { name, email, phone, address, date, time } = { ...bookingDetails };
	if (!name || !email || !phone || !address || !date || !time) throw new Error('Create booking model function received missing data');


	let bookingData = await conn.transaction(async trx => {

		let user = await createUserData({ name, email, phone, address }, trx);
		if (!user.name && !user.email) throw new Error('Error in transaction, couldn\'t create user');

		let slot = await trx('availability').select(['id', 'is_booked']).where({ date, start_time: time }).first();
		if (!slot) throw new Error('Error in transaction, can\'t get slot data');
		if (slot.is_booked === true) throw new Error('Slot already taken');
		await trx('availability').update({ is_booked: true }).where({ id: slot.id });

		let booking = await trx('bookings').insert({ slot: slot.id, user_id: user.id }, ['*']);
		if (!booking[0]) throw new Error('Error in booking model, couldn\'t create booking');
		return bookingDetails;

	})
	return bookingData
}


export async function fetchAllBookings() {
	// returns all bookings
	let raw = 'SELECT bookings.*, users.*, availability.date::text as date, availability.start_time, availability.end_time FROM bookings JOIN users ON bookings.user_id = users.id JOIN availability ON bookings.slot = availability.id';
	let data = await conn.raw(raw);
	return data;
}


export async function fetchBooking(email) {
	let raw = 'SELECT * FROM bookings JOIN users ON bookings.user_id = users.id JOIN availability ON bookings.slot = availability.id WHERE email = ?';
	let booking = await conn.raw(raw, [email]);
	return booking.rows;
}

export async function updateStatusDb(id, status) {
	// have to use slot_id because it got corrupted with the join statements . TODO fix that join
	let updated = await conn('bookings').update({status: status}).where({slot: id}).returning(['*']);
	return updated;
}