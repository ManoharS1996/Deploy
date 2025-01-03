const mongoose = require('mongoose')

const Schema = mongoose.Schema


const circularSchema = new Schema({
    circular_id: { type: String, required: true },
    circular_title:{ type: String, required: true },
    circular_subject:{ type: String, required: true },
    circular_receiver:{ type: String, required: true },
    circular_status:{ type: String, required: true },
    circular_date:{ type: String, required: true },
   circular_description:{ type: String, required: true },
    circular_created_at:{ type: String, required: true }

    // creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }

})

module.exports = mongoose.model('Circular', circularSchema)