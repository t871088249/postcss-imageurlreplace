
const { src, dest, watch, series, parallel, lastRun } = require('gulp');

const postcss = require('gulp-postcss');

const imageUrlReplace = require('../index');

const modifyBackground = ()=>{
    src('./code/**/*.css')
    .pipe(postcss([imageUrlReplace({
        dir: "/topic/topic1/css",
        domain:"//p1.xxx.com",
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