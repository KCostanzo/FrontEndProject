# Return Chart Generator

<!-- [CloudSound live][heroku]

[heroku]: http://www.cloudsound.site
 -->

### Get Up and Running(Local)

- npm install
- npm run webpack
- open index.html


### Summary

 This is a React.js chart generator. The main front end display is front_end/display.jsx where inputs are taken from user, turned into html parameters, and send to the Util (front_end/myUtil.js) where an AJAX request goes out. On success the data is sent to the Store at statStore.js (via flux dispatcher) which also triggers a re-render in display.jsx due to store linked state variables.

#### Important File Locations

index.jsx - main outer React Component. Go here to add Routes, etc
front_end/display.jsx - main React Component. Here is where to find Chart Logic, Front End  Validations, Util function calls.
front_end/statStore.js - main store Component. Makes Data availible to display.jsx, triggers re-render when updated.
front_end/myUtil.js - AJAX requests. Here to change API params (variable logic lives in display)


## API Calls 

From Front End:

```javascript
  Util.getOrderCount(rtnStart, rtnEnd, checkRadio);
```

Util API function (variables generated in component): 

```javascript
  getOrderCount: function(startDate, endDate, groupby = '', category = '') {
    $.ajax({
      method: 'GET',
      url: 'http://13.84.149.217:8000/returns/count/order_date?end_date=' + endDate + '&format=json&start_date=' + startDate + groupby + category,
      success: function(orderCount) {
        ServerActions.getOrderCount(orderCount);
      }
    });
  },
```

## Front End Validations

```javascript
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
```

## Chart Updating

Charts will automatically re-render any time api call goes out and refreshes store via React state variables linked to store listeners:

```javascript
  activateReturns: function() {
    if (this.state.rtnActive) {
      if (this.rtnChart != null) {
        this.rtnChart.destroy();
      }

      var ctx = document.getElementById('rtnChart');
      // ctx.style.width = "70%";
      // ctx.style.height = "50%";

      this.rtnChart = new Chart(ctx, {
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
```

### Future Upgrades
- [ ] Categories When Availible
- [ ] use setTimeout on API calling function in component to add auto-refresh
- [ ] Seperate Charts into Seperate Chart Components
- [ ] make 1 re-usable validation function