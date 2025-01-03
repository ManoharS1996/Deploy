const express = require("express");
const { check } = require('express-validator')

const bookControllers = require('../controllers/books-controllers')

const HttpError = require('../models/http-error')

const router = express.Router();

router.get("/", bookControllers.getBook)

router.get("/:sid", bookControllers.getBookById)

router.post("/", bookControllers.putId);

router.patch('/:aid', [
    check('book_name').not().isEmpty(),
    check('copies').not().isEmpty(),
    check('book_category').not().isEmpty(),
], bookControllers.createBook)

router.patch('/:sid', bookControllers.updateBook)

router.get('/get/:sid', bookControllers.searchBook)

router.delete('/:sid', bookControllers.deleteBook)

module.exports = router;
