import { Radar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Radar,
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
      scale: {
        ticks: { 
          display: false,
          precision: 0,
          min: 0, // it is for ignoring negative step.
          beginAtZero: true,
          callback: function(value, index, values) {
              if (Math.floor(value) === value) {
                  return value;
              }
          }
      },  
      pointLabels: {
        fontSize: 22,
        fontFamily: "'DIN', Arial, Helvetica, serif"
      }},
    })
  }
}