import express from "express";

import {
  createResource,
  getResources,
  deleteResource,
} from "../controllers/resource.controller.js";

import  protect  from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createResource);
router.get("/", getResources);
router.delete("/:id", deleteResource);

export default router;