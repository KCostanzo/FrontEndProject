import React from 'react';

var StatStore = require('./statStore');
var TempUtil = require('./myUtil');

module.exports = React.createClass({
	getInitialState: function() {
		return {returnStartDate: '', returnEndDate: '', reasonStart: '', resonEnd: '',errors: []}
	},

	componentDidMount: function() {
		// this.statListener = StatStore.addListener(this.statsChange);
		// TempUtil.fetchStats();
	},

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
		// console.log(this.state.returnStartDate);
		// debugger;
	},	

	rtnEndDate: function(event) {
		this.setState({returnEndDate: event.target.value})
		// console.log(this.state.returnEndDate);
	},

	updateOrderCount: function() {
		this.setState({errors: []});
		var strNums = ['0','1','2','3','4','5','6','7','8','9'];

		//front end validations
		if ((this.state.returnStartDate.length !== 10) || (this.state.returnEndDate.length !== 10)) {
			this.setState({errors: ["Invalid Start or End Date"]});
			// debugger;
			return;
		};
		for (var i=0; i < this.state.returnStartDate.length; i++) {
			if ((i === 4) || (i === 7)) {
				if (this.state.returnStartDate[i] !== '-') {
					this.setState({errors: ["Invalid Formatting - Return Start Date"]});
					// this.state.errors.push("Inavlid Formatting - Dashes");
					return;
				}
			} else if (strNums.indexOf(this.state.returnStartDate[i]) === -1) {
				this.setState({errors: ["Invalid Formatting - Return Start Date"]});
				// this.state.errors.push("Non-Number Entered");
				return;
			}
		};
		for (var i=0; i<this.state.returnEndDate.length; i++) {
			if ((i === 4) || (i === 7)) {
				if (this.state.returnEndDate[i] !== '-') {
					this.setState({errors: ["Invalid Formatting - Return End Date"]});
					// this.state.errors.push("Inavlid Formatting - Dashes");
					return;
				}
			} else if (strNums.indexOf(this.state.returnEndDate[i]) === -1) {
				this.setState({errors: ["Invalid Formatting - Return End Date"]});
				// this.state.errors.push("Non-Number Entered");
				return;
			}
		};

		// console.log('good');
		//info ok, send to Util
		TempUtil.getOrderCount(this.state.returnStartDate, this.state.returnEndDate);

	},

	reasonStartDate: function(event) {
		this.setState({reasonStart: event.target.value})
		// console.log(this.state.reasonStart);
		// debugger;
	},	

	reasonEndDate: function(event) {
		this.setState({reasonEnd: event.target.value})
		// console.log(this.state.reasonEnd);
	},

	updateReasonCount: function() {
		this.setState({errors: []});
		var strNums = ['0','1','2','3','4','5','6','7','8','9'];


		if ((this.state.reasonStart.length !== 10) || (this.state.reasonEnd.length !== 10)) {
			this.setState({errors: ["Invalid Start or End Date"]});
			// debugger;
			return;
		};
		for (var i=0; i < this.state.reasonStart.length; i++) {
			if ((i === 4) || (i === 7)) {
				if (this.state.reasonStart[i] !== '-') {
					this.setState({errors: ["Invalid Formatting - Reason Start Date"]});
					return;
				}
			} else if (strNums.indexOf(this.state.reasonStart[i]) === -1) {
				this.setState({errors: ["Invalid Formatting - Reason Start Date"]});
				return;
			}
		};
		for (var i=0; i<this.state.reasonEnd.length; i++) {
			if ((i === 4) || (i === 7)) {
				if (this.state.reasonEnd[i] !== '-') {
					this.setState({errors: ["Invalid Formatting - Reason End Date"]});
					return;
				}
			} else if (strNums.indexOf(this.state.reasonEnd[i]) === -1) {
				this.setState({errors: ["Invalid Formatting - Reason End Date"]});
				return;
			}
		};

		// console.log('rsngood');
		//info checked, send to util
		TempUtil.getReasonCount(this.state.reasonStart, this.state.reasonEnd);

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
						<input type='text' defaultValue='YYYY-MM-DD' onChange={this.reasonStartDate}/>
						</label>

						<label>End Date
						<input type='text' defaultValue='YYYY-MM-DD' onChange={this.reasonEndDate}/>
						</label>

						<input className='submit' type='submit' value='Submit!'/>
					</form>
				</div>
			</div>
			);
	}

});
