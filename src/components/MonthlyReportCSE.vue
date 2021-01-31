<template>
  <div class="hello">
    <b-row align-h="between" align-v="center">
      <b-col cols="7">
        <h4 style="font-weight: 600;">
          نظرة عامة على تسليم الجهات للتقارير الشهرية
        </h4>
      </b-col>
    </b-row>

    <div class="main-card p-4 mt-4">
      <h4>بحث</h4>
      <b-row align-v="center" class="mt-4">
        <b-col cols="4">
          <md-field>
            <label for="endDate">{{ $t("entityName") }}</label>
            <md-input
              autocomplete="given-name"
              type="text"
              v-model="options.EntityName"
            />
          </md-field>
        </b-col>

        <b-col cols="4">
          <md-field>
            <label for="type">الفئة</label>
            <md-select
              name="type"
              id="type"
              v-model="options.Category"
              md-dense
            >
              <md-option :value="null">{{ $t("selectAnOption") }}</md-option>
              <md-option value="all">جميع الفئات</md-option>
              <md-option value="فئة 1"> فئة 1</md-option>
              <md-option value="فئة 2 "> فئة 2</md-option>
              <md-option value="فئة 3"> فئة 3</md-option>
              <md-option value="فئة 4"> فئة 4</md-option>
            </md-select>
          </md-field>
        </b-col>

        <b-col cols="4">
          <md-field>
            <label for="sector">{{ $t("sector") }}</label>
            <md-select
              name="sector"
              id="sector"
              v-model="options.Sector"
              md-dense
            >
              <md-option :value="null">{{ $t("selectAnOption") }}</md-option>
              <md-option
                v-for="(sector, index) in entitySectors"
                :key="index"
                :value="sector.sectorName"
                >{{ sector.sectorName }}</md-option
              >
              <!-- <md-option value="all">جميع القطاعات</md-option>
              <md-option value="Economical - Financial sector">{{$t('economicalFinancialSector')}}</md-option>
              <md-option value="Education sector">{{$t('educationSector')}}</md-option>
              <md-option value="Health sector">{{$t('healthSector')}}</md-option>
              <md-option value="MOX sector">{{$t('MOXSector')}}</md-option>
              <md-option value="Military and Security">{{$t('militaryAndSecurity')}}</md-option>
              <md-option
                value="Transportation and Municipal sector"
              >{{$t('transportationAndMunicipalSector')}}</md-option> -->
            </md-select>
          </md-field>
        </b-col>

        <b-col cols="4">
          <md-field>
            <label for="year">{{ $t("year") }}</label>
            <md-select name="year" id="year" v-model="options.Year" md-dense>
              <md-option :value="null">{{ $t("year") }}</md-option>
              <md-option value="All">الكل</md-option>
              <md-option value="2019">2019</md-option>
              <md-option value="2020">2020</md-option>
              <md-option value="2021">2021</md-option>
              <md-option value="2022">2022</md-option>
              <md-option value="2023">2023</md-option>
            </md-select>
          </md-field>
        </b-col>

        <b-col cols="2">
          <button
            class="btn md-primary main-btn comman-gradient border-radius"
            style="width:100%;"
            @click="getList"
            :disabled="disabledSearch"
          >
            بحث
          </button>
        </b-col>
      </b-row>
    </div>

    <div class="main-card py-4 mt-4" v-if="this.items.length > 0">
      <template>
        <h4 class="px-4 mb-4">حالة التسليم</h4>
        <b-table
          class="cse-montly top-radius"
          striped
          hover
          :items="items"
          :fields="fields"
        >
          <!-- <template
            v-slot:cell(category)="data"
          >{{data.item.category == "Entity1"? 'الفئة 1' : data.item.category == "Entity2"? 'الفئة 2' : data.item.category == "Entity3"? 'الفئة 3' : data.item.category == "Entity4"? 'الفئة 4' : 'N/A' }}</template>
          <template
            v-slot:cell(sector)="data"
          >{{data.item.sector == "Economical - Financial sector" ? $t('economicalFinancialSector') : data.item.sector == "Education sector" ? $t('educationSector') : data.item.sector == "Health sector" ? $t('healthSector') : data.item.sector == "MOX sector" ? $t('MOXSector') : data.item.sector == "Military and Security" ? $t('militaryAndSecurity') : data.item.sector == "Transportation and Municipal sector" ? $t('transportationAndMunicipalSector') : 'N/A'}}</template> -->
          <template v-slot:cell(year)="data">
            <div style="position:relative">
              <div
                style="position: absolute;top: 24%;transform: translate(0, -50%);left: 3%;right: 3%;"
              >
                <img style="width:100%" src="/images/icons/line.png" alt />
              </div>
              <b-row align-v="center">
                <b-col
                  cols="1"
                  class="text-center"
                  v-for="item in data.item.MonthlyReport"
                  v-bind:key="item.month"
                >
                  <img
                    v-if="item.isSubmitted == true"
                    src="/images/icons/tickstar.png"
                    alt
                  />
                  <img
                    v-else-if="item.isSubmitted == false"
                    src="/images/icons/crossstar.png"
                    alt
                  />
                  <img v-else src="/images/icons/default_report.png" alt />
                  <h5 style="margin: 0;">{{ item.month }}</h5>
                </b-col>
              </b-row>
            </div>
          </template>
        </b-table>

        <!-- <h5 v-if="items.length == 0" class="text-center">{{$t('thereAreCurrentlyNoRecords')}}</h5> -->
        <!-- <div class="pagination-div mt-4 mx-5">
          <b-pagination
            class="d-inline-flex"
            v-model="currentPage"
            :total-rows="totalCount"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
        </div>-->
      </template>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import rolesMixin from "../mixins/RolesMixins.js";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
export default {
  name: "entity",
  mixins: [validationMixin, rolesMixin],
  data() {
    return {
      monthlyReport: [
        { month: this.$t("january"), isSubmitted: null },
        { month: this.$t("february"), isSubmitted: null },
        { month: this.$t("march"), isSubmitted: null },
        { month: this.$t("april"), isSubmitted: null },
        { month: this.$t("may"), isSubmitted: null },
        { month: this.$t("june"), isSubmitted: null },
        { month: this.$t("july"), isSubmitted: null },
        { month: this.$t("august"), isSubmitted: null },
        { month: this.$t("september"), isSubmitted: null },
        { month: this.$t("october"), isSubmitted: null },
        { month: this.$t("november"), isSubmitted: null },
        { month: this.$t("december"), isSubmitted: null },
      ],
      entitySectors: [],
      isCreateDialog: false,
      totalCount: 0,
      options: {
        EntityName: null,
        Category: null,
        Sector: null,
        Year: null,
      },
      perPage: 10,
      search: "",
      disabledSearch: false,
      form: {
        tenancyName: null,
        tenantType: null,
        sector: null,
        isActive: true,
        description: null,
      },
      userSaved: false,
      sending: false,
      lastUser: null,
      currentPage: 1,
      selectSearch: null,
      currentPage: 1,

      entitySearch: ["Entity Type 1", "Entity Type 2"],
      items: [],
      fields: [
        // "id",
        // { key: "entity_id", label: "Entity ID" },
        { key: "entityName", label: this.$t("entityName") },
        { key: "category", label: "الفئة" },
        { key: "sector", label: this.$t("sector") },
        { key: "year", label: this.$t("year") },
      ],
    };
  },
  validations: {
    form: {
      tenancyName: {
        required,
        minLength: minLength(3),
      },
      tenantType: {
        required,
      },
      sector: {
        required,
      },
      description: {
        required,
        minLength: minLength(3),
      },
    },
  },
  watch: {
    currentPage(newPage) {
      this.options.SkipCount = this.perPage * (newPage - 1);
      this.getEntitiesList();
    },
  },
  methods: {
    onChangeActive($event, item) {
      this.$showLoader();
      this.disabledSearch = true;
      this.$entityService.changeStatus(item.id).then((res) => {
        if (res.success) {
          this.$swal({
            icon: "success",
            type: "success",
            title: this.$t("entityStatusUpdatedSuccessfully"),
          }).then(() => {});
        } else {
          $event.preventDefault();
        }
        this.$hideLoader();
        this.disabledSearch = false;
      });
    },
    searchEntity() {
      this.options.Keyword = this.search;
      this.getEntitiesList();
    },

    onView(item) {
      this.$router.push("/main/entity/user/" + item.id);
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
      this.form.sector = null;
    },
    saveEntity() {
      this.sending = true;
      this.form.name = this.form.tenancyName;
      this.$entityService
        .createTenant(this.form)
        .then((res) => {
          if (res.success) {
            this.$swal({
              icon: "success",
              type: "success",
              title: "تم إنشاء الجهة الجديدة بنجاح",
              button: $t("ok"),
            }).then(() => {
              this.isCreateDialog = false;
              this.form.id = res.data.id;
              this.items.unshift(this.form);
            });
          } else {
            this.$swal({
              icon: "error",
              type: "error",
              title: res.message.message,
            });
          }
          this.sending = false;
        })
        .catch((error) => {
          this.sending = false;
        });
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveEntity();
      }
    },

    getList() {
      // this.disabledSearch = true;
      if (this.options.Year) {
        this.$showLoader();
        if (this.options.Sector == "all") {
          this.options.Sector = null;
        }
        if (this.options.Category == "all") {
          this.options.Category = null;
        }
        const list = this.$monthlyReportsService
          .GetEntityReportSubmissionStatus(this.options)
          .then((res) => {
            if (res.success) {
              this.items = res.data;

              this.items.map((aa) => {
                let x = [
                  { month: this.$t("january"), isSubmitted: null },
                  { month: this.$t("february"), isSubmitted: null },
                  { month: this.$t("march"), isSubmitted: null },
                  { month: this.$t("april"), isSubmitted: null },
                  { month: this.$t("may"), isSubmitted: null },
                  { month: this.$t("june"), isSubmitted: null },
                  { month: this.$t("july"), isSubmitted: null },
                  { month: this.$t("august"), isSubmitted: null },
                  { month: this.$t("september"), isSubmitted: null },
                  { month: this.$t("october"), isSubmitted: null },
                  { month: this.$t("november"), isSubmitted: null },
                  { month: this.$t("december"), isSubmitted: null },
                ];
                x.forEach((item) => {
                  if (
                    aa.reports.find(
                      (rep) =>
                        item.month.includes(this.getArabicMonth(rep.name)) &&
                        rep.isSubmitted == true
                    )
                  ) {
                    item.isSubmitted = true;
                  } else if (
                    aa.reports.find(
                      (rep) =>
                        item.month.includes(this.getArabicMonth(rep.name)) &&
                        rep.isSubmitted == false
                    )
                  ) {
                    item.isSubmitted = false;
                  } else {
                    item.isSubmitted = null;
                  }
                  return item;
                });

                aa.MonthlyReport = x;
                return aa;
              });
            }
            this.disabledSearch = false;
            this.$hideLoader();
          });
      } else {
        this.$swal({
          icon: "error",
          type: "error",
          title: "إختر السنة",
        });
      }
    },
    getEntitySectors() {
      this.$showLoader();
      this.$entitySector.getAllEntitySectors().then((res) => {
        if (res.success) {
          // res.data.items.forEach((payload) => {
          //   this.entitySectors.push(payload);
          // });
          this.entitySectors = res.data.items;
        }
        this.$hideLoader();
      });
    },
  },
  mounted() {
    // this.getList();
    this.getEntitySectors();
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
