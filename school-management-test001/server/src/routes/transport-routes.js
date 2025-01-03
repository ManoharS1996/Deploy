const express = require("express");
const { check } = require('express-validator')

const transportControllers = require('../controllers/transport-controllers')

const HttpError = require('../models/http-error')

const router = express.Router();

router.get("/", transportControllers.getTransport)

router.get("/:sid", transportControllers.getTransportById)

router.post("/",[
    check('student_id').not().isEmpty(),
    check('student_name').not().isEmpty(),
    check('transport_pickup').not().isEmpty(),
    check('transport_busfee').not().isEmpty(),
], transportControllers.putId);

router.patch('/:aid', [
    check('student_name').not().isEmpty(),
    check('transport_pickup').not().isEmpty(),
    check('transport_busfee').not().isEmpty(),
], transportControllers.createTransport)

router.patch('/:sid', transportControllers.updateTransport)

router.get('/get/:sid', transportControllers.searchTransport)

router.delete('/:sid', transportControllers.deleteTransport)

module.exports = router;
