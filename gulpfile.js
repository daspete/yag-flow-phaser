var gulp = require('gulp'),
    util = require('gulp-util'),
    sass = require('gulp-sass'),
    gulpif = require('gulp-if'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream'),
    browserSync = require('browser-sync'),
    sync = browserSync.create('first server');


//////////////////////////////////////////////////////////////////
// ENV vars
////////////////////////////////////////////////////////////////
var react = (util.env.react ? true : false);
var production = (util.env.production ? true : false);


//////////////////////////////////////////////////////////////////
// SASS compiler
////////////////////////////////////////////////////////////////
gulp.task('sass', function(){
    gulp.src('src/sass/styles.scss')
        .pipe(gulpif(!production, sourcemaps.init()))
        .pipe(sass.sync({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulpif(!production, sourcemaps.write('.')))
    .pipe(gulp.dest('public/css/'));
});


//////////////////////////////////////////////////////////////////
// ES6 Javascript builder
////////////////////////////////////////////////////////////////
gulp.task('js', function(){
    var extension = react ? 'jsx' : 'js';
    var presets = [ 'es2015' ];

    if(react){
        presets.push('react');
    }

    var _browserify = browserify({
        entries: 'src/js/app.' + extension,
        debug: production ? false : true,
        transform: [
            babelify.configure({
                presets: presets
            })
        ]
    });

    return _browserify.bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulpif(!production, sourcemaps.init({ loadMaps: true })))
        .pipe(uglify())
        .pipe(gulpif(!production, sourcemaps.write('.')))
        .pipe(gulp.dest('public/js'));
});


//////////////////////////////////////////////////////////////////
// Image optimization
////////////////////////////////////////////////////////////////
gulp.task('images', function(){
    gulp.src('src/assets/images/*.{png,gif,jpg}')
        .pipe(imagemin())
    .pipe(gulp.dest('public/assets/images/'));
});


//////////////////////////////////////////////////////////////////
// Watcher
////////////////////////////////////////////////////////////////
gulp.task('watch', function(){
    sync.init({
        open: false,
        port: 8089,
        server: './public/'
    });

    gulp.watch('src/sass/**.scss', ['sass']).on('change', sync.reload);
    gulp.watch('src/js/**.{js,jsx}', ['js']).on('change', sync.reload);
    gulp.watch('src/assets/images/**', ['images']).on('change', sync.reload);
    gulp.watch('public/**.html').on('change', sync.reload);
});


gulp.task('copy-phaser', function(){
    gulp.src('node_modules/phaser/build/phaser.min.js')
        .pipe(gulp.dest('public/js'));
});


//////////////////////////////////////////////////////////////////
// Default task
////////////////////////////////////////////////////////////////
gulp.task('default', [
    'sass',
    'copy-phaser',
    'js',
    'images',
    'watch'
]);