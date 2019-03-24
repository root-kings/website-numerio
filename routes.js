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
	res.render('about',{name:'About Us | Numerio'})
})

router.get('/blogs', (req, res) => {
	res.render('blog',{name:'Blogs | Numerio'})
})

router.get('/career', (req, res) => {
	res.render('career',{name:'Career | Numerio'})
})


router.get('/about', (req, res) => {
	res.render('about')
})


// Controllers -----

module.exports = router