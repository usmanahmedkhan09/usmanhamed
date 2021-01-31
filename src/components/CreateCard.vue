<template>
  <div class="hello">
    <b-row align-h="between" align-v="center">
      <b-col cols="3">
        <h4 style="font-weight: 600;">Surveys</h4>
      </b-col>
      <b-col cols="2">
        <!-- <button
          class="btn md-primary main-btn border-radius-5"
          style="width:100%"
          @click="onCreateCard"
        >Create Cards</button>-->
      </b-col>
    </b-row>
    <div class="main-card mt-4">
      <div class="p-4">
        <h4>{{ $t("createCard") }}</h4>
        <b-row align-v="center" class="mt-4" style="width:100%">
          <b-col cols="6">
            <md-field>
              <label for="type">{{ $t("selectCardType") }}</label>
              <md-select
                name="type"
                id="type"
                v-model="data.type"
                md-dense
                :disabled="sending || isUpdate"
              >
                <md-option :value="null">Select Option</md-option>
                <md-option value="single">{{
                  $t("singleQuestions")
                }}</md-option>
                <md-option value="multi">{{
                  $t("multipleQuestions")
                }}</md-option>
                <md-option value="maturity">{{
                  $t("maturityQuestions")
                }}</md-option>
              </md-select>
            </md-field>
          </b-col>
          <b-col cols="6">
            <md-field>
              <label for="type">{{ $t("category") }}</label>
              <md-select
                name="type"
                id="type"
                v-model="data.category"
                md-dense
                :disabled="sending || isUpdate"
              >
                <md-option :value="null">Select Option</md-option>
                <md-option value="leadership">{{
                  $t("leadershipStrategy")
                }}</md-option>
                <md-option value="impact">{{ $t("impact") }}</md-option>
                <md-option value="capacity">{{ $t("capacity") }}</md-option>
                <md-option value="system">{{ $t("systemData") }}</md-option>
              </md-select>
            </md-field>
          </b-col>

          <b-col cols="6">
            <md-field>
              <label for="title">{{ $t("cardTitle") }}</label>
              <md-input
                name="title"
                v-model="data.title"
                id="title"
                autocomplete="given-name"
                :disabled="sending || isUpdate"
              />
            </md-field>
          </b-col>
          <b-col cols="6">
            <md-field>
              <label for="type">{{ $t("subCategory") }}</label>
              <md-select
                name="type"
                id="type"
                v-model="data.subCategory"
                md-dense
                :disabled="sending || isUpdate"
              >
                <md-option :value="null">Select Option</md-option>
                <md-option v-for="(item, index) in items" :value="item.value">{{
                  item.label
                }}</md-option>
              </md-select>
            </md-field>
          </b-col>
          <b-col cols="6">
            <md-field>
              <label for="subTitle">Card Sub Title</label>
              <md-input
                name="subTitle"
                id="subTitle"
                v-model="data.subtitle"
                autocomplete="given-name"
                :disabled="sending || isNotEditable"
              />
            </md-field>
          </b-col>

          <b-col cols="2"></b-col>
          <b-col cols="6">
            <md-field>
              <label for="subTitle">{{ $t("enterSubComponent") }}</label>
              <md-textarea
                v-model="data.subComponent"
                name="subTitle"
                id="subTitle"
                autocomplete="given-name"
                :disabled="sending || isNotEditable"
              ></md-textarea>
            </md-field>
          </b-col>
        </b-row>
      </div>

      <!------------------------------------------- SINGLE LEVEL---------------------------- -->

      <div v-if="data.type == 'single'" class="upperLine">
        <div class="p-4">
          <h4>{{ $t("addOptions") }}</h4>
          <div v-for="(data, i) in Data.options" v-bind:key="i">
            <div style="width:100px; position:relative">
              <md-field>
                <md-input
                  style=" width: 100%;"
                  name="item"
                  id="item"
                  type="text"
                  placeholder="item"
                  autocomplete="given-name"
                  :disabled="sending || isNotEditable"
                  v-model="Data.options[i]"
                />
              </md-field>
              <img
                v-show="!isNotEditable"
                v-if="i > 0 && hasAdminRole && !hasEntityRole && !hasCSERole"
                class="remove-icon"
                src="/images/icons/remove.png"
                @click="removeMoreOptions(i)"
                alt
              />
            </div>
          </div>
          <img
            v-if="hasAdminRole && !hasEntityRole && !hasCSERole"
            v-show="!isNotEditable"
            style="width: 45px;cursor:pointer"
            src="/images/icons/add.png"
            @click="addMoreOptions"
            alt
          />
        </div>
      </div>

      <!------------------------------------------- MULTIPLE LEVEL---------------------------- -->

      <div v-if="data.type == 'multi'">
        <div class="upperLine">
          <div class="p-4">
            <h4>{{ $t("addOptions") }}</h4>
            <b-row align-v="center" class="mt-4" style="width:100%">
              <b-col cols="6" v-for="(data, i) in Data.options" v-bind:key="i">
                <div style="width:80%; position:relative">
                  <md-field>
                    <md-input
                      style=" width: 100%;"
                      name="item"
                      id="item"
                      type="text"
                      placeholder="Item"
                      autocomplete="given-name"
                      :disabled="sending || isNotEditable"
                      v-model="Data.options[i]"
                    />
                  </md-field>
                  <img
                    v-show="!isNotEditable"
                    v-if="i > 0"
                    class="remove-icon"
                    src="/images/icons/remove.png"
                    @click="removeMoreOptions(i)"
                    alt
                  />
                </div>
              </b-col>
              <b-col cols="6">
                <img
                  v-show="!isNotEditable"
                  style="width: 45px;cursor:pointer;position: relative;top: -7px;"
                  src="/images/icons/add.png"
                  @click="addMoreOptions"
                  alt
                />
              </b-col>
            </b-row>
          </div>
        </div>
        <div class="upperLine">
          <div class="p-4">
            <h4>{{ $t("addQuestions") }}</h4>
            <b-row align-v="center" class="mt-4" style="width:100%">
              <b-col
                cols="6"
                v-for="(item, i) in data.surveyQuestions"
                v-bind:key="i"
              >
                <div style="width:80%; position:relative">
                  <md-field>
                    <md-input
                      style=" width: 100%;"
                      name="item"
                      id="item"
                      type="text"
                      placeholder="Item"
                      autocomplete="given-name"
                      :disabled="sending || isNotEditable"
                      v-model="item.question"
                    />
                  </md-field>
                  <img
                    v-if="
                      i > 0 && hasAdminRole && !hasEntityRole && !hasCSERole
                    "
                    class="remove-icon"
                    src="/images/icons/remove.png"
                    v-show="!isNotEditable"
                    @click="removeMoreQuestions(i)"
                    alt
                  />
                </div>
              </b-col>
              <b-col
                cols="6"
                v-if="hasAdminRole && !hasEntityRole && !hasCSERole"
              >
                <img
                  v-show="!isNotEditable"
                  style="width: 45px;cursor:pointer;position: relative;top: -7px;"
                  src="/images/icons/add.png"
                  @click="addMoreQuestions"
                  alt
                />
              </b-col>
            </b-row>
          </div>
        </div>
      </div>
      <!------------------------------------------- MATURITY LEVEL---------------------------- -->
      <div v-if="data.type == 'maturity'">
        <div class="upperLine">
          <div class="p-4">
            <h4>{{ $t("addQuestions") }}</h4>
            <b-row align-v="center" class="mt-4" style="width:100%">
              <b-col cols="6" class="mb-3">
                <span class="maturity-heading">Add Maturity Level 1</span>

                <md-field class="border-red">
                  <label for="subTitle">{{ $t("enterDescription") }}</label>
                  <md-textarea
                    autocomplete="given-name"
                    :disabled="sending || isNotEditable"
                    v-model="data.surveyQuestions[0]['answerOne']"
                  ></md-textarea>
                </md-field>
                <md-field>
                  <md-input
                    type="text"
                    :placeholder="$t('addDocumentsRequired')"
                    autocomplete="given-name"
                    :disabled="sending || isNotEditable"
                    v-model="data.surveyQuestions[0]['requiredDocOne']"
                  />
                </md-field>
              </b-col>
              <b-col cols="6" class="mb-3">
                <span class="maturity-heading">Add Maturity Level 2</span>
                <md-field class="border-dark-blue">
                  <label for="subTitle">{{ $t("enterDescription") }}</label>
                  <md-textarea
                    autocomplete="given-name"
                    :disabled="sending || isNotEditable"
                    v-model="data.surveyQuestions[0]['answerTwo']"
                  ></md-textarea>
                </md-field>
                <md-field>
                  <md-input
                    type="text"
                    :placeholder="$t('addDocumentsRequired')"
                    autocomplete="given-name"
                    :disabled="sending || isNotEditable"
                    v-model="data.surveyQuestions[0]['requiredDocTwo']"
                  />
                </md-field>
              </b-col>
              <b-col cols="6" class="mb-3">
                <span class="maturity-heading">Add Maturity Level 3</span>

                <md-field class="border-blue">
                  <label for="subTitle">{{ $t("enterDescription") }}</label>
                  <md-textarea
                    autocomplete="given-name"
                    :disabled="sending || isNotEditable"
                    v-model="data.surveyQuestions[0]['answerThree']"
                  ></md-textarea>
                </md-field>
                <md-field>
                  <md-input
                    type="text"
                    :placeholder="$t('addDocumentsRequired')"
                    autocomplete="given-name"
                    :disabled="sending || isNotEditable"
                    v-model="data.surveyQuestions[0]['requiredDocThree']"
                  />
                </md-field>
              </b-col>
              <b-col cols="6" class="mb-3">
                <span class="maturity-heading">Add Maturity Level 4</span>

                <md-field class="border-dark-green">
                  <label for="subTitle">{{ $t("enterDescription") }}</label>
                  <md-textarea
                    autocomplete="given-name"
                    :disabled="sending || isNotEditable"
                    v-model="data.surveyQuestions[0]['answerFour']"
                  ></md-textarea>
                </md-field>
                <md-field>
                  <md-input
                    type="text"
                    :placeholder="$t('addDocumentsRequired')"
                    autocomplete="given-name"
                    :disabled="sending || isNotEditable"
                    v-model="data.surveyQuestions[0]['requiredDocFour']"
                  />
                </md-field>
              </b-col>
              <b-col cols="6" class="mb-3">
                <span class="maturity-heading">Add Maturity Level 5</span>

                <md-field class="border-green">
                  <label for="subTitle">{{ $t("enterDescription") }}</label>
                  <md-textarea
                    autocomplete="given-name"
                    :disabled="sending || isNotEditable"
                    v-model="data.surveyQuestions[0]['answerFive']"
                  ></md-textarea>
                </md-field>
                <md-field>
                  <md-input
                    type="text"
                    :placeholder="$t('addDocumentsRequired')"
                    autocomplete="given-name"
                    :disabled="sending || isNotEditable"
                    v-model="data.surveyQuestions[0]['requiredDocFive']"
                  />
                </md-field>
              </b-col>
            </b-row>
          </div>
        </div>
      </div>

      <div class="submit-btn upperLine">
        <div
          class="p-4"
          style=" display: block; width: 100%; text-align: left;"
        >
          <button
            class="btn md-primary main-btn border-radius comman-gradient create-btn"
            @click="saveCard"
            :disabled="checkErrors || isNotEditable"
          >
            {{ submit_button }} Card
          </button>
          <button
            class="btn md-primary main-btn border-radius cancel-btn"
            @click="$router.go('-1')"
          >
            {{ $t("cancel") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { validationMixin } from "vuelidate";
import rolesMixin from "../mixins/RolesMixins.js";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
export default {
  name: "createSurvey",
  mixins: [validationMixin, rolesMixin],
  data() {
    return {
      Data: {
        options: ["a", "b"],
        questions: ["Q a", "Q b"],
      },
      items: [],
      subCategories: [
        {
          value: "Strategy development",
          label: "Strategy development",
          parent: "leadership",
        },
        {
          value: "Seek to identify opportunities for efficient spending",
          label: "Seek to identify opportunities for efficient spending",
          parent: "leadership",
        },
        {
          value:
            "Effective leadership to follow implementation and remove obstacles",
          label:
            "Effective leadership to follow implementation and remove obstacles",
          parent: "leadership",
        },
        {
          value: "Evaluate and assets efforts",
          label: "Evaluate and assets efforts",
          parent: "leadership",
        },
        {
          value: "Short term initiatives",
          label: "Short term initiatives",
          parent: "impact",
        },
        {
          value: "Medium and long term initiatives",
          label: "Medium and long term initiatives",
          parent: "impact",
        },
        {
          value: "Success stories",
          label: "Success stories",
          parent: "impact",
        },
        {
          value: "Developing skills to raise spending efficiency",
          label: "Developing skills to raise spending efficiency",
          parent: "capacity",
        },
        {
          value: "Data archiving methodologies",
          label: "Data archiving methodologies",
          parent: "system",
        },
        { value: "Data availability", label: "Data Trading", parent: "system" },
      ],
      submit_button: "Save",
      data: {
        surveyId: 0,
        type: "single",
        title: "",
        subtitle: "",
        subComponent: "",
        category: "",
        subCategory: "",
        surveyQuestions: [
          {
            question: "",
            answerOne: "",
            answerTwo: "",
            answerThree: "",
            answerFour: "",
            answerFive: "",
            requiredDocOne: "",
            requiredDocTwo: "",
            requiredDocThree: "",
            requiredDocFour: "",
            requiredDocFive: "",
          },
        ],
        id: 0,
      },
      isCreateDialog: false,
      isUpdate: false,
      isNotEditable: false,
      userSaved: false,
      sending: false,
      lastUser: null,
      currentPage: 1,
      selectSearch: null,
      currentPage: 1,
      errors: [],
      // Note `isActive` is left out and will not appear in the rendered table
    };
  },

  watch: {
    "data.type": {
      handler: function(after, before) {},
      deep: true,
    },
    "data.category": {
      handler: function(after, before) {
        this.items = this.subCategories.filter((item) => item.parent == after);
      },
      deep: true,
    },
  },
  computed: {
    checkErrors() {
      if (this.data.subComponent == "" || this.data.title == "") {
        this.errors.push("Card Main Fields Are Missing");
        return true;
      }
      if (this.data.type == "") {
        this.errors.push("Card Type is Missing");
        return true;
      }
      return false;
    },
  },
  mounted() {
    if (this.$route.params.card_id && this.$route.params.card_id > 0) {
      this.getCardDetail();
      this.isUpdate = true;
    }
  },
  methods: {
    getCardDetail() {
      this.$showLoader();
      this.$cardService.getCard(this.$route.params.card_id).then((res) => {
        this.$hideLoader();
        if (res.success) {
          if (this.hasAdminRole && !this.hasEntityRole && !this.hasCSERole) {
            this.submit_button = "Update";
          } else {
            this.submit_button = "Save";
          }
          this.data = res.data;
          this.items = this.subCategories.filter(
            (item) => item.parent == this.data.category
          );
          this.$surveyService.getSurvey(this.data.surveyId).then((RES) => {
            if (RES.success)
              this.isNotEditable = RES.data.status == "isDraft" ? false : true;
          });
          const numbers = ["One", "Two", "Three", "Four", "Five"];
          this.Data.options = [];
          this.data.surveyQuestions.map((item, index1) => {
            Object.entries(item).forEach((value, key) => {
              if (
                this.Data.options.length < 5 &&
                value[0].includes("answer") &&
                value[1].length > 0
              ) {
                this.Data.options.push(value[1]);
              }
            });
            return item;
          });
        }
      });
    },
    removeMoreOptions(i) {
      this.Data.options.splice(i, 1);
    },
    addMoreOptions() {
      this.Data.options.push(null);
    },
    removeMoreQuestions(i) {
      this.data.surveyQuestions.splice(i, 1);
    },
    addMoreQuestions() {
      this.data.surveyQuestions.push({
        question: "",
        answerOne: "",
        answerTwo: "",
        answerThree: "",
        answerFour: "",
        answerFive: "",
        requiredDocOne: "",
        requiredDocTwo: "",
        requiredDocThree: "",
        requiredDocFour: "",
        requiredDocFive: "",
      });
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    saveCard() {
      if (this.checkErrors) {
        this.$swal({
          icon: "error",
          type: "error",
          confirmButtonText: this.$t("ok"),
          title: this.errors.join(),
        });
      } else {
        this.data.surveyId = this.$route.params.survey_id;
        const numbers = ["One", "Two", "Three", "Four", "Five"];
        if (this.data.type == "single") {
          this.Data.options.forEach((item, index) => {
            this.data.surveyQuestions[0]["answer" + numbers[index]] = item;
          });
        }

        if (this.data.type == "multi") {
          this.data.surveyQuestions.forEach((item, index1) => {
            this.Data.options.forEach((inneritem, index) => {
              item["answer" + numbers[index]] = inneritem;
            });
          });
        }
        this.sending = true;
        this.$showLoader();
        if (!this.isUpdate) {
          const list = this.$cardService.createCard(this.data).then((res) => {
            if (res.success) {
              this.$swal({
                icon: "success",
                type: "success",
                confirmButtonText: this.$t("ok"),
                title: "الرجاء إرفاق الملف",
              }).then((res) => {
                this.$router.go("-1");
              });
            } else {
              this.$swal({
                icon: "error",
                type: "error",
                confirmButtonText: this.$t("ok"),
                title: res.message.details,
              });
            }
            this.$hideLoader();
            this.sending = false;
          });
        } else if (this.isUpdate) {
          this.$cardService.updateCard(this.data).then((res) => {
            if (res.success) {
              this.$swal({
                icon: "success",
                type: "success",
                confirmButtonText: this.$t("ok"),
                title: "Card Updated Successfully!",
              }).then((res) => {
                this.$router.go("-1");
              });
            } else {
              this.$swal({
                icon: "error",
                type: "error",
                confirmButtonText: this.$t("ok"),
                title: res.message.details,
              });
            }
            this.$hideLoader();
            this.sending = false;
          });
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.remove-icon {
  position: absolute;
  width: 40px;
  top: 58%;
  transform: translate(0, -50%);
  cursor: pointer;
}
body.english .remove-icon {
  right: -75px;
}
body.arabic .remove-icon {
  left: -75px;
}

body.english .border-red {
  border-right: 10px solid #e81e27;
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
  margin-bottom: 0;
}
body.english .border-dark-blue {
  border-right: 10px solid #2a80c3;
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
  margin-bottom: 0;
}
body.english .border-blue {
  border-right: 10px solid #21b0b7;
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
  margin-bottom: 0;
}
body.english .border-dark-green {
  border-right: 10px solid #6bb448;
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
  margin-bottom: 0;
}
body.english .border-green {
  border-right: 10px solid #2fc548;
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
  margin-bottom: 0;
}

body.arabic .border-red {
  border-left: 10px solid #e81e27;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
  margin-bottom: 0;
}
body.arabic .border-dark-blue {
  border-left: 10px solid #2a80c3;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
  margin-bottom: 0;
}
body.arabic .border-blue {
  border-left: 10px solid #21b0b7;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
  margin-bottom: 0;
}
body.arabic .border-dark-green {
  border-left: 10px solid #6bb448;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
  margin-bottom: 0;
}
body.arabic .border-green {
  border-left: 10px solid #2fc548;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
  margin-bottom: 0;
}

.maturity-heading {
  font-size: 18px;
  font-weight: 600;
}
.upperLine {
  border-top: 1px solid #f2f2f2;
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
