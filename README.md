# Return Chart Generator

<!-- [CloudSound live][heroku]

[heroku]: http://www.cloudsound.site
 -->

### Get Up and Running(Local)

- npm install
- npm run webpack
- open index.html


### Imput Functions

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

## API Calls 

From Front End Components:

```javascript
    TempUtil.getOrderCount(rtnStart, rtnEnd, checkRadio);
```

Util API function (variables generated in component): 

```javascript
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
```

### Chart Updating

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
- [ ] use setTimeout on API calling function in component to add refresh
- [ ] Seperate Charts into Seperate Chart Components