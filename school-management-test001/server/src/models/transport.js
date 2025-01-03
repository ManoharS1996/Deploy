const mongoose = require('mongoose')

const Schema = mongoose.Schema


const transportSchema = new Schema({

    student_id: { type: String, required: true }, 
    student_name: { type: String, required: true },
    student_gender: { type: String, required: true },
    student_roll: { type: String, required: true },
    student_class: { type: String, required: true },
    student_section: { type: String, required: true },
    student_city: { type: String, required: true },
    student_pincode: { type: String, required: true },
    student_guardian_name: { type: String, required: true },
    relation_to_student: { type: String, required: true },
    student_contact: { type: String, required: true },
    student_medical: { type: String, required: true },
    student_specify: { type: String, required: true },

    transport_pickup: { type: String, required: true },
    transport_busfee: { type: String, required: true },
    transport_paid: { type: String, required: true },
    transport_due: { type: String, required: true },
    transport_status: { type: String, required: true },

    transport_created_at: { type: String, required: true }

        // creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }

})

module.exports = mongoose.model('Transport', transportSchema)