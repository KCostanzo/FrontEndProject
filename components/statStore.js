var Store = require('flux/utils').Store;
var Constants = require('./constants');
var Dispatcher = require('./dispatcher.js');

var StatStore = new Store(Dispatcher);

var _stats = {};

var resetStats = function(stats) {
	debugger;
	_stats = {}
	_stats = stats;

	StatStore.__emitChange();
};


StatStore.all = function() {
	return stats;
}

StatStore.__onDispatch = function(payload) {
	switch(payload.actionType) {
	case Constants.STATS:
		resetStats(payload.stats);
		console.log(payload.stats);
		break;
	}
}


module.exports = StatStore;