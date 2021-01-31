<template>
  <div class="hello">
    <b-row align-h="between" align-v="center">
      <b-col cols="5">
        <img @click="$router.go(-1)" src="/images/icons/back.png" />
        <h4 style="font-weight: 600" class="d-inline pr-3">
          {{ $t("entityDetail") }}
        </h4>
      </b-col>
      <b-col
        cols="7"
        class="text-align-left-right"
        v-if="hasAdminRole && !hasEntityRole && !hasCSERole"
      >
        <!-- <button
          class="btn md-primary main-btn border-radius-5"
          @click="onEntityBudget()"
        >Entity Budget</button>-->
        <button
          class="btn md-primary main-btn border-radius comman-gradient"
          style="margin: 0 10px"
          @click="isEditEntity = true"
        >
          {{ $t("editEntityDetail") }}
        </button>
        <button
          class="btn md-primary main-btn border-radius comman-gradient"
          @click="isCreateDialog = true"
        >
          {{ $t("createEntityUser") }}
        </button>
      </b-col>
    </b-row>

    <div class="main-card p-4 mt-4">
      <h4>{{ $t("entityDetail") }}</h4>

      <b-row align-v="center" class="mt-4" style="width: 100%">
        <b-col cols="12">
          <b-row>
            <b-col cols="1">
              <md-field>
                <label for="entityID">{{ $t("id") }}</label>
                <md-input
                  name="entityID"
                  id="entityID"
                  readonly
                  autocomplete="given-name"
                  v-model="data.id"
                />
              </md-field>
            </b-col>

            <b-col cols="3">
              <md-field :class="getDataValidationClass('name')">
                <label for="entitytitle">{{ $t("name") }}</label>

                <md-input
                  name="entitytitle"
                  id="entitytitle"
                  :disabled="!isEditEntity"
                  autocomplete="given-name"
                  v-model="data.name"
                />
                <span class="md-error" v-if="!$v.data.name.required"
                  >entitytitle is required</span
                >
                <span class="md-error" v-else-if="!$v.data.name.minlength"
                  >entitytitle password</span
                >
              </md-field>
            </b-col>
            <b-col cols="4">
              <md-field :class="getDataValidationClass('type')">
                <label for="type">{{ $t("entityType") }}</label>

                <md-select
                  name="type"
                  id="type"
                  v-model="data.entityTypeID"
                  md-dense
                  :disabled="!isEditEntity"
                >
                  <md-option
                    v-for="(entity, index) in entityType"
                    :key="index"
                    :value="entity.id"
                    >{{ entity.typeName }}</md-option
                  >
                  <!-- <md-option :value="null">{{$t('selectAnOption')}}</md-option>
                  <md-option value="Entity Type 1">الفئة 1</md-option>
                  <md-option value="Entity Type 2">الفئة 2</md-option>
                  <md-option value="Entity Type 3">الفئة 3</md-option>
                  <md-option value="Entity Type 4">الفئة 4</md-option> -->
                </md-select>
                <span class="md-error">type is required</span>
                <!-- <span class="md-error"
                  >type tenantType</span
                > -->
              </md-field>
            </b-col>
            <b-col cols="4">
              <md-field :class="getSectorValidationClass('sector')">
                <label for="sector">{{ $t("sector") }}</label>

                <md-select
                  name="sector"
                  id="sector"
                  v-model="data.entitySectorID"
                  md-dense
                  :disabled="!isEditEntity"
                >
                  <md-option :value="null">{{
                    $t("selectAnOption")
                  }}</md-option>
                  <md-option
                    v-for="(sector, index) in entitySectors"
                    :key="index"
                    :value="sector.id"
                    >{{ sector.sectorName }}</md-option
                  >
                  <!-- <md-option
                        value="Economical - Financial sector"
                      >{{$t('economicalFinancialSector')}}</md-option>
                      <md-option value="Education sector">{{$t('educationSector')}}</md-option>
                      <md-option value="Health sector">{{$t('healthSector')}}</md-option>
                      <md-option value="MOX sector">{{$t('MOXSector')}}</md-option>
                      <md-option value="Military and Security">{{$t('militaryAndSecurity')}}</md-option>
                      <md-option
                        value="Transportation and Municipal sector"
                  >{{$t('transportationAndMunicipalSector')}}</md-option>-->
                </md-select>
                <span class="md-error">sector is required</span>
                <!-- <span class="md-error" v-else-if="!$v.data.tenantType.minlength"
                  >invalid sector</span
                > -->
              </md-field>
            </b-col>
          </b-row>
          <!-- <b-row>
            <b-col cols="12">
              <md-field :class="getDataValidationClass('description')">
                <label for="description">{{ $t("description") }}</label>

                <md-input
                  name="description"
                  id="description"
                  :disabled="!isEditEntity"
                  autocomplete="given-name"
                  v-model="data.description"
                />
                <span class="md-error" v-if="!$v.data.description.required"
                  >description is required</span
                >
                <span
                  class="md-error"
                  v-else-if="!$v.data.description.minlength"
                  >Invalid description</span
                >
              </md-field>
            </b-col>
          </b-row> -->
        </b-col>
      </b-row>
      <div
        style="display: block; width: 100%; text-align: right"
        v-if="isEditEntity"
      >
        <a
          class="btn md-primary main-btn border-radius cancel-btn"
          @click="isEditEntity = false"
          >{{ $t("cancel") }}</a
        >
        <button
          class="btn md-primary main-btn border-radius cancel-btn"
          @click="updateEntity"
        >
          {{ $t("update") }}
        </button>
      </div>
    </div>

    <div class="main-card py-4 mt-4">
      <template>
        <b-row align-h="between" align-v="center" class="px-4 mb-3">
          <b-col cols="3">
            <h4>الميزانيات السنوية للجهة</h4>
          </b-col>
          <b-col cols="3" class="text-align-left-right" v-if="hasOnlyAdminRole">
            <button
              class="btn md-primary main-btn border-radius comman-gradient"
              @click="onAddBudget()"
            >
              {{ $t("addBudget") }}
            </button>
          </b-col>
        </b-row>
        <b-table
          class="top-radius"
          striped
          hover
          v-if="!hasOnlyAdminRole"
          :items="entityBudget"
          :fields="EntitiyfieldsBudget"
        ></b-table>
        <b-table
          class="top-radius"
          striped
          hover
          v-else
          :items="entityBudget"
          :fields="fieldsBudget"
        >
          <template v-slot:cell(amount)="data">
            {{ formatAsCurrency(data.item.amount) }}
          </template>
          <template v-slot:cell(actions)="data" v-if="hasOnlyAdminRole">
            <b class="text-info">
              <button
                class="btn md-primary main-btn border-radius view"
                @click="showDetail(data.item)"
                :disabled="!hasOnlyAdminRole"
              >
                {{ $t("edit") }}
              </button>
              <!-- <button
                class="btn md-delete main-btn border-radius-5 delete m-1"
                :disabled="!hasOnlyAdminRole"
                @click="onDelete(data.item)"
              >حذف</button> -->
            </b>
          </template>
        </b-table>

        <h5 v-if="entityBudget.length == 0" class="text-center">
          {{ $t("thereAreCurrentlyNoRecords") }}
        </h5>
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

    <b-row align-h="between" align-v="top" class="mb-4">
      <b-col cols="12">
        <div class="main-card p-4 mt-4" style="overflow: auto">
          <h4 class="px-4">{{ $t("entityUser") }}</h4>
          <template>
            <b-table
              v-if="hasOnlyAdminRole"
              class="top-radius"
              striped
              hover
              :items="entityUsers"
              :fields="fields"
            >
              <template v-slot:cell(roleNames)="data">
                <span v-for="(role, index) in data.item.roleNames" :key="index">
                  {{ role }}
                </span>
              </template>
              <!-- <template v-slot:cell(actions)="data">
                <b class="text-info">
                  <button
                    class="btn md-primary main-btn border-radius-5 view"
                    @click="showDetailEntity(data.item)"
                    :disabled="!hasOnlyAdminRole"
                  >{{$t('view')}}</button>
                </b>
              </template> -->
              <template v-slot:cell(isActive)="data">
                <b class="text-info">
                  <select
                    v-model="data.item.isActive"
                    @change="onChangeActive($event, data.item)"
                  >
                    <option :value="true">{{ $t("active") }}</option>
                    <option :value="false">{{ $t("inActive") }}</option>
                  </select>
                </b>
              </template>
            </b-table>

            <b-table
              v-else
              class="top-radius"
              striped
              hover
              :items="entityUsers"
              :fields="entityFields"
            >
              <template v-slot:cell(roleNames)="data">
                <span v-for="(role, index) in data.item.roleNames" :key="index">
                  {{ role }}
                </span>
              </template>
            </b-table>

            <h5 v-if="entityUsers.length == 0" class="text-center">
              {{ $t("thereAreCurrentlyNoRecords") }}
            </h5>
          </template>
        </div>
      </b-col>
    </b-row>

    <md-dialog
      style="max-height: 50% !important"
      :md-active.sync="isCreateDialog"
    >
      <md-dialog-title></md-dialog-title>
      <div class="px-5">
        <h4 style="font-weight: 600">
          {{ getSubmitText }} {{ $t("entityUser") }}
        </h4>

        <form novalidate class="md-layout" @submit.prevent="validateUser">
          <b-row align-v="center" class="mt-4" style="width: 100%">
            <b-col cols="4">
              <md-field :class="getValidationClass('firstname')">
                <label for="firstname">{{ $t("firstname") }}</label>

                <md-input
                  name="firstname"
                  id="firstname"
                  autocomplete="given-name"
                  v-model="form.firstname"
                  :disabled="sending || detail"
                />
                <span class="md-error" v-if="!$v.form.firstname.required"
                  >يجب التعبئة
                </span>
                <span class="md-error" v-else-if="!$v.form.firstname.minlength"
                  >٣ أحرف أو أكثر</span
                >
              </md-field>
            </b-col>

            <b-col cols="4">
              <md-field :class="getValidationClass('lastname')">
                <label for="lastname">{{ $t("lastname") }}</label>

                <md-input
                  name="lastname"
                  id="lastname"
                  autocomplete="given-name"
                  v-model="form.lastname"
                  :disabled="sending || detail"
                />
                <span class="md-error" v-if="!$v.form.lastname.required"
                  >يجب التعبئة
                </span>
                <span class="md-error" v-else-if="!$v.form.lastname.minlength"
                  >٣ أحرف أو أكثر
                </span>
              </md-field>
            </b-col>

            <b-col cols="4">
              <md-field :class="getValidationClass('emailAddress')">
                <label for="email">{{ $t("emailAddress") }}</label>

                <md-input
                  name="emailAddress"
                  id="emailAddress"
                  autocomplete="given-name"
                  v-model="form.emailAddress"
                  :disabled="sending || detail"
                />
                <span class="md-error" v-if="!$v.form.emailAddress.required"
                  >يجب التعبئة
                </span>
                <span
                  class="md-error"
                  v-else-if="!$v.form.emailAddress.minlength"
                  >Invalid Email</span
                >
              </md-field>
            </b-col>

            <b-col cols="4">
              <md-field :class="getValidationClass('phoneNumber')">
                <label for="phoneNumber">{{ $t("phoneNumber") }}</label>

                <md-input
                  name="phoneNumber"
                  id="phoneNumber"
                  autocomplete="given-name"
                  v-model="form.phoneNumber"
                  :disabled="sending || detail"
                />
                <span class="md-error" v-if="!$v.form.phoneNumber.required"
                  >يجب التعبئة
                </span>
                <span
                  class="md-error"
                  v-else-if="!$v.form.phoneNumber.minlength"
                  >phoneNumber password</span
                >
              </md-field>
            </b-col>

            <b-col cols="4">
              <md-field :class="getValidationClass('type')">
                <label for="type">نوع المستخدم</label>

                <md-select
                  name="type"
                  id="type"
                  v-model="form.type"
                  md-dense
                  :disabled="sending || detail"
                >
                  <md-option :value="null">{{
                    $t("selectAnOption")
                  }}</md-option>
                  <md-option value="Entity Approver">المعتمد </md-option>
                  <md-option value="Entity Initiator">المنشئ </md-option>
                </md-select>
                <span class="md-error">يجب التعبئة </span>
                <!-- <span class="md-error" v-else-if="!$v.form.type.minlength"
                  >Invalid type</span
                > -->
              </md-field>
            </b-col>
          </b-row>
          <div
            style="display: block; width: 100%; text-align: right"
            v-if="hasAdminRole && !hasEntityRole && !hasCSERole"
          >
            <a
              class="btn md-primary main-btn border-radius cancel-btn"
              @click="isCreateDialog = false"
              >{{ $t("cancel") }}</a
            >
            <a
              class="btn md-primary main-btn border-radius cancel-btn"
              v-if="detail"
              @click="
                detail = false;
                update = true;
              "
              >{{ $t("edit") }}</a
            >
            <button
              type="submit"
              class="btn md-primary main-btn border-radius comman-gradient create-btn"
              v-if="!detail"
              :disabled="sending"
            >
              {{ getSubmitText }} {{ $t("user") }}
            </button>
          </div>
        </form>
      </div>
      <md-dialog-actions></md-dialog-actions>
    </md-dialog>

    <md-dialog
      style="max-height: 40% !important"
      :md-active.sync="isCreateDialogBudget"
    >
      <md-dialog-title></md-dialog-title>
      <div class="px-5">
        <h4 style="font-weight: 600">
          {{ isEditBudget == true ? $t("updatebudget") : "أضف ميزانية" }}
        </h4>

        <form novalidate class="md-layout" @submit.prevent="validateUserBudget">
          <b-row align-v="center" class="mt-4" style="width: 100%">
            <b-col cols="4">
              <md-field :class="getBudgetValidationClass('amount')">
                <label for="amount">الميزانيّة</label>

                <md-input
                  name="amount"
                  @keypress="onlyNumber"
                  @change="expSaveValueCurrencyFormatter"
                  id="amount"
                  autocomplete="given-name"
                  v-model="formBudget.amount"
                  :disabled="sending"
                />
                <span class="md-error">amount is required</span>
                <!-- <span
                  class="md-error"
                  v-else-if="!$v.formBudget.amount.minlength"
                >amount is required</span>-->
              </md-field>
            </b-col>
            <b-col cols="4">
              <md-field :class="getBudgetValidationClass('year')">
                <label for="year">السنة</label>
                <md-select
                  name="year"
                  id="year"
                  v-model="formBudget.year"
                  md-dense
                  :disabled="sending"
                >
                  <md-option :value="null">{{
                    $t("selectAnOption")
                  }}</md-option>
                  <md-option value="2019">2019</md-option>
                  <md-option value="2020">2020</md-option>
                  <md-option value="2021">2021</md-option>
                </md-select>
                <span class="md-error">year is required</span>
                <!-- <span class="md-error" v-else-if="!$v.formBudget.year.minlength">year is required</span> -->
              </md-field>
            </b-col>
          </b-row>
          <div
            style="display: block; width: 100%; text-align: right"
            v-if="hasAdminRole && !hasEntityRole && !hasCSERole"
          >
            <a
              class="btn md-primary main-btn border-radius cancel-btn"
              @click="isCreateDialogBudget = false"
              >{{ $t("cancel") }}</a
            >
            <button
              type="submit"
              class="btn md-primary main-btn border-radius comman-gradient create-btn"
              :disabled="sending"
            >
              {{ isEditBudget == true ? $t("updatebudget") : $t("addbudget") }}
            </button>
          </div>
        </form>
      </div>
      <md-dialog-actions></md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import userMixin from "../mixins/UserMixin.js";
import rolesMixin from "../mixins/RolesMixins.js";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
export default {
  name: "entityUsers",
  mixins: [validationMixin, userMixin, rolesMixin],
  data() {
    return {
      data: {
        id: 10,
        tenancyName: "aaaaaaa",
        sector: "sector rrr",
        tenantType: "aaaaaaaaaavvvv",
        // description: "aaaaaaaaaaaaa description",
        name: "name--",
        users: [],
        isActive: true,
      },
      entityType: [],
      entitySectors: [],
      entityUsers: [],
      isEditBudget: false,
      isCreateDialogBudget: false,
      isCreateDialog: false,
      userSaved: false,
      sending: false,
      lastUser: null,
      currentPage: 1,
      selectSearch: null,
      currentPage: 1,
      isEditEntity: false,
      entityBudget: [],
      itemsBudget: [],
      fieldsBudget: [
        // { key: "id", label: "Id" },
        // { key: "tenantId", label: "Entity Id" },
        { key: "year", label: "عام" },
        { key: "amount", label: "ميزانية (ريال)" },
        { key: "actions", label: this.$t("action") },
      ],
      EntitiyfieldsBudget: [
        // { key: "id", label: "Id" },
        // { key: "tenantId", label: "Entity Id" },
        { key: "year", label: "عام" },
        { key: "amount", label: "ميزانية (ريال)" },
        // { key: "actions", label: "Actions" },
      ],
      entitySearch: [
        { text: "Select One", value: null, disable: true },
        "Carrots",
        "Beans",
        "Tomatoes",
        "Corn",
      ],
      // Note `isActive` is left out and will not appear in the rendered table
      accessUpdates: [{ key: "access", label: "Portal Access Updates" }],
      accessUpdatesItems: [
        {
          access: "Portal Access Notification by Entity",
        },
      ],
      formBudget: {
        amount: null,
        year: null,
      },
      fields: [
        // "id",
        {
          key: "name",
          label: this.$t("firstName"),
        },
        {
          key: "surname",
          label: this.$t("lastName"),
        },
        {
          key: "emailAddress",
          label: this.$t("emailAddress"),
        },
        {
          key: "phoneNumber",
          label: this.$t("phoneNumber"),
        },
        {
          key: "roleNames",
          label: this.$t("userType"),
        },
        { key: "isActive", label: this.$t("status") },
        // { key: "actions", label: this.$t("action") },
      ],
      items: [],
      entityFields: [
        // "id",
        {
          key: "name",
          label: this.$t("firstName"),
        },
        {
          key: "surname",
          label: this.$t("lastName"),
        },
        {
          key: "emailAddress",
          label: this.$t("emailAddress"),
        },
        {
          key: "phoneNumber",
          label: this.$t("phoneNumber"),
        },
        {
          key: "roleNames",
          label: this.$t("userType"),
        },
      ],
    };
  },

  validations: {
    form: {
      firstname: {
        required,
        minLength: minLength(3),
      },
      lastname: {
        required,
        minLength: minLength(3),
      },
      emailAddress: {
        required,
        minLength: minLength(3),
      },
      phoneNumber: {
        required,
        minLength: minLength(3),
      },
      type: {
        required,
      },
    },
    formBudget: {
      amount: {
        required,
      },
      year: {
        required,
      },
    },
    data: {
      name: {
        required,
        minLength: minLength(3),
      },
      tenantType: {
        required,
      },
      sector: {
        required,
      },
      // description: {
      //   required,
      //   minLength: minLength(3),
      // },
    },
  },
  watch: {
    currentPage(newPage) {
      // this.$emit('input', newPage);
      // custom input event emitted
    },
  },
  methods: {
    formatAsCurrency(value) {
      if (value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
    expSaveValueCurrencyFormatter() {
      this.formBudget.amount = this.formBudget.amount
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    showDetailEntity(data) {},
    onEntityBudget() {
      this.$router.push(
        `/main/entity/user/budget/${this.$route.params.tenant_id}/${this.data.name}`
      );
    },
    onChangeActive($event, item) {
      this.$showLoader();
      this.disabledSearch = true;
      this.$userService.changeStatus(item.id).then((res) => {
        if (res.success) {
          this.$swal({
            icon: "success",
            type: "success",
            title: this.$t("userStatusUpdatedSuccessfully"),
          }).then(() => {});
        } else {
          $event.preventDefault();
        }
        this.$hideLoader();
        this.disabledSearch = false;
      });
    },
    updateEntity() {
      this.$v.$touch();
      this.$showLoader();
      // if (!this.$v.data.$invalid) {
      this.sending = true;
      this.$entityService
        .updateTenant(this.data)
        .then((res) => {
          if (res.success) {
            this.isEditEntity = false;
            this.data = res.data;
            this.$swal({
              icon: "success",
              type: "success",
              title: this.$t("entityUpdatedSuccessfully"),
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
      this.$hideLoader();
      // }
    },
    onPagination(event) {},
    getBudgetValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    getSectorValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    getDataValidationClass(fieldName) {
      const field = this.$v.data[fieldName];
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
      this.form.emailAddress = null;
      this.form.phoneNumber = null;
      this.form.type = null;
    },
    checkUser(payload) {
      if (
        payload.firstname == null ||
        payload.firstname == "" ||
        payload.firstname.length < 3
      ) {
        return false;
      } else if (
        payload.lastname == null ||
        payload.lastname == "" ||
        payload.lastname.length < 3
      ) {
        return false;
      } else if (
        payload.emailAddress == null ||
        payload.emailAddress == "" ||
        payload.emailAddress.length < 3
      ) {
        return false;
      } else if (
        payload.phoneNumber == null ||
        payload.phoneNumber == "" ||
        payload.phoneNumber < 10
      ) {
        return false;
      } else if (payload.type == null || payload.type == "") {
        return false;
      } else {
        return true;
      }
    },
    validateUser() {
      this.$v.$touch();
      let valid = this.checkUser(this.form);
      if (valid) {
        this.saveUser();
      }
    },
    validateUserBudget() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        if (!this.isEditBudget) {
          this.saveBudget();
        } else {
          this.updateBudget();
        }
      } else {
        alert("error");
      }
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    getAllEntities() {
      this.$showLoader();
      this.$userService
        .getAllTenenat(this.$route.params.tenant_id)
        .then((res) => {
          if (res.success) {
            this.entityUsers = res.data;
            this.$hideLoader();
          } else {
            this.$hideLoader();
          }
        });
    },
    getAllBudget() {
      this.$showLoader();
      this.$userService.getBudget(this.$route.params.tenant_id).then((res) => {
        if (res.success) {
          this.entityBudget = res.data;
          this.$hideLoader();
        } else {
          this.$hideLoader();
        }
      });
    },
    getEntity() {
      const list = this.$userService
        .getEntityForEntityUser(this.$route.params.tenant_id)
        .then((res) => {
          if (res.success) {
            res.data.users.map((item) => {
              item.roleNames = item.roleNames
                ? item.roleNames.join(", ")
                : "n/a";
              return item;
            });
            this.data = res.data;
            this.$hideLoader();
          } else {
            this.$hideLoader();
          }
        });
    },
    getEntityBudgetList() {
      this.disabledSearch = true;
      this.$showLoader();
      const list = this.$entityBudgetService
        .getEnityBudget(this.$route.params.tenant_id)
        .then((res) => {
          if (res.success) {
            this.itemsBudget = [];
            this.itemsBudget = res.data;
            // this.totalCount = res.data.totalCount;
          }
          this.disabledSearch = false;
          this.$hideLoader();
        });
    },
    onAddBudget() {
      this.formBudget.amount = null;
      this.formBudget.year = null;
      this.formBudget.id = 0;
      this.formBudget.tenantId = "";
      this.isEditBudget = false;
      this.isCreateDialogBudget = true;
    },
    showDetail(item) {
      this.formBudget.amount = item.amount;
      this.formBudget.year = item.year;
      this.formBudget.id = item.id;
      this.formBudget.tenantId = item.tenantId;
      this.isEditBudget = true;
      this.isCreateDialogBudget = true;
    },
    saveBudget() {
      this.sending = true;
      this.formBudget.tenantId = this.$route.params.tenant_id;
      if (
        this.formBudget.amount.toString().indexOf(",") > -1 &&
        this.formBudget.amount != ""
      ) {
        this.formBudget.amount = this.formBudget.amount.replace(/,/g, "");
      }
      this.$entityBudgetService
        .createBudget(this.formBudget)
        .then((res) => {
          if (res.success) {
            this.getAllBudget();
            this.isCreateDialogBudget = false;
            this.$swal({
              icon: "success",
              type: "success",
              title: "تمّ إضافة الميزانيّة بنجاح",
              confirmButtonText: "موافق",
            }).then(() => {
              this.isCreateDialogBudget = false;
              this.formBudget.id = res.data.id;
              this.itemsBudget.unshift(this.formBudget);
            });
          } else {
            this.$swal({
              icon: "error",
              type: "error",
              confirmButtonText: "موافق",
              title: res.message.message,
            });
          }
          this.sending = false;
        })
        .catch((error) => {
          this.sending = false;
        });
    },
    updateBudget() {
      this.sending = true;
      if (
        this.formBudget.amount.toString().indexOf(",") > -1 &&
        this.formBudget.amount != ""
      ) {
        this.formBudget.amount = this.formBudget.amount.replace(/,/g, "");
      }
      this.$entityBudgetService
        .updateBudget(this.formBudget)
        .then((res) => {
          if (res.success) {
            this.getAllBudget();
            this.isCreateDialogBudget = false;
            this.$swal({
              icon: "success",
              type: "success",
              title: "تم إنشاء الجهة الجديدة بنجاح",
              confirmButtonText: "موافق",
            }).then(() => {
              this.isCreateDialogBudget = false;
              this.getEntityBudgetList();
            });
          } else {
            this.$swal({
              icon: "error",
              type: "error",
              confirmButtonText: "موافق",
              title: res.message.message,
            });
          }
          this.sending = false;
        })
        .catch((error) => {
          this.sending = false;
        });
    },
    getEntitySectors() {
      this.$entitySector.getAllEntitySectors().then((res) => {
        if (res.success) {
          res.data.items.forEach((payload) => {
            this.entitySectors.push(payload);
          });
        }
      });
    },
    AllEntityTypes() {
      this.$entityTypes.getAllEntityTypes().then((res) => {
        if (res.success) {
          res.data.items.forEach((payload) => [this.entityType.push(payload)]);
        }
      });
    },
  },
  computed: {},
  filters: {
    trimString(payload) {
      return payload.forEach((item) => {
        return item;
      });
      // return payload.forEach((item) => {
      //   return item;
      // });
    },
  },
  mounted() {
    this.$showLoader();
    this.getEntitySectors();
    this.getEntityBudgetList();
    this.getEntity();
    this.getAllEntities();
    this.getAllBudget();
    this.AllEntityTypes();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.create-btn {
  width: 210px;
  height: 40px;
}
.delete {
  font-size: 12px;
  background: red !important;
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
