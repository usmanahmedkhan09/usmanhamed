<template>
  <div class="hello">
    <b-row align-h="between" align-v="center">
      <b-col cols="6">
        <h4 style="font-weight: 600;">{{$t('selfAssesmentHeading')}}</h4>
      </b-col>
      <!-- <b-col cols="2">
          <button
            class="btn md-primary main-btn border-radius-5"
            style="width:100%"
          >Submit New Report</button>
      </b-col>-->
    </b-row>

    <div class="main-card p-4 mt-4" style="position: relative">
      <h4>{{$t('governmentEntitySelfAssessment')}}</h4>
      <div v-if="showPopup" @click="onHidePopup()" class="popup">
        <span class="text-blue">{{$t('selfAssessmentPopupHeading')}}</span>
        <br />
        <br />
        <span class="text-blue">{{$t('description')}}:</span>
        <br />
            {{$t('selfAssessmentPopupFirstText')}}
        <br />
        <br />
        <span class="text-blue">الوضع الحالي للجھة:</span>
        <br />
        {{$t('selfAssessmentPopupSecondText')}}
        <br />
        <br />
        <span class="text-blue">{{$t('selfAssessmentPopupThirdTextHeading')}}:</span>
        <br />جھة حكومیة تمتلك استراتیجیة متبنیھ لكفاءة الإنفاق
        بشكل كامل من خلال عناصر واضحة ومحددة لرفع
        كفاءة الإنفاق مدعومة بمستھدفات محددة ومعتمدة من
        رئیس الجھة
      </div>
      <div style="width: 400px;height: 200px;margin: 0 auto; display:flex;direction:ltr">
        <div @click="onShowPopup()" class="single-chart" style="top:0;left:0; display:flex">
          <img class="chart-img" src="/images/charts/Graph_Assets/yellow/14@1x.png" />
          <img class="chart-img" src="/images/charts/Graph_Assets/yellow/15@1x.png" />
        </div>

        <div @click="onShowPopup()" class="single-chart" style="top:0;right:0; display:flex">
          <img class="chart-img" src="/images/charts/Graph_Assets/green/1@1x.png" />
          <img class="chart-img" src="/images/charts/Graph_Assets/yellow/2@1x.png" />
          <img class="chart-img" src="/images/charts/Graph_Assets/yellow/3@1x.png" />
          <img class="chart-img" src="/images/charts/Graph_Assets/yellow/4@1x.png" />
          <img class="chart-img" src="/images/charts/Graph_Assets/yellow/5@1x.png" />
        </div>
      </div>
      <div style="width: 400px;height: 200px;margin: 0 auto; display:flex;direction:ltr">
        <div @click="onShowPopup()" class="single-chart" style="bottom:0;right:0; display:flex">
          <img class="chart-img" src="/images/charts/Graph_Assets/green/10@1x.png" />
          <img class="chart-img" src="/images/charts/Graph_Assets/green/11@1x.png" />
          <img class="chart-img" src="/images/charts/Graph_Assets/green/12@1x.png" />
          <img class="chart-img" src="/images/charts/Graph_Assets/green/13@1x.png" />
        </div>
        <div @click="onShowPopup()" class="single-chart" style="bottom:0;left:0; display:flex">
          <img class="chart-img" src="/images/charts/Graph_Assets/green/6@1x.png" />
          <img class="chart-img" src="/images/charts/Graph_Assets/green/7@1x.png" />
          <img class="chart-img" src="/images/charts/Graph_Assets/green/8@1x.png" />
          <img class="chart-img" src="/images/charts/Graph_Assets/green/9@1x.png" />
        </div>
      </div>
    </div>

    <div class="main-card p-5 mt-4">
      <b-row align-h="between" align-v="center">
        <b-col cols="6" style="position: relative;">
          <h4 class="text-center mb-4" style="font-weight: 600;">{{$t('governmentEntitySelfAssessmentHeading')}}</h4>
          <!-- left -->
          <div class="notif-line-left" style="top: 70px;left: 50px;width: 200px;">تطوير مهارات رفع كفاءة الإنفاق</div>
          <div class="notif-line-left" style="top: 200px;width:120px;left: 50px;">منهجية حفظ البيانات</div>
          <div class="notif-line-left" style="top: 269px;left: 46px;">مدى توفر البيانات</div>
          <div class="notif-line-left" style="top: 320px;left:62px;width:200px">تداول البيانات</div>
          <!-- left -->
          <!-- right -->
          <div class="notif-line-right" style="top: 37px;right:140px;">تطوير الاستراتيجية</div>
          <div class="notif-line-right" style="top: 65px;right:30px; width:226px">السعي إلى تحديد فرص كفاءة الإنفاق	</div>
          <div class="notif-line-right" style="top: 100px;right:-27px;width:300px">القيادة الفاعلة لمتابعة التنفيذ وإزالة المعوقات</div>
          <div class="notif-line-right" style="top: 145px;right:25px;">تقييم وتقدير الجهود</div>
          <div class="notif-line-right" style="top: 200px;right:20px;">مبادرات المدى القريب</div>
          <div class="notif-line-right" style="top: 262px;right:20px;width:300">مبادرات المدى المتوسط والبعيد</div>
          <div class="notif-line-right" style="top: 320px;right:113px;">قصص النجاح</div>
          <!-- right -->
          <div style="width: 300px;height: 150px;margin: 0 auto; display:flex;direction:ltr">
            <div class="small-chart" style="top:0;left:0; display:flex">
              <img class="chart-img" src="/images/charts/Graph_Assets/yellow/14@1x.png" />
              <img class="chart-img" src="/images/charts/Graph_Assets/yellow/15@1x.png" />
            </div>

            <div class="small-chart" style="top:0;right:0; display:flex">
              <img class="chart-img" src="/images/charts/Graph_Assets/red/1@1x.png" />
              <img class="chart-img" src="/images/charts/Graph_Assets/red/2@1x.png" />
              <img class="chart-img" src="/images/charts/Graph_Assets/green/3@1x.png" />
              <img class="chart-img" src="/images/charts/Graph_Assets/almond/4@1x.png" />
              <img class="chart-img" src="/images/charts/Graph_Assets/yellow/5@1x.png" />
            </div>
          </div>
          <div style="width: 300px;height: 150px;margin: 0 auto; display:flex;direction:ltr">
            <div class="small-chart" style="bottom:0;right:0; display:flex">
              <img class="chart-img" src="/images/charts/Graph_Assets/red/10@1x.png" />
              <img class="chart-img" src="/images/charts/Graph_Assets/green/11@1x.png" />
              <img class="chart-img" src="/images/charts/Graph_Assets/green/12@1x.png" />
              <img class="chart-img" src="/images/charts/Graph_Assets/almond/13@1x.png" />
            </div>
            <div class="small-chart" style="bottom:0;left:0; display:flex">
              <img class="chart-img" src="/images/charts/Graph_Assets/red/6@1x.png" />
              <img class="chart-img" src="/images/charts/Graph_Assets/red/7@1x.png" />
              <img class="chart-img" src="/images/charts/Graph_Assets/red/8@1x.png" />
              <img class="chart-img" src="/images/charts/Graph_Assets/red/9@1x.png" />
            </div>
          </div>
        </b-col>
        <b-col cols="6" style="position: relative;">
          <h4
            class="text-center mb-4"
            style="font-weight: 600;"
          >تقييم المركز للجهة بعد مراجعة الوثائق الداعمة</h4>
           <!-- left -->
          <div class="notif-line-left" style="top: 70px;left: 50px;width: 200px;">تطوير مهارات رفع كفاءة الإنفاق</div>
          <div class="notif-line-left" style="top: 200px;width:120px;left: 50px;">منهجية حفظ البيانات</div>
          <div class="notif-line-left" style="top: 269px;left: 46px;">مدى توفر البيانات</div>
          <div class="notif-line-left" style="top: 320px;left:62px;width:200px">تداول البيانات</div>
          <!-- left -->
          <!-- right -->
          <div class="notif-line-right" style="top: 37px;right:140px;">تطوير الاستراتيجية</div>
          <div class="notif-line-right" style="top: 65px;right:30px; width:226px">السعي إلى تحديد فرص كفاءة الإنفاق	</div>
          <div class="notif-line-right" style="top: 100px;right:-27px;width:300px">القيادة الفاعلة لمتابعة التنفيذ وإزالة المعوقات</div>
          <div class="notif-line-right" style="top: 145px;right:25px;">تقييم وتقدير الجهود</div>
          <div class="notif-line-right" style="top: 200px;right:20px;">مبادرات المدى القريب</div>
          <div class="notif-line-right" style="top: 262px;right:20px;width:300">مبادرات المدى المتوسط والبعيد</div>
          <div class="notif-line-right" style="top: 320px;right:113px;">قصص النجاح</div>
          <!-- right -->
          <div style="width: 300px;height: 150px;margin: 0 auto; display:flex;direction:ltr">
            <div class="small-chart" style="top:0;left:0; display:flex">
              <img class="chart-img" src="/images/charts/Graph_Assets/green/14@1x.png" />
              <img class="chart-img" src="/images/charts/Graph_Assets/green/15@1x.png" />
            </div>

            <div class="small-chart" style="top:0;right:0; display:flex">
              <img class="chart-img" src="/images/charts/Graph_Assets/almond/1@1x.png" />
              <img class="chart-img" src="/images/charts/Graph_Assets/red/2@1x.png" />
              <img class="chart-img" src="/images/charts/Graph_Assets/green/3@1x.png" />
              <img class="chart-img" src="/images/charts/Graph_Assets/green/4@1x.png" />
              <img class="chart-img" src="/images/charts/Graph_Assets/almond/5@1x.png" />
            </div>
          </div>
          <div style="width: 300px;height: 150px;margin: 0 auto; display:flex;direction:ltr">
            <div class="small-chart" style="bottom:0;right:0; display:flex">
              <img class="chart-img" src="/images/charts/Graph_Assets/green/10@1x.png" />
              <img class="chart-img" src="/images/charts/Graph_Assets/green/11@1x.png" />
              <img class="chart-img" src="/images/charts/Graph_Assets/green/12@1x.png" />
              <img class="chart-img" src="/images/charts/Graph_Assets/green/13@1x.png" />
            </div>
            <div class="small-chart" style="bottom:0;left:0; display:flex">
              <img class="chart-img" src="/images/charts/Graph_Assets/yellow/6@1x.png" />
              <img class="chart-img" src="/images/charts/Graph_Assets/almond/7@1x.png" />
              <img class="chart-img" src="/images/charts/Graph_Assets/red/8@1x.png" />
              <img class="chart-img" src="/images/charts/Graph_Assets/yellow/9@1x.png" />
            </div>
          </div>
        </b-col>
      </b-row>
    </div>

    <div class="main-card py-4 mt-4">
      <div class="data-table-view">
        <table>
          <thead>
            <tr>
              <th colspan="2">العنصر الأساسي</th>
              <th>العنصر الفرعي</th>
              <th>التقييم الذاتي</th>
              <th>الوثائق الداعمة المطلوبة</th>
              <th>حالة الوثائق الداعمة</th>
              <th>
                التقييم بعد
                المراجعة
              </th>
              <th>مرئيات المركز</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="bg-blue" rowspan="4" style="width:50px;border-radius: 0">1</td>
              <td class="bg-blue" rowspan="4">القيادة والاستراتيجية</td>
              <td class="bg-blue">1.1 تطوير الاستراتيجية</td>
              <td class="text-yellow">Data in column</td>
              <td class="bg-grey">
                البيانات في بيانات العمود في بيانات العمود في بيانات العمود في بيانات
                العمود في بيانات العمود في بيانات العمود في بيانات العمود في بيانات العمود في العمود
              </td>
              <td>Data in column</td>
              <td>Data in column</td>
              <td class="bg-grey">
                البيانات في بيانات العمود في بيانات العمود في بيانات العمود في بيانات
                العمود في بيانات العمود في بيانات العمود في بيانات العمود في بيانات العمود في العمود
              </td>
            </tr>
            <tr>
              <td class="bg-blue">1.2 السعي إلى تحديد فرص كفاءة الإنفاق</td>
              <td class="text-red">Data in column</td>
              <td class="bg-grey">
                البيانات في بيانات العمود في بيانات العمود في بيانات العمود في بيانات
                العمود في بيانات العمود في بيانات العمود في بيانات العمود في بيانات العمود في العمود
              </td>
              <td>Data in column</td>
              <td>Data in column</td>
              <td class="bg-grey">
                البيانات في بيانات العمود في بيانات العمود في بيانات العمود في بيانات
                العمود في بيانات العمود في بيانات العمود في بيانات العمود في بيانات العمود في العمود
              </td>
            </tr>
            <tr>
              <td class="bg-blue">1.3 القيادة الفاعلة لمتابعة التنفيذ وإزالة المعوقات</td>
              <td class="text-green">Data in column</td>
              <td class="bg-grey">
                البيانات في بيانات العمود في بيانات العمود في بيانات العمود في بيانات
                العمود في بيانات العمود في بيانات العمود في بيانات العمود في بيانات العمود في العمود
              </td>
              <td>Data in column</td>
              <td>Data in column</td>
              <td class="bg-grey">
                البيانات في بيانات العمود في بيانات العمود في بيانات العمود في بيانات
                العمود في بيانات العمود في بيانات العمود في بيانات العمود في بيانات العمود في العمود
              </td>
            </tr>
            <tr>
              <td class="bg-blue">1.4 تقييم وتقدير الجهود</td>
              <td class="text-green">Data in column</td>
              <td class="bg-grey">
                البيانات في بيانات العمود في بيانات العمود في بيانات العمود في بيانات
                العمود في بيانات العمود في بيانات العمود في بيانات العمود في بيانات العمود في العمود
              </td>
              <td>Data in column</td>
              <td>Data in column</td>
              <td class="bg-grey">
                البيانات في بيانات العمود في بيانات العمود في بيانات العمود في بيانات
                العمود في بيانات العمود في بيانات العمود في بيانات العمود في بيانات العمود في العمود
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td class="bg-blue" style="width:50px;border-radius: 0">2</td>
              <td class="bg-blue">القدرات</td>
              <td class="bg-blue">2.1 تطوير مهارات رفع كفاءة الإنفاق</td>
              <td>Data in column</td>
              <td class="bg-grey">
                البيانات في بيانات العمود في بيانات العمود في بيانات العمود في بيانات
                العمود في بيانات العمود في بيانات العمود في بيانات العمود في بيانات العمود في العمود
              </td>
              <td>Data in column</td>
              <td>Data in column</td>
              <td class="bg-grey">
                البيانات في بيانات العمود في بيانات العمود في بيانات العمود في بيانات
                العمود في بيانات العمود في بيانات العمود في بيانات العمود في بيانات العمود في العمود
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td class="bg-blue" rowspan="3" style="width:50px;border-radius: 0">3</td>
              <td
                class="bg-blue"
                rowspan="3"
              >القدرة على اتخاذ القرار بناءً على توفر وشفافية البيانات</td>
              <td class="bg-blue">3.1 منهجية حفظ البيانات</td>
              <td>Data in column</td>
              <td class="bg-grey">
                البيانات في بيانات العمود في بيانات العمود في بيانات العمود في بيانات
                العمود في بيانات العمود في بيانات العمود في بيانات العمود في بيانات العمود في العمود
              </td>
              <td>Data in column</td>
              <td>Data in column</td>
              <td rowspan="2" class="bg-grey">
                البيانات في بيانات العمود في بيانات العمود في بيانات العمود في بيانات
                العمود في بيانات العمود في بيانات العمود في بيانات العمود في بيانات العمود في العمود
              </td>
            </tr>
            <tr>
              <td class="bg-blue">3.2 مدى توفر البيانات</td>
              <td>Data in column</td>
              <td class="bg-grey">
                البيانات في بيانات العمود في بيانات العمود في بيانات العمود في بيانات
                العمود في بيانات العمود في بيانات العمود في بيانات العمود في بيانات العمود في العمود
              </td>
              <td>Data in column</td>
              <td>Data in column</td>
            </tr>
            <tr>
              <td class="bg-blue">3.3 تداول البيانات</td>
              <td>Data in column</td>
              <td class="bg-grey">
                البيانات في بيانات العمود في بيانات العمود في بيانات العمود في بيانات
                العمود في بيانات العمود في بيانات العمود في بيانات العمود في بيانات العمود في العمود
              </td>
              <td>Data in column</td>
              <td>Data in column</td>
              <td class="bg-grey">
                البيانات في بيانات العمود في بيانات العمود في بيانات العمود في بيانات
                العمود في بيانات العمود في بيانات العمود في بيانات العمود في بيانات العمود في العمود
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td class="bg-blue" rowspan="3" style="width:50px;border-radius: 0">4</td>
              <td class="bg-blue" rowspan="3">
                النتائج
                والأثر
              </td>
              <td class="bg-blue">4.1 مبادرات المدى القريب</td>
              <td>Data in column</td>
              <td class="bg-grey">
                البيانات في بيانات العمود في بيانات العمود في بيانات العمود في بيانات
                العمود في بيانات العمود في بيانات العمود في بيانات العمود في بيانات العمود في العمود
              </td>
              <td>Data in column</td>
              <td>Data in column</td>
              <td rowspan="2" class="bg-grey">
                البيانات في بيانات العمود في بيانات العمود في بيانات العمود في بيانات
                العمود في بيانات العمود في بيانات العمود في بيانات العمود في بيانات العمود في العمود
              </td>
            </tr>
            <tr>
              <td class="bg-blue">4.2 مبادرات المدى المتوسط والبعيد</td>
              <td>Data in column</td>
              <td class="bg-grey">
                البيانات في بيانات العمود في بيانات العمود في بيانات العمود في بيانات
                العمود في بيانات العمود في بيانات العمود في بيانات العمود في بيانات العمود في العمود
              </td>
              <td>Data in column</td>
              <td>Data in column</td>
            </tr>
            <tr>
              <td class="bg-blue">4.3 قصص النجاح</td>
              <td>Data in column</td>
              <td class="bg-grey">
                البيانات في بيانات العمود في بيانات العمود في بيانات العمود في بيانات
                العمود في بيانات العمود في بيانات العمود في بيانات العمود في بيانات العمود في العمود
              </td>
              <td>Data in column</td>
              <td>Data in column</td>
              <td class="bg-grey">
                البيانات في بيانات العمود في بيانات العمود في بيانات العمود في بيانات
                العمود في بيانات العمود في بيانات العمود في بيانات العمود في بيانات العمود في العمود
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- <round-graph></round-graph> -->
  </div>
</template>

<script>
import RoundGraph from "../RoundGraph";
import rolesMixin from "../../mixins/RolesMixins.js";
import format from "date-fns/format";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";
export default {
  name: "survey-self-assesment",
  mixins: [validationMixin, rolesMixin],
  components: {
    RoundGraph
  },
  data() {
    let dateFormat = "YYYY-MM-DD";
    let now = new Date();
    return {
      isCreateSupport: false,
      isCreateMeeting: false,
      formMeeting: {
        title: null,
        date: format(now, dateFormat),
        description: null
      },
      options: {
        isActive: true,
        SkipCount: 0,
        MaxResultCount: 100
      },
      perPage: 2,
      disabledSearch: false,
      totalCount: 0,
      isCreateDialog: false,
      search: null,
      form: {
        userID: 0,
        firstname: null,
        lastname: null,
        email: null,
        phoneNumber: null,
        type: null
      },
      userSaved: false,
      sending: false,
      lastUser: null,
      detail: false,
      currentPage: 1,
      showPopup: true
    };
  },

  watch: {
    currentPage(newPage) {
      this.options.SkipCount = this.perPage * (newPage - 1);
      this.getList();
    }
  },
  computed: {},
  methods: {
    onShowPopup() {
      this.showPopup = true;
    },
    onHidePopup() {
      this.showPopup = false;
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
    submitReport() {
      this.$showLoader();
      this.disabledSearch = true;
      this.sending = true;
      this.$monthlyReportsService.create(this.options).then(res => {
        if (res.success) {
          this.$swal({
            icon: "success",
            type: "success",
            title: "Report Submitted Successfully!"
          }).then(() => {
            this.$router.go("-1");
          });
        } else {
          this.$swal({
            icon: "error",
            type: "error",
            title: error.message.message
          });
        }
        this.$hideLoader();
        this.disabledSearch = false;
        this.sending = false;
      });
    },
    approveReport() {
      this.$showLoader();
      this.disabledSearch = true;
      this.sending = true;
      const tempObj = {
        remarks: "",
        approved: true,
        id: 0,
        monthlyReportId: this.options.monthlyReportId
      };

      this.$monthlyReportsService.approveReport(tempObj).then(res => {
        if (res.success) {
          this.$swal({
            icon: "success",
            type: "success",
            title: "Report Approved Successfully!"
          }).then(() => {
            this.$router.go("-1");
          });
        } else {
          this.$swal({
            icon: "error",
            type: "error",
            title: "Something went wrong!!"
          });
        }
        this.$hideLoader();
        this.disabledSearch = false;
        this.sending = false;
      });
    },
    getReportName() {
      const date = new Date();
      return this.getFormatedReportName(date);
    },
    onView(item) {
      this.$router.push("/main/monthly-report/initiatives-form/" + item.id);
    },
    addInitiative() {
      this.$router.push("/main/monthly-report/initiatives-form");
    },
    searchUser() {
      this.options.Keyword = this.search;
      this.getList();
    },
    onPagination(event) {
    },
    getList() {
      this.$showLoader();
      this.disabledSearch = true;
      this.$monthlyReportsService.getAllInitiatives(this.options).then(res => {
        if (res.success) {
          if (res.data.items.length > 0) {
            this.initiativeItems = res.data.items[0].initiatives;
            this.options.monthlyReportId = res.data.items[0].id;
          }
          this.totalCount = res.data.totalCount;
        }
        this.$hideLoader();
        this.disabledSearch = false;
      });
    }
  },
  mounted() {
    // this.options.ReportName = this.$route.params.report
    //   ? this.$route.params.report
    //   : this.getReportName();
    // this.getList();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.single-chart {
  width: 200px;
  height: 200px;
  border: 3px solid transparent;
  position: relative;
}

.chart-img {
  position: absolute;
  width: 100%;
}

.small-chart {
  width: 150px;
  height: 150px;
  border: 3px solid transparent;
  position: relative;
}

.assessment {
  width: 25px;
  height: 25px;
  border-radius: 20px;
  margin: auto;
}

.review {
  color: black;
}

.completed {
  color: #7cbc59;
}

.observe {
  color: #c8d32d;
}

.create-btn {
  width: 210px;
  height: 40px;
}

.cancel-btn {
  width: 210px;
  height: 40px;
  color: #36bbc0 !important;
  border: 2px solid #36bbc0;
  background: white !important;
  margin: 0 10px;
}

.view {
  font-size: 12px;
  background: #2582c5 !important;
}

.icon-badge {
  width: 22px;
  margin: 0 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.data-table-view {
  max-width: 100%;
  height: auto;
  overflow-x: auto;
  overflow-y: hidden;
}

.data-table-view table {
  border-color: #fff;
  width: 100%;
  border-collapse: separate;
  border-spacing: 2px 2px;
}

.data-table-view table thead tr {
  height: 50px;
  background: #fff;
}

.data-table-view table thead tr th {
  font-size: 13px;
  font-weight: bold;
  color: #666;
  max-width: 150px;
  border: 1px solid;
  padding: 10px;
  border-bottom: 3px solid #2582c5;
}

.data-table-view table tbody {
  font-size: 13px;
  font-weight: normal;
}

.data-table-view table tbody tr {
  height: 65px;
  background: #fff;
}

.data-table-view table tbody tr td {
  font-size: 13px;
  color: #666;
  font-weight: bold;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  max-width: 150px;
  padding: 10px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid;
  text-align: left;
}

.data-table-view table tbody tr td.bg-blue {
  color: #fff;
  background: #33babf;
}

.data-table-view table tbody tr td.bg-grey {
  color: #000;
  background: rgb(212, 212, 212);
}

.data-table-view table tbody tr td.text-red {
  color: red;
}

.data-table-view table tbody tr td.text-yellow {
  color: yellow;
}

.data-table-view table tbody tr td.text-green {
  color: green;
}

.popup {
  height: 400px;
  width: 300px;
  border-radius: 10px;
  position: absolute;
  padding: 20px;
  background: white;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 1), 0 1px 1px 0 rgba(0, 0, 0, 1),
    0 1px 3px 0 rgba(0, 0, 0, 1);
  right: 180px;
  z-index: 1;
  text-align: right;
}

.notif-line-left {
  border-bottom: 1px solid rgb(202, 202, 202);
  position: absolute;
  padding: 0 10px;
  width: 150px;
  text-align: left;
}

.notif-line-right {
  border-bottom: 1px solid rgb(202, 202, 202);
  position: absolute;
  padding: 0 10px;
  width: 150px;
  text-align: right;
}

.notif-line-left:before {
  content: "";
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 7.5px;
  position: absolute;
  left: 0;
  top: 18px;
  background: rgb(202, 202, 202);
}

.notif-line-right:before {
  content: "";
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 7.5px;
  position: absolute;
  right: 0;
  top: 18px;
  background: rgb(202, 202, 202);
}

.text-blue {
  color: #2582c5;
  font-weight: bold;
}
</style>