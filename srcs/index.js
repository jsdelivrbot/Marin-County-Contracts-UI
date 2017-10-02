//Highcharts chart
//https://www.highcharts.com/demo/column-rotated-labels

var chart = Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: '<a href="http://bouquet.ai/">Bouquet.ai</a> Exercise'
    },
    xAxis: {
    subtitle: {
        text: 'Contract Amounts in <a href="https://data.marincounty.org/County-Government/Delegated-Contracts/rp6f-b7dy/">Marin County</a> by Department'
    },
        type: 'category',
        labels: {
            rotation: -75,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Total Amount ($)'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Amount: <b>{point.y:.1f} dollars</b>'
    },
    series: [{
        name: 'Amount',
        data: [ ],
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
});

//Month-Year Widget
//https://github.com/KidSysco/jquery-ui-month-picker
$('.Default').MonthPicker();

var url = 'https://data.marincounty.org/resource/mw3d-ud6d.json';

//converts object to array for graph input
function objToArr(obj) {
  var arrData = new Array();
  arrData = Object.keys(obj).map(function(key) {
    return [key, obj[key]];
  });
  return (arrData);
}

//Takes the JSON data and parses it by time
// and sums it up together
// *note, if date is null, it takes all the data from
// the first month to the last one
function dataParserToObj(data, date) {
  var newData = new Object();

  data.forEach(function(element){
    if (element.month_and_year.indexOf(date) == 0){
      if (newData[element.department] == null) {
        newData[element.department] = parseInt(element.amount);
      } else {
        newData[element.department] += parseInt(element.amount);
      }
    }
  });
  return (newData);
}

//Updates Chart
function chartUpdate(data, date) {
  var newObj = new Object();
  var arrData = new Array();

  newObj = dataParserToObj(data, date);
  arrData = objToArr(newObj);
  chart.series[0].update({
    data: arrData
  });
}

//Makes the API call to the URL
$.getJSON(url, function(data) {
  (function(){
    //Sets Initial values for chart
    chartUpdate(data, '');

    //Waits for the user to press the enter key
    //inside the input box and updates chart
    document.querySelector('input').addEventListener('keydown',function(e){
      if (e.keyCode === 13){
        if (this.value) {
          var date = this.value.split("/")
          var newDate = date[1].concat('-'.concat(date[0]))

          chartUpdate(data, newDate);
        }
      }
    });
  })();
});
