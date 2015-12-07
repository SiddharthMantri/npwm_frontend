var fs = require('fs'),
    gulp = require('gulp'),
   concat = require('gulp-concat'),
   header = require('gulp-header'),
   rename = require('gulp-rename'),
   uglify = require('gulp-uglify'),
   templateCache = require('gulp-angular-templatecache'),
   sass= require('gulp-sass'),
   sourcemaps = require('gulp-sourcemaps'),
   install = require("gulp-install"),
   rev = require('gulp-rev'),
   handlebars = require('gulp-compile-handlebars'),
   rename = require('gulp-rename'),
  runSequence = require('run-sequence'),
  rimraf = require('gulp-rimraf'),
  minifyCSS = require('gulp-rename');

  var assets_array = ['bower_components/angular/angular.min.js', 'bower_components/angular-ui-router/release/angular-ui-router.js', 'bower_components/angular-cookies/angular-cookies.min.js',
  'bower_components/angular-bootstrap/ui-bootstrap.min.js','bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js','bower_components/jquery/dist/jquery.min.js','bower_components/jquery-ui/jquery-ui.min.js', 'bower_components/angular-facebook/lib/angular-facebook.js',
  'bower_components/lodash/lodash.min.js', 'bower_components/ngmap/build/scripts/ng-map.min.js', 'bower_components/ngstorage/ngStorage.min.js','bower_components/momentjs/min/moment.min.js','bower_components/ngSmoothScroll/angular-smooth-scroll.min.js', 'bower_components/angular-ui-notification/dist/angular-ui-notification.min.js',
  'bower_components/angular-google-maps/dist/angular-google-maps.min.js', 'bower_components/angular-touch/angular-touch.min.js', 'bower_components/datetimepicker/jquery.datetimepicker.js',
  'bower_components/angular-loading-bar/build/loading-bar.min.js', 'bower_components/angular-awesome-slider/dist/angular-awesome-slider.min.js', 'assets/js/plugins/angularfileupload.min.js', 'assets/js/plugins/nguimap.js',
  'assets/js/plugins/scrollToFixed.js', 'assets/js/plugins/ngmap.js']

gulp.task('all-install', function(){
  gulp.src(['./bower.json'])
      .pipe(install({allowRoot: true}));
})

gulp.task('clean', function(){
  gulp.src('assets/dist/*', { read: false })
    .pipe(rimraf({ force: true }));
});
 
gulp.task('sass', function () {
  gulp.src('assets/css/*.sass')
    .pipe(sass())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('assets/css'))
    .pipe(sourcemaps.write())
    .pipe(rev())
    .pipe(gulp.dest('assets/dist'))
    .pipe(rev.manifest({base:'assets/dist',
      merge: true}))
    .pipe(gulp.dest('assets/dist'));
});
gulp.task('fonts', function(){
  gulp.src('assets/css/fonts/*').
    pipe(gulp.dest('assets/dist/fonts'));
})
gulp.task('sass2', function () {
  gulp.src('assets/css/*.sass')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('assets/css'))
    .pipe(rev())
    .pipe(gulp.dest('assets/dist'))
    .pipe(rev.manifest({base:'assets/dist',
      merge: true}))
    .pipe(gulp.dest('assets/dist'));
});

gulp.task('vendor_css', function(){
  gulp.src(['bower_components/bootstrap/dist/css/bootstrap.min.css','bower_components/font-awesome/css/font-awesome.min.css','assets/css/line-style.css','bower_components/angular-loading-bar/build/loading-bar.css','bower_components/angular-ui-notification/dist/angular-ui-notification.min.css','assets/bsdpnative/css/bootstrap-datetimepicker.css','bower_components/angular-awesome-slider/dist/css/angular-awesome-slider.min.css','bower_components/datetimepicker/jquery.datetimepicker.css'])
    .pipe(concat('vendor.css'))
    .pipe(rev())
    .pipe(gulp.dest('assets/dist'))
    .pipe(rev.manifest({base:'assets/dist',
      merge: true}))
    .pipe(gulp.dest('assets/dist'));
});
 
gulp.task('vendor_js', function(){
  gulp.src(assets_array)
    .pipe(concat('vendor.js'))
    .pipe(rev())
    .pipe(gulp.dest('assets/dist'))
    .pipe(rev.manifest({
      base:'assets/dist',
      merge: true
    }))
    .pipe(gulp.dest('assets/dist'));
})

//gulp.task('sass:watch', function () {
//  gulp.watch('./sass/**/*.scss', ['sass']);
//});
gulp.task('comboComponents', function(){
  return gulp.src('bower_components/**/*.js')
    .pipe(concat('combined_bower.js'))
    .pip(rev())
    .pipe(uglify())
    .pipe(gulp.dest('assets/dist'))
    .pipe(rev.manifest({base: 'assets/dist',
      merge: true}))    
    .pipe(gulp.dest('assets/dist'));
})
gulp.task('scripts', function () {
   return  gulp.src('assets/js/controllers/*.js')
    .pipe(concat('combined.js'))
    .pipe(rev())
    // .pipe(uglify())
    .pipe(gulp.dest('assets/dist'))
    .pipe(rev.manifest({base: 'assets/dist',
      merge: true}))    
    .pipe(gulp.dest('assets/dist'));
});

gulp.task('templates', function(){
  var TEMPLATE_HEADER = 'angular.module("templates",[]).run(["$templateCache", function($templateCache) {';
  return gulp.src('assets/partials/*.html')
    .pipe(templateCache({standalone: false,templateHeader: TEMPLATE_HEADER}))
    .pipe(rev())
    .pipe(gulp.dest('assets/dist'))
    .pipe(rev.manifest({base: 'assets/dist',
      merge: true}))
    .pipe(gulp.dest('assets/dist'));
});

var handlebarOpts = {
    helpers: {
        assetPath: function (path, context) {
            return ['assets','dist',context.data.root[path]].join('/');
        }
    }
};

gulp.task('app_version', function(){
  return gulp.src('assets/js/app.js')
    .pipe(rev())
    .pipe(gulp.dest('assets/dist'))
    .pipe(rev.manifest({base:'assets/dist',
      merge: true}))
    .pipe(gulp.dest('assets/dist'));
})

gulp.task('compile index.html', function () {
    // read in our manifest file
    var manifest = JSON.parse(fs.readFileSync('rev-manifest.json', 'utf8'));

    // read in our handlebars template, compile it using
    // our manifest, and output it to index.html
    return gulp.src('index.hbs')
        .pipe(handlebars(manifest, handlebarOpts))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(''));
});

gulp.task('build', function(callback) {
  runSequence('all-install','clean',
              ['scripts', 'templates','vendor_css', 'sass2', 'vendor_js'],'app_version', 'fonts',
              'compile index.html');
});

gulp.task('default',['build']);