/*jslint node: true */

'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var ngTemplates = require('gulp-ng-templates');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var cors = require('cors');
var fs = require('fs');
var mainBowerFiles = require('main-bower-files');
var shell = require('gulp-shell');

// package config
var config = JSON.parse(fs.readFileSync('./package.json'));

// paths
var paths = {
    js: [
        './src/js/app.js',
        './src/js/core/**/*.module.js',
        './src/js/core/**/*.controller.js',
        './src/js/core/**/*.service.js',
        './src/js/core/**/*.directive.js',
        './src/js/core/**/*.filter.js',
        './src/js/components/**/*.module.js',
        './src/js/components/**/*.controller.js',
        './src/js/components/**/*.service.js',
        './src/js/components/**/*.directive.js',
        './src/js/components/**/*.filter.js'
    ],

    css: [
        './dist/css/**/*.css'
    ],

    sass: [
        './src/sass/**/*.scss'
    ],

    html: './src/**/*.view.html'
};

// transform used by gulp inject
var transform = function (path) {
    if (path.slice(-4) === '.css') {
        return '<link rel="stylesheet" href="' + path + '?v=' + Math.ceil(Math.random() * 10000) + '"/>';
    }
    path += '?v=' + Math.ceil(Math.random() * 10000);
    // return inject.transform.apply(inject.transform, arguments);
    return '<script type="text/javascript" src="' + path + '"></script>';
};

// clean task
gulp.task('clean', function () {
    return gulp.src('./dist/*', {read: false})
        .pipe(clean());
});

// copy css task
gulp.task('copy-css', function () {
    return gulp.src('./src/css/**').pipe(gulp.dest('./dist/css'));
});

// copy images task
gulp.task('copy-images', function () {
    return gulp.src('./src/images/**').pipe(gulp.dest('./dist/images'));
});

// copy bower files task
gulp.task('copy-bower-files', function(){
    gulp.src(mainBowerFiles('**/*.js'))
        .pipe(concat("vendor.js"))
        .pipe(gulp.dest('./dist/vendor'));

    gulp.src(mainBowerFiles('**/*.css'))
        .pipe(concat("vendor.css"))
        .pipe(gulp.dest('./dist/vendor'));
});

// sass task
gulp.task('sass', function () {
    return gulp.src('./src/sass/main.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('./dist/css/'));
    // .on('end', done);
});

// generate angular templates module (template cache)
gulp.task('templates', function () {
    return gulp.src(['./src/js/**/*.view.html', './src/js/**/*.template.html'])
        .pipe(ngTemplates({
            filename: 'templates.js',
            module: config.moduleName,
            standalone: false
        }))
        .pipe(gulp.dest('./dist/js'));
});

// compile js files
gulp.task('compile-js', function () {
    return gulp.src(paths.js)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./dist/js'));
});

// javascript hint task
gulp.task('jshint', function () {
    gulp.src('./src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

// inject dev files to json
gulp.task('inject-dev', function(){

    gulp.src('./index.html')
        .pipe(inject(gulp.src(['./dist/**/*.css'], {read: false}), {
            relative: true,
            name: 'angular',
            transform: transform
        }))
        .pipe(inject(gulp.src(paths.js, {read: false}), {
            relative: true,
            name: 'angular',
            transform: transform
        }))
        .pipe(inject(gulp.src(mainBowerFiles()), {
            relative: true,
            name: 'vendor',
            transform: transform
        }))
        .pipe(inject(gulp.src(['./dist/js/templates.js'], {read: false}), {
            relative: true,
            name: 'templates',
            transform: transform
        }))
        .pipe(gulp.dest('./'));
});

// inject production files to json
gulp.task('inject-production', function(){
    gulp.src('./index.html')
        .pipe(inject(gulp.src(['./dist/css/**/*.css'], {read: false}), {
            relative: true,
            name: 'angular',
            transform: transform
        }))
        .pipe(inject(gulp.src(['./dist/js/**/*.js', '!./dist/js/templates.js'], {read: false}), {
            relative: true,
            name: 'angular',
            transform: transform
        }))
        .pipe(inject(gulp.src(['./dist/vendor/**/*.js', './dist/vendor/**/*.css'], {read: false}), {
            relative: true,
            name: 'vendor',
            transform: transform
        }))
        .pipe(inject(gulp.src(['./dist/js/templates.js'], {read: false}), {
            relative: true,
            name: 'templates',
            transform: transform
        }))
        .pipe(gulp.dest('./'));
});

// watch task
gulp.task('watch', function () {
    gulp.watch(paths.css, ['copy-css', 'inject-dev']);
    gulp.watch(paths.sass, ['sass', 'inject-dev']);
    gulp.watch(paths.html, ['templates', 'inject-dev']);
    gulp.watch(paths.js, ['inject-dev']);
});

// run local web server, that will be used to serve angular files
gulp.task('webserver', function () {
    connect.server({
        name: config.name,
        root: "." + config.webServer.path,
        port: config.webServer.port,
        livereload: true,
        middleware: function () {
            return [cors()];
        }
    });
});

// build dev
gulp.task('build', function () {
    runSequence('clean', 'copy-css', 'copy-images', 'sass','templates', 'inject-dev');
});

// build production
gulp.task('build:production', function () {
    runSequence('clean', 'sass', 'copy-bower-files', 'copy-css', 'copy-images', 'templates', 'compile-js', 'inject-production');
});

// build docker image
gulp.task('build:docker', ['build:production'], function () {
    if(typeof config === 'undefined' || typeof config.docker === 'undefined' || config.docker === null){
        return;
    }

    if(typeof config.docker.registry === 'undefined' || typeof config.docker.name === 'undefined' || typeof config.docker.version === 'undefined'){
        return;
    }

    var cmd = 'docker build -t ' + config.docker.registry + config.docker.name + ":" + config.docker.version + " .";
    return gulp.src('./Dockerfile')
        .pipe(shell(cmd));
});

// build dev and start local server
gulp.task('serve', ['build', 'webserver', 'watch']);

// build production and start local server
gulp.task('serve:production', ['build:production', 'webserver', 'watch']);
