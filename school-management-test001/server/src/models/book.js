const mongoose = require('mongoose')

const Schema = mongoose.Schema


const bookSchema = new Schema({
    book_id: { type: String, required: true },
    book_name:{ type: String, required: true },
    book_description:{ type: String, required: true },
    copies:{ type: String, required: true },
    book_author:{ type: String, required: true },
    book_publishers:{ type: String, required: true },
    book_purchase_date:{ type: String, required: true },
    book_category:{ type: String, required: true },
    book_price:{ type: String, required: true },
    book_status:{ type: String, required: true },
    book_created_at:{ type: String, required: true }

    // creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }

})

module.exports = mongoose.model('Book', bookSchema)