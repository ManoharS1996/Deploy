const express = require('express')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')

const HttpError = require('./models/http-error')

const usersRoutes = require('./routes/users-routes')
const placesRoutes = require('./routes/places-routes')
const schoolsRoutes = require('./routes/schools-routes')
const StudentsRoutes = require('./routes/students-routes')
const StaffsRoutes = require('./routes/staffs-routes')
const inventoriesRoutes = require('./routes/inventories-routes')
const transportRoutes = require('./routes/transport-routes')
const diaryRoutes=require('./routes/diary-routes')
const assignmentRoutes=require('./routes/assignments-routes')
const bookRoutes=require('./routes/books-routes')
const circularRoutes=require('./routes/circulars-routes')
const calendarRoutes=require('./routes/calendar-routes')
const careRoutes=require('./routes/care-routes')
const examRoutes=require('./routes/exams-routes')
const attendenceRoutes=require('./routes/attendence-routes')


const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE')
    next()
})

app.use('/api/places', placesRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/schools', schoolsRoutes)
app.use('/api/students', StudentsRoutes)
app.use('/api/staff', StaffsRoutes)
app.use('/api/inventory', inventoriesRoutes)
app.use('/api/transport', transportRoutes)
app.use('/api/diary', diaryRoutes)
app.use('/api/assignment', assignmentRoutes)
app.use('/api/assignment', assignmentRoutes)
app.use('/api/book', bookRoutes)
app.use('/api/circular', circularRoutes)
app.use('/api/calendar', calendarRoutes)
app.use('/api/care', careRoutes)
app.use('/api/exam', examRoutes)
app.use('/api/attendence', attendenceRoutes)


app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404)
    throw error
})

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({ message: error.message || 'An unknown error occured!' })
})

// mongoose.connect('mongodb+srv://manojchandanada2001:practice@cluster0.i7eas.mongodb.net/practice?retryWrites=true&w=majority&appName=Cluster0')
const mongourl = "mongodb+srv://admin:wondigi@wondigi.jq1js.mongodb.net/wondigi?retryWrites=true&w=majority&appName=wondigi"
mongoose.connect(mongourl)

    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('server is running at 5000')
            console.log('connected to mongodb')
        })
    })
    .catch(err => {
        console.log(err)
    })
