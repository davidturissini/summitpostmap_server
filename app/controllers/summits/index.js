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


		var query = Summit.find({

			latitude: {
				$gte:sw_latitude,
				$lte:ne_latitude
			},

			longitude: {
				$gte:ne_longitude,
				$lte:sw_longitude
			}


		})

		.limit(300)

		query.execFind(function (err, summits) {



			res.write(JSON.stringify(summits));
			deferred.resolve();
		});


		
		return deferred.promise;

	}
	

	exports.render = render;


}());