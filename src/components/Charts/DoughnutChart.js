import { isArray } from 'lodash';
import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  mounted()
  {
    let chartWidth = 0;
    let chartheight = 0;


    function sumArray(array)
    {
      return array.join('/');
    };

    this.renderChart(this.chartData, {
      title: {
        display: true,
        position: "top",
        //  text: "Doughnut Chart",
        fontSize: 10,
        fontColor: "#111"
      },

      legend: {
        display: true,
        position: "bottom",
        labels: {
          fontColor: "#333",
          fontSize: 13,
          fontFamily: "'DIN', Arial, Helvetica, serif"
        }
      },

      responsive: true,
      maintainAspectRatio: false,
      cutoutPercentage: 80,

      tooltips: {
        enabled: true
      },
      hover: {
        mode: false
      },
      // onClick: clickEvent,
      animation: {
        duration: 500,
        onProgress: function (animation)
        {
          var chartContext = this.chart.canvas.getContext('2d', { alpha: false })
          chartContext.fillStyle = '#4a4a4a'
          chartContext.font = "100 25px 'DIN', Arial, Helvetica, serif"
          chartContext.textBaseline = 'middle'
          chartWidth = this.chart.width;
          chartheight = this.chart.height;
          chartContext.fillText(sumArray(this.data.datasets[0].data), chartWidth / 2 - 35, chartheight / 2 - 10, 200)
        },
        onComplete: function (animation)
        {
          var chartContext = this.chart.canvas.getContext('2d', { alpha: false })
          chartContext.fillStyle = '#4a4a4a'
          chartContext.font = "100 25px 'DIN', Arial, Helvetica, serif"
          chartContext.textBaseline = 'middle'
          chartWidth = this.chart.width;
          chartheight = this.chart.height;
          chartContext.fillText(sumArray(this.data.datasets[0].data), chartWidth / 2 - 35, chartheight / 2 - 10, 200)
        }
      }
    });






    // this.renderChart(this.chartData, {
    //   maintainAspectRatio: false,
    //   cutoutPercentage: 65,

    //   title: {
    //     display: true,
    //     position: "top",
    //     //  text: "Doughnut Chart",
    //     fontSize: 12,
    //     fontColor: "#111"
    //   },

    //   legend: {
    //     display: true,
    //     position: "bottom",
    //     labels: {
    //       fontColor: "#333",
    //       fontSize: 13,
    //       fontFamily: "'DIN', Arial, Helvetica, serif"
    //     }
    //   },

    // }
    // )
  }
}