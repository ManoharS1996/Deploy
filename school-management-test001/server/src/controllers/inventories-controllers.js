const { v4: uuid } = require('uuid')
const mongoose = require("mongoose")
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const Inventory = require('../models/inventory')


const getInventory = async (req, res, next) => {

    let last
    let lastId
    let newId
    try {
        const long = (await Inventory.find({})).length
        if (long) {
            last = await Inventory.findOne().sort({ _id: -1 }); // Sort by _id in descending order
            lastId = parseInt(last.item_id.slice(2)); // Extract numeric part

        } else {
            lastId = 0
            // console.log("No documents found.");
        }
        const prefix = "I";
        const newNumber = lastId + 1;
        const paddedNumber = newNumber.toString().padStart(6, "0"); // Pads with leading zeros
        newId = prefix + paddedNumber;
        // console.log(newId)

    }
    catch (err) {
        const error = new HttpError(`Creating Inventory failed, Please try again. ${err}`, 500)
        return next(error)
    }

    let items
    try {
        items = await Inventory.find({})
        // .skip(0)
        // .limit(20)

    }
    catch (err) {
        const error = new HttpError(`Fetching Inventories failed, please try again later. ${err}`, 500)
        return next(error)
    }
    res.json({ items: items.map(item => item.toObject({ getters: true })), newId: newId })
}

const getInventoryById = async (req, res, next) => {
    const itemId = req.params.sid;
    let item
    try {
        item = await Inventory.find({ item_id: itemId })

    } catch (err) {
        const error = new HttpError(`Something went wrong, could not find a item.${err}`, 500)
        return next(error)
    }

    // const place = DUMMY.find((p) => {
    //     return p.id === placeId;
    // })

    if (!item) {
        throw new HttpError('Could not find a item for the provided id.', 404)
        return next(error)
        // error.code = 404
        // throw error
        // return res.status(404).json({ message: 'Could not find a place for the provided id.' })
    }

    // console.log("GET Request in Places", institute);
    res.json({ item: item })
}

const putId = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // console.log(errors)
        // res.status(422)
        throw new HttpError('Invalid inputs passed, please check your data')
    }


    const {
        item_id,item_name,item_category,item_quantity,
        item_unitprice,item_totalprice,item_purchasedate,item_brand,
        item_unitmeasure,item_place,item_status,item_description,
        item_created_at
    } = req.body

    const createdItem = new Inventory({
        item_id,item_name,item_category,item_quantity,
        item_unitprice,item_totalprice,item_purchasedate,item_brand,
        item_unitmeasure,item_place,item_status,item_description,
        item_created_at
    })
    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await createdItem.save({ session: sess })
        await sess.commitTransaction()
        sess.endSession();

    }
    catch (err) {
        const error = new HttpError(`Creating item failed, Please try again. ${err}`, 500)
        return next(error)
    }

    // DUMMY.push(createdPlace)

    res.status(201).json({ item: createdItem })
}

const createInventory = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // console.log(errors)
        // res.status(422)
        throw new HttpError('Invalid inputs passed, please check your data')
    }

    const {
        item_name,item_category,item_quantity,
        item_unitprice,item_totalprice,item_purchasedate,item_brand,
        item_unitmeasure,item_place,item_status,item_description,
    } = req.body
    const itemId = req.params.aid
    // console.log(studentId)

    let item
    try {
        item = await Inventory.find({ item_id: itemId })
        // console.log(item)
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update item.${err}`, 500)
        return next(error)
    }
    item = item[0]

    // const updatedPlace = DUMMY.find(p => p.id === placeId)
    // const placeIndex = DUMMY.find(p => p.id === placeId)

    item.item_name = item_name
    item.item_category = item_category
    item.item_quantity = item_quantity
    item.item_unitprice = item_unitprice
    item.item_totalprice = item_totalprice
    item.item_purchasedate = item_purchasedate
    item.item_brand = item_brand
    item.item_unitmeasure = item_unitmeasure
    item.item_place = item_place
    item.item_status = item_status
    item.item_description = item_description

    try {
        await item.save()
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update item.${err}`, 500)
        return next(error)
    }

    // DUMMY[placeIndex] = updatedPlace

    res.status(200).json({ item })
}

const updateInventory = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // res.status(422)
        return next(new HttpError('Invalid inputs passed, please check your data'))
    }

    const { item_name,item_category,item_quantity,
        item_unitprice,item_totalprice,item_purchasedate,item_brand,
        item_unitmeasure,item_place,item_status,item_description,
    } = req.body
    const itemId = req.params.sid

    let item
    try {
        item = await Inventory.find({ item_id: itemId })
        console.log(item)

    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update item.${err}`, 500)
        return next(error)
    }
    item = item[1]

    // const updatedPlace = DUMMY.find(p => p.id === placeId)
    // const placeIndex = DUMMY.find(p => p.id === placeId)
    item.item_name = item_name
    item.item_category = item_category
    item.item_quantity = item_quantity
    item.item_unitprice = item_unitprice
    item.item_totalprice = item_totalprice
    item.item_purchasedate = item_purchasedate
    item.item_brand = item_brand
    item.item_unitmeasure = item_unitmeasure
    item.item_place = item_place
    item.item_status = item_status
    item.item_description = item_description

    try {
        await item.save()
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not update item.${err}`, 500)
        return next(error)
    }

    // DUMMY[placeIndex] = updatedPlace

    res.status(200).json({ item })
}

const searchInventory = async (req, res, next) => {
    const search = req.params.sid;
    console.log(req.query)
    let items
    try {
        items = await Inventory.find({
            $or: [
                { item_id: { $regex: search, $options: 'i' } },
                { item_name: { $regex: search, $options: 'i' } },
                { item_category: { $regex: search, $options: 'i' } },
                { item_brand: { $regex: search, $options: 'i' } },
                { item_quantity: { $regex: search, $options: 'i' } },
                { item_unitprice: { $regex: search, $options: 'i' } },
                { item_totalprice: { $regex: search, $options: 'i' } },
                { item_staus: { $regex: search, $options: 'i' } },
            ]
        });
    } catch (err) {
        const error = new HttpError(`Something went wrong, could not find a item.${err}`, 500)
        return next(error)
    }

    // const place = DUMMY.find((p) => {
    //     return p.id === placeId;
    // })

    if (!items) {
        throw new HttpError('Could not find a item for the provided id.', 404)
        return next(error)
        // error.code = 404
        // throw error
        // return res.status(404).json({ message: 'Could not find a place for the provided id.' })
    }

    // console.log("GET Request in Places", institute);
    res.json({ items: items })
}

const deleteInventory = async (req, res, next) => {
    const itemId = req.params.sid
    // console.log(schoolId)
    let item
    try {
        item = await Inventory.findOne({ item_id: itemId })
        // console.log(school)
    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not delete item. ${err}`, 500)
        return next(error)
    }

    // if (!DUMMY.find(p => p.id === placeId)) {
    //     throw new HttpError('Could not find a place for that id', 404)
    // }

    // DUMMY = DUMMY.filter(p => p.id !== placeId)

    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await item.deleteOne({ session: sess })
        await sess.commitTransaction()
        sess.endSession();

    }
    catch (err) {
        const error = new HttpError(`Something went wrong, could not delete item. ${err}`, 500)
        return next(error)
    }

    res.status(200).json({ message: 'Deleted item.' })
}

exports.getInventory = getInventory
exports.getInventoryById = getInventoryById
exports.putId = putId;
exports.createInventory = createInventory
exports.updateInventory = updateInventory
exports.searchInventory = searchInventory
exports.deleteInventory = deleteInventory