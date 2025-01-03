const mongoose = require('mongoose')

const Schema = mongoose.Schema

const calendarSchema = new Schema({
    event_id: { type: String, required: true },
    event_title:{ type: String, required: true },
   event_description:{ type: String, required: true },
   event_start_date:{ type: String, required: true },
   event_end_date:{ type: String, required: true },
    event_created_at:{ type: String, required: true }

    // creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }

})

module.exports = mongoose.model('Calendar', calendarSchema)