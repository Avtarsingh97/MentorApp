const ApiError = require("../helper/apiError");
const ServiceModel = require("../models/service.model");
const serviceService = require("../services/service.service");
const httpStatus = require("../util/httpStatus");

const createService = async (req, res, next) => {
  
  try {
    const mentorId = req.user._id;
    const { serviceName, description, duration, price } = req.body;

    const service = await serviceService.createService({
      mentor: mentorId,
      serviceName,
      description,
      duration,
      price,
    });
  
    res.status(httpStatus.created).json({
      success: true,
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    next(error);
  }
};

const updateService = async (req, res, next) => {
  try {
    const serviceId = req.params.serviceId;
    const mentorId = req.user._id;
    const { name, description, duration, price, active } = req.body;
    
    const updatedService = await serviceService.updateService(serviceId, mentorId, { name, description, duration, price, active });

    if (!updatedService) {
      throw new ApiError(httpStatus.notFound, "Service not found");
    }

    res.status(httpStatus.ok).json({
      success: true,
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (error) {
    next(error);
  }
};

const getServiceByMentor = async (req, res, next) => {
  try {
    console.log(req);
    const mentorId = req.user._id;
        
    const service = await serviceService.getServiceByMentor(mentorId);

    if (!service || service.length === 0) {
      return res.status(httpStatus.notFound).json({
        success: false,
        message: "No services found for this mentor",
      });
    }

    res.status(httpStatus.ok).json({
      success: true,
      service,
    });
  } catch (error) {
    next(error);
  }
};

const getServiceById = async (req, res, next) => {
  try {
    const serviceId = req.user._id;
    const service = await serviceService.getServicebyId(serviceId);
        
    if (!serviceId) {
      return res.status(httpStatus.notFound).json({
        success: false,
        message: "Service not found!!",
      });
    }

    res.status(httpStatus.ok).json({
      success: true,
      service,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createService,
  updateService,
  getServiceByMentor,
  getServiceById,
};
