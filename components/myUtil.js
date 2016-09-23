var ServerActions = require('./serverActions');

module.exports = {
	fetchStats: function() {
				// debugger;
		$.ajax({
			method: 'GET',
			url: 'http://13.84.149.217:8000',
			success: function(stats) {
				ServerActions.getStats(stats);
			}
		})
	}
};