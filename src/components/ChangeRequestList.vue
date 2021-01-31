<template>
  <div class="hello " id="changeRequestSection">
    <b-row align-h="between" align-v="center">
      <b-col cols="12" v-if="hasEntityRole && initiativesList.length == 0">
        <b-alert
          variant="danger"
          show
          dismissible
          style="height: 63px; font-size: 18px"
        >
          <span style="display: block; margin-top: 5px">{{
            $t("notSubmittedReportDangerAlert")
          }}</span>
        </b-alert>
      </b-col>
      <b-col cols="5">
        <h4 style="font-weight: 600">
          {{ $t("changeRequestManagementHeading") }}
        </h4>
      </b-col>
      <b-col
        cols="4"
        class="text-align-left-right"
        v-if="hasEntityRole && initiativesList.length > 0"
      >
        <button
          class="btn md-primary main-btn comman-gradient border-radius"
          @click="$bvModal.show('changesRequestModal'), (isCreateDialog = true)"
        >
          {{ $t("createChangeRequest") }}
        </button>
      </b-col>
    </b-row>

    <div class="main-card p-4 mt-4">
      <h4 style="font-weight: 600">{{ $t("searchRequest") }}</h4>
      <b-row align-v="center" class="mt-4">
        <b-col cols="5">
          <b-form-input
            class="border-radius-5"
            :placeholder="$t('searchRequest')"
            v-model="search"
            v-on:keyup.enter="searchUser()"
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
            class="btn md-primary main-btn border-radius-5 comman-gradient border-radius"
            style="width: 100%"
            @click="searchUser()"
            :disabled="!search || !filterSelected"
          >
            {{ $t("searchRequest") }}
          </button>
        </b-col>
        <b-col cols="2">
          <button
            class="btn md-primary border-radius"
            style="
              width: 100%;
              background: grey !important;
              color: white !important;
              padding: 8px 18px !important;
            "
            :disabled="disabledSearch"
            @click="clearSearch"
          >
            إزالة بيانات الحقول
          </button>
        </b-col>
      </b-row>
    </div>

    <div class="main-card py-4 mt-4">
      <template>
        <h4 style="font-weight: 600" class="px-4">
          {{ $t("listOfChangeRequest") }}
        </h4>
        <b-table
          class="mt-4"
          striped
          hover
          :items="itemsEntity"
          :fields="fieldsEntity"
        >
          <template v-slot:cell(actions)="data">
            <b class="text-info">
              <button
                class="btn main-btn border-radius-5 comman-gradient border-radius"
                @click="onView(data.item.id)"
              >
                {{ $t("view") }}
              </button>
              <!-- <img
                class="icon-badge"
                v-if="!data.item.notification"
                src="/images/icons/notification.png"
                alt
              />
              <img
                class="icon-badge"
                v-if="data.item.notification"
                src="/images/icons/notification-badge.png"
                alt
              />
              <b-form-checkbox
                class="d-inline-block"
                v-model="data.item.isActive"
                name="check-button"
                switch
              ></b-form-checkbox>-->
            </b>
          </template>
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

          <template v-slot:cell(number)="data">{{
            data.item.number ? data.item.number : "N/A"
          }}</template>
          <template v-slot:cell(phoneNumber)="data">{{
            data.item.phoneNumber ? data.item.phoneNumber : "N/A"
          }}</template>
          <template v-slot:cell(user_type)="data">{{
            data.item.user_type ? data.item.user_type : "N/A"
          }}</template>
          <template v-slot:cell(changeType)="data">{{
            data.item.changeType == "changeAmountSaving"
              ? $t("changeAmountOfSavings")
              : data.item.changeType == "changeInitiativeDuration"
              ? $t("changeInitiativeDuration")
              : data.item.changeType == "delete"
              ? $t("deleteInitiative")
              : ""
          }}</template>
        </b-table>

        <h5 v-if="itemsEntity.length == 0" class="text-center">
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

    <b-modal
      id="changesRequestModal"
      size="xl"
      :hide-footer="true"
      :hide-header="true"
      :scrollable="true"
      @hidden="closeDialog()"
    >
      <div>
        <h4 style="font-weight: 600">{{ $t("createChangeRequest") }}</h4>
        <form novalidate>
          <b-row>
            <b-col md="6" offset="6">
              <md-field>
                <label for="type">{{ $t("selectInitiative") }}</label>
                <md-select
                  name="type"
                  id="type"
                  v-model="changeform.initiativeId"
                  @md-selected="getValues(changeform.initiativeId)"
                  md-dense
                >
                  <md-option :value="null">{{
                    $t("selectAnOption")
                  }}</md-option>
                  <md-option
                    v-for="(item, index) in initiativesList"
                    :key="index"
                    :value="item.id"
                    >{{ item.name }}</md-option
                  >
                </md-select>
              </md-field>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6" offset="6">
              <md-field>
                <label for="type">{{ $t("selectType") }}</label>
                <md-select
                  name="type"
                  id="type"
                  v-model="changeform.changeType"
                  md-dense
                >
                  <md-option :value="null">{{
                    $t("selectAnOption")
                  }}</md-option>
                  <md-option value="changeAmountSaving">{{
                    $t("changeAmountOfSavings")
                  }}</md-option>
                  <md-option value="changeInitiativeDuration">{{
                    $t("changeInitiativeDuration")
                  }}</md-option>
                  <md-option value="delete">{{
                    $t("deleteInitiative")
                  }}</md-option>
                </md-select>
              </md-field>
            </b-col>
          </b-row>

          <b-row v-if="changeform.changeType == 'changeAmountSaving'">
            <b-col md="6" offset="6">
              <md-field class="">
                <label for="type">الوفر المتوقع الحالي (ريال سعودي)</label>
                <md-input
                  :disabled="true"
                  name="savingAmount"
                  id="savingAmount"
                  autocomplete="given-name"
                  v-model="ChangeRequest.changeAmountSaving"
                />
              </md-field>
              <md-field>
                <label for="type"
                  >{{ $t("enterAmountOfSaving") }} (ريال سعودي)</label
                >
                <md-input
                  name="savingAmount"
                  id="savingAmount"
                  autocomplete="given-name"
                  v-model="changeform.amountOfSave"
                />
              </md-field>
            </b-col>
          </b-row>
          <b-row v-if="changeform.changeType == 'changeInitiativeDuration'">
            <md-field class="mr-3 w-50">
              <label for="type">تاريخ البدئ الحالي</label>
              <md-input
                :disabled="true"
                name="savingAmount"
                id="savingAmount"
                autocomplete="given-name"
                v-model="ChangeRequest.startDate"
              />
            </md-field>
            <b-col md="6" offset="6">
              <md-datepicker
                v-model="changeform.startDate"
                md-immediately
                :disabled="sending"
                name="startDate"
                id="startDate"
              >
                <label>{{ $t("startDate") }}</label>
              </md-datepicker>
            </b-col>
          </b-row>
          <b-row v-if="changeform.changeType == 'changeInitiativeDuration'">
            <md-field class="mr-3 w-50">
              <label for="type">تاريخ الانتهاء الحالي</label>
              <md-input
                :disabled="true"
                name="savingAmount"
                id="savingAmount"
                autocomplete="given-name"
                v-model="ChangeRequest.endDate"
              />
            </md-field>
            <b-col md="6" offset="6">
              <md-datepicker
                v-model="changeform.endDate"
                md-immediately
                :disabled="sending"
                name="endDate"
                id="endDate"
              >
                <label>{{ $t("endDate") }}</label>
              </md-datepicker>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6" offset="6">
              <input
                class="d-none"
                type="file"
                @change="handleUploadFile($event)"
                id="imageUpload"
                ref="file"
                name="file"
                multiple
              />
              <md-button
                class="text-secondary pb-10 custom-attachment-button font-weight-bold text-capitalize"
                @click="updaloadFile()"
              >
                <img
                  class="float-left pr-2"
                  src="/images/svg/attachment.svg"
                  alt
                />
                Add Attachment
              </md-button>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12" class="my-2">
              <b-row v-if="fileUrl.length != 0">
                <b-col md="12" class="pr-2">
                  <b-table
                    class="customTable pr-4 pl-4"
                    bordered
                    :responsive="true"
                    :items="fileUrl"
                    :fields="generalCommentFileUrlFields"
                  >
                    <template v-slot:cell(sr)="row">{{
                      row.index + 1
                    }}</template>
                    <template v-slot:cell(fileName)="row">
                      <div v-if="row.item.path">
                        {{ row.item.path | trimImageName }}
                      </div>
                      <div v-if="!row.item.path">
                        {{ row.item.name }}
                      </div>
                    </template>
                    <template v-slot:cell(delete)="row">
                      <img
                        src="/images/svg/delete.svg"
                        @click="onDeleteFileCal($event, row, row.index)"
                        style="width: 24px; cursor: pointer; z-index: 9999"
                        alt
                      />
                    </template>
                    <template v-slot:cell(type)="images">
                      <a
                        v-if="images.item.link"
                        :href="images.item.link"
                        target="_blank"
                        style="position: relative"
                      >
                        <md-avatar
                          class="md-avatar-icon"
                          v-if="images.item.type === 'pdf'"
                        >
                          <img class src="/images/icons/pdf.png" alt="Avatar" />
                        </md-avatar>
                        <md-avatar
                          class
                          v-else-if="images.item.type === 'msword'"
                        >
                          <img src="/images/icons/word.png" alt="Avatar" />
                        </md-avatar>
                        <md-avatar
                          class
                          v-else-if="images.item.type === 'docs'"
                        >
                          <img src="/images/icons/word.png" alt="Avatar" />
                        </md-avatar>
                        <md-avatar class v-else-if="images.item.type === 'xlm'">
                          <img src="/images/icons/excel.png" alt="Avatar" />
                        </md-avatar>
                        <md-avatar class v-else>
                          <img
                            src="/images/icons/generic-attachment.png"
                            alt="Avatar"
                          />
                        </md-avatar>
                        <!-- <p class="font-weight-bold">{{ images.name }}</p> -->
                      </a>
                      <a
                        v-if="images.item.path"
                        :href="'http://3.124.65.120' + images.item.path"
                        target="_blank"
                        style="position: relative"
                      >
                        <md-avatar
                          class
                          v-if="
                            trimImage(images.item.path) === 'pdf' ? true : false
                          "
                        >
                          <img src="/images/icons/pdf.png" alt="Avatar" />
                        </md-avatar>
                        <md-avatar
                          class
                          v-else-if="
                            trimImage(images.item.path) === 'msword'
                              ? true
                              : false
                          "
                        >
                          <img src="/images/icons/word.png" alt="Avatar" />
                        </md-avatar>
                        <md-avatar
                          class
                          v-else-if="
                            trimImage(images.item.path) === 'docs'
                              ? true
                              : false
                          "
                        >
                          <img src="/images/icons/word.png" alt="Avatar" />
                        </md-avatar>
                        <md-avatar
                          class
                          v-else-if="
                            trimImage(images.item.path) === 'xlm' ? true : false
                          "
                        >
                          <img src="/images/icons/excel.png" alt="Avatar" />
                        </md-avatar>
                        <md-avatar class v-else>
                          <img
                            src="/images/icons/generic-attachment.png"
                            alt="Avatar"
                          />
                        </md-avatar>
                      </a>
                    </template>
                  </b-table>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="8" offset="4">
              <md-field class="border-dark-blue">
                <label for="subTitle">{{
                  $t("changeRequestDescription")
                }}</label>
                <md-textarea
                  autocomplete="given-name"
                  v-model="changeform.description"
                ></md-textarea>
              </md-field>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div
                style="display: block; width: 100%; text-align: right"
                v-if="hasEntityRole"
              >
                <a
                  class="btn md-primary border-radius-5 border-radius cancel-btn"
                  @click="
                    $bvModal.hide('changesRequestModal'),
                      (isCreateDialog = false)
                  "
                  >{{ $t("cancel") }}</a
                >
                <button
                  class="btn md-primary main-btn border-radius-5 border-radius comman-gradient"
                  :disabled="sending || !validform"
                  @click="submitChangeForm"
                >
                  {{ $t("createChangeRequest") }}
                </button>
              </div>
            </b-col>
          </b-row>
        </form>
      </div>
    </b-modal>
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
const dateFormat = "YYYY-MM-DD";
const now = new Date();
export default {
  name: "changeRequestList",
  mixins: [validationMixin, userMixin, rolesMixin],
  data() {
    return {
      generalCommentFileUrlFields: [
        { key: "sr", label: "#" },
        { key: "fileName", label: "اسم الملف" },
        { key: "type", label: "النوع" },
        { key: "delete", label: "حذف" },
      ],
      filterOptions: [
        {
          value: null,
          text: "الرجاء التحديد من القائمة ادناه",
          disabled: true,
        },
        { value: "Name", text: "الاسم الاول" },
        { value: "Surname", text: "اسم العائلة" },
        { value: "Number", text: "رقم" },
        { value: "Iniciative", text: "اسم الفرصة" },
      ],
      filterSelected: null,
      viewAttachment: [],
      fileUrl: [],
      initiativesList: [],
      changeform: {
        changeType: "",
        initiativeId: 0,
        startDate: null,
        endDate: null,
        amountOfSave: null,
        description: null,
      },
      ChangeRequest: {
        startDate: null,
        endDate: null,
        changeAmountSaving: null,
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
      fieldsEntity: [
        // "id",
        // { label: "#", key: "id" },
        // { label: this.$t("changeRequestType"), key: "changeType" },
        // { label: this.$t("initiativeName"), key: "initiativeName" },
        // { label: this.$t('initiatedBy'), key: "user.fullName" },
        // { label: this.$t("status"), key: "cseApprove" },
        // { key: "actions", label: this.$t("action") }
      ],
      itemsEntity: [],
      fieldsCSE: [
        // "id",
        // { label: "#", key: "id" },
        { label: "رقم", key: "number" },
        { label: "Entity Name", key: "name" },
        { label: "item type", key: "changeType" },
        { label: "Initiative Name", key: "initiativeName" },
        "description",
        // { key: "actions", label: "Actions" }
      ],
      itemsCSE: [],
    };
  },
  validations: {},
  watch: {
    currentPage(newPage) {
      this.options.SkipCount = this.perPage * (newPage - 1);
      this.getList();
    },
    "changeform.changeType": {
      handler: function(after, before) {
        if (after == "changeAmountSaving") {
          this.changeform.startDate = null;
          this.changeform.endDate = null;
        }
        if (after == "changeInitiativeDuration") {
          this.changeform.amountOfSave = null;
          this.changeform.startDate = format(now, dateFormat);
          this.changeform.endDate = format(now, dateFormat);
        }
        if (after == "delete") {
          this.changeform.startDate = null;
          this.changeform.endDate = null;
          this.changeform.amountOfSave = null;
        }
      },
      deep: true,
    },
  },
  computed: {
    validform() {
      // if (this.fileUrl.length === 0) {
      //   return false;
      // }
      if (this.changeform.changeType == "changeAmountSaving") {
        if (
          this.changeform.amountOfSave == null ||
          !this.changeform.description ||
          this.changeform.initiativeId == 0 ||
          this.changeform.initiativeId == null ||
          this.changeform.changeType == null
        ) {
          return false;
        } else {
          return true;
        }
      }
      if (this.changeform.changeType == "changeInitiativeDuration") {
        if (
          this.changeform.startDate == null ||
          this.changeform.endDate == null ||
          !this.changeform.description ||
          this.changeform.initiativeId == 0 ||
          this.changeform.initiativeId == null ||
          this.changeform.changeType == null
        ) {
          return false;
        } else {
          return true;
        }
      }

      if (
        !this.changeform.description ||
        this.changeform.initiativeId == 0 ||
        this.changeform.initiativeId == null ||
        this.changeform.changeType == null
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    onDeleteFileCal(e, item, index) {
      e.preventDefault();
      e.stopPropagation();

      this.viewAttachment.splice(index, 1);
      this.fileUrl.splice(index, 1);
      // delete this.$refs.file.files[0];
    },
    clearSearch() {
      this.options.Keyword = "";
      this.options.Column = "";
      this.search = "";
      this.filterSelected = null;
      this.getList();
    },
    closeDialog() {
      if (this.fileUrl.length > 0) {
        this.fileUrl = [];
      }
    },
    updaloadFile() {
      document.getElementById("imageUpload").click();
    },
    handleUploadFile(event) {
      event.target.files.forEach((item) => {
        this.viewAttachment.push(item);
      });
      event.target.files.forEach((item) => {
        let _ = {
          name: item.name,
          type: item.type.split("/")[1],
          link: URL.createObjectURL(item),
        };
        this.fileUrl.push(_);
      });
    },
    onView(id) {
      if (this.hasCSERole) {
        this.$router.push(`/main/change_request_list/active_section/${id}`);
      }
    },
    searchUser() {
      if (this.filterSelected && this.search) {
        this.options.Keyword = this.search;
        this.options.Column = this.filterSelected;
        this.getList();
      }
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      // if (field) {
      //   return {
      //     "md-invalid": field.$invalid && field.$dirty,
      //   };
      // }
    },
    clearForm() {
      this.$v.$reset();
    },
    submitChangeForm() {
      this.fileUrl = [];
      if (true) {
        let formData = new FormData();
        if (this.$refs.file.files[0]) {
          for (let i = 0; i < this.viewAttachment.length; i++) {
            formData.append("uploadFiles", this.viewAttachment[i]);
          }
        }

        // this.$refs.file.files
        formData.append("obj", JSON.stringify(this.changeform));

        this.$showLoader();
        this.sending = true;
        this.disabledSearch = true;
        this.$changeRequestService.create(formData).then((res) => {
          if (res.success) {
            this.$bvModal.hide("changesRequestModal");
            this.changeform.changeType == null;
            this.changeform.startDate = null;
            this.changeform.endDate = null;
            this.changeform.amountOfSave = null;
            this.changeform.description = null;
            this.getList();
            this.getInitiativesForChangeRequest();
            this.isCreateDialog = false;
            this.clearForm();
            // this.closeDialog()
            this.$swal({
              icon: "success",
              type: "success",
              confirmButtonText: this.$t("ok"),
              title: this.$t("changeRequestSubmittedSuccessfully"),
            }).then((res) => {});
          }
          this.$hideLoader();
          this.sending = false;
          this.disabledSearch = false;
          this.isCreateDialog = false;
        });
      }
    },
    getList() {
      this.$showLoader();
      this.disabledSearch = true;
      const list = this.$changeRequestService
        .getAll(this.options)
        .then((res) => {
          if (res.success) {
            if (this.hasCSERole) {
              this.fieldsEntity = [
                // { label: "#", key: "id" },
                { label: "رقم", key: "number" },
                { label: this.$t("changeRequestType"), key: "changeType" },
                { label: this.$t("initiativeName"), key: "initiativeName" },
                { label: this.$t("entityName"), key: "tenantName" },
                { label: this.$t("status"), key: "cseApprove" },
                { key: "actions", label: this.$t("action") },
              ];
            } else {
              this.fieldsEntity = [
                // { label: "#", key: "id" },
                { label: "رقم", key: "number" },
                { label: this.$t("changeRequestType"), key: "changeType" },
                { label: this.$t("initiativeName"), key: "initiativeName" },
                { label: this.$t("initiatedBy"), key: "initiatedBy" },
                { label: this.$t("status"), key: "cseApprove" },
                { key: "actions", label: this.$t("action") },
              ];
            }

            this.itemsEntity = res.data.items.map((item) => {
              item.initiatedBy = item.user ? item.user.fullName : "N/A";
              item.tenantName = item.tenant ? item.tenant.name : "N/A";
              item.changeType = item.changeType;
              item.initiativeName = item.initiative ? item.initiative.name : "";
              return item;
            });
            this.totalCount = res.data.totalCount;
          }
          this.$hideLoader();
          this.disabledSearch = false;
        });
    },
    getInitiativesForChangeRequest() {
      this.$changeRequestService
        .getInitiativesForChangeRequest()
        .then((res) => {
          if (res.success) {
            this.initiativesList = res.data;
          }
        });
    },
    getValues(payload) {
      let data = {
        initiativeId: payload,
      };
      this.$changeRequestService.getChangeRequestValues(data).then((res) => {
        if (res.success) {
          this.ChangeRequest.changeAmountSaving = res.data.changeAmountSaving;
          this.ChangeRequest.startDate = res.data.startDate.split("T")[0];
          this.ChangeRequest.endDate = res.data.endDate.split("T")[0];
        }
      });
    },
  },
  mounted() {
    console.log("here");
    this.getList();
    this.getInitiativesForChangeRequest();
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
.create-btn {
  width: 210px;
  height: 40px;
}

.cancel-btn {
  width: 210px;
  height: 40px;
  color: black !important;
  border: 1px solid black;
  background: white !important;
  margin: 0 10px;
  font-weight: bold;
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
.custom-attachment-button {
  border-radius: 5px;
  background-color: #f6f7f8 !important;
}
a {
  color: #42b983;
}
</style>
