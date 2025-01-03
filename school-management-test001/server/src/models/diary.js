const mongoose = require('mongoose')

const Schema = mongoose.Schema


const diarySchema = new Schema({
    diary_id:{ type: String, required: true },
    staff_id:{ type: String, required: true },
    staff_name:{ type: String, required: true },
    date:{ type: String, required: true },
    student_class:{ type: String, required: true },
    section:{ type: String, required: true },
    subject:{ type: String, required: true },
    diarys:{ type: String, required: true },
    diary_status:{ type: String, required: true },


    diary_created_at: { type: String, required: true }

    // creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }

})

module.exports = mongoose.model('Diary', diarySchema)