const mongoose = require('mongoose')

const Schema = mongoose.Schema


const instituteSchema = new Schema({
    institute_id: { type: String, required: true },
    institute_name: { type: String, required: true },
    est_year: { type: String, required: true },
    institute_category: { type: String, required: true },
    institute_type: { type: String, required: true },
    board_of_education: { type: String, required: true },
    institute_contact: { type: String, required: true },
    institute_email: { type: String, required: true },
    institute_status: { type: String, required: true },
    institute_nationality: {
        institute_nationality_id:{ type: String,required: true},
        institute_nationality_emoji: { type: String,required: true},
        institute_nationality_name: { type: String,required: true }
    },
    institute_state: {
        institute_state_id: { type: String, required: true},
        institute_state_name: { type: String, required: true},
        institute_state_code:{type: String,required: true}

    },
    institute_city: { type: String, required: true },
    institute_street: { type: String, required: true },
    institute_pincode: { type: String, required: true },
    institute_principal_name: { type: String, required: true },
    institute_principal_contact: { type: String, required: true },
    institute_principal_email: { type: String, required: true },
    institute_created_at:{type: String, required: true}

    // creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
})

module.exports = mongoose.model('Institute', instituteSchema)