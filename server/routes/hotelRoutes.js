const express = require('express');
const { getHotels, createHotel, updateHotel, deleteHotel } = require('../controllers/hotelController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

// Public: Get all hotels
router.get('/', getHotels);

// Admin Only
router.post('/', authMiddleware, roleMiddleware('admin'), createHotel);
router.put('/:id', authMiddleware, roleMiddleware('admin'), updateHotel);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteHotel);

module.exports = router;
