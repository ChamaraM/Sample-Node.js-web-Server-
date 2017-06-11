var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/demoDb');
// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var studentSchema  = {
    "StudentName" : String,
    "RegNumber" : String,
    "Sex" : String,
    "year" : String,
    "faculty"  : String,
    "semester" : String
   // "tecOrStudent" : String
};
// create model if not exists.
module.exports = mongoose.model('StudentDetails',studentSchema);