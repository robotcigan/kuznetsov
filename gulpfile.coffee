gulp = require 'gulp'
stylus = require 'gulp-stylus'
autoprefixer = require 'gulp-autoprefixer'
uglifycss = require 'gulp-uglifycss'
sourcemaps = require 'gulp-sourcemaps'
pug = require 'gulp-pug'
babel = require 'gulp-babel'
imagemin = require 'gulp-imagemin'
browserSync = require 'browser-sync'
reload = browserSync.reload


swallowError = (error) ->
  console.log('error from swallow function -> ', error.toString())
  this.emit('end')


gulp.task 'stylus', ->
  gulp.src 'styles/*.styl'
    .pipe sourcemaps.init()
    .pipe stylus
      'include css': true
      # use: [nib()]
      # compress: true
    .on 'error', swallowError
    .pipe autoprefixer({browsers: ['> 1%', 'last 5 version','IE 10'], cascade: false})
    # .pipe uglifycss
    #   'uglyComments': true
    .pipe sourcemaps.write('.')
    .pipe gulp.dest 'dist/styles/css/'
    .pipe(reload({stream: true, match: '**/*.css'}))


# gulp.task 'browserify', ->
#   browserify 'js/vendor.js'
#     .bundle()
#     .on 'error', swallowError
#     .pipe source('vendor.js')
#     .pipe gulp.dest './dist/js'
#     .pipe(reload({stream: true}))


gulp.task 'es6', ->
  gulp.src 'js/*.js'
    .pipe babel
      presets: ['es2015']
    .on 'error', swallowError
    .pipe gulp.dest 'dist/js'
    .pipe(reload({stream: true}))


gulp.task 'imagemin', ->
  gulp.src 'img/**/*'
  .pipe imagemin([
    imagemin.jpegtran({progressive: true})
  ], {
    verbose: true
  })
  .on 'error', swallowError
  .pipe gulp.dest('dist/img')

gulp.task 'pug', ->
  gulp.src '*.pug'
    .pipe pug {pretty: true}
    .on 'error', swallowError
    .pipe gulp.dest 'dist/'



gulp.task('pug-watch', ['pug'], reload)


gulp.task 'default', ['pug', 'stylus', 'imagemin', 'es6'], ->

  browserSync
    server: 'dist/'
    notify: false
    open: false

  gulp.watch('img/**/*', ['imagemin'])
  gulp.watch 'js/*.js', ['es6']
  # gulp.watch 'js/vendor.js', ['build']
  gulp.watch 'styles/**/*.styl', ['stylus']
  gulp.watch '*.pug', ['pug-watch']