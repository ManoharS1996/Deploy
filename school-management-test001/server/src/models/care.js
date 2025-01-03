const mongoose = require('mongoose')

const Schema = mongoose.Schema


const careSchema = new Schema({
    student_id:{ type: String, required: true },
    student_name:{ type: String, required: true },
    student_class:{ type: String, required: true },
    student_section:{ type: String, required: true },
    care_id:{ type: String, required: true },
    care_name:{ type: String, required: true },
    care_description:{ type: String, required: true },
    care_status:{ type: String, required: true },

    care_created_at: { type: String, required: true }

    // creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }

})

module.exports = mongoose.model('Care', careSchema)