import React from 'react';

var StatStore = require('./statStore');
var TempUtil = require('./myUtil');

module.exports = React.createClass({
	getInitialState: function() {
		return {stats: {}, returnStartDate: '', returnEndDate: '', reasonStart: '', resonEnd: '',errors: []}
	},

	componentDidMount: function() {
		// this.statListener = StatStore.addListener(this.statsChange);
		TempUtil.fetchStats();
		// debugger;
	},

	// statsChange: function() {
	// 	this.setState({stats: StatStore.all()});
	// 	console.log(this.state.stats);
	// },

	componentWillUnmount: function() {
		// this.statListener.remove();
	},

	errors: function() {
 		if (this.state.errors.length === 0) {
    		return;
		} else {
    		return (
       			<ul>
        			{
            			this.state.errors.map(function(error,idx) {
              				return <li key={idx}>{error}</li>
           				 })
         			}
       			</ul>
    		)
    	}
    },

	rtnStartDate: function(event) {
		this.setState({returnStartDate: event.target.value})
		console.log(this.state.returnStartDate);
		// debugger;
	},	

	rtnEndDate: function(event) {
		this.setState({returnEndDate: event.target.value})
		console.log(this.state.returnEndDate);
	},

	updateOrderCount: function() {
		var strNums = ['1','2','3','4','5','6','7','8','9'];
		debugger;


		if ((this.state.returnStartDate.length !== 10) || (this.state.returnEndDate.length !== 10)) {
			this.state.errors.push("Invalid Start or End Date");
			return;
		};
		for (var i=0; i < this.state.returnStartDate.length; i++) {
			if ((i === 4) || (i === 7)) {
				if (this.state.returnStartDate[i] !== '') {
					this.state.errors.push("Inavlid Formatting - Dashes");
					return;
				}
			} else if (strNums.indexOf(this.state.returnStartDate[i]) === -1) {
				this.state.errors.push("Non-Number Entered");
				return;
			}
		};
		for (var i=0; i<this.state.returnEndDate.length; i++) {
			if ((i === 4) || (i === 7)) {
				if (this.state.returnEndDate[i] !== '') {
					this.state.errors.push("Inavlid Formatting - Dashes");
					return;
				}
			} else if (strNums.indexOf(this.state.returnEndDate[i]) === -1) {
				this.state.errors.push("Non-Number Entered");
				return;
			}
		};
	},



	render: function() {
		return (
			<div className='main'>
				{this.errors()}
				<br/>
				Return Counter
				<div className='orderCount'>
					<form onSubmit={this.updateOrderCount}>

						<label>Start Date
						<input type='text' defaultValue='YYYY-MM-DD' onChange={this.rtnStartDate}/>
						</label>

						<label>End Date
						<input type='text' defaultValue='YYYY-MM-DD' onChange={this.rtnEndDate}/>
						</label>


          				<input className='submit' type='submit' value='Submit!'/>
					</form>
				</div>
				<br/>


				Reason Counter
				<div className='reasonCount'>
					<form onSubmit={this.updateReasonCount}>

						<label>Start Date
						<input type='text' defaultValue='YYYY-MM-DD'/>
						</label>

						<label>End Date
						<input type='text' defaultValue='YYYY-MM-DD'/>
						</label>

						<input className='submit' type='submit' value='Submit!'/>
					</form>
				</div>
			</div>
			);
	}

});
