
import { Router } from "express";
import { createBooking, getAllBookings, getBookingsByEmail, updateBookingStatus } from "../controllers/booking_controller.js";
import { getAvailableDays, addTimeSlot } from "../controllers/slot_controllers.js";

export const router = Router();

router.get('/bookings', getAllBookings);
router.post('/bookings', createBooking);


router.get('/bookings/by-email/:email', getBookingsByEmail);
router.put('/bookings/status/:id', updateBookingStatus);

router.get('/available', getAvailableDays);
router.post('/available', addTimeSlot)