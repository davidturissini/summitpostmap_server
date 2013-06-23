(function () {
	var mongoose = require('mongoose');


	var summitSchema = mongoose.Schema({
		title: String,
		latitude: String,
		longitude: String,
		elevation: String,
		activities: String,
		season: String,
		url: String,
		image: String
	});


	var Summit = mongoose.model('Summit', summitSchema);


	Summit.prototype.findInBounds = function () {
		
	}



	exports.Summit = Summit;


}());