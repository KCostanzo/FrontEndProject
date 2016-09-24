var Store = require('flux/utils').Store;
var Constants = require('./constants');
var Dispatcher = require('./dispatcher.js');

var StatStore = new Store(Dispatcher);

var _orderCount = {};
var _reasonCount = {};

var resetOrders = function(orderCount) {
	_orderCount = {};

	_orderCount = orderCount;
	console.log(_orderCount);
};


var resetReasons = function(reasonCount) {
	_reasonCount = {};

	_reasonCount = reasonCount;
	console.log(_reasonCount);
};

StatStore.__onDispatch = function(payload) {
	switch(payload.actionType) {
	case Constants.ORDERS:
		resetOrders(payload.orderCount);
		break;
	case Constants.REASONS:
		resetReasons(payload.reasonCount);
		break;
	}
	this.__emitChange()
}


module.exports = StatStore;