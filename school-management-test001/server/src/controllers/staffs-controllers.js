const { v4: uuid } = require('uuid')
const mongoose = require("mongoose")
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const Staff = require('../models/staff')


const getStaff = async (req, res, next) => {

    let last
    let lastId
    let newId
    try {
        const long = (await Staff.find({})).length
        if (long) {
            last = await Staff.findOne().sort({ _id: -1 }); // Sort by _id in descending order
            lastId = parseInt(last.staff_id.slice(2)); // Extract numeric part

        } else {
            lastId = 0
            // console.log("No documents found.");
        }
        const prefix = "SF";
        const newNumber = lastId + 1;
        const paddedNumber = newNumber.toString().padStart(6, "0"); // Pads with leading zeros
        newId = prefix + paddedNumber;
        // console.log(newId)

    }
    catch (err) {
        const error = new HttpError(`Creating Staff failed, Please try again. ${err}`, 500)
        return next(error)
    }

    let staffs
    try {
        staffs = await Staff.find({})
        // .skip(0)
        // .limit(20)

    }
    catch (err) {
        const error = new HttpError(`Fetching Staff failed, please try again later. ${err}`, 500)
        return next(error)
    }
    res.json({ staffs: staffs.map(staff => staff.toObject({ getters: true })), newId: newId })
}

const getStaffById = async (req, res, next) => {
    const staffId = req.params.sid;
    let staff
    try {
        staff = await Staff.find({ staff_id: staffId })

    } catch (err) {
        const error = new HttpError(`Something went wrong, could not find a Staff.${err}`, 500)
        return next(error)
    }

    // const place = DUMMY.find((p) => {
    //     return p.id === placeId;
    // })

    if (!staff) {
        throw new HttpError('Could not find a staff for the provided id.', 404)
        return next(error)
        // error.code = 404
        // throw error
        // return res.status(404).json({ message: 'Could not find a place for the provided id.' })
    }

    // console.log("GET Request in Places", institute);
    res.json({ staff: staff })
}

const putId = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // console.log(errors)
        // res.status(422)
        throw new HttpError('Invalid inputs passed, please check your data')
    }


    const {
        staff_id, staff_name, staff_gender,
        staff_date_of_birth, staff_contact, staff_email,
        staff_nationality, staff_state, staff_city,
        staff_street, staff_pincode, staff_status,
        staff_title, staff_department, staff_degree, staff_work,
        staff_certificates, staff_class, staff_section,
        staff_medical, staff_specify, staff_created_at
    } = req.body

    const createdStaff = new Staff({
        staff_id, staff_name, staff_gender,
        staff_date_of_birth, staff_contact, staff_email,
        staff_nationality, staff_state, staff_city,
        staff_street, staff_pincode, staff_status,
        staff_title, staff_department, staff_degree, staff_work,
        staff_certificates, staff_class, staff_section,
        staff_medical, staff_specify, staff_created_at
    })
    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await createdStaff.save({ session: sess })
        await sess.commitTransaction()
        sess.endSession();

    }
    catch (err) {
        const error = new HttpError(`Creating staff failed, Please try again. ${err}`, 500)
        return next(error)
    }

    // DUMMY.push(createdPlace)

    res.status(201).json({ staff: createdStaff })
}

const createStaff = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // console.log(errors)
        // res.status(422)
        throw new HttpError('Invalid inputs passed, please check your data')
    }

    const {
        staff_name, staff_gender,
        staff_date_of_birth, staff_contact, staff_email,
        staff_nationality, staff_state, staff_city,
        staff_street, staff_pincode, staff_status,
        staff_title, staff_department, staff_degree, staff_work,
        staff_certificates, staff_class, staff_section,
        staff_medical, staff_specify,
    } = req.body
    const staffId = req.params.aid
    // console.log(studentId)

    let staff
    try {
        staff = await Staff.find({ staff_id: staffId })
        // console.log(staff)
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update staff.${err}`, 500)
        return next(error)
    }
    staff = staff[0]

    // const updatedPlace = DUMMY.find(p => p.id === placeId)
    // const placeIndex = DUMMY.find(p => p.id === placeId)
    
    staff.staff_name = staff_name
    staff.staff_gender = staff_gender
    staff.staff_date_of_birth = staff_date_of_birth
    staff.staff_contact = staff_contact
    staff.staff_email = staff_email
    staff.staff_nationality = staff_nationality
    staff.staff_state = staff_state
    staff.staff_city = staff_city
    staff.staff_street = staff_street
    staff.staff_pincode = staff_pincode
    staff.staff_status = staff_status
    staff.staff_title = staff_title
    staff.staff_department = staff_department
    staff.staff_degree = staff_degree
    staff.staff_work = staff_work
    staff.staff_certificates = staff_certificates
    staff.staff_class = staff_class
    staff.staff_section = staff_section
    staff.staff_medical = staff_medical
    staff.staff_specify = staff_specify
   
    try {
        await staff.save()
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update student.${err}`, 500)
        return next(error)
    }

    // DUMMY[placeIndex] = updatedPlace

    res.status(200).json({ staff })
}

const updateStaff = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // res.status(422)
        return next(new HttpError('Invalid inputs passed, please check your data'))
    }

    const { staff_name, staff_gender,
        staff_date_of_birth, staff_contact, staff_email,
        staff_nationality, staff_state, staff_city,
        staff_street, staff_pincode, staff_status,
        staff_title, staff_department, staff_degree, staff_work,
        staff_certificates, staff_class, staff_section,
        staff_medical, staff_specify,
    } = req.body
    const staffId = req.params.sid

    let staff
    try {
        staff = await Staff.find({ staff_id: staffId })
        console.log(staff)

    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update student.${err}`, 500)
        return next(error)
    }
    staff = staff[1]

    // const updatedPlace = DUMMY.find(p => p.id === placeId)
    // const placeIndex = DUMMY.find(p => p.id === placeId)
    staff.staff_name = staff_name
    staff.staff_gender = staff_gender
    staff.staff_date_of_birth = staff_date_of_birth
    staff.staff_contact = staff_contact
    staff.staff_email = staff_email
    staff.staff_nationality = staff_nationality
    staff.staff_state = staff_state
    staff.staff_city = staff_city
    staff.staff_street = staff_street
    staff.staff_pincode = staff_pincode
    staff.staff_status = staff_status
    staff.staff_title = staff_title
    staff.staff_department = staff_department
    staff.staff_degree = staff_degree
    staff.staff_work = staff_work
    staff.staff_certificates = staff_certificates
    staff.staff_class = staff_class
    staff.staff_section = staff_section
    staff.staff_medical = staff_medical
    staff.staff_specify = staff_specify

    try {
        await staff.save()
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update staff.${err}`, 500)
        return next(error)
    }

    // DUMMY[placeIndex] = updatedPlace

    res.status(200).json({ staff })
}

const searchStaff = async (req, res, next) => {
    const search = req.params.sid;
    console.log(req.query)
    let staffs
    try {
        staffs = await Staff.find({
            $or: [
                { staff_id: { $regex: search, $options: 'i' } },
                { staff_name: { $regex: search, $options: 'i' } },
                { staff_class: { $regex: search, $options: 'i' } },
                { staff_section: { $regex: search, $options: 'i' } },
                { staff_title: { $regex: search, $options: 'i' } },
                { staff_contact: { $regex: search, $options: 'i' } },
                {staff_status: { $regex: search, $options: 'i' } },
            ]
        });
    } catch (err) {
        const error = new HttpError(`Something went wrong, could not find a staff.${err}`, 500)
        return next(error)
    }

    // const place = DUMMY.find((p) => {
    //     return p.id === placeId;
    // })

    if (!staffs) {
        throw new HttpError('Could not find a staff for the provided id.', 404)
        return next(error)
        // error.code = 404
        // throw error
        // return res.status(404).json({ message: 'Could not find a place for the provided id.' })
    }

    // console.log("GET Request in Places", institute);
    res.json({ staffs: staffs })
}

const deleteStaff = async (req, res, next) => {
    const staffId = req.params.sid
    // console.log(schoolId)
    let staff
    try {
        staff = await Staff.findOne({ staff_id: staffId })
        // console.log(school)
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not delete staff. ${err}`, 500)
        return next(error)
    }

    // if (!DUMMY.find(p => p.id === placeId)) {
    //     throw new HttpError('Could not find a place for that id', 404)
    // }

    // DUMMY = DUMMY.filter(p => p.id !== placeId)

    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await staff.deleteOne({ session: sess })
        await sess.commitTransaction()
        sess.endSession();

    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not delete staff. ${err}`, 500)
        return next(error)
    }

    res.status(200).json({ message: 'Deleted staff.' })
}

exports.getStaff = getStaff
exports.getStaffById = getStaffById
exports.putId = putId;
exports.createStaff = createStaff
exports.updateStaff = updateStaff
exports.searchStaff = searchStaff
exports.deleteStaff = deleteStaff