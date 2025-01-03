const express = require("express");
const { check } = require('express-validator')

const attendenceControllers = require('../controllers/attendence-controllers')

const HttpError = require('../models/http-error')

const router = express.Router();

router.get("/", attendenceControllers.getAttendence)

router.get("/:sid", attendenceControllers.getAttendenceByDate)

router.post("/", attendenceControllers.putId);

router.patch('/:aid', [
    check('attendence_status').not().isEmpty(),
], attendenceControllers.createAttendence)

router.patch('/:sid', attendenceControllers.updateAttendence)

router.get('/get/:sid', attendenceControllers.searchAttendence)

router.delete('/:sid', attendenceControllers.deleteAttendence)

module.exports = router;
