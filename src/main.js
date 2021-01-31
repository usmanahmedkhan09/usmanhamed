import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './Store/index'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import $ from 'jquery'
import axios from 'axios';
import format from 'date-fns/format'
import VueSweetalert2 from 'vue-sweetalert2';
import user from '../src/Services/User'
import gfsCode from '../src/Services/GFSCode'
import auth from '../src/Services/common'
import survey from '../src/Services/Survey'
import entity from '../src/Services/Entity'
import card from '../src/Services/Card'
import initiative from '../src/Services/Initiatives'
import surveyResponse from '../src/Services/ResponseSurveyCard'
import financialSaving from '../src/Services/FinancialSaving'
import yearlySave from './Services/YearlySave'
import monthlyReports from '../src/Services/MonthlyReports'
import calculationOfSaving from '../src/Services/CalculationOfSaving'
import supportRequire from '../src/Services/SupportRequire'
import minutesOfMeeting from '../src/Services/MinutesOfMeeting'
import milestone from '../src/Services/Milestone'
import changeRequest from '../src/Services/ChangeRequest'
import knowledgeHub from '../src/Services/KnowledgeHub'
import KnowledgeHubCategory from '../src/Services/KnowledgeHubCategory'
import session from '../src/Services/Session'
import entityBudget from '../src/Services/EntityBudget'
import _ from 'lodash';
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import Gantt from "highcharts/modules/gantt";
import highchartsMore from 'highcharts/highcharts-more'
import httpCommon from '../src/Services/http-common'
import i18n from './plugins/i18n'
import Sectors from './Services/Sectors'
import EntiitesTypes from './Services/EntityType'
import Comment from './Services/Comments'
import Reply from './Services/Replies'
import EntityPerformance from './Services/EntityPerformance'
import CommentPresets from './Services/Presets'
import FeedBackQuestions from './Services/FeedbackQuestions'
Vue.use(httpCommon);
Vue.prototype._ = _

import VueToast from 'vue-toast-notification';
// Import any of available themes
import 'vue-toast-notification/dist/theme-default.css';
//import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast);
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
// Init plugin
Vue.use(Loading);
highchartsMore(Highcharts);
Gantt(Highcharts);
Vue.use(HighchartsVue, { Highcharts })
// As a plugin
import VueMask from 'v-mask'
Vue.use(VueMask);
const options = {
  confirmButtonColor: '#36bbc0',
  cancelButtonColor: '#ff7674',
};
Vue.use(VueSweetalert2, options);
import authUser from './auth'
Vue.prototype.$user = authUser;
// Registering Services
Vue.prototype.$userService = user;
Vue.prototype.$FeedBackQuestions = FeedBackQuestions;
Vue.prototype.$userComments = Comment;
Vue.prototype.$CommentPresets = CommentPresets;
Vue.prototype.$EntityPerformance = EntityPerformance;
Vue.prototype.$userReply = Reply;
Vue.prototype.$gfsCodeService = gfsCode;
Vue.prototype.$authService = auth;
Vue.prototype.$surveyService = survey;
Vue.prototype.$entityService = entity;
Vue.prototype.$entitySector = Sectors;
Vue.prototype.$entityTypes = EntiitesTypes;
Vue.prototype.$cardService = card;
Vue.prototype.$surveyResponseService = surveyResponse;
Vue.prototype.$initiativeService = initiative;
Vue.prototype.$financialSavingService = financialSaving;
Vue.prototype.$yearlySaveService = yearlySave;
Vue.prototype.$monthlyReportsService = monthlyReports;
Vue.prototype.$calculationOfSavingService = calculationOfSaving;
Vue.prototype.$mileStoneService = milestone;
Vue.prototype.$meetingService = minutesOfMeeting;
Vue.prototype.$supportService = supportRequire;
Vue.prototype.$changeRequestService = changeRequest;
Vue.prototype.$knowledgeHubService = knowledgeHub;
Vue.prototype.$KnowledgeHubCategoryService = KnowledgeHubCategory;
Vue.prototype.$sessionService = session;
Vue.prototype.$entityBudgetService = entityBudget;


// Or as a directive
import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);

Vue.use(VueMaterial)

Vue.config.productionTip = false

let loader = null;
function hideLoader()
{
  if (loader)
  {
    loader.hide();
    loader = null;
  }
}
function showLoader()
{
  hideLoader();
  loader = Vue.$loading.show()
}
Vue.mixin({
  methods: {
    getFormatedReportName(targetDate)
    {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const date = new Date(targetDate);
      return months[date.getMonth()] + "-" + date.getFullYear();
    },
    getArabicMonth(item)
    {
      if (item.split("-")[0] == "January")
      {
        return this.$t("january");
      } else if (item.split("-")[0] == "February")
      {
        return this.$t("february");
      } else if (item.split("-")[0] == "March")
      {
        return this.$t("march");
      } else if (item.split("-")[0] == "April")
      {
        return this.$t("april");
      } else if (item.split("-")[0] == "May")
      {
        return this.$t("may");
      } else if (item.split("-")[0] == "June")
      {
        return this.$t("june");
      } else if (item.split("-")[0] == "July")
      {
        return this.$t("july");
      } else if (item.split("-")[0] == "August")
      {
        return this.$t("august");
      } else if (item.split("-")[0] == "September")
      {
        return this.$t("september");
      } else if (item.split("-")[0] == "October")
      {
        return this.$t("october");
      } else if (item.split("-")[0] == "November")
      {
        return this.$t("november");
      } else if (item.split("-")[0] == "Deccember")
      {
        return this.$t("december");
      }
    },
  }
})

Vue.prototype.$showLoader = showLoader
Vue.prototype.$hideLoader = hideLoader

Vue.prototype.$openSide = new Vue();
Vue.prototype.$closeComment = new Vue();

Vue.use(BootstrapVue);
const DataFormat = 'YYYY-MM-DD'
Vue.filter('formatDate', function (value)
{
  return format(value, DataFormat)
})


new Vue({
  router,
  store,
  axios,
  i18n,
  render: h => h(App)
}).$mount('#app')
