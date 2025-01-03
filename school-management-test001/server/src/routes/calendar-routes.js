const express = require("express");
const { check } = require('express-validator')

const calendarControllers = require('../controllers/calendar-controllers')

const HttpError = require('../models/http-error')

const router = express.Router();

router.get("/", calendarControllers.getCalendar)

router.get("/:sid", calendarControllers.getCalendarById)

router.post("/", calendarControllers.putId);

// router.patch('/:aid', [
//     check('book_name').not().isEmpty(),
//     check('copies').not().isEmpty(),
//     check('book_category').not().isEmpty(),
// ], calendarControllers.createBook)

// router.patch('/:sid', calendarControllers.updateBook)

// router.get('/get/:sid', calendarControllers.searchBook)

router.delete('/:sid', calendarControllers.deleteCalendar)

module.exports = router;
