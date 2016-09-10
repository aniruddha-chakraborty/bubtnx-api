var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var SubjectSchema = new Schema ({

		subject_name: String,
		subject_code: String,
		course_code: String,
		course_credit: String

});

module.exports = mongoose.model( 'SubjectSchema' , SubjectSchema);