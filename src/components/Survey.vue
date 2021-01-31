<template>
  <div class="hello">
    <b-row align-h="between" align-v="center">
      <b-col cols="3">
        <h4 style="font-weight: 600;">{{ $t("surveyManagementHeading") }}</h4>
      </b-col>
      <b-col
        cols="3"
        class="text-align-left-right"
        v-if="hasAdminRole && !hasEntityRole && !hasCSERole"
      >
        <button
          class="btn md-primary main-btn border-radius comman-gradient"
          v-show="!hasEntityRole"
          @click="isCreateDialog = true"
        >
          {{ $t("createNewSurvey") }}
        </button>
      </b-col>
    </b-row>

    <div class="main-card p-4 mt-4">
      <h4>{{ $t("searchSurvey") }}</h4>
      <b-row align-v="center" class="mt-4">
        <b-col cols="5">
          <b-form-input
            class="border-radius-5"
            :placeholder="$t('searchSurvey')"
            v-model="search"
            :disabled="disabledSearch"
          ></b-form-input>
        </b-col>
        <b-col cols="3">
          <b-form-select
            v-model="filterSelected"
            :options="filterOptions"
          ></b-form-select>
        </b-col>
        <b-col cols="2">
          <button
            class="btn md-primary main-btn border-radius comman-gradient"
            style="width:100%"
            :disabled="!search || !filterSelected"
            @click="searchSurvey"
          >
            {{ $t("searchSurvey") }}
          </button>
        </b-col>
        <b-col cols="2">
          <button
            class="btn md-primary border-radius"
            style="width:100%;background: grey !important;color: white !important;padding: 8px 18px !important;"
            :disabled="disabledSearch"
            @click="clearSearch"
          >
            إزالة بيانات الحقول
          </button>
        </b-col>
      </b-row>
    </div>

    <div class="main-card pb-4 mt-4">
      <h4 class="p-4">{{ $t("listOfSurveys") }}</h4>
      <template>
        <b-table
          class="top-radius"
          striped
          hover
          :items="items"
          :fields="fields"
        >
          <template v-slot:cell(actions)="data">
            <b class="text-info">
              <button
                class="btn md-primary main-btn border-radius view"
                @click="onView(data.item)"
              >
                {{ $t("view") }}
              </button>
              <!--<button class="btn md-primary main-btn border-radius-5 edit">
              <img style="width: 17px;" src="/images/icons/edit.png" alt />
            </button>
             <button class="btn md-primary main-btn border-radius-5 delete" @click="onDelete">
              <img style="width: 15px;" src="/images/icons/delete.png" alt />
            </button> !-->
            </b>
          </template>
        </b-table>
        <h5 v-if="items.length == 0" class="text-center">
          {{ $t("thereAreCurrentlyNoRecords") }}
        </h5>

        <div class="pagination-div mt-4 mx-5">
          <b-pagination
            class="d-inline-flex"
            v-model="currentPage"
            :total-rows="totalCount"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
        </div>
      </template>
    </div>

    <md-dialog :md-active.sync="isCreateDialog">
      <md-dialog-title></md-dialog-title>
      <div class="px-5">
        <h4 style="font-weight: 600;">{{ $t("createNewSurvey") }}</h4>

        <form novalidate class="md-layout" @submit.prevent="validateForm">
          <b-row align-v="center" class="mt-4" style="width:100%">
            <b-col cols="4">
              <md-field :class="getValidationClass('surveyName')">
                <label for="surveyName">{{ $t("surveyName") }}</label>
                <md-input
                  name="surveyName"
                  id="surveyName"
                  autocomplete="given-name"
                  v-model="form.surveyName"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.surveyName.required"
                  >surveyName is required</span
                >
                <span class="md-error" v-else-if="!$v.form.surveyName.minlength"
                  >Invalid surveyName</span
                >
              </md-field>
            </b-col>

            <b-col cols="4">
              <!-- <md-field :class="getValidationClass('startDate')"> -->
              <!-- <label for="startDate">{{$t('startDate')}}</label>

                <md-input
                  name="startDate"
                  id="startDate"
                  autocomplete="given-name"
                  v-model="form.startDate"
                  :disabled="sending"
                /> -->

              <md-datepicker
                v-model="form.startDate"
                md-immediately
                :md-disabled-dates="form.endDate"
                :disabled="sending"
                name="startDate"
                id="startDate"
              >
                <label>{{ $t("startDate") }}</label>
              </md-datepicker>
              <!-- <span class="md-error" v-if="!$v.form.endDate.required">startDate is required</span>
                <span class="md-error" v-else-if="!$v.form.endDate.minlength">startDate invalid</span>
              </md-field> -->
            </b-col>

            <b-col cols="4">
              <!-- <md-field :class="getValidationClass('endDate')"> -->
              <!-- <label for="endDate">{{$t('endDate')}}</label>

                <md-input
                  name="endDate"
                  id="endDate"
                  autocomplete="given-name"
                  v-model="form.endDate"
                  :disabled="sending"
                  
                /> -->
              <md-datepicker
                v-model="form.endDate"
                md-immediately
                :disabled="sending"
                name="endDate"
                id="endDate"
              >
                <label>{{ $t("endDate") }}</label>
              </md-datepicker>
              <!-- <span class="md-error" v-if="!$v.form.endDate.required">endDate is required</span>
                <span class="md-error" v-else-if="!$v.form.endDate.minlength">endDate invalid</span>
              </md-field> -->
            </b-col>
          </b-row>
          <div style=" display: block; width: 100%; text-align: right;">
            <button
              class="btn md-primary main-btn border-radius cancel-btn"
              @click="isCreateDialog = false"
            >
              {{ $t("cancel") }}
            </button>
            <button
              class="btn md-primary main-btn border-radius comman-gradient create-btn"
              :disabled="sending"
            >
              {{ $t("createNewSurvey") }}
            </button>
          </div>
        </form>
      </div>
      <md-dialog-actions></md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import rolesMixin from "../mixins/RolesMixins.js";
import format from "date-fns/format";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
export default {
  name: "survey",
  mixins: [validationMixin, rolesMixin],
  data() {
    let dateFormat = "YYYY-MM-DD";
    let now = new Date();
    return {
      filterOptions: [
        {
          value: null,
          text: "الرجاء التحديد من القائمة ادناه",
          disabled: true,
        },
        { value: "SurveyName", text: "عنوان التقييم" },
        { value: "CreationTime", text: "تاريخ رفع الطلب" },
        { value: "EndDate", text: "تاريخ الانتهاء" },
        { value: "Status", text: "الحالة" },
      ],
      filterSelected: null,
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
        startDate: null,
        endDate: null,
        status: "isDraft",
      },
      userSaved: false,
      sending: false,
      lastUser: null,
      currentPage: 1,
      // Note `isActive` is left out and will not appear in the rendered table
      fields: [
        {
          key: "id",
          label: "#",
        },
        {
          key: "surveyName",
          label: this.$t("surveyName"),
          formatter: "surveyName",
        },
        { key: "status", label: this.$t("status") },
        {
          key: "creationTime",
          label: this.$t("createdDate"),
          formatter: (value, key, item) => {
            return format(value, dateFormat);
          },
        },
        {
          key: "lastModificationTime",
          label: this.$t("lastUpdate"),
          formatter: (value, key, item) => {
            return format(value, dateFormat);
          },
        },
        {
          key: "endDate",
          label: this.$t("endDate"),
          formatter: (value, key, item) => {
            return format(value, dateFormat);
          },
        },
        { key: "actions", label: this.$t("action") },
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
    clearSearch() {
      this.options.Keyword = "";
      this.options.Column = "";
      this.search = "";
      this.filterSelected = null;
      this.getSurveysList();
    },

    disabledDates(date) {
      const day = date.getDay();
      var datee = new Date();
      return date < datee.setDate(datee.getDate() - 1);
    },
    onDelete() {
      this.$router.push("/main/survey/entity/multiple");
    },
    onView(item) {
      this.$store.commit("setSurvay", item);
      this.$router.push("/main/survey/" + item.id);
    },
    searchSurvey() {
      if (this.filterSelected && this.search) {
        this.options.Keyword = this.search;
        this.options.Column = this.filterSelected;
        this.getSurveysList();
      }
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
  computed: {},
  mounted() {
    this.getSurveysList();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
