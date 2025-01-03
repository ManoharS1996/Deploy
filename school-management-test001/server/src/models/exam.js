const mongoose = require('mongoose')

const Schema = mongoose.Schema


const examSchema = new Schema({
    exam_id:{ type: String, required: true },
    exam_name:{ type: String, required: true },
    start_date:{ type: String, required: true },
    end_date:{ type: String, required: true },
    timetable:{ type: String, required: true },
    exam_status:{ type: String, required: true },
    exam_created_at: { type: String, required: true }

    // creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }

})

module.exports = mongoose.model('Exam', examSchema)