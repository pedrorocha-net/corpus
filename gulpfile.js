const gulp = require('gulp');
$ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'run-sequence']
});

const spawn = require('child_process').spawn;

let node;

function server() {
  if (node) {
    node.kill();
  }

  node = spawn('node', ['src/bot.js'], {stdio: 'inherit'});
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
}

gulp.task('server', function () {
  server();
});


gulp.task('lint', function () {
  gulp.src('src/**/*.js')
    .pipe($.eslint())
    .pipe($.eslint.format());
    // .pipe($.eslint.failAfterError());
});


gulp.task('watch', ['server'], function () {
  gulp.watch(['./src/**/*.js'], ['lint', function () {
    server();
  }]);
});

gulp.task('default', ['watch']);

// clean up if an error goes unhandled.
process.on('exit', function () {
  if (node) {
    node.kill();
  }
});