<style>
@import "assets/styles/main.scss";
</style>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import user from "@/auth.js";
export default {
  name: "app",
  data: () => ({
    screenR: null,
    events: ["click", "mousemove", "mousedown", "scroll", "keypress"],
    logOutTimer: null,
  }),
  created() {
    window.addEventListener("resize", this.myEventHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },

  components: {},
  methods: {
    myEventHandler(e) {
      // let innerWidth = e.target.innerWidth;
      // if (innerWidth < 1900 && innerWidth > 1200) {
      //   document.body.style.zoom = "80%";
      // } else if (innerWidth > 1900) {
      //   document.body.style.zoom = "100%";
      // } else {
      //   document.body.style.zoom = "100%";
      // }
      console.log("myEventHandler e.target.innerWidth", e.target.innerWidth);
      console.log("myEventHandler screen.availHeight", screen.availHeight);
      console.log("myEventHandler e.target.innerHeight", e.target.innerHeight);
      console.log(
        "===================================================================="
      );
    },
    checkTranslation() {
      if (this.$store.state.locale == "Arabic") {
        document.body.classList.add("arabic");
        document.body.classList.remove("english");
        document.body.setAttribute("dir", "rtl");
      } else if (this.$store.state.locale == "English") {
        document.body.classList.add("english");
        document.body.classList.remove("arabic");
        document.body.setAttribute("dir", "ltr");
      }
    },
    setTimer() {
      this.logOutTimer = setTimeout(() => {
        this.logOut();
      }, 900000);
    },

    logOut() {
      user.logout().then((res) => {
        if (res) {
          localStorage.setItem("isEnglish", "0");
          localStorage.removeItem("otpLogin");
          localStorage.removeItem("dashboard");
          this.$router.go("/auth/login");
        }
      });
    },
    resetTimer() {
      clearTimeout(this.logOutTimer);
      this.setTimer();
    },
  },
  mounted() {
    this.events.forEach((event) => {
      window.addEventListener(event, this.resetTimer);
    });
    this.setTimer();
    this.screenR = screen.width;
    // if (this.screenR < 1900 && this.screenR > 1200) {
    //   document.body.style.zoom = "80%";
    // } else if (this.screenR > 1900) {
    //   document.body.style.zoom = "100%";
    // } else {
    //   document.body.style.zoom = "100%";
    // }

    console.log("first this.screenR", this.screenR);
    console.log("first screen.availHeight", screen.availHeight);
    console.log("first window.innerHeight", window.innerHeight);

    this.checkTranslation();
    if (JSON.parse(localStorage.getItem("vuex"))) {
      if (
        JSON.parse(localStorage.getItem("vuex")).locale == "arb" ||
        JSON.parse(localStorage.getItem("vuex")).locale == "Arabic"
      ) {
        this.$store.dispatch("SET_LANGUAGE", "Arabic");
        this.$store.dispatch("changeLocale", "Arabic");
      } else {
        this.$store.dispatch("SET_LANGUAGE", "English");
        this.$store.dispatch("changeLocale", "English");
      }
    } else {
      this.$store.dispatch("changeLocale", "Arabic");
      this.$store.dispatch("SET_LANGUAGE", "Arabic");
    }
  },
};
</script>
<style lang="scss">
#app {
  font-family: "DIN", Arial, Helvetica, serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.resol90 {
  //   zoom: 87% !important;
  //   zoom: 90% !important;
}
.resol80 {
  //   zoom: 80% !important;
}

button.swal2-styled.swal2-confirm {
  background-image: linear-gradient(to right, #2b98cf, #1ebbc5) !important;
  border-radius: 25px;
}
.comman-gradient {
  background-image: linear-gradient(to right, #2b98cf, #1ebbc5) !important;
}
.border-radius {
  border-radius: 30px !important;
}
.tableInput {
  border: 0 !important;
  padding: 0% !important;
  box-shadow: none !important;
  height: 26px !important;
}
// #nav {
//   padding: 30px;
// }

// #nav a {
//   font-weight: bold;
//   color: #2c3e50;
// }

// #nav a.router-link-exact-active {
//   color: #42b983;
// }
.mainComponenet .md-list.md-theme-default {
  background-color: var(--md-theme-default-background, none) !important;
  color: rgba(0, 0, 0, 0.87);
  color: var(--md-theme-default-text-primary-on-background, white) !important;
}

// .md-menu-content.md-select-menu {
//   z-index: 1054 !important;
// }

// date picker Css start

.vue-datepicker > div > input {
  border-left: none !important;
  width: 100% !important;
  border-top: none !important;
  border-right: none !important;
  font-size: larger;
  margin-top: 28px;
}

// input[type="text"]:disabled {
//   background: #dddddd;
// }
.vue-datepicker > div > input:disabled {
  color: -internal-light-dark(none) !important;
  background-color: none !important;
  background: none !important;
}
.vue-datepicker .vdp-datepicker__calendar {
  position: absolute;
  z-index: 100;
  background: #fff;
  width: 400px;
  border: 1px solid #ccc;
  font-size: large;
  font-weight: bolder;
}

.absloute-positon {
  position: absolute;
  top: 26px;
}
.initial-position {
  top: 5px;
  position: absolute;
}
.custom-date {
  position: relative;
}
.custom-date > .md-input {
  margin-left: 0% !important;
  padding-right: 0% !important;
}
.custom-date .md-icon.md-theme-default.md-icon-font {
  right: 93% !important;
  position: absolute;
}
.custom-date .md-icon:after {
  background-color: none !important;
  background-color: var(--md-theme-default-background-variant, none) !important;
}
#initiator .custom-date .md-datepicker-dialog {
  top: 448px !important;
}
// date picker Css ends

// Table Css Start
.custom-table {
  padding-bottom: 25px !important;
}
.custom-table .md-table {
  border: 1px solid;
}
.custom-table .md-table-content th.md-table-head {
  border: 1px solid lightgrey;
  background-color: #f2f3f4;
  font-size: 16px !important;
  text-align: right !important;
  font-weight: bolder !important;
  color: black;
}

.custom-table .md-table-content {
  padding-left: 18px !important;
  padding-right: 18px !important;
}
.custom-table .md-table-content .md-table-cell {
  border: 1px solid lightgrey;
  font-weight: bolder !important;
  font-weight: 16px !important;
}
#userModel {
  right: 9% !important;
  width: 80%;
}
#changesRequestModal {
  right: 9% !important;
  width: 80%;
}

#changesRequestModal___BV_modal_outer_ {
  z-index: 800 !important;
}
#userModel___BV_modal_outer_ {
  z-index: 800 !important;
}
#initiator .customTable .table th,
.table td {
  // border-top: none !important;
  padding: 10px 5px 10px 5px !important;
  max-width: 120px !important;
  // position: relative;
  // margin-bottom: 0% !important;
}
.table.cse-montly tbody tr td:last-child {
  padding: 10px 5px 10px 20px !important;
}
.table.cse-montly tbody tr td:first-child {
  padding: 10px 10px 10px 10px !important;
}
#initiator .customTable th:nth-child(4) {
  position: relative;
}

#initiator .customTable .table th,
.table td {
}

.b-table-sticky-header,
.table-responsive,
[class*="table-responsive-"] {
  margin-bottom: 0px !important;
}
input[type="number"] {
  -moz-appearance: textfield !important;
}
.table.b-table > thead > tr > [aria-sort="none"],
.table.b-table > tfoot > tr > [aria-sort="none"] {
  background-image: none !important;
}

.CSE-table td:last-child {
  width: 200px;
}
.entity-performance-table td:nth-child(1) {
  background-color: #eeeeee !important;
  font-weight: bold;
}
.entity-performance-table th:nth-child(1) {
  background-color: #eeeeee !important;
  width: 200px;
  vertical-align: inherit;
  // background-color: #eeeeee !important;
  // width: 200px;
}
.entity-performance-table th:nth-child(2) {
  width: 200px;
  position: relative;
  height: 70px;
  vertical-align: unset !important;
  background-color: #006fc0 !important;
  color: white;
}
.entity-performance-table th:nth-child(3) {
  width: 200px;
  height: 70px;
  position: relative;
  vertical-align: unset !important;
  background-color: #7e7e7e !important;
  color: white;
}
.entity-performance-table th:nth-child(4) {
  width: 200px;
  height: 70px;
  position: relative;
  padding-top: 46px;
  vertical-align: unset !important;
  background-color: #929da6 !important;
  color: white;
}
.entity-performance-table th:nth-child(5) {
  width: 200px;
  position: relative;
  height: 70px;
  vertical-align: unset !important;
  background-color: #1db0b8 !important;
  color: white;
}
.entity-performance-table th:nth-child(6) {
  width: 200px;
  height: 70px;
  position: relative;
  vertical-align: unset !important;
  background-color: #1d6092 !important;
  color: white;
}
.entity-performance-table th:nth-child(7) {
  position: relative;
  vertical-align: inherit;
}

// .entity-performance-table .table thead th {
//   vertical-align: initial !important;
// }

.entity-performance-table > tbody > tr > td {
  position: relative;
}

#initiator .md-autocomplete .md-input-action {
  width: 100%;
  display: none !important;
}
// .table-bordered th:first-child,
// .table-bordered td:first-child {
//   border-right: none !important;
// }
// .table-bordered th:last-child,
// .table-bordered td:last-child {
//   border-left: none !important;
// }
.initative-table td {
  width: 89px;
}
.initative-table td:nth-child(2) {
  width: 120px;
}
.initative-table td:nth-child(9) {
  width: 222px;
}

.table-bordered thead th,
.table-bordered thead td {
  border-bottom-width: 2px;
  text-align: center;
}
.table-bordered th,
.table-bordered td {
  border: 1px solid #dee2e6;
  text-align: center;
}
.table-column-text,
.table-bordered th {
  font-size: 16px;
}
.comment-text-wraper.commentTextarea:focus {
  border: none !important;
  outline: none !important;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
.comment-text-wraper .commentTextarea {
  border: none;
  border-radius: 12px !important;
}
.commentTextarea .textarea.form-control {
  border: none;
  border-radius: 20px !important;
}
textarea:focus {
  outline: 0px !important;
  -webkit-appearance: none;
  box-shadow: none !important;
}
::-webkit-scrollbar {
  display: none !important;
}

@media screen and (max-width: 1549px) {
  .min-height {
    min-height: 95%;
  }
}
// @media screen and (min-width: 1920px) {
//   .comment-text {
//     width: 230px !important;
//   }
// }
@media screen and (max-width: 1549px) {
  .comment-text {
    min-height: 50px;
    width: 235px !important;
    display: inline-block;
    background: white;
    border-radius: 10px;
    padding: 10px;
    font-weight: bolder;
    font-size: 16px;
    overflow-wrap: break-word;
  }
  .reply-button-width {
    width: 231px !important;
  }
  .main-approver-width {
    width: 68% !important;
    -webkit-transition: width 1s;
    transition: width 1s;
  }
  .tabs-approver {
    height: 75px !important;
    min-width: 140px !important;
    padding: 15px;
    font-size: 20px;
  }
  .comment-wrapper-height {
    height: 563px !important;
  }
}
.textareaTable {
  height: 50px !important;
}
textarea.form-control {
  height: auto;
  box-shadow: none !important;
}
textarea::placeholder {
  color: #444;
  font-weight: bold;
  text-align: center;
  line-height: var(--line-height);
  overflow: hidden;
}
// .bar-chart #myChart {
//   display: block;
//   width: 861px;
//   height: 495px !important;
// }
#feedback-section
  .CustomCheckBox
  .custom-control-input:checked
  ~ .custom-control-label::before {
  border-color: red !important;
  background-color: red !important;
}
</style>
