const mongoose = require('mongoose')

const Schema = mongoose.Schema


const attendenceSchema = new Schema({
    attendence_id: { type: String, required: true },
    student_id: { type: String, required: true },
    student_roll:{ type: String, required: true },
    student_name:{ type: String, required: true },
    student_class:{ type: String, required: true },
    student_section:{ type: String, required: true },
    attendence_date:{type: String, required: true},
    attendence_status:{type: String, required: true},
    attendence_modified_date: { type: String, required: true },
    attendence_created_at: { type: String, required: true },

    // creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }

})

module.exports = mongoose.model('Attendence', attendenceSchema)