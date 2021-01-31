<template>
  <div class="hello">
    <b-row class="mb-2" align-h="between" align-v="center">
      <b-col cols="5">
        <h4 v-if="!hasOnlyAdminRole" style="font-weight: 600">
          {{ $t("knowledgehub") }}
        </h4>
        <h4 v-if="hasOnlyAdminRole" style="font-weight: 600">
          {{ $t("knowledgeHubAdmin") }}
        </h4>
      </b-col>
      <b-col cols="6" class="text-align-left-right" v-if="hasOnlyAdminRole">
        <button
          class="btn md-primary main-btn border-radius comman-gradient mx-1"
          @click="isCreateDialog = true"
        >
          {{ $t("createNewItem") }}
        </button>
        <button
          class="btn md-primary main-btn border-radius comman-gradient mx-1"
          @click="onListOfCategory"
        >
          قائمة الفئات
        </button>
      </b-col>
    </b-row>
    <div class="main-card p-4 mt-4">
      <h4>البحث في مركز المعرفة</h4>
      <b-row align-v="center" class="mt-4">
        <b-col cols="5">
          <b-form-input
            class="border-radius-5"
            placeholder="البحث في مركز المعرفة"
            v-model="search"
            :disabled="disabledSearch"
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
            style="width: 100%"
            :disabled="!search || !filterSelected"
            @click="searchKnowledge"
          >
            البحث في مركز المعرفة
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
    <div v-if="dataToShow">
      <div v-for="itemM in knowledgeCategoryItems" v-bind:key="itemM">
        <div v-if="itemM.itemArray.length > 0" class="mt-4 py-2 onClick">
          <img
            src="/images/icons/plus.png"
            style="
              width: 30px;
              margin-right: 15px;
              top: -6px;
              position: relative;
            "
            alt
          />
          <h4
            style="display: inline-block; margin: 0; vertical-align: super"
            class="px-4 font-weight-bold"
          >
            {{ itemM.categoryName }}
          </h4>
        </div>
        <div class="onClickHide" style="background: #eeeeee">
          <b-row
            v-if="itemM.itemArray.length > 0"
            align-v="center"
            class="mt-1 mx-2"
          >
            <b-col
              class="my-3"
              cols="4"
              v-for="item in itemM.itemArray"
              v-bind:key="item"
            >
              <div
                class="border-radius-10 p-4"
                :title="item.description"
                style="
                  background: #1cb2b8;
                  color: white !important;
                  min-height: 142px;
                  box-shadow: -6px 9px 12px #cfcfcf !important;
                  position: relative;
                "
              >
                <img
                  v-if="hasOnlyAdminRole"
                  src="/images/icons/close.png"
                  @click="onDelete(item)"
                  style="
                    width: 25px;
                    float: left;
                    position: absolute;
                    left: -14px;
                    top: -14px;
                    cursor: pointer;
                  "
                  alt
                />
                <b-row align-v="top">
                  <b-col cols="8">
                    <h4>{{ item.title }}</h4>
                  </b-col>
                  <b-col cols="4" class="text-align-left-right">
                    <img src="/images/icons/sidebar/knowledge.png" alt />
                    <a
                      v-if="item.uploadKnowledges.length > 0"
                      :href="
                        'http://3.124.65.120' +
                          item.uploadKnowledges[
                            item.uploadKnowledges.length - 1
                          ].filePath
                      "
                      target="_blank"
                    >
                      <span
                        class="d-block mt-5"
                        style="font-size: 16px; color: white"
                        >{{ $t("goToThePage") }}</span
                      >
                    </a>
                  </b-col>
                </b-row>
              </div>
            </b-col>
            <!-- <span v-if="knowledgeCategoryItems.itemArray.length == 0">No Item for this category</span> -->
          </b-row>
        </div>
      </div>
    </div>

    <md-dialog :md-active.sync="isCreateDialog">
      <md-dialog-title></md-dialog-title>
      <div class="px-5">
        <h4 style="font-weight: 600">{{ $t("createNewItem") }}</h4>

        <form novalidate class="md-layout" @submit.prevent="validateUser">
          <b-row align-v="center" class="mt-4" style="width: 100%">
            <b-col cols="4">
              <md-field :class="getValidationClass('title')">
                <label for="title">{{ $t("enterTitle") }}</label>

                <md-input
                  name="title"
                  id="title"
                  autocomplete="given-name"
                  v-model="form.title"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.title.required"
                  >يجب التعبئة</span
                >
                <span class="md-error" v-else-if="!$v.form.title.minlength"
                  >title required</span
                >
              </md-field>
            </b-col>
            <b-col cols="4">
              <md-field :class="getValidationClass('categoryId')">
                <label for="categoryId">الفئة</label>
                <md-select
                  name="categoryId"
                  id="categoryId"
                  v-model="form.categoryId"
                  md-dense
                >
                  <md-option :value="null">{{
                    $t("selectAnOption")
                  }}</md-option>
                  <md-option
                    v-for="(item, index) in knowledgeCategoryItems"
                    v-bind:key="index"
                    :value="item.id"
                    >{{ item.categoryName }}</md-option
                  >
                </md-select>

                <span class="md-error" v-if="!$v.form.categoryId.required"
                  >يجب التعبئة</span
                >
                <span class="md-error" v-else-if="!$v.form.categoryId.minlength"
                  >categoryName required</span
                >
              </md-field>
            </b-col>
            <b-col cols="6">
              <md-field :class="getValidationClass('description')">
                <label for="description">{{ $t("enterDescription") }}</label>
                <md-textarea
                  autocomplete="given-name"
                  v-model="form.description"
                ></md-textarea>
                <span class="md-error" v-if="!$v.form.description.required"
                  >يجب التعبئة</span
                >
              </md-field>
            </b-col>

            <b-col cols="6"></b-col>
            <b-col cols="">
              <md-field :class="getValidationClass('type')">
                <label for="type">{{ $t("selectAudience") }}</label>

                <md-select name="type" id="type" v-model="form.type" md-dense>
                  <md-option :value="null">تحديد خيار</md-option>
                  <md-option value="cse">مركز تحقيق كفاءة الإنفاق</md-option>
                  <md-option value="entity">الجهات</md-option>
                  <md-option value="both">الكل</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.form.type.required"
                  >يجب التعبئة</span
                >
                <span class="md-error" v-else-if="!$v.form.type.minlength"
                  >Invalid type</span
                >
              </md-field>
            </b-col>

            <b-col cols="6"></b-col>
            <b-col cols="4">
              <!-- <md-field :class="getValidationClass('uploadFile')"> -->
              <label class="file">{{ $t("uploadAttachment") }}</label>
              <!-- <md-file v-model="form.uploadFile" @change="handleFileUpload($event)" /> -->
              <input
                class="mb-3"
                type="file"
                id="imageUpload"
                ref="file"
                name="file"
                placeholder="NOOOO"
              />
              <!-- <span class="md-error" v-if="!$v.form.uploadFiles.required">uploadFile is required</span> -->
              <!-- </md-field> -->
            </b-col>
          </b-row>
          <div style="display: block; width: 100%; text-align: right">
            <a
              class="btn md-primary main-btn border-radius cancel-btn"
              @click="isCreateDialog = false"
              >{{ $t("cancel") }}</a
            >
            <button
              class="btn md-primary main-btn border-radius comman-gradient create-btn"
              style="width: auto"
              :disabled="sending"
            >
              {{ $t("createNewItem") }}
            </button>
          </div>
        </form>
      </div>
      <md-dialog-actions></md-dialog-actions>
    </md-dialog>

    <md-dialog :md-active.sync="isCreateCategoryDialog">
      <md-dialog-title></md-dialog-title>
      <div class="px-5">
        <h4 style="font-weight: 600">Create New Category</h4>

        <b-row align-v="center" class="mt-4" style="width: 100%">
          <b-col cols="4">
            <md-field>
              <label for="title">Category Name</label>

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
            Create New Category
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
import $ from "jquery";
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
      filterOptions: [
        {
          value: null,
          text: "الرجاء التحديد من القائمة ادناه",
          disabled: true,
        },
        { value: "Title", text: "العنوان" },
        { value: "Description", text: this.$t("description") },
      ],
      filterSelected: null,
      options: {
        Keyword: "",
        isActive: true,
        SkipCount: 0,
      },
      dataToShow: false,
      categoryName: null,
      knowledgeItems: [],
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
      form: {
        title: null,
        categoryId: null,
        description: null,
        type: null,
      },
      // Note `isActive` is left out and will not appear in the rendered table
      // fields: [
      //   "id",
      //   "fullName",
      //   "emailAddress",
      //   "phoneNumber",
      //   "user_type",
      //   { key: "actions", label: "Actions" }
      // ],
      items: [],
    };
  },
  validations: {
    form: {
      title: {
        required,
        minLength: minLength(3),
      },
      description: {
        required,
      },
      type: {
        required,
      },
      categoryId: {
        required,
      },
      uploadFiles: {
        required,
      },
    },
  },
  watch: {
    currentPage(newPage) {
      this.options.SkipCount = this.perPage * (newPage - 1);
      this.getKnowledgeList();
    },
  },
  computed: {},
  methods: {
    onDelete(item) {
      this.$swal({
        icon: "warning",
        title: "حذف ملف!",
        text: "الرجاء تأكيد حذف الملف.",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "نعم",
        cancelButtonText: "كلا",
      }).then((willDelete) => {
        if (willDelete.value) {
          this.$showLoader();
          this.$knowledgeHubService.delete(item.id).then((res) => {
            if (res.success) {
              this.dataToShow = false;
              this.getCategoryList();
            }
            this.disabledSearch = false;
          });
        }
      });
    },

    onListOfCategory() {
      this.$router.push("/main/knowledge_hub/category");
    },

    searchUser() {
      this.options.Keyword = this.search;
      this.getKnowledgeList();
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
      var data = {
        categoryName: this.categoryName,
      };
      this.$KnowledgeHubCategoryService
        .createKnowledgeCategory(data)
        .then((res) => {
          if (res.success) {
            this.categoryName = null;
            this.isCreateCategoryDialog = false;
          } else {
            this.$swal({
              icon: "error",
              type: "error",
              title: res.message.message,
            });
          }
          this.$hideLoader();
        });
    },

    getCategoryList() {
      this.$showLoader();
      const list = this.$KnowledgeHubCategoryService
        .getAllData(this.options)
        .then((res) => {
          if (res.success) {
            this.knowledgeCategoryItems = [];
            this.knowledgeCategoryItems = res.data.items;

            for (let i = 0; i < this.knowledgeCategoryItems.length; i++) {
              this.knowledgeCategoryItems[i].itemArray = [];
            }
            this.getKnowledgeList();
          }
          // this.$hideLoader();
        });
    },
    saveKnowledgeHub() {
      let formData = new FormData();
      console.log("outside");
      if (this.$refs.file.files[0]) {
        console.log("inside");
        formData.append("uploadFiles", this.$refs.file.files[0]);
        formData.append("obj", JSON.stringify(this.form));
        this.$showLoader();
        this.dataToShow = false;
        this.$knowledgeHubService.createKnowledge(formData).then((res) => {
          if (res.success) {
            this.getCategoryList();
            this.clearForm();
            this.isCreateDialog = false;
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
      } else {
        this.$swal({
          icon: "error",
          type: "error",
          title: "الرجاء إرفاق الملف",
          confirmButtonText: $t("ok"),
        });
      }
    },
    checkUser(payload) {
      if (payload.title == null) {
        return false;
      } else if (payload.description == null) {
        return false;
      } else if (payload.type == null) {
        return false;
      } else if (payload.categoryId == null) {
        return false;
      } else {
        return true;
      }
    },
    validateUser() {
      this.$v.$touch();
      let valid = this.checkUser(this.form);
      console.log("valid", valid);
      if (valid) {
        this.saveKnowledgeHub();
      }
    },

    clearSearch() {
      this.options.Keyword = "";
      this.options.Column = "";
      this.search = "";
      this.filterSelected = null;
      this.dataToShow = false;
      this.getKnowledgeList();
    },

    searchKnowledge() {
      if (this.filterSelected && this.search) {
        this.options.Keyword = this.search;
        this.options.Column = this.filterSelected;
        this.dataToShow = false;
        this.getKnowledgeList();
      }
    },

    getKnowledgeList() {
      this.$showLoader();
      const list = this.$knowledgeHubService
        .getAllData(this.options)
        .then((res) => {
          if (res.success) {
            this.knowledgeItems = [];
            this.knowledgeItems = res.data.items;
            this.totalCount = res.data.totalCount;

            for (let i = 0; i < this.knowledgeCategoryItems.length; i++) {
              this.knowledgeCategoryItems[i].itemArray = [];
              for (let j = 0; j < this.knowledgeItems.length; j++) {
                if (
                  this.knowledgeCategoryItems[i].id ==
                  this.knowledgeItems[j].categoryId
                ) {
                  this.knowledgeCategoryItems[i].itemArray.push(
                    this.knowledgeItems[j]
                  );
                }
              }
            }
            this.dataToShow = true;
            $(document).ready(function() {
              $(".onClick").on("click", function(e) {
                e.preventDefault();

                var $this = $(this);
                // $(".onClickHide").removeClass("displayInline");
                $this.toggleClass("open");
                $this.siblings(".onClickHide").toggleClass("displayInline");

                if ($this.siblings(".onClickHide").hasClass("displayInline")) {
                } else {
                }
                if ($this.hasClass("open")) {
                  $this.css("background-color", "white");
                  $this.children("img").attr("src", "/images/icons/minus.png");
                } else {
                  $this.children("img").attr("src", "/images/icons/plus.png");
                  $this.css("background-color", "#E5E5E5");
                }
              });
            });
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
.onClick {
  cursor: pointer;
  transition: 0.5s all;
  border-right: 8px solid #4fa192;
  background: #e5e5e5;
}
.onClickHide {
  transition: 0.5s all;
  display: none;
}
.displayInline {
  display: block;
  -webkit-animation: slide-down 0.3s ease-out;
  -moz-animation: slide-down 0.3s ease-out;
}
.hehe {
}
@-webkit-keyframes slide-down {
  0% {
    opacity: 0;
    -webkit-transform: translateY(-10%);
  }
  50% {
    opacity: 1;
    -webkit-transform: translateY(0);
  }
}
@-moz-keyframes slide-down {
  0% {
    opacity: 0;
    -moz-transform: translateY(-10%);
  }
  50% {
    opacity: 1;
    -moz-transform: translateY(0);
  }
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
