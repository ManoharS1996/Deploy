const express = require("express");
const { check } = require('express-validator')

const assignmentControllers = require('../controllers/assignments-controllers')

const HttpError = require('../models/http-error')

const router = express.Router();

router.get("/", assignmentControllers.getAssignment)

router.get("/:sid", assignmentControllers.getAssignmentById)

router.post("/", assignmentControllers.putId);

router.patch('/:aid', [
    check('assignment_name').not().isEmpty(),
    check('staff_name').not().isEmpty(),
    check('subject').not().isEmpty(),
], assignmentControllers.createAssignment)

router.patch('/:sid', assignmentControllers.updateAssignment)

router.get('/get/:sid', assignmentControllers.searchAssignment)

router.delete('/:sid', assignmentControllers.deleteAssignment)

module.exports = router;
