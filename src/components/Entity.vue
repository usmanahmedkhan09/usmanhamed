<template>
  <div class="hello">
    <b-row align-h="between" align-v="center">
      <b-col cols="3">
        <h4 style="font-weight: 600;">{{ $t("entityManagementHeading") }}</h4>
      </b-col>
      <b-col
        cols="3"
        class="text-align-left-right"
        v-if="hasAdminRole && !hasEntityRole && !hasCSERole"
      >
        <button
          class="btn md-primary main-btn border-radius comman-gradient"
          @click="isCreateDialog = true"
        >
          {{ $t("createNewEntity") }}
        </button>
      </b-col>
    </b-row>

    <div class="main-card p-4 mt-4">
      <h4>{{ $t("searchEntity") }}</h4>
      <b-row align-v="center" class="mt-4">
        <b-col cols="5">
          <b-form-input
            class="border-radius-5"
            :placeholder="$t('searchEntity')"
            v-model="search"
            :disabled="disabledSearch"
            v-on:keyup.enter="searchEntity()"
          ></b-form-input>
        </b-col>
        <b-col cols="3">
          <b-form-select
            v-model="filterSelected"
            :options="filterOptions"
          ></b-form-select>
        </b-col>
        <!-- <b-col cols="2">
          <b-form-select id="input-3" v-model="selectSearch" :options="entitySearch" required>
            <template v-slot:first>
              <b-form-select-option :value="null" disabled Selected>{{$t('selectAnOption')}}</b-form-select-option>
            </template>
          </b-form-select>
        </b-col>-->
        <b-col cols="2">
          <button
            class="btn md-primary main-btn border-radius comman-gradient"
            style="width:100%"
            :disabled="!search || !filterSelected"
            @click="searchEntity"
          >
            {{ $t("searchEntity") }}
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
        <h4 class="px-4">{{ $t("listOfEntities") }}</h4>
        <b-table
          class="top-radius"
          striped
          hover
          :items="items"
          :fields="fields"
        >
          <template v-slot:cell(actions)="data">
            <b class="text-info">
              <button
                class="btn md-primary main-btn border-radius view"
                @click="onView(data.item)"
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
          <template v-slot:cell(description)="data">{{
            data.item.description ? data.item.description : "N/A"
          }}</template>
          <template v-slot:cell(typeName)="data">{{
            data.item.entityType ? data.item.entityType.typeName : "N/A"
          }}</template>
          <!-- <template
            v-slot:cell(tenantType)="data"
          >{{data.item.tenantType ? data.item.tenantType : 'N/A'}}</template> -->
          <!-- <template
            v-slot:cell(tenantType)="data"
          >{{data.item.tenantType == "Entity Type 1"? 'الفئة 1' : data.item.tenantType == "Entity Type 2"? 'الفئة 2' : data.item.tenantType == "Entity Type 3"? 'الفئة 3' : data.item.tenantType == "Entity Type 4"? 'الفئة 4' : 'N/A' }}</template> -->
          <template v-slot:cell(sector)="data">{{
            data.item.entitySector ? data.item.entitySector.sectorName : "N/A"
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

    <md-dialog
      style="max-height: 50% !important; "
      :md-active.sync="isCreateDialog"
    >
      <md-dialog-title></md-dialog-title>
      <div class="px-5">
        <h4 style="font-weight: 600;">{{ $t("createNewEntity") }}</h4>

        <form novalidate class="md-layout" @submit.prevent="validateUser">
          <b-row align-v="center" class="mt-4" style="width:100%">
            <b-col cols="4">
              <md-field :class="getValidationClass('entitytitle')">
                <label for="entitytitle">{{ $t("name") }}</label>

                <md-input
                  name="entitytitle"
                  id="entitytitle"
                  autocomplete="given-name"
                  v-model="form.tenancyName"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.tenancyName.required"
                  >entitytitle is required</span
                >
                <span
                  class="md-error"
                  v-else-if="!$v.form.tenancyName.minlength"
                  >entitytitle password</span
                >
              </md-field>
            </b-col>
            <b-col cols="4">
              <md-field :class="getValidationClass('type')">
                <label for="type">الفئة</label>
                <md-select
                  name="type"
                  id="type"
                  v-model="form.entityTypeID"
                  md-dense
                  :disabled="sending"
                >
                  <md-option
                    v-for="(entity, index) in entityType"
                    :key="index"
                    :value="entity.id"
                    >{{ entity.typeName }}</md-option
                  >
                </md-select>
              </md-field>
            </b-col>
            <b-col cols="4">
              <md-field :class="getValidationClass('sector')">
                <label for="sector">{{ $t("sector") }}</label>
                <md-select
                  name="sector"
                  id="sector"
                  v-model="form.entitySectorID"
                  md-dense
                  :disabled="sending"
                >
                  <md-option
                    v-for="(sector, index) in entitySectors"
                    :key="index"
                    :value="sector.id"
                    >{{ sector.sectorName }}</md-option
                  >
                </md-select>
                <span class="md-error" v-if="!$v.form.entitySectorID.required"
                  >sector is required</span
                >
              </md-field>
            </b-col>

            <!-- <b-col cols="12">
              <md-field :class="getValidationClass('description')">
                <label for="description">{{ $t("description") }}</label>

                <md-input
                  name="description"
                  id="description"
                  autocomplete="given-name"
                  v-model="form.description"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.description.required"
                  >description is required</span
                >
                <span
                  class="md-error"
                  v-else-if="!$v.form.description.minlength"
                  >Invalid description</span
                >
              </md-field>
            </b-col> -->
          </b-row>
          <div
            style=" display: block; width: 100%; text-align: right;"
            v-if="hasAdminRole && !hasEntityRole && !hasCSERole"
          >
            <a
              class="btn md-primary main-btn border-radius cancel-btn"
              @click="isCreateDialog = false"
              >{{ $t("cancel") }}</a
            >
            <button
              class="btn md-primary main-btn border-radius comman-gradient create-btn"
              :disabled="sending"
            >
              {{ $t("createNewEntity") }}
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
  name: "entity",
  mixins: [validationMixin, rolesMixin],
  data() {
    return {
      filterOptions: [
        {
          value: null,
          text: "الرجاء التحديد من القائمة ادناه",
          disabled: true,
        },
        { value: "Name", text: this.$t("name") },
        // { value: "Description", text: this.$t("description") },
        { value: "SectorName", text: this.$t("sector") },
      ],
      filterSelected: null,
      isCreateDialog: false,
      totalCount: 0,
      options: {
        Keyword: "",
        // isActive: true,
        SkipCount: 0,
      },
      perPage: 10,
      search: "",
      disabledSearch: false,
      entitySectors: [],
      entityType: [],
      form: {
        tenancyName: null,
        // tenantType: null,
        entitySectorID: null,
        isActive: true,
        // description: null,
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
        { key: "name", label: this.$t("name") },
        // { key: "description", label: this.$t("description") },
        { key: "sector", label: this.$t("sector") },
        { key: "typeName", label: this.$t("categoryEntity") },
        { key: "isActive", label: this.$t("status") },
        { key: "actions", label: this.$t("action") },
      ],
    };
  },
  validations: {
    form: {
      tenancyName: {
        required,
        minLength: minLength(3),
      },
      entitySectorID: {
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
      this.options.SkipCount = this.perPage * (newPage - 1);
      this.getEntitiesList();
    },
  },
  methods: {
    clearSearch() {
      this.options.Keyword = "";
      this.options.Column = "";
      this.search = "";
      this.filterSelected = null;
      this.getEntitiesList();
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
      if (this.filterSelected && this.search) {
        this.options.Keyword = this.search;
        this.options.Column = this.filterSelected;
        this.getEntitiesList();
      }
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
            this.isCreateDialog = false;
            this.getEntitiesList();
            this.$swal({
              icon: "success",
              type: "success",
              title: "تم إنشاء الجهة الجديدة بنجاح",
              confirmButtonText: "موافق",
            }).then(() => {
              this.isCreateDialog = false;
              this.form.id = res.data.id;
              // this.items.unshift(this.form);
              this.getEntitiesList();
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
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveEntity();
      }
    },
    getEntitiesList() {
      this.disabledSearch = true;
      this.$showLoader();
      const list = this.$entityService
        .getAllTenants(this.options)
        .then((res) => {
          if (res.success) {
            this.items = res.data.items;
            this.totalCount = res.data.totalCount;
          }
          this.disabledSearch = false;
          this.$hideLoader();
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
    this.getEntitiesList();
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
