import express from "express";
const router = express.Router();
import {
  createEvent,
  eventDetails,
  registerForEvent,
  cancelRegistration,
  upcomingEvents,
  getStats,
} from "../controller/eventController.js";
//Route to create a new event
router.post("/create", createEvent);

//upcoming events
router.get("/upcoming", upcomingEvents);

//Route to get event details
router.get("/:id", eventDetails);

//route to register for an event
router.post("/:id/register", registerForEvent);

//cancel registration
router.delete("/:id/cancel", cancelRegistration);

//event stats
router.get("/:id/stats", getStats);

export default router;
