const { v4: uuid } = require('uuid')
const mongoose = require("mongoose")
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const Assignment = require('../models/assignment')


const getAssignment = async (req, res, next) => {

    let last
    let lastId
    let newId
    try {
        const long = (await Assignment.find({})).length
        if (long) {
            last = await Assignment.findOne().sort({ _id: -1 }); // Sort by _id in descending order
            lastId = parseInt(last.assignment_id.slice(1)); // Extract numeric part

        } else {
            lastId = 0
            // console.log("No documents found.");
        }
        const prefix = "A";
        const newNumber = lastId + 1;
        const paddedNumber = newNumber.toString().padStart(7, "0"); // Pads with leading zeros
        newId = prefix + paddedNumber;
        // console.log(newId)

    }
    catch (err) {
        const error = new HttpError(`Creating Assignment failed, Please try again. ${err}`, 500)
        return next(error)
    }

    let assignments
    try {
        assignments = await Assignment.find({})
        // .skip(0)
        // .limit(20)

    }
    catch (err) {
        const error = new HttpError(`Fetching Assignment failed, please try again later. ${err}`, 500)
        return next(error)
    }
    res.json({ assignments: assignments.map(assignment => assignment.toObject({ getters: true })), newId: newId })
}

const getAssignmentById = async (req, res, next) => {
    const assignmentId = req.params.sid;
    let assignment
    try {
        assignment = await Assignment.find({ assignment_id: assignmentId })

    } catch (err) {
        const error = new HttpError(`Something went wrong, could not find a assignment.${err}`, 500)
        return next(error)
    }

    // const place = DUMMY.find((p) => {
    //     return p.id === placeId;
    // })

    if (!assignment) {
        throw new HttpError('Could not find a assignment for the provided id.', 404)
        return next(error)
        // error.code = 404
        // throw error
        // return res.status(404).json({ message: 'Could not find a place for the provided id.' })
    }

    // console.log("GET Request in Places", institute);
    res.json({ assignment: assignment })
}

const putId = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // console.log(errors)
        // res.status(422)
        throw new HttpError('Invalid inputs passed, please check your data')
    }


    const {
        assignment_id,staff_id,staff_name,
    student_class,student_section,subject,
    assignment_name,assignment_type,assignment_description,
    submission_date,marks,assignment_status,assignment_created_at
    } = req.body

    const createdAssignment = new Assignment({
        assignment_id,staff_id,staff_name,
    student_class,student_section,subject,
    assignment_name,assignment_type,assignment_description,
    submission_date,marks,assignment_status,assignment_created_at
    })
    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await createdAssignment.save({ session: sess })
        await sess.commitTransaction()
        sess.endSession();

    }
    catch (err) {
        const error = new HttpError(`Creating assignment failed, Please try again. ${err}`, 500)
        return next(error)
    }

    // DUMMY.push(createdPlace)
// console.log({ assignment: createdDiary })
    res.status(201).json({ assignment: createdAssignment })
}

const createAssignment = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // console.log(errors)
        // res.status(422)
        throw new HttpError('Invalid inputs passed, please check your data')
    }

    const {
        staff_id,staff_name,
        student_class,student_section,subject,
        assignment_name,assignment_type,assignment_description,
        submission_date,marks,assignment_status
    } = req.body

    const assignmentId = req.params.aid
    // console.log(studentId)

    let assignment
    try {
        assignment = await Assignment.find({ assignment_id: assignmentId })
        // console.log(assignment)
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update assignment.${err}`, 500)
        return next(error)
    }
    assignment = assignment[0]

    // const updatedPlace = DUMMY.find(p => p.id === placeId)
    // const placeIndex = DUMMY.find(p => p.id === placeId)
    assignment.staff_id=staff_id
    assignment.staff_name=staff_name
    assignment.student_class=student_class
    assignment.student_section=student_section
    assignment.subject=subject
    assignment.assignment_name=assignment_name
    assignment.assignment_type=assignment_type
    assignment.assignment_description=assignment_description
    assignment.submission_date=submission_date
    assignment.marks=marks
    assignment.assignment_status=assignment_status
    
    try {
        await assignment.save()
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update assignment.${err}`, 500)
        return next(error)
    }

    // DUMMY[placeIndex] = updatedPlace

    res.status(200).json({ assignment })
}

const updateAssignment = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // res.status(422)
        return next(new HttpError('Invalid inputs passed, please check your data'))
    }

    const {   staff_id,staff_name,
        student_class,student_section,subject,
        assignment_name,assignment_type,assignment_description,
        submission_date,marks,assignment_status
    } = req.body
    const assignmentId = req.params.sid

    let assignment
    try {
        assignment = await Assignment.find({ assignment_id: assignmentId })
        console.log(assignment)

    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update assignment.${err}`, 500)
        return next(error)
    }
    assignment = assignment[1]

    // const updatedPlace = DUMMY.find(p => p.id === placeId)
    // const placeIndex = DUMMY.find(p => p.id === placeId)
    assignment.staff_id=staff_id
    assignment.staff_name=staff_name
    assignment.student_class=student_class
    assignment.student_section=student_section
    assignment.subject=subject
    assignment.assignment_name=assignment_name
    assignment.assignment_type=assignment_type
    assignment.assignment_description=assignment_description
    assignment.submission_date=submission_date
    assignment.marks=marks
    assignment.assignment_status=assignment_status
    

    try {
        await assignment.save()
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update assignment.${err}`, 500)
        return next(error)
    }

    // DUMMY[placeIndex] = updatedPlace

    res.status(200).json({ assignment })
}

const searchAssignment = async (req, res, next) => {
    const search = req.params.sid;
    console.log(req.query)
    let assignments
    try {
        assignments = await Assignment.find({
            $or: [
                { assignment_id: { $regex: search, $options: 'i' } },
                { submission_date: { $regex: search, $options: 'i' } },
                { staff_name: { $regex: search, $options: 'i' } },
                { subject: { $regex: search, $options: 'i' } },
                { assignment_type: { $regex: search, $options: 'i' } },
                { student_class: { $regex: search, $options: 'i' } },
                { assignment_status: { $regex: search, $options: 'i' } },

            ]
        });
      
    } catch (err) {
        const error = new HttpError(`Something went wrong, could not find a assignment.${err}`, 500)
        return next(error)
    }

    // const place = DUMMY.find((p) => {
    //     return p.id === placeId;
    // })

    if (!assignments) {
        throw new HttpError('Could not find a assignment for the provided id.', 404)
        return next(error)
        // error.code = 404
        // throw error
        // return res.status(404).json({ message: 'Could not find a place for the provided id.' })
    }

    // console.log("GET Request in Places", institute);
    res.json({ assignments: assignments })
}

const deleteAssignment = async (req, res, next) => {
    const assignmentId = req.params.sid
    // console.log(schoolId)
    let assignment
    try {
        assignment = await Assignment.findOne({ assignment_id: assignmentId })
        // console.log(school)
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not delete assignment. ${err}`, 500)
        return next(error)
    }

    // if (!DUMMY.find(p => p.id === placeId)) {
    //     throw new HttpError('Could not find a place for that id', 404)
    // }

    // DUMMY = DUMMY.filter(p => p.id !== placeId)

    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await assignment.deleteOne({ session: sess })
        await sess.commitTransaction()
        sess.endSession();

    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not delete assignment. ${err}`, 500)
        return next(error)
    }

    res.status(200).json({ message: 'Deleted assignment.' })
}

exports.getAssignment = getAssignment
exports.getAssignmentById = getAssignmentById
exports.putId = putId;
exports.createAssignment= createAssignment
exports.updateAssignment = updateAssignment
exports.searchAssignment = searchAssignment
exports.deleteAssignment = deleteAssignment