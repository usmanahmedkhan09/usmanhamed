<template>
  <div class="hello">
    <b-row class="d-flex justify-content-between">
      <b-col>
        <img
          class="cursor"
          @click="$router.go(-1)"
          src="/images/icons/back.png"
        />
        <h4 class="d-inline font-weight-medium pr-3" style="font-weight: 600;">
          إدارة طلبات التغيير
        </h4>
      </b-col>
      <div></div>
    </b-row>
    <!-- <b-row align-h="between" align-v="center">
      <b-col cols="7">
        <h4 style="font-weight: 600;">إدارة طلبات التغيير</h4>
      </b-col>
    </b-row> -->

    <div class="main-card p-4 mt-4">
      <h4 style="font-weight: 600;">تغيير الطلب الحالي</h4>
      <b-row>
        <b-col cols="3">
          <md-field>
            <label for="type">اسم الجهة</label>
            <md-input
              name="savingAmount"
              id="savingAmount"
              autocomplete="given-name"
              v-model="data.tenant.name"
              readonly
            />
          </md-field>
        </b-col>
        <b-col cols="3">
          <md-field>
            <label for="type">نوع الطلب</label>
            <md-input
              name="savingAmount"
              id="savingAmount"
              autocomplete="given-name"
              v-model="data.changeType"
              readonly
            />
          </md-field>
        </b-col>
        <b-col cols="3" offset="3">
          <md-field>
            <label for="type">اسم الفرصة</label>
            <md-input
              name="savingAmount"
              id="savingAmount"
              autocomplete="given-name"
              v-model="data.initiative.name"
              readonly
            />
          </md-field>
        </b-col>
      </b-row>
      <b-row align-v="center" class="mt-4">
        <!-- <b-col cols="3"></b-col> -->

        <b-col
          cols="3"
          v-if="data.changeType == $t('changeInitiativeDuration')"
        >
          <md-field>
            <label for="startDate">{{ $t("startDate") }}</label>

            <md-input
              name="startDate"
              id="startDate"
              autocomplete="given-name"
              v-model="data.startDate"
              :disabled="sending"
              readonly
            />
          </md-field>
        </b-col>

        <b-col
          cols="3"
          v-if="data.changeType == $t('changeInitiativeDuration')"
        >
          <md-field>
            <label for="endDate">{{ $t("endDate") }}</label>

            <md-input
              name="endDate"
              id="endDate"
              autocomplete="given-name"
              v-model="data.endDate"
              :disabled="sending"
              readonly
            />
          </md-field>
        </b-col>
        <b-col
          cols="3"
          v-if="data.changeType == $t('changeInitiativeDuration')"
        >
          <md-field>
            <label for="startDate">تاريخ البدئ الحالي</label>

            <md-input
              name="startDate"
              id="startDate"
              autocomplete="given-name"
              v-model="ChangeRequest.startDate"
              :disabled="sending"
              readonly
            />
          </md-field>
        </b-col>

        <b-col
          cols="3"
          v-if="data.changeType == $t('changeInitiativeDuration')"
        >
          <md-field>
            <label for="endDate">تاريخ الانتهاء الحالي</label>

            <md-input
              name="endDate"
              id="endDate"
              autocomplete="given-name"
              v-model="ChangeRequest.endDate"
              :disabled="sending"
              readonly
            />
          </md-field>
        </b-col>
        <b-col cols="9" v-if="data.changeType == $t('changeAmountOfSavings')">
          <md-field>
            <label for="type">تغيير اجمالي الوفورات</label>
            <md-input
              name="savingAmount"
              id="savingAmount"
              autocomplete="given-name"
              v-model="data.amountOfSave"
              readonly
            />
          </md-field>
          <md-field>
            <label for="type">الوفر المتوقع الحالي</label>
            <md-input
              name="savingAmount"
              id="savingAmount"
              autocomplete="given-name"
              v-model="ChangeRequest.changeAmountSaving"
              readonly
            />
          </md-field>
        </b-col>
        <b-col cols="9">
          <md-field class="border-dark-blue">
            <label for="subTitle">وصف السبب</label>
            <md-textarea
              autocomplete="given-name"
              v-model="data.description"
              readonly
            ></md-textarea>
          </md-field>
        </b-col>
        <b-col cols="9">
          <md-field class="border-dark-blue">
            <label for="subTitle">مرئيات المركز</label>
            <md-textarea
              autocomplete="given-name"
              v-model="activeData.cseComments"
            ></md-textarea>
          </md-field>
        </b-col>
        <b-col cols="6">
          <button
            class="btn md-primary main-btn border-radius"
            style="background: #6DB545 !important; color:white"
            @click="updateStatus(true)"
            :disabled="!validForm || data.cseApprove"
          >
            موافقة
          </button>
          <button
            class="btn md-primary main-btn border-radius"
            style="background: white !important; color:rgb(37, 130, 197) !important; border: 1px solid rgb(37, 130, 197); margin: 0 7px"
            @click="updateStatus(false)"
            :disabled="!validForm || data.cseApprove"
          >
            رفض
          </button>
        </b-col>
      </b-row>
    </div>
    <div class="my-5">
      <h4 style="font-weight: 600;">طلبات التغيير السابقة</h4>
      <b-row align-v="center" class="mt-4">
        <b-col cols="3">
          <div class="main-card p-4" style="min-height: 90px;max-height: 90px;">
            <b-row align-v="center">
              <b-col cols="8">
                <span style="font-size: 18px;"
                  >تم تلقي إجمالي طلبات التغيير</span
                >
              </b-col>
              <b-col cols="4" class="text-align-left-right">
                <span
                  style="color: #3D7E84;font-size: 32px;font-weight: 600;"
                  >{{ this.requestStats.totalChangeRequest || 0 }}</span
                >
              </b-col>
            </b-row>
          </div>
        </b-col>

        <b-col cols="3">
          <div class="main-card p-4" style="min-height: 90px;max-height: 90px;">
            <b-row align-v="center">
              <b-col cols="8">
                <span style="font-size: 18px;">طلبات التغيير المرفوضة</span>
              </b-col>
              <b-col cols="4" class="text-align-left-right">
                <span
                  style="color: #3D7E84;font-size: 32px;font-weight: 600;"
                  >{{ this.requestStats.rejectedChangeRequest || 0 }}</span
                >
              </b-col>
            </b-row>
          </div>
        </b-col>

        <b-col cols="3">
          <div class="main-card p-4" style="min-height: 90px;max-height: 90px;">
            <b-row align-v="center">
              <b-col cols="8">
                <span style="font-size: 18px;">طلبات التغيير الوافقة</span>
              </b-col>
              <b-col cols="4" class="text-align-left-right">
                <span
                  style="color: #3D7E84;font-size: 32px;font-weight: 600;"
                  >{{ this.requestStats.approvedChangeRequest || 0 }}</span
                >
              </b-col>
            </b-row>
          </div>
        </b-col>

        <b-col cols="3">
          <div class="main-card p-4" style="min-height: 90px;max-height: 90px;">
            <b-row align-v="center">
              <b-col cols="8">
                <span style="font-size: 18px;">طلبات التغيير المعلقة</span>
              </b-col>
              <b-col cols="4" class="text-align-left-right">
                <span
                  style="color: #3D7E84;font-size: 32px;font-weight: 600;"
                  >{{ this.requestStats.pendingChangeRequest }}</span
                >
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </div>
    <div class="main-card py-4 mt-4" style="width: 100%;overflow: auto;">
      <template>
        <h4 style="font-weight: 600;" class="px-4">
          قائمة طلبات التغيير السابقة
        </h4>
        <b-table
          class="mt-4"
          striped
          hover
          :items="itemsChangeRequest"
          :fields="fieldsChangeRequest"
        >
          <template v-slot:cell(actions)="data">
            <b class="text-info">
              <button class="btn md-primary main-btn border-radius-5 view">
                {{ $t("view") }}
              </button>
            </b>
          </template>
          <template v-slot:cell(changeType)="data">{{
            data.item.changeType == "changeAmountSaving"
              ? $t("changeAmountOfSavings")
              : data.item.changeType == "changeInitiativeDuration"
              ? $t("changeInitiativeDuration")
              : data.item.changeType == "delete"
              ? $t("deleteInitiative")
              : "N/A"
          }}</template>
          <template v-slot:cell(startDate)="data">{{
            onSplitDate(data.item.startDate)
          }}</template>
          <template v-slot:cell(endDate)="data">{{
            onSplitDate(data.item.endDate)
          }}</template>
          <template v-slot:cell(cseApprove)="data">
            <div
              v-bind:class="{
                approved: data.item.cseApprove == true,
                rejected: data.item.cseApprove == false,
                pending: data.item.cseApprove == null,
              }"
            >
              {{
                data.item.cseApprove == true
                  ? $t("approved")
                  : data.item.cseApprove == false
                  ? $t("rejected")
                  : $t("pending")
              }}
            </div>
          </template>
        </b-table>

        <h5
          v-if="itemsChangeRequest && itemsChangeRequest.length == 0"
          class="text-center"
        >
          {{ $t("thereAreCurrentlyNoRecords") }}
        </h5>

        <div class="pagination-div mt-4 mx-5">
          <b-pagination
            class="d-inline-flex"
            v-model="currentPage"
            :total-rows="
              this.requestStats.allChangeRequests &&
                this.requestStats.allChangeRequests.totalCount
            "
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import rolesMixin from "../mixins/RolesMixins.js";
import userMixin from "../mixins/UserMixin.js";
import format from "date-fns/format";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
export default {
  name: "changeRequestActive",
  mixins: [validationMixin, userMixin, rolesMixin],
  data() {
    let dateFormat = "YYYY-MM-DD";
    let now = new Date();
    return {
      activeData: {
        cseComments: null,
        cseApprove: false,
        id: null,
      },
      ChangeForm: {
        startDate: null,
        endDate: null,
        changeAmountSaving: null,
      },
      ChangeRequest: {
        startDate: null,
        endDate: null,
        changeAmountSaving: null,
      },
      data: {
        tenantId: 0,
        tenant: {
          name: null,
        },
        cseApprove: false,
        initiativeId: 0,
        initiative: {
          id: 0,
          name: null,
        },
        userId: 0,
        user: {
          name: null,
          surname: null,
          fullName: null,
        },
        changeType: null,
        description: null,
        id: 0,
      },
      options: {
        Keyword: "",
        isActive: true,
        SkipCount: 0,
      },
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
      fieldsChangeRequest: [
        // "id",
        // { label: "Entity Name", key: "tenant" },
        { label: this.$t("initiativeName"), key: "initiative.name" },
        { label: "نوع الطلب", key: "changeType" },
        { label: this.$t("description"), key: "description" },
        { label: this.$t("startDate"), key: "startDate" },
        { label: this.$t("endDate"), key: "endDate" },
        { label: this.$t("status"), key: "cseApprove" },
      ],
      itemsChangeRequest: [],
      requestStats: {},
    };
  },
  watch: {
    currentPage(newPage) {
      this.options.SkipCount = this.perPage * (newPage - 1);
      this.getUsersList();
    },
  },
  computed: {
    validForm() {
      return this.activeData.cseComments ? true : false;
    },
  },
  methods: {
    onSplitDate(item) {
      if (item) {
        return item.split("T")[0];
      }
      return "N/A";
    },
    updateStatus(status) {
      this.activeData.cseApprove = status;
      this.$showLoader();
      this.disabledSearch = true;
      this.$changeRequestService.updateStatus(this.activeData).then((res) => {
        if (res.success) {
          this.data.cseApprove = res.data.cseApprove;
          this.getStats();
          this.$swal({
            icon: "success",
            type: "success",
            confirmButtonText: this.$t("ok"),
            title: "تمّت الموافقة بنجاح",
          });
        } else {
          this.$swal({
            icon: "error",
            type: "error",
            confirmButtonText: this.$t("ok"),
            title: res.message.message,
          });
        }
        this.$hideLoader();
        this.disabledSearch = false;
      });
    },
    searchUser() {
      this.options.Keyword = this.search;
      this.getUsersList();
    },
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
    },
    validateUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
    getChangeRequest() {
      this.$showLoader();
      this.disabledSearch = true;
      this.$changeRequestService.get(this.$route.params.id).then((res) => {
        if (res.success) {
          // this.status = res.data.cseApprove
          this.data = res.data;
          if (this.data.startDate) {
            this.data.startDate = this.data.startDate.split("T")[0];
          }
          if (this.data.endDate) {
            this.data.endDate = this.data.endDate.split("T")[0];
          }

          this.data.changeType =
            this.data.changeType == "changeAmountSaving"
              ? this.$t("changeAmountOfSavings")
              : this.data.changeType == "changeInitiativeDuration"
              ? this.$t("changeInitiativeDuration")
              : this.data.changeType == "delete"
              ? this.$t("deleteInitiative")
              : "N/A";
          console.log(this.data);
          this.activeData.id = res.data.id;
          this.options.TenantId = res.data.tenantId;
          this.getValues(this.data.initiativeId);
          this.getStats();
        } else {
          this.$swal({
            icon: "error",
            type: "error",
            title: res.message.message,
          });
        }
        this.$hideLoader();
        this.disabledSearch = false;
      });
    },
    getValues(payload) {
      let data = {
        initiativeId: payload,
      };
      this.$changeRequestService.getChangeRequestValues(data).then((res) => {
        if (res.success) {
          // res.data.allChangeRequests
          this.ChangeRequest.changeAmountSaving = res.data.changeAmountSaving
            ? res.data.changeAmountSaving
            : null;
          this.ChangeRequest.startDate = res.data.startDate
            ? res.data.startDate.split("T")[0]
            : null;
          this.ChangeRequest.endDate = res.data.endDate
            ? res.data.endDate.split("T")[0]
            : null;
        }
      });
    },
    getStats() {
      this.$changeRequestService.getStats(this.options).then((res) => {
        if (res.success) {
          this.requestStats = res.data;
          this.itemsChangeRequest = this.requestStats.allChangeRequests.items;
          this.itemsChangeRequest.forEach((item) => {
            this.ChangeForm.changeAmountSaving = item.amountOfSave;
            this.ChangeForm.startDate = item.startDate;
            this.ChangeForm.endDate = item.endDate;
          });
          // if (
          //   this.requestStats.allChangeRequests &&
          //   this.requestStats.allChangeRequests.items.length > 0
          // ) {
          //   this.requestStats.allChangeRequests.items.map(item => {
          //     if (item.user == null) {
          //       delete item.user;
          //     }
          //     if (item.Tenant == null) {
          //       delete item.Tenant;
          //     }
          //     item.initiative = item.initiative.name;
          //     return item;
          //   });
          // }
        } else {
          this.$swal({
            icon: "error",
            type: "error",
            title: res.message.message,
          });
        }
        this.$hideLoader();
        this.disabledSearch = false;
      });
    },
  },
  mounted() {
    if (!this.$route.params.id) {
      this.$router.go("-1");
    }
    this.getChangeRequest();
    // this.getValues();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pending {
  color: #f2c010 !important;
}
.rejected {
  color: #e62e2d !important;
}
.approved {
  color: #5abc54 !important;
}
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
