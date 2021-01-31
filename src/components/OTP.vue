<template>
  <div class="hello">
    <div style="height: 100vh;" v-bind:class="{ resolH90: screenR < 1900 }">
      <b-row cols="2" style="height: 100%">
        <b-col class="login-background-image">
          <div
            style="
              width: 100%;
              margin: auto;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              text-align: center;
              background: #69c2c6ad;
              padding: 11px 0 16px 0px;
            "
          >
            <!-- <img style="width:80px" src="/images/login/white-logo.png" alt /> -->

            <span
              style="
                display: block;
                color: white;
                font-size: 26px;
                line-height: 1.5;
                font-weight: 600;
              "
              >معاً لنكون نموذجاً رئداً وناجحاً في كفاءة الإنفاق</span
            >
          </div>
        </b-col>

        <b-col class="login-background-design">
          <div
            style="
              position: absolute;
              top: 45%;
              left: 50%;
              transform: translate(-50%, -50%);
              text-align: center;
            "
          >
            <img
              style="width: 320px"
              src="/images/login/colored-logo.png"
              alt
            />

            <div>
              <div class="login-field mt-4">
                <form
                  novalidate
                  class="md-layout"
                  @submit.prevent="validateUser"
                >
                  <span
                    style="
                      display: inline-block;
                      text-align: center;
                      font-size: 20px;
                    "
                    >{{ $t("enterOneTimePasswordToContinue") }}</span
                  >

                  <md-field :class="getValidationClass('otp')">
                    <input
                      class="inn"
                      type="text"
                      v-mask="'####'"
                      v-model="form.otp"
                    />
                    <!-- <md-input
                      class="inn"
                      name="otp"
                      id="otp"
                      v-mask="'####'"
                      autocomplete="given-name"
                      v-model="form.otp"
                      :disabled="sending"
                    /> -->
                    <span class="md-error" v-if="!$v.form.otp.required">
                      يرجى إدخال رمز التحقق</span
                    >
                    <span
                      class="md-error"
                      v-else-if="
                        !$v.form.otp.minlength || !$v.form.otp.maxlength
                      "
                    >
                      يرجى إدخال رمز التحقق</span
                    >
                  </md-field>

                  <div style="width: 100%">
                    <md-button
                      type="submit"
                      class="login-btn comman-gradient button-radius font-weight-bold text-capitalize"
                      :disabled="sending"
                      >{{ $t("continue") }}</md-button
                    >
                  </div>
                </form>
              </div>
              <div
                @click="resendOtp"
                style="cursor:pointer"
                class="float-right font-weight-bolder pt-1"
              >
                <a> إعادة إرسال</a>
              </div>
            </div>
          </div>

          <span
            style="
              display: block;
              position: absolute;
              bottom: 15px;
              left: 50%;
              transform: translate(-50%, 0);
              width: 95%;
              text-align: center;
            "
          >
            {{ $t("forTechIssue") }}
            <a
              style="color: #1cb2b8"
              href="mailto:satelite.office@sce.gov.sa"
              >{{ $t("satelliteEmail") }}</a
            >
          </span>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

export default {
  name: "otp",
  mixins: [validationMixin],
  data: () => ({
    form: {
      otp: null,
    },
    screenR: null,
    userSaved: false,
    sending: false,
    lastUser: null,
  }),
  validations: {
    form: {
      otp: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(4),
      },
    },
  },
  methods: {
    resendOtp() {
      let data = localStorage.getItem("email");
      this.$showLoader();
      this.$authService.GetOtp(data).then((res) => {
        if (res.success) {
          localStorage.removeItem("otpLogin");
          localStorage.setItem("otpLogin", res.data);
        }
        this.$hideLoader();
      });
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
      this.form.otp = null;
    },
    saveUser() {
      // this.$showLoader();
      // this.$userService.CheckOtp(this.form.otp).then((res) => {
      //   if (res.success) {
      //     if (res.data == true) {
      //       localStorage.setItem("dashboard", true);
      //       localStorage.setItem("otp", true);
      //       this.$router.push("/main/dashboard");
      //       this.clearForm();
      //     } else {
      //       this.$swal({
      //         icon: "error",
      //         type: "error",
      //         confirmButtonText: this.$t("ok"),
      //         title: "زوج واحد صحيح غير متطابق",
      //       });
      //     }
      //   }
      //   this.$hideLoader();
      // });

      let otp = localStorage.getItem("otpLogin");
      if (this.form.otp == otp) {
        localStorage.setItem("dashboard", true);
        localStorage.setItem("otp", true);
        this.$router.push("/main/dashboard");
        this.clearForm();
      } else {
        this.$swal({
          icon: "error",
          type: "error",
          confirmButtonText: this.$t("ok"),
          title: "زوج واحد صحيح غير متطابق",
        });
      }
      // this.sending = true;

      // // Instead of this timeout, here you can call your API
      // window.setTimeout(() => {
      //   this.lastUser = `${this.form.username}`;
      //   this.userSaved = true;
      //   this.sending = false;
      //   this.clearForm();
      // }, 1500);
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        if (this.form.otp != null) {
          this.saveUser();
        }
      }
    },
  },
  mounted() {
    this.screenR = screen.width;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-field {
  display: block !important;
}
.resolH90 {
  /* height: 133vh !important; */
}
.inn {
  border: none;
  text-align: center;
  font-size: 26px !important;
  letter-spacing: 46px !important;
  margin-right: -23px;
  width: 100%;
}
.inn:last-child {
  letter-spacing: 0;
}
.md-checkbox .md-theme-default {
  margin: 0 !important;
}

.login-btn {
  background: #1cb2b8;
  color: white !important;
  border-radius: 5px;
  font-size: 12px;
  height: 40px;
  width: 170px;
  text-align: center;
}
.button-radius {
  border-radius: 25px;
}
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.input-field-style {
  margin: 6px 0px;
  font-weight: 600;
}
.login-field {
  text-align: center !important;
  padding: 25px 40px;
  border-radius: 10px;
  width: 410px;
  background: white;
  -moz-box-shadow: 0px 3px 15px -9px #1cb2b8;
  -webkit-box-shadow: 0px 3px 15px -9px #1cb2b8;
  box-shadow: 0px 3px 15px -9px #1cb2b8;
}
.login-background-image {
  background-image: url("/images/login/Rectangle3.png");
  height: 100%;
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
}
.login-background-design {
  background-image: url("/images/login/bg-image.png");
  height: 100%;
  background-position: 250px 250px;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: white;
}
h3 {
  margin: 40px 0 0;
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
