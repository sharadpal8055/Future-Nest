import Resource from "../models/resource.model.js";
import { createResourceSchema } from "../validators/resource.validator.js";

export async function createResource(req, res, next) {
  try {
    const data = createResourceSchema.parse(req.body);

    const resource = await Resource.create({
      ...data,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      resource,
    });
  } catch (error) {
    next(error);
  }
}

export async function getResources(req, res, next) {
  try {
    const resources = await Resource.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      resources,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteResource(req, res, next) {
  try {
    const resource = await Resource.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    res.json({
      success: true,
      message: "Resource deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}