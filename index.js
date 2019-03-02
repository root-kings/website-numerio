const express = require('express')
// const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')

const PORT = process.env.PORT || 3000
// const DBPORT = process.env.MONGODB_URI

let app = express()

// mongoose.connect(DBPORT)
// mongoose.Promise = global.Promise

// let db = mongoose.connection
// db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(logger('dev'))
app.use(cors())

app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())

app.use(express.static('public'))
app.use(express.static('build'))

app.set('view engine', 'pug')
app.set('views', './views')

app.use('/', require('./routes'))

app.listen(PORT, err => {
	if (err) {
		throw err
	}
	console.info('Listening on port ' + PORT + '...')
})
