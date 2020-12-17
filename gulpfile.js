const { src, dest, series, parallel } = require("gulp");
const concat = require("gulp-concat");
const del = require("delete");
const minifyCSS = require("gulp-clean-css");
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const minify_ES6 = require('gulp-terser');

function cleanup() {
    return del(["build", "prod"]);
}

function js(){    
    return src("src/scripts/*.js").pipe(dest("build"));
}

function scss(){
    return src("src/styles/*.scss").pipe(sass().on('error', sass.logError)).pipe(dest("build"));
}

function min_css(){
    return src("build/*.css").pipe(concat("site.css")).pipe(minifyCSS()).pipe(dest("prod"));
}

function min_js(){
    return src("build/*.js").pipe(concat("main.js")).pipe(minify_ES6()).pipe(dest("prod"));    
}

exports.default = series(cleanup, parallel(js, scss), parallel(min_css, min_js));