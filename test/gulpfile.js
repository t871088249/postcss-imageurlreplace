
const { src, dest, watch, series, parallel, lastRun } = require('gulp');

const postcss = require('gulp-postcss');

const modifyUrlPub = require('./index');

const modifyBackground = ()=>{
    src('./code/**/*.css')
    .pipe(postcss([modifyUrlPub]))
    .pipe(dest('dest/'))
}


exports.tpl = series(modifyBackground)