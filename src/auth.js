export default {
    check () {
        return (localStorage.getItem('token')) //get token from localStorage
    },
    otpCode() {
        return (localStorage.getItem('otp')) //get token from localStorage
    },
    logout() {
        return new Promise((resolve,reject)=>{
            localStorage.removeItem('token');
            localStorage.removeItem('otp');
            localStorage.removeItem('roles');
            localStorage.removeItem('userId');
            resolve('done');
        }) //remove token from localStorage
    },
    roles() {
        return (localStorage.getItem('roles'))
    },
    currentRole() {
        return JSON.parse(localStorage.getItem('roles'));
    },
    // formatDate(item) {
    //     if (item.split("-")[0] == "January") {
    //       return this.$t("january") + " - " + item.split("-")[1];
    //     } else if (item.split("-")[0] == "February") {
    //       return this.$t("february") + " - " + item.split("-")[1];
    //     } else if (item.split("-")[0] == "March") {
    //       return this.$t("march") + " - " + item.split("-")[1];
    //     } else if (item.split("-")[0] == "April") {
    //       return this.$t("april") + " - " + item.split("-")[1];
    //     } else if (item.split("-")[0] == "May") {
    //       return this.$t("may") + " - " + item.split("-")[1];
    //     } else if (item.split("-")[0] == "June") {
    //       return this.$t("june") + " - " + item.split("-")[1];
    //     } else if (item.split("-")[0] == "July") {
    //       return this.$t("july") + " - " + item.split("-")[1];
    //     } else if (item.split("-")[0] == "August") {
    //       return this.$t("august") + " - " + item.split("-")[1];
    //     } else if (item.split("-")[0] == "September") {
    //       return this.$t("september") + " - " + item.split("-")[1];
    //     } else if (item.split("-")[0] == "October") {
    //       return this.$t("october") + " - " + item.split("-")[1];
    //     } else if (item.split("-")[0] == "November") {
    //       return this.$t("november") + " - " + item.split("-")[1];
    //     } else if (item.split("-")[0] == "Deccember") {
    //       return this.$t("december") + " - " + item.split("-")[1];
    //     }
    //   },
    //   getArabicMonth(item) {
    //     if (item.split("-")[0] == "January") {
    //       return this.$t("january");
    //     } else if (item.split("-")[0] == "February") {
    //       return this.$t("february");
    //     } else if (item.split("-")[0] == "March") {
    //       return this.$t("march");
    //     } else if (item.split("-")[0] == "April") {
    //       return this.$t("april");
    //     } else if (item.split("-")[0] == "May") {
    //       return this.$t("may");
    //     } else if (item.split("-")[0] == "June") {
    //       return this.$t("june");
    //     } else if (item.split("-")[0] == "July") {
    //       return this.$t("july");
    //     } else if (item.split("-")[0] == "August") {
    //       return this.$t("august");
    //     } else if (item.split("-")[0] == "September") {
    //       return this.$t("september");
    //     } else if (item.split("-")[0] == "October") {
    //       return this.$t("october");
    //     } else if (item.split("-")[0] == "November") {
    //       return this.$t("november");
    //     } else if (item.split("-")[0] == "Deccember") {
    //       return this.$t("december");
    //     }
    //   },
};