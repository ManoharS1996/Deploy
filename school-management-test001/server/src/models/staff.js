const mongoose = require('mongoose')

const Schema = mongoose.Schema


const staffSchema = new Schema({
    staff_id: { type: String, required: true },
    staff_name: { type: String, required: true },
    staff_gender: { type: String, required: true },
    staff_date_of_birth: { type: String, required: true },
    staff_contact: { type: String, required: true },
    staff_email: { type: String, required: true },
    staff_status: { type: String, required: true },
    staff_nationality: {
        staff_nationality_id: { type: String, required: true },
        staff_nationality_emoji: { type: String, required: true },
        staff_nationality_name: { type: String, required: true }
    },
    staff_state: {
        staff_state_id: { type: String, required: true },
        staff_state_name: { type: String, required: true },
        staff_state_code: { type: String, required: true }

    },
    staff_city: { type: String, required: true },
    staff_street: { type: String, required: true },
    staff_pincode: { type: String, required: true },

    staff_title: { type: String, required: true },
    staff_department: { type: String, required: true },
    staff_degree: { type: String, required: true },
    staff_work: { type: String, required: true },
    staff_certificates: { type: String, required: true },

    staff_class: { type: String, },
    staff_section: { type: String, },

    staff_medical: { type: String, required: true },
    staff_specify: { type: String, required: true },

    staff_created_at: { type: String, required: true }

    // creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
})

module.exports = mongoose.model('Staff', staffSchema)