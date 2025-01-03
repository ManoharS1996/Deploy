const { v4: uuid } = require('uuid')
const mongoose = require("mongoose")
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const Calendar = require('../models/calendar')


const getCalendar = async (req, res, next) => {

    let last
    let lastId
    let newId
    try {
        const long = (await Calendar.find({})).length
        if (long) {
            last = await Calendar.findOne().sort({ _id: -1 }); // Sort by _id in descending order
            lastId = parseInt(last.event_id.slice(1)); // Extract numeric part

        } else {
            lastId = 0
            // console.log("No documents found.");
        }
        const prefix = "E";
        const newNumber = lastId + 1;
        const paddedNumber = newNumber.toString().padStart(7, "0"); // Pads with leading zeros
        newId = prefix + paddedNumber;
        // console.log(newId)

    }
    catch (err) {
        const error = new HttpError(`Creating Calendar failed, Please try again. ${err}`, 500)
        return next(error)
    }

    let events
    try {
        events = await Calendar.find({})
        // .skip(0)
        // .limit(20)

    }
    catch (err) {
        const error = new HttpError(`Fetching events failed, please try again later. ${err}`, 500)
        return next(error)
    }
    res.json({ events: events.map(event => event.toObject({ getters: true })), newId: newId })
}

const getCalendarById = async (req, res, next) => {
    const eventId = req.params.sid;
    let event
    try {
        event = await Calendar.find({ event_id: eventId })

    } catch (err) {
        const error = new HttpError(`Something went wrong, could not find a event.${err}`, 500)
        return next(error)
    }

    // const place = DUMMY.find((p) => {
    //     return p.id === placeId;
    // })

    if (!event) {
        throw new HttpError('Could not find a event for the provided id.', 404)
        return next(error)
        // error.code = 404
        // throw error
        // return res.status(404).json({ message: 'Could not find a place for the provided id.' })
    }

    // console.log("GET Request in Places", institute);
    res.json({ event: event })
}

const putId = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // console.log(errors)
        // res.status(422)
        throw new HttpError('Invalid inputs passed, please check your data')
    }


    const {
        event_id, event_title,
        event_description, event_start_date,
        event_end_date, event_created_at

    } = req.body

    const createdEvent = new Calendar({
        event_id, event_title,
        event_description, event_start_date,
        event_end_date, event_created_at
    })
    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await createdEvent.save({ session: sess })
        await sess.commitTransaction()
        sess.endSession();

    }
    catch (err) {
        const error = new HttpError(`Creating circular failed, Please try again. ${err}`, 500)
        return next(error)
    }

    // DUMMY.push(createdPlace)

    res.status(201).json({ event: createdEvent })
}

// const createCircular = async (req, res, next) => {

//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//         // console.log(errors)
//         // res.status(422)
//         throw new HttpError('Invalid inputs passed, please check your data')
//     }

//     const {
//         circular_title, circular_subject,
//         circular_receiver, circular_status, circular_date,
//         circular_description,
//     } = req.body
//     const circularId = req.params.aid
//     // console.log(studentId)

//     let circular
//     try {
//         circular = await Circular.find({ circular_id: circularId })
//         // console.log(circular)
//     }
//     catch (err) {
//         const error = new HttpError(`Something went wrong, could not update circular.${err}`, 500)
//         return next(error)
//     }
//     circular = circular[0]

//     // const updatedPlace = DUMMY.find(p => p.id === placeId)
//     // const placeIndex = DUMMY.find(p => p.id === placeId)

//     circular.circular_title = circular_title
//     circular.circular_subject = circular_subject
//     circular.circular_receiver = circular_receiver
//     circular.circular_status = circular_status
//     circular.circular_date = circular_date
//     circular.circular_description = circular_description

//     try {
//         await circular.save()
//     }
//     catch (err) {
//         const error = new HttpError(`Something went wrong, could not update circular.${err}`, 500)
//         return next(error)
//     }

//     // DUMMY[placeIndex] = updatedPlace

//     res.status(200).json({ circular })
// }

// const updateCircular = async (req, res, next) => {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//         // res.status(422)
//         return next(new HttpError('Invalid inputs passed, please check your data'))
//     }

//     const {  circular_title, circular_subject,
//         circular_receiver, circular_status, circular_date,
//         circular_description,
//     } = req.body
//     const circularId = req.params.sid

//     let circular
//     try {
//         circular = await Circular.find({ circular_id: circularId })
//         // console.log(circular)

//     }
//     catch (err) {
//         const error = new HttpError(`Something went wrong, could not update circular.${err}`, 500)
//         return next(error)
//     }
//     circular = circular[1]

//     // const updatedPlace = DUMMY.find(p => p.id === placeId)
//     // const placeIndex = DUMMY.find(p => p.id === placeId)
//     circular.circular_title = circular_title
//     circular.circular_subject = circular_subject
//     circular.circular_receiver = circular_receiver
//     circular.circular_status = circular_status
//     circular.circular_date = circular_date
//     circular.circular_description = circular_description

//     try {
//         await circular.save()
//     }
//     catch (err) {
//         const error = new HttpError(`Something went wrong, could not update circular.${err}`, 500)
//         return next(error)
//     }

//     // DUMMY[placeIndex] = updatedPlace

//     res.status(200).json({ circular })
// }

// const searchCircular = async (req, res, next) => {
//     const search = req.params.sid;
//     console.log(req.query)
//     let circulars
//     try {
//         circulars = await Circular.find({
//             $or: [
//                 { circular_id: { $regex: search, $options: 'i' } },
//                 { circular_title: { $regex: search, $options: 'i' } },
//                 { circular_subject: { $regex: search, $options: 'i' } },
//                 { circular_receiver: { $regex: search, $options: 'i' } },
//                 { circular_status: { $regex: search, $options: 'i' } },
//                 { circular_date: { $regex: search, $options: 'i' } },
//             ]
//         });
//     } catch (err) {
//         const error = new HttpError(`Something went wrong, could not find a circular.${err}`, 500)
//         return next(error)
//     }

//     // const place = DUMMY.find((p) => {
//     //     return p.id === placeId;
//     // })

//     if (!circulars) {
//         throw new HttpError('Could not find a circular for the provided id.', 404)
//         return next(error)
//         // error.code = 404
//         // throw error
//         // return res.status(404).json({ message: 'Could not find a place for the provided id.' })
//     }

//     // console.log("GET Request in Places", institute);
//     res.json({ circulars: circulars })
// }

const deleteCalendar = async (req, res, next) => {
    const eventId = req.params.sid
    // console.log(schoolId)
    let event
    try {
        event = await Calendar.findOne({ event_id: eventId })
        // console.log(school)
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not delete event. ${err}`, 500)
        return next(error)
    }

    // if (!DUMMY.find(p => p.id === placeId)) {
    //     throw new HttpError('Could not find a place for that id', 404)
    // }

    // DUMMY = DUMMY.filter(p => p.id !== placeId)

    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await event.deleteOne({ session: sess })
        await sess.commitTransaction()
        sess.endSession();

    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not delete event. ${err}`, 500)
        return next(error)
    }

    res.status(200).json({ message: 'Deleted event.' })
}

exports.getCalendar = getCalendar
exports.getCalendarById = getCalendarById
exports.putId = putId;
// exports.createCircular = createCircular
// exports.updateCircular = updateCircular
// exports.searchCircular = searchCircular
exports.deleteCalendar = deleteCalendar