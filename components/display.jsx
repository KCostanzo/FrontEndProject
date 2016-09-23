import React from 'react';

var StatStore = require('./statStore');
var TempUtil = require('./myUtil');

module.exports = React.createClass({
	getInitialState: function() {
		return {stats: {}}
	},

	componentDidMount: function() {
		this.statListener = StatStore.addListener(this.statsChange);
		TempUtil.fetchStats();
		// debugger;
	},

	statsChange: function() {
		this.setState({stats: StatStore.all()});
		console.log(this.state.stats);
	},

	componentWillUnmount: function() {
		this.statListener.remove();
	},

	render: function() {
		return (
			<div className='main'>
			Testing
			</div>
			);
	}

});
