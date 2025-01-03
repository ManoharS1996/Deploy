const express = require("express");
const { check } = require('express-validator')

const careControllers = require('../controllers/care-controllers')

const HttpError = require('../models/http-error')

const router = express.Router();

router.get("/", careControllers.getCare)

router.get("/:sid", careControllers.getCareById)

router.post("/", careControllers.putId);

router.patch('/:aid', [
    check('care_name').not().isEmpty(),
    check('student_name').not().isEmpty(),
    check('care_status').not().isEmpty(),
], careControllers.createCare)

router.patch('/:sid', careControllers.updateCare)

router.get('/get/:sid', careControllers.searchCare)

router.delete('/:sid', careControllers.deleteCare)

module.exports = router;
