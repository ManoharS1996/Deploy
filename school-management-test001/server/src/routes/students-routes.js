const express = require("express");
const { check } = require('express-validator')

const studentsControllers = require('../controllers/students-controllers')

const HttpError = require('../models/http-error')

const router = express.Router();

router.get("/", studentsControllers.getStudents)

router.get("/:sid", studentsControllers.getStudentById)

router.post("/", studentsControllers.putId);

router.patch('/:aid', [
    check('student_name').not().isEmpty(),
    check('student_class').not().isEmpty(),
    check('student_contact').not().isEmpty(),
], studentsControllers.createStudent)

router.patch('/:sid', studentsControllers.updateStudent)

router.get('/get/:sid', studentsControllers.searchStudents)

router.delete('/:sid', studentsControllers.deleteStudent)

module.exports = router;
