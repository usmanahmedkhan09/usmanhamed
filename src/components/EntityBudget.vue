<template>
  <div class="hello">
    <b-row align-h="between" align-v="center">
      <b-col cols="3">
        <h4 style="font-weight: 600;">
          Entity Budget [{{ $route.params.tenant_name }}]
        </h4>
      </b-col>
      <b-col cols="3" class="text-align-left-right">
        <button
          class="btn md-primary main-btn border-radius-5"
          @click="onAddBudget()"
        >
          Add Budget
        </button>
      </b-col>
    </b-row>

    <!-- <div class="main-card p-4 mt-4">
      <h4>{{$t('searchEntity')}}</h4>
      <b-row align-v="center" class="mt-4">
        <b-col cols="10">
          <b-form-input class="border-radius-5" :placeholder="$t('searchEntity')" v-model="search" :disabled="disabledSearch" v-on:keyup.enter="searchEntity()"></b-form-input>
        </b-col>
      
        <b-col cols="2">
          <button class="btn md-primary main-btn border-radius-5" style="width:100%" :disabled="disabledSearch" @click="searchEntity">{{$t('searchEntity')}}</button>
        </b-col>
      </b-row>
    </div>-->

    <div class="main-card py-4 mt-4">
      <template>
        <h4 class="px-4 mb-3">List of Entity Budget</h4>
        <b-table
          class="top-radius"
          striped
          hover
          :items="items"
          :fields="fields"
        >
          <template v-slot:cell(amount)="data">
            {{ formatAsCurrency(data.item.amount) }}
          </template>
          <template v-slot:cell(actions)="data">
            <b class="text-info">
              <button
                class="btn md-primary main-btn border-radius-5 view"
                @click="showDetail(data.item)"
              >
                {{ $t("edit") }}
              </button>
              <button
                class="btn md-delete main-btn border-radius-5 delete m-1"
                @click="onDelete(data.item)"
              >
                حذف
              </button>
            </b>
          </template>
        </b-table>

        <h5 v-if="items.length == 0" class="text-center">
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
        </div> -->
      </template>
    </div>

    <md-dialog
      style="max-height: 40% !important; "
      :md-active.sync="isCreateDialogBudget"
    >
      <md-dialog-title></md-dialog-title>
      <div class="px-5">
        <h4 style="font-weight: 600;">
          {{ isEdit == true ? $t("updatebudget") : $t("addbudget") }}
        </h4>

        <form novalidate class="md-layout" @submit.prevent="validateUser">
          <b-row align-v="center" class="mt-4" style="width:100%">
            <b-col cols="4">
              <md-field :class="getValidationClass('amount')">
                <label for="amount">الميزانيّة </label>

                <md-input
                  name="amount"
                  @keypress="onlyNumber"
                  id="amount"
                  autocomplete="given-name"
                  v-model="form.amount"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.amount.required"
                  >amount is required</span
                >
                <span class="md-error" v-else-if="!$v.form.amount.minlength"
                  >amount is required</span
                >
              </md-field>
            </b-col>
            <b-col cols="4">
              <md-field :class="getValidationClass('year')">
                <label for="year">السنة</label>
                <md-select
                  name="year"
                  id="year"
                  v-model="form.year"
                  md-dense
                  :disabled="sending"
                >
                  <md-option :value="null">{{
                    $t("selectAnOption")
                  }}</md-option>
                  <md-option value="2020">2020</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.form.year.required"
                  >year is required</span
                >
                <span class="md-error" v-else-if="!$v.form.year.minlength"
                  >year is required</span
                >
              </md-field>
            </b-col>
          </b-row>
          <div
            style=" display: block; width: 100%; text-align: right;"
            v-if="hasAdminRole && !hasEntityRole && !hasCSERole"
          >
            <a
              class="btn md-primary main-btn border-radius-5 cancel-btn"
              @click="isCreateDialogBudget = false"
              >{{ $t("cancel") }}</a
            >
            <button
              @click="isCreateDialogBudget = false"
              class="btn md-primary main-btn border-radius-5 create-btn"
              :disabled="sending"
            >
              {{ isEdit == true ? $t("updatebudget") : $t("addbudget") }}
            </button>
          </div>
        </form>
      </div>
      <md-dialog-actions></md-dialog-actions>
    </md-dialog>
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
  name: "entityBudget",
  mixins: [validationMixin, rolesMixin],
  data() {
    return {
      isEdit: false,
      isCreateDialogBudget: false,
      totalCount: 0,
      options: {
        Keyword: "",
        // isActive: true,
        SkipCount: 0,
      },
      perPage: 10,
      search: "",
      disabledSearch: false,
      form: {
        amount: null,
        year: null,
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
        // { key: "id", label: "Id" },
        // { key: "tenantId", label: "Entity Id" },
        { key: "year", label: "Year" },
        { key: "amount", label: "Amount" },
        { key: "actions", label: "Actions" },
      ],
    };
  },
  validations: {
    form: {
      amount: {
        required,
      },
      year: {
        required,
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
    formatAsCurrency(value) {
      if (value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
    onDelete(item) {
      this.$swal({
        icon: "warning",
        title: "Delete Budget!",
        text: "Are you sure you want to delete this Budget?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then((willDelete) => {
        if (willDelete.value) {
          this.$showLoader();
          this.showActivity = false;
          this.$entityBudgetService.delete(item.id).then((res) => {
            if (res.success) {
              this.getEntityBudgetList();
            }
            this.showActivity = true;
            this.$hideLoader();
            this.disabledSearch = false;
          });
        }
      });
    },
    onAddBudget() {
      this.form.amount = null;
      this.form.year = null;
      this.form.id = 0;
      this.form.tenantId = "";
      this.isEdit = false;
      this.isCreateDialogBudget = true;
    },
    showDetail(item) {
      this.form.amount = item.amount;
      this.form.year = item.year;
      this.form.id = item.id;
      this.form.tenantId = item.tenantId;
      this.isEdit = true;
      this.isCreateDialogBudget = true;
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    },
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
    saveBudget() {
      this.sending = true;
      this.form.tenantId = this.$route.params.tenant_id;
      this.$entityBudgetService
        .createBudget(this.form)
        .then((res) => {
          if (res.success) {
            this.$swal({
              icon: "success",
              type: "success",
              title: "تم إنشاء الجهة الجديدة بنجاح",
              button: $t("ok"),
            }).then(() => {
              this.isCreateDialogBudget = false;
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
    updateBudget() {
      this.sending = true;
      this.$entityBudgetService
        .updateBudget(this.form)
        .then((res) => {
          if (res.success) {
            this.$swal({
              icon: "success",
              type: "success",
              title: "تم إنشاء الجهة الجديدة بنجاح",
              button: $t("ok"),
            }).then(() => {
              this.isCreateDialogBudget = false;
              this.getEntityBudgetList();
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
      console.log(this.isCreateDialogBudget);
      this.$v.$touch();
      this.isCreateDialogBudget = !this.isCreateDialogBudget;
      if (!this.$v.$invalid) {
        if (!this.isEdit) {
          this.saveBudget();
          this.isCreateDialogBudget = !this.isCreateDialogBudget;
        } else {
          this.updateBudget();
          this.isCreateDialogBudget = !this.isCreateDialogBudget;
        }
      }
    },
    getEntityBudgetList() {
      this.disabledSearch = true;
      this.$showLoader();
      const list = this.$entityBudgetService
        .getEnityBudget(this.$route.params.tenant_id)
        .then((res) => {
          if (res.success) {
            this.items = [];
            this.items = res.data;
            // this.totalCount = res.data.totalCount;
          }
          this.disabledSearch = false;
          this.$hideLoader();
        });
    },
  },
  mounted() {
    this.getEntityBudgetList();
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
