var gulp   = require('gulp'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify-css'),
    fixer  = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify');

//Watcher
gulp.task("default", ["build"], function () {
  gulp.watch("app/**/**", ["build"]);
});

//Build
gulp.task("build", ["css", "images", "scripts", "files"], function () {
  console.log("Build Process Complete");
});

//CSS Process
gulp.task("css", function () {
  gulp.src("app/assets/css/*.css")
        .pipe(fixer())
        .pipe(concat("master.css"))
        .pipe(minify())
        .pipe(gulp.dest("dist/assets/css"));
});

//IMG Process
gulp.task("images", function () {
  gulp.src("app/assets/img/**/*")
    .pipe(gulp.dest("dist/assets/img"));
})

//JS Process
gulp.task("scripts", function () {
  gulp.src("app/scripts/**/*")
        .pipe(concat("app.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist"));
});

//File Process
gulp.task("files", function () {
  gulp.src("app/*")
        .pipe(gulp.dest("dist"));
});
