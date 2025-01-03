const { v4: uuid } = require('uuid')
const mongoose = require("mongoose")
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const Care = require('../models/care')


const getCare = async (req, res, next) => {

    let cares
    try {
        cares = await Care.find({})
        // .skip(0)
        // .limit(20)

    }
    catch (err) {
        const error = new HttpError(`Fetching cares failed, please try again later. ${err}`, 500)
        return next(error)
    }
    res.json({ cares: cares.map(care => care.toObject({ getters: true })) })
}

const getCareById = async (req, res, next) => {
    let last
    let lastId
    let newId
    try {
        const long = (await Care.find({})).length
        if (long) {
            last = await Care.findOne().sort({ _id: -1 }); // Sort by _id in descending order
            lastId = parseInt(last.care_id.slice(2)); // Extract numeric part

        } else {
            lastId = 0
            // console.log("No documents found.");
        }
        const prefix = "CR";
        const newNumber = lastId + 1;
        const paddedNumber = newNumber.toString().padStart(6, "0"); // Pads with leading zeros
        newId = prefix + paddedNumber;
        // console.log(newId)

    }
    catch (err) {
        const error = new HttpError(`Creating Care failed, Please try again. ${err}`, 500)
        return next(error)
    }


    const studentId = req.params.sid;
    let cares
    try {
        cares = await Care.find({ student_id: studentId })

    } catch (err) {
        const error = new HttpError(`Something went wrong, could not find a care.${err}`, 500)
        return next(error)
    }

    // const place = DUMMY.find((p) => {
    //     return p.id === placeId;
    // })

    if (!cares) {
        throw new HttpError('Could not find a care for the provided id.', 404)
        return next(error)
        // error.code = 404
        // throw error
        // return res.status(404).json({ message: 'Could not find a place for the provided id.' })
    }

    // console.log("GET Request in Places", institute);
    res.json({ cares: cares.map(care => care.toObject({ getters: true })), newId: newId})
}

const putId = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // console.log(errors)
        // res.status(422)
        throw new HttpError('Invalid inputs passed, please check your data')
    }


    const {
        student_id, student_name, student_class,
        student_section, care_id, care_name,
        care_description, care_status, care_created_at
    } = req.body

    const createdCare = new Care({
        student_id, student_name, student_class,
        student_section, care_id, care_name,
        care_description, care_status, care_created_at
    })
    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await createdCare.save({ session: sess })
        await sess.commitTransaction()
        sess.endSession();

    }
    catch (err) {
        const error = new HttpError(`Creating care failed, Please try again. ${err}`, 500)
        return next(error)
    }

    // DUMMY.push(createdPlace)
    // console.log({ care: createdDiary })
    res.status(201).json({ care: createdCare })
}

const createCare = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // console.log(errors)
        // res.status(422)
        throw new HttpError('Invalid inputs passed, please check your data')
    }

    const {
        student_id,student_name,student_class,
    student_section,care_name,
    care_description,care_status,
    } = req.body
    const careId = req.params.aid
    // console.log(studentId)

    let care
    try {
        care = await Care.find({ care_id: careId })
        // console.log(care)
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update care.${err}`, 500)
        return next(error)
    }
    care = care[0]

    // const updatedPlace = DUMMY.find(p => p.id === placeId)
    // const placeIndex = DUMMY.find(p => p.id === placeId)
    care.student_id = student_id
    care.student_name = student_name
    care.student_class = student_class
    care.student_section = student_section
    care.care_name = care_name
    care.care_description = care_description
    care.care_status = care_status

    try {
        await care.save()
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update care.${err}`, 500)
        return next(error)
    }

    // DUMMY[placeIndex] = updatedPlace

    res.status(200).json({ care })
}

const updateCare = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // res.status(422)
        return next(new HttpError('Invalid inputs passed, please check your data'))
    }

    const {  student_id,student_name,student_class,
        student_section,care_name,
        care_description,care_status,
    } = req.body
    const careId = req.params.sid

    let care
    try {
        care = await Care.find({ care_id: careId })
        console.log(care)

    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update care.${err}`, 500)
        return next(error)
    }
    care = care[1]

    // const updatedPlace = DUMMY.find(p => p.id === placeId)
    // const placeIndex = DUMMY.find(p => p.id === placeId)
    care.student_id = student_id
    care.student_name = student_name
    care.student_class = student_class
    care.student_section = student_section
    care.care_name = care_name
    care.care_description = care_description
    care.care_status = care_status

    try {
        await care.save()
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update care.${err}`, 500)
        return next(error)
    }

    // DUMMY[placeIndex] = updatedPlace

    res.status(200).json({ care })
}

const searchCare = async (req, res, next) => {
    const search = req.params.sid;
    console.log(req.query)
    let cares
    try {
        cares = await Care.find({
            $or: [
                { care_id: { $regex: search, $options: 'i' } },
                { care_status: { $regex: search, $options: 'i' } },
                { care_name: { $regex: search, $options: 'i' } },
                { care_description: { $regex: search, $options: 'i' } },
            ]
        });
    } catch (err) {
        const error = new HttpError(`Something went wrong, could not find a care.${err}`, 500)
        return next(error)
    }

    // const place = DUMMY.find((p) => {
    //     return p.id === placeId;
    // })

    if (!cares) {
        throw new HttpError('Could not find a care for the provided id.', 404)
        return next(error)
        // error.code = 404
        // throw error
        // return res.status(404).json({ message: 'Could not find a place for the provided id.' })
    }

    // console.log("GET Request in Places", institute);
    res.json({ cares: cares })
}

const deleteCare = async (req, res, next) => {
    const careId = req.params.sid
    // console.log(schoolId)
    let care
    try {
        care = await Care.findOne({ care_id: careId })
        // console.log(school)
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not delete care. ${err}`, 500)
        return next(error)
    }

    // if (!DUMMY.find(p => p.id === placeId)) {
    //     throw new HttpError('Could not find a place for that id', 404)
    // }

    // DUMMY = DUMMY.filter(p => p.id !== placeId)

    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await care.deleteOne({ session: sess })
        await sess.commitTransaction()
        sess.endSession();

    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not delete care. ${err}`, 500)
        return next(error)
    }

    res.status(200).json({ message: 'Deleted care.' })
}

exports.getCare = getCare
exports.getCareById = getCareById
exports.putId = putId;
exports.createCare = createCare
exports.updateCare = updateCare
exports.searchCare = searchCare
exports.deleteCare = deleteCare