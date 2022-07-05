
const { src, dest, watch, series, parallel, lastRun } = require('gulp');

const postcss = require('gulp-postcss');

const imageUrlReplace = require('../index');

const modifyBackground = ()=>{
    src('./code/**/*.css')
    .pipe(postcss([imageUrlReplace({
        domains: [
            {
                site: "up",
                host: "//p1.xxx.com"
            },
            {
                site: "ali",
                host: "//papu.xxx.com"
            },
        ]
    })]))
    .pipe(dest('dest/'))
}


exports.test = series(modifyBackground)