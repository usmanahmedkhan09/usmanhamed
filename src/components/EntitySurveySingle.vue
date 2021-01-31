<template>
  <div class="hello">
    <b-row align-h="between" align-v="center">
      <b-col cols="3">
        <h4 style="font-weight: 600;">Surveys</h4>
      </b-col>
    </b-row>

    <div class="main-card mt-4">
      <h4 class="pt-4 px-4">
        {{ survey.surveyName }} {{ survey.creationTime | formatDate }}
      </h4>
      <h3 class="py-3 px-4" style="background: #FAFAFA">World Health Survey</h3>

      <span class="pb-4 px-4" style="font-size: 16px;display:block">{{
        data.title
      }}</span>
    </div>

    <div class="main-card mt-4 p-4">
      <b-row align-v="top" class="mt-2" style="width:100%">
        <b-col cols="3">
          <h5 class="textCenterBold">Sub Component</h5>
          <div
            style="color: white;background: #1DB2B8;padding: 10px;border-radius: 6px;"
          >
            {{ data.subComponent }}
          </div>
        </b-col>

        <b-col cols="9">
          <b-row align-v="top" style="width:100%">
            <b-col cols="2">
              <h5 class="textCenterBold">
                {{
                  data.surveyQuestions
                    ? data.surveyQuestions[0].answerOne
                    : "n/a"
                }}
              </h5>
              <div
                style="text-align:center; border: 2px solid #EAEAEA; border-radius:7px"
              >
                <md-radio
                  v-model="radio"
                  value="replyOne"
                  @change="onRadioChange"
                ></md-radio>
              </div>
            </b-col>
            <b-col cols="2">
              <h5 class="textCenterBold">
                {{
                  data.surveyQuestions
                    ? data.surveyQuestions[0].answerTwo
                    : "n/a"
                }}
              </h5>
              <div
                style="text-align:center; border: 2px solid #EAEAEA; border-radius:7px"
              >
                <md-radio
                  class="rr"
                  v-model="radio"
                  value="replyTwo"
                  @change="onRadioChange"
                ></md-radio>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row align-v="center" class="mt-4" style="width:100%">
        <b-col cols="4">
          <h4>Upload Supporting Files</h4>
          <md-field>
            <label>Upload Attachment</label>
            <md-file v-model="uploadFile" @change="handleFileUpload($event)" />
          </md-field>
        </b-col>
      </b-row>

      <div class="mt-5" style=" display: block; width: 100%; text-align: left;">
        <button
          class="btn md-primary main-btn border-radius-5 create-btn"
          @click="submitAnswer"
        >
          Save Survay
        </button>
        <button
          class="btn md-primary main-btn border-radius-5 cancel-btn"
          @click="$router.go('-1')"
        >
          {{ $t("cancel") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import format from "date-fns/format";
import $ from "jquery";
import { validationMixin } from "vuelidate";
import surveyMixin from "../mixins/SurveyMixin.js";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
const dateFormat = "YYYY-MM-DD";
export default {
  name: "entitySurveySingle",
  mixins: [validationMixin, surveyMixin],
  data() {
    return {
      uploadFile: "",
      radio: "replyOne",
      cardType: "multi",
      data: [],
      isCreateDialog: false,
      survey: {},
      userSaved: false,
      sending: false,
      lastUser: null,
      selectSearch: null,
      answers: {
        id: 0,
        tenantId: localStorage.getItem("tenantId"),
        surveyId: this.$route.params.survey_id,
        cardId: this.$route.params.card_id,
        surveyResponseAnswers: [],
      },
      // Note `isActive` is left out and will not appear in the rendered table
    };
  },

  watch: {},
  computed: {},
  mounted() {
    this.getSurveyCard();
  },
  methods: {
    onRadioChange(val) {
      this.answers.surveyResponseAnswers.map((item, index1) => {
        Object.entries(item).forEach((value, key) => {
          if (this.numbers.includes(value[0])) {
            item[value[0]] = false;
          }
        });
        return item;
      });
      this.answers.surveyResponseAnswers[0][this.radio] = true;
    },
    submitAnswer() {
      this.$showLoader();
      let formData = new FormData();
      // formData.append('uploadFiles', this.$refs.file.files[0]);
      formData.append("answer", JSON.stringify(this.answers));
      this.$surveyResponseService.createSurveyResponse(formData).then((res) => {
        if (res.success) {
          this.data = res.data;
          this.$swal({
            icon: "success",
            type: "success",
            title: "Survey Submitted Successfully!",
          }).then(() => {
            this.$router.go("-1");
          });
        } else {
          this.$swal({
            icon: "info",
            type: "error",
            title: "Please Hold Update is in Progress",
          });
        }
        this.$hideLoader();
      });
    },
    onCreateCard() {},
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    clearForm() {},
    saveUser() {
      this.$router.push("/auth/otp");
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-radio {
  margin-right: 0 !important;
  margin-left: 0 !important;
}

.textCenterBold {
  text-align: center;
  font-weight: 700;
  margin-bottom: 15px;
}
a {
  cursor: pointer !important;
  text-decoration: none !important;
  color: black !important;
}
a:hover {
  text-decoration: none !important;
}
.main-card.active {
  border: 1px solid #23b3b9;
}
.card-text {
  display: inline-block;
  font-size: 14px;
  color: rgb(27, 178, 185);
  position: absolute;
  bottom: 15px;
}
body.english .card-text {
  right: 16px;
  left: none;
}
body.arabic .card-text {
  left: 16px;
  right: none;
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
.accept {
  background: #6db545 !important;
  margin: 0 6px;
}
.reject {
  background: #828282 !important;
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
