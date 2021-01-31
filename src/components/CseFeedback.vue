<template>
  <b-container>
    <b-row>
      <div
        id="feedback-section"
        class="feedback-section"
        :class="feedback ? '' : 'feedback-section-change'"
      >
        <div
          v-if="
            CurrentTab === $t('generalinformation') ||
              CurrentTab === $t('financialdataandsaving') ||
              CurrentTab === $t('calculationofsavings') ||
              CurrentTab === $t('implementationsplan') ||
              CurrentTab === $t('summaryofimplementationplan')
          "
        >
          <div class="p-3">
            <span class="font-weight-bolder">أسئلة تقييم الفرص </span>
            <div
              class="d-flex d-inline float-left font-weight-bolder justify-content-around pl-3 w-25"
            >
              <span>نعم</span>
              <span>لا</span>
            </div>
          </div>
          <hr />
        </div>

        <!-------- general from Questions ------>
        <div v-if="CurrentTab === $t('generalinformation')">
          <div class="p-2">
            <div class="d-inline-block font-weight-bolder w-75 Questions">
              أخذ الفرصة بالاعتبار عند احتساب اجمالي عدد فرص الجهة؟
            </div>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              size="lg"
              v-model="data.thirdSectionA"
              :value="true"
              class="align-bottom d-inline w-25"
            >
            </b-form-checkbox>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              v-model="data.thirdSectionA"
              :value="false"
              size="lg"
              class="CustomCheckBox align-bottom d-inline w-25 "
            >
            </b-form-checkbox>
          </div>
          <div class="p-2">
            <div class="d-inline-block font-weight-bolder w-75 Questions">
              أخذ الفرصة بالاعتبار عند احتساب متوسط الوفر للجهة وتقييم حجم
              الفرص؟
            </div>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              size="lg"
              v-model="data.thirdSectionB"
              :value="true"
              class="align-bottom d-inline w-25"
            >
            </b-form-checkbox>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              v-model="data.thirdSectionB"
              :value="false"
              size="lg"
              class="CustomCheckBox align-bottom d-inline w-25 "
            >
            </b-form-checkbox>
          </div>
          <div class="p-2">
            <div class="d-inline-block font-weight-bolder w-75 Questions">
              أخذ الفرصة بالاعتبار عند احتساب اجمالي الوفر للجهة؟
            </div>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              size="lg"
              v-model="data.thirdSectionC"
              :value="true"
              class="align-bottom d-inline w-25"
            >
            </b-form-checkbox>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              v-model="data.thirdSectionC"
              :value="false"
              size="lg"
              class="CustomCheckBox align-bottom d-inline w-25 "
            >
            </b-form-checkbox>
          </div>
          <div class="p-2">
            <div class="d-inline-block font-weight-bolder w-75 Questions">
              هل وصف الفرصة له علاقة واضحة بتحقيق كفاءة الإنفاق؟
            </div>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              size="lg"
              v-model="data.fourthSectionA"
              :value="true"
              class="align-bottom d-inline w-25"
            >
            </b-form-checkbox>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              v-model="data.fourthSectionA"
              :value="false"
              size="lg"
              class="CustomCheckBox align-bottom d-inline w-25 "
            >
            </b-form-checkbox>
          </div>
          <div class="p-2">
            <div class="d-inline-block font-weight-bolder w-75 Questions">
              هل تم تحديد مالك الفرصة ؟
            </div>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              size="lg"
              v-model="data.fifthSectionA"
              :value="true"
              class="align-bottom d-inline w-25"
            >
            </b-form-checkbox>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              v-model="data.fifthSectionA"
              :value="false"
              size="lg"
              class="CustomCheckBox align-bottom d-inline w-25 "
            >
            </b-form-checkbox>
          </div>
          <div class="p-2">
            <div class="d-inline-block font-weight-bolder w-75 Questions">
              هل تم تحديد إجمالي حجم الفرصة مع/بدون تحديد التوزيع السنوي لإجمالي
              حجم الفرصة
            </div>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              size="lg"
              v-model="data.fourthSectionE"
              :value="true"
              class="align-bottom d-inline w-25"
            >
            </b-form-checkbox>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              v-model="data.fourthSectionE"
              :value="false"
              size="lg"
              class="CustomCheckBox align-bottom d-inline w-25 "
            >
            </b-form-checkbox>
          </div>
        </div>

        <!-------- financial data and saving from Questions ------>
        <div v-if="CurrentTab === $t('financialdataandsaving')">
          <div class="p-2">
            <div class="d-inline-block font-weight-bolder w-75 Questions">
              هل تم تحديد رقم البند المتعلق في الميزانية بشكل صحيح؟
            </div>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              size="lg"
              v-model="data.fourthSectionB"
              :value="true"
              class="align-bottom d-inline w-25"
            >
            </b-form-checkbox>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              v-model="data.fourthSectionB"
              :value="false"
              size="lg"
              class="CustomCheckBox align-bottom d-inline w-25 "
            >
            </b-form-checkbox>
          </div>
          <div class="p-2">
            <div class="d-inline-block font-weight-bolder w-75 Questions">
              هل تم تحديد اسم البند المتعلق في الميزانية بشكل صحيح؟
            </div>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              size="lg"
              v-model="data.fourthSectionC"
              :value="true"
              class="align-bottom d-inline w-25"
            >
            </b-form-checkbox>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              v-model="data.fourthSectionC"
              :value="false"
              size="lg"
              class="CustomCheckBox align-bottom d-inline w-25 "
            >
            </b-form-checkbox>
          </div>
          <div class="p-2">
            <div class="d-inline-block font-weight-bolder w-75 Questions">
              تحديد التوزيع السنوي لإجمالي حجم الفرصة بدون تحديد إجمالي حجم
              الفرصة؟
            </div>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              size="lg"
              v-model="data.fourthSectionF"
              :value="true"
              class="align-bottom d-inline w-25"
            >
            </b-form-checkbox>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              v-model="data.fourthSectionF"
              :value="false"
              size="lg"
              class="CustomCheckBox align-bottom d-inline w-25 "
            >
            </b-form-checkbox>
          </div>
          <div class="p-2">
            <div class="d-inline-block font-weight-bolder w-75 Questions">
              التوزيع السنوي متوائم مع إجمالي الوفر من الفرصة
            </div>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              size="lg"
              v-model="data.fourthSectionG"
              :value="true"
              class="align-bottom d-inline w-25"
            >
            </b-form-checkbox>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              v-model="data.fourthSectionG"
              :value="false"
              size="lg"
              class="CustomCheckBox align-bottom d-inline w-25 "
            >
            </b-form-checkbox>
          </div>
          <div class="p-2">
            <div class="d-inline-block font-weight-bolder w-75 Questions">
              هل تم تحديد قيمة البند ؟
            </div>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              size="lg"
              v-model="data.fourthSectionD"
              :value="true"
              class="align-bottom d-inline w-25"
            >
            </b-form-checkbox>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              v-model="data.fourthSectionD"
              :value="false"
              size="lg"
              class="CustomCheckBox align-bottom d-inline w-25 "
            >
            </b-form-checkbox>
          </div>
        </div>

        <!-------- calculation of savings from Questions ------>
        <div v-if="CurrentTab === $t('calculationofsavings')">
          <div class="p-2">
            <div class="d-inline-block font-weight-bolder w-75 Questions">
              هل تم تحديد آلية احتساب الأثر
            </div>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              size="lg"
              v-model="data.fourthSectionH"
              :value="true"
              class="align-bottom d-inline w-25"
            >
            </b-form-checkbox>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              v-model="data.fourthSectionH"
              :value="false"
              size="lg"
              class="CustomCheckBox align-bottom d-inline w-25 "
            >
            </b-form-checkbox>
          </div>
        </div>

        <!-------- implementations plan from Questions ------>
        <div v-if="CurrentTab === $t('implementationsplan')">
          <div class="p-2">
            <div class="d-inline-block font-weight-bolder w-75 Questions">
              هل خطة التنفيذ واضحة (محطات مرحلية، تواريخ بدء وانتهاء محددة، حالة
              الإنجاز)؟
            </div>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              size="lg"
              v-model="data.fifthSectionB"
              :value="true"
              class="align-bottom d-inline w-25"
            >
            </b-form-checkbox>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              v-model="data.fifthSectionB"
              :value="false"
              size="lg"
              class="CustomCheckBox align-bottom d-inline w-25 "
            >
            </b-form-checkbox>
          </div>
          <div class="p-2">
            <div class="d-inline-block font-weight-bolder w-75 Questions">
              هل تاريخ البدء والانتهاء للمحطات المرحلية متواءمة مع تاريخ بداية
              ونهاية الفرصة؟
            </div>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              size="lg"
              v-model="data.fifthSectionC"
              :value="true"
              class="align-bottom d-inline w-25"
            >
            </b-form-checkbox>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              v-model="data.fifthSectionC"
              :value="false"
              size="lg"
              class="CustomCheckBox align-bottom d-inline w-25 "
            >
            </b-form-checkbox>
          </div>
          <div class="p-2">
            <div class="d-inline-block font-weight-bolder w-75 Questions">
              هل تم تحديد حالة الإنجاز لمعالم خطة التنفيذ؟
            </div>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              size="lg"
              v-model="data.fifthSectionD"
              :value="true"
              class="align-bottom d-inline w-25"
            >
            </b-form-checkbox>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              v-model="data.fifthSectionD"
              :value="false"
              size="lg"
              class="CustomCheckBox align-bottom d-inline w-25 "
            >
            </b-form-checkbox>
          </div>
          <div class="font-weight-bold p-2"></div>
          <div class="p-2 position-relative">
            <span
              class="font-weight-bold"
              style="position: absolute; left: 69px;"
              >< 10</span
            >
            <span
              class="font-weight-bold"
              style="position: absolute; left: 30px;"
              >> 10</span
            >
            <div class="d-inline-block font-weight-bolder w-75 Questions">
              هل يوجد تأخير في حالة الإنجاز لمعالم خطة التنفيذ؟
            </div>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              size="lg"
              v-model="data.fifthSectionE"
              :value="true"
              class="align-bottom d-inline w-25"
            >
            </b-form-checkbox>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              v-model="data.fifthSectionE"
              :value="false"
              size="lg"
              class=" align-bottom d-inline w-25 "
            >
            </b-form-checkbox>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              v-model="data.fifthSectionE"
              :value="null"
              size="lg"
              class="CustomCheckBox align-bottom d-inline w-25 "
            >
            </b-form-checkbox>
          </div>
        </div>

        <!-------- summary of implementation plan from Questions ------>
        <div v-if="CurrentTab === $t('summaryofimplementationplan')">
          <div class="p-2">
            <div class="d-inline-block font-weight-bolder w-75 Questions">
              هل تم تحديد حالة الإنجاز لمعالم خطة التنفيذ؟
            </div>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              size="lg"
              v-model="data.fifthSectionD"
              :value="true"
              class="align-bottom d-inline w-25"
            >
            </b-form-checkbox>
            <b-form-checkbox
              :disabled="isApprovedByCSE"
              v-model="data.fifthSectionD"
              :value="false"
              size="lg"
              class="CustomCheckBox align-bottom d-inline w-25 "
            >
            </b-form-checkbox>
          </div>
        </div>
        <div class="text-center w-75 mx-auto">
          <md-button
            :disabled="isApprovedByCSE"
            v-if="
              CurrentTab === $t('generalinformation') ||
                CurrentTab === $t('financialdataandsaving') ||
                CurrentTab === $t('calculationofsavings') ||
                CurrentTab === $t('implementationsplan') ||
                CurrentTab === $t('summaryofimplementationplan')
            "
            class="md-raised md-primary w-100  text-capitalize font-weight-bold comman-gradient border-radius"
            @click="submit()"
          >
            حفظ
          </md-button>
        </div>
      </div>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: [
    "feedback",
    "CurrentTab",
    "initiativeId",
    "CseRole",
    "isApprovedByCSE",
  ],
  data() {
    return {
      current: null,
      data: {
        check: null,
        thirdSectionA: null,
        thirdSectionB: null,
        thirdSectionC: null,
        fourthSectionA: null,
        fourthSectionB: null,
        fourthSectionC: null,
        fourthSectionD: null,
        fourthSectionE: null,
        fourthSectionF: null,
        fourthSectionG: null,
        fourthSectionH: null,
        fifthSectionA: null,
        fifthSectionB: null,
        fifthSectionC: null,
        fifthSectionD: null,
        fifthSectionE: null,
        initiativeId: null,
      },
    };
  },
  methods: {
    submit() {
      this.data.initiativeId = this.initiativeId;
      this.$showLoader();
      if (!this.data.id) {
        this.$FeedBackQuestions.Create(this.data).then((res) => {
          if (res.success) {
            this.getFeedback();
          }
          this.$hideLoader();
        });
      } else {
        this.$FeedBackQuestions.Update(this.data).then((res) => {
          if (res.success) {
            this.getFeedback();
          }
        });
        this.$hideLoader();
      }
    },
    getFeedback() {
      let data = {
        id: this.initiativeId,
      };
      this.$showLoader();
      this.$FeedBackQuestions.GetAll(data).then((res) => {
        if (res.success) {
          if (res.data != null) {
            this.data = res.data;
          }
        }
        this.$hideLoader();
      });
    },
  },
  computed: {},
  mounted() {
    setTimeout(() => {
      this.getFeedback();
    }, 2000);
  },
};
</script>

<style lang="css" scoped>
.feedback-section {
  padding-bottom: 20px;
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
}

.feedback-section-change {
  width: 24%;
  transition: width 1s;
}
.Questions {
  background-color: white;
  border-radius: 6px;
  padding: 0.25rem;
  height: 50px;
}
/* #feedback-section
  .CustomCheckBox
  .custom-control-input:checked
  ~ .custom-control-label::before {
  border-color: red !important;
  background-color: red !important;
} */
</style>
