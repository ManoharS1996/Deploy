const { v4: uuid } = require('uuid')
const mongoose = require("mongoose")
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const Transport = require('../models/transport')
const Student = require('../models/student')
const Staff = require('../models/staff')


const getTransport = async (req, res, next) => {

    let transports
    try {
        transports = await Transport.find({})
        // .skip(0)
        // .limit(20)

    }
    catch (err) {
        const error = new HttpError(`Fetching Transports failed, please try again later. ${err}`, 500)
        return next(error)
    }
    res.json({ transports: transports.map(transport => transport.toObject({ getters: true })) })
}

const getTransportById = async (req, res, next) => {
    const studentId = req.params.sid;
    let transport
    try {
        transport = await Transport.find({ student_id: studentId })

    } catch (err) {
        const error = new HttpError(`Something went wrong, could not find a transport.${err}`, 500)
        return next(error)
    }

    // const place = DUMMY.find((p) => {
    //     return p.id === placeId;
    // })

    if (!transport) {
        throw new HttpError('Could not find a transport for the provided id.', 404)
        return next(error)
        // error.code = 404
        // throw error
        // return res.status(404).json({ message: 'Could not find a place for the provided id.' })
    }

    // console.log("GET Request in Places", institute);
    res.json({ transport: transport })
}

const putId = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError('Invalid inputs passed, please check your data', 422);
    }

    const {
        student_id,
        transport_pickup, transport_busfee, transport_paid,
        transport_due, transport_status, transport_created_at,
    } = req.body;

    let student;
    let transport;
    if (student_id.substring(0, 2) == "ST") {
        try {
            // Query by the custom student_id field
            student = await Student.find({ student_id: student_id });

            if (!student) {
                return res.status(404).json({ message: 'Student not found' });
            }
        } catch (err) {
            console.error('Error fetching student:', err);
            return next(new HttpError('Fetching student failed, please try again later.', 500));
        }


        try {
            transport = await Transport.findOne({ student_id });
            student=student[0]

            if (!transport) {
                const createdTransport = new Transport({
                    student_id:  student_id,
                    student_name: student.student_name,
                    student_gender: student.student_gender,
                    student_roll: student.student_roll,
                    student_class: student.student_class,
                    student_section: student.student_section,
                    student_city: student.student_city,
                    student_pincode: student.student_pincode,
                    student_guardian_name: student.student_guardian_name,
                    relation_to_student: student.relation_to_student,
                    student_contact: student.student_contact,
                    student_medical: student.student_medical,
                    student_specify: student.student_specify,
                    transport_pickup,
                    transport_busfee,
                    transport_paid,
                    transport_due,
                    transport_status,
                    transport_created_at,
                });

                try {
                    const sess = await mongoose.startSession();
                    sess.startTransaction();
                    await createdTransport.save({ session: sess });
                    await sess.commitTransaction();
                    sess.endSession();
                } catch (err) {
                    console.error('Error creating transport:', err);
                    return next(new HttpError(`Creating transport failed, Please try again. ${err}`, 500));
                }

                res.status(201).json({ transport: createdTransport });
            } else {
                res.status(200).json({ message: 'Transport already exists', transport });
            }
        } catch (err) {
            console.error('Error fetching or creating transport:', err);
            return next(new HttpError('Error processing transport data, please try again later.', 500));
        }
    }
    else if (student_id.substring(0, 2) == "SF") {
        try {
            // Query by the custom student_id field
            student = await Staff.find({ staff_id: student_id });
            console.log(student)

            if (!student) {
                return res.status(404).json({ message: 'Staff not found' });
            }
        } catch (err) {
            console.error('Error fetching staff:', err);
            return next(new HttpError('Fetching staff failed, please try again later.', 500));
        }


        try {
            transport = await Transport.findOne({ student_id });
            student=student[0]
            if (!transport) {
                const createdTransport = new Transport({
                    student_id:  student_id,
                    student_name: student.staff_name,
                    student_gender: student.staff_gender,
                    student_roll: student.staff_title,
                    student_class: student.staff_class,
                    student_section: student.staff_section,
                    student_city: student.staff_city,
                    student_pincode: student.staff_pincode,
                    student_guardian_name: student.staff_name,
                    relation_to_student: student.staff_name,
                    student_contact: student.staff_contact,
                    student_medical: student.staff_medical,
                    student_specify: student.staff_specify,
                    transport_pickup,
                    transport_busfee,
                    transport_paid,
                    transport_due,
                    transport_status,
                    transport_created_at,
                });

                try {
                    const sess = await mongoose.startSession();
                    sess.startTransaction();
                    await createdTransport.save({ session: sess });
                    await sess.commitTransaction();
                    sess.endSession();
                } catch (err) {
                    console.error('Error creating transport:', err);
                    return next(new HttpError(`Creating transport failed, Please try again. ${err}`, 500));
                }

                res.status(201).json({ transport: createdTransport });
            } else {
                res.status(200).json({ message: 'Transport already exists', transport });
            }
        } catch (err) {
            console.error('Error fetching or creating transport:', err);
            return next(new HttpError('Error processing transport data, please try again later.', 500));
        }
    }


};

const createTransport = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // console.log(errors)
        // res.status(422)
        throw new HttpError('Invalid inputs passed, please check your data')
    }

    const {
        transport_pickup, transport_busfee, transport_paid,
        transport_due, transport_status,
    } = req.body
    const studentId = req.params.aid
    // console.log(studentId)

    let transport
    try {
        transport = await Transport.find({ student_id: studentId })
        // console.log(item)
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update transport.${err}`, 500)
        return next(error)
    }
    transport = transport[0]

    // const updatedPlace = DUMMY.find(p => p.id === placeId)
    // const placeIndex = DUMMY.find(p => p.id === placeId)


    transport.transport_pickup = transport_pickup
    transport.transport_busfee = transport_busfee
    transport.transport_paid = transport_paid
    transport.transport_due = transport_due
    transport.transport_status = transport_status

    try {
        await transport.save()
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update transport.${err}`, 500)
        return next(error)
    }

    // DUMMY[placeIndex] = updatedPlace

    res.status(200).json({ transport })
}

const updateTransport = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // res.status(422)
        return next(new HttpError('Invalid inputs passed, please check your data'))
    }

    const { student_name, student_gender,
        student_roll, student_class, student_section,
        student_city, student_pincode, student_guardian_name,
        relation_to_student, student_contact, student_medical, student_specify,
        transport_pickup, transport_busfee, transport_paid,
        transport_due, transport_status,
    } = req.body
    const studentId = req.params.sid

    let transport
    try {
        transport = await Transport.find({ student_id: studentId })
        console.log(transport)

    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update transport.${err}`, 500)
        return next(error)
    }
    transport = transport[1]

    // const updatedPlace = DUMMY.find(p => p.id === placeId)
    // const placeIndex = DUMMY.find(p => p.id === placeId)
    transport.student_name = student_name
    transport.student_gender = student_gender
    transport.student_roll = student_roll
    transport.student_class = student_class
    transport.student_section = student_section
    transport.student_city = student_city
    transport.student_pincode = student_pincode
    transport.student_guardian_name = student_guardian_name
    transport.relation_to_student = relation_to_student
    transport.student_contact = student_contact
    transport.student_medical = student_medical
    transport.student_specify = student_specify
    transport.transport_pickup = transport_pickup
    transport.transport_busfee = transport_busfee
    transport.transport_paid = transport_paid
    transport.transport_due = transport_due
    transport.transport_status = transport_status

    try {
        await transport.save()
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update transport.${err}`, 500)
        return next(error)
    }

    // DUMMY[placeIndex] = updatedPlace

    res.status(200).json({ transport })
}

const searchTransport = async (req, res, next) => {
    const search = req.params.sid;
    console.log(req.query)
    let transports
    try {
        transports = await Transport.find({
            $or: [
                { student_id: { $regex: search, $options: 'i' } },
                { student_name: { $regex: search, $options: 'i' } },
                { student_roll: { $regex: search, $options: 'i' } },
                { student_class: { $regex: search, $options: 'i' } },
                { student_contact: { $regex: search, $options: 'i' } },
                { transport_pickup: { $regex: search, $options: 'i' } },
                { transport_busfee: { $regex: search, $options: 'i' } },
                { transport_paid: { $regex: search, $options: 'i' } },
                { transport_due: { $regex: search, $options: 'i' } },
                { transport_status: { $regex: search, $options: 'i' } },
            ]
        });
    } catch (err) {
        const error = new HttpError(`Something went wrong, could not find a transport.${err}`, 500)
        return next(error)
    }

    // const place = DUMMY.find((p) => {
    //     return p.id === placeId;
    // })

    if (!transports) {
        throw new HttpError('Could not find a transport for the provided id.', 404)
        return next(error)
        // error.code = 404
        // throw error
        // return res.status(404).json({ message: 'Could not find a place for the provided id.' })
    }

    // console.log("GET Request in Places", institute);
    res.json({ transports: transports })
}

const deleteTransport = async (req, res, next) => {
    const studentId = req.params.sid
    // console.log(schoolId)
    let transport
    try {
        transport = await Transport.findOne({ student_id: studentId })
        // console.log(school)
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not delete transport. ${err}`, 500)
        return next(error)
    }

    // if (!DUMMY.find(p => p.id === placeId)) {
    //     throw new HttpError('Could not find a place for that id', 404)
    // }

    // DUMMY = DUMMY.filter(p => p.id !== placeId)

    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await transport.deleteOne({ session: sess })
        await sess.commitTransaction()
        sess.endSession();

    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not delete transport. ${err}`, 500)
        return next(error)
    }

    res.status(200).json({ message: 'Deleted transport.' })
}

exports.getTransport = getTransport
exports.getTransportById = getTransportById
exports.putId = putId;
exports.createTransport = createTransport
exports.updateTransport = updateTransport
exports.searchTransport = searchTransport
exports.deleteTransport = deleteTransport