<template>
  <div class="hello">
    <b-row align-h="between" align-v="center">
      <b-col cols="5">
        <h4 style="font-weight: 600;">{{$t("notifications")}}</h4>
      </b-col>
      <!-- <b-col cols="3" class="text-right" v-if="hasAdminRole && !hasEntityRole && !hasCSERole">
        <button
          class="btn md-primary main-btn border-radius-5"
          @click="isCreateDialog = true"
        >Create New User</button>
      </b-col> -->
    </b-row>

  </div>
</template>

<script>
import rolesMixin from '../mixins/RolesMixins.js'
import userMixin from '../mixins/UserMixin.js'
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";
export default {
  name: "notifications",
  mixins: [validationMixin, userMixin, rolesMixin],
  data() {
    return {
      options: {
        Keyword: "",
        isActive: true,
        SkipCount: 0
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
        { key: "actions", label: "Actions" }
      ],
      items: []
    };
  },
  validations: {
    form: {
      firstname: {
        required,
        minLength: minLength(3)
      },
      lastname: {
        required,
        minLength: minLength(3)
      },
      emailAddress: {
        required,
        minLength: minLength(3)
      },
      phoneNumber: {
        required,
        minLength: minLength(3)
      },
      type: {
        required
      }
    }
  },
  watch: {
    currentPage(newPage) {
      this.options.SkipCount = this.perPage * (newPage - 1);
      this.getUsersList();
    }
  },
  computed: {
  },
  methods: {
    searchUser() {
      this.options.Keyword = this.search;
      this.getUsersList();
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
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
    validateUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
    getUsersList() {
      this.$showLoader();
      this.disabledSearch = true;
      const list = this.$userService.getAllUsers(this.options).then(res => {
        if (res.success) {
          res.data.items.map(item => {
            item.user_type = item.roleNames.join(", ");
            return item;
          });
          this.items = res.data.items;
          this.totalCount = res.data.totalCount;
        }
        this.$hideLoader();
        this.disabledSearch = false;
      });
    }
  },
  mounted() {
    this.getUsersList();
  }
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