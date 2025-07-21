
import { Router } from "express";
import { createBooking, getAllBookings, getBookingsByEmail, updateBookingStatus } from "../controllers/booking_controller.js";

export const router = Router();

router.get('/bookings', getAllBookings);
router.post('/bookings', createBooking);


router.get('/bookings/by-email/:email', getBookingsByEmail);
router.put('/bookings/status/:id', updateBookingStatus);