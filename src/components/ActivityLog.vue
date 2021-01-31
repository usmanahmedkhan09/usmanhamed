<template>
  <div class="hello">
    <div
      class="py-3 activity-log"
      v-bind:class="showlog ? '' : 'activity-log-change'"
    >
      <h5 class="px-2 text-center font-weight-bold mb-4">
        {{ $t("activityLog") }}
      </h5>
      <div>
        <div
          style="width: 100%; display: inline-block"
          v-if="fromType == 'list' && filterById > 0"
        >
          <button
            class="btn md-primary main-btn"
            @click="getAllFeedback()"
            style="
              background: #c7d328 !important;
              font-size: 13px;
              width: 100%;
              margin: 0;
              border-radius: 0;
              min-height: 56px;
            "
          >
            Back
          </button>
        </div>

        <div
          style="width: 50%; display: inline-block"
          v-if="fromType == 'form' || (fromType == 'list' && filterById == 0)"
        >
          <button
            class="btn md-primary main-btn"
            @click="onInternal('external')"
            style="
              background: #c7d328 !important;
              font-size: 13px;
              width: 100%;
              margin: 0;
              border-radius: 0;
            "
          >
            {{ $t("activityLogExternal") }}
          </button>
        </div>
        <div
          style="width: 50%; display: inline-block"
          v-if="fromType == 'form' || (fromType == 'list' && filterById == 0)"
        >
          <button
            class="btn md-primary main-btn"
            @click="onInternal('internal')"
            style="
              background-color: #2582c5 !important;
              font-size: 13px;
              width: 100%;
              margin: 0;
              border-radius: 0;
            "
          >
            {{ $t("activityLogInternal") }}
          </button>
        </div>
      </div>
      <div class="px-2 activity-scroll">
        <div
          class="px-4 pb-2 my-2 view-log cyan"
          v-for="(log, index) in dataa"
          v-bind:key="index"
        >
          <span
            style="font-size: 14px; display: block; margin-bottom: 5px"
            v-if="log.action == 'Submitted the report'"
          >
            <strong>{{ log.fromUserName }} [{{ log.fromRoleName }}] :</strong>
            {{ log.action ? $t("submittedTheReport") + log.toRoleName : "n/a" }}
          </span>

          <span
            style="font-size: 14px; display: block; margin-bottom: 5px"
            v-else-if="log.action == 'Returned the report'"
          >
            <strong>{{ log.fromUserName }} [{{ log.fromRoleName }}] :</strong>
            {{ log.action ? $t("returnedTheReport") + log.toRoleName : "n/a" }}
          </span>

          <span
            style="font-size: 14px; display: block; margin-bottom: 5px"
            v-else-if="log.action == 'Initiated the report'"
          >
            <strong>{{ log.fromUserName }} [{{ log.fromRoleName }}] :</strong>
            {{ $t("initiatedTheReport") }}
          </span>

          <span
            style="font-size: 14px; display: block; margin-bottom: 5px"
            v-else-if="log.action == 'Approved the report'"
          >
            <strong>{{ log.fromUserName }} [{{ log.fromRoleName }}]:</strong>
            {{ $t("approvedTheReport") }}
          </span>

          <span
            style="font-size: 14px; display: block; margin-bottom: 5px"
            v-else
          >
            <strong>{{ log.fromUserName }} [{{ log.fromRoleName }}] :</strong>
            {{ $t("givenTheFeedback")
            }}{{ log.initiativeId ? $t("section") : $t("reportSection") }} [
            {{ log.section }} ]
            {{ log.initiativeId ? $t("forTheInitiative") + "[" : "" }}
            {{ log.initiativeId ? log.initiativeName : "" }}
            {{ log.initiativeId ? " ]" : "" }}
          </span>

          <span
            v-if="!log.description"
            style="font-size: 11px; color: #b7b7b7"
            >{{ log.date | formatDate }}</span
          >
          <div
            class="mini-circle"
            v-if="log.description"
            @click="onDescriptionView(log)"
          >
            <span v-if="log.editable" class="more-icon" @click="viewEdit(log)"
              >تعديل</span
            >
            <!-- <img v-if="log.editable" class="more-icon" src="/images/icons/more.png" alt /> -->
            <div class="on-edit-icon">
              <span @click="viewEdit(log)">{{ $t("edit") }}</span>
            </div>
            <span
              style="
                font-size: 11px;
                color: #b7b7b7;
                display: block;
                margin-bottom: 6px;
              "
              >{{ log.date | formatDate }}</span
            >
            <span
              style="
                font-size: 12px;
                font-size: 12px;
                display: inline-block;
                width: 160px;
                white-space: nowrap;
                overflow: hidden !important;
                text-overflow: ellipsis;
              "
              >{{ log.description }}</span
            >
          </div>

          <div class="mt-2 d-block text-align-left-right">
            <span
              v-if="log.initiativeId"
              @click="onView(log.initiativeId)"
              class="p-1"
              style="
                color: #4182c5;
                border: 1px solid #4182c5;
                font-weight: bold;
                font-size: 12px;
                cursor: pointer;
                display: inline-block;
              "
              >الذهاب الى القسم</span
            >
          </div>
        </div>
        <span
          v-if="dataa.length == 0"
          style="display: block; text-align: center; margin-top: 5px"
          >لا توجد ملاحظات حاليا</span
        >
        <!-- <div class="px-4 my-3 view-log cyan" v-for="(log,index) in data" v-bind:key="index">
          <span style="font-size: 14px;display:block; margin-bottom:5px">
            <strong>{{ log.user.name }}[{{log.roleName}}]</strong>
            {{ log.action ? 'has ' + log.action : '' }}.
          </span>
          <span style="font-size: 11px;color:#B7B7B7;">{{log.date | formatDate}}</span>
          <div class="mini-circle" v-if="log.description">
            <span
              style="font-size: 11px;color:#B7B7B7;display:block; margin-bottom: 6px"
            >{{log.date | formatDate}}</span>
            <span style="font-size: 12px;">{{log.description}}</span>
          </div>
        </div>-->
        <feedBackForm
          :data="propData"
          @closePop="closePop"
          @addLogData="addLogData"
          :feedBackFormObj="feedBackFormObj"
          v-if="isReturnBack"
        />
      </div>

      <md-dialog
        class="activityDescription"
        :md-active.sync="isDescriptionModal"
      >
        <md-dialog-title></md-dialog-title>

        <h4 class="px-5" style="font-weight: 600">Description</h4>

        <div class="mx-5 px-2 py-3" style="overflow: auto; border: 2px solid">
          <span style="font-size: 18px">{{
            descriptionModal.description
          }}</span>
        </div>
        <div
          class="px-5 my-4"
          style="display: block; width: 100%; text-align: right"
        >
          <a
            class="btn md-primary main-btn border-radius-5 cancel-btn"
            @click="isDescriptionModal = false"
            >{{ $t("cancel") }}</a
          >
        </div>
        <!-- <md-dialog-actions></md-dialog-actions> -->
      </md-dialog>
    </div>
  </div>
</template>

<script>
import rolesMixin from "../mixins/RolesMixins.js";
import feedBackForm from ".././components/entity/FeedbackForm";
import format from "date-fns/format";
import $ from "jquery";
export default {
  name: "activity-log",
  mixins: [rolesMixin],
  props: [
    "reportId",
    "showlog",
    "dataa",
    "filterById",
    "initiativeId",
    "fromType",
  ],
  components: {
    feedBackForm,
  },
  data() {
    return {
      isDescriptionModal: false,
      descriptionModal: {
        description: null,
        date: null,
      },
      feedbackData: this.dataa,
      firstTime: true,
      mainArray: [],
      externalArray: [],
      internalArray: [],
      mainData: [],
      isExternal: false,
      isEdit: false,
      sending: false,
      options: {},
      isReturnBack: false,
      feedBackFormObj: {},
      propData: {
        sections: ["المبادرات", "الدعم المطلوب", "محضر الاجتماع"],
        type: "Report",
        section: "",
      },
    };
  },
  watch: {
    filterById(newVal, oldVal) {
      if (newVal > 0) {
        var marvelHeroes;
        if (this.firstTime) {
          this.mainArray = this.dataa;
          this.firstTime = false;
        }

        marvelHeroes = this.mainArray.filter(function(aaa) {
          return aaa.initiativeId == newVal && aaa.feedbackType == "external";
        });
        this.data = marvelHeroes;
      }
    },
    dataa(newVal, oldVal) {
      var marvelHeroes;
      if (this.firstTime) {
        this.mainArray = this.dataa;
        this.firstTime = false;
        if (this.initiativeId) {
          if (this.$route.params.initiativeId) {
            var id = this.$route.params.initiativeId;
            marvelHeroes = this.mainArray.filter(function(aaa) {
              return aaa.initiativeId == id;
            });
            this.data = marvelHeroes;
          } else {
            this.data = [];
          }
        }
      }
    },
  },
  computed: {},
  methods: {
    onDescriptionView(item) {
      this.descriptionModal = item;
      this.isDescriptionModal = true;
    },
    getAllFeedback() {
      this.dataa = this.mainArray;
      this.$emit("childToParent", 0);
    },
    onInternal(type) {
      var marvelHeroes;
      if (this.firstTime) {
        this.mainArray = this.dataa;
        this.firstTime = false;
      }
      if (type == "external") {
        marvelHeroes = this.mainArray.filter(function(aaa) {
          return aaa.feedbackType == type;
        });
      }
      if (type == "internal") {
        marvelHeroes = this.mainArray.filter(function(aaa) {
          return aaa.feedbackType == type || aaa.feedbackType == null;
        });
      }

      this.dataa = marvelHeroes;
    },
    onExternal() {
      this.isExternal = true;
      this.mainData = this.externalArray;
    },

    onView(id) {
      this.$router.push(`/main/monthly-report/initiatives-form/${id}`);
    },
    addLogData(data) {
      // this.data.unshift(data);
      if (data.feedbackType == "external") {
        this.externalArray.unshift(data);
      } else {
        this.internalArray.unshift(data);
      }
      if (isExternal) {
        this.mainData = this.externalArray;
      } else {
        this.mainData = this.internalArray;
      }
    },
    viewEdit(data) {
      if (this.$route.name == "initiative-form") {
        this.propData = {};
        data.sections = [
          "معلومات عامة",
          "البيانات المالية والوفورات",
          "الوفورات خلال السنوات المالية",
          "آلية احتساب الوفر",
          "خطة التنفيذ",
          "ملخص خطة التنفيذ",
        ];

        data.type = "FeedBack";
      }

      if (this.$route.name == "all-initiatives") {
        this.propData = {};
        data.sections = ["المبادرات", "الدعم المطلوب", "محضر الاجتماع"];
        data.type = "Report";
      }

      this.feedBackFormObj = data;
      this.propData.mainData = data;
      this.propData.monthlyReportId = data.monthlyReportId;
      this.propData.initiativeId = data.initiativeId;

      this.isReturnBack = true;
    },
    closePop() {
      this.isReturnBack = false;
    },
    findReportTable(currentRole, next) {
      switch (next) {
        case true: {
          if (currentRole == "Entity Initiator") {
            return "Entity Approver";
          } else if (currentRole == "Entity Approver") {
            return "CSE Reviewer A";
          } else if (currentRole == "CSE Reviewer A") {
            return "CSE Reviewer B";
          } else if (currentRole == "CSE Reviewer B") {
            return "CSE Approver";
          }

          break;
        }

        case false: {
          if (currentRole == "CSE Approver") {
            return "CSE Reviewer B";
          } else if (currentRole == "CSE Reviewer B") {
            return "CSE Reviewer A";
          } else if (currentRole == "Entity Approver") {
            return "Entity Initiator";
          }

          break;
        }
      }

      return "";
    },
  },

  created() {
    // for (let i = 0; i < this.data.length; i++) {
    //   if (this.data[i].feedbackType == "external") {
    //     this.externalArray.push(this.data[i]);
    //   } else {
    //     this.internalArray.push(this.data[i]);
    //   }
    // }
    // this.mainData = this.internalArray;
  },
  mounted() {
    setTimeout(function() {
      $(document).ready(function() {
        var $this = $(this);
        $this.siblings(".on-edit-icon").toggleClass("displayInline");
        $(".more-icon").on("click", function(e) {
          // e.preventDefault();
          // $this.siblings(".on-edit-icon").toggleClass("displayInline");
        });
      });
    }, 3000);
    // setTimeout(this.checkMethod(), 3000);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-dialog.activityDescription {
  max-height: 40% !important;
}
.activity-scroll {
  height: calc(100% - 83px);
  overflow: auto;
}
.more-icon {
  cursor: pointer;
  width: 38px;
  padding: 0px 0;
  text-align: center;
  top: -4px;
  position: relative;
  border: 1px solid;
  font-size: 12px;
  color: #4e9ea8;
}

body.english .more-icon {
  float: right;
}
body.arabic .more-icon {
  float: left;
}
.displayInline {
  display: inline-block !important;
}
.on-edit-icon {
  display: none;
  padding: 5px 10px;
  position: absolute;
  background: white;
  box-shadow: 0px 0px 5px 2px #ccc6 !important;
  font-size: 12px;
  transition: 0.5s all;
}
.on-edit-icon span {
  cursor: pointer;
}

body.english .on-edit-icon {
  right: -15px;
  top: 20px;
  left: none;
}
body.arabic .on-edit-icon {
  left: -15px;
  top: 20px;
  right: none;
}
body.english .activity-log {
  background: #eeeeee;
  width: 16%;
  position: fixed;
  right: 16px;
  float: right;
  top: 72px;
  height: 100%;
  transition: 0.5s all;
  box-shadow: 0px 0px 12px -2px #ccc6 !important;
}
body.arabic .activity-log {
  height: 100%;
  width: 0;
  position: fixed;
  background: #eef0f2;
  top: 54px;
  left: 77px;
  overflow-x: hidden;
  -webkit-transition: width 1s;
  transition: width 1s;
  scrollbar-width: none;
  /* background: #eeeeee;
  width: 0%;
  position: fixed;
  left: 75px;
  float: right;
  top: 55px;
  height: calc(100vh - 72px);
  -webkit-box-shadow: 0px 0px 12px -2px #ccc6 !important;
  box-shadow: 0px 0px 12px -2px #ccc6 !important; */
}

body.arabic .activity-log-change {
  width: 24%;
  transition: width 1s;
}

body.english .activity-log.close {
  right: -320px;
}
body.arabic .activity-log.close {
  left: -320px;
}
.view-log {
  position: relative;
  border-bottom: 1px solid #8080803d;
}
.view-log::before {
  content: "";
  position: absolute;
  top: 4px;
  height: 12px;
  width: 12px;
  border-radius: 10px;
}
body.english .view-log::before {
  left: 2px;
}
body.arabic .view-log::before {
  right: 2px;
}
.view-log.cyan::before {
  background-color: #57b2bd;
}
.view-log.blue::before {
  background-color: #3f7ec6;
}
.view-log.yellow::before {
  background-color: #ccd22c;
}
.view-log.green::before {
  background-color: #6db63f;
}
.mini-circle {
  cursor: pointer;
  background: white;
  padding: 5px 8px;
  margin-top: 7px;
  position: relative;
  box-shadow: 0px 0px 12px -2px #ccc6 !important;
}

body.english .mini-circle {
  border-left: 2px solid black;
}
body.arabic .mini-circle {
  border-right: 2px solid black;
}
/* .mini-circle::before {
  content: "";
  position: absolute;
  top: 0px;
  height: 12px;
  width: 12px;
  border-radius: 10px;
  border: 2px solid black;
} */
body.english .mini-circle::before {
  left: -24px;
}

body.arabic .mini-circle::before {
  right: -24px;
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
