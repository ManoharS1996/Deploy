const express = require("express");
const { check } = require('express-validator')

const circularControllers = require('../controllers/circulars-controllers')

const HttpError = require('../models/http-error')

const router = express.Router();

router.get("/", circularControllers.getCircular)

router.get("/:sid", circularControllers.getCircularById)

router.post("/", circularControllers.putId);

router.patch('/:aid', [
    check('circular_title').not().isEmpty(),
    check('circular_subject').not().isEmpty(),
    check('circular_date').not().isEmpty(),
], circularControllers.createCircular)

router.patch('/:sid', circularControllers.updateCircular)

router.get('/get/:sid', circularControllers.searchCircular)

router.delete('/:sid', circularControllers.deleteCircular)

module.exports = router;
