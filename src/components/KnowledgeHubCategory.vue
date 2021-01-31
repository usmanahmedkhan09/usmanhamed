<template>
  <div class="hello">
    <b-row align-h="between" align-v="center">
      <b-col cols="5">
        <img @click="$router.go(-1)" src="/images/icons/back.png" />
        <h4 style="font-weight: 600" class="d-inline pr-3">
          إدارة مركز المعرفة / الفئات
        </h4>
      </b-col>
      <b-col cols="6" class="text-align-left-right" v-if="hasOnlyAdminRole">
        <button
          class="btn md-primary main-btn border-radius comman-gradient mx-1"
          @click="addCreateCategoryDialog"
        >
          إنشاء فئة جديدة
        </button>
      </b-col>
    </b-row>

    <div class="main-card py-4 mt-4">
      <template>
        <h4 class="px-4">قائمة الفئات</h4>
        <b-table
          class="mt-4"
          striped
          hover
          :items="knowledgeCategoryItems"
          :fields="fields"
        >
          <template v-slot:cell(actions)="data">
            <b class="text-info">
              <button
                class="btn md-primary main-btn border-radius view"
                @click="
                  showDetail(data.item);
                  update = true;
                "
              >
                تحديث
              </button>
              <button
                class="btn md-delete main-btn border-radius delete m-1"
                @click="onDelete(data.item)"
              >
                حذف
              </button>
            </b>
          </template>
        </b-table>

        <h5 v-if="knowledgeCategoryItems.length == 0" class="text-center">
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
      style="max-height: 40% !important"
      :md-active.sync="isCreateCategoryDialog"
    >
      <md-dialog-title></md-dialog-title>
      <div class="px-5">
        <h4 style="font-weight: 600">{{ headerText }}</h4>

        <b-row align-v="center" class="mt-4" style="width: 100%">
          <b-col cols="4">
            <md-field>
              <label for="title">عنوان الفئة</label>

              <md-input
                name="title"
                id="title"
                autocomplete="given-name"
                v-model="categoryName"
                :disabled="sending"
              />
            </md-field>
          </b-col>
        </b-row>
        <div style="display: block; width: 100%; text-align: right">
          <a
            class="btn md-primary main-btn border-radius cancel-btn"
            @click="isCreateCategoryDialog = false"
            >{{ $t("cancel") }}</a
          >
          <button
            class="btn md-primary main-btn border-radius comman-gradient create-btn"
            style="width: auto"
            :disabled="sending || !categoryName"
            @click="addCategory"
          >
            {{ buttonText }}
          </button>
        </div>
      </div>
      <md-dialog-actions></md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import rolesMixin from "../mixins/RolesMixins.js";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
export default {
  name: "knowledgeHub",
  mixins: [validationMixin, rolesMixin],
  data() {
    return {
      options: {
        Keyword: "",
        isActive: true,
        SkipCount: 0,
      },
      categoryName: null,
      categoryId: 0,
      isEdit: false,
      buttonText: "إنشاء فئة",
      headerText: "إنشاء فئة جديدة",
      knowledgeItems: [],
      fields: [
        // "id",
        { key: "id", label: "#" },
        { key: "categoryName", label: "عنوان الفئة" },
        { key: "actions", label: this.$t("action") },
      ],
      knowledgeCategoryItems: [],
      perPage: 10,
      disabledSearch: false,
      totalCount: 0,
      isCreateDialog: false,
      isCreateCategoryDialog: false,
      search: null,
      userSaved: false,
      sending: false,
      lastUser: null,
      currentPage: 1,
      items: [],
    };
  },

  watch: {
    currentPage(newPage) {
      this.options.SkipCount = this.perPage * (newPage - 1);
      this.getCategoryList();
    },
  },
  computed: {},
  methods: {
    onDelete(item) {
      this.$showLoader();
      this.$KnowledgeHubCategoryService.delete(item.id).then((res) => {
        if (res.success) {
          this.getCategoryList();
        } else {
          this.$swal({
            icon: "error",
            type: "error",
            title: res.message.message,
          });
        }
      });

      this.$hideLoader();
    },
    addCreateCategoryDialog() {
      this.buttonText = "إنشاء فئة";
      this.headerText = "إنشاء فئة جديدة";
      this.categoryName = null;
      this.categoryId = 0;
      this.isEdit = false;
      this.isCreateCategoryDialog = true;
    },
    showDetail(item) {
      this.isEdit = true;
      this.buttonText = this.$t("update");
      this.headerText = "تحديث الفئة";
      this.categoryName = item.categoryName;
      this.categoryId = item.id;
      this.isCreateCategoryDialog = true;
    },
    searchUser() {
      this.options.Keyword = this.search;
      this.getCategoryList();
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
      this.form.title = null;
      this.form.description = null;
      this.form.type = null;
    },

    addCategory() {
      this.$showLoader();
      if (this.isEdit) {
        var data = {
          categoryName: this.categoryName,
          id: this.categoryId,
        };

        this.$showLoader();
        this.$KnowledgeHubCategoryService.update(data).then((res) => {
          if (res.success) {
            this.getCategoryList();
            this.isEdit = false;
            this.buttonText = "إنشاء فئة";
            this.headerText = "إنشاء فئة جديدة";
            this.categoryName = null;
            this.isCreateCategoryDialog = false;
          } else {
            this.$swal({
              icon: "error",
              type: "error",
              title: res.message.message,
            });
          }
        });
      } else {
        var data = {
          categoryName: this.categoryName,
        };

        this.$showLoader();
        this.$KnowledgeHubCategoryService
          .createKnowledgeCategory(data)
          .then((res) => {
            if (res.success) {
              this.getCategoryList();
              this.categoryName = null;
              this.isCreateCategoryDialog = false;
            } else {
              this.$swal({
                icon: "error",
                type: "error",
                title: res.message.message,
              });
            }
          });
      }

      this.$hideLoader();
    },
    getCategoryList() {
      this.$showLoader();
      const list = this.$KnowledgeHubCategoryService
        .getAllData(this.options)
        .then((res) => {
          if (res.success) {
            this.knowledgeCategoryItems = [];
            this.knowledgeCategoryItems = res.data.items;
            this.totalCount = res.data.totalCount;
          }
          this.$hideLoader();
        });
    },
  },
  mounted() {
    this.getCategoryList();
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
