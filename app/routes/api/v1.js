var v1_class = new require('./v1_class');

module.exports = function (app, db,express) {

	var api = express.Router();

	api.get('/all-subjects',(req,res) => {

			v1_class.subjects(req,res);
	});

	api.get('/courses/:subject_id',(req,res) => {

			v1_class.courses(req,res);
	});

	api.get('/course-info/:course:id',(req,res) => {

			v1_class.course_info(req,res);
	});

	api.get('/gen-subject',(req,res) => {

			v1_class.generate_subject();

	});

	api.get('/gen-course',(req,res) => {

			v1_class.generate_course();

	});

	return api;

}