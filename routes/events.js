/* 
    User routes / Events
    host+/api/events
 */

const { Router } = require('express');
const { validateJWT } = require('../middlewares/jwt-validator');
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/events');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validators');
const { isDate } = require('../helpers/isDate');

const router = Router();
router.use(validateJWT);

//! All Items should go through the JWT validator
//Get events
router.get('/', getEvents);

//* Create new Event

router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom(isDate),
    fieldValidator,
  ],
  createEvent
);

//* Update event with id

router.put('/:id', updateEvent);

//* Delete event
router.delete('/:id', deleteEvent);

module.exports = router;
