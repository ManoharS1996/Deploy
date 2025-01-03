const { v4: uuid } = require('uuid')
const mongoose = require("mongoose")
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const Institute = require('../models/school')

let DUMMY = [
    {
        id: "p1",
        title: "Empire State Building",
        description: "One of the most famous sky scrapers in the world!",
        location: {
            lat: 40.7484474,
            lng: -73.9871516,
        },
        address: "20 w 34th st , New York , NY 10001",
        creator: "u1",
    },
];

const getSchools = async (req, res, next) => {

    let last
    let lastId
    let newId
    try {
        const long=(await Institute.find({})).length
        if (long) {
            last = await Institute.findOne().sort({ _id: -1 }); // Sort by _id in descending order
            lastId = parseInt(last.institute_id.slice(2)); // Extract numeric part

        } else {
            lastId=0
            // console.log("No documents found.");
        }
        const prefix = "IN";
        const newNumber = lastId + 1;
        const paddedNumber = newNumber.toString().padStart(6, "0"); // Pads with leading zeros
        newId=prefix + paddedNumber;
        // console.log(newId)
        
    }
    catch (err) {
        const error = new HttpError(`Creating Institute failed, Please try again. ${err}`, 500)
        return next(error)    }

    let institutes
    try {
        institutes = await Institute.find({})
        // .skip(0)
        // .limit(20)

    }
    catch (err) {
        const error = new HttpError(`Fetching Institutes failed, please try again later. ${err}`, 500)
        return next(error)
    }
    res.json({ institutes: institutes.map(school => school.toObject({ getters: true })),newId:newId })
}

const getSchoolById = async (req, res, next) => {
    const schoolId = req.params.sid;
    let institute
    try {
        institute = await Institute.find({ institute_id: schoolId })

    } catch (err) {
        const error = new HttpError(`Something went wrong, could not find a school.${err}`, 500)
        return next(error)
    }

    // const place = DUMMY.find((p) => {
    //     return p.id === placeId;
    // })

    if (!institute) {
        throw new HttpError('Could not find a school for the provided id.', 404)
        return next(error)
        // error.code = 404
        // throw error
        // return res.status(404).json({ message: 'Could not find a place for the provided id.' })
    }

    // console.log("GET Request in Places", institute);
    res.json({ institute: institute })
}

const putId = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // console.log(errors)
        // res.status(422)
        throw new HttpError('Invalid inputs passed, please check your data')
    }

   
    const {
        institute_id, institute_name, est_year, institute_category, institute_type, board_of_education,
        institute_contact, institute_email, institute_status,
        institute_nationality, institute_state, institute_city, institute_street, institute_pincode,
        institute_principal_name, institute_principal_contact, institute_principal_email,institute_created_at
    } = req.body

    const createdSchool = new Institute({
        institute_id, institute_name, est_year, institute_category,
        institute_type, board_of_education, institute_contact, institute_email,
        institute_status, institute_nationality, institute_state,
        institute_city, institute_street, institute_pincode, institute_principal_name,
        institute_principal_contact, institute_principal_email,institute_created_at
    })
    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await createdSchool.save({ session: sess })
        await sess.commitTransaction()
        sess.endSession();

    }
    catch (err) {
        const error = new HttpError(`Creating school failed, Please try again. ${err}`, 500)
        return next(error)
    }

    // DUMMY.push(createdPlace)

    res.status(201).json({ school: createdSchool })
}

const createSchool = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // console.log(errors)
        // res.status(422)
        throw new HttpError('Invalid inputs passed, please check your data')
    }

    const {
        institute_name, est_year, institute_category, institute_type,
        board_of_education, institute_contact, institute_email, institute_status,
        institute_nationality, institute_state, institute_city, institute_street,
        institute_pincode, institute_principal_name, institute_principal_contact,
        institute_principal_email
    } = req.body
    const schoolId = req.params.aid
    // console.log(schoolId)

    let institute
    try {
        institute = await Institute.find({ institute_id: schoolId })
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update place.${err}`, 500)
        return next(error)
    }
    institute = institute[0]

    // const updatedPlace = DUMMY.find(p => p.id === placeId)
    // const placeIndex = DUMMY.find(p => p.id === placeId)
    institute.institute_name = institute_name
    institute.est_year = est_year
    institute.institute_category = institute_category
    institute.institute_type = institute_type
    institute.board_of_education = board_of_education
    institute.institute_contact = institute_contact
    institute.institute_email = institute_email
    institute.institute_status = institute_status
    institute.institute_nationality = institute_nationality
    institute.institute_state = institute_state
    institute.institute_city = institute_city
    institute.institute_street = institute_street
    institute.institute_pincode = institute_pincode
    institute.institute_principal_name = institute_principal_name
    institute.institute_principal_contact = institute_principal_contact
    institute.institute_principal_email = institute_principal_email


    try {
        await institute.save()
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update place.${err}`, 500)
        return next(error)
    }

    // DUMMY[placeIndex] = updatedPlace

    res.status(200).json({ institute })
}

const updateSchool = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // res.status(422)
        return next(new HttpError('Invalid inputs passed, please check your data'))
    }

    const { institute_name, est_year, institute_category, institute_type, board_of_education, institute_contact, institute_email, institute_status,
        institute_nationality, institute_state, institute_city, institute_street, institute_pincode,
        institute_principal_name, institute_principal_contact, institute_principal_email } = req.body
    const schoolId = req.params.sid

    let institute
    try {
        institute = await Institute.find({ institute_id: schoolId })
        console.log(institute)

    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update place.${err}`, 500)
        return next(error)
    }
    institute = institute[1]

    // const updatedPlace = DUMMY.find(p => p.id === placeId)
    // const placeIndex = DUMMY.find(p => p.id === placeId)
    institute.institute_name = institute_name
    institute.est_year = est_year
    institute.institute_category = institute_category
    institute.institute_type = institute_type
    institute.board_of_education = board_of_education
    institute.institute_contact = institute_contact
    institute.institute_email = institute_email
    institute.institute_status = institute_status
    institute.institute_nationality = institute_nationality
    institute.institute_state = institute_state
    institute.institute_city = institute_city
    institute.institute_street = institute_street
    institute.institute_pincode = institute_pincode
    institute.institute_principal_name = institute_principal_name
    institute.institute_principal_contact = institute_principal_contact
    institute.institute_principal_email = institute_principal_email


    try {
        await institute.save()
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update place.${err}`, 500)
        return next(error)
    }

    // DUMMY[placeIndex] = updatedPlace

    res.status(200).json({ institute })
}

const searchSchools = async (req, res, next) => {
    const search = req.params.sid;
    console.log(req.query)
    let institutes
    try {
        institutes = await Institute.find({
            $or: [
                { institute_id: { $regex: search, $options: 'i' } },
                { institute_name: { $regex: search, $options: 'i' } },
                { institute_type: { $regex: search, $options: 'i' } },
                { est_year: { $regex: search, $options: 'i' } },
                { board_of_education: { $regex: search, $options: 'i' } },
                { institute_contact: { $regex: search, $options: 'i' } },
                { institute_status: { $regex: search, $options: 'i' } },
            ]
        });
    } catch (err) {
        const error = new HttpError(`Something went wrong, could not find a school.${err}`, 500)
        return next(error)
    }

    // const place = DUMMY.find((p) => {
    //     return p.id === placeId;
    // })

    if (!institutes) {
        throw new HttpError('Could not find a school for the provided id.', 404)
        return next(error)
        // error.code = 404
        // throw error
        // return res.status(404).json({ message: 'Could not find a place for the provided id.' })
    }

    // console.log("GET Request in Places", institute);
    res.json({ institutes: institutes })
}

const deleteSchool = async (req, res, next) => {
    const schoolId = req.params.sid
    // console.log(schoolId)
    let school
    try {
        school = await Institute.findOne({ institute_id: schoolId })
        // console.log(school)
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not delete school. ${err}`, 500)
        return next(error)
    }

    // if (!DUMMY.find(p => p.id === placeId)) {
    //     throw new HttpError('Could not find a place for that id', 404)
    // }

    // DUMMY = DUMMY.filter(p => p.id !== placeId)

    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await school.deleteOne({ session: sess })
        await sess.commitTransaction()
        sess.endSession();

    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not delete school. ${err}`, 500)
        return next(error)
    }

    res.status(200).json({ message: 'Deleted school.' })
}

exports.getSchools = getSchools
exports.getSchoolById = getSchoolById
exports.putId = putId;
exports.createSchool = createSchool
exports.updateSchool = updateSchool
exports.searchSchools = searchSchools
exports.deleteSchool = deleteSchool