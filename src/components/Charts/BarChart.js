import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, {
      maintainAspectRatio:false,
      tooltips: {
        mode: 'label'
      },
      legend: {          
              display: false,
              labels: {
                fontColor: "#333",
                fontFamily: "'DIN', Arial, Helvetica, serif"
              }
      },
      scales:{
        yAxes: [{
          ticks: {
              display:false,
              beginAtZero: true,
              fontFamily: "'DIN', Arial, Helvetica, serif"
              //steps: 10,
              //stepValue: 6,
              //max: 60 //max value for the chart is 60
              }
          }],
          xAxes: [
            {
              ticks: {
                fontFamily: "'DIN', Arial, Helvetica, serif",
                callback: function(label, index, labels) {
                  if (/\s/.test(label)) {
                    return label.split(" ");
                  }else{
                    return label;
                  }              
                },
                fontSize:16
              }
            }
          ]
      } , 
      pointLabels: {
        fontSize: 22
      }
    })
  }
}