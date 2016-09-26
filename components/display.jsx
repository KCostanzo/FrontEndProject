import React from 'react';
var Chart = require('chart.js');

var StatStore = require('./statStore');
var TempUtil = require('./myUtil');

module.exports = React.createClass({
	getInitialState: function() {
		return {	groupSelect: 'day',
		rtnCounts: [], rtnValues:[], rtnActive: false,
		rsnCounts: [], rsnValues:[], rsnActive: false, errors: []}
	},

	componentDidMount: function() {
		this.statListener = StatStore.addListener(this.statsChange);
	},

	statsChange: function() {
		this.setState({rtnCounts: StatStore.returnCount(), rtnValues: StatStore.returnValues(),
					rsnCounts: StatStore.reasonCount(), rsnValues: StatStore.reasonValues()});
	},

	componentWillUnmount: function() {
		this.statListener.remove();
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

	groupChange: function(event){
		this.setState({groupSelect: event.target.value});
	},

	activateReturns: function() {
		if (this.state.rtnActive) {
			var ctx = document.getElementById('rtnChart');
			// ctx.style.width = "70%";
			// ctx.style.height = "50%";
			// ctx.border = "1px solid black";
			var rtnChart = new Chart(ctx, {
			    type: 'line',
			    data: {
			        labels: this.state.rtnValues,
			        datasets: [{
			            label: '# of Returns',
			            data: this.state.rtnCounts,
			            backgroundColor: 
			                'rgba(255, 99, 132, 0.2)'
			            ,
			            borderColor: 
			                'rgba(255,99,132,1)'
			            ,
			            borderWidth: 1
			        }]
			    }
			});
		} else {
			return <div/>
		}
	},

	activateReasons: function() {
		if (this.state.rsnActive) {
			// if (rsnChart != null) {
			// 	rsnChart.destroy();
			// }
			// document.getElementById('rsnChart').remove();
			// document.getElementById('reasonCount').append('<canvas id="rsnChart"></canvas>');

			var ctx = document.getElementById('rsnChart');


			var rsnChart = new Chart(ctx, {
			    type: 'bar',
			    data: {
			        labels: this.state.rsnValues,
			        datasets: [{
			            label: '# of Returns by Reason',
			            data: this.state.rsnCounts,
			            backgroundColor: [
			                'rgba(255, 99, 132, 0.2)',
			                'rgba(54, 162, 235, 0.2)',
			                'rgba(255, 206, 86, 0.2)',
			                'rgba(75, 192, 192, 0.2)',
			                'rgba(153, 102, 255, 0.2)',
			                'rgba(255, 159, 64, 0.2)'
			            ],
			            borderColor: [
			                'rgba(255,99,132,1)',
			                'rgba(54, 162, 235, 1)',
			                'rgba(255, 206, 86, 1)',
			                'rgba(75, 192, 192, 1)',
			                'rgba(153, 102, 255, 1)',
			                'rgba(255, 159, 64, 1)'
			            ],
			            borderWidth: 1
			        }]
			    }
			});
		} else {
			return <div/>
		}
	},

	updateOrderCount: function() {
		this.setState({errors: []});
		var strNums = ['0','1','2','3','4','5','6','7','8','9'];

		var rtnStart = document.getElementById('rtnStart').value;
		var rtnEnd = document.getElementById('rtnEnd').value;

		//front end validations
		if ((rtnStart.length !== 10) || (rtnEnd.length !== 10)) {
			this.setState({errors: ["Invalid Start or End Date"]});
			// debugger;
			return;
		};
		for (var i=0; i < rtnStart.length; i++) {
			if ((i === 4) || (i === 7)) {
				if (rtnStart[i] !== '-') {
					this.setState({errors: ["Invalid Formatting - Return Start Date"]});
					// this.state.errors.push("Inavlid Formatting - Dashes");
					return;
				}
			} else if (strNums.indexOf(rtnStart[i]) === -1) {
				this.setState({errors: ["Invalid Formatting - Return Start Date"]});
				return;
			}
		};
		for (var i=0; i<rtnEnd.length; i++) {
			if ((i === 4) || (i === 7)) {
				if (rtnEnd[i] !== '-') {
					this.setState({errors: ["Invalid Formatting - Return End Date"]});
					return;
				}
			} else if (strNums.indexOf(rtnEnd[i]) === -1) {
				this.setState({errors: ["Invalid Formatting - Return End Date"]});
				return;
			}
		};

		var checkRadio = this.state.groupSelect;
		if  (checkRadio === 'day') {
			checkRadio = '';
		} else {
			checkRadio = '&groupby=' + checkRadio;
		}
		// console.log(checkRadio);
		// console.log('good');
		//info ok, send to Util
		TempUtil.getOrderCount(rtnStart, rtnEnd, checkRadio);
		// ReturnChart.activate();
		this.setState({rtnActive: true})

	},

	updateReasonCount: function() {
		this.setState({errors: []});
		var strNums = ['0','1','2','3','4','5','6','7','8','9'];

		var rsnStart = document.getElementById('rsnStart').value;
		var rsnEnd = document.getElementById('rsnEnd').value;
		// console.log(rsnStart);
		var lim = document.getElementById('limit').value;
		for (var i = 0; i < lim.length; i++) {
			if (strNums.indexOf(lim[i]) === -1) {
				this.setState({errors: ['Invalid Limit']});
				return;
			}
		};

		if ((rsnStart.length !== 10) || (rsnEnd.length !== 10)) {
			this.setState({errors: ["Invalid Start or End Date"]});
			// debugger;
			return;
		};
		for (var i=0; i < rsnStart.length; i++) {
			if ((i === 4) || (i === 7)) {
				if (rsnStart[i] !== '-') {
					this.setState({errors: ["Invalid Formatting - Reason Start Date"]});
					return;
				}
			} else if (strNums.indexOf(rsnStart[i]) === -1) {
				this.setState({errors: ["Invalid Formatting - Reason Start Date"]});
				return;
			}
		};
		for (var i=0; i<rsnEnd.length; i++) {
			if ((i === 4) || (i === 7)) {
				if (rsnEnd[i] !== '-') {
					this.setState({errors: ["Invalid Formatting - Reason End Date"]});
					return;
				}
			} else if (strNums.indexOf(rsnEnd[i]) === -1) {
				this.setState({errors: ["Invalid Formatting - Reason End Date"]});
				return;
			}
		};

		if (lim !== '') {
			lim = '&limit=' + lim;
			console.log(lim);
		}
		//info checked, send to util
		TempUtil.getReasonCount(rsnStart, rsnEnd, lim);
		// ReasonChart.activate();
		this.setState({rsnActive: true})

	},

	render: function() {
		return (
			<div className='main'>
				{this.errors()}
				<br/>
				Return Counter
				<div id='orderCount'>
					<form onSubmit={this.updateOrderCount}>

						<label>Start Date
						<input type='text' id='rtnStart' defaultValue='YYYY-MM-DD'/>
						</label>

						<label>End Date
						<input type='text' id='rtnEnd' defaultValue='YYYY-MM-DD'/>
						</label>

						<label id='radioField'>Group By  
						</label>
						<label>Day
						<input type='radio' value='day' checked={this.state.groupSelect === 'day'} onChange={this.groupChange}/>
						</label>
						<label>Week
						<input type='radio' value='week' checked={this.state.groupSelect === 'week'} onChange={this.groupChange}/>
						</label>
						<label>Month
						<input type='radio' value='month' checked={this.state.groupSelect === 'month'} onChange={this.groupChange}/>
						</label>

          				<input className='submit' type='submit' value='Submit!'/>
					</form>

					<canvas id='rtnChart'></canvas>
					{this.activateReturns()}
				</div>
				<br/>


				Reason Counter
				<div id='reasonCount'>
					<form onSubmit={this.updateReasonCount}>

						<label>Start Date
						<input type='text' id='rsnStart' defaultValue='YYYY-MM-DD'/>
						</label>

						<label>End Date
						<input type='text' id='rsnEnd' defaultValue='YYYY-MM-DD'/>
						</label>

						<label> Limit: 
						<input type='text' id='limit'/>
						</label>

						<input className='submit' type='submit' value='Submit!'/>
					</form>

					<canvas id='rsnChart'></canvas>
					{this.activateReasons()}
				</div>
			</div>
			);
	}

});
