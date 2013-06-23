(function () {
	var mongoose = require('mongoose');
	var Q = require('q');
	var database;


	function connectionString() {
		var mongoUri = process.env.MONGOLAB_URI || 
		  process.env.MONGOHQ_URL || 
		  'mongodb://localhost/foo'; 

		return mongoUri;
	}




	database = function () {
		var deferred = Q.defer();

		mongoose.connect(connectionString());

		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));

		db.once('open', function callback (e) {
			deferred.resolve(e);
		});

		return deferred.promise;


	}


	exports.database = database;


}());