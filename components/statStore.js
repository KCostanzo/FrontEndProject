var Store = require('flux/utils').Store;
var Constants = require('./constants');
var Dispatcher = require('./dispatcher.js');

var StatStore = new Store(Dispatcher);

var _orderCount = {};
var _reasonCount = {};
var errors = [];

var resetOrders = function(orderCount) {
	_orderCount = {};

	_orderCount = orderCount;
	// console.log(_orderCount);
};


var resetReasons = function(reasonCount) {
	_reasonCount = {};

	_reasonCount = reasonCount;
	// console.log(_reasonCount);
};

StatStore.returnCount = function() {
	var rtnCountArr = [];

	if (_orderCount.data){
		_orderCount.data.forEach(function(order) {
			rtnCountArr.push(order['count'])
		});

		// console.log(rtnCountArr);
		return rtnCountArr;
	}
};

StatStore.returnValues = function() {
	var rtnValArr = [];

	if (_orderCount.data){
		_orderCount.data.forEach(function(order) {
			rtnValArr.push(order['value'])
		});

		// console.log(rtnValArr);
		return rtnValArr;	
	}
};

StatStore.reasonCount = function() {
	var rsnCountArr = [];

	if (_reasonCount.data){
		_reasonCount.data.forEach(function(reason) {
			rsnCountArr.push(reason['count'])
		});

		// console.log(rsnCountArr);
		return rsnCountArr;
	}
};

StatStore.reasonValues = function() {
	var rsnValArr = [];

	if (_reasonCount.data){
		_reasonCount.data.forEach(function(reason) {
			rsnValArr.push(reason['value'])
		});

		// console.log(rsnValArr);
		return rsnValArr;
	}
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