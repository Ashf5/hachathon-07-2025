
import conn from '../config/config.js';

export async function fetchAllAvailableDays() {
    // Select all days with open slots. Only returns the date objects
    let data = await conn('availability').distinct(conn.raw('date::text as date')).where('is_booked', false);
    let arr = data.map(date => date.date);
    return arr;
}


// function returns the slots of a day, takes an optional booked paramater, if true it also returns the booked slots
export async function fetchDaySlots(date, booked) {
    let data;
    if (booked) {
        data = await conn('availability').select('start_time').where({date: date});
    }else {
        data = await conn('availability').select('start_time').where({is_booked: false, date: date});
    }
    let cleaned = data.map(item => item.start_time);
    return cleaned;
}

export async function addAvailbility(date, start_time, end_time) {
    let newSlot = await conn('availability').insert({date: conn.raw('?::date', [date]), start_time, end_time}, ['*']);
    return newSlot
}


export async function updateSlot(id) {
    // updates the slot's is_booked to true, returns the updated entry
    let updated = await conn('availability').update({is_booked: true}, ['id', 'date', 'start_time', 'end_time', 'is_booked']).where({id: id});
    return updated;
}


export async function deleteSlot(id) {
    let deleted = await conn('availability').returning('*').del().where({id: id});
    return deleted;
}
