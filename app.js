var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Student = require('./models/students');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

mongoose.connect('mongodb://localhost/students', { useMongoClient: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('we are connected!');
});

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index');
})


app.get('/showstudents', function(req, res) {
    Student.find(function (err, Students) {
    if (err) return console.error(err);
    console.log(Students);
    res.render('showstudents', {students: Students});
    })    
})

app.get('/addstudent', function(req, res){
    res.render('addstudent')
})

app.post('/addstudent', urlencodedParser, function(req, res){
        let student = new Student({
            name:{
            f_name:`${req.body.f_name}`,
            l_name:`${req.body.l_name}`
        },
        grades:{
            math_grade:`${req.body.math_grade}`,
            english_grade:`${req.body.english_grade}`
        }
    });
    student.save(function (err) {
  if (err) return handleError(err);
  // saved!
  console.log('updated');
  Student.find(function (err, Students) {
    if (err) return console.error(err);
    console.log(Students);
    res.render('showstudents', {students: Students});
    })
});

})

/*
// Create an instance of model SomeModel
var hazem = new Student({
    name:{
        f_name:"Hazem",
        l_name:"AbdelGawad"
    },
    grades:{
        math_grade:65,
        english_grade:78
    }
});

// Save the new model instance, passing a callback
hazem.save(function (err) {
  if (err) return handleError(err);
  // saved!
  console.log('updated')
});
*/

app.listen('3000');
