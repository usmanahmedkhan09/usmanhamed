<template>
  <div class="hello" style="position: relative">
    <activity-log
      v-if="showActivity"
      :showlog="showlog"
      :dataa="data"
      :filterById="filterById"
      fromType="list"
      v-on:childToParent="onChildClick"
    />
    <div class="main-content" v-bind:class="{ full: showlog }">
      <b-row align-h="between" align-v="center">
        <b-col cols="7">
          <img
            style="vertical-align: text-top; cursor: pointer; margin-left: 10px"
            @click="$router.go('-1')"
            src="/images/back.png"
            alt
          />
          <h4 style="font-weight: 600; display: inline-block">
            {{ $t("monthlyReportListHeading") }}
          </h4>
        </b-col>
        <!-- <b-col cols="2">
        <button
          class="btn md-primary main-btn border-radius-5"
          style="width:100%"
        >Submit New Report</button>
        </b-col>-->
      </b-row>

      <div class="main-card py-4 mt-4">
        <template>
          <b-row align-h="between" align-v="center" class="px-4">
            <b-col cols="3">
              <h4 style="font-weight: 600">{{ $t("initiativesList") }}</h4>
            </b-col>
            <b-col cols="9" class="text-align-left-right">
              <!-- <button
                id="external"
                @click="showlog = !showlog"
                class="btn md-primary main-btn border-radius-5"
                style="margin: 0 3px; background: #c8d32d !important;font-size: 13px;"
              >{{$t('activityLogExternal')}}</button>
              <button
                class="btn md-primary main-btn border-radius-5"
                style="margin: 0 3px; background-color: #2582c5 !important;font-size: 13px;"
              >{{$t('activityLogInternal')}}</button>-->
              <button
                v-if="iAmOwner && !hasOnlyEntityInitiatorRole"
                class="btn md-primary main-btn border-radius-5"
                style="margin: 0 3px; font-size: 13px"
                @click="openFeedback"
              >
                {{ $t("submitFeedback") }}
              </button>
              <button
                v-if="
                  initiativeAssessments.initiatives &&
                    initiativeAssessments.initiatives.length > 0 &&
                    iAmOwner &&
                    $user.currentRole() == 'CSE Reviewer A'
                "
                class="btn md-primary main-btn border-radius-5"
                style="margin: 0 3px; font-size: 13px; background: #c8d32d"
                @click="isAssessment = !isAssessment"
              >
                {{ $t("submitAssessment") }}
              </button>
            </b-col>
          </b-row>
          <b-table
            class="mt-4"
            striped
            hover
            :items="initiativeItems"
            :fields="initiativeFields"
          >
            <template v-slot:cell(achievement)="data">
              <div
                v-if="data.item.status == '1'"
                class="assessment"
                style="background: #337180"
              ></div>
              <div
                v-if="data.item.status == '2'"
                class="assessment"
                style="background: #00b050"
              ></div>
              <div
                v-if="data.item.status == '3'"
                class="assessment"
                style="background: #ffff00"
              ></div>
              <div
                v-if="data.item.status == '4'"
                class="assessment"
                style="background: #ff0000"
              ></div>
            </template>
            <template v-slot:cell(actions)="data">
              <b class="text-info">
                <button
                  class="btn main-btn border-radius-5 comman-gradient border-radius view m-1"
                  @click="onView(data.item)"
                >
                  {{ $t("view") }}
                </button>
                <button
                  class="btn md-primary main-btn border-radius-5 comman-gradient border-radius view m-1"
                  @click="filterById = data.item.id"
                >
                  عرض الملاحظات
                </button>
                <button
                  v-if="
                    hasOnlyEntityInitiatorRole &&
                      currentOwner == 'Entity Initiator' &&
                      initiativeItems[0] == getFormatedReportName(new Date())
                  "
                  :disabled="data.item.isSubmitted"
                  class="btn md-delete main-btn border-radius-5 delete m-1"
                  @click="onDelete(data.item)"
                >
                  حذف
                </button>
                <!--<button class="btn md-primary main-btn border-radius-5 edit">
              <img style="width: 17px;" src="/images/icons/edit.png" alt />
            </button>
             <button class="btn md-primary main-btn border-radius-5 delete" @click="onDelete">
              <img style="width: 15px;" src="/images/icons/delete.png" alt />
                </button> !-->
              </b>
            </template>
            <template v-slot:cell(number)="data">{{
              data.item.number ? data.item.number : "N/A"
            }}</template>
            <template v-slot:cell(expSaveValue)="data">
              <span>{{ formatAsCurrency(data.item.expSaveValue) }}</span>
              <!-- <span> || {{data.item.actualSaveAmount}}</span> -->
            </template>
          </b-table>
          <h5
            v-if="initiativeItems && initiativeItems.length == 0"
            class="text-center"
          >
            {{ $t("thereAreCurrentlyNoRecords") }}
          </h5>

          <!--<div class="pagination-div mt-4 mx-5">
          <b-pagination
            class="d-inline-flex"
            v-model="currentPage"
            :total-rows="totalCount"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
          </div>-->
        </template>
        <!-- <template v-else>No Record Found</template> -->
      </div>

      <div class="main-card py-4 mt-4">
        <template>
          <b-row align-h="between" align-v="center" class="px-4">
            <b-col cols="4">
              <h4 style="font-weight: 600">
                {{ $t("supportRequired") }} [اختياري]
              </h4>
            </b-col>
            <b-col class="text-align-left-right">
              <button
                v-show="
                  ((!formDisabled && hasOnlyEntityInitiatorRole && iAmOwner) ||
                    firstVisitInitiative) &&
                    isCurrentMonthReport
                "
                class="btn md-primary main-btn"
                style="font-size: 14px"
                @click="onCreateSupport"
              >
                {{ $t("addSupportRequiredFromTheCenter") }}
              </button>
            </b-col>
          </b-row>
          <b-table
            class="mt-4"
            striped
            hover
            :items="supportItems"
            :fields="supportFields"
          >
            <template
              v-slot:cell(actions)="data"
              v-if="
                (!formDisabled && hasOnlyEntityInitiatorRole && iAmOwner) ||
                  firstVisitInitiative
              "
            >
              <b class="text-info">
                <button
                  class="btn md-primary main-btn border-radius-5 view"
                  :disabled="formDisabled"
                  @click="onSupportEdit(data.item)"
                >
                  {{ $t("edit") }}
                </button>
              </b>
            </template>
            <template v-slot:cell(achievement)="data">
              <div
                v-if="data.item.achievement == '1'"
                class="assessment"
                style="background: #337180"
              ></div>
              <div
                v-if="data.item.achievement == '2'"
                class="assessment"
                style="background: #00b050"
              ></div>
              <div
                v-if="data.item.achievement == '3'"
                class="assessment"
                style="background: #ffff00"
              ></div>
              <div
                v-if="data.item.achievement == '4'"
                class="assessment"
                style="background: #ff0000"
              ></div>
            </template>
            <template v-slot:cell(description)="data">
              <span :title="data.item.description">{{
                data.item.description
              }}</span>
            </template>
            <template v-slot:cell(initiativeName)="data">{{
              data.item.initiativeName == "others"
                ? "دعم أخر"
                : data.item.initiativeName
            }}</template>
            <template v-slot:cell(number)="data">{{
              data.item.number ? data.item.number : "N/A"
            }}</template>
            <template v-slot:cell(supportType)="data">{{
              data.item.supportType == "typeA"
                ? "دعم مالي"
                : data.item.supportType == "typeB"
                ? "دعم فني"
                : data.item.supportType == "typeC"
                ? "دعم اداري"
                : data.item.supportType == "typeD"
                ? "دعم تنظيمي وقانوني"
                : data.item.supportType == "typeE"
                ? "دعم اخر"
                : "N/A"
            }}</template>
          </b-table>

          <h5
            v-if="supportItems && supportItems.length == 0"
            class="text-center"
          >
            {{ $t("thereAreCurrentlyNoRecords") }}
          </h5>
          <!-- <div class="pagination-div mt-4 mx-5">
          <b-pagination
            class="d-inline-flex"
            v-model="currentPage"
            :total-rows="totalCount"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
          </div>-->
        </template>
        <!-- <template v-else>No Record Found</template> -->
      </div>

      <div class="main-card py-4 mt-4">
        <template>
          <b-row align-h="between" align-v="center" class="px-4">
            <b-col cols="4">
              <h4 style="font-weight: 600">
                {{ $t("minutesOfMeeting") }} [اختياري]
              </h4>
            </b-col>
            <b-col class="text-align-left-right">
              <button
                v-show="
                  ((!formDisabled && hasOnlyEntityInitiatorRole && iAmOwner) ||
                    firstVisitInitiative) &&
                    isCurrentMonthReport
                "
                class="btn md-primary main-btn"
                style="font-size: 14px"
                @click="onCreateMinute"
              >
                {{ $t("addDetailOfMinutesOfMeetingButton") }}
              </button>
            </b-col>
          </b-row>
          <b-table
            class="mt-4"
            striped
            hover
            :items="meetingItems"
            :fields="meetingFields"
          >
            <template
              v-slot:cell(actions)="data"
              v-if="
                (!formDisabled && hasOnlyEntityInitiatorRole && iAmOwner) ||
                  firstVisitInitiative
              "
            >
              <b class="text-info">
                <button
                  class="btn md-primary main-btn border-radius-5 view"
                  :disabled="formDisabled"
                  @click="onMinuteEdit(data.item)"
                >
                  {{ $t("edit") }}
                </button>
              </b>
            </template>
            <template v-slot:cell(achievement)="data">
              <div
                v-if="data.item.achievement == '1'"
                class="assessment"
                style="background: #337180"
              ></div>
              <div
                v-if="data.item.achievement == '2'"
                class="assessment"
                style="background: #00b050"
              ></div>
              <div
                v-if="data.item.achievement == '3'"
                class="assessment"
                style="background: #ffff00"
              ></div>
              <div
                v-if="data.item.achievement == '4'"
                class="assessment"
                style="background: #ff0000"
              ></div>
            </template>
            <template v-slot:cell(description)="data">
              <span :title="data.item.description">{{
                data.item.description
              }}</span>
            </template>
            <template v-slot:cell(attachment)="data">
              <span v-if="data.item.uploadMinutesOfMeeting.length > 0">
                <a
                  style="
                    color: #4182c5;
                    text-decoration: underline;
                    cursor: pointer;
                    font-weight: bold;
                  "
                  :href="
                    'http://3.124.65.120' +
                      data.item.uploadMinutesOfMeeting[0].path
                  "
                  target="_blank"
                  >View File</a
                >
              </span>
              <span v-if="data.item.uploadMinutesOfMeeting.length == 0"
                >N/A</span
              >
            </template>

            <template v-slot:cell(number)="data">{{
              data.item.number ? data.item.number : "N/A"
            }}</template>
          </b-table>
          <h5
            v-if="meetingItems && meetingItems.length == 0"
            class="text-center"
          >
            {{ $t("thereAreCurrentlyNoRecords") }}
          </h5>
        </template>
        <!-- <template v-else>No Record Found</template> -->
      </div>

      <b-row class="my-4" align-h="start" align-v="center">
        <b-col cols="3" v-if="this.currentOwner == 'CSE Approver'">
          <button
            v-if="!dontGoBack && iAmOwner"
            class="btn md-primary main-btn"
            style="width: 100%; font-size: 14px"
            @click="onCSEApprover"
            :disabled="sending"
          >
            {{ $t("approve") }}
          </button>
        </b-col>
        <b-col
          cols="3"
          v-if="
            ((!formDisabled && iAmOwner) ||
              this.currentOwner.length == 0 ||
              firstVisitInitiative) &&
              hasOnlyEntityInitiatorRole
          "
        >
          <button
            class="btn md-primary main-btn comman-gradient border-radius"
            style="width: 100%; font-size: 14px"
            @click="addInitiative"
          >
            {{ $t("addANewInitiative") }}
          </button>
        </b-col>

        <b-col
          cols="3"
          v-if="
            (hasAdminRole || hasCSERole) &&
              !hasEntityRole &&
              !formDisabled &&
              iAmOwner &&
              !firstVisitInitiative
          "
        >
          <button
            class="btn md-primary main-btn comman-gradient border-radius"
            style="width: 100%; font-size: 14px"
            @click="approveReport"
            :disabled="sending"
          >
            {{ $t("approveNewReport") }}
          </button>
        </b-col>
        <b-col cols="3" v-if="findReportTable($user.currentRole(), false)">
          <button
            v-if="!dontGoBack && iAmOwner"
            class="btn md-primary main-btn border-radius"
            style="width: 100%; font-size: 14px"
            @click="(confirm = true), submitReport(false)"
            :disabled="sending"
          >
            {{ $t("returnBackTo")
            }}{{ findReportTable($user.currentRole(), false) }}
          </button>
        </b-col>
        <b-col
          cols="3"
          v-if="
            findReportTable($user.currentRole(), true) && !firstVisitInitiative
          "
        >
          <button
            v-if="iAmOwner && isCurrentMonthReport"
            class="btn md-primary main-btn"
            style="width: 100%; font-size: 14px"
            @click="$bvModal.show('confirmMessage')"
            :disabled="sending"
          >
            {{ $t("submitTo") }}{{ findReportTable($user.currentRole(), true) }}
          </button>
        </b-col>
      </b-row>

      <feedBackForm
        :data="propData"
        @closePop="closePop"
        @addLogData="addLogData"
        :feedBackFormObj="feedBackFormObj"
        v-if="isReturnBack"
      />

      <md-dialog :md-active.sync="isCSEApprover">
        <md-dialog-title></md-dialog-title>
        <div class="px-5" style="overflow: auto">
          <h4 style="font-weight: 600">الموافقة على التقرير الشهري</h4>

          <b-table
            class="mt-4"
            striped
            hover
            :items="GetAllCSEFeedBackItems"
            :fields="GetAllCSEFeedBackFields"
          >
            <template v-slot:cell(initiativeName)="data">
              <span>{{
                data.item.initiativeName ? data.item.initiativeName : "N/A"
              }}</span>
            </template>
            <template v-slot:cell(initiativeId)="data">
              <span>{{
                data.item.initiativeId == null
                  ? "التقرير الشهري"
                  : $t("initiative")
              }}</span>
            </template>
            <template v-slot:cell(feedbackType)="data">
              <b class="text-info">
                <select v-model="data.item.feedbackType">
                  <option value="internal">ملاحظات داخلية</option>
                  <option value="external">ملاحظات للجهة</option>
                </select>
              </b>
            </template>
          </b-table>
          <div
            style="
              display: block;
              width: 100%;
              text-align: right;
              margin-bottom: 10px;
            "
          >
            <a
              class="btn md-primary main-btn border-radius-5 cancel-btn"
              @click="isCSEApprover = false"
              >{{ $t("cancel") }}</a
            >
            <button
              @click="onSubmitAllFeedback"
              class="btn md-primary main-btn border-radius-5 create-btn"
              style="width: 255px"
              :disabled="sending"
            >
              {{ $t("approve") }}
            </button>
          </div>
        </div>
        <md-dialog-actions></md-dialog-actions>
      </md-dialog>

      <md-dialog :md-active.sync="isCreateSupport">
        <md-dialog-title></md-dialog-title>
        <div class="px-5" style="overflow: auto">
          <h4 style="font-weight: 600">{{ $t("supportRequired") }}</h4>

          <form
            novalidate
            class="md-layout"
            @submit.prevent="validateSupportForm"
          >
            <b-row align-v="center" class="mt-4" style="width: 100%">
              <b-col cols="6">
                <!-- initiativeItems -->
                <md-field :class="getValidationClass('initiativeName')">
                  <label for="initiativename">{{ $t("initiativeName") }}</label>
                  <md-select
                    name="type"
                    id="type"
                    v-model="supportForm.initiativeName"
                    md-dense
                  >
                    <md-option :value="null">{{
                      $t("selectAnOption")
                    }}</md-option>
                    <md-option
                      v-for="item of initiativeItems"
                      v-bind:key="item"
                      :value="item.name"
                      >{{ item.name }}</md-option
                    >
                    <md-option value="others">دعم أخر</md-option>
                  </md-select>
                  <!-- <md-input
                    name="initiativename"
                    id="initiativename"
                    autocomplete="given-name"
                    v-model="supportForm.initiativeName"
                  />-->
                  <span
                    class="md-error"
                    v-if="!$v.supportForm.initiativeName.required"
                    >initiativename is required</span
                  >
                </md-field>
              </b-col>

              <b-col cols="6">
                <md-field :class="getValidationClass('supportType')">
                  <label for="type">{{ $t("type") }}</label>

                  <md-select
                    name="type"
                    id="type"
                    v-model="supportForm.supportType"
                    md-dense
                  >
                    <md-option :value="null">{{
                      $t("selectAnOption")
                    }}</md-option>
                    <md-option value="typeA">دعم مالي</md-option>
                    <md-option value="typeB">دعم فني</md-option>
                    <md-option value="typeC">دعم اداري</md-option>
                    <md-option value="typeD">دعم تنظيمي وقانوني</md-option>
                    <md-option value="typeE">دعم اخر</md-option>
                  </md-select>
                  <span
                    class="md-error"
                    v-if="!$v.supportForm.supportType.required"
                    >type is required</span
                  >
                  <span
                    class="md-error"
                    v-else-if="!$v.supportForm.supportType.minlength"
                    >Invalid type</span
                  >
                </md-field>
              </b-col>
              <b-col cols="12">
                <md-field :class="getValidationClass('description')">
                  <label for="description">{{ $t("enterDescription") }}</label>
                  <md-textarea
                    v-model="supportForm.description"
                    name="subTitle"
                    id="subTitle"
                    autocomplete="given-name"
                  ></md-textarea>
                  <span
                    class="md-error"
                    v-if="!$v.supportForm.description.required"
                    >description is required</span
                  >
                  <span
                    class="md-error"
                    v-else-if="!$v.supportForm.description.minlength"
                    >description password</span
                  >
                </md-field>
              </b-col>
            </b-row>
            <div
              style="
                display: block;
                width: 100%;
                text-align: right;
                margin-bottom: 10px;
              "
            >
              <a
                class="btn md-primary main-btn border-radius-5 cancel-btn"
                @click="isCreateSupport = false"
                >{{ $t("cancel") }}</a
              >

              <button
                class="btn md-primary main-btn border-radius-5 create-btn"
                style="width: 255px"
                :disabled="sending"
              >
                {{ supportFormButton }}
              </button>
            </div>
          </form>
        </div>
        <md-dialog-actions></md-dialog-actions>
      </md-dialog>

      <md-dialog :md-active.sync="isCreateMeeting">
        <md-dialog-title></md-dialog-title>
        <div class="px-5" style="overflow: auto">
          <h4 style="font-weight: 600">
            {{ $t("popupHeadingOfMinutesOfMeeting") }}
          </h4>

          <form
            novalidate
            class="md-layout"
            @submit.prevent="validateMeetingForm"
          >
            <b-row align-v="center" class="mt-4" style="width: 100%">
              <b-col cols="4">
                <md-datepicker
                  v-show="sending || !formDisabled"
                  v-model="formMeeting.date"
                  md-immediately
                  name="date"
                  id="date"
                >
                  <label for="date">تاريخ الانعقاد</label>
                </md-datepicker>

                <!-- <md-field :class="getValidationClassMeeting('date')">
                  <label for="date">تاريخ الانعقاد</label>

                  <md-input
                    name="date"
                    id="date"
                    autocomplete="given-name"
                    v-model="formMeeting.date"
                    :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.formMeeting.date.required">date is required</span>
                  <span class="md-error" v-else-if="!$v.formMeeting.date.minlength">date invalid</span>
                </md-field>-->
              </b-col>
              <b-col cols="8">
                <md-field :class="getValidationClass('objectiveType')">
                  <label for="type">عنوان الاجتماع</label>
                  <md-input
                    autocomplete="given-name"
                    v-model="formMeeting.objectiveType"
                  />
                  <span
                    class="md-error"
                    v-if="!$v.formMeeting.objectiveType.required"
                    >type is required</span
                  >
                  <span
                    class="md-error"
                    v-else-if="!$v.formMeeting.objectiveType.minlength"
                    >Invalid type</span
                  >
                </md-field>

                <!-- <md-field :class="getValidationClass('objectiveType')">
                  <label for="type">عنوان الاجتماع</label>

                  <md-select name="type" id="type" v-model="formMeeting.objectiveType" md-dense>
                    <md-option :value="null">{{$t('selectAnOption')}}</md-option>
                    <md-option value="typeA">Type A</md-option>
                    <md-option value="typeB">Type B</md-option>
                    <md-option value="typeC">Type C</md-option>
                  </md-select>
                  <span
                    class="md-error"
                    v-if="!$v.formMeeting.objectiveType.required"
                  >type is required</span>
                  <span
                    class="md-error"
                    v-else-if="!$v.formMeeting.objectiveType.minlength"
                  >Invalid type</span>
                </md-field>-->
              </b-col>
            </b-row>
            <b-row align-v="center" class="mt-4" style="width: 100%">
              <b-col cols="12">
                <md-field :class="getValidationClassMeeting('description')">
                  <label for="description">مخرجات الاجتماع</label>
                  <md-textarea
                    v-model="formMeeting.description"
                    name="subTitle"
                    id="subTitle"
                    autocomplete="given-name"
                  ></md-textarea>
                  <span
                    class="md-error"
                    v-if="!$v.formMeeting.description.required"
                    >description is required</span
                  >
                  <span
                    class="md-error"
                    v-else-if="!$v.formMeeting.description.minlength"
                    >description password</span
                  >
                </md-field>
              </b-col>
            </b-row>
            <b-row align-v="center" class="my-4" style="width: 100%">
              <b-col cols="4">
                <label for="imageUpload">الملحقات</label>
                <input
                  type="file"
                  id="imageUpload"
                  ref="file"
                  name="file"
                  multiple
                  @change="onChangeFile()"
                />
              </b-col>
              <!-- <b-col cols="12" class="mt-3" v-if="filesArray.length > 0">
                <div
                  style="display: inline-block;position:relative; margin: 0 28px;"
                  v-for="(item, index) of filesArray"
                  v-bind:key="index"
                >
                  <img
                    src="/images/icons/close.png"
                    @click="onDeleteFile(item,index)"
                    style="width: 15px;float: left;position: absolute;left: -15px;top: -13px;cursor:pointer"
                    alt
                  />
                  <img style="margin: 0 8px" src="/images/icons/generic-attachment.png" alt />
                  <span>{{item.name}}</span>
                </div>
              </b-col>-->
            </b-row>
            <div
              style="
                display: block;
                width: 100%;
                text-align: right;
                margin-bottom: 10px;
              "
            >
              <a
                class="btn md-primary main-btn border-radius-5 cancel-btn"
                @click="isCreateMeeting = false"
                >{{ $t("cancel") }}</a
              >
              <button
                class="btn md-primary main-btn border-radius-5 create-btn"
                style="width: 255px"
                :disabled="sending"
              >
                {{ minuteFormButton }}
              </button>
            </div>
          </form>
        </div>
        <md-dialog-actions></md-dialog-actions>
      </md-dialog>

      <md-dialog :md-active.sync="isAssessment">
        <md-dialog-title></md-dialog-title>

        <h4 class="px-5" style="font-weight: 600">تسليم التقييم</h4>

        <div style="overflow: auto">
          <div
            class="mt-3 px-5 py-2"
            style="background: #fafafa; border-bottom: 1px solid #57b2b7"
          >
            <h5>{{ $t("assessmentSectionOne") }}</h5>
          </div>
          <b-row align-v="center" class="mb-2 px-5" style="width: 100%">
            <b-col cols="6">
              <b-row align-v="center" class="mb-2" style="width: 100%">
                <b-col cols="6">
                  <span
                    style="font-size: 15px; display: block; font-weight: 600"
                    >{{ $t("AssessmentTitleOne") }}</span
                  >
                  <span class="mt-2" style="font-size: 12px">{{
                    $t("AssessmentLabelOne")
                  }}</span>
                </b-col>
                <b-col cols="6">
                  <md-field>
                    <label for="type">تقييم</label>

                    <md-select
                      name="type"
                      id="type"
                      md-dense
                      v-model="initiativeAssessments.evaluateLevel"
                    >
                      <md-option :value="null">{{
                        $t("selectAnOption")
                      }}</md-option>
                      <md-option value="Good">متقدم</md-option>
                      <md-option value="Average">متوسط مرتفع</md-option>
                      <md-option value="Below average">متوسط منخفض</md-option>
                      <md-option value="Begginer">مبتدئ</md-option>
                    </md-select>
                  </md-field>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="6">
              <b-row align-v="center" class="mb-2" style="width: 100%">
                <b-col cols="6">
                  <span
                    style="font-size: 15px; display: block; font-weight: 600"
                    >{{ $t("AssessmentTitleTwo") }}</span
                  >
                  <span class="mt-2" style="font-size: 12px">{{
                    $t("AssessmentLabelTwo")
                  }}</span>
                </b-col>
                <b-col cols="6">
                  <md-field>
                    <label for="type">تقييم</label>

                    <md-select
                      name="type"
                      id="type"
                      md-dense
                      v-model="initiativeAssessments.commitment"
                    >
                      <md-option :value="null">{{
                        $t("selectAnOption")
                      }}</md-option>
                      <md-option value="Good">متقدم</md-option>
                      <md-option value="Average">متوسط مرتفع</md-option>
                      <md-option value="Below average">متوسط منخفض</md-option>
                      <md-option value="Begginer">مبتدئ</md-option>
                    </md-select>
                  </md-field>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="6">
              <b-row align-v="center" class="mb-2" style="width: 100%">
                <b-col cols="6">
                  <span
                    style="font-size: 15px; display: block; font-weight: 600"
                    >{{ $t("AssessmentTitleThree") }}</span
                  >
                  <span class="mt-2" style="font-size: 12px">{{
                    $t("AssessmentLabelThree")
                  }}</span>
                </b-col>
                <b-col cols="6">
                  <md-field>
                    <label for="type">تقييم</label>

                    <md-select
                      name="type"
                      id="type"
                      md-dense
                      v-model="initiativeAssessments.sizeOfOpportunities"
                    >
                      <md-option :value="null">{{
                        $t("selectAnOption")
                      }}</md-option>
                      <md-option value="Good">متقدم</md-option>
                      <md-option value="Average">متوسط مرتفع</md-option>
                      <md-option value="Below average">متوسط منخفض</md-option>
                      <md-option value="Begginer">مبتدئ</md-option>
                    </md-select>
                  </md-field>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="6">
              <b-row align-v="center" class="mb-2" style="width: 100%">
                <b-col cols="6">
                  <span
                    style="font-size: 15px; display: block; font-weight: 600"
                    >{{ $t("AssessmentTitleFour") }}</span
                  >
                  <span class="mt-2" style="font-size: 12px">{{
                    $t("AssessmentLabelFour")
                  }}</span>
                </b-col>
                <b-col cols="6">
                  <md-field>
                    <label for="type">تقييم</label>

                    <md-select
                      name="type"
                      id="type"
                      md-dense
                      v-model="initiativeAssessments.clarityOfOpportunities"
                    >
                      <md-option :value="null">{{
                        $t("selectAnOption")
                      }}</md-option>
                      <md-option value="Good">متقدم</md-option>
                      <md-option value="Average">متوسط مرتفع</md-option>
                      <md-option value="Below average">متوسط منخفض</md-option>
                      <md-option value="Begginer">مبتدئ</md-option>
                    </md-select>
                  </md-field>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="6">
              <b-row align-v="center" class="mb-2" style="width: 100%">
                <b-col cols="6">
                  <span
                    style="font-size: 15px; display: block; font-weight: 600"
                    >{{ $t("AssessmentTitleFive") }}</span
                  >
                  <span class="mt-2" style="font-size: 12px">{{
                    $t("AssessmentLabelFive")
                  }}</span>
                </b-col>
                <b-col cols="6">
                  <md-field>
                    <label for="type">تقييم</label>

                    <md-select
                      name="type"
                      id="type"
                      md-dense
                      v-model="initiativeAssessments.implementation"
                    >
                      <md-option :value="null">{{
                        $t("selectAnOption")
                      }}</md-option>
                      <md-option value="Good">متقدم</md-option>
                      <md-option value="Average">متوسط مرتفع</md-option>
                      <md-option value="Below average">متوسط منخفض</md-option>
                      <md-option value="Begginer">مبتدئ</md-option>
                    </md-select>
                  </md-field>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="6">
              <span style="font-size: 18px; display: block; font-weight: 600">{{
                $t("requirementsNote")
              }}</span>
              <md-field>
                <md-textarea
                  autocomplete="given-name"
                  v-model="initiativeAssessments.requirementNotes"
                ></md-textarea>
              </md-field>
            </b-col>
          </b-row>
          <div
            class="mt-3 px-5 py-2"
            style="background: #fafafa; border-bottom: 1px solid #57b2b7"
          >
            <h5>{{ $t("assessmentSectionTwo") }}</h5>
          </div>
          <b-row
            align-v="center"
            class="mb-2 px-5"
            style="width: 100%"
            v-for="(item, index) in initiativeAssessments.initiatives"
            v-bind:key="index"
          >
            <b-col cols="4">
              <span style="font-size: 15px; display: block">{{
                item.name
              }}</span>
            </b-col>
            <b-col cols="4">
              <md-field>
                <label for="type">تقييم الفرصة</label>

                <md-select
                  name="type"
                  id="type"
                  md-dense
                  v-model="item.assessment"
                >
                  <md-option :value="null">{{
                    $t("selectAnOption")
                  }}</md-option>
                  <md-option value="Good">متقدم</md-option>
                  <md-option value="Average">متوسط مرتفع</md-option>
                  <md-option value="Below average">متوسط منخفض</md-option>
                  <md-option value="Begginer">مبتدئ</md-option>
                </md-select>
              </md-field>
            </b-col>
            <b-col cols="4">
              <md-field>
                <label for="type">حالة التقدم</label>

                <md-select
                  name="type"
                  id="type"
                  md-dense
                  v-model="item.progressStatus"
                >
                  <md-option :value="null">{{
                    $t("selectAnOption")
                  }}</md-option>
                  <md-option value="Time delay more than 10%">{{
                    $t("timeDelayMoreThan")
                  }}</md-option>
                  <md-option value="Time delay of less than 10%">{{
                    $t("timeDelayOfLessThan")
                  }}</md-option>
                  <md-option value="According to the plan">{{
                    $t("accordingToThePlan")
                  }}</md-option>
                  <md-option value="Not started">{{
                    $t("notStarted")
                  }}</md-option>
                  <md-option value="Completed">{{ $t("completed") }}</md-option>
                </md-select>
              </md-field>
            </b-col>
          </b-row>
        </div>
        <div
          class="px-5 my-4"
          style="display: block; width: 100%; text-align: right"
        >
          <button
            class="btn md-primary main-btn border-radius-5 create-btn"
            style="width: 255px"
            @click="saveAssessment"
            :disabled="!validInitiativeAssessments"
          >
            حفظ التقييم
          </button>
          <a
            class="btn md-primary main-btn border-radius-5 cancel-btn"
            @click="isAssessment = false"
            >{{ $t("cancel") }}</a
          >
        </div>
        <!-- <md-dialog-actions></md-dialog-actions> -->
      </md-dialog>

      <b-modal
        id="confirmMessage"
        centered
        :hide-header="true"
        :hide-footer="true"
      >
        <div class="p-5 text-center">
          <h3 class="font-weight-bold">Are you sure you want to submit</h3>
        </div>
        <div>
          <md-button
            class="btn md-raised main-btn text-capitalize"
            @click="
              (confirm = true),
                submitReport(true),
                $bvModal.hide('confirmMessage')
            "
            >Submit</md-button
          >
          <md-button
            class="md-raised main-btn text-capitalize"
            @click="$bvModal.hide('confirmMessage')"
            >Cancel</md-button
          >
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import rolesMixin from "../../mixins/RolesMixins.js";
import feedBackForm from "./FeedbackForm";
import format from "date-fns/format";
import ActivityLog from "../ActivityLog";
import { validationMixin } from "vuelidate";
import $ from "jquery";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
export default {
  name: "monthlyReportList",
  mixins: [validationMixin, rolesMixin],
  components: {
    feedBackForm,
    ActivityLog,
  },
  data() {
    let dateFormat = "YYYY-MM-DD";
    let now = new Date();
    return {
      confirm: false,
      isCurrentMonthReport: false,
      filesArray: [],
      filterById: 0,
      isCSEApprover: false,
      firstVisitInitiative: false,
      uploadFile: "",
      feedBackFormObj: {},
      isAssessment: false,
      escape: false,
      showlog: false,
      showActivity: false,
      activityLogs: [],
      formDisabled: false,
      isReturnBack: false,
      isCreateSupport: false,
      isCreateMeeting: false,

      supportForm: {
        monthlyReportId: 0,
        initiativeName: "",
        supportType: "",
        description: "",
        id: 0,
      },
      formMeeting: {
        monthlyReportId: 0,
        objectiveType: "",
        date: format(now, dateFormat),
        description: null,
      },
      options: {
        isActive: true,
        SkipCount: 0,
        MaxResultCount: 100,
        action: "",
      },
      perPage: 2,
      disabledSearch: false,
      totalCount: 0,
      isCreateDialog: false,
      search: null,
      userSaved: false,
      sending: false,
      lastUser: null,
      detail: false,
      currentOwner: "",
      propData: {
        sections: ["المبادرات", "الدعم المطلوب", "محضر الاجتماع"],
        type: "Report",
      },
      data: [],
      currentPage: 1,
      // Note `isActive` is left out and will not appear in the rendered table
      initiativeFields: [
        // { key: "id", label: "#" },
        { key: "number", label: "رقم" },
        { key: "name", label: this.$t("initiativeName") },
        { key: "description", label: this.$t("description") },
        { key: "owner", label: "اسم المالك" },
        {
          key: "expSaveValue",
          label: this.$t("amountOfSavings") + "\n (ريال سعودي) ",
        },
        // { key: "achievement", label: this.$t("achievement") },
        // { key: "status", label: this.$t("status") },
        { key: "actions", label: this.$t("action") },
      ],

      initiativeItems: [],
      GetAllCSEFeedBackFields: [
        { key: "id", label: "#" },
        { key: "initiativeId", label: "ملاحظة على" },
        { key: "initiativeName", label: this.$t("initiativeName") },
        { key: "section", label: this.$t("section") },
        { key: "description", label: this.$t("description") },
        { key: "fromRoleName", label: "ملاحظة من" },
        { key: "feedbackType", label: "نوع التعليقات" },
      ],
      GetAllCSEFeedBackItems: [],
      initiativeAssessments: [{ id: 0, name: "dumy", assessment: null }],
      isSupportEdit: false,
      isMinuteEdit: false,
      supportFormButton: this.$t("createSupportRequired"),
      minuteFormButton: this.$t("popupButtonOfMinutesOfMeeting"),
      supportId: 0,
      supportFields: [
        // { key: "id", label: "#" },
        { key: "number", label: "رقم" },
        { key: "initiativeName", label: this.$t("initiativeName") },
        { key: "supportType", label: this.$t("supportType") },
        { key: "description", label: this.$t("description") },
        { key: "actions", label: this.$t("action") },
      ],
      supportItems: [],
      meetingItems: [],
      meetingFields: [
        // {
        //   key: "id",
        //   label: "#"
        // },
        { key: "number", label: "رقم" },
        {
          key: "objectiveType",
          label: this.$t("objectiveType"),
        },
        {
          key: "description",
          label: this.$t("description"),
        },
        {
          key: "date",
          label: this.$t("date"),
          formatter: (value, key, item) => {
            return format(item.date, dateFormat);
          },
        },
        {
          key: "attachment",
          label: "ملف مرفق",
        },

        { key: "actions", label: this.$t("action") },
      ],
    };
  },
  validations: {
    supportForm: {
      initiativeName: {
        required,
        minLength: minLength(3),
      },
      description: {
        required,
        minLength: minLength(3),
      },
      supportType: {
        required,
      },
    },
    formMeeting: {
      objectiveType: {
        required,
        minLength: minLength(3),
      },
      description: {
        required,
        minLength: minLength(3),
      },
      date: {
        required,
      },
    },
  },
  watch: {
    currentPage(newPage) {
      this.options.SkipCount = this.perPage * (newPage - 1);
      this.getList();
    },
  },
  computed: {
    dontGoBack() {
      const roles = [
        "CSE Special Reviewer",
        "Entity Initiator",
        "CSE Reviewer A",
      ];
      return roles.some((role) => role.includes(this.$user.currentRole()));
    },
    iAmOwner() {
      if (this.currentOwner == "CSE Special Reviewer") {
        const roles = ["CSE Reviewer A", "CSE Reviewer B"];
        return roles.some((role) => role.includes(this.$user.currentRole()));
      }
      return this.currentOwner === this.$user.currentRole() ? true : false;
    },
    validInitiativeAssessments() {
      if (
        this.initiativeAssessments.initiatives &&
        this.initiativeAssessments.initiatives.length == 0
      ) {
        return false;
      }
      if (
        this.initiativeAssessments.initiatives &&
        this.initiativeAssessments.initiatives.forEach((item) => {
          this.checkIsEmptyObj(item);
        })
      ) {
        return false;
      }
      return true;
    },
  },
  methods: {
    onDeleteFile(item, index) {
      this.filesArray.splice(index, 1);
      // delete this.$refs.file.files[0];
    },
    onChangeFile() {
      this.filesArray.push(this.$refs.file.files[0]);
      this.$refs.file.files = {};
    },
    onCreateMinute() {
      this.isMinuteEdit = false;
      this.filesArray = [];
      this.minuteFormButton = this.$t("popupButtonOfMinutesOfMeeting");
      this.formMeeting.objectiveType = null;
      this.formMeeting.description = null;
      this.formMeeting.date = null;
      this.isCreateMeeting = true;
    },
    onMinuteEdit(item) {
      this.mainSupportArray = this.supportItems;
      this.isMinuteEdit = true;
      this.minuteFormButton = this.$t("update");
      this.supportId = item.id;
      this.formMeeting.objectiveType = item.objectiveType;
      this.formMeeting.description = item.description;
      this.formMeeting.date = new Date(item.date);
      this.formMeeting.number = item.number;
      for (let i = 0; i < item.uploadMinutesOfMeeting.length; i++) {
        this.filesArray.push(item.uploadMinutesOfMeeting[i]);
      }
      this.isCreateMeeting = true;
    },
    onCreateSupport() {
      this.isSupportEdit = false;
      this.supportFormButton = this.$t("createSupportRequired");
      this.supportForm.initiativeName = null;
      this.supportForm.description = null;
      this.supportForm.supportType = null;
      this.isCreateSupport = true;
    },
    onSupportEdit(item) {
      this.mainSupportArray = this.supportItems;
      this.isSupportEdit = true;
      this.supportFormButton = this.$t("update");
      this.supportId = item.id;
      this.supportForm.initiativeName = item.initiativeName;
      this.supportForm.description = item.description;
      this.supportForm.supportType = item.supportType;
      this.supportForm.number = item.number;
      this.isCreateSupport = true;
    },
    onChildClick(val) {
      this.filterById = val;
    },
    formatAsCurrency(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    checkIsEmptyObj(obj) {
      let isEmpty = false;
      Object.entries(obj).forEach((value, key) => {
        if (
          value[1] == null &&
          value[0] != "percentage" &&
          value[0] != "initiativeId" &&
          value[0] != "uploadFiles"
        ) {
          isEmpty = true;
          return;
        }
      });
      return isEmpty;
    },
    addLogData(data) {
      this.data.unshift(data);
    },
    openFeedback() {
      this.isReturnBack = !this.isReturnBack;
    },
    closePop() {
      this.isReturnBack = false;
    },
    getValidationClass(fieldName) {
      const field = this.$v.supportForm[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    getValidationClassMeeting(fieldName) {
      const field = this.$v.formMeeting[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    getValidationClassFeedBack(fieldName) {
      const field = this.$v.feedBackForm[fieldName];

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
      this.form.emailAddress = null;
      this.form.phoneNumber = null;
      this.form.type = null;
    },
    saveSupportForm() {
      this.$showLoader();
      this.sending = true;
      this.supportForm.monthlyReportId = this.options.monthlyReportId;
      if (this.isSupportEdit) {
        this.supportForm.id = this.supportId;
        this.$supportService.update(this.supportForm).then((res) => {
          this.isCreateSupport = false;
          if (res.success) {
            this.$swal({
              icon: "success",
              type: "success",
              title: "Support Updated Successfully!",
            }).then(() => {
              // this.supportItems.push(res.data);
              this.getSupportByReport(this.options.monthlyReportId);
            });
            delete this.supportForm["id"];
            delete this.supportForm["number"];
            this.isSupportEdit = false;
            this.supportFormButton = this.$t("createSupportRequired");
          } else {
            this.$swal({
              icon: "error",
              type: "error",
              title: res.message.message,
            });
          }
          this.$hideLoader();
          this.disabledSearch = false;
          this.sending = false;
        });
      } else {
        this.$supportService.create(this.supportForm).then((res) => {
          this.isCreateSupport = false;
          if (res.success) {
            this.$swal({
              icon: "success",
              type: "success",
              title: "Support Submitted Successfully!",
            }).then(() => {
              this.supportItems.push(res.data);
            });
          } else {
            this.$swal({
              icon: "error",
              type: "error",
              title: res.message.message,
            });
          }
          this.$hideLoader();
          this.disabledSearch = false;
          this.sending = false;
        });
      }
    },
    saveMeetingForm() {
      this.$showLoader();
      this.sending = true;
      this.formMeeting.monthlyReportId = this.options.monthlyReportId;

      if (this.isMinuteEdit) {
        let formData = new FormData();
        this.formMeeting.id = this.supportId;
        if (this.$refs.file.files[0]) {
          formData.append("uploadFiles", this.$refs.file.files);
        }
        formData.append("obj", JSON.stringify(this.formMeeting));
        this.$meetingService.update(formData).then((res) => {
          this.isCreateMeeting = false;
          if (res.success) {
            this.filesArray = [];
            this.$swal({
              icon: "success",
              type: "success",
              title: "Meeting Form updated Successfully!",
            }).then(() => {
              // this.$router.go();
              // this.meetingItems.push(res.data);
              this.getMeetingByReport(this.options.monthlyReportId);
            });
            delete this.formMeeting["id"];
            delete this.formMeeting["number"];
            this.isMinuteEdit = false;
            this.minuteFormButton = this.$t("popupButtonOfMinutesOfMeeting");
          } else {
            this.$swal({
              icon: "error",
              type: "error",
              title: res.message.message,
            });
          }
          this.$hideLoader();
          this.disabledSearch = false;
          this.sending = false;
        });
      } else {
        let formData = new FormData();
        formData.append("uploadFiles", this.$refs.file.files[0]);
        formData.append("obj", JSON.stringify(this.formMeeting));
        this.$meetingService.create(formData).then((res) => {
          this.isCreateMeeting = false;
          if (res.success) {
            this.filesArray = [];
            this.$swal({
              icon: "success",
              type: "success",
              title: "Meeting Form Submitted Successfully!",
            }).then(() => {
              // this.$router.go();
              this.meetingItems.push(res.data);
            });
          } else {
            this.$swal({
              icon: "error",
              type: "error",
              title: res.message.message,
            });
          }
          this.$hideLoader();
          this.disabledSearch = false;
          this.sending = false;
        });
      }
    },
    validateSupportForm() {
      this.$v.supportForm.$touch();
      if (!this.$v.supportForm.$invalid) {
        this.saveSupportForm();
      }
    },
    validateMeetingForm() {
      this.$v.formMeeting.$touch();
      if (!this.$v.formMeeting.$invalid) {
        this.saveMeetingForm();
      }
    },
    submitReport(forward = true) {
      if (this.confirm) {
        this.$showLoader();
        this.disabledSearch = true;
        this.sending = true;
        this.options.roleToSubmit = this.findReportTable(
          this.$user.currentRole(),
          forward
        );
        var apiCall = "create";
        if (this.$user.currentRole() == "CSE Approver") {
          apiCall = "submitFinalReport";
        }
        this.options.action = forward
          ? "Submitted the report"
          : "Returned the report";
        this.$monthlyReportsService[apiCall](this.options).then((res) => {
          if (res.success) {
            this.$swal({
              icon: "success",
              type: "success",
              title: "تم تقديم التقرير الشهري بنجاح",
            }).then(() => {
              this.$router.go("-1");
            });
          } else {
            this.$swal({
              icon: "error",
              type: "error",
              title: error.message.message,
            });
            !this.isReturnBack;
          }
          this.$hideLoader();
          this.disabledSearch = false;
          this.sending = false;
        });
      }
    },
    approveReport() {
      this.$showLoader();
      this.disabledSearch = true;
      this.sending = true;
      const tempObj = {
        remarks: "",
        approved: true,
        id: 0,
        monthlyReportId: this.options.monthlyReportId,
      };

      this.$monthlyReportsService.approveReport(tempObj).then((res) => {
        if (res.success) {
          this.$swal({
            icon: "success",
            type: "success",
            title: "Report Approved Successfully!",
          }).then(() => {
            this.$router.go("-1");
          });
        } else {
          this.$swal({
            icon: "error",
            type: "error",
            title: "Something went wrong!!",
          });
        }
        this.$hideLoader();
        this.disabledSearch = false;
        this.sending = false;
      });
    },
    getReportName() {
      const date = new Date();
      return this.getFormatedReportName(date);
    },
    onView(item) {
      this.$router.push(`/main/monthly-report/initiatives-form/${item.id}`);
    },
    onDelete(item) {
      this.$swal({
        icon: "warning",
        title: "Delete Initiative!",
        text: "Are you sure you want to delete this initiative?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then((willDelete) => {
        if (willDelete.value) {
          this.$showLoader();
          this.showActivity = false;
          this.$initiativeService.delete(item.id).then((res) => {
            if (res.success) {
              this.getList();
            }
            this.showActivity = true;
            this.$hideLoader();
            this.disabledSearch = false;
          });
        }
      });
    },
    addInitiative() {
      this.$router.push("/main/monthly-report/initiatives-form");
    },
    searchUser() {
      this.options.Keyword = this.search;
      this.getList();
    },
    onPagination(event) {},
    getActivityLogs() {
      this.options.reportId = this.options.monthlyReportId;
      this.$monthlyReportsService.getActivityLogs(this.options).then((res) => {
        if (res.success) {
          if (res.data) {
            this.data = res.data;
            for (let i = 0; i < this.data.length; i++) {
              this.data[i].showEdit = false;
            }
          }
        }
      });
    },
    getList() {
      this.$showLoader();
      if (this.$route.params.report) {
        this.options.reportId = this.$route.params.report;
      }
      this.disabledSearch = true;
      this.$monthlyReportsService
        .getAllInitiatives(this.options)
        .then((res) => {
          if (res.success) {
            if (res.data && res.data.items.length > 0) {
              this.firstVisitInitiative = false;
              this.initiativeItems = res.data.items[0].initiatives;
              if (
                res.data.items[0].name == this.getFormatedReportName(new Date())
              ) {
                this.isCurrentMonthReport = true;
              }
              this.options.monthlyReportId = res.data.items[0].id;
              this.currentOwner = res.data.items[0].currentOwner;
              this.getSupportByReport(this.options.monthlyReportId);
              this.getMeetingByReport(this.options.monthlyReportId);
              if (
                this.iAmOwner &&
                this.$user.currentRole() == "CSE Reviewer A"
              ) {
                this.getInitiativeAssessments(this.options.monthlyReportId);
              }
              this.propData.monthlyReportId = res.data.items[0].id;
              this.propData.mainData = res.data;
              this.propData.initiativeId = null;
              this.propData.type = "report";
              this.getActivityLogs();
            }
            this.totalCount = res.data.totalCount;
          }
          this.showActivity = true;
          this.$hideLoader();
          this.disabledSearch = false;
        });
    },
    getSupportByReport(id) {
      this.supportItems = [];
      this.$supportService.getAllByReport({ reportId: id }).then((res) => {
        if (res.success) {
          if (res.data.items && res.data.items.length > 0) {
            this.supportItems = res.data.items;
          }
        }
        this.$hideLoader();
        this.disabledSearch = false;
      });
    },
    getMeetingByReport(id) {
      this.$meetingService.getAllByReport({ reportId: id }).then((res) => {
        if (res.success) {
          if (res.data.items && res.data.items.length > 0) {
            this.meetingItems = res.data.items;
          }
        }
        this.$hideLoader();
        this.disabledSearch = false;
      });
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
    saveAssessment() {
      this.$showLoader();
      this.disabledSearch = true;
      this.sending = true;
      this.$initiativeService
        .submitInitiativeAssessment(this.initiativeAssessments)
        .then((res) => {
          if (res.success) {
            this.$swal({
              icon: "success",
              type: "success",
              title: "Assessment Submitted Successfully!",
            }).then(() => {
              this.$router.go("-1");
            });
          } else {
            this.$swal({
              icon: "error",
              type: "error",
              title: res.message.message,
            });
          }
          this.$hideLoader();
          this.disabledSearch = false;
          this.sending = false;
        });
    },
    getInitiativeAssessments(id) {
      this.$initiativeService
        .getInitiativeAssessment({ monthlyReportId: id })
        .then((res) => {
          if (res.success) {
            if (
              res.data &&
              res.data.initiatives &&
              res.data.initiatives.length > 0
            ) {
              this.initiativeAssessments = res.data;
            }
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
    },
    onCSEApprover() {
      // GetAllCSEFeedBack
      this.$showLoader();
      this.$monthlyReportsService
        .GetAllCSEFeedBack({ reportId: this.options.monthlyReportId })
        .then((res) => {
          if (res.success) {
            this.GetAllCSEFeedBackItems = res.data;
          }
          this.$hideLoader();
          this.isCSEApprover = !this.isCSEApprover;
        });
    },
    onSubmitAllFeedback() {
      let data = {
        monthlyReportId: this.options.monthlyReportId,
        feedBacks: this.GetAllCSEFeedBackItems,
      };
      this.$showLoader();
      // this.GetAllCSEFeedBackItems

      this.$monthlyReportsService.submitFinalReport(data).then((res) => {
        if (res.success) {
          this.$swal({
            icon: "success",
            type: "success",
            title: "Report Submitted Successfully!",
          }).then(() => {
            this.isCSEApprover = !this.isCSEApprover;
          });
        } else {
          this.$swal({
            icon: "error",
            type: "error",
            title: error.message.message,
          });
        }
        this.$hideLoader();
      });
    },
  },
  mounted() {
    this.options.ReportName = this.$route.params.report
      ? this.$route.params.report
      : this.getReportName();
    this.getList();
    if (this.$user.currentRole() !== "Entity Initiator") {
      this.formDisabled = true;
    }
    if (
      this.$user.currentRole() === "Entity Initiator" &&
      localStorage.getItem("yuy111yuy2@@##")
    ) {
      localStorage.removeItem("yuy111yuy2@@##");
    }
    $(document).ready(function() {
      $(this).scrollTop(0);
    });

    if (
      !this.$route.params.report &&
      this.$user.currentRole() === "Entity Initiator"
    ) {
      this.firstVisitInitiative = true;
    }
  },
  created() {
    document.addEventListener("keyup", (evt) => {
      if (evt.keyCode === 27) {
        this.isReturnBack = false;
      }
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body.english .main-content {
  transition: 0.5s all;
  margin-right: 20%;
}
body.arabic .main-content {
  transition: 0.5s all;
  margin-left: 20%;
}
body.english .main-content.full {
  margin-right: 0;
}
body.arabic .main-content.full {
  margin-left: 0;
}

.review {
  color: black;
}
.completed {
  color: #7cbc59;
}
.observe {
  color: #c8d32d;
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
  /* background: #2582c5 !important; */
}
.delete {
  font-size: 12px;
  background: red !important;
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
