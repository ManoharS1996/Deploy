const express = require("express");
const { check } = require('express-validator')

const inventoryControllers = require('../controllers/inventories-controllers')

const HttpError = require('../models/http-error')

const router = express.Router();

router.get("/", inventoryControllers.getInventory)

router.get("/:sid", inventoryControllers.getInventoryById)

router.post("/", inventoryControllers.putId);

router.patch('/:aid', [
    check('item_name').not().isEmpty(),
    check('item_category').not().isEmpty(),
    check('item_quantity').not().isEmpty(),
], inventoryControllers.createInventory)

router.patch('/:sid', inventoryControllers.updateInventory)

router.get('/get/:sid', inventoryControllers.searchInventory)

router.delete('/:sid', inventoryControllers.deleteInventory)

module.exports = router;
