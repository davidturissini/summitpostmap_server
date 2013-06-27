(function () {
	var mongoose = require('mongoose');
	var Q = require('q');


	var summitSchema = mongoose.Schema({
		title: String,
		latitude: Number,
		longitude: Number,
		elevation: Number,
		activities: String,
		season: String,
		url: String,
		image: String
	});


	var Summit = mongoose.model('Summit', summitSchema);



	Summit.findHighest = function () {
		var deferred = Q.defer();
		var query = Summit.find({

			latitude:{
				$ne:null
			},

			longitude:{
				$ne:null
			},

			elevation:{
				$ne:null
			}

		});


		query.sort({elevation:-1});
		query.limit(1);

		query.execFind(function (err, summits) {
			deferred.resolve(summits[0]);
		});


		return deferred.promise;


	}

	Summit.findLowest = function () {
		var deferred = Q.defer();
		var query = Summit.find({
			
			latitude:{
				$ne:null
			},

			longitude:{
				$ne:null
			},

			elevation:{
				$ne:null
			}

		});

		query.sort({elevation:1});
		query.limit(1);

		query.execFind(function (err, summits) {
			deferred.resolve(summits[0]);
		});


		return deferred.promise;
	}



	exports.Summit = Summit;


}());