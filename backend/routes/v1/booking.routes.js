const express = require('express');
const asyncHandler = require('../../helper/asyncHandler');
const validate = require('../../middleware/validate');
const auth = require('../../middleware/auth');
const bookingController = require('../../controllers/booking.controller');
const {initiateBookingValidation} = require('../../validations/booking.validation');

const router = express.Router();

router.get('/', auth.protect, asyncHandler(bookingController.getBookings));

router.get('/mentor', auth.protect, auth.restrictTo('mentor'), asyncHandler(bookingController.getMentorBookings));

router.post('/initiate-booking', validate(initiateBookingValidation),auth.protect, asyncHandler(bookingController.initiateBookingAndPayment));

module.exports = router;