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

//Route to get event details
router.get("/:id", eventDetails);

//route to register for an event
router.post("/:id/register", registerForEvent);

//cancel registration
router.delete("/:id/cancel", cancelRegistration);

//upcoming events
router.get("/upcoming", upcomingEvents);

//event stats
router.get("/:id/stats", getStats);

export default router;
