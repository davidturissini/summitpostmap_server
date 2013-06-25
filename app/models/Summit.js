(function () {
	var mongoose = require('mongoose');


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


	Summit.prototype.findInBounds = function () {
		
	}



	exports.Summit = Summit;


}());