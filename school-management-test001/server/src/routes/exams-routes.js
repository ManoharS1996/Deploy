const express = require("express");
const { check } = require('express-validator')

const examControllers = require('../controllers/exams-controllers')

const HttpError = require('../models/http-error')

const router = express.Router();

router.get("/", examControllers.getExam)

router.get("/:sid", examControllers.getExamById)

router.post("/", examControllers.putId);

router.patch('/:aid', [
    check('exam_name').not().isEmpty(),
    check('exam_status').not().isEmpty(),
    check('timetable').not().isEmpty(),
], examControllers.createExam)

router.patch('/:sid', examControllers.updateExam)

router.get('/get/:sid', examControllers.searchExam)

router.delete('/:sid', examControllers.deleteExam)

module.exports = router;
