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
		var min_elevation = query['elevation[min]'];
		var max_elevation = query['elevation[max]'];

		var findParams = {

			latitude: {
				$gt:parseFloat(sw_latitude),
				$lt:parseFloat(ne_latitude)
			},

			longitude: {
				$gt:parseFloat(sw_longitude),
				$lt:parseFloat(ne_longitude)
			}


		}

		if (min_elevation !== undefined && max_elevation !== undefined) {
			findParams.elevation = {
				$gt:min_elevation,
				$lt:max_elevation
			}
		}



		var query = Summit.find(findParams);

		query.limit(400);

		query.execFind(function (err, summits) {
			res.write(JSON.stringify(summits));
			deferred.resolve();
		});


		
		return deferred.promise;

	}
	

	exports.render = render;


}());