"use strict";

// Gulp
const {src, dest} = require("gulp");
const gulp = require("gulp");

// Common
const browsersync = require("browser-sync").create();
const plumber = require("gulp-plumber");
const rigger = require("gulp-rigger");
const del = require("del");
const rename = require("gulp-rename");

// CSS
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cssbeautify = require("gulp-cssbeautify");
const cssnano = require("gulp-cssnano");
const removeComments = require('gulp-strip-css-comments');

// JS
let uglify = require('gulp-uglify-es').default;

// Img
const cache = require('gulp-cache');
const imagemin = require("gulp-imagemin");
const jpegrecompress = require('imagemin-jpeg-recompress');
const pngquant = require('imagemin-pngquant');


/* Paths */
let path = {
    build: {
        html: "build/",
        js: "build/js/",
        css: "build/css/",
        images: "build/img/",
        fonts: "build/fonts/"
    },
    src: {
        html: "src/*.html",
        js: "src/js/*.js",
        css: "src/sass/style.scss",
        images: "src/img/**/*.{jpg,png,svg,gif,ico,webmanifest,xml}",
        fonts: "src/fonts/**/*.*",
    },
    watch: {
        html: "src/**/*.html",
        js: "src/js/**/*.js",
        css: "src/sass/**/*.scss",
        images: "src/img/**/*.{jpg,png,svg,gif,ico,webmanifest,xml}",
        fonts: "src/fonts/**/*.*",
    },
    clean: "./build"
}


/* Tasks */
function browserSync() {
    browsersync.init({
        server: {
            baseDir: "./build/"
        },
        port: 3000
    });
}

function browserSyncReload() {
    browsersync.reload();
}

function html() {
    return src(path.src.html, { base: "src/" })
        .pipe(plumber())
        .pipe(rigger())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}

function css() {
    return src(path.src.css, { base: "src/sass/" })
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            Browserslist: ['last 8 versions'],
            cascade: true
        }))
        .pipe(cssbeautify())
        .pipe(dest(path.build.css))
        .pipe(cssnano({
            zindex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(removeComments())
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
}

function js() {
    return src(path.src.js, {base: './src/js/'})
        .pipe(plumber())
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min",
            extname: ".js"
        }))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}

function images() {
    return src(path.src.images)
        .pipe(cache(imagemin([ // сжатие изображений
            imagemin.gifsicle({ interlaced: true }),
            jpegrecompress({
                progressive: true,
                max: 90,
                min: 80
            }),
            pngquant(),
            imagemin.svgo({ plugins: [{ removeViewBox: false }] })
        ])))
        .pipe(dest(path.build.images));
}

function fonts() {
    return src(path.src.fonts)
    .pipe(dest(path.build.fonts));
}

function clean() {
    return del(path.clean);
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.images], images);
    gulp.watch([path.watch.fonts], fonts);
}

const build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts));
const watch = gulp.parallel(build, watchFiles, browserSync);


/* Exports Tasks */
exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;


















