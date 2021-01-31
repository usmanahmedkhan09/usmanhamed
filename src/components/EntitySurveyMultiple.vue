<template>
  <div class="hello">
    <b-row align-h="between" align-v="center">
      <b-col cols="3">
        <h4 style="font-weight: 600;">Surveys</h4>
      </b-col>
    </b-row>

    <div class="main-card mt-4">
      <h4 class="pt-4 pl-4">
        {{ survey.surveyName }} {{ survey.creationTime | formatDate }}
      </h4>
      <h3 class="py-3 px-4" style="background: #FAFAFA">World Health Survey</h3>

      <span class="pb-4 pl-4" style="font-size: 16px;display:block"
        >Lorem Ipsum is simply dummy text of the printing</span
      >
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
          <b-row
            align-v="top"
            class="mb-2"
            style="width:100%"
            v-for="(item, index) in data.surveyQuestions"
            v-bind:key="index"
          >
            <b-col cols="4">
              <h5 class="textCenterBold" v-if="index == 0">Questions</h5>
              <div
                style="background:#F5F5F5; border-radius:7px;padding: 14px 8px;"
              >
                <h5
                  title="World Health survey Question number 1 of this screen?"
                  style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
                >
                  {{ item.question }}?
                </h5>
              </div>
            </b-col>
            <b-col v-show="item.answerOne">
              <h5 class="textCenterBold" v-if="index == 0">
                {{ item.answerOne }}
              </h5>
              <div
                style="text-align:center; border: 2px solid #EAEAEA; border-radius:7px"
              >
                <md-radio v-model="item.radio" value="replyOne"></md-radio>
              </div>
            </b-col>
            <b-col v-show="item.answerTwo">
              <h5 class="textCenterBold" v-if="index == 0">
                {{ item.answerTwo }}
              </h5>
              <div
                style="text-align:center; border: 2px solid #EAEAEA; border-radius:7px"
              >
                <md-radio
                  v-model="item.radio"
                  value="replyTwo"
                  v-on:change="onRadioChange(item, index)"
                ></md-radio>
              </div>
            </b-col>
            <b-col v-show="item.answerThree">
              <h5 class="textCenterBold" v-if="index == 0">
                {{ item.answerThree }}
              </h5>
              <div
                style="text-align:center; border: 2px solid #EAEAEA; border-radius:7px"
              >
                <md-radio
                  v-model="item.radio"
                  value="replyThree"
                  v-on:change="onRadioChange(item, index)"
                ></md-radio>
              </div>
            </b-col>
            <b-col v-show="item.answerFour">
              <h5 class="textCenterBold" v-if="index == 0">
                {{ item.answerFour }}
              </h5>
              <div
                style="text-align:center; border: 2px solid #EAEAEA; border-radius:7px"
              >
                <md-radio
                  v-model="item.radio"
                  value="replyFour"
                  v-on:change="onRadioChange(item, index)"
                ></md-radio>
              </div>
            </b-col>
            <b-col v-show="item.answerFive">
              <h5 class="textCenterBold" v-if="index == 0">
                {{ item.answerFive }}
              </h5>
              <div
                style="text-align:center; border: 2px solid #EAEAEA; border-radius:7px"
              >
                <md-radio
                  v-model="item.radio"
                  value="replyFive"
                  v-on:change="onRadioChange(item, index)"
                ></md-radio>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row align-v="center" class="mt-4" style="width:100%">
        <b-col cols="4">
          <h4>Upload Supporting Files</h4>
          <!--<md-field>
            <label>Upload Attachment</label>
            <md-file v-model="uploadFile" @change="handleFileUpload($event)"/>
          </md-field>-->
          <label>Upload Attachment</label>
          <input
            type="file"
            id="imageUpload"
            @change="handleFileUpload()"
            ref="file"
            name="file"
          />
        </b-col>
      </b-row>

      <div class="mt-5" style=" display: block; width: 100%; text-align: left;">
        <button
          class="btn md-primary main-btn border-radius-5 create-btn"
          @click="submitAnswer"
        >
          Save Survey
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
import { mapGetters } from "vuex";
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
  name: "entitySurveyMultiple",
  mixins: [validationMixin, surveyMixin],
  data() {
    return {
      data: [],
      uploadFile: "",
      cardType: "multi",
      isCreateDialog: false,
      survey: {},
      userSaved: false,
      sending: false,
      lastUser: null,
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
    onRadioChange(val, index) {
      // this.answers.surveyResponseAnswers.map((item)=>{
      //     if(item.questionId == val.id) {
      //        Object.entries(item).forEach((value, key) => {
      //           if(this.numbers.includes(value[0])) {
      //               if(value[0] == val.radio) {
      //                 item[value[0]] = true;
      //               } else {
      //                 item[value[0]] = false;
      //               }
      //           }
      //         });
      //     }
      //     return item;
      // })
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
