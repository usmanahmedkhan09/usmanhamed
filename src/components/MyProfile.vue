<template>
  <div class="hello">
    <b-row align-h="between" align-v="center">
      <b-col cols="5">
        <h4 style="font-weight: 600;">{{ $t("myProfile") }}</h4>
      </b-col>
    </b-row>
    <form
      novalidate
      class="md-layout"
      @submit.prevent="validateUser"
      style="width: 100%;"
    >
      <b-row align-v="center" style="width: 100%;">
        <b-col class="mt-4" cols="3">
          <md-field :class="getValidationClass('name')">
            <label for="name">{{ $t("firstName") }}</label>

            <md-input
              name="name"
              id="name"
              readonly
              autocomplete="given-name"
              v-model="form.name"
            />
            <span class="md-error" v-if="!$v.form.name.required"
              >firstName is required</span
            >
            <span class="md-error" v-else-if="!$v.form.name.minlength"
              >firstName required</span
            >
          </md-field>
        </b-col>
        <b-col class="mt-4" cols="3">
          <md-field :class="getValidationClass('surname')">
            <label for="surname">{{ $t("lastName") }}</label>

            <md-input
              name="surname"
              id="surname"
              readonly
              autocomplete="given-name"
              v-model="form.surname"
            />
            <span class="md-error" v-if="!$v.form.surname.required"
              >surname is required</span
            >
            <span class="md-error" v-else-if="!$v.form.surname.minlength"
              >surname required</span
            >
          </md-field>
        </b-col>
        <b-col class="mt-4" cols="3">
          <md-field :class="getValidationClass('phoneNumber')">
            <label for="phoneNumber">{{ $t("phoneNumber") }}</label>

            <md-input
              name="phoneNumber"
              id="phoneNumber"
              readonly
              autocomplete="given-name"
              v-model="form.phoneNumber"
            />
            <span class="md-error" v-if="!$v.form.phoneNumber.required"
              >phoneNumber is required</span
            >
            <span class="md-error" v-else-if="!$v.form.phoneNumber.minlength"
              >phoneNumber required</span
            >
          </md-field>
        </b-col>
        <b-col class="mt-4" cols="3"></b-col>
        <b-col class="mt-4" cols="3">
          <md-field :class="getValidationClass('emailAddress')">
            <label for="emailAddress">{{ $t("emailAddress") }}</label>

            <md-input
              name="emailAddress"
              id="emailAddress"
              readonly
              autocomplete="given-name"
              v-model="form.emailAddress"
            />
            <span class="md-error" v-if="!$v.form.emailAddress.required"
              >emailAddress is required</span
            >
            <span class="md-error" v-else-if="!$v.form.emailAddress.minlength"
              >emailAddress required</span
            >
          </md-field>
        </b-col>
        <!-- <b-col class="mt-4" cols="3">
          <md-field :class="getValidationClass('user_type')">
            <label for="position">{{ $t("position") }}</label>

            <md-input
              name="position"
              id="position"
              readonly
              autocomplete="given-name"
              v-model="form.user_type"
            />
            <span class="md-error" v-if="!$v.form.user_type.required"
              >position is required</span
            >
            <span class="md-error" v-else-if="!$v.form.user_type.minlength"
              >position required</span
            >
          </md-field>
        </b-col> -->
      </b-row>
      <!-- <b-row
        align-h="start"
        align-v="center"
        class="mt-4"
        style="width: 100%;"
        v-if="!this.hasCSERole && !hasOnlyAdminRole"
      >
        <b-col cols="12">
          <h4 style="font-weight: 600;">جهة حكومية</h4>
        </b-col>
        <b-col class="mt-3" cols="3">
          <md-field>
            <label for="position">{{ $t("entityName") }}</label>

            <md-input
              name="position"
              id="position"
              readonly
              autocomplete="given-name"
              v-model="currentUserEntity.name"
            />
          </md-field>
        </b-col>
        <b-col class="mt-3" cols="3">
          <md-field>
            <label for="position">فئة</label>

            <md-input
              name="position"
              id="position"
              readonly
              autocomplete="given-name"
              v-model="currentUserEntity.tenantType"
            />
          </md-field>
        </b-col>
        <b-col class="mt-3" cols="3">
          <md-field>
            <label for="position">{{ $t("sector") }}</label>

            <md-input
              name="position"
              id="position"
              readonly
              autocomplete="given-name"
              v-model="currentUserEntity.sector"
            />
          </md-field>
        </b-col>
      </b-row> -->

      <b-row align-h="start" align-v="center" class="mt-4" style="width: 100%;">
        <b-col cols="12">
          <h4 style="font-weight: 600;">{{ $t("updatePassword") }}</h4>
        </b-col>
        <b-col class="mt-3" cols="3">
          <md-field :class="getValidationClass('currentPassword')">
            <label for="currentPassword">{{ $t("oldPassword") }}</label>

            <md-input
              name="currentPassword"
              id="currentPassword"
              autocomplete="given-name"
              v-model="form.currentPassword"
            />
            <span class="md-error" v-if="!$v.form.currentPassword.required"
              >old Passowrd is required</span
            >
            <span
              class="md-error"
              v-else-if="!$v.form.currentPassword.minlength"
              >old Passowrd required</span
            >
          </md-field>
        </b-col>
        <b-col class="mt-3" cols="3">
          <md-field :class="getValidationClass('newPassword')">
            <label for="newPassword">{{ $t("newPassword") }}</label>

            <md-input
              name="newPassword"
              id="newPassword"
              autocomplete="given-name"
              v-model="form.newPassword"
            />
            <span class="md-error" v-if="!$v.form.newPassword.required"
              >newPassword is required</span
            >
            <span class="md-error" v-else-if="!$v.form.newPassword.minlength"
              >newPassword required</span
            >
          </md-field>
        </b-col>
        <b-col class="mt-3" cols="3">
          <md-field :class="getValidationClass('confirmPassword')">
            <label for="confirmPassword">{{ $t("confirmNewPassword") }}</label>

            <md-input
              name="confirmPassword"
              id="confirmPassword"
              autocomplete="given-name"
              v-model="form.confirmPassword"
            />
            <span class="md-error" v-if="!$v.form.confirmPassword.required"
              >confirmPassword is required</span
            >
            <span
              class="md-error"
              v-else-if="!$v.form.confirmPassword.minlength"
              >confirmPassword required</span
            >
          </md-field>
        </b-col>
      </b-row>
      <div class="mt-3" style="display: block; width: 100%;">
        <button
          class="btn md-primary main-btn border-radius-5 create-btn"
          style="width: auto;"
          :disabled="sending"
        >
          {{ $t("update") }}
        </button>
      </div>
    </form>
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
  name: "myProfile",
  mixins: [validationMixin, userMixin, rolesMixin],
  data() {
    return {
      currentUserEntity: {
        name: null,
        sector: null,
        tenantType: null,
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
      fields: [
        "id",
        "fullName",
        "emailAddress",
        "phoneNumber",
        "user_type",
        { key: "actions", label: "Actions" },
      ],
      items: [],
    };
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
      },
      surname: {
        required,
        minLength: minLength(3),
      },
      phoneNumber: {
        required,
        minLength: minLength(3),
      },
      emailAddress: {
        required,
        minLength: minLength(3),
      },
      // user_type: {
      //   required,
      // },
      currentPassword: {
        required,
        minLength: minLength(3),
      },
      newPassword: {
        required,
        minLength: minLength(3),
      },
      confirmPassword: {
        required,
        minLength: minLength(3),
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
      this.form.name = null;
      this.form.surname = null;
      this.form.emailAddress = null;
      this.form.phoneNumber = null;
      this.form.user_type = null;
    },
    validateUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.changePassword();
      }
    },
    getUser() {
      this.$showLoader();
      this.disabledSearch = true;
      const list = this.$userService
        .getUser(localStorage.getItem("userId"))
        .then((res) => {
          if (res.success) {
            // res.data.user_type = res.data.roleNames.join(", ");
            this.form = res.data;
          }
          this.$hideLoader();
          this.disabledSearch = false;
        });
    },
    getUserLoginInformations() {
      this.$showLoader();
      this.disabledSearch = true;
      const list = this.$sessionService
        .getCurrentLoginInformations(localStorage.getItem("userId"))
        .then((res) => {
          if (res.success) {
            if (res.data.tenant) {
              this.currentUserEntity = res.data.tenant;

              if (
                this.currentUserEntity.sector == "Economical - Financial sector"
              ) {
                this.currentUserEntity.sector = this.$t(
                  "economicalFinancialSector"
                );
              } else if (this.currentUserEntity.sector == "Education sector") {
                this.currentUserEntity.sector = this.$t("educationSector");
              } else if (this.currentUserEntity.sector == "Health sector") {
                this.currentUserEntity.sector = this.$t("healthSector");
              } else if (this.currentUserEntity.sector == "MOX sector") {
                this.currentUserEntity.sector = this.$t("MOXSector");
              } else if (
                this.currentUserEntity.sector == "Military and Security"
              ) {
                this.currentUserEntity.sector = this.$t("militaryAndSecurity");
              } else if (
                this.currentUserEntity.sector ==
                "Transportation and Municipal sector"
              ) {
                this.currentUserEntity.sector = this.$t(
                  "transportationAndMunicipalSector"
                );
              }
              // this.currentUserEntity.sector == "Economical - Financial sector"
              // ? this.$t("economicalFinancialSector")
              // : currentUserEntity.sector == "Education sector"
              // ? this.$t("educationSector")
              // : currentUserEntity.sector == "Health sector"
              // ? this.$t("healthSector")
              // : currentUserEntity.sector == "MOX sector"
              // ? this.$t("MOXSector")
              // : currentUserEntity.sector == "Military and Security"
              // ? this.$t("militaryAndSecurity")
              // : currentUserEntity.sector ==
              //   "Transportation and Municipal sector"
              // ? this.$t("transportationAndMunicipalSector")
              // : "";
              this.currentUserEntity.tenantType =
                this.currentUserEntity.tenantType == "Entity Type 1"
                  ? "الفئة 1"
                  : this.currentUserEntity.tenantType == "Entity Type 2"
                  ? "الفئة 2"
                  : this.currentUserEntity.tenantType == "Entity Type 3"
                  ? "الفئة 3"
                  : this.currentUserEntity.tenantType == "Entity Type 4"
                  ? "الفئة 4"
                  : "";
            }
          }
          this.$hideLoader();
          this.disabledSearch = false;
        });
    },
    changePassword() {
      this.$showLoader();
      this.sending = true;
      let data = {
        currentPassword: this.form.currentPassword,
        newPassword: this.form.newPassword,
      };
      const list = this.$userService.changePassword(data).then((res) => {
        if (res.success) {
          // res.data.user_type = res.data.roleNames.join(", ");
          // this.form = res.data;
        }
        this.$hideLoader();
        this.sending = false;
      });
    },
  },
  mounted() {
    this.getUser();
    if (!this.hasCSERole) {
      this.getUserLoginInformations();
    }
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
