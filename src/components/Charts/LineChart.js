import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, {
      maintainAspectRatio:false,  
      pointLabels: {
        fontSize: 22,
        fontColor: "#333",
        fontFamily: "'DIN', Arial, Helvetica, serif"
      }, 
      scales:{
        yAxes: [{
          ticks: {
              fontFamily: "'DIN', Arial, Helvetica, serif"
              }
          }],
          xAxes: [
            {
              ticks: {
                fontFamily: "'DIN', Arial, Helvetica, serif",
              }
            }
          ]
      } , 
      legend:{
        display:false,
        labels: {
          fontColor: "#333",
          fontSize: 13,
          fontFamily: "'DIN', Arial, Helvetica, serif"
        }
      }
    })
  }
}