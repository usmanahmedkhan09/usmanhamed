import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/main.vue'
import Auth from '../views/auth.vue'
import Login from '../components/Login.vue'
import ForgotPassword from '../components/ForgotPassword.vue'
import OTPForgot from '../components/OTPForgot.vue'
import NewPassword from '../components/NewPassword.vue'
import Dashboard from '../components/Dashboard.vue'
import Users from '../components/Users.vue'
import ChangeRequestList from '../components/ChangeRequestList.vue'
import ChangeRequestActive from '../components/ChangeRequestActive.vue'
import OTP from '../components/OTP.vue'
import Entity from '../components/Entity.vue'
import EntityUser from '../components/EntityUser.vue'
import Survey from '../components/Survey.vue'
import SurveyConfirmation from '../components/SurveyConfirmation.vue'
import CreateSurvey from '../components/CreateSurvey.vue'
import CreateCard from '../components/CreateCard.vue'
import Applications from '../components/Applications.vue'
import Notifications from '../components/Notifications.vue'
import KnowledgeHub from '../components/KnowledgeHub.vue'
import KnowledgeHubCategory from '../components/KnowledgeHubCategory.vue'
import MyProfile from '../components/MyProfile.vue'
import EntitySurveySingle from '../components/EntitySurveySingle.vue'
import EntitySurveyMultiple from '../components/EntitySurveyMultiple.vue'
import EntitySurveyMaturity from '../components/EntitySurveyMaturity.vue'
import MonthlyReportCSE from '../components/MonthlyReportCSE.vue'
import MonthlyReportList from '../components/entity/MonthlyReportList.vue'
import InitiativesList from '../components/entity/InitiativesList.vue'
import InitiativesForm from '../components/entity/InitiativesForm.vue'
import SelfAssesment from '../components/entity/SelfAssesment.vue'
import EntityCSEMonthlyReportList from '../components/entity/EntityCSEMonthlyReportList.vue'
import Guard from '@/middlewares/auth-middleware'
import EntityBudget from '../components/EntityBudget'
import CseMonthlyReports from '../components/CseReports'


/* Roles
--------------------
-- Entity Initiator
-- Entity Approver
-- CSE Reviewer A
-- CSE Reviewer B
-- CSE Special Reviewer
-- CSE Approver
--------------------
*/

Vue.use(VueRouter)

const publicRoutes = [
  { path: 'otp', name: "otp-form", component: OTP, pathMatch: 'full', beforeEnter: Guard.hasOTPAuth },
  { path: '', redirect: 'login', pathMatch: 'full' },
  { path: 'login', component: Login, beforeEnter: Guard.guest },
  { path: 'forgot_password', component: ForgotPassword, beforeEnter: Guard.guest },
  { path: 'otp_forgot', component: OTPForgot, beforeEnter: Guard.guest },
  { path: 'new_password', component: NewPassword, beforeEnter: Guard.guest }
];

const mainApp = [
  { path: '', redirect: "dashboard", pathMatch: 'full', beforeEnter: Guard.auth },
  { path: 'dashboard', name: 'Dashboard', component: Dashboard, beforeEnter: Guard.auth },

  { path: 'users', name: 'Users Management', component: Users, beforeEnter: Guard.checkRole, meta: { roles: ['Admin', 'CSE Special Reviewer', 'CSE Approver'] } },
  { path: 'change_request_list', name: 'Change Request Management', component: ChangeRequestList, beforeEnter: Guard.checkRole, meta: { roles: ['Admin', 'CSE Special Reviewer', 'CSE Reviewer A', 'CSE Reviewer B', 'CSE Approver', 'Entity Initiator', 'Entity Approver'] } },
  { path: 'change_request_list/active_section/:id', name: 'Change Request Management', component: ChangeRequestActive, beforeEnter: Guard.checkRole, meta: { roles: ['Admin', 'CSE Special Reviewer', 'CSE Reviewer A', 'CSE Reviewer B', 'CSE Approver'] } },
  { path: 'entity', name: 'Entity Management', component: Entity, beforeEnter: Guard.checkRole, meta: { roles: ['Admin', 'CSE Reviewer', 'CSE Approver'] } },
  { path: 'entity/user/:tenant_id', name: 'Entity Profile', component: EntityUser, beforeEnter: Guard.checkRole, meta: { roles: ['Admin', 'CSE Special Reviewer', 'CSE Approver', 'Entity Initiator', 'Entity Approver'] } },
  { path: 'entity/user/budget/:tenant_id/:tenant_name', component: EntityBudget, beforeEnter: Guard.checkRole, meta: { roles: ['Admin', 'CSE Special Reviewer', 'CSE Approver'] } },
  { path: 'applications', name: 'Application Settings', component: Applications, beforeEnter: Guard.checkRole, meta: { roles: ['Admin', 'CSE Special Reviewer', 'CSE Approver'] } },
  { path: 'notifications', component: Notifications, beforeEnter: Guard.checkRole, meta: { roles: ['Admin', 'CSE Reviewer', 'CSE Reviewer A', 'CSE Approver', 'Entity Initiator', 'Entity Approver'] } },
  { path: 'knowledge_hub', name: 'Knowledge Hub', component: KnowledgeHub, beforeEnter: Guard.checkRole, meta: { roles: ['Admin', 'CSE Reviewer', 'CSE Reviewer A', 'CSE Reviewer B', 'CSE Approver', 'Entity Initiator', 'Entity Approver'] } },
  { path: 'knowledge_hub/category', component: KnowledgeHubCategory, beforeEnter: Guard.checkRole, meta: { roles: ['Admin', 'CSE Reviewer', 'CSE Reviewer A', 'CSE Reviewer B', 'CSE Approver', 'Entity Initiator', 'Entity Approver'] } },
  { path: 'my_profile', name: 'my profile', component: MyProfile, beforeEnter: Guard.checkRole, meta: { roles: ['Admin', 'CSE Reviewer', 'CSE Reviewer A', 'CSE Approver', 'Entity Initiator', 'Entity Approver'] } },
  { path: 'survey', name: 'برنامج العناصر الأساسية', component: Survey, beforeEnter: Guard.checkRole, meta: { roles: ['Admin', 'Entity Initiator', 'Entity Approver', 'CSE Special Reviewer', 'CSE Reviewer A', 'CSE Reviewer B', 'CSE Approver'] } },
  { path: 'survey/creation/confirmation', name: 'survey-confirmation', component: SurveyConfirmation, beforeEnter: Guard.checkRole, meta: { roles: ['Admin', 'Entity Initiator', 'Entity Approver'] } },
  { path: 'survey/:survey_id/create-card', name: 'survey-create-card', component: CreateCard, beforeEnter: Guard.checkRole, meta: { roles: ['Admin', 'CSE Special Reviewer', 'CSE Approver'] } },
  { path: 'survey/:survey_id/view-card/:card_id', name: 'survey-view-card', component: CreateCard, beforeEnter: Guard.checkRole, meta: { roles: ['Admin', 'Entity Initiator', 'Entity Approver', 'CSE Special Reviewer', 'CSE Reviewer A', 'CSE Reviewer B', 'CSE Approver'] } },
  { path: 'survey/:survey_id', name: 'survey-view', component: CreateSurvey, beforeEnter: Guard.checkRole, meta: { roles: ['Admin', 'Entity Initiator', 'Entity Approver', 'CSE Special Reviewer', 'CSE Reviewer A', 'CSE Reviewer B', 'CSE Approver'] } },
  { path: 'survey/self/assesment', name: 'surveyselfassesment', component: SelfAssesment, beforeEnter: Guard.checkRole, meta: { roles: ['Entity Initiator', 'Entity Approver'] } },
  { path: 'survey/entity/single/:survey_id/:card_id', name: 'entity-view-single', component: EntitySurveySingle, beforeEnter: Guard.checkRole, meta: { roles: ['Admin', 'Entity Initiator', 'Entity Approver', 'CSE Special Reviewer', 'CSE Reviewer A', 'CSE Reviewer B', 'CSE Approver'] } },
  { path: 'survey/entity/multiple/:survey_id/:card_id', name: 'entity-view-multi', component: EntitySurveyMultiple, beforeEnter: Guard.checkRole, meta: { roles: ['Admin', 'Entity Initiator', 'Entity Approver', 'CSE Special Reviewer', 'CSE Reviewer A', 'CSE Reviewer B', 'CSE Approver'] } },
  { path: 'survey/entity/maturity/:survey_id/:card_id', name: 'entity-view-maturity', component: EntitySurveyMaturity, beforeEnter: Guard.checkRole, meta: { roles: ['Admin', 'Entity Initiator', 'Entity Approver', 'CSE Special Reviewer', 'CSE Reviewer A', 'CSE Reviewer B', 'CSE Approver'] } },
  // { path: 'entity-monthly-report/:entityid', name: 'entity-monthly-report', component: EntityCSEMonthlyReportList, beforeEnter: Guard.checkRole, meta: { roles: ['Admin', 'CSE Special Reviewer', 'CSE Reviewer A', 'CSE Approver', 'CSE Reviewer B'] } },
  { path: 'entity-monthly-report', name: 'Monthly Reports', component: CseMonthlyReports, beforeEnter: Guard.checkRole, meta: { roles: ['Admin', 'CSE Special Reviewer', 'CSE Reviewer A', 'CSE Approver', 'CSE Reviewer B'] } },
  { path: 'monthly-report/entity-monthly-report/:entityid/:entity_name', name: 'monthly-report/entity-monthly-report', component: EntityCSEMonthlyReportList, beforeEnter: Guard.checkRole, meta: { roles: ['Admin', 'CSE Special Reviewer', 'CSE Reviewer A', 'CSE Approver', 'CSE Reviewer B'] } },
  { path: 'monthly-reports/:tenantId?', name: 'Monthly Reports', component: MonthlyReportList, beforeEnter: Guard.checkRole, meta: { roles: ['Admin', 'Entity Initiator', 'Entity Approver', 'CSE Special Reviewer', 'CSE Reviewer A', 'CSE Approver', 'CSE Reviewer B'] } },
  { path: 'monthly-report-cse', name: 'Monthly Reports', component: MonthlyReportCSE, beforeEnter: Guard.checkRole, meta: { roles: ['CSE Special Reviewer', 'CSE Reviewer A', 'CSE Approver', 'CSE Reviewer B'] } },
  { path: 'monthly-report/initiatives/:report?', name: 'Monthly Reports', component: InitiativesList, beforeEnter: Guard.checkRole, meta: { roles: ['Admin', 'Entity Initiator', 'Entity Approver', 'CSE Special Reviewer', 'CSE Reviewer B', 'CSE Reviewer A', 'CSE Approver'] } },
  { path: 'monthly-report/initiatives-form/:initiativeId?', name: 'Monthly Reports', component: InitiativesForm, beforeEnter: Guard.checkRole, meta: { roles: ['Admin', 'Entity Initiator', 'Entity Approver', 'CSE Special Reviewer', 'CSE Reviewer A', 'CSE Reviewer B', 'CSE Approver'] } },
]
const routes = [
  { path: '', redirect: '/auth/login', pathMatch: 'full' },
  { path: '/auth', component: Auth, children: publicRoutes },
  { path: '/main', component: Main, children: mainApp },


  // { path: '', redirect: '/auth', component: Auth},
  // { path: '/auth', name: 'auth',  component: Auth,
  //   children: [
  //     { path: '', redirect: 'login' },&&
  //     { path: 'login', name: 'Login', component: Login, }
  //   ]
  // },
  // { path: '/main', name: 'main', component: Main,
  //   children: [
  //     { path: '', redirect: 'dashboard' },
  //     { path: 'dashboard', name: 'Dashboard', component: Dashboard,}
  //   ]
  // }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

export default router
