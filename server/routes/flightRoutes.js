const express = require('express');
const { getFlights, createFlight, updateFlight, deleteFlight } = require('../controllers/flightController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

// Public: Get all flights 
router.get('/', getFlights);

// Admin Only:
router.post('/', authMiddleware, roleMiddleware('admin'), createFlight);
router.put('/:id', authMiddleware, roleMiddleware('admin'), updateFlight);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteFlight);

module.exports = router;
