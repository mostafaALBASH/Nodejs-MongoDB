let mongoose = require('mongoose');

let studentSchema = mongoose.Schema({
    name:{
        f_name:{
            type:String,
            required:true
        },
        l_name:{
            type:String,
            required:true
        }
    },
    grades:{
        math_grade:{
            type:Number,
            required: true
        },
        english_grade:{
            type:Number,
            required:true
        }
    }
});

var Student = module.exports = mongoose.model('Student', studentSchema);

