/* eslint-disable new-cap */
/* eslint-disable capitalized-comments */
let router = require('express').Router()

router.get('/', (req, res) => {
	res.render('index',{name:'Home'})
})

router.get('/about', (req, res) => {
	res.render('about')
})


// Controllers -----

module.exports = router