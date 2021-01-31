import GanttElastic from 'gantt-elastic';

export default {
  components:{
    ganttElastic: GanttElastic
  },
  props:['tasks','options'],
  template:`<gantt-elastic :tasks="tasks" :options="options"></gantt-elastic>`,
  data(){
    return {};
  }
}