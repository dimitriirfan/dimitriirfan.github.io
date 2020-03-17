const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass'); 

// compile sass file into css
gulp.task('sass', () => { 
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
})

// gulp.task('js', () => { 
//     return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/@popperjs/core/dist/umd/popper.min.js'])
//     .pipe(gulp.dest('src/js'))
//     .pipe(browserSync.stream());
// })

// create server and wathcing file 
gulp.task('serve', gulp.series('sass', () => {
    browserSync.init({
        server: './src'
    });

    gulp.watch('src/scss/*.scss', gulp.series('sass')); 
    gulp.watch('src/*.html').on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('serve')) 