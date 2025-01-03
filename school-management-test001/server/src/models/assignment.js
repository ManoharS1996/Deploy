const mongoose = require('mongoose')

const Schema = mongoose.Schema


const assignmentSchema = new Schema({
    assignment_id: { type: String, required: true },
    staff_id:{ type: String, required: true },
    staff_name:{ type: String, required: true },
    student_class:{ type: String, required: true },
    student_section:{ type: String, required: true },
    subject:{ type: String, required: true },
    assignment_name:{ type: String, required: true },
    assignment_type:{ type: String, required: true },
    assignment_description:{ type: String, required: true },
    submission_date:{ type: String, required: true },
    marks:{ type: String, required: true },
    assignment_status:{ type: String, required: true },
    assignment_created_at: { type: String, required: true }

    // creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }

})

module.exports = mongoose.model('Assignment', assignmentSchema)