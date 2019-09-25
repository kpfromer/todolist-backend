const gulp = require('gulp');
const ts = require('gulp-typescript');
const nodemon = require('gulp-nodemon');
const del = require('del');

const buildFolder = 'dist';
const tsProject = ts.createProject('tsconfig.json');

const clean = done => del(buildFolder).then(() => done());

const build = () =>
    gulp.src('src/**/*.ts').pipe(tsProject()).pipe(gulp.dest(buildFolder));

gulp.task('build', gulp.series(clean, build));

const watch = gulp.series(clean, build, done => nodemon({
                                          script: `${buildFolder}/app.js`,
                                          ext: 'ts',
                                          watch: 'src',
                                          tasks: ['build'],
                                          done
                                        }));

module.exports = {
  clean,
  watch
}