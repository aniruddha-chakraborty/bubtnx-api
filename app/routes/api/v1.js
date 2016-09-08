'use strict'
var random  = require('random-token');
var bcrypt  = require('bcrypt');

var redis = require("redis"),
    client = redis.createClient();


module.exports = function (app, db,express) {

	var api = express.Router();

	api.get('/all-subjects',(req,res) => {



	});

	api.get('/courses/:subject_id',(req,res) => {




	});

	api.get('/course-info/:course:id',(req,res) => {



	});

	api.get('/gen-subject',(req,res) => {



		var subjects = ['','BBA','CSIT','CSE','Textile','EEE','English','Economics','Environment','LL. B'];

		for (var i = 1; i <= 9; i++) {

				db.cypher({

				    query: 'CREATE (n:subject { name: {type} , subject_name: {subject_name} , subject_code: {subject_code} })',
				    params: {
				    	type: 'Subject',
				        subject_name: subjects[i],
				        subject_code: '0'+i
				    },
				
				}, function (err) {
				    
				    if (err) 
				    	throw err;

				});

		}

		return res.send();


	});

	api.get('/gen-course',(req,res) => {


			db.cypher({

			    query: "MATCH (n:subject) RETURN n"
			
			}, function (err,results) {
			    
			    if (err) 
			    	throw err;

			    var subject_code = results[0]['n']['properties']['subject_code'];

			    	for (i = 1; i <= 9; i++) {
			
							db.cypher({

							    query: 'MATCH (n:subject) RETURN n',
							    params: {


							    },
							
							}, function (err,results) {
							    
							    if (err) 
							    	throw err;

							});	

			    	}

			    return res.send();

			});

	});

	api.get('/test',(req,res) => {



		var subjects = ['','BBA','CSIT','CSE','Textile','EEE','English','Economics','Environment','LL. B'];

		for (var i = 1; i <= 9; i++) {

				db.cypher({

				    query: 'CREATE (n:subject { name: {subject_name} , subject_code: {subject_code} })',
				    params: {
				       	
				       	subject_name: subjects[i],
				        subject_code: '0'+i
				    },
				
				}, function (err) {
				    
				    if (err) 
				    	throw err;

				});

		}

			db.cypher({

			    query: 'CREATE (n:course { name: {course_name} , course_code: {course_code} })',
			    params: {

			        course_name: 'C programming',
			        course_code: 'CSE 101'
			    },
			
			}, function (err) {
			    
			    if (err) 
			    	throw err;

			});
			return res.send();

	});


	api.get('/relationship',(req,res) => {



			return res.send();

	});



	return api;

}