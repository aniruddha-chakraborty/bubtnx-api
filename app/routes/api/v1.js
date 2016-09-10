'use strict'
var random  = require('random-token');
var bcrypt  = require('bcrypt');

var redis = require("redis"),
    client = redis.createClient();

var ObjectID = require("bson-objectid");
var Subject = require('./../../schemas/subject');


module.exports = function (app, neo4j,mongoose,express) {

	var api = express.Router();


/**
 *  GET all subjects
 */
	api.get('/all-subjects',(req,res) => {

		neo4j.cypher({

		    query: 'MATCH(n:subject) RETURN n'

		}, function (err,results) {

		    if (err)
		    	throw err;

		    console.log(results);


		});


	});

/**
 *  GET courses using subject id 
 */
	api.get('/courses/:subject_id',(req,res) => {

		neo4j.cypher({

			    query: 'MATCH(n:course{subject_code:{subject_code}}) RETURN n',
			    params: {

			    	subject_code:subject_code
			    },

			}, function (err,results) {

			    if (err)
			    	throw err;

			    console.log(results);

			});

	});

	api.get('/course-info/:course_id',(req,res) => {


		neo4j.cypher({

			    query: 'MATCH(n:course{object_id:{object_id}}) RETURN n',
			    params: {

			    	object_id:course_id
			    },

			}, function (err,results) {

			    if (err)
			    	throw err;

			    console.log(results);

			});


	});

	api.get('/gen-subject',(req,res) => {


		var subjects = ['','BBA','CSIT','CSE','Textile','EEE','English','Economics','Environment','LL. B'];

		for (var i = 1; i <= 9; i++) {

				neo4j.cypher({

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


			neo4j.cypher({

			    query: "MATCH (n:subject) RETURN n"

			}, function (err,results) {

			    if (err)
			    	throw err;

			    var subject_code = results[0]['n']['properties']['subject_code'];

			    	for (i = 1; i <= 9; i++) {

							neo4j.cypher({

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
				neo4j.cypher({

				    query: 'CREATE (n:subject {object_id:{object_id}, name: {subject_name} , subject_code: {subject_code} }) RETURN n',
				    params: {

				       	object_id: ObjectID(),
				       	subject_name: subjects[i],
				        subject_code: '0'+i
				    },

				}, function (err,results) {

				    if (err)
				    	throw err;

				    let subject_object_id = results[0]['n']['properties']['object_id'];
				    let subject_code = results[0]['n']['properties']['subject_code'];

						Subject.find({ subject_code: subject_code },function(err,info){

								info.forEach(function(info) {

								let course_name = info.subject_name;
								let course_code = info.course_code;
								let course_credit = info.course_credit;

									neo4j.cypher({

									    query: "CREATE (n:course{name:{course_name},course_code:{course_code},course_credit:{course_credit},object_id:{object_id},subject_code:{subject_code}}) RETURN n",
									    params: {
									       	object_id: ObjectID(),
									       	course_name: course_name,
									        course_code: course_code,
									        course_credit: course_credit,
									        subject_code: subject_code
									    },

									}, function (err,results) {

									    if (err)
									    	throw err;

									    let course_object_id = results[0]['n']['properties']['object_id'];
									  

											neo4j.cypher({

											    query: "MATCH(n:subject{object_id: {subject_object_id}}),(m:course{object_id:{course_object_id}}) CREATE (n)-[r:Course]->(m)",
											    params: {

											       	subject_object_id: subject_object_id,
											       	course_object_id:course_object_id
											    }

											}, function (err) {

											    if (err)
											    	throw err;


											});



									});



								});

						});

				});

		}

		return res.send();

	});


	api.get('/relationship',(req,res) => {

			// relationship query

	});



	return api;

}
