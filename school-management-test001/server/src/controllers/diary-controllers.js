const { v4: uuid } = require('uuid')
const mongoose = require("mongoose")
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const Diary = require('../models/diary')


const getDiary = async (req, res, next) => {

    let last
    let lastId
    let newId
    try {
        const long = (await Diary.find({})).length
        if (long) {
            last = await Diary.findOne().sort({ _id: -1 }); // Sort by _id in descending order
            lastId = parseInt(last.diary_id.slice(1)); // Extract numeric part

        } else {
            lastId = 0
            // console.log("No documents found.");
        }
        const prefix = "D";
        const newNumber = lastId + 1;
        const paddedNumber = newNumber.toString().padStart(7, "0"); // Pads with leading zeros
        newId = prefix + paddedNumber;
        // console.log(newId)

    }
    catch (err) {
        const error = new HttpError(`Creating Diary failed, Please try again. ${err}`, 500)
        return next(error)
    }

    let diaries
    try {
        diaries = await Diary.find({})
        // .skip(0)
        // .limit(20)

    }
    catch (err) {
        const error = new HttpError(`Fetching Diaries failed, please try again later. ${err}`, 500)
        return next(error)
    }
    res.json({ diaries: diaries.map(diary => diary.toObject({ getters: true })), newId: newId })
}

const getDiaryById = async (req, res, next) => {
    const diaryId = req.params.sid;
    let diary
    try {
        diary = await Diary.find({ diary_id: diaryId })

    } catch (err) {
        const error = new HttpError(`Something went wrong, could not find a diary.${err}`, 500)
        return next(error)
    }

    // const place = DUMMY.find((p) => {
    //     return p.id === placeId;
    // })

    if (!diary) {
        throw new HttpError('Could not find a diary for the provided id.', 404)
        return next(error)
        // error.code = 404
        // throw error
        // return res.status(404).json({ message: 'Could not find a place for the provided id.' })
    }

    // console.log("GET Request in Places", institute);
    res.json({ diary: diary })
}

const putId = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // console.log(errors)
        // res.status(422)
        throw new HttpError('Invalid inputs passed, please check your data')
    }


    const {
        diary_id,staff_id,staff_name,date,
        student_class,section,subject,
        diarys,diary_status,diary_created_at
    } = req.body

    const createdDiary = new Diary({
        diary_id,staff_id,staff_name,date,
        student_class,section,subject,
        diarys,diary_status,diary_created_at
    })
    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await createdDiary.save({ session: sess })
        await sess.commitTransaction()
        sess.endSession();

    }
    catch (err) {
        const error = new HttpError(`Creating diary failed, Please try again. ${err}`, 500)
        return next(error)
    }

    // DUMMY.push(createdPlace)
// console.log({ diary: createdDiary })
    res.status(201).json({ diary: createdDiary })
}

const createDiary = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // console.log(errors)
        // res.status(422)
        throw new HttpError('Invalid inputs passed, please check your data')
    }

    const {
        staff_id,staff_name,date,
        student_class,section,subject,
        diarys,diary_status,
    } = req.body
    const diaryId = req.params.aid
    // console.log(studentId)

    let diary
    try {
        diary = await Diary.find({ diary_id: diaryId })
        // console.log(diary)
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update diary.${err}`, 500)
        return next(error)
    }
    diary = diary[0]

    // const updatedPlace = DUMMY.find(p => p.id === placeId)
    // const placeIndex = DUMMY.find(p => p.id === placeId)
    diary.staff_id = staff_id
    diary.staff_name = staff_name
    diary.date = date
    diary.student_class = student_class
    diary.section = section
    diary.subject = subject
    diary.diarys = diarys
    diary.diary_status = diary_status
    
    try {
        await diary.save()
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update diary.${err}`, 500)
        return next(error)
    }

    // DUMMY[placeIndex] = updatedPlace

    res.status(200).json({ diary })
}

const updateDiary = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // res.status(422)
        return next(new HttpError('Invalid inputs passed, please check your data'))
    }

    const {  staff_id,staff_name,date,
        student_class,section,subject,
        diarys,diary_status,
    } = req.body
    const diaryId = req.params.sid

    let diary
    try {
        diary = await Diary.find({ diary_id: diaryId })
        console.log(diary)

    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update diary.${err}`, 500)
        return next(error)
    }
    diary = diary[1]

    // const updatedPlace = DUMMY.find(p => p.id === placeId)
    // const placeIndex = DUMMY.find(p => p.id === placeId)
    diary.staff_id = staff_id
    diary.staff_name = staff_name
    diary.date = date
    diary.student_class = student_class
    diary.section = section
    diary.subject = subject
    diary.diarys = diarys
    diary.diary_status = diary_status

    try {
        await diary.save()
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update diary.${err}`, 500)
        return next(error)
    }

    // DUMMY[placeIndex] = updatedPlace

    res.status(200).json({ diary })
}

const searchDiary = async (req, res, next) => {
    const search = req.params.sid;
    console.log(req.query)
    let diaries
    try {
        diaries = await Diary.find({
            $or: [
                { diary_id: { $regex: search, $options: 'i' } },
                { date: { $regex: search, $options: 'i' } },
                { staff_name: { $regex: search, $options: 'i' } },
                { subject: { $regex: search, $options: 'i' } },
                { diarys: { $regex: search, $options: 'i' } },
                { student_class: { $regex: search, $options: 'i' } },
            ]
        });
    } catch (err) {
        const error = new HttpError(`Something went wrong, could not find a diary.${err}`, 500)
        return next(error)
    }

    // const place = DUMMY.find((p) => {
    //     return p.id === placeId;
    // })

    if (!diaries) {
        throw new HttpError('Could not find a diary for the provided id.', 404)
        return next(error)
        // error.code = 404
        // throw error
        // return res.status(404).json({ message: 'Could not find a place for the provided id.' })
    }

    // console.log("GET Request in Places", institute);
    res.json({ diaries: diaries })
}

const deleteDiary = async (req, res, next) => {
    const diaryId = req.params.sid
    // console.log(schoolId)
    let diary
    try {
        diary = await Diary.findOne({ diary_id: diaryId })
        // console.log(school)
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not delete diary. ${err}`, 500)
        return next(error)
    }

    // if (!DUMMY.find(p => p.id === placeId)) {
    //     throw new HttpError('Could not find a place for that id', 404)
    // }

    // DUMMY = DUMMY.filter(p => p.id !== placeId)

    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await diary.deleteOne({ session: sess })
        await sess.commitTransaction()
        sess.endSession();

    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not delete diary. ${err}`, 500)
        return next(error)
    }

    res.status(200).json({ message: 'Deleted diary.' })
}

exports.getDiary = getDiary
exports.getDiaryById = getDiaryById
exports.putId = putId;
exports.createDiary = createDiary
exports.updateDiary = updateDiary
exports.searchDiary = searchDiary
exports.deleteDiary = deleteDiary