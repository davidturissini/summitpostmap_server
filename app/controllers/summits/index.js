(function () {
	var Summit = require('./../../models/Summit').Summit;
	var Q = require('q');
	var url = require('url');
	


	var	render = function (req, res) {
		var deferred = Q.defer();
		var url_parts = url.parse(req.url, true);
		var query = url_parts.query;
		var sw_latitude = query['bounds[sw][latitude]'];
		var sw_longitude = query['bounds[sw][longitude]'];
		var ne_latitude = query['bounds[ne][latitude]'];
		var ne_longitude = query['bounds[ne][longitude]'];

		console.log('SW:');
		console.log(sw_latitude + ',' + sw_longitude);
		console.log('NE');
		console.log(ne_latitude + ',' + ne_longitude);
		console.log('----');

		var query = Summit.find({

			latitude: {
				$gt:parseFloat(sw_latitude),
				$lt:parseFloat(ne_latitude)
			},

			longitude: {
				$gt:parseFloat(sw_longitude),
				$lt:parseFloat(ne_longitude)
			}


		});

		query.limit(300);

		query.execFind(function (err, summits) {
			res.write(JSON.stringify(summits));
			deferred.resolve();
		});


		
		return deferred.promise;

	}
	

	exports.render = render;


}());