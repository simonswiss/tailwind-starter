// project paths are set in package.json
const pkg = require("./package.json").paths;

const gulp = require("gulp");
const postcss = require("gulp-postcss");
const tailwindcss = require("tailwindcss");
const browserSync = require("browser-sync").create();

// compiling tailwind CSS
gulp.task("css", () => {
  return gulp
    .src(pkg.src.css + "*.css")
    .pipe(postcss([tailwindcss(pkg.config.tailwind), require("autoprefixer")]))
    .pipe(gulp.dest(pkg.dist.css));
});

// browser-sync dev server
gulp.task("serve", ["css"], () => {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  });

  gulp.watch(pkg.src.css + "*.css", ["css"]);
  gulp.watch(pkg.config.tailwind, ["css"]);
  gulp.watch(pkg.dist.base + "*.html").on("change", browserSync.reload);
});

// default task
gulp.task("default", ["serve"]);
