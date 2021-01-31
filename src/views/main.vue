<template>
  <b-container fluid class="mainComponenet pr-0 pl-0">
    <b-row no-gutters class="parent">
      <b-col
        md="2"
        class="sidebarTransition demo resolH90"
        :class="{ minSidebarWidth: sidebarWidth }"
        style="position: relative; overflow: auto"
      >
        <div
          id="side-bar-nav"
          class="side-bar d-flex flex-column"
          style="height: inherit"
          :class="{ 'side-bar-width': sidebarWidth }"
        >
          <div class="align-self-center">
            <img
              class="image-width mt-5 mb-5"
              :class="{ 'Image-Width': sidebarWidth }"
              src="/images/menu/CSE_Logo.png"
            />
          </div>
          <!-- <div class="pr-2 pl-2"> -->
          <md-list
            id="menu"
            v-b-tooltip.hover.bottomleft
            :title="`${menu.label}`"
            class="side-bar-menu pr-2 pl-2"
            v-for="(menu, index) in menus"
            :key="index"
          >
            <div
              @click="routeNavigation(menu)"
              type="button"
              class="cursor-pointer text-decoration-none"
            >
              <md-list-item
                class="side-bar-list"
                routerLinkActive="active"
                :class="currentTab === menu.label ? 'active' : ''"
              >
                <div class="imageCircle">
                  <img
                    :src="`${imagePath + menu.image + '.png'}`"
                    class="Icon"
                    alt
                  />
                </div>
                <div
                  :class="{ 'd-none': sidebarWidth }"
                  class="md-list-item-text pr-2 cursor-pointer text-white font-weight-bold"
                >
                  {{ menu.label }}
                </div>
              </md-list-item>
            </div>
            <div v-if="isChild">
              <md-list-item
                v-for="(child, index) in menu.children"
                :key="index"
                @click="routeNavigationChild(child)"
              >
                <img
                  class="ml-1"
                  :src="`${imagePath + menu.image + '.png'}`"
                  alt
                />
                <span
                  :class="{
                    'd-none': sidebarWidth,
                    'child-active': childTab === child.label,
                  }"
                  style="font-size : 13px"
                  class="md-list-item-text pr-2 cursor-pointer text-white font-weight-normal"
                  >{{ child.label }}</span
                >
              </md-list-item>
            </div>
          </md-list>
          <!-- </div> -->
        </div>
      </b-col>
      <b-col>
        <div class="d-flex top-Bar align-items-center">
          <div
            class="flex-grow-1"
            @click="(sidebarWidth = !sidebarWidth), hideTabs(true)"
          >
            <img class="pr-2" src="/images/svg/bars.svg" />
          </div>
          <div
            class="h-100 mt-2 pl-1 font-weight-bolder"
            @click="onUserProfile()"
          >
            <div class="d-inline-block pl-2">
              {{ username }} [{{ userrole }}]
            </div>
            <div
              class="badge-success border d-inline-block font-weight-bold h6 p-2 rounded-circle"
            >
              <span class="text-uppercase">{{ name }}</span>
            </div>
          </div>
          <img
            class="logout-image pl-3"
            src="/images/login/logout.png"
            @click="OnLogout()"
          />
        </div>
        <!-- height104 -->
        <div
          class="content p-5"
          id="main-content"
          :class="{ height104: screenR < 1900 }"
        >
          <router-view></router-view>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import rolesMixins from "../mixins/RolesMixins.js";
import user from "@/auth.js";
import { ColorAxis } from "highcharts";
export default {
  mixins: [rolesMixins],
  data: () => ({
    check: false,
    sidebarWidth: false,
    tenent_id: 0,
    isChild: false,
    currentTab: "",
    childTab: null,
    imagePath: "/images/icons/sidebar/",
    role: [],
    dowwak: "admin",
    adminClick: false,
    menus: [],
    screenR: null,
  }),

  computed: {
    username() {
      return localStorage.getItem("username")
        ? JSON.parse(localStorage.getItem("username"))
        : "";
    },
    userrole() {
      return localStorage.getItem("roles")
        ? JSON.parse(localStorage.getItem("roles"))
        : "";
    },
    name() {
      let name = JSON.parse(localStorage.getItem("username"));
      let username = name
        .split(" ")
        .slice(0, 2)
        .join(" ");
      return username
        .split(" ")
        .map((item) => {
          return item[0];
        })
        .join("");
    },
  },
  mounted() {
    this.screenR = screen.width;
    console.log(this.$route.name);
    if (this.$route.name) {
      document.getElementById("side-bar-nav").style.height =
        window.innerHeight + "px";
      document.getElementById("main-content").style.height =
        window.innerHeight + "px";

      let demo = this.$route.name
        .split(" ")
        .join("")
        .toLowerCase();
      // this.currentTab = this.$t(
      //   `${this.$route.name
      //     .split(" ")
      //     .join("")
      //     .toLowerCase();
      this.currentTab = this.$t(
        `${this.$route.name
          .split(" ")
          .join("")
          .toLowerCase()}`
      );
      this.tenent_id = localStorage.getItem("tenantId");
      if (this.hasAdminRole && !this.hasEntityRole && !this.hasCSERole) {
        this.dowwak = "Super Admin";
        this.setAdminMenu();
      } else {
        if (this.hasEntityRole) {
          this.setEntityMenu();
          this.dowwak = "Furqan Anis";
        }
        if (this.hasCSERole) {
          this.setCSEMenu();
          this.dowwak = "Ahmed Abdullah";
        }
      }
    }
  },
  created() {
    this.$openSide.$on(
      "open-sidebar",
      (comment, activityLogs, lastComments, feedback) => {
        this.hidemenu(comment, activityLogs, lastComments, feedback);
      }
    );
    // },
    // created() {
    window.addEventListener("resize", this.myEventHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  methods: {
    myEventHandler(e) {
      let innerWidth = e.target.innerWidth;
      let innerHeight = e.target.innerHeight;

      console.log(e, document.body.clientHeight);

      // document.body.style.height = innerHeight + "px";
      document.getElementById("side-bar-nav").style.height =
        window.innerHeight + "px";
      document.getElementById("main-content").style.height =
        window.innerHeight + "px";
    },
    onUserProfile() {
      this.$router.push("/main/my_profile");
    },
    OnLogout() {
      user.logout().then((res) => {
        if (res) {
          localStorage.setItem("isEnglish", "0");
          localStorage.removeItem("otpLogin");
          localStorage.removeItem("dashboard");
          this.$router.go("/auth/login");
        }
      });
    },
    routeNavigation(payload) {
      this.currentTab = payload.label;
      if (payload.is_parent) {
        this.isChild = !this.isChild;
      }
      if (payload.routerLink) {
        this.isChild = false;
        this.$router.push(payload.routerLink);
      }
    },
    routeNavigationChild(payload) {
      this.childTab = payload.label;
      this.$router.push(payload.routerLink);
    },
    setAdminMenu() {
      this.menus = [
        {
          routerLink: "/main/dashboard",
          image: "dashboard",
          label: this.$t("dashboard"),
        },
        {
          routerLink: "/main/users",
          image: "usermanagement",
          label: this.$t("usersManagement"),
          isEntity: false,
        },
        {
          routerLink: "/main/entity",
          image: "entitymanage",
          label: this.$t("entityManagement"),
          isEntity: false,
        },
        // {
        //   routerLink: "/main/survey",
        //   image: "surverymanage",
        //   label: "برنامج العناصر الأساسية",
        //   isEntity: true,
        // },
        {
          routerLink: "/main/knowledge_hub",
          image: "knowledge",
          label: this.$t("knowledgeHubAdmin"),
          isEntity: true,
        },
        // {
        //   routerLink: "/main/applications",
        //   image: "applicationsetting",
        //   label: this.$t("applicationSettings"),
        //   isEntity: true,
        // },
      ];
    },
    setEntityMenu() {
      this.menus = [
        {
          routerLink: "/main/dashboard",
          image: "dashboard",
          label: this.$t("dashboard"),
        },
        {
          routerLink: "/main/monthly-reports",
          image: "montlyreport",
          label: this.$t("monthlyreports"),
        },
        // {
        //   image: "selfAssesment",
        //   label: this.$t("surveyselfassesment"),
        //   is_parent: true,
        //   opened: false,
        //   children: [
        //     {
        //       routerLink: "/main/survey/self/assesment",
        //       image: "surverymanage",
        //       label: this.$t("lastSurveyResult"),
        //     },
        //     {
        //       routerLink: "/main/survey/creation/confirmation",
        //       image: "submitsurvey",
        //       label: this.$t("submitSurvey"),
        //     },
        //     {
        //       routerLink: "/main/survey",
        //       image: "pastsurvey",
        //       label: this.$t("archivedSurvey"),
        //     },
        //   ],
        // },
        {
          routerLink: "/main/change_request_list",
          image: "montlyreport",
          label: this.$t("changerequestmanagement"),
          isEntity: true,
        },
        {
          routerLink: "/main/knowledge_hub",
          image: "knowledge",
          label: this.$t("knowledgehub"),
          isEntity: true,
        },
        // {
        //   routerLink: "/main/entity/user/" + this.tenent_id,
        //   image: "knowledge",
        //   label: this.$t("entityprofile"),
        //   isEntity: true,
        // },
      ];
    },
    setCSEMenu() {
      this.menus = [
        {
          routerLink: "/main/dashboard",
          image: "dashboard",
          label: this.$t("dashboard"),
        },
        {
          image: "montlyreport",
          label: this.$t("monthlyreports"),
          is_parent: true,
          active: false,
          opened: false,
          children: [
            {
              routerLink: "/main/entity-monthly-report",
              image: "montlyreport",
              label: this.$t("monthlyreports"),
            },
            {
              routerLink: "/main/monthly-report-cse",
              image: "montlyreport",
              label: "نظرة عامة على تقييم الاتزام",
            },
          ],
        },
        // {
        //   routerLink: "/main/survey",
        //   image: "selfAssesment",
        //   label: this.$t("surveyselfassesment"),
        // },
        {
          routerLink: "/main/change_request_list",
          image: "montlyreport",
          label: this.$t("changerequestmanagement"),
          isEntity: true,
        },
        {
          routerLink: "/main/knowledge_hub",
          image: "knowledge",
          label: this.$t("knowledgehub"),
          isEntity: true,
        },
      ];
    },
    toggleSidebar() {
      this.$refs.sidebar.style.maxWidth = "100px";
    },
    hideTabs(payload) {
      this.check = payload;
      if (this.check && !this.sidebarWidth === true) {
        this.$openSide.$emit("open-comment", this.sidebarWidth);
      }
    },
    hidemenu(comment, activityLogs, lastComments, feedback) {
      if (feedback == this.sidebarWidth && activityLogs == null) {
        if (comment == null && lastComments == null) {
          this.sidebarWidth = !this.sidebarWidth;
        }
      }
      if (activityLogs == this.sidebarWidth && !comment) {
        this.sidebarWidth = !this.sidebarWidth;
      }
      if (comment == this.sidebarWidth && !activityLogs) {
        this.sidebarWidth = !this.sidebarWidth;
      }
      if (lastComments == this.sidebarWidth && !activityLogs) {
        if (!comment && !feedback) {
          this.sidebarWidth = !this.sidebarWidth;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.top-Bar {
  width: 100%;
  height: 50px;
  position: sticky;
  z-index: 10 !important;
  top: 1px;
  background: white;
  box-shadow: 0px 2px 0px #0000001a;
  cursor: pointer;
}
.side-bar {
  height: inherit;
  position: fixed;
  width: 16.66%;
  transition: width 1s;
  background: transparent linear-gradient(182deg, #2c96d0 0%, #7abc5d 100%) 0%
    0% no-repeat padding-box !important;
}
.side-bar-menu {
  position: relative;
}
.side-bar-menu > div {
  background-color: inherit;
}
.side-bar-list {
  position: relative;
  width: 90%;
  &:hover {
    background: transparent linear-gradient(80deg, #d3e31d 0%, #6db73a 100%) !important;
    border-top-left-radius: 60px;
    border-bottom-left-radius: 60px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  &:hover::after {
    content: " ";
    position: absolute;
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
    top: -6px;
    left: -39px;
    border-top: 30px solid transparent;
    border-left: 30px solid transparent;
    border-bottom: 30px solid transparent;
    border-right: 30px solid #d3e31d;
    z-index: -2 !important;
  }
  &:hover::before {
    content: " ";
    position: absolute;
    top: 11px !important;
    right: 115%;
    border-top: 15px solid transparent;
    border-left: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-right-width: 15px;
    border-right-style: solid;
    border-right-color: #52a999;
  }
}
.active {
  background: transparent linear-gradient(80deg, #d3e31d 0%, #6db73a 100%) !important;
  border-top-left-radius: 60px;
  border-bottom-left-radius: 60px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  &::after {
    content: "";
    position: absolute;
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
    top: -6px;
    left: -39px;
    border-top: 30px solid transparent;
    border-left: 30px solid transparent;
    border-bottom: 30px solid transparent;
    border-right: 30px solid #d3e31d;
  }
  &::before {
    content: "";
    position: absolute;
    top: 11px !important;
    right: 115%;
    border-top: 15px solid transparent;
    border-left: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-right-width: 15px;
    border-right-style: solid;
    border-right-color: #54aa95;
  }
}
.child-active {
  background: transparent linear-gradient(80deg, #d3e31d 0%, #6db73a 100%) !important;
  height: 39px;
  padding-top: 8px;
}
.content {
  background-color: #a5aeb619;
  width: 100%;
  // height: calc(125vh - 50px) !important;
  padding-bottom: 100px !important;
  overflow-y: scroll;
}
.height104 {
  // height: calc(125vh - 50px) !important;
  padding-bottom: 100px !important;
}
.resolH90 {
  // height: 125vh !important;
}
@media screen and (min-width: 1900px) {
  .content {
    background-color: #a5aeb619;
    width: 100%;
    height: 100vh !important;
    padding-bottom: 100px !important;
    overflow-y: scroll;
  }
  .height104 {
    height: 100vh !important;
    padding-bottom: 100px !important;
  }
  .resolH90 {
    height: 100vh !important;
  }
}

.sidebarTransition {
  transition: max-width 1s;
}
.minSidebarWidth {
  max-width: 100px;
}
.side-bar-width {
  width: 100px;
  transition: width 1s;
}
@media only screen and (max-width: 780px) {
  .parent {
    position: relative;
  }
  .demo {
    width: 0%;
  }
  .side-bar {
    position: absolute;
    top: 14%;
    z-index: 1;
  }
}
.image-width {
  width: 76%;
  padding-right: 42px;
}
.Image-Width {
  width: 81%;
  padding-right: 12px;
}
.imageCircle {
  border-radius: 26px;
  height: 35px;
  width: 34px;
  border: 1px solid white;
  padding-left: 6px;
  padding-top: 2px;
}
.Icon {
  height: 19px;
}
.logout-image {
  width: 50px;
}
</style>
