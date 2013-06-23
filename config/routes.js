(function () {
	var routes;
	var controllerRender;


	routes = function (app) {
		app.get('/summits', function (req, res) {
			controllerRender = require('./../app/controllers/summits/index').render;


			res.writeHead(200, { 'Content-Type': 'application/json' });
			controllerRender(req, res)

			.then(function () {
				res.end();
			});
			

		});
	}

	

	exports.routes = routes;


}());