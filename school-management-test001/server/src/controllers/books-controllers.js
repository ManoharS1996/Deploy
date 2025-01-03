const { v4: uuid } = require('uuid')
const mongoose = require("mongoose")
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const Book = require('../models/book')


const getBook = async (req, res, next) => {

    let last
    let lastId
    let newId
    try {
        const long = (await Book.find({})).length
        if (long) {
            last = await Book.findOne().sort({ _id: -1 }); // Sort by _id in descending order
            lastId = parseInt(last.book_id.slice(1)); // Extract numeric part

        } else {
            lastId = 0
            // console.log("No documents found.");
        }
        const prefix = "B";
        const newNumber = lastId + 1;
        const paddedNumber = newNumber.toString().padStart(7, "0"); // Pads with leading zeros
        newId = prefix + paddedNumber;
        // console.log(newId)

    }
    catch (err) {
        const error = new HttpError(`Creating Book failed, Please try again. ${err}`, 500)
        return next(error)
    }

    let books
    try {
        books = await Book.find({})
        // .skip(0)
        // .limit(20)

    }
    catch (err) {
        const error = new HttpError(`Fetching Book failed, please try again later. ${err}`, 500)
        return next(error)
    }
    res.json({ books: books.map(book => book.toObject({ getters: true })), newId: newId })
}

const getBookById = async (req, res, next) => {
    const bookId = req.params.sid;
    let book
    try {
        book = await Book.find({ book_id: bookId })

    } catch (err) {
        const error = new HttpError(`Something went wrong, could not find a book.${err}`, 500)
        return next(error)
    }

    // const place = DUMMY.find((p) => {
    //     return p.id === placeId;
    // })

    if (!book) {
        throw new HttpError('Could not find a book for the provided id.', 404)
        return next(error)
        // error.code = 404
        // throw error
        // return res.status(404).json({ message: 'Could not find a place for the provided id.' })
    }

    // console.log("GET Request in Places", institute);
    res.json({ book: book })
}

const putId = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // console.log(errors)
        // res.status(422)
        throw new HttpError('Invalid inputs passed, please check your data')
    }


    const {
        book_id,book_name,book_description,
        copies,book_author,book_category,book_publishers,book_purchase_date,
        book_price,book_status,book_created_at
    } = req.body

    const createdBook = new Book({
        book_id,book_name,book_description,
        copies,book_author,book_category,book_publishers,book_purchase_date,
        book_price,book_status,book_created_at
    })
    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await createdBook.save({ session: sess })
        await sess.commitTransaction()
        sess.endSession();

    }
    catch (err) {
        const error = new HttpError(`Creating book failed, Please try again. ${err}`, 500)
        return next(error)
    }

    // DUMMY.push(createdPlace)
// console.log({ book: createdDiary })
    res.status(201).json({ book: createdBook })
}

const createBook = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // console.log(errors)
        // res.status(422)
        throw new HttpError('Invalid inputs passed, please check your data')
    }

    const {
        book_name,book_description,
        copies,book_author,book_category,book_publishers,book_purchase_date,
        book_price,book_status,
    } = req.body

    const bookId = req.params.aid
    // console.log(studentId)

    let book
    try {
        book = await Book.find({ book_id: bookId })
        // console.log(book)
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update book.${err}`, 500)
        return next(error)
    }
    book = book[0]

    // const updatedPlace = DUMMY.find(p => p.id === placeId)
    // const placeIndex = DUMMY.find(p => p.id === placeId)
    
    book.book_name=book_name
    book.book_description=book_description 
    book.copies=copies
    book.book_author=book_author
    book.book_publishers=book_publishers
    book.book_purchase_date=book_purchase_date
    book.book_category=book_category
    book.book_price=book_price
    book.book_status=book_status
    
    try {
        await book.save()
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update book.${err}`, 500)
        return next(error)
    }

    // DUMMY[placeIndex] = updatedPlace

    res.status(200).json({ book })
}

const updateBook = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // res.status(422)
        return next(new HttpError('Invalid inputs passed, please check your data'))
    }

    const { book_name,book_description,
        copies,book_author,book_category,book_publishers,book_purchase_date,
        book_price,book_status,
    } = req.body
    const bookId = req.params.sid

    let book
    try {
        book = await Book.find({ book_id: bookId })
        console.log(book)

    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update book.${err}`, 500)
        return next(error)
    }
    book = book[1]

    // const updatedPlace = DUMMY.find(p => p.id === placeId)
    // const placeIndex = DUMMY.find(p => p.id === placeId)
    book.book_name=book_name
    book.book_description=book_description
    book.copies=copies
    book.book_author=book_author
    book.book_publishers=book_publishers
    book.book_purchase_date=book_purchase_date
    book.subject=subject
    book.book_category=book_category
    book.book_price=book_price
    book.book_status=book_status

    try {
        await book.save()
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update book.${err}`, 500)
        return next(error)
    }

    // DUMMY[placeIndex] = updatedPlace

    res.status(200).json({ book })
}

const searchBook = async (req, res, next) => {
    const search = req.params.sid;
    console.log(req.query)
    let books
    try {
        books = await Book.find({
            $or: [
                { book_id: { $regex: search, $options: 'i' } },
                { book_name: { $regex: search, $options: 'i' } },
                { book_description: { $regex: search, $options: 'i' } },
                { copies: { $regex: search, $options: 'i' } },
                { book_author: { $regex: search, $options: 'i' } },
                { book_category: { $regex: search, $options: 'i' } },
                { book_price: { $regex: search, $options: 'i' } },
                { book_status: { $regex: search, $options: 'i' } },
            ]
        });
      
    } catch (err) {
        const error = new HttpError(`Something went wrong, could not find a book.${err}`, 500)
        return next(error)
    }

    // const place = DUMMY.find((p) => {
    //     return p.id === placeId;
    // })

    if (!books) {
        throw new HttpError('Could not find a book for the provided id.', 404)
        return next(error)
        // error.code = 404
        // throw error
        // return res.status(404).json({ message: 'Could not find a place for the provided id.' })
    }

    // console.log("GET Request in Places", institute);
    res.json({ books: books })
}

const deleteBook = async (req, res, next) => {
    const bookId = req.params.sid
    // console.log(schoolId)
    let book
    try {
        book = await Book.findOne({ book_id: bookId }) 
             // console.log(school)
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not delete book. ${err}`, 500)
        return next(error)
    }

    // if (!DUMMY.find(p => p.id === placeId)) {
    //     throw new HttpError('Could not find a place for that id', 404)
    // }

    // DUMMY = DUMMY.filter(p => p.id !== placeId)

    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await book.deleteOne({ session: sess })
        await sess.commitTransaction()
        sess.endSession();

    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not delete book. ${err}`, 500)
        return next(error)
    }

    res.status(200).json({ message: 'Deleted book.' })
}

exports.getBook = getBook
exports.getBookById = getBookById
exports.putId = putId;
exports.createBook= createBook
exports.updateBook = updateBook
exports.searchBook = searchBook
exports.deleteBook = deleteBook