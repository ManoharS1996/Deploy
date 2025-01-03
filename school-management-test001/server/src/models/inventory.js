const mongoose = require('mongoose')

const Schema = mongoose.Schema


const inventorySchema = new Schema({
    item_id: { type: String, required: true },
    item_name: { type: String, required: true },
    item_category: { type: String, required: true },
    item_quantity: { type: String, required: true },
    item_unitprice: { type: String, required: true },
    item_totalprice: { type: String, required: true },
    item_purchasedate: { type: String, required: true },
    item_brand: { type: String,  },
    item_unitmeasure: { type: String, },
    item_place: { type: String, required: true },
    item_status: { type: String, required: true },
    item_description: { type: String, required: true },

    item_created_at: { type: String, required: true }

    // creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
})

module.exports = mongoose.model('Inventory', inventorySchema)