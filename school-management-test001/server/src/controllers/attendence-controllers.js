const { v4: uuid } = require('uuid')
const mongoose = require("mongoose")
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const Attendence = require('../models/attendence')
const Student = require('../models/student')


const getAttendence = async (req, res, next) => {

    let attendences
    try {
        attendences = await Attendence.find({})
        // .skip(0)
        // .limit(20)

    }
    catch (err) {
        const error = new HttpError(`Fetching Attendence failed, please try again later. ${err}`, 500)
        return next(error)
    }
    res.json({ attendences: attendences.map(attendence => attendence.toObject({ getters: true })) })
}

const getAttendenceByDate = async (req, res, next) => {
    const attendenceDate = req.params.sid;
    let attendence
    try {
        attendence = await Attendence.find({ attendence_date: attendenceDate })

    } catch (err) {
        const error = new HttpError(`Something went wrong, could not find a attendence.${err}`, 500)
        return next(error)
    }

    // const place = DUMMY.find((p) => {
    //     return p.id === placeId;
    // })

    if (!attendence) {
        throw new HttpError('Could not find a attendence for the provided id.', 404)
        return next(error)
        // error.code = 404
        // throw error
        // return res.status(404).json({ message: 'Could not find a place for the provided id.' })
    }

    // console.log("GET Request in Places", institute);
    res.json({ attendence: attendence })
}

const putId = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // console.log(errors)
        // res.status(422)
        throw new HttpError('Invalid inputs passed, please check your data')
    }


    const {
        attendence_id, student_id, student_roll,
        student_name, student_class, student_section, attendence_date,
        attendence_status, attendence_modified_date, attendence_created_at
    } = req.body

    const createdAttendence = new Attendence({
        attendence_id, student_id, student_roll,
        student_name, student_class, student_section, attendence_date,
        attendence_status, attendence_modified_date, attendence_created_at
    })
    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await createdAttendence.save({ session: sess })
        await sess.commitTransaction()
        sess.endSession();

    }
    catch (err) {
        const error = new HttpError(`Creating assignment failed, Please try again. ${err}`, 500)
        return next(error)
    }

    // DUMMY.push(createdPlace)
    // console.log({ assignment: createdDiary })
    res.status(201).json({ Attendence: createdAttendence })
};

const createAttendence = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // console.log(errors)
        // res.status(422)
        throw new HttpError('Invalid inputs passed, please check your data')
    }

    const {
        attendence_status, attendence_modified_date
    } = req.body
    const attendenceId = req.params.aid
    // console.log(attendenceId)

    let attendence
    try {
        attendence = await Attendence.find({ attendence_id: attendenceId })
        // console.log(attendence)
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update attendence.${err}`, 500)
        return next(error)
    }
    attendence = attendence[0]

    // const updatedPlace = DUMMY.find(p => p.id === placeId)
    // const placeIndex = DUMMY.find(p => p.id === placeId)

    attendence.attendence_status = attendence_status
    attendence.attendence_modified_date = attendence_modified_date

    try {
        await attendence.save()
        console.log(attendence)
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update attendence.${err}`, 500)
        return next(error)
    }

    // DUMMY[placeIndex] = updatedPlace

    res.status(200).json({ attendence })
}

const updateAttendence = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // res.status(422)
        return next(new HttpError('Invalid inputs passed, please check your data'))
    }

    const { student_id, student_roll,
        student_name, student_class, student_section, attendence_date,
        attendence_status, attendence_modified_date
    } = req.body
    const attendenceId = req.params.sid

    let attendence
    try {
        attendence = await Attendence.find({ attendence_id: attendenceId })
        console.log(attendence)

    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update attendence.${err}`, 500)
        return next(error)
    }
    attendence = attendence[1]

    // const updatedPlace = DUMMY.find(p => p.id === placeId)
    // const placeIndex = DUMMY.find(p => p.id === placeId)
    attendence.student_id = student_id
    attendence.student_roll = student_roll
    attendence.student_name = student_name
    attendence.student_class = student_class
    attendence.student_section = student_section
    attendence.attendence_date = attendence_date
    attendence.attendence_status = attendence_status
    attendence.attendence_modified_date = attendence_modified_date

    try {
        await attendence.save()
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update attendence.${err}`, 500)
        return next(error)
    }

    // DUMMY[placeIndex] = updatedPlace

    res.status(200).json({ attendence })
}

const searchAttendence = async (req, res, next) => {
    const search = req.params.sid;
    console.log(req.query)
    let attendences
    try {
        attendences = await Attendence.find({
            $or: [
                { attendence_id: { $regex: search, $options: 'i' } },
                { student_name: { $regex: search, $options: 'i' } },
                { student_roll: { $regex: search, $options: 'i' } },
                { student_class: { $regex: search, $options: 'i' } },
                { student_contact: { $regex: search, $options: 'i' } },
                { student_id: { $regex: search, $options: 'i' } },
                { attendence_status: { $regex: search, $options: 'i' } },
            ]
        });
    } catch (err) {
        const error = new HttpError(`Something went wrong, could not find a attendence.${err}`, 500)
        return next(error)
    }

    // const place = DUMMY.find((p) => {
    //     return p.id === placeId;
    // })

    if (!attendences) {
        throw new HttpError('Could not find a attendence for the provided id.', 404)
        return next(error)
        // error.code = 404
        // throw error
        // return res.status(404).json({ message: 'Could not find a place for the provided id.' })
    }

    // console.log("GET Request in Places", institute);
    res.json({ attendences: attendences })
}

const deleteAttendence = async (req, res, next) => {
    const attendenceId = req.params.sid
    // console.log(schoolId)
    let attendence
    try {
        attendence = await Attendence.findOne({ attendence_id: attendenceId })
        // console.log(school)
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not delete attendence. ${err}`, 500)
        return next(error)
    }

    // if (!DUMMY.find(p => p.id === placeId)) {
    //     throw new HttpError('Could not find a place for that id', 404)
    // }

    // DUMMY = DUMMY.filter(p => p.id !== placeId)

    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await attendence.deleteOne({ session: sess })
        await sess.commitTransaction()
        sess.endSession();

    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not delete attendence. ${err}`, 500)
        return next(error)
    }

    res.status(200).json({ message: 'Deleted attendence.' })
}

exports.getAttendence = getAttendence
exports.getAttendenceByDate = getAttendenceByDate
exports.putId = putId;
exports.createAttendence = createAttendence
exports.updateAttendence = updateAttendence
exports.searchAttendence = searchAttendence
exports.deleteAttendence = deleteAttendence