const BookingModel = require('../models/booking.model');

const createBooking = async(bookingData)=>{
    return await BookingModel.create(bookingData);
};

const getBookingById = async(bookingId) => {
    return await BookingModel.findById(bookingId)
    .populate('service')
    .populate('user');
};

const updateBookingById = async(bookingId, bookingData)=>{
    return await BookingModel.findByIdAndUpdate(bookingId,bookingData,{
        new:true,
    });
};

const isSlotAlreadyBooked = async ({ mentor, dateAndTime }) => {
    const existing = await BookingModel.findOne({ mentor, dateAndTime });
    return !!existing; // returns true if a booking already exists
  };

const getUsersBooking = async(userId) =>{
    return await BookingModel.find({user:userId});
};

const getMentorBookings = async(mentorId)=>{
    return await BookingModel.find({mentor:mentorId});
};

module.exports = {
     createBooking,
     getBookingById,
     updateBookingById,
     getUsersBooking,
     getMentorBookings,
     isSlotAlreadyBooked
}