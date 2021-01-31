export default {
    data() {
      return {
        numbers: ['replyOne','replyTwo','replyThree','replyFour','replyFive']
      }
    },
    methods: {
      getSurveyCard() {
        let obj = {
             tenantId: localStorage.getItem('tenantId'),
             cardId: this.$route.params.card_id,
       };
       this.$showLoader();
       const list = this.$cardService
         .getCard(this.$route.params.card_id)
         .then(res => {
           if (res.success) {
             res.data.surveyQuestions.map((item)=>{
               this.answers.surveyResponseAnswers.push({
                     questionId: item.id,
                     replyOne: true,
                     replyTwo: false,
                     replyThree: false,
                     replyFour: false,
                     replyFive: false,
                     id: 0
                 })
                item.radio = 'replyOne'
                return item 
             })
             this.data = res.data;    
 
             //Get Previously Submiited Response
             this.$surveyResponseService
               .getSurveyReponse(obj)
               .then(res => {
                 if (res.success && res.data && res.data.surveyResponseAnswers) { 
                   this.answers.surveyResponseAnswers = [];
                   this.answers.surveyResponseAnswers = res.data.surveyResponseAnswers
                   this.data.surveyQuestions.map((item)=>{
                     var temp = this.answers.surveyResponseAnswers.filter((response, key) => { 
                       return response.questionId == item.id 
                     })[0]
                     Object.entries(temp).forEach((value, key) => {
                           if(this.numbers.includes(value[0])) {
                               if(value[1]) {
                                 this.radio = value[0];
                                 item.radio = value[0];
                               }                
                           }
                         });
                     return item;
                   })
                 }
               });
 
             this.$surveyService
               .getSurvey(this.$route.params.survey_id)
               .then(res => {
                 if (res.success) {
                   this.survey = res.data;            
                 }
                 this.$hideLoader();
               });
           }
         });
     }
    },
    computed: {
    }
}