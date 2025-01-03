const { v4: uuid } = require('uuid')
const mongoose = require("mongoose")
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const Student = require('../models/student')
const Attendence = require('../models/student')

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

const getStudents = async (req, res, next) => {

    let last
    let lastId
    let newId
    try {
        const long = (await Student.find({})).length
        if (long) {
            last = await Student.findOne().sort({ _id: -1 }); // Sort by _id in descending order
            lastId = parseInt(last.student_id.slice(2)); // Extract numeric part

        } else {
            lastId = 0
            // console.log("No documents found.");
        }
        const prefix = "ST";
        const newNumber = lastId + 1;
        const paddedNumber = newNumber.toString().padStart(6, "0"); // Pads with leading zeros
        newId = prefix + paddedNumber;
        // console.log(newId)

    }
    catch (err) {
        const error = new HttpError(`Creating Student failed, Please try again. ${err}`, 500)
        return next(error)
    }

    let students
    try {
        students = await Student.find({});

        // Using map to find attendance for each student
        const newStudentsData = await Promise.all(
            students.map(async (student) => {
                // Find attendance for the current student
                let attendance = await Attendence.find({ student_id: student.student_id });
                return {
                    ...student,
                    attendance: attendance.attendance_status ? attendance.attendance_status : null
                };
            })
        );

        console.log(newStudentsData,'here it is');
    }
    catch (err) {
        const error = new HttpError(`Fetching Students failed, please try again later. ${err}`, 500)
        return next(error)
    }
    res.json({ students: students.map(student => student.toObject({ getters: true })), newId: newId })
}

const getStudentById = async (req, res, next) => {
    const studentId = req.params.sid;
    let student
    try {
        student = await Student.find({ student_id: studentId })

    } catch (err) {
        const error = new HttpError(`Something went wrong, could not find a student.${err}`, 500)
        return next(error)
    }

    // const place = DUMMY.find((p) => {
    //     return p.id === placeId;
    // })

    if (!student) {
        throw new HttpError('Could not find a student for the provided id.', 404)
        return next(error)
        // error.code = 404
        // throw error
        // return res.status(404).json({ message: 'Could not find a place for the provided id.' })
    }

    // console.log("GET Request in Places", institute);
    res.json({ student: student })
}

const putId = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // console.log(errors)
        // res.status(422)
        throw new HttpError('Invalid inputs passed, please check your data')
    }


    const {
        student_id, student_name, student_gender,
        student_date_of_birth, student_nationality, student_state,
        student_city, student_street, student_pincode,
        student_status, student_guardian_name, relation_to_student,
        student_contact, student_email, parent_occupation,
        student_previous_school, student_last_grade, student_class, student_section, student_roll,
        student_preffered_date, student_emergency_gurdian, student_emergency_relation,
        student_emergency_contact, student_medical, student_specify, student_created_at
    } = req.body

    const createdStudent = new Student({
        student_id, student_name, student_gender,
        student_date_of_birth, student_nationality, student_state,
        student_city, student_street, student_pincode,
        student_status, student_guardian_name, relation_to_student,
        student_contact, student_email, parent_occupation,
        student_previous_school, student_last_grade, student_class, student_section, student_roll,
        student_preffered_date, student_emergency_gurdian, student_emergency_relation,
        student_emergency_contact, student_medical, student_specify, student_created_at
    })
    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await createdStudent.save({ session: sess })
        await sess.commitTransaction()
        sess.endSession();

    }
    catch (err) {
        const error = new HttpError(`Creating student failed, Please try again. ${err}`, 500)
        return next(error)
    }

    // DUMMY.push(createdPlace)

    res.status(201).json({ student: createdStudent })
}

const createStudent = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // console.log(errors)
        // res.status(422)
        throw new HttpError('Invalid inputs passed, please check your data')
    }

    const {
        student_name, student_gender,
        student_date_of_birth, student_nationality, student_state,
        student_city, student_street, student_pincode,
        student_status, student_guardian_name, relation_to_student,
        student_contact, student_email, parent_occupation,
        student_previous_school, student_last_grade, student_class, student_section, student_roll,
        student_preffered_date, student_emergency_gurdian, student_emergency_relation,
        student_emergency_contact, student_medical, student_specify,
    } = req.body
    const studentId = req.params.aid
    // console.log(studentId)

    let student
    try {
        student = await Student.find({ student_id: studentId })
        // console.log(student)
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update student.${err}`, 500)
        return next(error)
    }
    student = student[0]

    // const updatedPlace = DUMMY.find(p => p.id === placeId)
    // const placeIndex = DUMMY.find(p => p.id === placeId)
    student.student_name = student_name
    student.student_gender = student_gender
    student.student_date_of_birth = student_date_of_birth
    student.student_nationality = student_nationality
    student.student_state = student_state
    student.student_city = student_city
    student.student_street = student_street
    student.student_pincode = student_pincode
    student.student_status = student_status
    student.student_guardian_name = student_guardian_name
    student.relation_to_student = relation_to_student
    student.student_contact = student_contact
    student.student_email = student_email
    student.parent_occupation = parent_occupation
    student.student_previous_school = student_previous_school
    student.student_last_grade = student_last_grade
    student.student_class = student_class
    student.student_section = student_section
    student.student_roll = student_roll
    student.student_preffered_date = student_preffered_date
    student.student_emergency_gurdian = student_emergency_gurdian
    student.student_emergency_relation = student_emergency_relation
    student.student_emergency_contact = student_emergency_contact
    student.student_medical = student_medical
    student.student_specify = student_specify

    try {
        await student.save()
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update student.${err}`, 500)
        return next(error)
    }

    // DUMMY[placeIndex] = updatedPlace

    res.status(200).json({ student })
}

const updateStudent = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // res.status(422)
        return next(new HttpError('Invalid inputs passed, please check your data'))
    }

    const { student_name, student_gender,
        student_date_of_birth, student_nationality, student_state,
        student_city, student_street, student_pincode,
        student_status, student_guardian_name, relation_to_student,
        student_contact, student_email, parent_occupation,
        student_previous_school, student_last_grade, student_class, student_section, student_roll,
        student_preffered_date, student_emergency_gurdian, student_emergency_relation,
        student_emergency_contact, student_medical, student_specify,
    } = req.body
    const studentId = req.params.sid

    let student
    try {
        student = await Student.find({ student_id: studentId })
        console.log(student)

    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update student.${err}`, 500)
        return next(error)
    }
    student = student[1]

    // const updatedPlace = DUMMY.find(p => p.id === placeId)
    // const placeIndex = DUMMY.find(p => p.id === placeId)
    student.student_name = student_name
    student.student_gender = student_gender
    student.student_date_of_birth = student_date_of_birth
    student.student_nationality = student_nationality
    student.student_state = student_state
    student.student_city = student_city
    student.student_street = student_street
    student.student_pincode = student_pincode
    student.student_status = student_status
    student.student_guardian_name = student_guardian_name
    student.relation_to_student = relation_to_student
    student.student_contact = student_contact
    student.student_email = student_email
    student.parent_occupation = parent_occupation
    student.student_previous_school = student_previous_school
    student.student_last_grade = student_last_grade
    student.student_class = student_class
    student.student_section = student_section
    student.student_roll = student_roll
    student.student_preffered_date = student_preffered_date
    student.student_emergency_gurdian = student_emergency_gurdian
    student.student_emergency_relation = student_emergency_relation
    student.student_emergency_contact = student_emergency_contact
    student.student_medical = student_medical
    student.student_specify = student_specify


    try {
        await student.save()
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update student.${err}`, 500)
        return next(error)
    }

    // DUMMY[placeIndex] = updatedPlace

    res.status(200).json({ student })
}

const searchStudents = async (req, res, next) => {
    const search = req.params.sid;
    console.log(req.query)
    let students
    try {
        students = await Student.find({
            $or: [
                { student_id: { $regex: search, $options: 'i' } },
                { student_name: { $regex: search, $options: 'i' } },
                { student_class: { $regex: search, $options: 'i' } },
                { student_section: { $regex: search, $options: 'i' } },
                { student_roll: { $regex: search, $options: 'i' } },
                { student_contact: { $regex: search, $options: 'i' } },
                { student_status: { $regex: search, $options: 'i' } },
            ]
        });
    } catch (err) {
        const error = new HttpError(`Something went wrong, could not find a student.${err}`, 500)
        return next(error)
    }

    // const place = DUMMY.find((p) => {
    //     return p.id === placeId;
    // })

    if (!students) {
        throw new HttpError('Could not find a student for the provided id.', 404)
        return next(error)
        // error.code = 404
        // throw error
        // return res.status(404).json({ message: 'Could not find a place for the provided id.' })
    }

    // console.log("GET Request in Places", institute);
    res.json({ students: students })
}

const deleteStudent = async (req, res, next) => {
    const studentId = req.params.sid
    // console.log(schoolId)
    let student
    try {
        student = await Student.findOne({ student_id: studentId })
        // console.log(school)
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not delete student. ${err}`, 500)
        return next(error)
    }

    // if (!DUMMY.find(p => p.id === placeId)) {
    //     throw new HttpError('Could not find a place for that id', 404)
    // }

    // DUMMY = DUMMY.filter(p => p.id !== placeId)

    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await student.deleteOne({ session: sess })
        await sess.commitTransaction()
        sess.endSession();

    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not delete student. ${err}`, 500)
        return next(error)
    }

    res.status(200).json({ message: 'Deleted student.' })
}

exports.getStudents = getStudents
exports.getStudentById = getStudentById
exports.putId = putId;
exports.createStudent = createStudent
exports.updateStudent = updateStudent
exports.searchStudents = searchStudents
exports.deleteStudent = deleteStudent