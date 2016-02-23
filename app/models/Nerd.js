// grab the mongoose module
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var NerdSchema   = new Schema({

    type: { type:String, default:'Feature' },
    
    properties: {
    	name: String,
    	condition: String,
	    date: { type:Date, default:Date.now }
  	},

    geometry: { 
    	type: { type: String, default:'Point' }, 
    	coordinates: [Number] 
    }

});

module.exports = mongoose.model('road_conditions', NerdSchema);


