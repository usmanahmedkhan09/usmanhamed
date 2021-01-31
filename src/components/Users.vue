<template>
  <div class="hello">
    <b-row align-h="between" align-v="center">
      <b-col cols="5">
        <h4 style="font-weight: 600;">{{ $t("userManagementHeading") }}</h4>
      </b-col>
      <b-col
        cols="3"
        class="text-align-left-right"
        v-if="hasAdminRole && !hasEntityRole && !hasCSERole"
      >
        <button
          class="btn md-primary main-btn border-radius comman-gradient"
          v-b-modal.userModel
          @click="
            clearForm();
            detail = false;
            update = false;
            isCreateDialog = true;
          "
        >
          {{ $t("createNewUser") }}
        </button>
      </b-col>
    </b-row>

    <div class="main-card p-4 mt-4">
      <h4>{{ $t("searchUsers") }}</h4>
      <b-row align-v="center" class="mt-4">
        <b-col cols="5">
          <b-form-input
            class="border-radius-5"
            :placeholder="$t('searchUsers')"
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
            class="btn md-primary main-btn  border-radius comman-gradient"
            style="width:100%"
            @click="searchUser()"
            :disabled="!search || !filterSelected"
          >
            {{ $t("searchUsers") }}
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

    <div class="main-card py-4 mt-4">
      <template>
        <h4 class="px-4">{{ $t("listOfUsers") }}</h4>
        <b-table class="mt-4" striped hover :items="items" :fields="fields">
          <template v-slot:cell(actions)="data">
            <b class="text-info">
              <button
                class="btn md-primary main-btn border-radius view"
                @click="
                  showDetail(data.item);
                  update = true;
                "
              >
                {{ $t("view") }}
              </button>
            </b>
          </template>
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

          <template v-slot:cell(phoneNumber)="data">{{
            data.item.phoneNumber ? data.item.phoneNumber : "N/A"
          }}</template>
          <template v-slot:cell(sector)="data"
            ><span v-for="it in data.item.userSectors" v-bind:key="it"
              >{{ it.entitysector.sectorName }}<br
            /></span>
            <span v-if="data.item.userSectors.length == 0">N/A</span>
          </template>
          <template v-slot:cell(user_type)="data">{{
            data.item.user_type ? data.item.user_type : "N/A"
          }}</template>
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

    <b-modal id="userModel" centered :hide-footer="true" size="xl">
      <template v-slot:modal-header="{ title }">
        <h4 style="font-weight: 600;" :id="title">
          إنشاء مستخدم جديد [CSE]
        </h4>
      </template>
      <form novalidate class="p-5" @submit.prevent="validateUser">
        <b-row class="mb-3">
          <b-col md="6">
            <md-field :class="getValidationClass('firstname')">
              <label for="firstname">{{ $t("firstName") }}</label>

              <md-input
                name="firstname"
                id="firstname"
                autocomplete="given-name"
                v-model="form.firstname"
                :disabled="sending || detail"
              />
              <span class="md-error" v-if="!$v.form.firstname.required"
                >يجب التعبئة</span
              >
              <span class="md-error" v-else-if="!$v.form.firstname.minlength"
                >٣ أحرف أو أكثر</span
              >
            </md-field>
          </b-col>
          <b-col md="6">
            <md-field :class="getValidationClass('lastname')">
              <label for="lastname">{{ $t("lastName") }}</label>

              <md-input
                name="lastname"
                id="lastname"
                autocomplete="given-name"
                v-model="form.lastname"
                :disabled="sending || detail"
              />
              <span class="md-error" v-if="!$v.form.lastname.required"
                >يجب التعبئة</span
              >
              <span class="md-error" v-else-if="!$v.form.lastname.minlength"
                >٣ أحرف أو أكثر</span
              >
            </md-field>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col md="6">
            <md-field :class="getValidationClass('emailAddress')">
              <label for="email">{{ $t("emailAddress") }}</label>

              <md-input
                name="email"
                id="email"
                autocomplete="given-name"
                v-model="form.emailAddress"
                :disabled="sending || detail"
              />
              <span class="md-error" v-if="!$v.form.emailAddress.required"
                >يجب التعبئة</span
              >
              <span class="md-error" v-else-if="!$v.form.emailAddress.minlength"
                >invalid Email</span
              >
            </md-field>
          </b-col>
          <b-col md="6">
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
                >يجب التعبئة</span
              >
              <span class="md-error" v-else-if="!$v.form.phoneNumber.minlength"
                >phoneNumber password</span
              >
            </md-field>
          </b-col>
        </b-row>
        <b-row class="mb-5">
          <b-col md="6">
            <md-field :class="getValidationClass('type')">
              <label for="type">{{ $t("userType") }}</label>

              <md-select
                name="type"
                id="type"
                v-model="form.type"
                md-dense
                :disabled="sending || detail"
              >
                <md-option :value="null">{{ $t("selectAnOption") }}</md-option>
                <md-option value="CSE Approver">معتمد</md-option>
                <md-option value="CSE Reviewer A"> مراجع أول</md-option>
                <md-option value="CSE Reviewer B"> مراجع ثاني</md-option>
                <md-option value="CSE Special Reviewer"> مراجع إضافي</md-option>
              </md-select>
              <span class="md-error" v-if="!$v.form.type.required"
                >يجب التعبئة</span
              >
            </md-field>
          </b-col>
          <b-col md="6">
            <md-field :class="getValidationClass('entitySectorID')">
              <label for="sector">{{ $t("sector") }}</label>
              <md-select
                name="entitySectorID"
                id="entitySectorID"
                v-model="form.entitySectorID"
                md-dense
                :disabled="sending"
                multiple
              >
                <md-option
                  v-for="(sector, index) in entitySectors"
                  :key="index"
                  :value="sector.id"
                  >{{ sector.sectorName }}</md-option
                >
              </md-select>
              <span class="md-error" v-if="!$v.form.entitySectorID.required"
                >يجب التعبئة</span
              >
            </md-field>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div
              style=" display: block; width: 100%; text-align: right;"
              v-if="hasAdminRole && !hasEntityRole && !hasCSERole"
            >
              <a
                class="btn md-primary main-btn border-radius cancel-btn"
                @click="$bvModal.hide('userModel')"
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
          </b-col>
        </b-row>
      </form>
      <!-- <b-row>
        <form novalidate class="md-layout p-5" @submit.prevent="validateUser">
          <b-row align-v="center" class="mt-4" style="width:100%">
            <b-col cols="4">
              <md-field :class="getValidationClass('firstname')">
                <label for="firstname">{{$t('firstName')}}</label>

                <md-input
                  name="firstname"
                  id="firstname"
                  autocomplete="given-name"
                  v-model="form.firstname"
                  :disabled="sending || detail"
                />
                <span class="md-error" v-if="!$v.form.firstname.required">first name is required</span>
                <span class="md-error" v-else-if="!$v.form.firstname.minlength">first name required</span>
              </md-field>
            </b-col>

            <b-col cols="4">
              <md-field :class="getValidationClass('lastname')">
                <label for="lastname">{{$t('lastName')}}</label>

                <md-input
                  name="lastname"
                  id="lastname"
                  autocomplete="given-name"
                  v-model="form.lastname"
                  :disabled="sending || detail"
                />
                <span class="md-error" v-if="!$v.form.lastname.required">last name is required</span>
                <span class="md-error" v-else-if="!$v.form.lastname.minlength">last name required</span>
              </md-field>
            </b-col>

            <b-col cols="4">
              <md-field :class="getValidationClass('email')">
                <label for="email">{{$t('emailAddress')}}</label>

                <md-input
                  name="email"
                  id="email"
                  autocomplete="given-name"
                  v-model="form.emailAddress"
                  :disabled="sending || detail"
                />
                <span class="md-error" v-if="!$v.form.emailAddress.required">email is required</span>
                <span class="md-error" v-else-if="!$v.form.emailAddress.minlength">email password</span>
              </md-field>
            </b-col>

            <b-col cols="4">
              <md-field :class="getValidationClass('phoneNumber')">
                <label for="phoneNumber">{{$t('phoneNumber')}}</label>

                <md-input
                  name="phoneNumber"
                  id="phoneNumber"
                  autocomplete="given-name"
                  v-model="form.phoneNumber"
                  :disabled="sending || detail"
                />
                <span class="md-error" v-if="!$v.form.phoneNumber.required">phoneNumber is required</span>
                <span
                  class="md-error"
                  v-else-if="!$v.form.phoneNumber.minlength"
                >phoneNumber password</span>
              </md-field>
            </b-col>

            <b-col cols="4">
              <md-field :class="getValidationClass('type')">
                <label for="type">{{$t('userType')}}</label>

                <md-select
                  name="type"
                  id="type"
                  v-model="form.type"
                  md-dense
                  :disabled="sending || detail"
                >
                  <md-option :value="null">{{$t('selectAnOption')}}</md-option>
                  <md-option value="CSE Approver">CSE Approver</md-option>
                  <md-option value="CSE Reviewer A">CSE Reviewer A</md-option>
                  <md-option value="CSE Reviewer B">CSE Reviewer B</md-option>
                  <md-option value="CSE Special Reviewer">CSE Special Reviewer</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.form.type.required">type is required</span>
              </md-field>
            </b-col>

            <b-col cols="4">
              <md-field :class="getValidationClass('entityTypeID')">
                <label for="type">الفئة</label>
                <md-select
                  name="entityTypeID"
                  id="entityTypeID"
                  v-model="form.entityTypeID"
                  md-dense
                  :disabled="sending"
                  multiple
                >
                  <md-option
                    v-for="(entity, index) in entityType"
                    :key="index"
                    :value="entity.id"
                  >{{entity.typeName}}</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.form.entityTypeID.required">entity type is required</span>
              </md-field>
            </b-col>

            <b-col cols="4">
              <md-field :class="getValidationClass('entitySectorID')">
                <label for="sector">{{$t('sector')}}</label>
                <md-select
                  name="entitySectorID"
                  id="entitySectorID"
                  v-model="form.entitySectorID"
                  md-dense
                  :disabled="sending"
                  multiple
                >
                  <md-option
                    v-for="(sector, index) in entitySectors"
                    :key="index"
                    :value="sector.id"
                  >{{sector.sectorName}}</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.form.entitySectorID.required">sector is required</span>
              </md-field>
            </b-col>
          </b-row>
          <div
            style=" display: block; width: 100%; text-align: right;"
            v-if="hasAdminRole && !hasEntityRole && !hasCSERole"
          >
            <a
              class="btn md-primary main-btn border-radius-5 cancel-btn"
              @click="$bvModal.hide('userModel')"
            >{{$t('cancel')}}</a>
            <a
              class="btn md-primary main-btn border-radius-5 cancel-btn"
              v-if="detail"
              @click="detail = false; update = true"
            >{{$t('edit')}}</a>
            <button
              class="btn md-primary main-btn border-radius-5 create-btn"
              v-if="!detail"
              :disabled="sending"
            >{{ getSubmitText }} {{$t('user')}}</button>
          </div>
        </form>
      </b-row>-->
    </b-modal>
    <!-- <md-dialog :md-active.sync="isCreateDialog">
      <md-dialog-content>
        <div>
          <h4 style="font-weight: 600;">{{getSubmitText}} {{$t('new')}} {{$t('user')}} [CSE]</h4>

          <form novalidate class="md-layout" @submit.prevent="validateUser">
            <b-row align-v="center" class="mt-4" style="width:100%">
              <b-col cols="4">
                <md-field :class="getValidationClass('firstname')">
                  <label for="firstname">{{$t('firstName')}}</label>

                  <md-input
                    name="firstname"
                    id="firstname"
                    autocomplete="given-name"
                    v-model="form.firstname"
                    :disabled="sending || detail"
                  />
                  <span class="md-error" v-if="!$v.form.firstname.required">first name is required</span>
                  <span
                    class="md-error"
                    v-else-if="!$v.form.firstname.minlength"
                  >first name required</span>
                </md-field>
              </b-col>

              <b-col cols="4">
                <md-field :class="getValidationClass('lastname')">
                  <label for="lastname">{{$t('lastName')}}</label>

                  <md-input
                    name="lastname"
                    id="lastname"
                    autocomplete="given-name"
                    v-model="form.lastname"
                    :disabled="sending || detail"
                  />
                  <span class="md-error" v-if="!$v.form.lastname.required">last name is required</span>
                  <span class="md-error" v-else-if="!$v.form.lastname.minlength">last name required</span>
                </md-field>
              </b-col>

              <b-col cols="4">
                <md-field :class="getValidationClass('email')">
                  <label for="email">{{$t('emailAddress')}}</label>

                  <md-input
                    name="email"
                    id="email"
                    autocomplete="given-name"
                    v-model="form.emailAddress"
                    :disabled="sending || detail"
                  />
                  <span class="md-error" v-if="!$v.form.emailAddress.required">email is required</span>
                  <span class="md-error" v-else-if="!$v.form.emailAddress.minlength">email password</span>
                </md-field>
              </b-col>

              <b-col cols="4">
                <md-field :class="getValidationClass('phoneNumber')">
                  <label for="phoneNumber">{{$t('phoneNumber')}}</label>

                  <md-input
                    name="phoneNumber"
                    id="phoneNumber"
                    autocomplete="given-name"
                    v-model="form.phoneNumber"
                    :disabled="sending || detail"
                  />
                  <span
                    class="md-error"
                    v-if="!$v.form.phoneNumber.required"
                  >phoneNumber is required</span>
                  <span
                    class="md-error"
                    v-else-if="!$v.form.phoneNumber.minlength"
                  >phoneNumber password</span>
                </md-field>
              </b-col>

              <b-col cols="4">
                <md-field :class="getValidationClass('type')">
                  <label for="type">{{$t('userType')}}</label>

                  <md-select
                    name="type"
                    id="type"
                    v-model="form.type"
                    md-dense
                    :disabled="sending || detail"
                  >
                    <md-option :value="null">{{$t('selectAnOption')}}</md-option>
                    <md-option value="CSE Approver">CSE Approver</md-option>
                    <md-option value="CSE Reviewer A">CSE Reviewer A</md-option>
                    <md-option value="CSE Reviewer B">CSE Reviewer B</md-option>
                    <md-option value="CSE Special Reviewer">CSE Special Reviewer</md-option>
                  </md-select>
                  <span class="md-error" v-if="!$v.form.type.required">type is required</span>
                </md-field>
              </b-col>

              <b-col cols="4">
                <md-field :class="getValidationClass('entityTypeID')">
                  <label for="type">الفئة</label>
                  <md-select
                    name="entityTypeID"
                    id="entityTypeID"
                    v-model="form.entityTypeID"
                    md-dense
                    :disabled="sending"
                  >
                    <md-option
                      v-for="(entity, index) in entityType"
                      :key="index"
                      :value="entity.id"
                    >{{entity.typeName}}</md-option>
                  </md-select>
                  <span
                    class="md-error"
                    v-if="!$v.form.entityTypeID.required"
                  >entity type is required</span>
                </md-field>
              </b-col>

              <b-col cols="4">
                <md-field :class="getValidationClass('entitySectorID')">
                  <label for="sector">{{$t('sector')}}</label>
                  <md-select
                    name="entitySectorID"
                    id="entitySectorID"
                    v-model="form.entitySectorID"
                    md-dense
                    :disabled="sending"
                    multiple
                  >
                    <md-option
                      v-for="(sector, index) in entitySectors"
                      :key="index"
                      :value="sector.id"
                    >{{sector.sectorName}}</md-option>
                  </md-select>
                  <span class="md-error" v-if="!$v.form.entitySectorID.required">sector is required</span>
                </md-field>
              </b-col>
            </b-row>
            <div
              style=" display: block; width: 100%; text-align: right;"
              v-if="hasAdminRole && !hasEntityRole && !hasCSERole"
            >
              <a
                class="btn md-primary main-btn border-radius-5 cancel-btn"
                @click="isCreateDialog = false"
              >{{$t('cancel')}}</a>
              <a
                class="btn md-primary main-btn border-radius-5 cancel-btn"
                v-if="detail"
                @click="detail = false; update = true"
              >{{$t('edit')}}</a>
              <button
                class="btn md-primary main-btn border-radius-5 create-btn"
                v-if="!detail"
                :disabled="sending"
              >{{ getSubmitText }} {{$t('user')}}</button>
            </div>
          </form>
        </div>
      </md-dialog-content>
    </md-dialog>-->
  </div>
</template>

<script>
import rolesMixin from "../mixins/RolesMixins.js";
import userMixin from "../mixins/UserMixin.js";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
export default {
  name: "users",
  mixins: [validationMixin, userMixin, rolesMixin],
  data() {
    return {
      filterOptions: [
        {
          value: null,
          text: "الرجاء التحديد من القائمة ادناه",
          disabled: true,
        },
        { value: "FullName", text: this.$t("fullName") },
        { value: "EmailAddress", text: this.$t("emailAddress") },
        { value: "PhoneNumber", text: this.$t("phoneNumber") },
        { value: "SectorName", text: this.$t("sector") },
        { value: "Role", text: this.$t("userType") },
      ],
      filterSelected: null,
      options: {
        Keyword: "",
        // isActive: true,
        SkipCount: 0,
      },
      perPage: 10,
      currentPage: 1,
      disabledSearch: false,
      totalCount: 0,
      isCreateDialog: false,
      search: null,
      userSaved: false,
      sending: false,
      lastUser: null,
      entitySectors: [],
      entityType: [],
      // Note `isActive` is left out and will not appear in the rendered table
      fields: [
        // "id",
        { key: "fullName", label: this.$t("fullName") },
        { key: "emailAddress", label: this.$t("emailAddress") },
        { key: "phoneNumber", label: this.$t("phoneNumber") },
        { key: "user_type", label: this.$t("userType") },
        { key: "sector", label: this.$t("sector") },
        { key: "isActive", label: this.$t("status") },
        { key: "actions", label: this.$t("action") },
      ],
      items: [],
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
        email,
        minLength: minLength(3),
      },
      phoneNumber: {
        required,
        minLength: minLength(3),
      },
      // entityTypeID: {
      //   required,
      // },
      entitySectorID: {
        required,
      },
      type: {
        required,
      },
    },
  },
  watch: {
    currentPage(newPage) {
      this.options.SkipCount = this.perPage * (newPage - 1);
      this.getUsersList();
    },
  },
  computed: {},
  methods: {
    clearSearch() {
      this.options.Keyword = "";
      this.options.Column = "";
      this.search = "";
      this.filterSelected = null;
      this.getUsersList();
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
    searchUser() {
      if (this.filterSelected && this.search) {
        this.options.Keyword = this.search;
        this.options.Column = this.filterSelected;
        this.getUsersList();
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
    clearForm() {
      this.$v.$reset();
      this.form.userID = "";
      this.form.firstname = "";
      this.form.lastname = "";
      this.form.emailAddress = "";
      this.form.phoneNumber = "";
      this.form.type = null;
    },
    validateUser() {
      this.$v.$touch();
      console.log(this.form);
      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
    getUsersList() {
      this.$showLoader();
      this.disabledSearch = true;
      const list = this.$userService.getAllUsers(this.options).then((res) => {
        if (res.success) {
          console.log(res.data);
          res.data.items.map((item) => {
            item.user_type = item.roleNames.join(", ");
            return item;
          });
          this.items = res.data.items;
          this.totalCount = res.data.totalCount;
        }
        this.$hideLoader();
        this.disabledSearch = false;
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
  mounted() {
    this.getUsersList();
    this.getEntitySectors();
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
