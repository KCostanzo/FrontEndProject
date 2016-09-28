var Dispatcher = require('./dispatcher.js');
var Constants = require('./constants.js');

module.exports = {

	getStats: function(stats) {
		// debugger;
		Dispatcher.dispatch({
			actionType: Constants.STATS,
			stats: stats
		});
	},

	getOrderCount: function(orderCount) {
		Dispatcher.dispatch({
			actionType: Constants.ORDERS,
			orderCount: orderCount
		});
	},

	getReasonCount: function(reasonCount) {
		Dispatcher.dispatch({
			actionType: Constants.REASONS,
			reasonCount: reasonCount
		});
	}

};