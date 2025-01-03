const { v4: uuid } = require('uuid')
const mongoose = require("mongoose")
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const Exam = require('../models/exam')


const getExam = async (req, res, next) => {

    let last
    let lastId
    let newId
    try {
        const long = (await Exam.find({})).length
        if (long) {
            last = await Exam.findOne().sort({ _id: -1 }); // Sort by _id in descending order
            lastId = parseInt(last.exam_id.slice(2)); // Extract numeric part

        } else {
            lastId = 0
            // console.log("No documents found.");
        }
        const prefix = "EX";
        const newNumber = lastId + 1;
        const paddedNumber = newNumber.toString().padStart(6, "0"); // Pads with leading zeros
        newId = prefix + paddedNumber;
        // console.log(newId)

    }
    catch (err) {
        const error = new HttpError(`Creating Exam failed, Please try again. ${err}`, 500)
        return next(error)
    }

    let exams
    try {
        exams = await Exam.find({})
        // .skip(0)
        // .limit(20)

    }
    catch (err) {
        const error = new HttpError(`Fetching exams failed, please try again later. ${err}`, 500)
        return next(error)
    }
    res.json({ exams: exams.map(exam => exam.toObject({ getters: true })), newId: newId })
}

const getExamById = async (req, res, next) => {
    const examId = req.params.sid;
    let exam
    try {
        exam = await Exam.find({ exam_id: examId })

    } catch (err) {
        const error = new HttpError(`Something went wrong, could not find a exam.${err}`, 500)
        return next(error)
    }

    // const place = DUMMY.find((p) => {
    //     return p.id === placeId;
    // })

    if (!exam) {
        throw new HttpError('Could not find a exam for the provided id.', 404)
        return next(error)
        // error.code = 404
        // throw error
        // return res.status(404).json({ message: 'Could not find a place for the provided id.' })
    }

    // console.log("GET Request in Places", institute);
    res.json({ exam: exam })
}

const putId = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // console.log(errors)
        // res.status(422)
        throw new HttpError('Invalid inputs passed, please check your data')
    }


    const {
        exam_id, exam_name, start_date,
        end_date, timetable, exam_status, exam_created_at
    } = req.body

    const createdExam = new Exam({
        exam_id, exam_name, start_date,
        end_date, timetable, exam_status, exam_created_at
    })
    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await createdExam.save({ session: sess })
        await sess.commitTransaction()
        sess.endSession();

    }
    catch (err) {
        const error = new HttpError(`Creating exam failed, Please try again. ${err}`, 500)
        return next(error)
    }

    // DUMMY.push(createdPlace)
    // console.log({ exam: createdDiary })
    res.status(201).json({ exam: createdExam })
}

const createExam = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // console.log(errors)
        // res.status(422)
        throw new HttpError('Invalid inputs passed, please check your data')
    }

    const {
        exam_name, start_date,
        end_date, timetable, exam_status,
    } = req.body
    const examId = req.params.aid
    // console.log(studentId)

    let exam
    try {
        exam = await Exam.find({ exam_id: examId })
        // console.log(exam)
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update exam.${err}`, 500)
        return next(error)
    }
    exam = exam[0]

    // const updatedPlace = DUMMY.find(p => p.id === placeId)
    // const placeIndex = DUMMY.find(p => p.id === placeId)
    exam.exam_name = exam_name
    exam.start_date = start_date
    exam.end_date = end_date
    exam.timetable = timetable
    exam.exam_status = exam_status

    try {
        await exam.save()
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update exam.${err}`, 500)
        return next(error)
    }

    // DUMMY[placeIndex] = updatedPlace

    res.status(200).json({ exam })
}

const updateExam = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // res.status(422)
        return next(new HttpError('Invalid inputs passed, please check your data'))
    }

    const { exam_name, start_date,
        end_date, timetable, exam_status,
    } = req.body
    const examId = req.params.sid

    let exam
    try {
        exam = await Exam.find({exam_id: examId })
        console.log(exam)

    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update exam.${err}`, 500)
        return next(error)
    }
    exam = exam[1]

    // const updatedPlace = DUMMY.find(p => p.id === placeId)
    // const placeIndex = DUMMY.find(p => p.id === placeId)
    exam.exam_name = exam_name
    exam.start_date = start_date
    exam.end_date = end_date
    exam.timetable = timetable
    exam.exam_status = exam_status

    try {
        await exam.save()
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update exam.${err}`, 500)
        return next(error)
    }

    // DUMMY[placeIndex] = updatedPlace

    res.status(200).json({ exam })
}

const searchExam = async (req, res, next) => {
    const search = req.params.sid;
    console.log(req.query)
    let exams
    try {
        exams = await Exam.find({
            $or: [
                { exam_id: { $regex: search, $options: 'i' } },
                { exam_name: { $regex: search, $options: 'i' } },
                { start_date: { $regex: search, $options: 'i' } },
                { end_date: { $regex: search, $options: 'i' } },
                { timetable: { $regex: search, $options: 'i' } },
                { exam_status: { $regex: search, $options: 'i' } },
            ]
        });
    } catch (err) {
        const error = new HttpError(`Something went wrong, could not find a exam.${err}`, 500)
        return next(error)
    }

    // const place = DUMMY.find((p) => {
    //     return p.id === placeId;
    // })

    if (!exams) {
        throw new HttpError('Could not find a exam for the provided id.', 404)
        return next(error)
        // error.code = 404
        // throw error
        // return res.status(404).json({ message: 'Could not find a place for the provided id.' })
    }

    // console.log("GET Request in Places", institute);
    res.json({ exams: exams })
}

const deleteExam = async (req, res, next) => {
    const examId = req.params.sid
    // console.log(schoolId)
    let exam
    try {
        exam = await Exam.findOne({ exam_id: examId })
        // console.log(school)
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not delete exam. ${err}`, 500)
        return next(error)
    }

    // if (!DUMMY.find(p => p.id === placeId)) {
    //     throw new HttpError('Could not find a place for that id', 404)
    // }

    // DUMMY = DUMMY.filter(p => p.id !== placeId)

    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await exam.deleteOne({ session: sess })
        await sess.commitTransaction()
        sess.endSession();

    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not delete exam. ${err}`, 500)
        return next(error)
    }

    res.status(200).json({ message: 'Deleted exam.' })
}

exports.getExam = getExam
exports.getExamById = getExamById
exports.putId = putId;
exports.createExam = createExam
exports.updateExam = updateExam
exports.searchExam = searchExam
exports.deleteExam = deleteExam