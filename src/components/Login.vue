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
            style="position: relative; float: right; width: 150px; margin: 10px"
          >
            <!-- <Translation /> -->
          </div>
          <div
            style="
              position: absolute;
              top: 45%;
              left: 50%;
              transform: translate(-50%, -50%);
              text-align: center;
              width: 100%;
            "
          >
            <img
              style="width: 320px"
              src="/images/login/colored-logo.png"
              alt
            />
            <span style="display: block; font-size: 24px; line-height: 1.3">{{
              $t("loginImageText")
            }}</span>
            <div style="text-align: left; width: 410px; margin: auto">
              <div class="login-field mt-4">
                <form
                  novalidate
                  class="md-layout"
                  @submit.prevent="validateUser"
                >
                  <md-field
                    class="login-user"
                    :class="getValidationClass('UserNameOrEmailAddress')"
                  >
                    <md-icon class="md-accent">
                      <img
                        style="
                          width: 20px;
                          height: 20px;
                          margin-right: 6px;
                          margin-left: 12px;
                        "
                        src="/images/login/username.png"
                        alt
                      />
                    </md-icon>

                    <label for="user-name">{{ $t("userName") }}</label>
                    <md-input
                      name="user-name"
                      id="user-name"
                      autocomplete="given-name"
                      v-model="form.UserNameOrEmailAddress"
                      :disabled="sending"
                    />
                    <span
                      class="md-error"
                      v-if="!$v.form.UserNameOrEmailAddress.required"
                      >يرجى إدخال إسم المستخدم</span
                    >
                    <span
                      class="md-error"
                      v-else-if="!$v.form.UserNameOrEmailAddress.minlength"
                      >يرجى إدخال إسم المستخدم</span
                    >
                  </md-field>

                  <md-field
                    class="login-password"
                    :class="getValidationClass('Password')"
                  >
                    <md-icon class="md-accent">
                      <img
                        style="
                          width: 20px;
                          height: 20px;
                          margin-right: 6px;
                          margin-left: 12px;
                        "
                        src="/images/login/password.png"
                        alt
                      />
                    </md-icon>
                    <label for="password">{{ $t("password") }}</label>

                    <md-input
                      name="password"
                      id="password"
                      type="password"
                      autocomplete="given-name"
                      v-model="form.Password"
                      :disabled="sending"
                    />
                    <span class="md-error" v-if="!$v.form.Password.required"
                      >يرجى إدخال كلمة المرور</span
                    >
                    <span
                      class="md-error"
                      v-else-if="!$v.form.Password.minlength"
                      >يرجى إدخال كلمة المرور</span
                    >
                  </md-field>

                  <div style="width: 100%">
                    <!-- <md-button type="submit" class="login-btn" :disabled="sending">LOGIN</md-button> -->
                    <md-button
                      type="submit"
                      class="login-btn comman-gradient button-radius font-weight-bold text-capitalize"
                      :disabled="sending"
                      >{{ $t("login") }}</md-button
                    >
                  </div>
                </form>
              </div>
              <span
                @click="onForgotPassword"
                style="margin-top: 15px; display: inline-block; cursor: pointer"
                >{{ $t("forgotPassword") }}</span
              >
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
import Translation from "./Translation.vue";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
export default {
  name: "login",
  components: {
    Translation,
  },
  mounted() {
    this.screenR = screen.width;
    console.log("Res: ", this.screenR);
    this.checkTranslation();
  },
  computed: {
    ...mapGetters(["getLanguage"]),
  },
  mixins: [validationMixin],
  data: () => ({
    form: {
      UserNameOrEmailAddress: null,
      Password: null,
    },
    screenR: null,
    userSaved: false,
    sending: false,
    lastUser: null,
  }),
  validations: {
    form: {
      UserNameOrEmailAddress: {
        required,
        minLength: minLength(3),
      },
      Password: {
        required,
        minLength: minLength(3),
      },
    },
  },
  methods: {
    onForgotPassword() {
      this.$router.push("/auth/forgot_password");
    },
    checkTranslation() {
      if (localStorage.getItem("isEnglish") == "1") {
        document.body.classList.add("english");
        document.body.classList.remove("arabic");
        document.body.setAttribute("dir", "ltr");
        this.$store.dispatch("SET_LANGUAGE", "1");
      } else if (localStorage.getItem("isEnglish") == "0") {
        document.body.classList.add("arabic");
        document.body.classList.remove("english");
        document.body.setAttribute("dir", "rtl");
        this.$store.dispatch("SET_LANGUAGE", "0");
      } else {
        document.body.classList.add("arabic");
        document.body.classList.remove("english");
        document.body.setAttribute("dir", "rtl");
        this.$store.dispatch("SET_LANGUAGE", "0");
      }
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
      this.form.UserNameOrEmailAddress = null;
      this.form.Password = null;
    },
    saveUser() {
      localStorage.setItem("forgotPassword", false);
      localStorage.setItem("email", this.form.UserNameOrEmailAddress);
      this.sending = true;
      this.$showLoader();
      this.$authService
        .login(this.form)
        .then((res) => {
          if (res.success) {
            new Promise(function(resolve, reject) {
              localStorage.setItem(
                "token",
                JSON.stringify(res.data.accessToken)
              );
              localStorage.setItem("userId", JSON.stringify(res.data.userId));
              localStorage.setItem("otpLogin", JSON.stringify(res.data.otp));
              localStorage.setItem(
                "roles",
                JSON.stringify(res.data.roles.join(","))
              );
              localStorage.setItem(
                "username",
                JSON.stringify(res.data.userName)
              );
              if (res.data.tenantId) {
                localStorage.setItem("tenantId", res.data.tenantId);
              }
              resolve("LocalStorage Done");
            }).then(() => {
              this.$router.go("/main");
            });
          } else {
            this.$swal({
              icon: "error",
              type: "error",
              confirmButtonText: this.$t("ok"),
              title: this.$t("invalidLogin"),
            });
          }
          this.sending = false;
        })
        .catch((error) => {
          this.$swal({
            type: "error",
            title: error,
          });
          this.sending = false;
        });

      this.$hideLoader();
    },
    validateUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-checkbox .md-theme-default {
  margin: 0 !important;
}
.resolH90 {
  /* height: 133vh !important; */
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
