(function () {
	var Summit = require('./../../models/Summit').Summit;
	var Q = require('q');
	var url = require('url');
	


	var	render = function (req, res) {
		
		return Q.spread([
				Summit.findHighest(),
				Summit.findLowest()
			], function (highest, lowest) {
				var summits = [
					highest, 
					lowest
				]

				res.write(JSON.stringify(summits));
			});



	}
	

	exports.render = render;


}());