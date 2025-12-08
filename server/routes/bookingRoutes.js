const express = require('express');
const { createBooking, getUserBookings, cancelBooking, getAllBookings } = require('../controllers/bookingController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

// User: Create booking
router.post('/', authMiddleware, createBooking);

// User: Get their own bookings
router.get('/', authMiddleware, getUserBookings);

// User: Cancel a booking
router.delete('/:id', authMiddleware, cancelBooking);

// Admin: View all bookings
router.get('/admin', authMiddleware, roleMiddleware('admin'), getAllBookings);

module.exports = router;
