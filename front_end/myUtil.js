var ServerActions = require('./serverActions');

module.exports = {
	fetchStats: function() {
		$.ajax({
			method: 'GET',
			url: 'http://13.84.149.217:8000/returns/count/order_date?end_date=2016-07-28&start_date=2016-06-01&groupby=month',
			success: function(stats) {
				ServerActions.getStats(stats);
			}
		})
	},

	//groupby only seems to work with month


	getOrderCount: function(startDate, endDate, groupby = '', category = '') {
		// debugger;
		$.ajax({
			method: 'GET',
			url: 'http://13.84.149.217:8000/returns/count/order_date?end_date=' + endDate + '&format=json&start_date=' + startDate + groupby + category,
			success: function(orderCount) {
				ServerActions.getOrderCount(orderCount);
			}
		});
	},

	getReasonCount: function(startDate, endDate, limit = '', category = '') {
		$.ajax({
			method: 'GET',
			url: 'http://13.84.149.217:8000/returns/countdistinct/return_reason?end_date=' + endDate + '&format=json&start_date=' + startDate + limit + category,
			success: function(reasonCount) {
				ServerActions.getReasonCount(reasonCount);
			}
		});
	}
};