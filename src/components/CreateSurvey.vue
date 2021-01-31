<template>
  <div class="hello">
    <b-row align-h="between" align-v="center">
      <b-col cols="3">
        <img @click="$router.go(-1)" src="/images/icons/back.png" />
        <h4 style="font-weight: 600" class="d-inline pr-3">Surveys</h4>
      </b-col>
      <b-col cols="4">
        <b-row align-h="end" align-v="center">
          <b-col
            cols="6"
            v-if="
              shouldPublished && hasAdminRole && !hasEntityRole && !hasCSERole
            "
          >
            <button
              class="btn md-primary main-btn border-radius comman-gradient"
              style="width: 100%"
              @click="publishSurvey"
            >
              {{ $t("publishSurvey") }}
            </button>
          </b-col>
          <b-col
            cols="6"
            v-if="
              shouldBeDraft && hasAdminRole && !hasEntityRole && !hasCSERole
            "
          >
            <button
              class="btn md-primary main-btn border-radius comman-gradient"
              style="width: 100%"
              @click="onCreateCard"
            >
              {{ $t("createCard") }}
            </button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <div class="main-card p-4 mt-4">
      <!-- <h4>Entity View</h4> -->

      <b-row align-v="center" style="width: 100%">
        <b-col cols="3">
          <md-field>
            <label for="surveyName">{{ $t("surveyName") }}</label>
            <md-input
              readonly
              autocomplete="given-name"
              v-model="data.surveyName"
            />
          </md-field>
        </b-col>

        <b-col cols="3">
          <md-field>
            <label for="startDate">{{ $t("startDate") }}</label>

            <md-input
              readonly
              autocomplete="given-name"
              v-model="data.creationTime"
            />
          </md-field>
        </b-col>

        <b-col cols="3">
          <md-field>
            <label for="endDate">{{ $t("endDate") }}</label>

            <md-input
              readonly
              autocomplete="given-name"
              v-model="data.endDate"
            />
          </md-field>
        </b-col>
      </b-row>
    </div>
    <!--<b-row align-v="top">
      <!-- <h4>Dummy Cards</h4> 
      <b-col cols="4">
        <a class="card-click">
          <div
            @click="entiitySurveyView('1')"
            class="main-card p-3 mt-2"
            style="overflow:auto;  min-height: 160px; position:relative"
          >
            <h5>Heading (DUMMY)</h5>
            <span class="card-text">Single Questions</span>
          </div>
        </a>
      </b-col>
      <b-col cols="4">
        <a class="card-click">
          <div
            @click="entiitySurveyView('2')"
            class="main-card p-3 mt-2"
            style="overflow:auto;  min-height: 160px; position:relative"
          >
            <h5>Heading (DUMMY)</h5>
            <span class="card-text">Multiple Questions</span>
          </div>
        </a>
      </b-col>
      <b-col cols="4">
        <a class="card-click">
          <div
            @click="entiitySurveyView('3')"
            class="main-card p-3 mt-2"
            style="overflow:auto;  min-height: 160px; position:relative"
          >
            <h5>Heading (DUMMY)</h5>
            <span class="card-text">Maturity Questions</span>
          </div>
        </a>
      </b-col>
    </b-row> -->
    <b-row align-v="top">
      <!-- <h4 class="mt-4">Lists of Cards</h4> -->
      <b-col cols="4" v-for="(card, index) in data.cards">
        <a class="card-click">
          <div
            :class="{ active: card.active }"
            @click="toggleActive(index)"
            class="main-card p-3 mt-2"
            style="overflow: auto; min-height: 160px; position: relative"
          >
            <h5>{{ card.title }} {{ index + 1 }}</h5>
            <span class="card-text">{{ card.type }} Questions</span>
          </div>
        </a>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import format from "date-fns/format";
import $ from "jquery";
import { validationMixin } from "vuelidate";
import surveyMixin from "../mixins/SurveyMixin.js";
import rolesMixin from "../mixins/RolesMixins.js";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
const dateFormat = "YYYY-MM-DD";
export default {
  name: "createSurvey",
  mixins: [validationMixin, rolesMixin],
  data() {
    return {
      cardType: "multi",
      data: {
        surveyName: "NEW Survey",
        creationTime: "2020-02-20",
        endDate: "2020-04-20",
        status: "isDraft",
      },
      isCreateDialog: false,

      userSaved: false,
      sending: false,
      lastUser: null,
      currentPage: 1,
      selectSearch: null,
      currentPage: 1,

      // Note `isActive` is left out and will not appear in the rendered table
    };
  },

  watch: {
    currentPage(newPage) {
      // this.$emit('input', newPage);
      // custom input event emitted
    },
  },
  computed: {
    shouldPublished() {
      if (
        this.data.status == "isDraft" &&
        this.data.cards &&
        this.data.cards.length > 0
      ) {
        return true;
      }
    },
    shouldBeDraft() {
      if (this.data.status == "isDraft") {
        return true;
      }
    },
  },
  mounted() {
    this.getSurvey();
  },
  methods: {
    toggleActive(index) {
      this.data.cards.forEach((temp, i) => {
        if (i != index) {
          this.data.cards[i].active = false;
        }
      });
      this.data.cards[index].active = true;
      this.$set(this.data, index, this.data.cards[index]);
      if (this.hasEntityRole) {
        this.$router.push({
          name: "entity-view-" + this.data.cards[index].type,
          params: {
            survey_id: this.data.cards[index].surveyId,
            card_id: this.data.cards[index].id,
          },
        });
      } else {
        this.$router.push({
          name: "survey-view-card",
          params: {
            survey_id: this.data.cards[index].surveyId,
            card_id: this.data.cards[index].id,
          },
        });
      }
    },
    publishSurvey() {
      this.$showLoader();
      const obj = {
        surveyId: this.$route.params.survey_id,
        status: "published",
      };
      this.$surveyService.changeStatus(obj).then((res) => {
        if (res.success) {
          this.$swal({
            icon: "success",
            type: "success",
            confirmButtonText: this.$t("ok"),
            title: "Survey Published Successfully!",
          }).then((res) => {
            this.data.status = obj.status;
          });
        }
        this.$hideLoader();
      });
    },
    getSurvey() {
      this.$showLoader();
      const list = this.$surveyService
        .getSurvey(this.$route.params.survey_id)
        .then((res) => {
          if (res.success) {
            this.data = res.data;
            this.data.creationTime = format(res.data.creationTime, dateFormat);
            this.data.endDate = format(res.data.endDate, dateFormat);
          }
          this.$hideLoader();
        });
    },
    onCreateCard() {
      this.$router.push({
        name: "survey-create-card",
        params: { survey_id: this.$route.params.survey_id },
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
      this.form.userID = null;
      this.form.firstname = null;
      this.form.lastname = null;
      this.form.email = null;
      this.form.phoneNumber = null;
      this.form.type = null;
    },
    saveUser() {
      this.$router.push("/auth/otp");
      // this.sending = true;

      // // Instead of this timeout, here you can call your API
      // window.setTimeout(() => {
      //   this.lastUser = `${this.form.username}`;
      //   this.userSaved = true;
      //   this.sending = false;
      //   this.clearForm();
      // }, 1500);
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
