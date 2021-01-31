<template>
  <div class="hello">
    <b-row align-h="between" align-v="center">
      <b-col cols="5">
        <h4 style="font-weight: 600;">
          الصفحة الرئیسیة / التقییم الذاتي للجھات
        </h4>
      </b-col>
      <!-- <b-col cols="2">
        <button
          class="btn md-primary main-btn border-radius-5"
          style="width:100%"
          v-show="!hasEntityRole"
          @click="isCreateDialog = true"
        >Create Survey</button>
      </b-col> -->
    </b-row>
    <b-row align-h="between" class="mt-4" align-v="top">
      <b-col cols="6">
        <div style="padding: 25px; background: #f3f3f3; border-radius: 10px;">
          <h4 style="color:#58B3B8">مقدمة:</h4>
          <span style="display:block; margin-bottom:25px;font-size: 18px;"
            >أطلقت المملكة العربیة السعودیة رؤیة 2030 الطموحة، التي ترتكز على
            ثلاثة محاور رئیسیة، أحدھا "وطن طموح،" والذي یركّز على جانب الحكومة
            الفاعلة الملتزمة برفع كفاءة الإنفاق والتوازن المالي، ومن ھذا المنطلق
            تم تأسیس مركز تحقیق كفاءة الإنفاق لیكون الذراع التنفیذي لتحقیق طموح
            الوطن في رفع كفاءة الإنفاق.</span
          >
          <span style="display:block; margin-bottom:25px;font-size: 18px;">
            ... وانطلاقاً من رؤیة المملكة 2030 واھتمام القیادة الرشیدة برفع
            كفاءة الإنفاق یتطلع المركز من خلال الاستبیان للوقوف على التمكین
            المطلوب للجھات الحكومیة للمساھمة في تحقیق أھداف الرؤیة ذات العلاقة
            عن طریق:<br />
            • قیاس مدى الاستعداد الاستراتیجي لتحقیق كفاءة الإنفاق لدى الجھة<br />
            • تمكین الجھات من مواءمة استراتیجیتھا مع مستھدفات التوازن المالي
          </span>
          <span style="display:block; margin-bottom:25px;font-size: 18px;">
            وسیتم مشاركة نتائج ھذا الاستبیان مع اللجنة المالیة ومجلس الشؤون
            الاقتصادیة والتنمیة، وبالتالي فإنّھ من المرجو تحري الدقة الكاملة في
            تقدیم الإجابات ومواءمتھا مع رئیس الجھة.
          </span>
        </div>
      </b-col>

      <b-col cols="6">
        <div class="main-card p-4 text-center">
          <img src="/images/info.png" alt="" />
          <b-row align-h="between" class="mt-5" align-v="center">
            <b-col cols="4">
              <md-checkbox class="red" v-model="radio" value="replyOne"
                >أقر بفھمي والتزامي بالعبارة</md-checkbox
              >
            </b-col>
            <b-col cols="4">
              <button
                class="btn md-primary main-btn comman-gradient border-radius"
                style="width:100%;"
                :disabled="!radio"
                @click="$router.push('/main/survey/17')"
              >
                البدء في التقییم
              </button>
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import format from "date-fns/format";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
export default {
  name: "surveyConfirmation",
  mixins: [validationMixin],
  data() {
    let dateFormat = "YYYY-MM-DD";
    let now = new Date();
    return {
      radio: null,
      options: {
        Keyword: "",
        isActive: true,
        SkipCount: 0,
      },
      perPage: 10,
      search: null,
      disabledSearch: false,
      totalCount: 0,
      isCreateDialog: false,
      form: {
        surveyName: null,
        startDate: format(now, dateFormat),
        endDate: format(now, dateFormat),
        status: "isDraft",
      },
      userSaved: false,
      sending: false,
      lastUser: null,
      currentPage: 1,
      // Note `isActive` is left out and will not appear in the rendered table
      fields: [
        "id",
        {
          key: "surveyName",
          label: "survey Name",
          formatter: "surveyName",
        },
        "status",
        {
          key: "creationTime",
          label: "Created Date",
          formatter: (value, key, item) => {
            return format(value, dateFormat);
          },
        },
        {
          key: "lastModificationTime",
          label: "Last Update",
          formatter: (value, key, item) => {
            return format(value, dateFormat);
          },
        },
        {
          key: "endDate",
          label: "End Date",
          formatter: (value, key, item) => {
            return format(value, dateFormat);
          },
        },
        { key: "actions", label: "Actions" },
      ],
      items: [],
    };
  },
  validations: {
    form: {
      surveyName: {
        required,
        minLength: minLength(3),
      },
      startDate: {
        required,
      },
      endDate: {
        required,
      },
    },
  },
  watch: {
    currentPage(newPage) {
      this.options.SkipCount = this.perPage * (newPage - 1);
      this.getSurveysList();
    },
  },
  methods: {
    onDelete() {
      this.$router.push("/main/survey/entity/multiple");
    },
    onView(item) {
      this.$store.commit("setSurvay", item);
      this.$router.push("/main/survey/" + item.id);
    },
    searchSurvey() {
      this.options.Keyword = this.search;
      this.getSurveysList();
    },
    onCreateSurvey() {
      this.sending = true;
      this.$surveyService
        .createSurvey(this.form)
        .then((res) => {
          if (res.success) {
            this.$router.push({
              name: "survey-view",
              params: { survey_id: res.data.id },
            });
          } else {
            this.$swal({
              icon: "error",
              type: "error",
              title: res.message.details,
            });
          }
          this.sending = false;
        })
        .catch((error) => {
          this.sending = false;
        });
    },
    onPagination(event) {},
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.surveyName = null;
      this.form.startDate = null;
      this.form.endDate = null;
    },
    validateForm() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.onCreateSurvey();
      }
    },
    getSurveysList() {
      this.disabledSearch = true;
      this.$showLoader();
      const list = this.$surveyService
        .getAllSurveys(this.options)
        .then((res) => {
          if (res.success) {
            this.items = res.data.items;
            this.totalCount = res.data.totalCount;
          }
          this.$hideLoader();
          this.disabledSearch = false;
        });
    },
  },
  computed: {
    hasEntityRole() {
      const role = ["Entity Initiator", "Entity Approver"];
      let roles = this.$user.roles();
      if (roles && roles.length > 0) {
        roles = JSON.parse(roles).split(",");
        return role.some((r) => roles.includes(r));
      }
    },
  },
  mounted() {
    this.getSurveysList();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-datepicker {
  position: absolute;
  top: 0;
  left: 0px;
  opacity: 0;
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
.edit {
  font-size: 12px;
  background: #15b4ba !important;
  margin: 0 5px;
}
.delete {
  font-size: 12px;
  background: #c8d32d !important;
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
