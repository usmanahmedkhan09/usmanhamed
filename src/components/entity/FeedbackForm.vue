<template>
  <div class="hello">
    <md-dialog :md-active.sync="isReturnBack">
      <md-dialog-title></md-dialog-title>
      <div class="px-5" style="overflow: auto;">
        <b-row align-h="between" align-v="top">
          <b-col cols="8">
            <h4 style="font-weight: 600;">{{ $t("enterFeedback") }}</h4>
            <h4 class="mt-3" v-if="data.mainData.name">
              {{ $t("initiative") }} [{{ data.mainData.number }}] -
              {{ data.mainData.name }}
            </h4>
            <h4
              class="mt-3"
              v-if="data.mainData.items && data.mainData.items.length > 0"
            >
              {{ $t("monthlyReportForHeading") }} -
              {{ formatDate(data.mainData.items[0].name) }}
            </h4>
            <!-- <h4 class="mt-3">Rationalization of electricity consuption</h4> -->
          </b-col>
          <b-col cols="2" v-if="hasCSERole">
            <b-form-group style="font-weight:bold" :label="$t('type')">
              <b-form-radio
                style="font-weight:normal"
                v-model="feedBackFormObj.feedbackType"
                name="some-radios"
                value="internal"
                >ملاحظات داخلية</b-form-radio
              >
              <b-form-radio
                style="font-weight:normal"
                v-model="feedBackFormObj.feedbackType"
                name="some-radios"
                value="external"
                >ملاحظات للجهة</b-form-radio
              >
            </b-form-group>
          </b-col>
        </b-row>

        <form
          novalidate
          class="md-layout"
          @submit.prevent="validateFeedbackForm"
        >
          <b-row align-v="center" class="mt-4" style="width:100%">
            <!--<b-col cols="4">
              <md-field :class="getValidationClassFeedBack('feedbackType')">
                <label for="type">Type</label>

                <md-select name="type" id="type" v-model="feedBackForm.feedbackType" md-dense>
                  <md-option :value="null">Select Option</md-option>
                  <md-option value="internal">Internal</md-option>
                  <md-option value="external">External</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.feedBackForm.feedbackType.required">type is required</span>
                <span class="md-error" v-else-if="!$v.feedBackForm.feedbackType.minlength">Invalid type</span>
              </md-field>
            </b-col>-->
            <b-col cols="4">
              <md-field :class="getValidationClassFeedBack('section')">
                <label for="type">قسم</label>

                <md-select
                  name="type"
                  id="type"
                  v-model="feedBackFormObj.section"
                  md-dense
                  @md-selected="onSectionChange()"
                >
                  <md-option :value="null">{{
                    $t("selectAnOption")
                  }}</md-option>
                  <md-option
                    v-for="(section, index) in data.sections"
                    v-bind:key="index"
                    :value="section"
                    >{{ section }}</md-option
                  >
                </md-select>
                <span
                  class="md-error"
                  v-if="!$v.feedBackFormObj.section.required"
                  >Section is required</span
                >
                <span
                  class="md-error"
                  v-else-if="!$v.feedBackFormObj.section.minlength"
                  >Invalid type</span
                >
              </md-field>
            </b-col>
            <!-- <b-col cols="4" v-if="hasCSERole">
              <md-field :class="getValidationClassFeedBack('feedbackType')">
                <label for="type">{{$t('type')}}</label>

                <md-select name="type" id="type" v-model="feedBackFormObj.feedbackType" md-dense>
                  <md-option value="internal">ملاحظات داخلية</md-option>
                  <md-option value="external">ملاحظات للجهة</md-option>
                </md-select>
                <span
                  class="md-error"
                  v-if="!$v.feedBackFormObj.feedbackType.required"
                >feedbackType is required</span>
                <span
                  class="md-error"
                  v-else-if="!$v.feedBackFormObj.feedbackType.minlength"
                >Invalid feedbackType</span>
              </md-field>
            </b-col>-->
            <b-col cols="4" v-if="data.type == 'initiative'">
              <md-field :class="getValidationClassFeedBack('subSection')">
                <label for="subSection">جزء من قسم</label>

                <md-select
                  name="subSection"
                  id="subSection"
                  v-model="subSectionValue"
                  md-dense
                  @md-selected="onSubSectionChange($event)"
                >
                  <md-option v-if="!feedBackFormObj.section" :value="null"
                    >حدد القسم أولاً</md-option
                  >
                  <!-- second section -->
                  <md-option
                    v-if="feedBackFormObj.section == 'معلومات عامة'"
                    value="اسم الفرصة"
                    >اسم الفرصة</md-option
                  >
                  <md-option
                    v-if="feedBackFormObj.section == 'معلومات عامة'"
                    value="وصف الفرصة"
                    >وصف الفرصة</md-option
                  >
                  <md-option
                    v-if="feedBackFormObj.section == 'معلومات عامة'"
                    value="اسم المالك"
                    >اسم المالك</md-option
                  >
                  <md-option
                    v-if="feedBackFormObj.section == 'معلومات عامة'"
                    value="الوكالة / الإدارة"
                    >الوكالة / الإدارة</md-option
                  >
                  <md-option
                    v-if="feedBackFormObj.section == 'معلومات عامة'"
                    value="إجمالي حجم الوفر المتوقع"
                    >إجمالي حجم الوفر المتوقع</md-option
                  >
                  <md-option
                    v-if="feedBackFormObj.section == 'معلومات عامة'"
                    value="نوع الوفر"
                    >نوع الوفر</md-option
                  >
                  <md-option
                    v-if="feedBackFormObj.section == 'معلومات عامة'"
                    value="تاريخ البدء"
                    >تاريخ البدء</md-option
                  >
                  <md-option
                    v-if="feedBackFormObj.section == 'معلومات عامة'"
                    value="تاريخ الانتهاء"
                    >تاريخ الانتهاء</md-option
                  >
                  <md-option
                    v-if="feedBackFormObj.section == 'معلومات عامة'"
                    value="الأخرى"
                    >الأخرى</md-option
                  >

                  <!-- second section -->
                  <md-option
                    v-if="
                      feedBackFormObj.section == 'البيانات المالية والوفورات'
                    "
                    value="GFS"
                    >GFS</md-option
                  >
                  <md-option
                    v-if="
                      feedBackFormObj.section == 'البيانات المالية والوفورات'
                    "
                    value="البند"
                    >البند</md-option
                  >
                  <md-option
                    v-if="
                      feedBackFormObj.section == 'البيانات المالية والوفورات'
                    "
                    value="خط الأساس السنوي"
                    >خط الأساس السنوي</md-option
                  >
                  <md-option
                    v-if="
                      feedBackFormObj.section == 'البيانات المالية والوفورات'
                    "
                    value="القيمة السنوية بعد التوصية"
                    >القيمة السنوية بعد التوصية</md-option
                  >
                  <md-option
                    v-if="
                      feedBackFormObj.section == 'البيانات المالية والوفورات'
                    "
                    value="الأخرى"
                    >الأخرى</md-option
                  >

                  <!-- third section -->
                  <md-option
                    v-if="
                      feedBackFormObj.section == 'الوفورات خلال السنوات المالية'
                    "
                    value="عام"
                    >عام</md-option
                  >
                  <md-option
                    v-if="
                      feedBackFormObj.section == 'الوفورات خلال السنوات المالية'
                    "
                    value="الوفر المتوقع"
                    >الوفر المتوقع</md-option
                  >
                  <md-option
                    v-if="
                      feedBackFormObj.section == 'الوفورات خلال السنوات المالية'
                    "
                    value="ما تم تحقيقه"
                    >ما تم تحقيقه</md-option
                  >
                  <md-option
                    v-if="
                      feedBackFormObj.section == 'الوفورات خلال السنوات المالية'
                    "
                    value="الأخرى"
                    >الأخرى</md-option
                  >

                  <!-- fourth section -->
                  <md-option
                    v-if="feedBackFormObj.section == 'آلية احتساب الوفر'"
                    value="المرفقات"
                    >المرفقات</md-option
                  >
                  <md-option
                    v-if="feedBackFormObj.section == 'آلية احتساب الوفر'"
                    value="الأخرى"
                    >الأخرى</md-option
                  >

                  <!-- Fifth section -->
                  <md-option
                    v-if="feedBackFormObj.section == 'خطة التنفيذ'"
                    value="اسم المعلم"
                    >اسم المعلم</md-option
                  >
                  <md-option
                    v-if="feedBackFormObj.section == 'خطة التنفيذ'"
                    value="تاريخ البدء المستهدف"
                    >تاريخ البدء المستهدف</md-option
                  >
                  <md-option
                    v-if="feedBackFormObj.section == 'خطة التنفيذ'"
                    value="تاريخ الانتهاء المستهدف"
                    >تاريخ الانتهاء المستهدف</md-option
                  >
                  <md-option
                    v-if="feedBackFormObj.section == 'خطة التنفيذ'"
                    value="تاريخ البدء الفعلي"
                    >تاريخ البدء الفعلي</md-option
                  >
                  <md-option
                    v-if="feedBackFormObj.section == 'خطة التنفيذ'"
                    value="تاريخ الانتهاء الفعلي"
                    >تاريخ الانتهاء الفعلي</md-option
                  >
                  <md-option
                    v-if="feedBackFormObj.section == 'خطة التنفيذ'"
                    value="النسبة المكافئة"
                    >النسبة المكافئة</md-option
                  >
                  <md-option
                    v-if="feedBackFormObj.section == 'خطة التنفيذ'"
                    value="الأخرى"
                    >الأخرى</md-option
                  >

                  <!-- Sixth section -->
                  <md-option
                    v-if="feedBackFormObj.section == 'ملخص خطة التنفيذ'"
                    value="ملخص ما تم إنجازه في هذا الشهر"
                    >ملخص ما تم إنجازه في هذا الشهر</md-option
                  >
                  <md-option
                    v-if="feedBackFormObj.section == 'ملخص خطة التنفيذ'"
                    value="ملخص الإنجازات المخطط لها في الشهر القادم"
                    >ملخص الإنجازات المخطط لها في الشهر القادم</md-option
                  >
                  <md-option
                    v-if="feedBackFormObj.section == 'ملخص خطة التنفيذ'"
                    value="الأخرى"
                    >الأخرى</md-option
                  >
                </md-select>
                <span
                  class="md-error"
                  v-if="!$v.feedBackFormObj.subSection.required"
                  >subSection is required</span
                >
                <span
                  class="md-error"
                  v-else-if="!$v.feedBackFormObj.subSection.minlength"
                  >Invalid subSection</span
                >
              </md-field>
            </b-col>
            <b-col cols="4" v-if="data.type == 'initiative'">
              <md-field
                :class="getValidationClassFeedBack('subSectionDescription')"
              >
                <label for="type">تفاصيل اضافية</label>

                <md-input
                  autocomplete="given-name"
                  v-model="feedBackFormObj.subSectionDescription"
                />
                <span
                  class="md-error"
                  v-if="!$v.feedBackFormObj.subSectionDescription.required"
                  >subSectionDescription is required</span
                >
                <span
                  class="md-error"
                  v-else-if="
                    !$v.feedBackFormObj.subSectionDescription.minlength
                  "
                  >Invalid subSectionDescription</span
                >
              </md-field>
            </b-col>
            <b-col cols="12">
              <md-field :class="getValidationClassFeedBack('description')">
                <label for="description">{{ $t("enterDescription") }}</label>
                <md-textarea
                  v-model="feedBackFormObj.description"
                  name="subTitle"
                  id="subTitle"
                  autocomplete="given-name"
                ></md-textarea>
                <span
                  class="md-error"
                  v-if="!$v.feedBackFormObj.description.required"
                  >description is required</span
                >
                <span
                  class="md-error"
                  v-else-if="!$v.feedBackFormObj.description.minlength"
                  >description invalid</span
                >
              </md-field>
            </b-col>
          </b-row>
          <div
            style=" display: block; width: 100%; text-align: right;margin-bottom:10px"
          >
            <a
              class="btn md-primary main-btn border-radius-5 cancel-btn"
              @click="
                () => {
                  this.$emit('closePop');
                  isReturnBack = false;
                }
              "
              >{{ $t("cancel") }}</a
            >
            <button
              class="btn md-primary main-btn border-radius-5 create-btn"
              style="width: 255px;"
              :disabled="sending"
            >
              {{ $t("submitFeedback") }}
            </button>
          </div>
        </form>
      </div>
      <md-dialog-actions></md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import rolesMixin from "../../mixins/RolesMixins.js";
import format from "date-fns/format";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
export default {
  name: "feedback-form",
  mixins: [validationMixin, rolesMixin],
  props: ["data", "feedBackFormObj"],
  data() {
    return {
      subSectionValue: null,
      isReturnBack: true,
      sending: false,
    };
  },
  validations: {
    feedBackFormObj: {
      subSection: {},
      subSectionDescription: {},
      feedbackType: {},
      description: {
        required,
        minLength: minLength(3),
      },
      section: {
        required,
      },
    },
  },
  watch: {
    subSectionValue(val) {
      this.feedBackFormObj.subSection = val;
    },
  },
  computed: {},
  methods: {
    onSectionChange() {
      this.subSectionValue = null;
    },
    onSubSectionChange(e) {
      this.subSectionValue = e;
    },
    formatDate(item) {
      if (item.split("-")[0] == "January") {
        return this.$t("january") + " - " + item.split("-")[1];
      } else if (item.split("-")[0] == "February") {
        return this.$t("february") + " - " + item.split("-")[1];
      } else if (item.split("-")[0] == "March") {
        return this.$t("march") + " - " + item.split("-")[1];
      } else if (item.split("-")[0] == "April") {
        return this.$t("april") + " - " + item.split("-")[1];
      } else if (item.split("-")[0] == "May") {
        return this.$t("may") + " - " + item.split("-")[1];
      } else if (item.split("-")[0] == "June") {
        return this.$t("june") + " - " + item.split("-")[1];
      } else if (item.split("-")[0] == "July") {
        return this.$t("july") + " - " + item.split("-")[1];
      } else if (item.split("-")[0] == "August") {
        return this.$t("august") + " - " + item.split("-")[1];
      } else if (item.split("-")[0] == "September") {
        return this.$t("september") + " - " + item.split("-")[1];
      } else if (item.split("-")[0] == "October") {
        return this.$t("october") + " - " + item.split("-")[1];
      } else if (item.split("-")[0] == "November") {
        return this.$t("november") + " - " + item.split("-")[1];
      } else if (item.split("-")[0] == "December") {
        return this.$t("december") + " - " + item.split("-")[1];
      }
    },
    getValidationClassFeedBack(fieldName) {
      const field = this.$v.feedBackFormObj[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    clearForm() {
      this.$v.$reset();
    },
    submitFeedBackForm() {
      if (this.data.monthlyReportId) {
        this.$showLoader();
        this.sending = true;
        if (!this.hasCSERole) {
          this.feedBackFormObj.feedbackType = "internal";
        }
        // if(this.data.monthlyReportId && this.data.initiativeId) {
        this.feedBackFormObj.monthlyReportId = this.data.monthlyReportId;
        this.feedBackFormObj.initiativeId = this.data.initiativeId;
        if (this.data.type == "initiative") {
          this.feedBackFormObj.initiativeName = this.data.mainData.name;
        }
        // }
        this.$monthlyReportsService
          .feedbackSubmit(this.feedBackFormObj)
          .then((res) => {
            if (res.success) {
              this.feedBackFormObj.subSection = null;
              this.feedBackFormObj.subSectionDescription = null;
              this.feedBackFormObj.feedbackType = null;
              this.feedBackFormObj.description = null;
              this.feedBackFormObj.section = null;

              this.clearForm();
              this.$emit("addLogData", res.data);
              this.$swal({
                icon: "success",
                type: "success",
                title: "تم إرسال الملاحظات بنجاح",
              }).then(() => {
                this.isReturnBack = false;
                this.$emit("closePop");
              });
            } else {
              this.$swal({
                icon: "error",
                type: "error",
                title: res.message.message,
              });
            }
            this.$hideLoader();
            this.sending = false;
          });
      }
    },
    findReportTable(currentRole, next) {
      switch (next) {
        case true: {
          if (currentRole == "Entity Initiator") {
            return "Entity Approver";
          } else if (currentRole == "Entity Approver") {
            return "CSE Reviewer A";
          } else if (currentRole == "CSE Reviewer A") {
            return "CSE Reviewer B";
          } else if (currentRole == "CSE Reviewer B") {
            return "CSE Approver";
          }

          break;
        }

        case false: {
          if (currentRole == "CSE Approver") {
            return "CSE Reviewer B";
          } else if (currentRole == "CSE Reviewer B") {
            return "CSE Reviewer A";
          } else if (currentRole == "Entity Approver") {
            return "Entity Initiator";
          }

          break;
        }
      }

      return "";
    },
    validateFeedbackForm() {
      this.$v.feedBackFormObj.$touch();
      if (this.hasCSERole) {
        if (
          this.feedBackFormObj.description &&
          this.feedBackFormObj.section &&
          this.feedBackFormObj.feedbackType
        ) {
          this.submitFeedBackForm();
        } else {
          this.$swal({
            icon: "error",
            type: "error",
            title: "يرجى إكمال النموذج قبل الحفظ.",
          });
        }
      } else {
        if (this.feedBackFormObj.description && this.feedBackFormObj.section) {
          this.submitFeedBackForm();
        } else {
          this.$swal({
            icon: "error",
            type: "error",
            title: "يرجى إكمال النموذج قبل الحفظ.",
          });
        }
      }
    },
  },
  mounted() {},
  created() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
