const { src, dest, series, watch, parallel } = require('gulp')
// const pug = require('gulp-pug')
const sass = require('gulp-sass')
// const replace = require('gulp-replace')
const minifyCSS = require('gulp-csso')
var del = require('del')

function clean() {
	return del(['build'])
}

function css() {
	return src('src/scss/*.scss')
		.pipe(sass())
		.pipe(minifyCSS())
		.pipe(dest('build/css'))
}

function dev() {
	watch('src/scss', parallel(css))
}

exports.clean = clean
exports.dev = parallel(dev)
exports.default = series(clean, parallel(css))
