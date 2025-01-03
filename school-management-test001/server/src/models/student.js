const mongoose = require('mongoose')

const Schema = mongoose.Schema


const studentSchema = new Schema({
    student_id: { type: String, required: true },
    student_name: { type: String, required: true },
    student_gender: { type: String, required: true },
    student_date_of_birth: { type: String, required: true },
    student_nationality: {
        student_nationality_id: { type: String, required: true },
        student_nationality_emoji: { type: String, required: true },
        student_nationality_name: { type: String, required: true }
    },
    student_state: {
        student_state_id: { type: String, required: true },
        student_state_name: { type: String, required: true },
        student_state_code: { type: String, required: true }

    },
    student_city: { type: String, required: true },
    student_street: { type: String, required: true },
    student_pincode: { type: String, required: true },
    student_status: { type: String, required: true },

    student_guardian_name: { type: String, required: true },
    relation_to_student: { type: String, required: true },
    student_contact: { type: String, required: true },
    student_email: { type: String, required: true },
    parent_occupation: { type: String, required: true },

    student_previous_school: { type: String, },
    student_last_grade: { type: String, },

    student_class: { type: String, required: true },
    student_section: { type: String, required: true },
    student_roll:{ type: String, required: true },
    student_preffered_date: { type: String, },

    student_emergency_gurdian: { type: String, required: true },
    student_emergency_relation: { type: String, },
    student_emergency_contact: { type: String, required: true },

    student_medical: { type: String, required: true },
    student_specify: { type: String, required: true },

    student_created_at: { type: String, required: true }

    // creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
})

module.exports = mongoose.model('Student', studentSchema)