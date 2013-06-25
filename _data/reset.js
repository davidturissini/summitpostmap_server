var mongoose = require('mongoose');
var fs = require('fs');
mongoose.connect('mongodb://localhost/foo');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


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

function saveSummit (summitsJSON, index, callback) {
	var summitJSON = summitsJSON[index];
	if (summitJSON === undefined) {
		callback();
		return;
	}

	console.log('Saving ' + summitJSON.title);
	var summit =  new Summit(summitJSON);


	summit.save(function () {
		saveSummit(summitsJSON, index + 1, callback);
	});
}

db.once('open', function callback () {
	Summit.remove(function () {
		fs.readFile('./_data/summits.json', 'utf8', function (err, data) {
			var summitsJSON = JSON.parse(data);
			
			saveSummit(summitsJSON, 0, function () {
				console.log('all done');
				Summit.find(function (err, summits) {
			 
					console.log(summits.length);
				});
			});


		});
	});
	
});

