var express = require('express'),
	morgan 	= require('morgan'),
	config  = require('./databaseConfig.js'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	Multer		   = require('multer')({

		dest: './public/upload'
	
	}),

	errorHandler   = require('errorhandler'),
	path 		   = require('path'),
	neo4j  			= require('neo4j');


var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/assets',express.static(__dirname + '/public'));
app.use(methodOverride());
app.use(errorHandler());


var db = new neo4j.GraphDatabase('http://neo4j:123456@localhost:7474');

/*
db.cypher({

    query: 'MATCH (n) RETURN n',
    params: {

    },

}, function (err, results) {
    if (err) throw err;

    if (!results) {
        console.log('No user found.');
    } else {
        var user = results;
        console.log(JSON.stringify(user, null, 4));
    }

});
*/

// MATCH (n) DETACH DELETE n


mongoose.connect(config.database,function(err) {

	if (!err) {

		console.log("Connecttion established!");
	
		} else {

		console.log(err);
	}

});


var api_v1 = require('./app/routes/api/v1')(app, db,express);

app.use('/v1', api_v1);

app.listen(config.port,function(err){

	if (!err) {
		console.log("server running...");
	}

});
