var gulp = require("gulp");//wez paczke "gulp" z folderu node_modules i zapisz ja do zmiennej
var concat = require("gulp-concat");
//wez paczke "gulp-concat" z folderu node_modules i zapisz ja do zmiennej
//gulp odpowiada za tworzenie zadan i automatyzacje a gulp-concat rozrzesza mozliwosci
//poprzez laczenie plikow
var browserSync = require('browser-sync');
var sass = require("gulp-ruby-sass");//pozwoli nam na kompilacje sassa przy pomocy rubby
var rename = require ('gulp-rename');//pozwoli nam zmieniac nazwe plikow
var sourcemaps = require('gulp-sourcemaps');//pozwala dodac mapy zrodlowe

//Files odpowiada za sciezki do plikow w naszym projekcie
var Files = {
  html: "./index.html",

  css_dest: "./css",

  scss: './scss/style.scss'

};

//
// gulp.task('css',function(){
//   //utworz zadanie o nazwie -task css,ktore bierze wszystkie pliki css
//
// return gulp.src(Files.css)
// //bierze wszystkie pliki css
//   .pipe(concat("main.css"))//zapisz je pod nazwa main.css
//   //laczy je w jden plik pod nazwa main.css
//   .pipe(gulp.dest(Files.css_dest))// i zapisuje w skazanym folderze, srednik bo to jedno polecenie
//   .pipe(browserSync.reload({stream: true}));//odswieza przegladrke na koniec
// });
//

gulp.task("sass", function(){
  return sass(Files.scss,{
    style: "expanded",
    sourcemap: true
  })
    .on("error", sass.logError)//nalozenie eventu wyrzuc blad
    .pipe(sourcemaps.write())
    .pipe(rename("main.css"))
    .pipe(gulp.dest(Files.css_dest))
    .pipe(browserSync.reload({stream:true}));


});

// gulp.task('js',function(){
//   //utworz zadanie js...
//
// return gulp.src(Files.js)//wezmie wszystki epliki jss..
//   .pipe(concat("main.js"))//zapisz je pod nazwa main.css
//   //laczy w jeden plik o nazwie main.jss
//   .pipe(gulp.dest(Files.js_dest))//zapisuje do folderu js_dest
//   .pipe(browserSync.reload({stream:true}));//na koncu odswiez przegladarke
//
// });

// gulp.task('default',['js', 'css']);//laczy nam dwa taski
// //tworzymy nowe zadanie. ktore wykona sie dopiero jak wykonaja sie zadania js i css

gulp.task('default',['sass'], function(){

  browserSync.init({//wlaczam browsersynk ktory nam odswierza
    server: {
      baseDir: './'
    }
  });

// gulp.watch('./css/**/*.css', ["css"]);
gulp.watch("./scss/**/*.scss", ["sass"])
// gulp.watch('./js/**/*.js', ["js"]);
gulp.watch(Files.html, browserSync.reload);
//obserwuj pliki w zaleznosci od plikow odpal odpowiedni task wsystko podczepione jest do default i po wpisaniu gulp diala

});
