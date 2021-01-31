<template>
  <b-container fluid id="CSEDashboard">
    <b-row class="mt-3">
      <b-col>
        <div class="h5">الصفحة الرئيسية</div>
        <div class="h4 font-weight-bold">التقارير الشهرية</div>
        <hr />
      </b-col>
    </b-row>
    <b-row class="mt-5">
      <b-col md="12">
        <b-card class="custom-card">
          <div class="d-flex justify-content-between p-4">
            <div class="d-inline-block">
              <h3 class="font-weight-bold color d-inline-block">
                {{ $t("activeentitiessubmission") }}
              </h3>
            </div>
            <div>
              <md-field>
                <label for="movie">القطاع</label>
                <md-select
                  v-model="UserSectorsname"
                  @md-selected="UserSectorsname = UserSectorsname"
                >
                  <md-option
                    v-for="(item, index) in UserSectors"
                    :key="`sector${index}`"
                    :value="item.sectorName"
                  >
                    {{ item.sectorName }}
                  </md-option>
                </md-select>
              </md-field>
            </div>
          </div>
          <div class="pl-4 pr-4">
            <b-table
              class="CSE-table"
              id="submited-table"
              :per-page="perPage"
              :current-page="currentPage"
              bordered
              :items="filterrows"
              :fields="entitySubmission"
            >
              <template v-slot:cell(number)="row">
                <div>{{ row.index + 1 }}</div>
              </template>
              <template v-slot:cell(name)="row">
                <div>{{ row.item.name }}</div>
              </template>
              <template v-slot:cell(sectorName)="row">
                <div>
                  {{
                    row.item.entitySector
                      ? row.item.entitySector.sectorName
                      : null
                  }}
                </div>
              </template>
              <template v-slot:cell(typeName)="row">
                <div>
                  {{
                    row.item.entityType ? row.item.entityType.typeName : null
                  }}
                </div>
              </template>
              <template v-slot:cell(dateOfSubmission)="row">
                <div>
                  {{ formateDate(row.item.dateOfSubmission) }}
                </div>
              </template>
              <template v-slot:cell(action)="row">
                <button
                  class="btn download-button border-radius-5 d-inline-block ml-1 border-radius"
                >
                  {{ $t("download") }}
                </button>
                <button
                  @click="openInitiative(row.item)"
                  class="btn main-btn border-radius-5 comman-gradient border-radius"
                >
                  {{ $t("review") }}
                </button>
              </template>
            </b-table>
          </div>
          <h5 v-if="items.length == 0" class="text-center">
            {{ $t("thereAreCurrentlyNoRecords") }}
          </h5>
          <div class="pagination-div mt-4 mx-5">
            <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="submited-table"
            ></b-pagination>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-5 mb-5">
      <b-col md="12">
        <b-card class="custom-card">
          <div class="d-flex justify-content-between p-4">
            <div class="d-inline-block">
              <h3 class="font-weight-bold color d-inline-block">
                {{ $t("inactiveentitiessubmission") }}
              </h3>
            </div>
            <div>
              <md-field>
                <label for="movie">القطاع</label>
                <md-select
                  v-model="UserSector"
                  @md-selected="UserSector = UserSector"
                >
                  <md-option
                    v-for="(item, index) in UserSectors"
                    :key="`sector${index}`"
                    :value="item.sectorName"
                  >
                    {{ item.sectorName }}
                  </md-option>
                </md-select>
              </md-field>
            </div>
          </div>
          <div class="pl-4 pr-4">
            <b-table
              class="CSE-table"
              id="my-table"
              :per-page="perpage"
              :current-page="currentpage"
              bordered
              :items="filterNonSubmited"
              :fields="NonSubmitedfeilds"
            >
              <template v-slot:cell(number)="row">
                <div>{{ row.index + 1 }}</div>
              </template>
              <template v-slot:cell(name)="row">
                <div>{{ row.item.name }}</div>
              </template>
              <template v-slot:cell(sectorName)="row">
                <div>
                  {{
                    row.item.entitySector
                      ? row.item.entitySector.sectorName
                      : null
                  }}
                </div>
              </template>
              <template v-slot:cell(typeName)="row">
                <div>
                  {{
                    row.item.entityType ? row.item.entityType.typeName : null
                  }}
                </div>
              </template>
              <template v-slot:cell(dateOfSubmission)="row">
                <div>
                  {{ formateDate(row.item.dateOfSubmission) }}
                </div>
              </template>
              <template v-slot:cell(action)="row">
                <button
                  class="btn download-button border-radius-5 d-inline-block ml-1 border-radius"
                >
                  {{ $t("download") }}
                </button>
                <button
                  @click="openInitiative(row.item)"
                  class="btn main-btn border-radius-5 comman-gradient border-radius"
                >
                  {{ $t("review") }}
                </button>
              </template>
            </b-table>
          </div>
          <h5 v-if="items.length == 0" class="text-center">
            {{ $t("thereAreCurrentlyNoRecords") }}
          </h5>
          <div class="pagination-div mt-4 mx-5">
            <b-pagination
              v-model="currentpage"
              :total-rows="nonSubmit"
              :per-page="perpage"
              aria-controls="my-table"
            ></b-pagination>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      perPage: 5,
      perpage: 5,
      currentPage: 1,
      currentpage: 1,
      sectorId: null,
      UserSector: null,
      UserSectorsname: null,
      UserSectors: [],
      items: [],
      Nonsubmited: [],
      NonSubmitedfeilds: [
        { key: "number", label: "#" },
        { key: "name", label: this.$t("entityName") },
        { key: "sectorName", label: this.$t("sector") },
        { key: "typeName", label: this.$t("entityCategory") },
        {
          key: "dateOfSubmission",
          label: this.$t("dateOfSubmission"),
        },
        {
          key: "numberOfInitiatives",
          label: this.$t("numberOfInitiatives"),
        },
        { key: "action", label: this.$t("action") },
      ],
      options: {
        MaxResultCount: 5,
      },
      entitySubmission: [
        { key: "number", label: "#" },
        { key: "name", label: this.$t("entityName") },
        { key: "sectorName", label: this.$t("sector") },
        { key: "typeName", label: this.$t("entityCategory") },
        {
          key: "dateOfSubmission",
          label: this.$t("dateOfSubmission"),
        },
        {
          key: "numberOfInitiatives",
          label: this.$t("numberOfInitiatives"),
        },
        { key: "status", label: this.$t("reviewStatus") },
        { key: "action", label: this.$t("action") },
      ],
    };
  },
  computed: {
    filterrows() {
      return this.items.filter((item) => {
        let sector = item.entitySector ? item.entitySector.sectorName : null;
        if (this.UserSectorsname != null) {
          const searchItem = this.UserSectorsname;
          return sector.includes(searchItem);
        }
        return item;
      });
    },
    filterNonSubmited() {
      if (this.Nonsubmited.length > 0) {
        return this.Nonsubmited.filter((item) => {
          let sector = item.entitySector ? item.entitySector.sectorName : null;
          if (this.UserSector != null) {
            const searchItem = this.UserSector;
            return sector.includes(searchItem);
          }
          return item;
        });
      }
    },
    rows() {
      return this.items.length;
    },
    nonSubmit() {
      return this.Nonsubmited.length;
    },
  },
  methods: {
    getArabicMonth(item) {
      if (item == "January") {
        return this.$t("january");
      } else if (item == "February") {
        return this.$t("february");
      } else if (item == "March") {
        return this.$t("march");
      } else if (item == "April") {
        return this.$t("april");
      } else if (item == "May") {
        return this.$t("may");
      } else if (item == "June") {
        return this.$t("june");
      } else if (item == "July") {
        return this.$t("july");
      } else if (item == "August") {
        return this.$t("august");
      } else if (item == "September") {
        return this.$t("september");
      } else if (item == "October") {
        return this.$t("october");
      } else if (item == "November") {
        return this.$t("november");
      } else if (item == "December") {
        return this.$t("december");
      }
    },
    formateDate(payload) {
      let day = payload.split("-")[0];
      let month = this.$t(`${payload.split("-")[1]}`);
      let year = payload.split("-")[2];
      let fullDate = `${year}` + "-" + `${month}` + "-" + `${day}`;
      return fullDate;
      // return payload;
    },
    getUserSectors() {
      this.UserSectors = [];
      this.$monthlyReportsService.getSectors().then((res) => {
        if (res.success) {
          // this.sectorId = res.data ? res.data.entitysectorID : null;
          // console.log(res.data);
          res.data.forEach((item) => {
            this.UserSectors.push(item.entitysector);
          });
        }
        this.$hideLoader();
      });
    },
    openInitiative(payload) {
      this.$router.push({ path: `/main/monthly-reports/${payload.id}` });
    },
    submitedReports() {
      let data = {
        sectorId: this.sectorId,
      };
      console.log(data);
      this.$showLoader();
      this.$monthlyReportsService.getAllEntityDetails(data).then((res) => {
        if (res.success) {
          this.items = res.data;
          console.log(this.items);
        }
        this.$hideLoader();
      });
    },
    NonSubmitedReports() {
      let data = {
        sectorId: this.sectorId,
      };
      this.$showLoader();
      this.$monthlyReportsService.getNonSubmitedReports(data).then((res) => {
        if (res.success) {
          this.Nonsubmited = res.data;
        }
        this.$hideLoader();
      });
    },
  },
  filters: {},
  mounted() {
    this.getUserSectors();
    this.submitedReports();
    this.NonSubmitedReports();
  },
};
</script>
<style scoped>
.color {
  color: #36bbc0;
}
.download-button {
  color: black;
  background: #ffffff;
  width: 78px;
  box-shadow: 0px 1px 1px 1px #f1f0f0;
}
</style>
