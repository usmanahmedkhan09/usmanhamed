<template>
  <div class="hello">
    <b-row align-h="between" align-v="center">
      <b-col cols="7">
        <h4 style="font-weight: 600;">
          {{ $t("monthlyReport") }} ({{ this.$route.params.entity_name }})
        </h4>
      </b-col>
    </b-row>

    <div class="main-card py-4 mt-4">
      <template>
        <h4 style="font-weight: 600;" class="px-4">{{ topReportTitle }}</h4>
        <b-table
          class="mt-4 text-center"
          striped
          hover
          :items="firstItems"
          :fields="topFields"
        >
          <template v-slot:cell(actions)="data">
            <b class="text-info">
              <button
                class="btn"
                style="color: white;background:#2783C6;margin: 0 2px; text-decoration: none;"
                @click="detailReport(data.item)"
              >
                {{ $t("details") }}
              </button>
              <button
                class="btn"
                style="color: white;background:#7CBC59;margin: 0 2px; text-decoration: none;"
              >
                {{ $t("download") }}
              </button>
            </b>
          </template>
          <template v-slot:cell(status)="data" v-if="hasEntityRole">
            <div>
              {{
                data.item.isApprovedByCse == true
                  ? "مراجعة مكتملة"
                  : data.item.currentOwner != "" &&
                    (data.item.currentOwner == "CSE Approver" ||
                      data.item.currentOwner == "CSE Reviewer A" ||
                      data.item.currentOwner == "CSE Reviewer B" ||
                      data.item.currentOwner == "CSE Special Reviewer")
                  ? "قيد المراجعة مع المركز تحقيق كفاءة الإنفاق"
                  : data.item.currentOwner == "Entity Initiator"
                  ? "قيد المراجعة مع عضو فريق رفع كفاءة الإنفاق"
                  : data.item.currentOwner == "Entity Approver"
                  ? "قيد المراجعة مع رئيس فريق رفع كفاءة الإنفاق "
                  : "N/A"
              }}
            </div>
          </template>
          <template v-slot:cell(status)="data" v-else>
            <div>
              {{
                data.item.isApprovedByCse == true
                  ? "مراجعة مكتملة"
                  : data.item.currentOwner == "CSE Approver"
                  ? "قيد المراجعة مع صاحب الموافقة النهائية"
                  : data.item.currentOwner == "CSE Reviewer A"
                  ? "قيد المراجعة مع فريق المراجعة"
                  : data.item.currentOwner == "CSE Reviewer B"
                  ? "قيد المراجعة مع فريق الجودة"
                  : data.item.currentOwner == "CSE Special Reviewer"
                  ? "قيد المراجعة مع فريق قطاعات المركز"
                  : "N/A"
              }}
            </div>
          </template>
          <template v-slot:cell(overall_assessment)="data">
            <div
              v-if="data.item.overall_assessment == '1'"
              class="assessment"
              style="background: #A6A6A6; "
            ></div>
            <div
              v-if="data.item.overall_assessment == '2'"
              class="assessment"
              style="background: #C8D32D; "
            ></div>
          </template>

          <template v-slot:cell(name)="data">
            <div>{{ formatDate(data.item.name) }}</div>
          </template>
        </b-table>

        <h5 v-if="firstItems.length == 0" class="text-center">
          {{ $t("thereAreCurrentlyNoRecords") }}
        </h5>
        <!--<div class="pagination-div mt-4 mx-5">
          <b-pagination
            class="d-inline-flex"
            v-model="currentPage"
            :total-rows="totalCount"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
        </div>-->
      </template>
      <!-- <template v-else>No Record Found</template> -->
    </div>

    <!--<b-row class="mt-4" align-h="end" align-v="center">
      <b-col cols="2">
        <button
          class="btn md-primary main-btn"
          style="width:100%; border-radius: 20px"
          @click="newReport"
        >Submit New Report</button>
      </b-col>
    </b-row>-->

    <div class="main-card py-4 mt-4">
      <template>
        <h4 style="font-weight: 600;" class="px-4">{{ secondReportTitle }}</h4>
        <b-table
          class="mt-4 text-center"
          striped
          hover
          :items="secondItems"
          :fields="secondFields"
        >
          <template v-slot:cell(actions)="data">
            <b class="text-info">
              <button
                class="btn"
                style="color: white;background:#2783C6;margin: 0 2px; text-decoration: none;"
                @click="detailReport(data.item)"
              >
                {{ $t("details") }}
              </button>
              <button
                class="btn"
                style="color: white;background:#7CBC59;margin: 0 2px; text-decoration: none;"
              >
                {{ $t("download") }}
              </button>
            </b>
          </template>
          <template v-slot:cell(status)="data" v-if="hasEntityRole">
            <div>
              {{
                data.item.isApprovedByCse == true
                  ? "مراجعة مكتملة"
                  : data.item.currentOwner != "" &&
                    (data.item.currentOwner == "CSE Approver" ||
                      data.item.currentOwner == "CSE Reviewer A" ||
                      data.item.currentOwner == "CSE Reviewer B" ||
                      data.item.currentOwner == "CSE Special Reviewer")
                  ? "قيد المراجعة مع المركز تحقيق كفاءة الإنفاق"
                  : data.item.currentOwner == "Entity Initiator"
                  ? "قيد المراجعة مع عضو فريق رفع كفاءة الإنفاق"
                  : data.item.currentOwner == "Entity Approver"
                  ? "قيد المراجعة مع رئيس فريق رفع كفاءة الإنفاق "
                  : "N/A"
              }}
            </div>
          </template>
          <template v-slot:cell(status)="data" v-else>
            <div>
              {{
                data.item.isApprovedByCse == true
                  ? "مراجعة مكتملة"
                  : data.item.currentOwner == "CSE Approver"
                  ? "قيد المراجعة مع صاحب الموافقة النهائية"
                  : data.item.currentOwner == "CSE Reviewer A"
                  ? "قيد المراجعة مع فريق المراجعة"
                  : data.item.currentOwner == "CSE Reviewer B"
                  ? "قيد المراجعة مع فريق الجودة"
                  : data.item.currentOwner == "CSE Special Reviewer"
                  ? "قيد المراجعة مع فريق قطاعات المركز"
                  : "N/A"
              }}
            </div>
          </template>
          <template v-slot:cell(overall_assessment)="data">
            <div
              v-if="data.item.overall_assessment == '1'"
              class="assessment"
              style="background: #A6A6A6; "
            ></div>
            <div
              v-if="data.item.overall_assessment == '2'"
              class="assessment"
              style="background: #C8D32D; "
            ></div>
          </template>

          <template v-slot:cell(name)="data">
            <div>{{ formatDate(data.item.name) }}</div>
          </template>
        </b-table>

        <h5 v-if="secondItems.length == 0" class="text-center">
          {{ $t("thereAreCurrentlyNoRecords") }}
        </h5>
        <!--<div class="pagination-div mt-4 mx-5">
          <b-pagination
            class="d-inline-flex"
            v-model="currentPage"
            :total-rows="totalCount"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
        </div>-->
      </template>
      <!-- <template v-else>No Record Found</template> -->
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import rolesMixin from "../../mixins/RolesMixins.js";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
export default {
  name: "entitycsemonthlyReportList",
  mixins: [validationMixin, rolesMixin],
  data() {
    return {
      options: {
        Keyword: "",
        isActive: true,
        SkipCount: 0,
      },
      topReportTitle: this.$t("summaryOfSubmittedMonthlyReports"),
      secondReportTitle: this.$t("listOfMonthlyReportForEntity"),
      allReportsitems: [],
      perPage: 10,
      disabledSearch: false,
      totalCount: 0,
      isCreateDialog: false,
      search: null,
      userSaved: false,
      sending: false,
      lastUser: null,
      currentPage: 1,
      // Note `isActive` is left out and will not appear in the rendered table
      topFields: [
        { key: "id", label: "#" },
        { key: "name", label: this.$t("monthlyReport") },
        { key: "status", label: this.$t("status") },
        { key: "overall_assessment", label: this.$t("overallAssessment") },
        { key: "actions", label: this.$t("action") },
      ],
      secondFields: [
        { key: "id", label: "#" },
        { key: "name", label: this.$t("monthlyReport") },
        { key: "status", label: this.$t("status") },
        { key: "overall_assessment", label: this.$t("overallAssessment") },
        { key: "actions", label: this.$t("action") },
      ],
      firstItems: [],
      secondItems: [],
    };
  },
  watch: {
    currentPage(newPage) {
      this.options.SkipCount = this.perPage * (newPage - 1);
      this.getReportsList();
    },
  },
  computed: {},
  methods: {
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
      } else if (item.split("-")[0] == "Deccember") {
        return this.$t("december") + " - " + item.split("-")[1];
      }
    },
    getCSEGRID(top = true) {
      if (top) {
        return [
          { key: "reportId", label: "#" },
          { key: "administrator", label: "Administrator" },
          { key: "numberOfInitiatives", label: "Number of Initiatives" },
          { key: "savings", label: "Savings" },
          "overall_assessment",
          { key: "actions", label: "Actions" },
        ];
      } else {
        return [
          { key: "reportId", label: "#" },
          { key: "currentOwner", label: "Entity Name" },
          "status",
          { key: "administrator", label: "Administrator" },
          { key: "actions", label: "Actions" },
        ];
      }
    },
    detailReport(report) {
      if (report && this.hasCSERole) {
        this.$router.push("/main/monthly-report/initiatives/" + report.id);
      }
    },
    newReport() {
      this.$router.push("/main/monthly-report/initiatives");
    },
    searchUser() {
      this.options.Keyword = this.search;
      this.getReportsList();
    },
    onPagination(event) {},
    getReportsList() {
      this.$showLoader();
      this.disabledSearch = true;
      let apiCall = "getSubmittedAll";
      var filterType = "isSubmitted";
      if (this.hasCSERole && !this.$route.params.entityid) {
        apiCall = "getSummeryForCSE";
        this.topReportTitle = this.$t("summaryOfSubmittedMonthlyReports");
        this.secondReportTitle = this.$t("listOfMonthlyReportForEntity");
        this.topFields = [];
        this.topFields = this.getCSEGRID(true);
        this.secondFields = this.getCSEGRID(false);
        filterType = "isApprovedByCse";
      } else if (this.$route.params.entityid) {
        this.options.TenantId = this.$route.params.entityid;
      }
      this.$monthlyReportsService[apiCall](this.options).then((res) => {
        if (res.success) {
          this.items = res.data.items;

          this.secondItems = this.items.filter((item) => {
            return item.name != this.getFormatedReportName(new Date());
            // return item[filterType] == false;
          });
          this.firstItems = this.items.filter((item) => {
            return item.name == this.getFormatedReportName(new Date());
          });

          // this.secondItems = this.items.filter(item => {
          //   return item[filterType] == false;
          // });
          // this.firstItems = this.items.filter(item => {
          //   return item[filterType] == true;
          // });

          this.totalCount = res.data.totalCount;
        }
        this.$hideLoader();
        this.disabledSearch = false;
      });
    },
  },
  mounted() {
    this.getReportsList();
  },
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
