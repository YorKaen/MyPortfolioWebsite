let project_folder = "dist";
let source_folder = "src";

let fs = require('fs');

let path = {
	build: {
		html: project_folder + "/",
		pug: project_folder + "/",
		css: project_folder + "/css/",
		js: project_folder + "/js/",
		img: project_folder + "/img/",
		fonts: project_folder + "/fonts/",
	},
	src: {
		html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
		pug: [source_folder + "/pug/*.pug", "!" + source_folder + "/_*.pug"],
		css: [source_folder + "/scss/style.scss",source_folder + "/scss/style-jeeper.scss"],
		js: [source_folder + "/js/script.js",source_folder + "/js/script-jeeper.js"],
		img: source_folder + "/img/**/*.+(png|jpg|gif|ico|webp)",
		fonts: source_folder + "/fonts/*ttf",
		svg: source_folder + "/img/**/*.svg",
	},
	watch: {
		html: source_folder + "/**/*.html",
		pug: source_folder + "/pug/**/*.pug",
		css: source_folder + "/scss/**/*.scss",
		js: source_folder + "/js/**/*.js",
		img: source_folder + "/img/**/*.+(png|jpg|gif|ico|webp)",
		svg: source_folder + "/img/**/*.+(svg)",
	},
	clean: [project_folder + "*.html", project_folder + "*.css"]
};

let { src, dest } = require("gulp"),
	gulp = require("gulp"),
	pug = require('gulp-pug'),
	del = require('del'),
	scss = require('gulp-sass'),
	autoprefixer = require("gulp-autoprefixer"),
	group_media = require("gulp-group-css-media-queries"),
	clean_css = require("gulp-clean-css"),
	rename = require("gulp-rename"),
	imagemin = require("gulp-imagemin"),
	ttf2woff = require("gulp-ttf2woff"),
	ttf2woff2 = require("gulp-ttf2woff2"),
	fonter = require("gulp-fonter"),
	browsersync = require("browser-sync").create();

gulp.task('_otf2ttf', function () {
	return src([source_folder + '/fonts/*otf'])
		.pipe(fonter({
			formats: ['ttf']
		}))
		.pipe(dest(source_folder + '/fonts/'));
})

function browserSync() {
	browsersync.init({
		server: {
			baseDir: "./" + project_folder + "/"
		},
		port: 3000,
		notify: false,
		//online: online
	})
};

function clean() {
	return del(path.clean);
}

function js() {
	return src(path.src.js)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream())
}

function fonts() {
	src(path.src.fonts)
		.pipe(ttf2woff())
		.pipe(dest(path.build.fonts));
	return src(path.src.fonts)
		.pipe(ttf2woff2())
		.pipe(dest(path.build.fonts));
}

function images() {
	return src(path.src.img)
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{
				removeViewBox: false
			}],
			interlaced: true,
			optimizationLevel: 3
		}))
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream())
}

function svg() {
	return src(path.src.svg)
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream())
}

function css() {
	return src(path.src.css)
		.pipe(scss({
			outputStyle: "expanded"
		})
		)
		.pipe(group_media())
		.pipe(autoprefixer({
			overrideBrowserslist: ["last 5 versions"],
			cascade: true,
			grid: true
		}))
		.pipe(dest(path.build.css))
		.pipe(clean_css())
		.pipe(rename({
			extname: ".min.css"
		}))
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
};

function html() {
	return src(["src/pug/*.pug", "!" + "src/pug" + "/_*.pug"])
		.pipe(pug({ pretty: true }))
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream())
};

function fontsStyle() {
	let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
	if (file_content == '') {
		fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
		return fs.readdir(path.build.fonts, function (err, items) {
			if (items) {
				let c_fontname;
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
					}
					c_fontname = fontname;
				}
			}
		})
	}
}


function cb() {
}

function watchFiles() {
	gulp.watch([path.watch.pug], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.img], images);
};

let build = gulp.series(clean, svg, gulp.parallel(js, css, html, images, fonts), fontsStyle);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.svg = svg;
exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.pug = pug;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;