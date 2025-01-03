const express = require("express");
const { check } = require('express-validator')

const schoolsControllers = require('../controllers/schools-controllers')

const HttpError = require('../models/http-error')

const router = express.Router();

router.get("/", schoolsControllers.getSchools)

router.get("/:sid", schoolsControllers.getSchoolById)

router.post("/", schoolsControllers.putId);

router.patch('/:aid', [
    check('institute_name').not().isEmpty(),
    check('institute_type').isLength({ min: 5 }),
    check('institute_contact').not().isEmpty(),
], schoolsControllers.createSchool)

router.patch('/:sid', schoolsControllers.updateSchool)

router.get('/get/:sid', schoolsControllers.searchSchools)

router.delete('/:sid', schoolsControllers.deleteSchool)

module.exports = router;
