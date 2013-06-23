(function () {
	var mongoose = require('mongoose');
	var fs = require('fs');
	var express = require('express');
	var Summit = require('./app/models/Summit').Summit;
	var express = require('express');
	var configRoutes = require('./config/routes').routes;
	var configDatabase = require('./config/database').database;

	

	var port = process.env.PORT || 3000;

	var app = express();

	app.configure(function () {
	  	app.use(express.static(__dirname + '/public'));
	  	app.use(express.bodyParser());
	});

	configDatabase(app)

	.then(configRoutes.bind(configRoutes, app))

	.then(function () {
		app.listen(port);
		console.log('Listening on port ' + port);

	});	

}());