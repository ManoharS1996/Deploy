const express = require("express");
const { check } = require('express-validator')

const staffControllers = require('../controllers/staffs-controllers')

const HttpError = require('../models/http-error')

const router = express.Router();

router.get("/", staffControllers.getStaff)

router.get("/:sid", staffControllers.getStaffById)

router.post("/", staffControllers.putId);

router.patch('/:aid', [
    check('staff_name').not().isEmpty(),
    check('staff_class').not().isEmpty(),
    check('staff_contact').not().isEmpty(),
], staffControllers.createStaff)

router.patch('/:sid', staffControllers.updateStaff)

router.get('/get/:sid', staffControllers.searchStaff)

router.delete('/:sid', staffControllers.deleteStaff)

module.exports = router;
