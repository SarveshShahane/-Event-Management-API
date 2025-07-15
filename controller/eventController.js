import Event from "../models/eventModel.js";
import User from "../models/userModel.js";



//create event logic
export const createEvent = async (req, res) => {
  try {
    const { title, dateTime, location, capacity } = req.body;
    if (!title || !dateTime || !location || !capacity) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (capacity && capacity > 0 && (capacity < 1 || capacity > 1000)) {
      return res
        .status(400)
        .json({ message: "Capacity must be between 1 and 1000" });
    }
    if (!Date.parse(dateTime)) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const newEvent = new Event({
      title,
      dateTime: new Date(dateTime),
      location,
      capacity: capacity,
    });
    await newEvent.save();
    return res
      .status(201)
      .json({ message: "Event created successfully", eventId: newEvent._id });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};


//event details logic
export const eventDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id).populate({
      path: "registrations",
      select: "name email",
    });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    return res.status(200).json(event);
  } catch (e) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const registerForEvent = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    //check date
    if (new Date(event.dateTime) < new Date()) {
      return res.status(400).json({ message: "Event has already occurred" });
    }

    //check if user is already registered
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email });
      await user.save();
    }
    if (event.registrations.includes(user._id)) {
      return res
        .status(409)
        .json({ message: "User already registered for this event" });
    }
    //check if the event is full
    if (event.capacity && event.registrations.length >= event.capacity) {
      return res.status(400).json({ message: "Event is full" });
    }

    event.registrations.push(user._id);
    await event.save();
    return res
      .status(200)
      .json({ message: "Registration successful", userId: user._id });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};


//cancel registration logic
export const cancelRegistration = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!event.registrations.includes(user._id)) {
      return res
        .status(400)
        .json({ message: "User not registered for this event" });
    }
    event.registrations = event.registrations.filter(
      (registration) => registration.toString() !== user._id.toString()
    );
    await event.save();
    return res
      .status(200)
      .json({ message: "Registration cancelled successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Server error" });
  }
};


//upcoming events logic
export const upcomingEvents = async (req, res) => {
  try {
    const events = await Event.find({
      dateTime: { $gte: new Date() },
    });

    events.sort((a, b) => {
      const dateDifference = new Date(a.dateTime) - new Date(b.dateTime);
      if (dateDifference > 0) return dateDifference;

      return a.location.localeCompare(b.location);
    });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


//event stats logic
export const getStats = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    const stats = {
      totalRegistrations: event.registrations.length,
      remainingCapacity: event.capacity
        ? event.capacity - event.registrations.length
        : null,
      percentCapacityUser: event.capacity
        ? ((event.registrations.length / event.capacity) * 100).toFixed(2)
        : null,
    };
    return res.status(200).json(stats);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
