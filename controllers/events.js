const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async (req, res = response) => {
  const events = await Event.find().populate('user', 'name');
  try {
    return res.status(200).json({
      ok: true,
      events,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};

//*Create new Event

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);
  try {
    event.user = req.uid;
    const savedEvent = await event.save();

    //

    return res.status(200).json({
      ok: true,
      event: savedEvent,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};

//*Update Event

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  try {
    const event = await Event.findById(eventId);
    const uid = req.uid;

    if (!event) {
      return res.status(404).json({ ok: false, msg: 'No valid event' });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'You have no permission to modify this event',
      });
    }

    const newEvent = { ...req.body, user: uid };

    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    //
    return res.status(200).json({
      ok: true,
      event: updatedEvent,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};

//* Delete Event

const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;
  try {
    const event = await Event.findById(eventId);
    const uid = req.uid;
    if (!event) {
      return res.status(404).json({ ok: false, msg: 'No valid event' });
    }
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'You have no permission to modify this event',
      });
    }
    await Event.findByIdAndDelete(eventId);
    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};

module.exports = { getEvents, createEvent, deleteEvent, updateEvent };
