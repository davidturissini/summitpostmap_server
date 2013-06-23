(function () {
	var mongoose = require('mongoose');
	var Q = require('Q');
	var database;


	function connectionString() {
		return 'mongodb://localhost/foo';
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