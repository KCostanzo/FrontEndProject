var Dispatcher = require('./dispatcher.js');
var Constants = require('./constants.js');

module.exports = {

	getStats: function(stats) {
		// debugger;
		Dispatcher.dispatch({
			actionType: Constants.STATS,
			stats: stats
		});
	}

};