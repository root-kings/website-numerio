/* eslint-disable new-cap */
/* eslint-disable capitalized-comments */
let router = require('express').Router()

router.get('/', (req, res) => {
	res.render('index',{name:'Home | Numerio'})
})

router.get('/contact', (req, res) => {
	res.render('contact',{name:'Contact | Numerio'})
})

router.get('/marg', (req, res) => {
	res.render('marg',{name:'Marg | Numerio'})
})


router.get('/about', (req, res) => {
	res.render('about')
})


// Controllers -----

module.exports = router