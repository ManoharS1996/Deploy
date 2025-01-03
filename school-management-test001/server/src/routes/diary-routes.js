const express = require("express");
const { check } = require('express-validator')

const diaryControllers = require('../controllers/diary-controllers')

const HttpError = require('../models/http-error')

const router = express.Router();

router.get("/", diaryControllers.getDiary)

router.get("/:sid", diaryControllers.getDiaryById)

router.post("/", diaryControllers.putId);

router.patch('/:aid', [
    check('diarys').not().isEmpty(),
    check('date').not().isEmpty(),
    check('subject').not().isEmpty(),
], diaryControllers.createDiary)

router.patch('/:sid', diaryControllers.updateDiary)

router.get('/get/:sid', diaryControllers.searchDiary)

router.delete('/:sid', diaryControllers.deleteDiary)

module.exports = router;
