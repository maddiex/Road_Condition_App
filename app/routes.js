// app/routes.js
var bodyParser = require('body-parser');
// grab the nerd model we just created
var Nerd = require('./models/nerd');

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        app.use(bodyParser.json()); // for parsing application/json
		app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

        // sample api route
        app.get('/api/nerds', function(req, res) {
            // use mongoose to get all nerds in the database
            Nerd.find(function(err, nerds) {

                // if there is an error retrieving, send the error. 
                if (err)
                    res.send(err);
                // return all nerds in JSON format
                res.send('{"type":"FeatureCollection", "features":'+JSON.stringify(nerds)+'}');
            });
        });

        app.post('/api/nerds', function(req, res) {
        
	        var nerd = new Nerd({properties:{name: req.body.properties.name, condition: req.body.properties.condition},geometry:{type: req.body.geometry.type, coordinates:req.body.geometry.coordinates.split(',').map(Number)}});

	        nerd.save(function(err) {
	            if (err)
	                res.send(err);

	            res.json({ message: 'Road state added!' });
	        });
	        
	    });

	    app.put('/api/nerds/:nerd.id', function(req, res) {

	        // use our nerd model to find the nerd we want
	        Nerd.findById(req.params.nerd_id, function(err, nerd) {

	            if (err)
	                res.send(err);

	            nerd.name = req.body.name;

	            // save the nerd
	            nerd.save(function(err) {
	                if (err)
	                    res.send(err);

	                res.json({ message: 'Road state updated!' });
	            });

	        });
	    });

        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load our public/index.html file
        });

    };