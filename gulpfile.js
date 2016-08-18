/**SCM-Gulp脚本 -- By chenyulong*/
'use strict';
//插件载入
var gulp = require('gulp'),
    clean = require('gulp-clean'), // 制品清理
    rev = require('gulp-rev'),//版本处理
    revCollector = require('gulp-rev-collector'),//版本替换
    minifyHTML = require('gulp-minify-html'), //HTML压缩
    sass = require('gulp-ruby-sass'),//SASS编译
    plumber = require('gulp-plumber'), //SASS异常通知
    postcss = require('gulp-postcss'), //CSS后处理
    autoprefixer = require('autoprefixer'),//CSS后处理-浏览器标识补全
    cssgrace = require('cssgrace'),//CSS后处理-浏览器兼容调整
    csso = require('gulp-csso'),//CSS压缩
    sourcemaps = require('gulp-sourcemaps'), //源码映射
    jsdoc = require("gulp-jsdoc3"),//JSDOC文档
    uglify = require('gulp-uglify');//混淆压缩

gulp.task('文档生成', function () {
    gulp.src('js/scm/**/*.js').pipe(jsdoc({
        opts: {
            "destination": "./jsdoc/scm"
        }
    }));
});

gulp.task("CSS编译", function () {
    return sass('scss/scm.scss', {
        sourcemap: true,
        noCache: true
    }). //编译SASS
    pipe(plumber()). //SASS编译异常处理
    pipe(postcss([ //CSS后加工
        autoprefixer({ //浏览器标识补全
            browsers: ['last 3 version'],
            cascade: false,
            remove: false
        }),
        cssgrace//浏览器兼容性处理
    ])).
    pipe(gulp.dest('css')); //编译之后拷贝到CSS目录
});

gulp.task('开发监听', function () {
    gulp.watch(['scss/**/*.scss'], ['CSS编译']);    //CSS监听
})



