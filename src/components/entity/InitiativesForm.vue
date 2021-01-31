<template>
  <b-container fluid id="initiator" class="pr-0 pl-0">
    <b-row v-if="hasOnlyEntityInitiatorRole">
      <b-col md="12" class="pl-0">
        <div
          class="d-inline-block main-approver"
          :class="openLogs ? '' : 'main-approver-width'"
        >
          <b-row class="d-flex justify-content-between">
            <b-col>
              <img
                class="cursor"
                @click="$router.go(-1)"
                src="/images/icons/back.png"
              />
              <h5 class="d-inline font-weight-medium pr-3">
                الصفحة الرئيسية > التقارير الشهرية
              </h5>
              <p class="h3 font-weight-bold pr-5">الفرصه</p>
            </b-col>
            <div></div>
            <!-- <div style="margin-left: 8px">
              <md-button
                class="md-raised md-primary button-radius comman-gradient custom-button font-weight-bold text-capitalize"
                @click="$router.go(-1)"
              >
                < {{ $t("back") }}</md-button
              >
            </div> -->
          </b-row>
          <hr />
          <b-row class="mt-5">
            <!------- Menus --------->

            <b-col md="2" sm="12">
              <div
                class="tabs-info text-capitalize font-weight-bolder position"
                :class="step === index + 1 ? 'active-tab' : ''"
                v-for="(tabs, index) in tabsInfo"
                :key="index"
                @click="activetab(index)"
              >
                <!------- checked icon ---->
                <div
                  v-if="tabs.state.value === 'Complete'"
                  class="icon-wrapper"
                >
                  <img class="icon" src="/images/Tick.png" alt />
                </div>

                <!------- priority_high icon ---->
                <div
                  v-else-if="tabs.state.value === 'Incomplete'"
                  class="icon-wrapper"
                >
                  <img class="icon" src="/images/warning.png" alt />
                </div>

                <!-------- Number Icon ---->
                <div
                  v-else
                  class="indexes text-center icon-wrapper"
                  :class="
                    tabs.state.value === 'empty' && step === index + 1
                      ? 'active-tab-number'
                      : ''
                  "
                >
                  {{ index + 1 }}
                </div>

                <!----- Tabs Name ----->
                <div
                  v-if="tabs.state.value === 'empty' || null"
                  class="tabs font-weight-bold"
                  :class="
                    step === index + 1 ? 'exact-tab-text' : 'tab-text-gray'
                  "
                >
                  {{ $t(`${tabs.name}`) }}
                </div>
                <div
                  v-else
                  class="tabs font-weight-bold"
                  :class="
                    step === index + 1 ? 'exact-tab-text' : 'tab-text-black'
                  "
                >
                  {{ $t(`${tabs.name}`) }}
                </div>
              </div>
            </b-col>

            <!------- Menus Content------>

            <b-col md="10" class="pr-5 scroll-one" sm="12">
              <!-- Section One -->
              <div class="mb-5" v-if="step === 1">
                <md-card class="custom-card">
                  <md-card-header>
                    <h3 class="text-center text-color font-weight-bold">
                      {{ $t("generalinformation") }}
                    </h3>
                  </md-card-header>
                  <md-divider class="mb-3"></md-divider>
                  <form
                    novalidate
                    class="form-info pl-5 pr-5 pb-5 text-right"
                    @submit.prevent="saveGeneralForm"
                  >
                    <b-row>
                      <b-col md="12">
                        <md-field :class="getValidationClass('name')">
                          <label
                            @mouseenter="mouseHover('generalinformation')"
                            @mouseleave="mouseLeave()"
                            class="font-weight-bold label-font"
                            :class="
                              commentedFeild == 'generalinformation'
                                ? 'Highlightborderd'
                                : null
                            "
                            ><span v-if="!generalForm.name" class="mandotary"
                              >*</span
                            >{{ $t("oppertunityname") }}
                            <img
                              v-if="checkCommented('generalinformation')"
                              @click="hideComment()"
                              class="chat-bubble pr-1"
                              src="/images/icons/chat_bubble.png"
                            />
                          </label>
                          <md-input
                            :disabled="
                              !(
                                (!formDisabled &&
                                  hasOnlyEntityInitiatorRole &&
                                  iAmOwner) ||
                                newInitiative ||
                                sending
                              )
                            "
                            v-model="generalForm.name"
                          ></md-input>
                          <span
                            class="md-error float-right"
                            v-if="!$v.generalForm.name.required"
                            >الرجاء تعبئة الحقل التالي</span
                          >
                        </md-field>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <md-field :class="getValidationClass('owner')">
                          <label
                            @mouseenter="mouseHover('owner')"
                            @mouseleave="mouseLeave()"
                            class="font-weight-bold label-font"
                            :class="
                              commentedFeild == 'owner'
                                ? 'Highlightborderd'
                                : null
                            "
                            ><span v-if="!generalForm.owner" class="mandotary"
                              >*</span
                            >{{ $t("owner") }}
                            <img
                              v-if="checkCommented('owner')"
                              @click="hideComment()"
                              class="chat-bubble pr-1"
                              src="/images/icons/chat_bubble.png"
                            />
                          </label>
                          <md-input
                            :disabled="
                              !(
                                (!formDisabled &&
                                  hasOnlyEntityInitiatorRole &&
                                  iAmOwner) ||
                                newInitiative
                              )
                            "
                            v-model="generalForm.owner"
                          ></md-input>
                          <span
                            class="md-error float-right"
                            v-if="!$v.generalForm.owner.required"
                            >الرجاء تعبئة الحقل التالي</span
                          >
                        </md-field>
                      </b-col>
                      <b-col md="6">
                        <md-field>
                          <label
                            @mouseenter="mouseHover('deputyShip')"
                            @mouseleave="mouseLeave()"
                            class="font-weight-bold label-font"
                            :class="
                              commentedFeild == 'department'
                                ? 'Highlightborderd'
                                : null
                            "
                            >{{ $t("department") }}
                            <img
                              v-if="checkCommented('department')"
                              @click="hideComment()"
                              class="chat-bubble pr-1"
                              src="/images/icons/chat_bubble.png"
                            />
                          </label>
                          <md-input
                            :disabled="
                              !(
                                (!formDisabled &&
                                  hasOnlyEntityInitiatorRole &&
                                  iAmOwner) ||
                                newInitiative
                              )
                            "
                            v-model="generalForm.deputyShip"
                          ></md-input>
                        </md-field>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <md-field :class="getValidationClass('description')">
                          <label
                            @mouseenter="mouseHover('Description')"
                            @mouseleave="mouseLeave()"
                            class="font-weight-bold label-font"
                            :class="
                              commentedFeild == 'Description'
                                ? 'Highlightborderd'
                                : null
                            "
                            ><span
                              v-if="!generalForm.description"
                              class="mandotary"
                              >*</span
                            >{{ $t("initiativeDescription") }} (2500
                            {{ $t("limit") }} )
                            <img
                              v-if="checkCommented('Description')"
                              @click="hideComment()"
                              class="chat-bubble pr-1"
                              src="/images/icons/chat_bubble.png"
                            />
                          </label>
                          <md-textarea
                            :disabled="
                              !(
                                (!formDisabled &&
                                  hasOnlyEntityInitiatorRole &&
                                  iAmOwner) ||
                                newInitiative
                              )
                            "
                            md-autogrow
                            v-model="generalForm.description"
                          ></md-textarea>
                          <span
                            class="md-error"
                            v-if="!$v.generalForm.description.required"
                            >الرجاء تعبئة الحقل التالي</span
                          >
                        </md-field>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col sm="12" md="6">
                        <md-field v-if="copyIni">
                          <label
                            @mouseenter="mouseHover('expSaveValue')"
                            @mouseleave="mouseLeave()"
                            class="font-weight-bold label-font"
                            :class="
                              commentedFeild == 'expSaveValue'
                                ? 'Highlightborderd'
                                : null
                            "
                            >{{ $t("totalexpectedsavings") }}
                            <img
                              v-if="checkCommented('expSaveValue')"
                              @click="hideComment()"
                              class="chat-bubble pr-1"
                              src="/images/icons/chat_bubble.png"
                            />
                          </label>
                          <md-input
                            :disabled="
                              !(
                                (!formDisabled &&
                                  hasOnlyEntityInitiatorRole &&
                                  iAmOwner) ||
                                newInitiative
                              )
                            "
                            type="text"
                            @keypress="onlyNumber"
                            @change="expSaveValueCurrencyFormatter"
                            v-model="generalForm.expSaveValue"
                          ></md-input>
                        </md-field>
                        <md-field v-else>
                          <label
                            @mouseenter="mouseHover('expSaveValue')"
                            @mouseleave="mouseLeave()"
                            class="font-weight-bold label-font"
                            :class="
                              commentedFeild == 'expSaveValue'
                                ? 'Highlightborderd'
                                : null
                            "
                            >{{ $t("totalexpectedsavings") }}
                            <img
                              v-if="checkCommented('expSaveValue')"
                              @click="hideComment()"
                              class="chat-bubble pr-1"
                              src="/images/icons/chat_bubble.png"
                            />
                          </label>
                          <md-input
                            :disabled="
                              !(
                                (!formDisabled &&
                                  hasOnlyEntityInitiatorRole &&
                                  iAmOwner) ||
                                newInitiative
                              ) || !copyIni
                            "
                            type="text"
                            @keypress="onlyNumber"
                            @change="expSaveValueCurrencyFormatter"
                            v-model="generalForm.expSaveValue"
                          ></md-input>
                        </md-field>
                        <div style="margin-bottom: 12px">
                          {{ expSaveValueArabic }}
                        </div>
                      </b-col>
                      <b-col sm="12" md="6">
                        <md-field id="auto-select">
                          <label
                            @mouseenter="mouseHover('type')"
                            @mouseleave="mouseLeave()"
                            :class="
                              commentedFeild == 'type'
                                ? 'Highlightborderd'
                                : null
                            "
                            for="Type Of Abundance"
                            class="font-weight-bold label-font"
                            >نوع الوفر
                            <img
                              v-if="checkCommented('type')"
                              @click="hideComment()"
                              class="chat-bubble pr-1"
                              src="/images/icons/chat_bubble.png"
                            />
                          </label>
                          <md-select
                            v-model="generalForm.type"
                            :disabled="
                              !(
                                (!formDisabled &&
                                  hasOnlyEntityInitiatorRole &&
                                  iAmOwner) ||
                                newInitiative
                              )
                            "
                          >
                            <md-option :value="null">{{
                              $t("selectAnOption")
                            }}</md-option>
                            <md-option value="خفض في الاعتمادات"
                              >خفض في الاعتمادات</md-option
                            >
                            <md-option value="خفض في التكاليف"
                              >خفض في التكاليف</md-option
                            >
                            <md-option value="أخرى">
                              أخرى
                            </md-option>
                          </md-select>
                        </md-field>
                      </b-col>
                      <b-col md="4" v-if="generalForm.type == 'أخرى'">
                        <md-field>
                          <label
                            @mouseenter="mouseHover('savingTypeDescription')"
                            @mouseleave="mouseLeave()"
                            for="surveyName"
                            class="label-font font-weight-bold"
                            >{{ $t("otherDescription") }}
                            <img
                              v-if="checkCommented('savingTypeDescription')"
                              @click="hideComment()"
                              class="chat-bubble pr-1"
                              src="/images/icons/chat_bubble.png"
                            />
                          </label>
                          <md-input
                            :disabled="
                              !(
                                (!formDisabled &&
                                  hasOnlyEntityInitiatorRole &&
                                  iAmOwner) ||
                                newInitiative
                              )
                            "
                            autocomplete="given-name"
                            v-model="generalForm.savingTypeDescription"
                          />
                        </md-field>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col
                        sm="12"
                        md="6"
                        v-if="
                          !(
                            (!formDisabled &&
                              hasOnlyEntityInitiatorRole &&
                              iAmOwner) ||
                            newInitiative
                          ) || !copyIni
                        "
                      >
                        <md-field>
                          <label
                            @mouseenter="mouseHover('startDate')"
                            @mouseleave="mouseLeave()"
                            :class="
                              commentedFeild == 'startDate'
                                ? 'Highlightborderd'
                                : null
                            "
                            id="label"
                            class="font-weight-bold label-font"
                            >{{ $t("startDate") }}
                            <img
                              v-if="checkCommented('startDate')"
                              @click="hideComment()"
                              class="chat-bubble pr-1"
                              src="/images/icons/chat_bubble.png"
                            />
                          </label>
                          <md-input
                            :disabled="
                              !(
                                (!formDisabled &&
                                  hasOnlyEntityInitiatorRole &&
                                  iAmOwner) ||
                                newInitiative
                              ) || !copyIni
                            "
                            autocomplete="given-name"
                            v-model="generalForm.startDate"
                          />
                        </md-field>
                      </b-col>
                      <b-col sm="12" md="6" v-else>
                        <!-- <md-field> -->
                        <div style="position : relative;">
                          <Datepicker
                            :language="ar"
                            class="vue-datepicker"
                            v-model="generalForm.startDate"
                          >
                          </Datepicker>
                          <label
                            @mouseenter="mouseHover('startDate')"
                            @mouseleave="mouseLeave()"
                            :class="
                              commentedFeild == 'startDate'
                                ? 'Highlightborderd'
                                : null || generalForm.startDate != null
                                ? 'initial-position'
                                : 'absloute-positon'
                            "
                            id="label"
                            class="font-weight-bold text-secondary label-font"
                            >{{ $t("startDate") }}
                            <img
                              v-if="checkCommented('startDate')"
                              @click="hideComment()"
                              class="chat-bubble pr-1"
                              src="/images/icons/chat_bubble.png"
                            />
                          </label>
                        </div>
                        <!-- </md-field> -->

                        <!-- <md-datepicker
                          class="custom-date"
                          v-model="generalForm.startDate"
                          md-immediately
                          name="startDate"
                          id="startDate"
                        >
                          <label
                            :class="
                              commentedFeild == 'startDate'
                                ? 'Highlightborderd'
                                : null
                            "
                            id="label"
                            class="font-weight-bold label-font"
                            >{{ $t("startDate") }}
                            <img
                              v-if="checkCommented('startDate')"
                              @click="hideComment()"
                              class="chat-bubble pr-1"
                              src="/images/icons/chat_bubble.png"
                            />
                          </label>
                        </md-datepicker> -->
                      </b-col>

                      <b-col
                        sm="12"
                        md="6"
                        v-if="
                          !(
                            (!formDisabled &&
                              hasOnlyEntityInitiatorRole &&
                              iAmOwner) ||
                            newInitiative
                          ) || !copyIni
                        "
                      >
                        <md-field>
                          <label
                            @mouseenter="mouseHover('endDate')"
                            @mouseleave="mouseLeave()"
                            :class="
                              commentedFeild == 'endDate'
                                ? 'Highlightborderd'
                                : null
                            "
                            id="label"
                            class="font-weight-bold label-font"
                            >{{ $t("endDate") }}
                            <img
                              v-if="checkCommented('endDate')"
                              @click="hideComment()"
                              class="chat-bubble pr-1"
                              src="/images/icons/chat_bubble.png"
                            />
                          </label>
                          <md-input
                            :disabled="
                              !(
                                (!formDisabled &&
                                  hasOnlyEntityInitiatorRole &&
                                  iAmOwner) ||
                                newInitiative
                              ) || !copyIni
                            "
                            autocomplete="given-name"
                            v-model="generalForm.endDate"
                          />
                        </md-field>
                      </b-col>
                      <b-col sm="12" md="6" v-else>
                        <div
                          style="position : relative;"
                          @click="
                            generalForm.startDate ? disableGeneralDates() : null
                          "
                        >
                          <Datepicker
                            :disabled="generalForm.startDate == null"
                            :language="ar"
                            :disabled-dates="range"
                            class="vue-datepicker"
                            v-model="generalForm.endDate"
                          >
                          </Datepicker>
                          <label
                            @mouseenter="mouseHover('endDate')"
                            @mouseleave="mouseLeave()"
                            :class="
                              commentedFeild == 'endDate'
                                ? 'Highlightborderd'
                                : null || generalForm.endDate != null
                                ? 'initial-position'
                                : 'absloute-positon'
                            "
                            id="label"
                            class="font-weight-bold text-secondary label-font"
                            >{{ $t("endDate") }}
                            <img
                              v-if="checkCommented('endDate')"
                              @click="hideComment()"
                              class="chat-bubble pr-1"
                              src="/images/icons/chat_bubble.png"
                            />
                          </label>
                        </div>
                        <!-- <md-datepicker
                          class="custom-date"
                          v-model="generalForm.endDate"
                          md-immediately
                          name="endDate"
                          id="endDate"
                          :md-disabled-dates="disableGeneralDates"
                        >
                          <label
                            :class="
                              commentedFeild == 'endDate'
                                ? 'Highlightborderd'
                                : null
                            "
                            id="label"
                            class="font-weight-bold label-font"
                            >{{ $t("endDate") }}
                            <img
                              v-if="checkCommented('endDate')"
                              @click="hideComment()"
                              class="chat-bubble pr-1"
                              src="/images/icons/chat_bubble.png"
                            />
                          </label>
                        </md-datepicker> -->
                      </b-col>
                    </b-row>
                    <b-row class="mt-5">
                      <b-col>
                        <md-button
                          class="md-raised float-left md-primary comman-gradient button-radius custom-button font-weight-bold text-capitalize"
                          type="submit"
                          :disabled="
                            !(
                              (!formDisabled &&
                                hasOnlyEntityInitiatorRole &&
                                iAmOwner) ||
                              newInitiative
                            )
                          "
                          >{{ $t("next") }} ></md-button
                        >
                      </b-col>
                    </b-row>
                  </form>
                </md-card>
              </div>

              <!-- Section Two -->
              <div class="mb-5" v-if="step === 2">
                <md-card class="custom-card">
                  <md-card-header>
                    <h3 class="text-center text-color font-weight-bold">
                      {{ $t("financialdataandsaving") }}
                    </h3>
                  </md-card-header>
                  <hr />
                  <div>
                    <p class="font-weight-bold h5 p-3">{{ $t("GfsCodes") }}</p>
                    <b-table
                      class="customTable pr-4 pl-4"
                      bordered
                      :responsive="true"
                      :items="yearlySavaData"
                      :fields="financialSavingFields"
                    >
                      <template v-slot:cell(clause)="row">
                        <img
                          v-if="checkCommented('clause' + `${row.item.total}`)"
                          @click="hideComment()"
                          class="chat-bubble float-right mt-1 pr-1 pt-1"
                          src="/images/icons/chat_bubble.png"
                        />
                        <b-textarea
                          rows="2"
                          @mouseenter="
                            mouseHover('clause' + `${row.item.total}`)
                          "
                          @mouseleave="mouseLeave()"
                          :disabled="
                            !(
                              (!formDisabled &&
                                hasOnlyEntityInitiatorRole &&
                                iAmOwner) ||
                              newInitiative
                            )
                          "
                          v-if="
                            row.item.clause !== null ||
                              isActive ||
                              isActiveClause
                          "
                          class="tableInput textareaTable text-center  d-inline"
                          :class="
                            commentedFeild == 'clause' + `${row.item.total}`
                              ? 'HighlightCell'
                              : null
                          "
                          type="text"
                          @input="filterRow(row.item)"
                          v-model="row.item.clause"
                        />
                        <div
                          v-else
                          @click="
                            {
                              isActiveClause = true;
                            }
                          "
                        >
                          <md-icon>add</md-icon>
                        </div>
                      </template>
                      <template v-slot:cell(gfs)="row">
                        <img
                          v-if="checkCommented('gfs' + `${row.item.total}`)"
                          @click="hideComment()"
                          class="chat-bubble float-right mt-1 pr-1 pt-1"
                          src="/images/icons/chat_bubble.png"
                        />
                        <b-input
                          @mouseenter="mouseHover('gfs' + `${row.item.total}`)"
                          @mouseleave="mouseLeave()"
                          :disabled="
                            !(
                              (!formDisabled &&
                                hasOnlyEntityInitiatorRole &&
                                iAmOwner) ||
                              newInitiative ||
                              isActiveGfs
                            )
                          "
                          v-if="isActiveGfs || row.item.gfs != null || isActive"
                          class="tableInput text-center border-0 d-inline w-50"
                          :class="
                            commentedFeild == 'gfs' + `${row.item.total}`
                              ? 'HighlightCell'
                              : null
                          "
                          type="number"
                          @input="filterRow(row.item)"
                          v-model="row.item.gfs"
                        />
                        <div
                          v-else
                          @click="
                            {
                              isActiveGfs = true;
                            }
                          "
                        >
                          <md-icon>add</md-icon>
                        </div>
                      </template>
                      <template v-slot:cell(annualBalance)="row">
                        <img
                          v-if="
                            checkCommented(
                              'annualBalance' + `${row.item.total}`
                            )
                          "
                          @click="hideComment()"
                          class="chat-bubble float-right mt-1 pr-1 pt-1"
                          src="/images/icons/chat_bubble.png"
                        />
                        <b-input
                          @mouseenter="
                            mouseHover('annualBalance' + `${row.item.total}`)
                          "
                          @mouseleave="mouseLeave()"
                          :disabled="
                            !(
                              (!formDisabled &&
                                hasOnlyEntityInitiatorRole &&
                                iAmOwner) ||
                              newInitiative
                            )
                          "
                          v-if="
                            row.item.annualBalance !== null ||
                              isActive ||
                              isActiveannualBalance
                          "
                          class="tableInput text-center border-0  d-inline w-50"
                          :class="
                            commentedFeild ==
                            'annualBalance' + `${row.item.total}`
                              ? 'HighlightCell'
                              : null
                          "
                          @input="filterRow(row.item)"
                          v-model="row.item.annualBalance"
                          @keypress="onlyNumber"
                          @change="formatterCurrency(row)"
                          type="text"
                        />
                        <div
                          v-else
                          @click="
                            {
                              isActiveannualBalance = true;
                            }
                          "
                        >
                          <md-icon>add</md-icon>
                        </div>
                      </template>
                      <template v-slot:cell(valueAfterRecommend)="row">
                        <img
                          v-if="
                            checkCommented(
                              'valueAfterRecommend' + `${row.item.total}`
                            )
                          "
                          @click="hideComment()"
                          class="chat-bubble float-right mt-1 pr-1 pt-1"
                          src="/images/icons/chat_bubble.png"
                        />
                        <b-input
                          @mouseenter="
                            mouseHover(
                              'valueAfterRecommend' + `${row.item.total}`
                            )
                          "
                          @mouseleave="mouseLeave()"
                          v-if="
                            row.item.valueAfterRecommend !== null ||
                              isActive ||
                              isActivevalueAfterRecommend
                          "
                          :disabled="
                            !(
                              (!formDisabled &&
                                hasOnlyEntityInitiatorRole &&
                                iAmOwner) ||
                              newInitiative
                            )
                          "
                          class="tableInput text-center border-0  d-inline w-50"
                          :class="
                            commentedFeild ==
                            'valueAfterRecommend' + `${row.item.total}`
                              ? 'HighlightCell'
                              : null
                          "
                          @input="filterRow(row.item)"
                          v-model="row.item.valueAfterRecommend"
                          @keypress="onlyNumber"
                          @change="formatterCurrency(row)"
                          type="text"
                        />
                        <div
                          v-else
                          @click="
                            {
                              isActivevalueAfterRecommend = true;
                            }
                          "
                        >
                          <md-icon>add</md-icon>
                        </div>
                      </template>
                      <template v-slot:cell(year)="row">
                        <div
                          class="gfsSelect font-weight-bold p-2"
                          v-if="!dropdown && `${row.index}` == rowIndex"
                        >
                          <div
                            v-for="(item, index) in [
                              '2019',
                              '2020',
                              '2021',
                              '2022',
                              '2023',
                            ]"
                            :key="index"
                          >
                            <span
                              @click="
                                (row.item.year = item), (dropdown = !dropdown)
                              "
                              >{{ item }}</span
                            >
                            <hr class="m-0" />
                          </div>
                        </div>
                        <img
                          v-if="checkCommented('year' + `${row.item.total}`)"
                          @click="hideComment()"
                          class="chat-bubble float-right mt-1 pr-1 pt-1"
                          src="/images/icons/chat_bubble.png"
                        />
                        <b-input
                          autocomplete="off"
                          @mouseenter="mouseHover('year' + `${row.item.total}`)"
                          @mouseleave="mouseLeave()"
                          v-if="
                            row.item.year !== null ||
                              isActive ||
                              isActiveyear ||
                              dropdown
                          "
                          :disabled="
                            !(
                              (!formDisabled &&
                                hasOnlyEntityInitiatorRole &&
                                iAmOwner) ||
                              newInitiative ||
                              dropdown
                            )
                          "
                          class="tableInput text-center border-0  d-inline w-50"
                          :class="
                            commentedFeild == 'year' + `${row.item.total}`
                              ? 'HighlightCell'
                              : null
                          "
                          @click="showYears(row), filterRow(row.item)"
                          @keypress="enterYear"
                          @input="filterRow(row.item)"
                          v-model="row.item.year"
                        />
                        <div
                          v-else
                          @click="(isActiveyear = true), showYears(row)"
                        >
                          <md-icon>add</md-icon>
                        </div>
                      </template>
                      <template v-slot:cell(actions)="row">
                        <img
                          @click="
                            !(
                              (!formDisabled &&
                                hasOnlyEntityInitiatorRole &&
                                iAmOwner) ||
                              newInitiative
                            ) === false
                              ? (isActive = true)
                              : null
                          "
                          src="/images/svg/Edit.svg"
                        />
                        <img
                          @click="
                            currentRole == currentOwner ? deleteGfs(row) : null
                          "
                          src="/images/svg/delete.svg"
                        />
                      </template>
                    </b-table>
                    <div>
                      <md-button
                        @click="
                          !(
                            (!formDisabled &&
                              hasOnlyEntityInitiatorRole &&
                              iAmOwner) ||
                            newInitiative
                          ) === false
                            ? addGfs(Activegfs)
                            : (isSelectGFSDialog = false)
                        "
                        class="font-weight-bold add-gfs comman-gradient md-raised md-primary button-radius"
                      >
                        إضافة بند جديد</md-button
                      >
                      <md-button
                        @click="
                          !(
                            (!formDisabled &&
                              hasOnlyEntityInitiatorRole &&
                              iAmOwner) ||
                            newInitiative
                          ) === false
                            ? (isSelectGFSDialog = true)
                            : (isSelectGFSDialog = false)
                        "
                        class="font-weight-bold add-gfs comman-gradient md-raised md-primary button-radius"
                      >
                        مكتبة بنود إحصاءات مالية الحكومة (GFS)</md-button
                      >
                    </div>
                  </div>
                  <div>
                    <p class="font-weight-bold h5 pr-3 mt-3">
                      {{ $t("ExpectedSavings") }}
                    </p>
                    <p
                      class="float-left font-weight-bold pl-4"
                      :class="checkExpectedvalue ? 'text-danger' : null"
                    >
                      إجمالي الوفر المتوقع للفرصة:
                      {{ formatAsCurrency(calculateExpectedSavingNew()) }} ريال
                      سعودي
                    </p>
                    <div
                      v-if="checkExpectedvalue"
                      class="float-left w-100 font-weight-bold pl-4"
                      :class="checkExpectedvalue ? 'text-danger' : null"
                    >
                      <p class="float-left">
                        إجمالي التوزيع السنوي غير متوائم مع إجمالي الوفر المتوقع
                        في قسم المعلومات العامة
                      </p>
                    </div>
                    <b-table
                      class="ExpectedTable pr-4 pl-4"
                      id="Expectedtable"
                      bordered
                      :responsive="true"
                      :items="yearlySavaData"
                      :fields="yearlySavefields"
                    >
                      <template v-slot:cell(clause)="row">
                        <b-textarea
                          @mouseenter="mouseHover('Clause')"
                          @mouseleave="mouseLeave()"
                          :disabled="
                            !(
                              (!formDisabled &&
                                hasOnlyEntityInitiatorRole &&
                                iAmOwner) ||
                              newInitiative ||
                              isActive
                            )
                          "
                          v-if="
                            isActive ||
                              row.item.clause != null ||
                              isActiveClause
                          "
                          class="tableInput textareaTable text-center  d-inline"
                          :class="
                            commentedFeild == 'clause' + `${row.item.total}`
                              ? 'HighlightCell'
                              : null
                          "
                          type="text"
                          v-model="row.item.clause"
                        />
                        <div
                          v-else
                          @click="
                            {
                              isActiveClause = true;
                            }
                          "
                        >
                          <md-icon>add</md-icon>
                        </div>
                      </template>
                      <template v-slot:cell(yearE2019)="row">
                        <img
                          v-if="checkCommented('yearE2019' + `${row.item.id}`)"
                          @click="hideComment()"
                          class="chat-bubble float-right mt-1 pr-1 pt-1"
                          src="/images/icons/chat_bubble.png"
                        />
                        <b-input
                          @mouseenter="
                            mouseHover('yearE2019' + `${row.item.id}`)
                          "
                          @mouseleave="mouseLeave()"
                          :disabled="
                            !(
                              (!formDisabled &&
                                hasOnlyEntityInitiatorRole &&
                                iAmOwner) ||
                              newInitiative ||
                              isActive
                            )
                          "
                          v-if="
                            isActive ||
                              row.item.yearE2019 != null ||
                              isActiveyearE2019
                          "
                          class="tableInput text-center d-inline w-50"
                          :class="
                            commentedFeild == 'yearE2019' + `${row.item.total}`
                              ? 'HighlightCell'
                              : null
                          "
                          v-model="row.item.yearE2019"
                          @keyup="calculateExpectedSavingNew()"
                          @keypress="onlyNumber"
                          @change="formatterCurrency(row)"
                        />
                        <div
                          v-else
                          @click="
                            {
                              isActiveyearE2019 = true;
                            }
                          "
                        >
                          <md-icon>add</md-icon>
                        </div>
                      </template>
                      <template v-slot:cell(yearE2020)="row">
                        <img
                          v-if="checkCommented('yearE2020' + `${row.item.id}`)"
                          @click="hideComment()"
                          class="chat-bubble float-right mt-1 pr-1 pt-1"
                          src="/images/icons/chat_bubble.png"
                        />
                        <b-input
                          @mouseenter="
                            mouseHover('yearE2020' + `${row.item.id}`)
                          "
                          @mouseleave="mouseLeave()"
                          :disabled="
                            !(
                              (!formDisabled &&
                                hasOnlyEntityInitiatorRole &&
                                iAmOwner) ||
                              newInitiative ||
                              isActive
                            )
                          "
                          v-if="
                            isActive ||
                              row.item.yearE2020 != null ||
                              isActiveyearE2020
                          "
                          class="tableInput text-center d-inline w-50"
                          :class="
                            commentedFeild == 'yearE2020' + `${row.item.total}`
                              ? 'HighlightCell'
                              : null
                          "
                          type="text"
                          v-model="row.item.yearE2020"
                          @keyup="calculateExpectedSavingNew()"
                          @keypress="onlyNumber"
                          @change="formatterCurrency(row)"
                        />
                        <div
                          v-else
                          @click="
                            {
                              isActiveyearE2020 = true;
                            }
                          "
                        >
                          <md-icon>add</md-icon>
                        </div>
                      </template>
                      <template v-slot:cell(yearE2021)="row">
                        <img
                          v-if="checkCommented('yearE2021' + `${row.item.id}`)"
                          @click="hideComment()"
                          class="chat-bubble float-right mt-1 pr-1 pt-1"
                          src="/images/icons/chat_bubble.png"
                        />
                        <b-input
                          @mouseenter="
                            mouseHover('yearE2021' + `${row.item.id}`)
                          "
                          @mouseleave="mouseLeave()"
                          :disabled="
                            !(
                              (!formDisabled &&
                                hasOnlyEntityInitiatorRole &&
                                iAmOwner) ||
                              newInitiative ||
                              isActive
                            )
                          "
                          v-if="
                            isActive ||
                              row.item.yearE2021 != null ||
                              isActiveyearE2021
                          "
                          class="tableInput text-center d-inline w-50"
                          :class="
                            commentedFeild == 'yearE2021' + `${row.item.total}`
                              ? 'HighlightCell'
                              : null
                          "
                          type="text"
                          v-model="row.item.yearE2021"
                          @keyup="calculateExpectedSavingNew()"
                          @keypress="onlyNumber"
                          @change="formatterCurrency(row)"
                        />
                        <div
                          v-else
                          @click="
                            {
                              isActiveyearE2021 = true;
                            }
                          "
                        >
                          <md-icon>add</md-icon>
                        </div>
                      </template>
                      <template v-slot:cell(yearE2022)="row">
                        <img
                          v-if="checkCommented('yearE2022' + `${row.item.id}`)"
                          @click="hideComment()"
                          class="chat-bubble float-right mt-1 pr-1 pt-1"
                          src="/images/icons/chat_bubble.png"
                        />
                        <b-input
                          @mouseenter="
                            mouseHover('yearE2022' + `${row.item.id}`)
                          "
                          @mouseleave="mouseLeave()"
                          :disabled="
                            !(
                              (!formDisabled &&
                                hasOnlyEntityInitiatorRole &&
                                iAmOwner) ||
                              newInitiative ||
                              isActive
                            )
                          "
                          v-if="
                            isActive ||
                              row.item.yearE2022 != null ||
                              isActiveyearE2022
                          "
                          class="tableInput text-center d-inline w-50"
                          :class="
                            commentedFeild == 'yearE2022' + `${row.item.total}`
                              ? 'HighlightCell'
                              : null
                          "
                          type="text"
                          v-model="row.item.yearE2022"
                          @keyup="calculateExpectedSavingNew()"
                          @keypress="onlyNumber"
                          @change="formatterCurrency(row)"
                        />
                        <div
                          v-else
                          @click="
                            {
                              isActiveyearE2022 = true;
                            }
                          "
                        >
                          <md-icon>add</md-icon>
                        </div>
                      </template>
                      <template v-slot:cell(yearE2023)="row">
                        <img
                          v-if="checkCommented('yearE2023' + `${row.item.id}`)"
                          @click="hideComment()"
                          class="chat-bubble float-right mt-1 pr-1 pt-1"
                          src="/images/icons/chat_bubble.png"
                        />
                        <b-input
                          @mouseenter="
                            mouseHover('yearE2023' + `${row.item.id}`)
                          "
                          @mouseleave="mouseLeave()"
                          :disabled="
                            !(
                              (!formDisabled &&
                                hasOnlyEntityInitiatorRole &&
                                iAmOwner) ||
                              newInitiative ||
                              isActive
                            )
                          "
                          v-if="
                            isActive ||
                              row.item.yearE2023 != null ||
                              isActiveyearE2023
                          "
                          class="tableInput text-center d-inline w-50"
                          :class="
                            commentedFeild == 'yearE2023' + `${row.item.total}`
                              ? 'HighlightCell'
                              : null
                          "
                          type="text"
                          v-model="row.item.yearE2023"
                          @keyup="calculateExpectedSavingNew()"
                          @keypress="onlyNumber"
                          @change="formatterCurrency(row)"
                        />
                        <div
                          v-else
                          @click="
                            {
                              isActiveyearE2023 = true;
                            }
                          "
                        >
                          <md-icon>add</md-icon>
                        </div>
                      </template>
                      <template v-slot:cell(eFutureyears)="row">
                        <img
                          v-if="
                            checkCommented('eFutureyears' + `${row.item.id}`)
                          "
                          @click="hideComment()"
                          class="chat-bubble float-right mt-1 pr-1 pt-1"
                          src="/images/icons/chat_bubble.png"
                        />
                        <b-input
                          @mouseenter="
                            mouseHover('eFutureyears' + `${row.item.id}`)
                          "
                          @mouseleave="mouseLeave()"
                          :disabled="
                            !(
                              (!formDisabled &&
                                hasOnlyEntityInitiatorRole &&
                                iAmOwner) ||
                              newInitiative ||
                              isActive
                            )
                          "
                          v-if="
                            isActive ||
                              row.item.eFutureyears != null ||
                              isActiveeFutureyears
                          "
                          class="tableInput text-center d-inline w-50"
                          type="text"
                          :class="
                            commentedFeild ==
                            'eFutureyears' + `${row.item.total}`
                              ? 'HighlightCell'
                              : null
                          "
                          v-model="row.item.eFutureyears"
                          @keyup="calculateExpectedSavingNew()"
                          @keypress="onlyNumber"
                          @change="formatterCurrency(row)"
                        />
                        <div
                          v-else
                          @click="
                            {
                              isActiveeFutureyears = true;
                            }
                          "
                        >
                          <md-icon>add</md-icon>
                        </div>
                      </template>
                      <template v-slot:cell(Total)="row">
                        <img
                          v-if="checkCommented('Total' + `${row.item.id}`)"
                          @click="hideComment()"
                          class="chat-bubble float-right mt-1 pr-1 pt-1"
                          src="/images/icons/chat_bubble.png"
                        />
                        <span
                          class="overflow-wrap"
                          :class="
                            commentedFeild == 'Total' + `${row.item.total}`
                              ? 'HighlightCell'
                              : null
                          "
                          @mouseenter="mouseHover('Total' + `${row.item.id}`)"
                          @mouseleave="mouseLeave()"
                        >
                          {{ calculateExpectedtotal(row.item) }}
                        </span>
                      </template>
                      <template v-slot:custom-foot>
                        <!-- You can customize this however you want, this is just as an example -->
                        <b-tr>
                          <b-td class="font-weight-bold overflow-wrap">{{
                            $t("Total")
                          }}</b-td>
                          <b-td>
                            <img
                              v-if="checkCommented('yearE2019')"
                              @click="hideComment()"
                              class="chat-bubble float-right mt-1 pr-1 pt-1"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="overflow-wrap"
                              :class="
                                commentedFeild == 'yearE2019'
                                  ? 'HighlightCell'
                                  : null
                              "
                              @mouseenter="mouseHover('yearE2019')"
                              @mouseleave="mouseLeave()"
                            >
                              {{ calculateExpectedSaving("yearE2019") }}
                            </span>
                          </b-td>
                          <b-td>
                            <img
                              v-if="checkCommented('yearE2020')"
                              @click="hideComment()"
                              class="chat-bubble float-right mt-1 pr-1 pt-1"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="overflow-wrap"
                              :class="
                                commentedFeild == 'yearE2020'
                                  ? 'HighlightCell'
                                  : null
                              "
                              @mouseenter="mouseHover('yearE2020')"
                              @mouseleave="mouseLeave()"
                            >
                              {{ calculateExpectedSaving("yearE2020") }}
                            </span>
                          </b-td>
                          <b-td>
                            <img
                              v-if="checkCommented('yearE2021')"
                              @click="hideComment()"
                              class="chat-bubble float-right mt-1 pr-1 pt-1"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="overflow-wrap"
                              :class="
                                commentedFeild == 'yearE2021'
                                  ? 'HighlightCell'
                                  : null
                              "
                              @mouseenter="mouseHover('yearE2021')"
                              @mouseleave="mouseLeave()"
                            >
                              {{ calculateExpectedSaving("yearE2021") }}
                            </span>
                          </b-td>
                          <b-td>
                            <img
                              v-if="checkCommented('yearE2022')"
                              @click="hideComment()"
                              class="chat-bubble float-right mt-1 pr-1 pt-1"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="overflow-wrap"
                              :class="
                                commentedFeild == 'yearE2022'
                                  ? 'HighlightCell'
                                  : null
                              "
                              @mouseenter="mouseHover('yearE2022')"
                              @mouseleave="mouseLeave()"
                            >
                              {{ calculateExpectedSaving("yearE2022") }}
                            </span>
                          </b-td>
                          <b-td>
                            <img
                              v-if="checkCommented('yearE2023')"
                              @click="hideComment()"
                              class="chat-bubble float-right mt-1 pr-1 pt-1"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="overflow-wrap"
                              :class="
                                commentedFeild == 'yearE2023'
                                  ? 'HighlightCell'
                                  : null
                              "
                              @mouseenter="mouseHover('yearE2023')"
                              @mouseleave="mouseLeave()"
                            >
                              {{ calculateExpectedSaving("yearE2023") }}
                            </span>
                          </b-td>
                          <b-td>
                            <img
                              v-if="checkCommented('eFutureyears')"
                              @click="hideComment()"
                              class="chat-bubble float-right mt-1 pr-1 pt-1"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="overflow-wrap"
                              :class="
                                commentedFeild == 'eFutureyears'
                                  ? 'HighlightCell'
                                  : null
                              "
                              @mouseenter="mouseHover('eFutureyears')"
                              @mouseleave="mouseLeave()"
                            >
                              {{ calculateExpectedSaving("eFutureyears") }}
                            </span>
                          </b-td>
                          <b-td>
                            <img
                              v-if="checkCommented('AllTotal')"
                              @click="hideComment()"
                              class="chat-bubble float-right mt-1 pr-1 pt-1"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="overflow-wrap"
                              :class="
                                commentedFeild == 'AllTotal'
                                  ? 'HighlightCell'
                                  : null
                              "
                              @mouseenter="mouseHover('AllTotal')"
                              @mouseleave="mouseLeave()"
                            >
                              {{ calculateExpectedSavingNew() }}
                            </span>
                          </b-td>
                        </b-tr>
                      </template>
                    </b-table>
                  </div>
                  <div class="position-relative">
                    <p class="font-weight-bold h5 pr-3 mt-3">
                      {{ $t("AchivedSavings") }}
                    </p>
                    <p class="float-left font-weight-bold pl-4">
                      إجمالي الوفر المحقق للفرصة:
                      {{ formatAsCurrency(totalAchivedValue) }} ريال سعودي
                    </p>
                    <b-table
                      bordered
                      id="achived"
                      :responsive="true"
                      class="AchivedTable pr-4 pl-4"
                      :items="yearlySavaData"
                      :fields="achivedSavingsfields"
                    >
                      <template v-slot:cell(clause)="row">
                        <b-textarea
                          @mouseenter="mouseHover('clause' + `${row.item.id}`)"
                          @mouseleave="mouseLeave()"
                          :disabled="
                            !(
                              (!formDisabled &&
                                hasOnlyEntityInitiatorRole &&
                                iAmOwner) ||
                              newInitiative ||
                              isActive
                            )
                          "
                          v-if="
                            isActive ||
                              row.item.clause != null ||
                              isActiveClause
                          "
                          class="tableInput textareaTable text-center  d-inline"
                          :class="
                            commentedFeild == 'clause' + `${row.item.total}`
                              ? 'HighlightCell'
                              : null
                          "
                          type="text"
                          v-model="row.item.clause"
                        />
                        <div
                          v-else
                          @click="
                            {
                              isActiveClause = true;
                            }
                          "
                        >
                          <md-icon>add</md-icon>
                        </div>
                      </template>
                      <template v-slot:cell(yearA2019)="row">
                        <img
                          v-if="checkCommented('yearA2019' + `${row.item.id}`)"
                          @click="hideComment()"
                          class="chat-bubble float-right mt-1 pr-1 pt-1"
                          src="/images/icons/chat_bubble.png"
                        />
                        <b-input
                          @mouseenter="
                            mouseHover('yearA2019' + `${row.item.id}`)
                          "
                          @mouseleave="mouseLeave()"
                          :disabled="
                            !(
                              (!formDisabled &&
                                hasOnlyEntityInitiatorRole &&
                                iAmOwner) ||
                              newInitiative ||
                              isActive
                            )
                          "
                          v-if="
                            isActive ||
                              row.item.yearA2019 != null ||
                              isActiveyearA2019
                          "
                          class="tableInput text-center d-inline w-50"
                          :class="
                            commentedFeild == 'yearA2019' + `${row.item.total}`
                              ? 'HighlightCell'
                              : null
                          "
                          type="text"
                          @keypress="onlyNumber"
                          @change="formatterCurrency(row)"
                          @keyup="calculateASavingNew()"
                          v-model="row.item.yearA2019"
                        />
                        <div
                          v-else
                          @click="
                            {
                              isActiveyearA2019 = true;
                            }
                          "
                        >
                          <md-icon>add</md-icon>
                        </div>
                      </template>
                      <template v-slot:cell(yearA2020)="row">
                        <img
                          v-if="checkCommented('yearA2020' + `${row.item.id}`)"
                          @click="hideComment()"
                          class="chat-bubble float-right mt-1 pr-1 pt-1"
                          src="/images/icons/chat_bubble.png"
                        />
                        <b-input
                          @mouseenter="
                            mouseHover('yearA2020' + `${row.item.id}`)
                          "
                          @mouseleave="mouseLeave()"
                          :disabled="
                            !(
                              (!formDisabled &&
                                hasOnlyEntityInitiatorRole &&
                                iAmOwner) ||
                              newInitiative ||
                              isActive
                            )
                          "
                          v-if="
                            isActive ||
                              row.item.yearA2020 != null ||
                              isActiveyearA2020
                          "
                          class="tableInput text-center d-inline w-50"
                          :class="
                            commentedFeild == 'yearA2020' + `${row.item.total}`
                              ? 'HighlightCell'
                              : null
                          "
                          type="text"
                          @keypress="onlyNumber"
                          @change="formatterCurrency(row)"
                          @keyup="calculateASavingNew()"
                          v-model="row.item.yearA2020"
                        />
                        <div
                          v-else
                          @click="
                            {
                              isActiveyearA2020 = true;
                            }
                          "
                        >
                          <md-icon>add</md-icon>
                        </div>
                      </template>
                      <template v-slot:cell(yearA2021)="row">
                        <img
                          v-if="checkCommented('yearA2021' + `${row.item.id}`)"
                          @click="hideComment()"
                          class="chat-bubble float-right mt-1 pr-1 pt-1"
                          src="/images/icons/chat_bubble.png"
                        />
                        <b-input
                          @mouseenter="
                            mouseHover('yearA2021' + `${row.item.id}`)
                          "
                          @mouseleave="mouseLeave()"
                          :disabled="
                            !(
                              (!formDisabled &&
                                hasOnlyEntityInitiatorRole &&
                                iAmOwner) ||
                              newInitiative ||
                              isActive
                            )
                          "
                          v-if="
                            isActive ||
                              row.item.yearA2021 != null ||
                              isActiveyearA2021
                          "
                          class="tableInput text-center d-inline w-50"
                          :class="
                            commentedFeild == 'yearA2021' + `${row.item.total}`
                              ? 'HighlightCell'
                              : null
                          "
                          type="text"
                          @keypress="onlyNumber"
                          @change="formatterCurrency(row)"
                          @keyup="calculateASavingNew()"
                          v-model="row.item.yearA2021"
                        />
                        <div
                          v-else
                          @click="
                            {
                              isActiveyearA2021 = true;
                            }
                          "
                        >
                          <md-icon>add</md-icon>
                        </div>
                      </template>
                      <template v-slot:cell(yearA2022)="row">
                        <img
                          v-if="checkCommented('yearA2022' + `${row.item.id}`)"
                          @click="hideComment()"
                          class="chat-bubble float-right mt-1 pr-1 pt-1"
                          src="/images/icons/chat_bubble.png"
                        />
                        <b-input
                          @mouseenter="
                            mouseHover('yearA2022' + `${row.item.id}`)
                          "
                          @mouseleave="mouseLeave()"
                          :disabled="
                            !(
                              (!formDisabled &&
                                hasOnlyEntityInitiatorRole &&
                                iAmOwner) ||
                              newInitiative ||
                              isActive
                            )
                          "
                          v-if="
                            isActive ||
                              row.item.yearA2022 != null ||
                              isActiveyearA2022
                          "
                          class="tableInput text-center d-inline w-50"
                          :class="
                            commentedFeild == 'yearA2022' + `${row.item.total}`
                              ? 'HighlightCell'
                              : null
                          "
                          type="text"
                          @keypress="onlyNumber"
                          @change="formatterCurrency(row)"
                          @keyup="calculateASavingNew()"
                          v-model="row.item.yearA2022"
                        />
                        <div
                          v-else
                          @click="
                            {
                              isActiveyearA2022 = true;
                            }
                          "
                        >
                          <md-icon>add</md-icon>
                        </div>
                      </template>
                      <template v-slot:cell(yearA2023)="row">
                        <img
                          v-if="checkCommented('yearA2023' + `${row.item.id}`)"
                          @click="hideComment()"
                          class="chat-bubble float-right mt-1 pr-1 pt-1"
                          src="/images/icons/chat_bubble.png"
                        />
                        <b-input
                          @mouseenter="
                            mouseHover('yearA2023' + `${row.item.id}`)
                          "
                          @mouseleave="mouseLeave()"
                          :disabled="
                            !(
                              (!formDisabled &&
                                hasOnlyEntityInitiatorRole &&
                                iAmOwner) ||
                              newInitiative ||
                              isActive
                            )
                          "
                          v-if="
                            isActive ||
                              row.item.yearA2023 != null ||
                              isActiveyearA2023
                          "
                          class="tableInput text-center d-inline w-50"
                          :class="
                            commentedFeild == 'yearA2023' + `${row.item.total}`
                              ? 'HighlightCell'
                              : null
                          "
                          type="text"
                          @keypress="onlyNumber"
                          @change="formatterCurrency(row)"
                          @keyup="calculateASavingNew()"
                          v-model="row.item.yearA2023"
                        />
                        <div
                          v-else
                          @click="
                            {
                              isActiveyearA2023 = true;
                            }
                          "
                        >
                          <md-icon>add</md-icon>
                        </div>
                      </template>
                      <template v-slot:cell(aFutureyears)="row">
                        <img
                          v-if="
                            checkCommented('aFutureyears' + `${row.item.id}`)
                          "
                          @click="hideComment()"
                          class="chat-bubble float-right mt-1 pr-1 pt-1"
                          src="/images/icons/chat_bubble.png"
                        />
                        <b-input
                          @mouseenter="
                            mouseHover('aFutureyears' + `${row.item.id}`)
                          "
                          @mouseleave="mouseLeave()"
                          :disabled="
                            !(
                              (!formDisabled &&
                                hasOnlyEntityInitiatorRole &&
                                iAmOwner) ||
                              newInitiative ||
                              isActive
                            )
                          "
                          v-if="
                            isActive ||
                              row.item.aFutureyears != null ||
                              isActiveeFutureyears
                          "
                          class="tableInput text-center d-inline w-50"
                          :class="
                            commentedFeild ==
                            'aFutureyears' + `${row.item.total}`
                              ? 'HighlightCell'
                              : null
                          "
                          type="text"
                          @keypress="onlyNumber"
                          @change="formatterCurrency(row)"
                          @keyup="calculateASavingNew()"
                          v-model="row.item.aFutureyears"
                        />
                        <div
                          v-else
                          @click="
                            {
                              isActiveeFutureyears = true;
                            }
                          "
                        >
                          <md-icon>add</md-icon>
                        </div>
                      </template>
                      <template v-slot:cell(total)="row">
                        <img
                          v-if="checkCommented('ATotal' + `${row.item.id}`)"
                          @click="hideComment()"
                          class="chat-bubble float-right mt-1 pr-1 pt-1"
                          src="/images/icons/chat_bubble.png"
                        />
                        <span
                          class="overflow-wrap"
                          :class="
                            commentedFeild == 'ATotal' + `${row.item.total}`
                              ? 'HighlightCell'
                              : null
                          "
                          @mouseenter="mouseHover('ATotal' + `${row.item.id}`)"
                          @mouseleave="mouseLeave()"
                        >
                          {{ calculateAchivedTotal(row.item) }}
                        </span>
                      </template>
                      <template v-slot:custom-foot>
                        <!-- You can customize this however you want, this is just as an example -->
                        <b-tr>
                          <b-td class="font-weight-bold">{{
                            $t("Total")
                          }}</b-td>
                          <b-td>
                            <img
                              v-if="checkCommented('yearA2019')"
                              @click="hideComment()"
                              class="chat-bubble float-right mt-1 pr-1 pt-1"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="overflow-wrap"
                              :class="
                                commentedFeild == 'yearA2019'
                                  ? 'HighlightCell'
                                  : null
                              "
                              @mouseenter="mouseHover('yearA2019')"
                              @mouseleave="mouseLeave()"
                            >
                              {{ calculateAchivedSaving("yearA2019") }}
                            </span>
                          </b-td>
                          <b-td>
                            <img
                              v-if="checkCommented('yearA2020')"
                              @click="hideComment()"
                              class="chat-bubble float-right mt-1 pr-1 pt-1"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="overflow-wrap"
                              :class="
                                commentedFeild == 'yearA2020'
                                  ? 'HighlightCell'
                                  : null
                              "
                              @mouseenter="mouseHover('yearA2020')"
                              @mouseleave="mouseLeave()"
                            >
                              {{ calculateAchivedSaving("yearA2020") }}
                            </span></b-td
                          >
                          <b-td>
                            <img
                              v-if="checkCommented('yearA2021')"
                              @click="hideComment()"
                              class="chat-bubble float-right mt-1 pr-1 pt-1"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="overflow-wrap"
                              :class="
                                commentedFeild == 'yearA2021'
                                  ? 'HighlightCell'
                                  : null
                              "
                              @mouseenter="mouseHover('yearA2021')"
                              @mouseleave="mouseLeave()"
                            >
                              {{ calculateAchivedSaving("yearA2021") }}
                            </span>
                          </b-td>
                          <b-td>
                            <img
                              v-if="checkCommented('yearA2022')"
                              @click="hideComment()"
                              class="chat-bubble float-right mt-1 pr-1 pt-1"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="overflow-wrap"
                              :class="
                                commentedFeild == 'yearA2022'
                                  ? 'HighlightCell'
                                  : null
                              "
                              @mouseenter="mouseHover('yearA2022')"
                              @mouseleave="mouseLeave()"
                            >
                              {{ calculateAchivedSaving("yearA2022") }}
                            </span>
                          </b-td>
                          <b-td>
                            <img
                              v-if="checkCommented('yearA2023')"
                              @click="hideComment()"
                              class="chat-bubble float-right mt-1 pr-1 pt-1"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="overflow-wrap"
                              :class="
                                commentedFeild == 'yearA2023'
                                  ? 'HighlightCell'
                                  : null
                              "
                              @mouseenter="mouseHover('yearA2023')"
                              @mouseleave="mouseLeave()"
                            >
                              {{ calculateAchivedSaving("yearA2023") }}
                            </span>
                          </b-td>
                          <b-td>
                            <img
                              v-if="checkCommented('aFutureyears')"
                              @click="hideComment()"
                              class="chat-bubble float-right mt-1 pr-1 pt-1"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="overflow-wrap"
                              :class="
                                commentedFeild == 'aFutureyears'
                                  ? 'HighlightCell'
                                  : null
                              "
                              @mouseenter="mouseHover('aFutureyears')"
                              @mouseleave="mouseLeave()"
                            >
                              {{ calculateAchivedSaving("aFutureyears") }}
                            </span>
                          </b-td>
                          <b-td>
                            <img
                              v-if="checkCommented('aAllTotal')"
                              @click="hideComment()"
                              class="chat-bubble float-right mt-1 pr-1 pt-1"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="overflow-wrap"
                              :class="
                                commentedFeild == 'aAllTotal'
                                  ? 'HighlightCell'
                                  : null
                              "
                              @mouseenter="mouseHover('aAllTotal')"
                              @mouseleave="mouseLeave()"
                            >
                              {{ calculateASavingNew() }}
                            </span>
                          </b-td>
                        </b-tr>
                      </template>
                    </b-table>
                  </div>
                  <b-row class="p-5 d-flex justify-content-between">
                    <md-button
                      class="md-raised button-radius custom-button font-weight-bold text-capitalize float-left"
                      @click="step = step - 1"
                    >
                      < {{ $t("back") }}</md-button
                    >
                    <md-button
                      class="md-raised md-primary button-radius comman-gradient custom-button font-weight-bold text-capitalize"
                      v-if="
                        (hasOnlyEntityInitiatorRole && iAmOwner) ||
                          newInitiative
                      "
                      @click="saveFinancialSavingForm"
                      >{{ $t("next") }} ></md-button
                    >
                  </b-row>
                </md-card>
              </div>

              <!-- Section Three-->
              <div class="mb-5" v-if="step === 3">
                <md-card class="custom-card">
                  <md-card-header>
                    <h3 class="text-center text-color font-weight-bold">
                      {{ $t("calculationofsavings") }}
                    </h3>
                  </md-card-header>
                  <hr />
                  <div class="form-info pl-5 pr-5 pb-5 text-right">
                    <b-row>
                      <b-col md="12">
                        <md-field>
                          <label
                            @mouseenter="mouseHover('calOfSaving')"
                            @mouseleave="mouseLeave()"
                            class="font-weight-bold"
                            :class="
                              commentedFeild == 'calOfSaving'
                                ? 'Highlightborderd'
                                : null
                            "
                            >{{ $t("calculationofsaving") }}
                            <img
                              v-if="checkCommented('calOfSaving')"
                              @click="hideComment()"
                              class="chat-bubble pr-1"
                              src="/images/icons/chat_bubble.png"
                            />
                          </label>
                          <md-textarea
                            md-autogrow
                            :disabled="
                              !(
                                (!formDisabled &&
                                  hasOnlyEntityInitiatorRole &&
                                  iAmOwner) ||
                                newInitiative
                              )
                            "
                            v-model="calculationSaving.calOfSaving"
                          ></md-textarea>
                        </md-field>
                      </b-col>
                    </b-row>
                    <b-row class="mb-3">
                      <b-col md="12">
                        <input
                          class="d-none"
                          type="file"
                          @change="handleUploadFile($event)"
                          id="imageUpload"
                          ref="file"
                          name="file"
                          multiple
                        />
                        <md-button
                          class="text-secondary pb-10 custom-attachment-button font-weight-bold text-capitalize"
                          :disabled="currentRole != currentOwner"
                          @click="
                            currentRole === currentOwner ? updaloadFile() : null
                          "
                        >
                          <img
                            class="float-left pr-2"
                            src="/images/svg/attachment.svg"
                            alt
                          />
                          Add Attachment
                        </md-button>
                      </b-col>
                    </b-row>

                    <b-row v-if="fileUrl.length != 0">
                      <b-col md="12" class="pr-2">
                        <b-table
                          class="customTable pr-4 pl-4"
                          bordered
                          :responsive="true"
                          :items="fileUrl"
                          :fields="generalCommentFileUrlFields"
                        >
                          <template v-slot:cell(sr)="row">{{
                            row.index + 1
                          }}</template>
                          <template v-slot:cell(fileName)="row">
                            <img
                              v-if="
                                checkCommented('fileName' + `${row.item.id}`)
                              "
                              @click="hideComment()"
                              class="chat-bubble pr-1"
                              src="/images/icons/chat_bubble.png"
                            />
                            <div
                              :class="
                                commentedFeild == 'fileName' + `${row.item.id}`
                                  ? 'Highlightborderd'
                                  : null
                              "
                              class="d-inline"
                              v-if="row.item.path"
                              :id="'fileName' + `${row.item.id}`"
                              @mouseenter="
                                mouseHover('fileName' + `${row.item.id}`)
                              "
                              @mouseleave="mouseLeave()"
                            >
                              {{ row.item.path | trimImageName }}
                            </div>
                            <div
                              :class="
                                commentedFeild == 'fileName' + `${row.item.id}`
                                  ? 'Highlightborderd'
                                  : null
                              "
                              class="d-inline"
                              v-if="!row.item.path"
                              :id="'fileName' + `${row.item.id}`"
                              @mouseenter="
                                mouseHover('fileName' + `${row.item.id}`)
                              "
                              @mouseleave="mouseLeave()"
                            >
                              {{ row.item.name }}
                            </div>
                          </template>
                          <template v-slot:cell(delete)="row">
                            <img
                              src="/images/svg/delete.svg"
                              @click="
                                currentRole == currentOwner
                                  ? onDeleteFileCal($event, row, row.index)
                                  : null
                              "
                              style="
                                width: 24px;
                                cursor: pointer;
                                z-index: 9999;
                              "
                              alt
                            />
                          </template>
                          <template v-slot:cell(type)="images">
                            <a
                              :id="'type' + `${images.item.id}`"
                              @mouseenter="
                                mouseHover('type' + `${images.item.id}`)
                              "
                              @mouseleave="mouseLeave()"
                              v-if="images.item.link"
                              :href="images.item.link"
                              target="_blank"
                              style="position: relative"
                            >
                              <md-avatar
                                class="md-avatar-icon"
                                v-if="images.item.type === 'pdf'"
                              >
                                <img
                                  class
                                  src="/images/icons/pdf.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <md-avatar
                                class
                                v-else-if="images.item.type === 'msword'"
                              >
                                <img
                                  src="/images/icons/word.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <md-avatar
                                class
                                v-else-if="images.item.type === 'docs'"
                              >
                                <img
                                  src="/images/icons/word.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <md-avatar
                                class
                                v-else-if="images.item.type === 'xlm'"
                              >
                                <img
                                  src="/images/icons/excel.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <md-avatar class v-else>
                                <img
                                  src="/images/icons/generic-attachment.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <!-- <p class="font-weight-bold">{{ images.name }}</p> -->
                            </a>
                            <a
                              :id="'type' + `${images.item.id}`"
                              @mouseenter="
                                mouseHover('type' + `${images.item.id}`)
                              "
                              @mouseleave="mouseLeave()"
                              v-if="images.item.path"
                              :href="'http://3.124.65.120' + images.item.path"
                              target="_blank"
                              style="position: relative"
                            >
                              <md-avatar
                                class
                                v-if="
                                  trimImage(images.item.path) === 'pdf'
                                    ? true
                                    : false
                                "
                              >
                                <img src="/images/icons/pdf.png" alt="Avatar" />
                              </md-avatar>
                              <md-avatar
                                class
                                v-else-if="
                                  trimImage(images.item.path) === 'msword'
                                    ? true
                                    : false
                                "
                              >
                                <img
                                  src="/images/icons/word.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <md-avatar
                                class
                                v-else-if="
                                  trimImage(images.item.path) === 'docs'
                                    ? true
                                    : false
                                "
                              >
                                <img
                                  src="/images/icons/word.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <md-avatar
                                class
                                v-else-if="
                                  trimImage(images.item.path) === 'xlm'
                                    ? true
                                    : false
                                "
                              >
                                <img
                                  src="/images/icons/excel.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <md-avatar class v-else>
                                <img
                                  src="/images/icons/generic-attachment.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <!-- <p class="mb-2 font-weight-bold">
                              {{ images.path | trimImageName }}
                            </p> -->
                            </a>
                          </template>
                        </b-table>
                      </b-col>
                    </b-row>

                    <b-row class="d-flex justify-content-between row p-5">
                      <!-- <b-col md="6"> -->
                      <md-button
                        class="md-raised button-radius custom-button font-weight-bold text-capitalize"
                        @click="step = step - 1"
                      >
                        < {{ $t("back") }}</md-button
                      >
                      <!-- </b-col> -->
                      <!-- <b-col md="6"> -->
                      <md-button
                        v-show="
                          (!formDisabled &&
                            hasOnlyEntityInitiatorRole &&
                            iAmOwner) ||
                            newInitiative
                        "
                        class="md-raised md-primary button-radius comman-gradient custom-button font-weight-bold text-capitalize"
                        @click="saveCalculationOfSavingForm"
                        >{{ $t("next") }} ></md-button
                      >
                      <!-- </b-col> -->
                    </b-row>
                  </div>
                </md-card>
              </div>

              <!-- Section four -->
              <div class="mb-5" v-if="step === 4">
                <md-card class="custom-card">
                  <md-card-header>
                    <h3 class="text-center text-color font-weight-bold">
                      {{ $t("implementationsplan") }}
                    </h3>
                  </md-card-header>
                  <hr />
                  <b-row>
                    <b-col md="12">
                      <div class="form-info pl-5 pr-5 text-right">
                        <b-row>
                          <b-col md="12">
                            <md-field>
                              <label class="font-weight-bold">{{
                                $t("nameOfMentor")
                              }}</label>
                              <md-input
                                :disabled="
                                  !(
                                    (!formDisabled &&
                                      hasOnlyEntityInitiatorRole &&
                                      iAmOwner) ||
                                    newInitiative
                                  )
                                "
                                v-model="implementationPlanForm.name"
                              ></md-input>
                            </md-field>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col md="6">
                            <div style="position : relative;">
                              <Datepicker
                                id="startDate"
                                :selected="disbaledStartDates()"
                                :disabled-dates="disableStartDates"
                                :language="ar"
                                class="vue-datepicker"
                                v-model="implementationPlanForm.targetSDate"
                              >
                              </Datepicker>
                              <label
                                :class="
                                  implementationPlanForm.targetSDate != null
                                    ? 'initial-position'
                                    : 'absloute-positon'
                                "
                                id="label"
                                class="font-weight-bold text-secondary label-font"
                                >{{ $t("intendedStartDate") }}
                              </label>
                            </div>
                            <!-- <md-datepicker
                              class="custom-date"
                              md-immediately
                              :md-disabled-dates="disabledDates"
                              name="targetStartDate"
                              id="targetStartDate"
                              v-model="implementationPlanForm.targetSDate"
                            >
                              <label id="label" class="font-weight-bold">{{
                                $t("intendedStartDate")
                              }}</label>
                            </md-datepicker> -->
                          </b-col>
                          <b-col md="6">
                            <div
                              style="position : relative;"
                              @click="disbaledEndDates()"
                              v-if="implementationPlanForm.targetSDate != null"
                            >
                              <Datepicker
                                id="endDate"
                                :disabled-dates="disableEndDates"
                                :language="ar"
                                class="vue-datepicker"
                                v-model="implementationPlanForm.targetEDate"
                              >
                              </Datepicker>
                              <label
                                :class="
                                  implementationPlanForm.targetEDate != null
                                    ? 'initial-position'
                                    : 'absloute-positon'
                                "
                                id="label"
                                class="font-weight-bold text-secondary label-font"
                                >{{ $t("intendedEndDate") }}
                              </label>
                            </div>
                            <div v-else style="position : relative;">
                              <Datepicker
                                id="endDate"
                                :disabled="
                                  implementationPlanForm.targetSDate == null
                                "
                                :language="ar"
                                class="vue-datepicker"
                                v-model="implementationPlanForm.targetEDate"
                              >
                              </Datepicker>
                              <label
                                :class="
                                  implementationPlanForm.targetEDate != null
                                    ? 'initial-position'
                                    : 'absloute-positon'
                                "
                                id="label"
                                class="font-weight-bold text-secondary label-font"
                                >{{ $t("intendedEndDate") }}
                              </label>
                            </div>
                            <!-- <md-datepicker
                              class="custom-date"
                              name="targetEndDate"
                              :md-disabled-dates="disbaledEDates"
                              id="targetEndDate"
                              v-model="implementationPlanForm.targetEDate"
                              md-immediately
                            >
                              <label id="label" class="font-weight-bold">{{
                                $t("intendedEndDate")
                              }}</label>
                            </md-datepicker> -->
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col md="6">
                            <md-field>
                              <label id="label" class="font-weight-bold">{{
                                $t("status")
                              }}</label>
                              <md-select
                                v-model="implementationPlanForm.milstoneStatus"
                              >
                                <md-option value="notstarted">{{
                                  $t("notstarted")
                                }}</md-option>
                                <md-option value="inprogress">{{
                                  $t("inprogress")
                                }}</md-option>
                                <md-option value="completed">{{
                                  $t("completed")
                                }}</md-option>
                              </md-select>
                            </md-field>
                          </b-col>
                          <b-col md="6">
                            <!-- <Datepicker :disabled-dates="range" /> -->
                          </b-col>
                        </b-row>
                        <b-row class="mt-2">
                          <b-col md="12">
                            <md-button
                              class="md-raised md-primary button-radius comman-gradient custom-button font-weight-bold text-capitalize"
                              :disabled="currentRole != currentOwner"
                              @click="addimplementationPlan()"
                            >
                              {{ $t("add") }}
                              <md-icon>add</md-icon>
                            </md-button>
                          </b-col>
                        </b-row>
                      </div>
                      <b-row>
                        <b-col>
                          <div
                            class="d-flex d-inline-block float-left justify-content-between lengeds p-2 w-50"
                          >
                            <div class="w-25">
                              <div class="d-inline-block green"></div>
                              <span
                                class="align-top d-inline-block font-weight-bold pr-2 w-75"
                                >وفق الخطة
                              </span>
                            </div>
                            <div class="">
                              <div class="d-inline-block yellow"></div>
                              <div
                                class="align-top d-inline-block font-weight-bold pr-2 w-75"
                              >
                                تأخير عن الخطة الزمنية اقل من 10%
                              </div>
                            </div>
                            <div>
                              <div class="d-inline-block red"></div>
                              <span
                                class="align-top d-inline-block font-weight-bold pr-2 w-75"
                                >تأخير عن الخطة الزمنية أكثر من 10%
                              </span>
                            </div>
                            <div class="w-25">
                              <div class="d-inline-block grey"></div>
                              <span
                                class="align-top d-inline-block font-weight-bold pr-2 w-75"
                                >معلقة / لم يتم البدء
                              </span>
                            </div>
                          </div>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col
                          v-if="mileStones.length === 0"
                          md="12"
                          class="text-center"
                        >
                          <div class="p-3 alternative-table-text text-muted">
                            لا توجد حاليا أي معالم في هذه الفرصة
                          </div>
                        </b-col>
                        <b-col v-else md="12">
                          <b-table
                            class="mt-4 pl-4 pr-4"
                            :bordered="true"
                            hover
                            :responsive="true"
                            :items="mileStones"
                            :fields="implementationPlanFields"
                          >
                            <template v-slot:cell(actions)="data">
                              <img
                                @click="
                                  currentRole == currentOwner
                                    ? onViewImplementationPlanForm(data)
                                    : null
                                "
                                src="/images/svg/Edit.svg"
                              />
                              <img
                                @click="
                                  currentRole == currentOwner
                                    ? onDeleteMilestone(data, data.index)
                                    : null
                                "
                                src="/images/svg/delete.svg"
                              />
                            </template>
                            <template v-slot:cell(milstoneStatus)="row">
                              <img
                                v-if="
                                  checkCommented(
                                    'milstoneStatus' + `${row.item.id}`
                                  )
                                "
                                @click="hideComment()"
                                class="chat-bubble float-right pr-1 pt-1"
                                src="/images/icons/chat_bubble.png"
                              />
                              <div
                                class="mx-5"
                                :class="
                                  commentedFeild ==
                                  'milstoneStatus' + `${row.item.id}`
                                    ? 'Highlightborderd'
                                    : null
                                "
                                @mouseenter="
                                  mouseHover(
                                    'milstoneStatus' + `${row.item.id}`
                                  )
                                "
                                @mouseleave="mouseLeave()"
                              >
                                <div
                                  v-if="
                                    row.item.milstoneStatus === 'notstarted'
                                  "
                                  class="gery mx-auto"
                                ></div>
                                <div
                                  v-if="
                                    row.item.milstoneStatus === 'inprogress'
                                  "
                                  class="green mx-auto"
                                ></div>
                                <div
                                  v-if="row.item.milstoneStatus === 'completed'"
                                  class="green mx-auto"
                                ></div>
                                <div
                                  v-if="row.item.milstoneStatus === 'yellow'"
                                  class="yellow mx-auto"
                                ></div>
                                <div
                                  v-if="row.item.milstoneStatus == 'red'"
                                  class="red mx-auto"
                                ></div>
                              </div>
                            </template>
                            <template v-slot:cell(targetSDate)="row">
                              <img
                                v-if="
                                  checkCommented(
                                    'targetSDate' + `${row.item.id}`
                                  )
                                "
                                @click="hideComment()"
                                class="chat-bubble float-right pr-1 pt-1"
                                src="/images/icons/chat_bubble.png"
                              />
                              <span
                                :class="
                                  commentedFeild ==
                                  'targetSDate' + `${row.item.id}`
                                    ? 'Highlightborderd'
                                    : null
                                "
                                @mouseenter="
                                  mouseHover('targetSDate' + `${row.item.id}`)
                                "
                                @mouseleave="mouseLeave()"
                              >
                                {{
                                  row.item.targetSDate == "0001-01-01" ||
                                  row.item.targetSDate == null
                                    ? "N/A"
                                    : formatDateMilestone(row.item.targetSDate)
                                }}
                              </span>
                            </template>
                            <template v-slot:cell(targetEDate)="row">
                              <img
                                v-if="
                                  checkCommented(
                                    'targetEDate' + `${row.item.id}`
                                  )
                                "
                                @click="hideComment()"
                                class="chat-bubble float-right pr-1 pt-1"
                                src="/images/icons/chat_bubble.png"
                              />
                              <span
                                :class="
                                  commentedFeild ==
                                  'targetEDate' + `${row.item.id}`
                                    ? 'Highlightborderd'
                                    : null
                                "
                                @mouseenter="
                                  mouseHover('targetEDate' + `${row.item.id}`)
                                "
                                @mouseleave="mouseLeave()"
                              >
                                {{
                                  row.item.targetEDate == "0001-01-01" ||
                                  row.item.targetEDate == null
                                    ? "N/A"
                                    : formatDateMilestone(row.item.targetEDate)
                                }}
                              </span>
                            </template>
                            <template v-slot:cell(actualSDate)="row">
                              <img
                                v-if="
                                  checkCommented(
                                    'actualSDate' + `${row.item.id}`
                                  )
                                "
                                @click="hideComment()"
                                class="chat-bubble float-right pr-1 pt-1"
                                src="/images/icons/chat_bubble.png"
                              />
                              <span
                                :class="
                                  commentedFeild ==
                                  'actualSDate' + `${row.item.id}`
                                    ? 'Highlightborderd'
                                    : null
                                "
                                @mouseenter="
                                  mouseHover('actualSDate' + `${row.item.id}`)
                                "
                                @mouseleave="mouseLeave()"
                              >
                                {{
                                  row.item.actualSDate == "0001-01-01" ||
                                  row.item.actualSDate == null
                                    ? "N/A"
                                    : formatDateMilestone(row.item.actualSDate)
                                }}
                              </span>
                            </template>
                            <template v-slot:cell(actualEDate)="row">
                              <img
                                v-if="
                                  checkCommented(
                                    'actualEDate' + `${row.item.id}`
                                  )
                                "
                                @click="hideComment()"
                                class="chat-bubble float-right pr-1 pt-1"
                                src="/images/icons/chat_bubble.png"
                              />
                              <span
                                :class="
                                  commentedFeild ==
                                  'actualEDate' + `${row.item.id}`
                                    ? 'Highlightborderd'
                                    : null
                                "
                                @mouseenter="
                                  mouseHover('actualEDate' + `${row.item.id}`)
                                "
                                @mouseleave="mouseLeave()"
                              >
                                {{
                                  row.item.actualEDate == "0001-01-01" ||
                                  row.item.actualEDate == null
                                    ? "N/A"
                                    : formatDateMilestone(row.item.actualEDate)
                                }}
                              </span>
                            </template>
                            <template v-slot:cell(name)="row">
                              <img
                                v-if="checkCommented('name' + `${row.item.id}`)"
                                @click="hideComment()"
                                class="chat-bubble float-right pr-1 pt-1"
                                src="/images/icons/chat_bubble.png"
                              />
                              <span
                                :class="
                                  commentedFeild == 'name' + `${row.item.id}`
                                    ? 'Highlightborderd'
                                    : null
                                "
                                @mouseenter="
                                  mouseHover('name' + `${row.item.id}`)
                                "
                                @mouseleave="mouseLeave()"
                              >
                                {{ row.item.name }}
                              </span>
                            </template>
                          </b-table>
                        </b-col>
                        <b-row class="mb-3 pr-3">
                          <b-col>
                            <div
                              class="pr-4 small font-weight-bold text-center w-auto"
                            >
                              ملاحظة: يتوجب تحديد عدة معالم بصياعة واضحة، وبما
                              يتوافق مع وصف الفرصة وتواريخ بدء وانتهاء الفرصة
                              المدخلة سابقاً. على سبيل المثال:
                            </div>
                            <div class="pr-4 small font-weight-bold w-auto">
                              1- الانتهاء من تطوير وصف مبدئي للفرصة (وصف الفرصة
                              وأثرها المتوقع، المعالم الرئيسية للتنفيذ, معلومات
                              عامة عن الفرصة)
                            </div>
                            <div class="pr-4 small font-weight-bold w-auto">
                              2- تحديد ملاك المشروع من الجهة وفريق العمل
                            </div>
                          </b-col>
                        </b-row>
                      </b-row>
                      <div class="form-info pl-5 pr-5 text-right">
                        <b-row>
                          <b-col md="12">
                            <md-field>
                              <label
                                @mouseenter="mouseHover('summeryThisMonth')"
                                @mouseleave="mouseLeave()"
                                class="font-weight-bold"
                                :class="
                                  commentedFeild == 'summeryThisMonth'
                                    ? 'Highlightborderd'
                                    : null
                                "
                                >{{
                                  $t(
                                    "SummaryOfWhatHasBeenAchievedThisMonth(Optional)"
                                  )
                                }}
                                <img
                                  v-if="checkCommented('summeryThisMonth')"
                                  @click="hideComment()"
                                  class="chat-bubble pr-1"
                                  src="/images/icons/chat_bubble.png"
                                />
                              </label>
                              <md-textarea
                                :disabled="
                                  !(
                                    (!formDisabled &&
                                      hasOnlyEntityInitiatorRole &&
                                      iAmOwner) ||
                                    newInitiative
                                  )
                                "
                                v-model="
                                  summaryOfInitiativeForm.summeryThisMonth
                                "
                                md-autogrow
                              ></md-textarea>
                            </md-field>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col md="12">
                            <md-field>
                              <label
                                @mouseenter="mouseHover('planNextMonth')"
                                @mouseleave="mouseLeave()"
                                class="font-weight-bold"
                                :class="
                                  commentedFeild == 'planNextMonth'
                                    ? 'Highlightborderd'
                                    : null
                                "
                                >{{
                                  $t(
                                    "SummaryOfAchievementsplannedforNextMonth(Optional)"
                                  )
                                }}
                                <img
                                  v-if="checkCommented('planNextMonth')"
                                  class="chat-bubble pr-1"
                                  @click="hideComment()"
                                  src="/images/icons/chat_bubble.png"
                                />
                              </label>
                              <md-textarea
                                :disabled="
                                  !(
                                    (!formDisabled &&
                                      hasOnlyEntityInitiatorRole &&
                                      iAmOwner) ||
                                    newInitiative
                                  )
                                "
                                v-model="summaryOfInitiativeForm.planNextMonth"
                                md-autogrow
                              ></md-textarea>
                            </md-field>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col md="12">
                            <md-field>
                              <label
                                @mouseenter="mouseHover('generalComment')"
                                @mouseleave="mouseLeave()"
                                class="font-weight-bold"
                                :class="
                                  commentedFeild == 'generalComment'
                                    ? 'Highlightborderd'
                                    : null
                                "
                                >{{ $t("GeneralComment(Optional)") }}
                                <img
                                  v-if="checkCommented('generalComment')"
                                  class="chat-bubble pr-1"
                                  @click="hideComment()"
                                  src="/images/icons/chat_bubble.png"
                                />
                              </label>
                              <md-textarea
                                :disabled="
                                  !(
                                    (!formDisabled &&
                                      hasOnlyEntityInitiatorRole &&
                                      iAmOwner) ||
                                    newInitiative
                                  )
                                "
                                v-model="summaryOfInitiativeForm.generalComment"
                                md-autogrow
                              ></md-textarea>
                            </md-field>
                          </b-col>
                        </b-row>
                      </div>
                      <b-row class="p-5 d-flex justify-content-between">
                        <!-- <b-col md="6"> -->
                        <md-button
                          class="md-raised custom-button button-radius font-weight-bold text-capitalize"
                          @click="step = step - 1"
                        >
                          < {{ $t("back") }}</md-button
                        >
                        <md-button
                          class="md-raised md-primary button-radius comman-gradient custom-button font-weight-bold text-capitalize"
                          v-show="
                            (!formDisabled &&
                              hasOnlyEntityInitiatorRole &&
                              iAmOwner) ||
                              newInitiative
                          "
                          @click="
                            saveImplementationPlanForm(true),
                              saveSummaryOfInitiativeForm()
                          "
                          >{{ $t("next") }} ></md-button
                        >
                        <!-- </b-col> -->
                        <!-- <b-col md="6"> -->
                        <!-- </b-col> -->
                      </b-row>
                    </b-col>
                  </b-row>
                </md-card>
              </div>

              <!-- Section five -->
              <div class="mb-5" v-if="step === 5">
                <md-card class="custom-card">
                  <md-card-header>
                    <h3 class="text-center text-color font-weight-bold">
                      {{ $t("supportRequired") }}
                    </h3>
                  </md-card-header>
                  <hr />
                  <form class="form-info pl-5 pr-5 pb-5 text-right">
                    <b-row>
                      <b-col md="12">
                        <md-field>
                          <label
                            @mouseenter="mouseHover('supportType')"
                            @mouseleave="mouseLeave()"
                            class="font-weight-bold"
                            :class="
                              commentedFeild == 'supportType'
                                ? 'Highlightborderd'
                                : null
                            "
                            >{{ $t("supportType") }} (2500 {{ $t("limit") }} )
                            <img
                              v-if="checkCommented('supportType')"
                              class="chat-bubble  pr-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                          </label>
                          <md-textarea
                            :disabled="
                              !(
                                (!formDisabled &&
                                  hasOnlyEntityInitiatorRole &&
                                  iAmOwner) ||
                                newInitiative
                              )
                            "
                            v-model="support.supportType"
                            md-autogrow
                          ></md-textarea>
                        </md-field>
                        <span>إختياري</span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <md-field>
                          <label
                            @mouseenter="mouseHover('SupportDescription')"
                            @mouseleave="mouseLeave()"
                            class="font-weight-bold"
                            :class="
                              commentedFeild == 'SupportDescription'
                                ? 'Highlightborderd'
                                : null
                            "
                            >{{ $t("SupportDescription") }} (2500
                            {{ $t("limit") }} )
                            <img
                              v-if="checkCommented('SupportDescription')"
                              class="chat-bubble  pr-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                          </label>
                          <md-textarea
                            :disabled="
                              !(
                                (!formDisabled &&
                                  hasOnlyEntityInitiatorRole &&
                                  iAmOwner) ||
                                newInitiative
                              )
                            "
                            v-model="support.description"
                            md-autogrow
                          ></md-textarea>
                        </md-field>
                        <span>إختياري</span>
                      </b-col>
                    </b-row>
                    <b-row class="d-flex justify-content-between row p-5">
                      <md-button
                        class="md-raised button-radius custom-button font-weight-bold text-capitalize float-left"
                        @click="step = step - 1"
                      >
                        < {{ $t("back") }}</md-button
                      >
                      <md-button
                        class="md-raised md-primary button-radius comman-gradient custom-button font-weight-bold text-capitalize"
                        v-show="
                          (!formDisabled &&
                            hasOnlyEntityInitiatorRole &&
                            iAmOwner) ||
                            newInitiative
                        "
                        @click="SaveSupport()"
                        >{{ $t("next") }} ></md-button
                      >
                    </b-row>
                  </form>
                </md-card>
              </div>

              <!---- Section Six ---->
              <div class="mb-5" v-if="step === 6">
                <md-card class="custom-card">
                  <md-card-header>
                    <h3 class="text-center text-color font-weight-bold">
                      {{ $t("GeneralComment") }}
                    </h3>
                  </md-card-header>
                  <hr />
                  <form class="form-info pl-5 pr-5 pb-5 text-right">
                    <b-row>
                      <b-col>
                        <md-field>
                          <label
                            @mouseenter="mouseHover('description')"
                            @mouseleave="mouseLeave()"
                            class="font-weight-bold"
                            :class="
                              commentedFeild == 'description'
                                ? 'Highlightborderd'
                                : null
                            "
                            >{{ $t("description") }}</label
                          >
                          <md-textarea
                            :disabled="
                              !(
                                (!formDisabled &&
                                  hasOnlyEntityInitiatorRole &&
                                  iAmOwner) ||
                                newInitiative
                              )
                            "
                            v-model="generalComment.description"
                            md-autogrow
                          ></md-textarea>
                        </md-field>
                      </b-col>
                    </b-row>
                    <b-row class="mb-3">
                      <b-col md="12" class="pr-0">
                        <input
                          class="d-none"
                          type="file"
                          @change="generalFileupload($event)"
                          id="generalcomment"
                          ref="file"
                          name="file"
                          multiple
                        />
                        <md-button
                          class="text-secondary pb-10 custom-attachment-button font-weight-bold text-capitalize"
                          :disabled="
                            !(
                              (!formDisabled &&
                                hasOnlyEntityInitiatorRole &&
                                iAmOwner) ||
                              newInitiative
                            )
                          "
                          @click="handleGeneralFile()"
                        >
                          <img
                            class="float-left pr-2"
                            src="/images/svg/attachment.svg"
                            alt
                          />
                          Add Attachment
                        </md-button>
                      </b-col>
                    </b-row>
                    <b-row v-if="generalCommentFileUrl.length != 0">
                      <b-col md="12" class="pr-2">
                        <b-table
                          class="customTable pr-4 pl-4"
                          bordered
                          :responsive="true"
                          :items="generalCommentFileUrl"
                          :fields="generalCommentFileUrlFields"
                        >
                          <template v-slot:cell(sr)="row">{{
                            row.index + 1
                          }}</template>
                          <template v-slot:cell(fileName)="row">
                            <img
                              v-if="
                                checkCommented('fileName' + `${row.item.id}`)
                              "
                              @click="hideComment()"
                              class="chat-bubble pr-1"
                              src="/images/icons/chat_bubble.png"
                            />
                            <div
                              class="d-inline"
                              :class="
                                commentedFeild == 'fileName' + `${row.item.id}`
                                  ? 'Highlightborderd'
                                  : null
                              "
                              v-if="row.item.path"
                              @mouseenter="
                                mouseHover('fileName' + `${row.item.id}`)
                              "
                              @mouseleave="mouseLeave()"
                            >
                              {{ row.item.path | trimImageName }}
                            </div>
                            <div
                              class="d-inline"
                              :class="
                                commentedFeild == 'fileName' + `${row.item.id}`
                                  ? 'Highlightborderd'
                                  : null
                              "
                              v-if="!row.item.path"
                              @mouseenter="
                                mouseHover('fileName' + `${row.item.id}`)
                              "
                              @mouseleave="mouseLeave()"
                            >
                              {{ row.item.name }}
                            </div>
                          </template>
                          <template v-slot:cell(delete)="row">
                            <img
                              src="/images/svg/delete.svg"
                              @click="onDeleteFile($event, row, row.index)"
                              style="
                                width: 24px;
                                cursor: pointer;
                                z-index: 9999;
                              "
                              alt
                            />
                          </template>
                          <template v-slot:cell(type)="images">
                            <a
                              @mouseenter="mouseHover('type' + images.item.id)"
                              @mouseleave="mouseLeave()"
                              v-if="images.item.link"
                              :href="images.item.link"
                              target="_blank"
                              style="position: relative"
                            >
                              <md-avatar
                                class="md-avatar-icon"
                                v-if="images.item.type === 'pdf'"
                              >
                                <img
                                  class
                                  src="/images/icons/pdf.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <md-avatar
                                class
                                v-else-if="images.item.type === 'msword'"
                              >
                                <img
                                  src="/images/icons/word.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <md-avatar
                                class
                                v-else-if="images.item.type === 'docs'"
                              >
                                <img
                                  src="/images/icons/word.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <md-avatar
                                class
                                v-else-if="images.item.type === 'xlm'"
                              >
                                <img
                                  src="/images/icons/excel.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <md-avatar class v-else>
                                <img
                                  src="/images/icons/generic-attachment.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <!-- <p class="font-weight-bold">{{ images.name }}</p> -->
                            </a>
                            <a
                              @mouseenter="mouseHover('type' + images.item.id)"
                              @mouseleave="mouseLeave()"
                              v-if="images.item.path"
                              :href="'http://3.124.65.120' + images.item.path"
                              target="_blank"
                              style="position: relative"
                            >
                              <md-avatar
                                class
                                v-if="
                                  trimImage(images.item.path) === 'pdf'
                                    ? true
                                    : false
                                "
                              >
                                <img src="/images/icons/pdf.png" alt="Avatar" />
                              </md-avatar>
                              <md-avatar
                                class
                                v-else-if="
                                  trimImage(images.item.path) === 'msword'
                                    ? true
                                    : false
                                "
                              >
                                <img
                                  src="/images/icons/word.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <md-avatar
                                class
                                v-else-if="
                                  trimImage(images.item.path) === 'docs'
                                    ? true
                                    : false
                                "
                              >
                                <img
                                  src="/images/icons/word.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <md-avatar
                                class
                                v-else-if="
                                  trimImage(images.item.path) === 'xlm'
                                    ? true
                                    : false
                                "
                              >
                                <img
                                  src="/images/icons/excel.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <md-avatar class v-else>
                                <img
                                  src="/images/icons/generic-attachment.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <!-- <p class="mb-2 font-weight-bold">
                              {{ images.path | trimImageName }}
                            </p> -->
                            </a>
                          </template>
                        </b-table>
                      </b-col>
                    </b-row>

                    <!-- <b-row v-if="generalCommentFileUrl.length !== 0">
                      <b-col md="12" class="pr-2">
                        <div
                          v-for="(images, index) in generalCommentFileUrl"
                          :key="index"
                          class="pr-3"
                        >
                          <a v-if="images.link" :href="images.link" target="_blank" style="position:relative">
                            <img
                              src="/images/icons/close.png"
                              @click="onDeleteFile($event,images,index)"
                              style="width: 15px;float: left;position: absolute;left: -26px;top: -13px;cursor:pointer;z-index: 9999"
                              alt
                              />
                            <md-avatar
                              class="md-avatar-icon"
                              v-if="images.type === 'pdf'"
                            >
                              <img
                                class
                                src="/images/icons/pdf.png"
                                alt="Avatar"
                              />
                            </md-avatar>
                            <md-avatar
                              class
                              v-else-if="images.type === 'msword'"
                            >
                              <img src="/images/icons/word.png" alt="Avatar" />
                            </md-avatar>
                            <md-avatar class v-else-if="images.type === 'docs'">
                              <img src="/images/icons/word.png" alt="Avatar" />
                            </md-avatar>
                            <md-avatar class v-else-if="images.type === 'xlm'">
                              <img src="/images/icons/excel.png" alt="Avatar" />
                            </md-avatar>
                            <md-avatar class v-else>
                              <img
                                src="/images/icons/generic-attachment.png"
                                alt="Avatar"
                              />
                            </md-avatar>
                            <p class="font-weight-bold">{{ images.name }}</p>
                          </a>
                          <a v-if="images.path"
                            :href="'http://3.124.65.120' + images.path"
                            target="_blank"
                            style="position:relative"
                          >
                          <img
                              src="/images/icons/close.png"
                              @click="onDeleteFile($event,images,index)"
                              style="width: 15px;float: left;position: absolute;left: -26px;top: -13px;cursor:pointer;z-index: 9999"
                              alt
                              />
                            <md-avatar
                              class
                              v-if="
                                trimImage(images.path) === 'pdf' ? true : false
                              "
                            >
                              <img src="/images/icons/pdf.png" alt="Avatar" />
                            </md-avatar>
                            <md-avatar
                              class
                              v-else-if="
                                trimImage(images.path) === 'msword'
                                  ? true
                                  : false
                              "
                            >
                              <img src="/images/icons/word.png" alt="Avatar" />
                            </md-avatar>
                            <md-avatar
                              class
                              v-else-if="
                                trimImage(images.path) === 'docs' ? true : false
                              "
                            >
                              <img src="/images/icons/word.png" alt="Avatar" />
                            </md-avatar>
                            <md-avatar
                              class
                              v-else-if="
                                trimImage(images.path) === 'xlm' ? true : false
                              "
                            >
                              <img src="/images/icons/excel.png" alt="Avatar" />
                            </md-avatar>
                            <md-avatar class v-else>
                              <img
                                src="/images/icons/generic-attachment.png"
                                alt="Avatar"
                              />
                            </md-avatar>
                            <p class="mb-2 font-weight-bold">
                              {{ images.path | trimImageName }}
                            </p>
                          </a>
                        </div>
                      </b-col>
                    </b-row> -->

                    <b-row class="d-flex justify-content-between row p-5">
                      <md-button
                        class="md-raised button-radius custom-button font-weight-bold text-capitalize float-left"
                        @click="step = step - 1"
                      >
                        < {{ $t("back") }}</md-button
                      >
                      <md-button
                        class="md-raised md-primary button-radius comman-gradient custom-button font-weight-bold text-capitalize"
                        v-show="
                          (!formDisabled &&
                            hasOnlyEntityInitiatorRole &&
                            iAmOwner) ||
                            newInitiative
                        "
                        @click="GeneralCommentSave()"
                        >{{ $t("next") }} ></md-button
                      >
                    </b-row>
                  </form>
                </md-card>
              </div>

              <!---- Section seven ---->

              <!-- Section Eight  -->
              <div v-if="step === 7" class="mb-5">
                <!-- review Opportunity -->
                <md-card class="px-4 mb-5 custom-card text-center">
                  <b-row>
                    <b-col md="12">
                      <md-card-header>
                        <h3 class="font-weight-bold text-color">
                          {{ $t("reviewopportunity") }}
                        </h3>
                      </md-card-header>
                    </b-col>
                  </b-row>
                </md-card>

                <!-- Section General information -->
                <md-card class="p-4 mb-5 custom-card">
                  <!-- {{ currentRole === currentOwner }} -->
                  <b-row class="d-flex justify-content-between pl-4 pr-4">
                    <h3 class="font-weight-bold d-inline-block text-color">
                      {{ $t("generalinformation") }}
                    </h3>
                    <md-button
                      v-if="currentRole === currentOwner"
                      @click="step = 1"
                      class="edit-button align-baseline m-1 font-weight-bold text-capitalize"
                    >
                      {{ $t("edit") }}
                      <img class="edit-icon" src="/images/svg/Edit.svg" />
                    </md-button>
                  </b-row>
                  <md-card-content>
                    <b-row class="mb-3">
                      <b-col md="12">
                        <span
                          @mouseenter="mouseHover('generalinformation')"
                          @mouseleave="mouseLeave()"
                          class="font-weight-bolder review-label label-font"
                          >{{ $t("oppertunityname") }}</span
                        >
                        <img
                          v-if="checkCommented('generalinformation')"
                          class="chat-bubble pr-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <p class="md-subheading font-weight-bold fit-content">
                          {{ generalForm.name }}
                        </p>
                        <!-- <Datepicker :language="ar"></Datepicker> -->
                      </b-col>
                    </b-row>
                    <b-row class="mb-3">
                      <b-col md="12">
                        <span
                          @mouseenter="mouseHover('owner')"
                          @mouseleave="mouseLeave()"
                          class="font-weight-bolder review-label label-font"
                          >{{ $t("owner") }}</span
                        >
                        <img
                          v-if="checkCommented('owner')"
                          class="chat-bubble pr-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <p class="md-subheading font-weight-bold fit-content">
                          {{ generalForm.owner }}
                        </p>
                      </b-col>
                    </b-row>
                    <b-row class="mb-3">
                      <b-col md="12">
                        <span
                          @mouseenter="mouseHover('Description')"
                          @mouseleave="mouseLeave()"
                          class="font-weight-bolder review-label label-font"
                          >{{ $t("initiativeDescription") }}</span
                        >
                        <img
                          v-if="checkCommented('Description')"
                          class="chat-bubble pr-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <p
                          class="md-subheading font-weight-bold pr-1 pl-1 fit-content"
                        >
                          {{ generalForm.description }}
                        </p>
                      </b-col>
                    </b-row>
                    <b-row class="mb-3">
                      <b-col md="12">
                        <span
                          @mouseenter="mouseHover('expSaveValue')"
                          @mouseleave="mouseLeave()"
                          class="font-weight-bolder review-label label-font"
                          >{{ $t("totalexpectedsavings") }}</span
                        >
                        <img
                          v-if="checkCommented('expSaveValue')"
                          class="chat-bubble pr-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <p class="md-subheading font-weight-bold fit-content">
                          {{ generalForm.expSaveValue }}
                        </p>
                      </b-col>
                    </b-row>
                    <b-row class="mb-3">
                      <b-col md="12">
                        <span
                          @mouseenter="mouseHover('deputyShip')"
                          @mouseleave="mouseLeave()"
                          class="font-weight-bolder review-label label-font"
                          >{{ $t("department") }}</span
                        >
                        <img
                          v-if="checkCommented('deputyShip')"
                          class="chat-bubble pr-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <p class="md-subheading font-weight-bold fit-content">
                          {{ generalForm.deputyShip }}
                        </p>
                      </b-col>
                    </b-row>
                    <b-row class="mb-3">
                      <b-col md="12">
                        <span
                          @mouseenter="mouseHover('type')"
                          @mouseleave="mouseLeave()"
                          class="font-weight-bolder review-label label-font"
                          >نوع الوفر</span
                        >
                        <img
                          v-if="checkCommented('type')"
                          class="chat-bubble pr-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <p class="md-subheading font-weight-bold fit-content">
                          {{ generalForm.type }}
                        </p>
                      </b-col>
                    </b-row>
                    <b-row class="mb-3" v-if="generalForm.type == 'أخرى'">
                      <b-col md="12">
                        <span
                          @mouseenter="mouseHover('savingTypeDescription')"
                          @mouseleave="mouseLeave()"
                          class="font-weight-bolder review-label label-font"
                          >{{ $t("otherDescription") }}</span
                        >
                        <img
                          v-if="checkCommented('savingTypeDescription')"
                          class="chat-bubble pr-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <p class="md-subheading font-weight-bold fit-content">
                          {{ generalForm.savingTypeDescription }}
                        </p>
                      </b-col>
                    </b-row>
                    <b-row class="mb-3">
                      <b-col md="2">
                        <span
                          @mouseenter="mouseHover('startDate')"
                          @mouseleave="mouseLeave()"
                          class="font-weight-bolder review-label label-font"
                          >{{ $t("startDate") }}</span
                        >
                        <img
                          v-if="checkCommented('startDate')"
                          class="chat-bubble pr-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <p class="md-subheading font-weight-bold fit-content">
                          {{ formateDate(generalForm.startDate) }}
                        </p>
                      </b-col>
                      <b-col md="2" offset-md="8">
                        <span
                          @mouseenter="mouseHover('endDate')"
                          @mouseleave="mouseLeave()"
                          class="font-weight-bolder review-label label-font"
                          >{{ $t("endDate") }}</span
                        >
                        <img
                          v-if="checkCommented('endDate')"
                          class="chat-bubble pr-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <p class="md-subheading font-weight-bold fit-content">
                          {{ formateDate(generalForm.endDate) }}
                        </p>
                      </b-col>
                    </b-row>
                  </md-card-content>
                </md-card>

                <!-- Section Finincial Statement -->
                <md-card class="custom-card mb-5">
                  <b-row class="d-flex justify-content-between p-4">
                    <h3 class="float-right text-color pr-4 font-weight-bold">
                      {{ $t("financialdataandsaving") }}
                    </h3>
                    <b-button
                      v-if="currentRole === currentOwner"
                      @click="step = 2"
                      class="edit-button border-0 align-baseline m-1 ml-4 font-weight-bold text-capitalize"
                    >
                      {{ $t("edit") }}
                      <img class="edit-icon" src="/images/svg/Edit.svg" />
                    </b-button>
                  </b-row>
                  <div>
                    <p class="font-weight-bold h5 p-3">{{ $t("GfsCodes") }}</p>
                    <b-table
                      class="customTable pr-4 pl-4"
                      bordered
                      :responsive="true"
                      :items="yearlySavaData"
                      :fields="financialSavingfields"
                    >
                      <template v-slot:cell(gfs)="row">
                        <img
                          v-if="checkCommented('gfs' + `${row.item.total}`)"
                          class="chat-bubble pr-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <span
                          class="m-0"
                          :class="
                            commentedFeild == 'gfs' + `${row.item.total}`
                              ? 'HighlightCell'
                              : null ||
                                (Highlight &&
                                matchYearlySave(row, (name = 'gfs')) != null
                                  ? 'showHighlightCell'
                                  : null)
                          "
                          @mouseenter="
                            mouseHover('gfs' + `${row.item.total}`),
                              lastYearlySave(row, (name = 'gfs'))
                          "
                          @mouseleave="mouseLeave()"
                          :id="'gfs' + `${row.item.total}`"
                        >
                          {{ row.item.gfs }}
                        </span>
                      </template>
                      <template v-slot:cell(clause)="row">
                        <img
                          v-if="checkCommented('clause' + `${row.item.total}`)"
                          class="chat-bubble pr-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <span
                          class="m-0"
                          :class="
                            commentedFeild == 'clause' + `${row.item.total}`
                              ? 'HighlightCell'
                              : null ||
                                (Highlight &&
                                matchYearlySave(row, (name = 'clause')) != null
                                  ? 'showHighlightCell'
                                  : null)
                          "
                          :id="'clause' + `${row.item.total}`"
                          @mouseenter="
                            mouseHover('clause' + `${row.item.total}`),
                              lastYearlySave(row, (name = 'clause'))
                          "
                          @mouseleave="mouseLeave()"
                        >
                          {{ row.item.clause }}
                        </span>
                      </template>
                      <template v-slot:cell(annualBalance)="row">
                        <img
                          v-if="
                            checkCommented(
                              'annualBalance' + `${row.item.total}`
                            )
                          "
                          @click="hideComment()"
                          class="h-75 pl-1"
                          src="/images/icons/chat_bubble.png"
                        />
                        <span
                          class="m-0"
                          :class="
                            commentedFeild ==
                            'annualBalance' + `${row.item.total}`
                              ? 'HighlightCell'
                              : null ||
                                (Highlight &&
                                matchYearlySave(
                                  row,
                                  (name = 'annualBalance')
                                ) != null
                                  ? 'showHighlightCell'
                                  : null)
                          "
                          @mouseenter="
                            mouseHover('annualBalance' + `${row.item.total}`),
                              lastYearlySave(row, (name = 'annualBalance'))
                          "
                          @mouseleave="mouseLeave()"
                          :id="'annualBalance' + `${row.item.total}`"
                        >
                          {{ row.item.annualBalance }}
                        </span>
                      </template>
                      <template v-slot:cell(valueAfterRecommend)="row">
                        <img
                          v-if="
                            checkCommented(
                              'valueAfterRecommend' + `${row.item.total}`
                            )
                          "
                          @click="hideComment()"
                          class="h-75 pl-1"
                          src="/images/icons/chat_bubble.png"
                        />
                        <span
                          class="m-0"
                          :class="
                            commentedFeild ==
                            'valueAfterRecommend' + `${row.item.total}`
                              ? 'HighlightCell'
                              : null ||
                                (Highlight &&
                                matchYearlySave(
                                  row,
                                  (name = 'valueAfterRecommend')
                                ) != null
                                  ? 'showHighlightCell'
                                  : null)
                          "
                          @mouseenter="
                            mouseHover(
                              'valueAfterRecommend' + `${row.item.total}`
                            ),
                              lastYearlySave(
                                row,
                                (name = 'valueAfterRecommend')
                              )
                          "
                          @mouseleave="mouseLeave()"
                          :id="'valueAfterRecommend' + `${row.item.total}`"
                        >
                          {{ row.item.valueAfterRecommend }}
                        </span>
                      </template>
                      <template v-slot:cell(year)="row">
                        <img
                          v-if="checkCommented('year' + `${row.item.total}`)"
                          class="h-75 pl-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <span
                          class="m-0"
                          :class="
                            commentedFeild == 'year' + `${row.item.total}`
                              ? 'HighlightCell'
                              : null ||
                                (Highlight &&
                                matchYearlySave(row, (name = 'year')) != null
                                  ? 'showHighlightCell'
                                  : null)
                          "
                          @mouseenter="
                            mouseHover('year' + `${row.item.total}`),
                              lastYearlySave(row, (name = 'year'))
                          "
                          @mouseleave="mouseLeave()"
                          :id="'year' + `${row.item.total}`"
                        >
                          {{ row.item.year }}
                        </span>
                      </template>
                    </b-table>
                  </div>
                  <div class="position-relative">
                    <p class="font-weight-bold h5 p-3">
                      {{ $t("ExpectedSavings") }}
                    </p>
                    <p
                      class="float-left font-weight-bold pl-4"
                      :class="checkExpectedvalue ? 'text-danger' : null"
                    >
                      إجمالي الوفر المتوقع للفرصة:
                      {{ formatAsCurrency(calculateExpectedSavingNew()) }} ريال
                      سعودي
                    </p>
                    <div
                      v-if="checkExpectedvalue"
                      class="float-left w-100 font-weight-bold pl-4"
                      :class="checkExpectedvalue ? 'text-danger' : null"
                    >
                      <p class="float-left">
                        إجمالي التوزيع السنوي غير متوائم مع إجمالي الوفر المتوقع
                        في قسم المعلومات العامة
                      </p>
                    </div>
                    <!-- <p>إجمالي الوفر المتوقع للفرصة: {{totalExpectedvalue}} ريال سعودي</p> -->
                    <b-table
                      id="expectedtable"
                      class="customTable pr-4 pl-4"
                      bordered
                      :responsive="true"
                      :items="yearlySavaData"
                      :fields="yearlySavefields"
                    >
                      <template v-slot:cell(clause)="row">{{
                        row.item.clause
                      }}</template>
                      <template v-slot:cell(yearE2019)="row">
                        <img
                          v-if="checkCommented('yearE2019' + `${row.item.id}`)"
                          class="h-75 pl-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <span
                          class="m-0"
                          :class="
                            commentedFeild == 'yearE2019' + `${row.item.id}`
                              ? 'HighlightCell'
                              : null ||
                                (Highlight &&
                                matchYearlySave(row, (name = 'yearE2019')) !=
                                  null
                                  ? 'showHighlightCell'
                                  : null)
                          "
                          :id="'yearE2019' + `${row.item.id}`"
                          @mouseenter="
                            mouseHover('yearE2019' + `${row.item.id}`),
                              lastYearlySave(row, (name = 'yearE2019'))
                          "
                          @mouseleave="mouseLeave()"
                        >
                          {{ row.item.yearE2019 }}
                        </span>
                      </template>
                      <template v-slot:cell(yearE2020)="row">
                        <img
                          v-if="checkCommented('yearE2020' + `${row.item.id}`)"
                          class="h-75 pl-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <span
                          class="m-0"
                          :class="
                            commentedFeild == 'yearE2020' + `${row.item.id}`
                              ? 'HighlightCell'
                              : null ||
                                (Highlight &&
                                matchYearlySave(row, (name = 'yearE2020')) !=
                                  null
                                  ? 'showHighlightCell'
                                  : null)
                          "
                          :id="'yearE2020' + `${row.item.id}`"
                          @mouseenter="
                            mouseHover('yearE2020' + `${row.item.id}`),
                              lastYearlySave(row, (name = 'yearE2020'))
                          "
                          @mouseleave="mouseLeave()"
                        >
                          {{ row.item.yearE2020 }}
                        </span>
                      </template>
                      <template v-slot:cell(yearE2021)="row">
                        <img
                          v-if="checkCommented('yearE2021' + `${row.item.id}`)"
                          class="h-75 pl-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <span
                          class="m-0"
                          :class="
                            commentedFeild == 'yearE2021' + `${row.item.id}`
                              ? 'HighlightCell'
                              : null ||
                                (Highlight &&
                                matchYearlySave(row, (name = 'yearE2021')) !=
                                  null
                                  ? 'showHighlightCell'
                                  : null)
                          "
                          :id="'yearE2021' + `${row.item.id}`"
                          @mouseenter="
                            mouseHover('yearE2021' + `${row.item.id}`),
                              lastYearlySave(row, (name = 'yearE2021'))
                          "
                          @mouseleave="mouseLeave()"
                        >
                          {{ row.item.yearE2021 }}
                        </span>
                      </template>
                      <template v-slot:cell(yearE2022)="row">
                        <img
                          v-if="checkCommented('yearE2022' + `${row.item.id}`)"
                          class="h-75 pl-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <span
                          class="m-0"
                          :class="
                            commentedFeild == 'yearE2022' + `${row.item.id}`
                              ? 'HighlightCell'
                              : null ||
                                (Highlight &&
                                matchYearlySave(row, (name = 'yearE2022')) !=
                                  null
                                  ? 'showHighlightCell'
                                  : null)
                          "
                          :id="'yearE2022' + `${row.item.id}`"
                          @mouseenter="
                            mouseHover('yearE2022' + `${row.item.id}`),
                              lastYearlySave(row, (name = 'yearE2022'))
                          "
                          @mouseleave="mouseLeave()"
                        >
                          {{ row.item.yearE2022 }}
                        </span>
                      </template>
                      <template v-slot:cell(yearE2023)="row">
                        <img
                          v-if="checkCommented('yearE2023' + `${row.item.id}`)"
                          class="h-75 pl-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <span
                          class="m-0"
                          :class="
                            commentedFeild == 'yearE2023' + `${row.item.id}`
                              ? 'HighlightCell'
                              : null ||
                                (Highlight &&
                                matchYearlySave(row, (name = 'yearE2023')) !=
                                  null
                                  ? 'showHighlightCell'
                                  : null)
                          "
                          :id="'yearE2023' + `${row.item.id}`"
                          @mouseenter="
                            mouseHover('yearE2023' + `${row.item.id}`),
                              lastYearlySave(row, (name = 'yearE2023'))
                          "
                          @mouseleave="mouseLeave()"
                        >
                          {{ row.item.yearE2023 }}
                        </span>
                      </template>
                      <template v-slot:cell(eFutureyears)="row">
                        <img
                          v-if="
                            checkCommented('eFutureyears' + `${row.item.id}`)
                          "
                          @click="hideComment()"
                          class="h-75 pl-1"
                          src="/images/icons/chat_bubble.png"
                        />
                        <span
                          class="m-0"
                          :class="
                            commentedFeild == 'eFutureyears' + `${row.item.id}`
                              ? 'HighlightCell'
                              : null ||
                                (Highlight &&
                                matchYearlySave(row, (name = 'eFutureyears')) !=
                                  null
                                  ? 'showHighlightCell'
                                  : null)
                          "
                          :id="'eFutureyears' + `${row.item.id}`"
                          @mouseenter="
                            mouseHover('eFutureyears' + `${row.item.id}`),
                              lastYearlySave(row, (name = 'eFutureyears'))
                          "
                          @mouseleave="mouseLeave()"
                        >
                          {{ row.item.eFutureyears }}
                        </span>
                      </template>
                      <template v-slot:cell(Total)="row">
                        <img
                          v-if="checkCommented('Total' + `${row.item.id}`)"
                          class="h-75 pl-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <span
                          class="m-0"
                          :class="
                            commentedFeild == 'Total' + `${row.item.id}`
                              ? 'HighlightCell'
                              : null ||
                                (Highlight &&
                                matchYearlySave(row, (name = 'Total')) != null
                                  ? 'showHighlightCell'
                                  : null)
                          "
                          @mouseenter="
                            mouseHover('Total' + `${row.item.id}`),
                              lastYearlySave(row, (name = 'Total'))
                          "
                          @mouseleave="mouseLeave()"
                          :id="'Total' + `${row.item.id}`"
                        >
                          {{ calculateExpectedtotal(row.item) }}
                        </span>
                      </template>
                      <template v-slot:custom-foot>
                        <!-- You can customize this however you want, this is just as an example -->
                        <b-tr>
                          <b-td class="font-weight-bold">{{
                            $t("Total")
                          }}</b-td>
                          <b-td>
                            <img
                              v-if="checkCommented('yearE2019')"
                              class="h-75 pl-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="m-0"
                              :class="
                                commentedFeild == 'yearE2019'
                                  ? 'HighlightCell'
                                  : null
                              "
                              @mouseenter="mouseHover('yearE2019')"
                              @mouseleave="mouseLeave()"
                              :id="'yearE2019'"
                            >
                              {{ calculateExpectedSaving("yearE2019") }}
                            </span>
                          </b-td>
                          <b-td>
                            <img
                              v-if="checkCommented('yearE2020')"
                              class="h-75 pl-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="m-0"
                              :class="
                                commentedFeild == 'yearE2020'
                                  ? 'HighlightCell'
                                  : null
                              "
                              @mouseenter="mouseHover('yearE2020')"
                              @mouseleave="mouseLeave()"
                              :id="'yearE2020'"
                            >
                              {{ calculateExpectedSaving("yearE2020") }}
                            </span>
                          </b-td>
                          <b-td>
                            <img
                              v-if="checkCommented('yearE2021')"
                              class="h-75 pl-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="m-0"
                              :class="
                                commentedFeild == 'yearE2021'
                                  ? 'HighlightCell'
                                  : null
                              "
                              @mouseenter="mouseHover('yearE2021')"
                              @mouseleave="mouseLeave()"
                              :id="'yearE2021'"
                            >
                              {{ calculateExpectedSaving("yearE2021") }}
                            </span>
                          </b-td>
                          <b-td>
                            <img
                              v-if="checkCommented('yearE2022')"
                              class="h-75 pl-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="m-0"
                              :class="
                                commentedFeild == 'yearE2022'
                                  ? 'HighlightCell'
                                  : null
                              "
                              @mouseenter="mouseHover('yearE2022')"
                              @mouseleave="mouseLeave()"
                              :id="'yearE2022'"
                            >
                              {{ calculateExpectedSaving("yearE2022") }}
                            </span>
                          </b-td>
                          <b-td>
                            <img
                              v-if="checkCommented('yearE2023')"
                              class="h-75 pl-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="m-0"
                              :class="
                                commentedFeild == 'yearE2023'
                                  ? 'HighlightCell'
                                  : null
                              "
                              @mouseenter="mouseHover('yearE2023')"
                              @mouseleave="mouseLeave()"
                              :id="'yearE2023'"
                            >
                              {{ calculateExpectedSaving("yearE2023") }}
                            </span>
                          </b-td>
                          <b-td>
                            <img
                              v-if="checkCommented('eFutureyears')"
                              class="h-75 pl-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="m-0"
                              :class="
                                commentedFeild == 'eFutureyears'
                                  ? 'HighlightCell'
                                  : null
                              "
                              @mouseenter="mouseHover('eFutureyears')"
                              @mouseleave="mouseLeave()"
                              :id="'eFutureyears'"
                            >
                              {{ calculateExpectedSaving("eFutureyears") }}
                            </span>
                          </b-td>
                          <b-td>
                            <img
                              v-if="checkCommented('AllTotal')"
                              class="h-75 pl-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="m-0"
                              :class="
                                commentedFeild == 'AllTotal'
                                  ? 'HighlightCell'
                                  : null
                              "
                              @mouseenter="mouseHover('AllTotal')"
                              @mouseleave="mouseLeave()"
                              :id="'AllTotal'"
                            >
                              {{ calculateExpectedSavingNew() }}
                            </span>
                          </b-td>
                        </b-tr>
                      </template>
                    </b-table>
                  </div>
                  <div class="position-relative">
                    <p class="font-weight-bold h5 p-3">
                      {{ $t("AchivedSavings") }}
                    </p>
                    <p class="float-left font-weight-bold pl-4">
                      إجمالي الوفر المحقق للفرصة:
                      {{ formatAsCurrency(totalAchivedValue) }} ريال سعودي
                    </p>
                    <b-table
                      id="Achivedtable"
                      class="customTable pr-4 pl-4 pb-4"
                      bordered
                      :responsive="true"
                      :items="yearlySavaData"
                      :fields="achivedSavingsfields"
                    >
                      <template v-slot:cell(clause)="row">{{
                        row.item.clause
                      }}</template>
                      <template v-slot:cell(yearA2019)="row">
                        <img
                          v-if="checkCommented('yearA2019' + `${row.item.id}`)"
                          class="h-75 pl-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <span
                          class="m-0"
                          :class="
                            commentedFeild == 'yearA2019' + `${row.item.id}`
                              ? 'HighlightCell'
                              : null ||
                                (Highlight &&
                                matchYearlySave(row, (name = 'yearA2019')) !=
                                  null
                                  ? 'showHighlightCell'
                                  : null)
                          "
                          :id="'yearA2019' + `${row.item.id}`"
                          @mouseenter="
                            mouseHover('yearA2019' + `${row.item.id}`),
                              lastYearlySave(row, (name = 'yearA2019'))
                          "
                          @mouseleave="mouseLeave()"
                        >
                          {{ row.item.yearA2019 }}
                        </span>
                      </template>
                      <template v-slot:cell(yearA2020)="row">
                        <img
                          v-if="checkCommented('yearA2020' + `${row.item.id}`)"
                          class="h-75 pl-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <span
                          class="m-0"
                          :class="
                            commentedFeild == 'yearA2020' + `${row.item.id}`
                              ? 'HighlightCell'
                              : null ||
                                (Highlight &&
                                matchYearlySave(row, (name = 'yearA2020')) !=
                                  null
                                  ? 'showHighlightCell'
                                  : null)
                          "
                          :id="'yearA2020' + `${row.item.id}`"
                          @mouseenter="
                            mouseHover('yearA2020' + `${row.item.id}`),
                              lastYearlySave(row, (name = 'yearA2020'))
                          "
                          @mouseleave="mouseLeave()"
                        >
                          {{ row.item.yearA2020 }}
                        </span>
                      </template>
                      <template v-slot:cell(yearA2021)="row">
                        <img
                          v-if="checkCommented('yearA2021' + `${row.item.id}`)"
                          class="h-75 pl-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <span
                          class="m-0"
                          :class="
                            commentedFeild == 'yearA2021' + `${row.item.id}`
                              ? 'HighlightCell'
                              : null ||
                                (Highlight &&
                                matchYearlySave(row, (name = 'yearA2021')) !=
                                  null
                                  ? 'showHighlightCell'
                                  : null)
                          "
                          :id="'yearA2021' + `${row.item.id}`"
                          @mouseenter="
                            mouseHover('yearA2021' + `${row.item.id}`),
                              lastYearlySave(row, (name = 'yearA2021'))
                          "
                          @mouseleave="mouseLeave()"
                        >
                          {{ row.item.yearA2021 }}
                        </span>
                      </template>
                      <template v-slot:cell(yearA2022)="row">
                        <img
                          v-if="checkCommented('yearA2022' + `${row.item.id}`)"
                          class="h-75 pl-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <span
                          class="m-0"
                          :class="
                            commentedFeild == 'yearA2022' + `${row.item.id}`
                              ? 'HighlightCell'
                              : null ||
                                (Highlight &&
                                matchYearlySave(row, (name = 'yearA2022')) !=
                                  null
                                  ? 'showHighlightCell'
                                  : null)
                          "
                          :id="'yearA2022' + `${row.item.id}`"
                          @mouseenter="
                            mouseHover('yearA2022' + `${row.item.id}`),
                              lastYearlySave(row, (name = 'yearA2022'))
                          "
                          @mouseleave="mouseLeave()"
                        >
                          {{ row.item.yearA2022 }}
                        </span>
                      </template>
                      <template v-slot:cell(yearA2023)="row">
                        <img
                          v-if="checkCommented('yearA2023' + `${row.item.id}`)"
                          class="h-75 pl-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <span
                          class="m-0"
                          :class="
                            commentedFeild == 'yearA2023' + `${row.item.id}`
                              ? 'HighlightCell'
                              : null ||
                                (Highlight &&
                                matchYearlySave(row, (name = 'yearA2023')) !=
                                  null
                                  ? 'showHighlightCell'
                                  : null)
                          "
                          :id="'yearA2023' + `${row.item.id}`"
                          @mouseenter="
                            mouseHover('yearA2023' + `${row.item.id}`),
                              lastYearlySave(row, (name = 'yearA2023'))
                          "
                          @mouseleave="mouseLeave()"
                        >
                          {{ row.item.yearA2023 }}
                        </span>
                      </template>
                      <template v-slot:cell(aFutureyears)="row">
                        <img
                          v-if="
                            checkCommented('aFutureyears' + `${row.item.id}`)
                          "
                          @click="hideComment()"
                          class="h-75 pl-1"
                          src="/images/icons/chat_bubble.png"
                        />
                        <span
                          class="m-0"
                          :class="
                            commentedFeild == 'aFutureyears' + `${row.item.id}`
                              ? 'HighlightCell'
                              : null ||
                                (Highlight &&
                                matchYearlySave(row, (name = 'aFutureyears')) !=
                                  null
                                  ? 'showHighlightCell'
                                  : null)
                          "
                          :id="'aFutureyears' + `${row.item.id}`"
                          @mouseenter="
                            mouseHover('aFutureyears' + `${row.item.id}`),
                              lastYearlySave(row, (name = 'aFutureyears'))
                          "
                          @mouseleave="mouseLeave()"
                        >
                          {{ row.item.aFutureyears }}
                        </span>
                      </template>
                      <template v-slot:cell(total)="row">
                        <img
                          v-if="checkCommented('ATotal' + `${row.item.id}`)"
                          class="h-75 pl-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <span
                          class="m-0"
                          :class="
                            commentedFeild == 'ATotal' + `${row.item.id}`
                              ? 'HighlightCell'
                              : null ||
                                (Highlight &&
                                matchYearlySave(row, (name = 'ATotal')) != null
                                  ? 'showHighlightCell'
                                  : null)
                          "
                          @mouseenter="
                            mouseHover('ATotal' + `${row.item.id}`),
                              lastYearlySave(row, (name = 'ATotal'))
                          "
                          @mouseleave="mouseLeave()"
                          :id="'ATotal' + `${row.item.id}`"
                        >
                          {{ calculateAchivedTotal(row.item) }}
                        </span>
                      </template>
                      <template v-slot:custom-foot>
                        <!-- You can customize this however you want, this is just as an example -->
                        <b-tr>
                          <b-td class="font-weight-bold">{{
                            $t("Total")
                          }}</b-td>
                          <b-td>
                            <img
                              v-if="checkCommented('yearA2019')"
                              class="h-75 pl-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="m-0"
                              :class="
                                commentedFeild == 'yearA2019'
                                  ? 'HighlightCell'
                                  : null
                              "
                              @mouseenter="mouseHover('yearA2019')"
                              @mouseleave="mouseLeave()"
                              :id="'yearA2019'"
                            >
                              {{ calculateAchivedSaving("yearA2019") }}
                            </span>
                          </b-td>
                          <b-td>
                            <img
                              v-if="checkCommented('yearA2020')"
                              class="h-75 pl-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="m-0"
                              :class="
                                commentedFeild == 'yearA2020'
                                  ? 'HighlightCell'
                                  : null
                              "
                              @mouseenter="mouseHover('yearA2020')"
                              @mouseleave="mouseLeave()"
                              :id="'yearA2020'"
                            >
                              {{ calculateAchivedSaving("yearA2020") }}
                            </span>
                          </b-td>
                          <b-td>
                            <img
                              v-if="checkCommented('yearA2021')"
                              class="h-75 pl-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="m-0"
                              :class="
                                commentedFeild == 'yearA2021'
                                  ? 'HighlightCell'
                                  : null
                              "
                              @mouseenter="mouseHover('yearA2021')"
                              @mouseleave="mouseLeave()"
                              :id="'yearA2011'"
                            >
                              {{ calculateAchivedSaving("yearA2021") }}
                            </span>
                          </b-td>
                          <b-td>
                            <img
                              v-if="checkCommented('yearA2022')"
                              class="h-75 pl-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="m-0"
                              :class="
                                commentedFeild == 'yearA2022'
                                  ? 'HighlightCell'
                                  : null
                              "
                              @mouseenter="mouseHover('yearA2022')"
                              @mouseleave="mouseLeave()"
                              :id="'yearA2022'"
                            >
                              {{ calculateAchivedSaving("yearA2022") }}
                            </span>
                          </b-td>
                          <b-td>
                            <img
                              v-if="checkCommented('yearA2023')"
                              class="h-75 pl-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="m-0"
                              :class="
                                commentedFeild == 'yearA2023'
                                  ? 'HighlightCell'
                                  : null
                              "
                              @mouseenter="mouseHover('yearA2023')"
                              @mouseleave="mouseLeave()"
                              :id="'yearA2023'"
                            >
                              {{ calculateAchivedSaving("yearA2023") }}
                            </span>
                          </b-td>
                          <b-td>
                            <img
                              v-if="checkCommented('aFutureyears')"
                              class="h-75 pl-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="m-0"
                              :class="
                                commentedFeild == 'aFutureyears'
                                  ? 'HighlightCell'
                                  : null
                              "
                              @mouseenter="mouseHover('aFutureyears')"
                              @mouseleave="mouseLeave()"
                              :id="'aFutureyears'"
                            >
                              {{ calculateAchivedSaving("aFutureyears") }}
                            </span>
                          </b-td>
                          <b-td>
                            <img
                              v-if="checkCommented('aAllTotal')"
                              class="h-75 pl-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="m-0"
                              :class="
                                commentedFeild == 'aAllTotal'
                                  ? 'HighlightCell'
                                  : null
                              "
                              @mouseenter="mouseHover('aAllTotal')"
                              @mouseleave="mouseLeave()"
                              :id="'aAllTotal'"
                            >
                              {{ calculateASavingNew() }}
                            </span>
                          </b-td>
                        </b-tr>
                      </template>
                    </b-table>
                  </div>
                </md-card>

                <!-- Calculations Of Savings -->
                <md-card class="pr-4 pt-4 pl-3 mb-5 custom-card">
                  <b-row class="d-flex justify-content-between pl-4 pr-4">
                    <h3 class="font-weight-bold d-inline-block text-color">
                      {{ $t("calculationofsavings") }}
                    </h3>
                    <md-button
                      v-if="currentRole === currentOwner"
                      @click="step = 3"
                      class="edit-button align-baseline m-1 font-weight-bold text-capitalize"
                    >
                      {{ $t("edit") }}
                      <img class="edit-icon" src="/images/svg/Edit.svg" />
                    </md-button>
                  </b-row>
                  <md-card-content>
                    <b-row class="mb-3">
                      <b-col md="12">
                        <span
                          @mouseenter="mouseHover('calOfSaving')"
                          @mouseleave="mouseLeave()"
                          class="font-weight-bolder review-label label-font"
                          >{{ $t("calculationofsavings") }}</span
                        >
                        <img
                          v-if="checkCommented('calOfSaving')"
                          class="chat-bubble pr-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <p class="md-subheading font-weight-bold fit-content">
                          {{ calculationSaving.calOfSaving }}
                        </p>
                      </b-col>
                    </b-row>
                    <b-row class="mb-3">
                      <b-col md="12">
                        <span class="font-weight-bolder review-label label-font"
                          >المرفق</span
                        >
                      </b-col>
                    </b-row>

                    <b-row
                      v-if="calculationSaving.uploadCalcOfSavings.length != 0"
                    >
                      <b-col md="12" class="pr-2">
                        <b-table
                          class="customTable pr-4 pl-4"
                          bordered
                          :responsive="true"
                          :items="calculationSaving.uploadCalcOfSavings"
                          :fields="generalCommentFileUrlFieldsNotDelete"
                        >
                          <template v-slot:cell(sr)="row">{{
                            row.index + 1
                          }}</template>
                          <template v-slot:cell(fileName)="row">
                            <div v-if="row.item.path">
                              {{ row.item.path | trimImageName }}
                            </div>
                            <div v-if="!row.item.path">
                              {{ row.item.name }}
                            </div>
                          </template>

                          <template v-slot:cell(type)="images">
                            <a
                              v-if="images.item.link"
                              :href="images.item.link"
                              target="_blank"
                              style="position: relative"
                            >
                              <md-avatar
                                class="md-avatar-icon"
                                v-if="images.item.type === 'pdf'"
                              >
                                <img
                                  class
                                  src="/images/icons/pdf.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <md-avatar
                                class
                                v-else-if="images.item.type === 'msword'"
                              >
                                <img
                                  src="/images/icons/word.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <md-avatar
                                class
                                v-else-if="images.item.type === 'docs'"
                              >
                                <img
                                  src="/images/icons/word.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <md-avatar
                                class
                                v-else-if="images.item.type === 'xlm'"
                              >
                                <img
                                  src="/images/icons/excel.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <md-avatar class v-else>
                                <img
                                  src="/images/icons/generic-attachment.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <!-- <p class="font-weight-bold">{{ images.name }}</p> -->
                            </a>
                            <a
                              v-if="images.item.path"
                              :href="'http://3.124.65.120' + images.item.path"
                              target="_blank"
                              style="position: relative"
                            >
                              <md-avatar
                                class
                                v-if="
                                  trimImage(images.item.path) === 'pdf'
                                    ? true
                                    : false
                                "
                              >
                                <img src="/images/icons/pdf.png" alt="Avatar" />
                              </md-avatar>
                              <md-avatar
                                class
                                v-else-if="
                                  trimImage(images.item.path) === 'msword'
                                    ? true
                                    : false
                                "
                              >
                                <img
                                  src="/images/icons/word.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <md-avatar
                                class
                                v-else-if="
                                  trimImage(images.item.path) === 'docs'
                                    ? true
                                    : false
                                "
                              >
                                <img
                                  src="/images/icons/word.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <md-avatar
                                class
                                v-else-if="
                                  trimImage(images.item.path) === 'xlm'
                                    ? true
                                    : false
                                "
                              >
                                <img
                                  src="/images/icons/excel.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <md-avatar class v-else>
                                <img
                                  src="/images/icons/generic-attachment.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <!-- <p class="mb-2 font-weight-bold">
                              {{ images.path | trimImageName }}
                            </p> -->
                            </a>
                          </template>
                        </b-table>
                      </b-col>
                    </b-row>
                    <!-- 
                    <b-row>
                      <b-col md="12" class="p-0">
                        <div
                          v-for="(images,
                          index) in calculationSaving.uploadCalcOfSavings"
                          :key="index"
                          class="pl-3 d-inline-block"
                        >
                          <a
                            :href="'http://3.124.65.120' + images.path"
                            target="_blank"
                          >
                            <md-avatar
                              v-if="
                                trimImage(images.path) === 'pdf' ? true : false
                              "
                            >
                              <img src="/images/icons/pdf.png" alt="Avatar" />
                            </md-avatar>
                            <md-avatar
                              v-else-if="
                                trimImage(images.path) === 'msword'
                                  ? true
                                  : false
                              "
                            >
                              <img src="/images/icons/word.png" alt="Avatar" />
                            </md-avatar>
                            <md-avatar
                              v-else-if="
                                trimImage(images.path) === 'docs' ? true : false
                              "
                            >
                              <img src="/images/icons/word.png" alt="Avatar" />
                            </md-avatar>
                            <md-avatar
                              v-else-if="
                                trimImage(images.path) === 'xlm' ? true : false
                              "
                            >
                              <img src="/images/icons/excel.png" alt="Avatar" />
                            </md-avatar>
                            <md-avatar v-else>
                              <img
                                src="/images/icons/generic-attachment.png"
                                alt="Avatar"
                              />
                            </md-avatar>
                            <p class="mb-2 font-weight-bold">
                              {{ images.path | trimImageName }}
                            </p>
                          </a>
                        </div>
                      </b-col>
                    </b-row> -->
                  </md-card-content>
                </md-card>

                <!-- implementation Plan -->
                <md-card
                  class="custom-card mb-5 scrollspy"
                  :id="$t('implementationsplan')"
                >
                  <b-row class="d-flex justify-content-between pl-5  pr-5 pt-4">
                    <h3 class="font-weight-bold d-inline-block text-color">
                      {{ $t("implementationsplan") }}
                    </h3>
                    <md-button
                      v-if="currentRole === currentOwner"
                      @click="step = 3"
                      class="edit-button align-baseline m-1 font-weight-bold text-capitalize"
                    >
                      {{ $t("edit") }}
                      <img class="edit-icon" src="/images/svg/Edit.svg" />
                    </md-button>
                  </b-row>
                  <b-table
                    class="mt-4 pl-4 pr-4 pb-4"
                    :bordered="true"
                    :responsive="true"
                    :items="mileStones"
                    :fields="ImplementationPlanFields"
                  >
                    <template v-slot:cell(name)="row">
                      <img
                        v-if="checkCommented('name' + `${row.item.id}`)"
                        class="chat-bubble pr-1"
                        @click="hideComment()"
                        src="/images/icons/chat_bubble.png"
                      />
                      <span
                        class="m-0"
                        :class="
                          commentedFeild == 'name' + `${row.item.id}`
                            ? 'HighlightCell'
                            : null ||
                              (Highlight &&
                              matchMileStone(row, (name = 'name')) != null
                                ? 'showHighlightCell'
                                : null)
                        "
                        @mouseenter="
                          mouseHover('name' + `${row.item.id}`),
                            lastMileStone(row, (name = 'name'))
                        "
                        @mouseleave="mouseLeave()"
                        :id="'name' + `${row.item.id}`"
                      >
                        {{ row.item.name }}
                      </span>
                    </template>
                    <template v-slot:cell(targetSDate)="row">
                      <img
                        v-if="checkCommented('targetSDate' + `${row.item.id}`)"
                        class="chat-bubble pr-1"
                        @click="hideComment()"
                        src="/images/icons/chat_bubble.png"
                      />
                      <span
                        class="m-0"
                        :class="
                          commentedFeild == 'targetSDate' + `${row.item.id}`
                            ? 'HighlightCell'
                            : null ||
                              (Highlight &&
                              matchMileStone(row, (name = 'targetSDate')) !=
                                null
                                ? 'showHighlightCell'
                                : null)
                        "
                        @mouseenter="
                          mouseHover('targetSDate' + `${row.item.id}`),
                            lastMileStone(row, (name = 'targetSDate'))
                        "
                        @mouseleave="mouseLeave()"
                        :id="'targetSDate' + `${row.item.id}`"
                      >
                        {{
                          row.item.targetSDate == "0001-01-01" ||
                          row.item.targetSDate == null
                            ? "N/A"
                            : formatDateMilestone(row.item.targetSDate)
                        }}
                      </span>
                    </template>
                    <template v-slot:cell(targetEDate)="row">
                      <img
                        v-if="checkCommented('targetEDate' + `${row.item.id}`)"
                        class="chat-bubble pr-1"
                        @click="hideComment()"
                        src="/images/icons/chat_bubble.png"
                      />
                      <span
                        class="m-0"
                        :class="
                          commentedFeild == 'targetEDate' + `${row.item.id}`
                            ? 'HighlightCell'
                            : null ||
                              (Highlight &&
                              matchMileStone(row, (name = 'targetEDate')) !=
                                null
                                ? 'showHighlightCell'
                                : null)
                        "
                        @mouseenter="
                          mouseHover('targetEDate' + `${row.item.id}`),
                            lastMileStone(row, (name = 'targetEDate'))
                        "
                        @mouseleave="mouseLeave()"
                        :id="'targetEDate' + `${row.item.id}`"
                      >
                        {{
                          row.item.targetEDate == "0001-01-01" ||
                          row.item.targetEDate == null
                            ? "N/A"
                            : formatDateMilestone(row.item.targetEDate)
                        }}
                      </span>
                    </template>
                    <template v-slot:cell(actualSDate)="row">
                      <img
                        v-if="checkCommented('actualSDate' + `${row.item.id}`)"
                        class="chat-bubble pr-1"
                        @click="hideComment()"
                        src="/images/icons/chat_bubble.png"
                      />
                      <span
                        class="m-0"
                        :class="
                          commentedFeild == 'actualSDate' + `${row.item.id}`
                            ? 'HighlightCell'
                            : null ||
                              (Highlight &&
                              matchMileStone(row, (name = 'actualSDate')) !=
                                null
                                ? 'showHighlightCell'
                                : null)
                        "
                        @mouseenter="
                          mouseHover('actualSDate' + `${row.item.id}`),
                            lastMileStone(row, (name = 'actualSDate'))
                        "
                        @mouseleave="mouseLeave()"
                        :id="'actualSDate' + `${row.item.id}`"
                      >
                        {{
                          row.item.actualSDate == "0001-01-01" ||
                          row.item.actualSDate == null
                            ? "N/A"
                            : formatDateMilestone(row.item.actualSDate)
                        }}
                      </span>
                    </template>
                    <template v-slot:cell(actualEDate)="row">
                      <img
                        v-if="checkCommented('actualEDate' + `${row.item.id}`)"
                        class="chat-bubble pr-1"
                        @click="hideComment()"
                        src="/images/icons/chat_bubble.png"
                      />
                      <span
                        class="m-0"
                        :class="
                          commentedFeild == 'actualEDate' + `${row.item.id}`
                            ? 'HighlightCell'
                            : null ||
                              (Highlight &&
                              matchMileStone(row, (name = 'actualEDate')) !=
                                null
                                ? 'showHighlightCell'
                                : null)
                        "
                        @mouseenter="
                          mouseHover('actualEDate' + `${row.item.id}`),
                            lastMileStone(row, (name = 'actualEDate'))
                        "
                        @mouseleave="mouseLeave()"
                        :id="'actualEDate' + `${row.item.id}`"
                      >
                        {{
                          row.item.actualEDate == "0001-01-01" ||
                          row.item.actualEDate == null
                            ? "N/A"
                            : formatDateMilestone(row.item.actualEDate)
                        }}
                      </span>
                    </template>
                    <template v-slot:cell(milstoneStatus)="row">
                      <div :id="'milstoneStatus' + `${row.item.id}`">
                        <div
                          v-if="row.item.milstoneStatus === 'notstarted'"
                          class="grey mx-auto"
                        ></div>
                        <div
                          v-if="row.item.milstoneStatus === 'inprogress'"
                          class="green mx-auto"
                        ></div>
                        <div
                          v-if="row.item.milstoneStatus === 'completed'"
                          class="green mx-auto"
                        ></div>
                        <div
                          v-if="row.item.milstoneStatus === 'yellow'"
                          class="yellow mx-auto"
                        ></div>
                        <div
                          v-if="row.item.milstoneStatus == 'red'"
                          class="red mx-auto"
                        ></div>
                      </div>
                    </template>
                  </b-table>
                  <div class="pr-4 mb-4">
                    <b-row class="mb-3">
                      <b-col md="12">
                        <span
                          @mouseenter="mouseHover('summeryThisMonth')"
                          @mouseleave="mouseLeave()"
                          class="font-weight-bolder label-font pl-1 review-label pr-1 padding-right"
                          :class="
                            commentedFeild == 'summeryThisMonth'
                              ? 'Highlightborderd'
                              : null ||
                                (Highlight &&
                                summaryOfInitiativeForm.summeryThisMonth !==
                                  oldsummaryOfInitiativeForm.summeryThisMonth
                                  ? 'showHighlight'
                                  : null)
                          "
                          id="summeryThisMonth"
                          >{{
                            $t(
                              "SummaryOfWhatHasBeenAchievedThisMonth(Optional)"
                            )
                          }}</span
                        >
                        <img
                          v-if="checkCommented('summeryThisMonth')"
                          class="chat-bubble pr-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <div
                          class="md-subheading  font-weight-bold fit-content pl-4"
                        >
                          {{ summaryOfInitiativeForm.summeryThisMonth }}
                        </div>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <span
                          @mouseenter="mouseHover('planNextMonth')"
                          @mouseleave="mouseLeave()"
                          class="font-weight-bolder label-font pl-1 review-label pr-1 padding-right"
                          :class="
                            commentedFeild == 'planNextMonth'
                              ? 'Highlightborderd'
                              : null ||
                                (Highlight &&
                                summaryOfInitiativeForm.planNextMonth !==
                                  oldsummaryOfInitiativeForm.planNextMonth
                                  ? 'showHighlight'
                                  : null)
                          "
                          id="planNextMonth"
                          >{{
                            $t(
                              "SummaryOfAchievementsplannedforNextMonth(Optional)"
                            )
                          }}</span
                        >
                        <img
                          v-if="checkCommented('planNextMonth')"
                          class="chat-bubble pr-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <div
                          class="md-subheading  font-weight-bold fit-content pl-4"
                        >
                          {{ summaryOfInitiativeForm.planNextMonth }}
                        </div>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12" class="mt-2">
                        <span
                          @mouseenter="mouseHover('generalComment')"
                          @mouseleave="mouseLeave()"
                          class="font-weight-bolder label-font pl-1 review-label pr-1 padding-right"
                          :class="
                            commentedFeild == 'generalComment'
                              ? 'Highlightborderd'
                              : null ||
                                (Highlight &&
                                summaryOfInitiativeForm.generalComment !==
                                  oldsummaryOfInitiativeForm.generalComment
                                  ? 'showHighlight'
                                  : null)
                          "
                          id="generalComment"
                          >{{ $t("GeneralComment(Optional)") }}</span
                        >
                        <img
                          v-if="checkCommented('generalComment')"
                          class="chat-bubble pr-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <div
                          class="md-subheading  font-weight-bold fit-content pl-4"
                        >
                          {{ summaryOfInitiativeForm.generalComment }}
                        </div>
                      </b-col>
                    </b-row>
                  </div>
                </md-card>
                <!-- <md-card
                  class="p-4 mb-5 custom-card"
                  style="margin-bottom: 80px !important"
                >
                  <md-card-content>
                    <b-row class="d-flex justify-content-between w-100">
                      <h3 class="font-weight-bold pr-2 text-color">
                        {{ $t("implementationsplan") }}
                      </h3>
                      <md-button
                        v-if="currentRole === currentOwner"
                        @click="step = 4"
                        class="edit-button align-baseline m-1 font-weight-bold text-capitalize"
                      >
                        {{ $t("edit") }}
                        <img class="edit-icon" src="/images/svg/Edit.svg" />
                      </md-button>
                    </b-row>
                    <md-table v-model="mileStones" class="custom-table">
                      <md-table-row
                        class="pr-4 pl-4"
                        slot="md-table-row"
                        slot-scope="{ item }"
                      >
                        <md-table-cell
                          md-label="#"
                          md-sort-by="id"
                          md-numeric
                          >{{ item.serialNo }}</md-table-cell
                        >
                        <md-table-cell
                          :md-label="$t('nameOfMentor')"
                          md-sort-by="id"
                          md-numeric
                          >{{ item.name }}</md-table-cell
                        >
                        <md-table-cell
                          :md-label="$t('intendedStartDate')"
                          md-sort-by="name"
                          >{{
                            formatDateMilestone(item.targetSDate)
                          }}</md-table-cell
                        >
                        <md-table-cell :md-label="$t('intendedEndDate')">{{
                          formatDateMilestone(item.targetEDate)
                        }}</md-table-cell>
                        <md-table-cell :md-label="$t('status')">
                          <div>
                            <div
                              v-if="item.milstoneStatus === 'notstarted'"
                              class="grey"
                            ></div>
                            <div
                              v-if="item.milstoneStatus === 'inprogress'"
                              class="green"
                            ></div>
                            <div
                              v-if="item.milstoneStatus === 'completed'"
                              class="green"
                            ></div>
                            <div
                              v-if="item.milstoneStatus === 'yellow'"
                              class="yellow"
                            ></div>
                            <div
                              v-if="item.milstoneStatus == 'red'"
                              class="red"
                            ></div></div
                        ></md-table-cell>
                      </md-table-row>
                    </md-table>
                    <div class="pr-1">
                      <b-row class="mb-3">
                        <b-col md="12">
                          <span
                            class="font-weight-bolder review-label label-font"
                            >{{
                              $t(
                                "SummaryOfWhatHasBeenAchievedThisMonth(Optional)"
                              )
                            }}</span
                          >
                          <p class="md-subheading font-weight-bold">
                            {{ summaryOfInitiativeForm.summeryThisMonth }}
                          </p>
                        </b-col>
                      </b-row>
                      <b-row class="mb-3">
                        <b-col md="12">
                          <span
                            class="font-weight-bolder review-label label-font"
                            >{{
                              $t(
                                "SummaryOfAchievementsplannedforNextMonth(Optional)"
                              )
                            }}</span
                          >
                          <p class="md-subheading font-weight-bold">
                            {{ summaryOfInitiativeForm.planNextMonth }}
                          </p>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col md="12">
                          <span
                            class="font-weight-bolder review-label label-font"
                            >{{ $t("GeneralComment(Optional)") }}</span
                          >
                          <p class="md-subheading font-weight-bold">
                            {{ summaryOfInitiativeForm.generalComment }}
                          </p>
                        </b-col>
                      </b-row>
                    </div>
                  </md-card-content>
                </md-card> -->

                <!-- Support Required -->
                <md-card
                  class="p-4 mb-5 custom-card"
                  style="margin-bottom: 80px !important"
                >
                  <b-row class="d-flex justify-content-between pl-4 pr-4">
                    <h3 class="font-weight-bold text-color">
                      {{ $t("supportRequired") }}
                    </h3>
                    <md-button
                      v-if="currentRole === currentOwner"
                      @click="step = 5"
                      class="edit-button align-baseline m-1 font-weight-bold text-capitalize"
                    >
                      {{ $t("edit") }}
                      <img class="edit-icon" src="/images/svg/Edit.svg" />
                    </md-button>
                  </b-row>
                  <md-card-content>
                    <b-row>
                      <b-col md="12">
                        <span
                          @mouseenter="mouseHover('supportType')"
                          @mouseleave="mouseLeave()"
                          class="font-weight-bolder review-label label-font"
                          >{{ $t("supportType") }}</span
                        >
                        <img
                          v-if="checkCommented('supportType')"
                          class="chat-bubble pr-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <div class="md-subheading font-weight-bold fit-content">
                          {{ support.supportType }}
                        </div>
                      </b-col>
                    </b-row>
                    <b-row class="mb-3">
                      <b-col md="12">
                        <span
                          @mouseenter="mouseHover('SupportDescription')"
                          @mouseleave="mouseLeave()"
                          class="font-weight-bolder review-label label-font"
                          >{{ $t("SupportDescription") }}</span
                        >
                        <img
                          v-if="checkCommented('SupportDescription')"
                          class="chat-bubble pr-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <div class="md-subheading font-weight-bold fit-content">
                          {{ support.description }}
                        </div>
                      </b-col>
                    </b-row>
                  </md-card-content>
                </md-card>

                <!-- General Comment -->
                <md-card
                  class="p-4 mb-3 custom-card"
                  style="margin-bottom: 80px !important"
                >
                  <b-row class="d-flex justify-content-between pl-4 pr-4">
                    <h3 class="font-weight-bold text-color">
                      {{ $t("GeneralComment") }}
                    </h3>
                    <md-button
                      v-if="currentRole === currentOwner"
                      @click="step = 6"
                      class="edit-button align-baseline m-1 font-weight-bold text-capitalize"
                    >
                      {{ $t("edit") }}
                      <img class="edit-icon" src="/images/svg/Edit.svg" />
                    </md-button>
                  </b-row>
                  <md-card-content>
                    <b-row class="mb-3">
                      <b-col md="12">
                        <span
                          @mouseenter="mouseHover('generalCommentdescription')"
                          @mouseleave="mouseLeave()"
                          class="font-weight-bolder review-label label-font"
                          >{{ $t("description") }}</span
                        >
                        <img
                          v-if="checkCommented('generalCommentdescription')"
                          class="chat-bubble pr-1"
                          @click="hideComment()"
                          src="/images/icons/chat_bubble.png"
                        />
                        <p class="md-subheading font-weight-bold fit-content">
                          {{ generalComment.description }}
                        </p>
                      </b-col>
                    </b-row>
                    <b-row
                      v-if="generalComment.uploadMinutesOfMeeting.length != 0"
                    >
                      <b-col md="12" class="pr-2">
                        <b-table
                          class="customTable pr-4 pl-4"
                          bordered
                          :responsive="true"
                          :items="generalComment.uploadMinutesOfMeeting"
                          :fields="generalCommentFileUrlFieldsNotDelete"
                        >
                          <template v-slot:cell(sr)="row">{{
                            row.index + 1
                          }}</template>
                          <template v-slot:cell(fileName)="row">
                            <div v-if="row.item.path">
                              {{ row.item.path | trimImageName }}
                            </div>
                            <div v-if="!row.item.path">
                              {{ row.item.name }}
                            </div>
                          </template>
                          <template v-slot:cell(type)="images">
                            <a
                              v-if="images.item.link"
                              :href="images.item.link"
                              target="_blank"
                              style="position: relative"
                            >
                              <md-avatar
                                class="md-avatar-icon"
                                v-if="images.item.type === 'pdf'"
                              >
                                <img
                                  class
                                  src="/images/icons/pdf.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <md-avatar
                                class
                                v-else-if="images.item.type === 'msword'"
                              >
                                <img
                                  src="/images/icons/word.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <md-avatar
                                class
                                v-else-if="images.item.type === 'docs'"
                              >
                                <img
                                  src="/images/icons/word.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <md-avatar
                                class
                                v-else-if="images.item.type === 'xlm'"
                              >
                                <img
                                  src="/images/icons/excel.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <md-avatar class v-else>
                                <img
                                  src="/images/icons/generic-attachment.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <!-- <p class="font-weight-bold">{{ images.name }}</p> -->
                            </a>
                            <a
                              v-if="images.item.path"
                              :href="'http://3.124.65.120' + images.item.path"
                              target="_blank"
                              style="position: relative"
                            >
                              <md-avatar
                                class
                                v-if="
                                  trimImage(images.item.path) === 'pdf'
                                    ? true
                                    : false
                                "
                              >
                                <img src="/images/icons/pdf.png" alt="Avatar" />
                              </md-avatar>
                              <md-avatar
                                class
                                v-else-if="
                                  trimImage(images.item.path) === 'msword'
                                    ? true
                                    : false
                                "
                              >
                                <img
                                  src="/images/icons/word.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <md-avatar
                                class
                                v-else-if="
                                  trimImage(images.item.path) === 'docs'
                                    ? true
                                    : false
                                "
                              >
                                <img
                                  src="/images/icons/word.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <md-avatar
                                class
                                v-else-if="
                                  trimImage(images.item.path) === 'xlm'
                                    ? true
                                    : false
                                "
                              >
                                <img
                                  src="/images/icons/excel.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <md-avatar class v-else>
                                <img
                                  src="/images/icons/generic-attachment.png"
                                  alt="Avatar"
                                />
                              </md-avatar>
                              <!-- <p class="mb-2 font-weight-bold">
                              {{ images.path | trimImageName }}
                            </p> -->
                            </a>
                          </template>
                        </b-table>
                      </b-col>
                    </b-row>

                    <!-- <b-row
                      v-if="generalComment.uploadMinutesOfMeeting.length > 0"
                    >
                      <b-col md="12" class="pr-2">
                        <div
                          v-for="(images,
                          index) in generalComment.uploadMinutesOfMeeting"
                          :key="index"
                          class="pr-3"
                        >
                          <a
                            :href="'http://3.124.65.120' + images.path"
                            target="_blank"
                          >
                            <md-avatar
                              class
                              v-if="
                                trimImage(images.path) === 'pdf' ? true : false
                              "
                            >
                              <img src="/images/icons/pdf.png" alt="Avatar" />
                            </md-avatar>
                            <md-avatar
                              class
                              v-else-if="
                                trimImage(images.path) === 'msword'
                                  ? true
                                  : false
                              "
                            >
                              <img src="/images/icons/word.png" alt="Avatar" />
                            </md-avatar>
                            <md-avatar
                              class
                              v-else-if="
                                trimImage(images.path) === 'docs' ? true : false
                              "
                            >
                              <img src="/images/icons/word.png" alt="Avatar" />
                            </md-avatar>
                            <md-avatar
                              class
                              v-else-if="
                                trimImage(images.path) === 'xlm' ? true : false
                              "
                            >
                              <img src="/images/icons/excel.png" alt="Avatar" />
                            </md-avatar>
                            <md-avatar class v-else>
                              <img
                                src="/images/icons/generic-attachment.png"
                                alt="Avatar"
                              />
                            </md-avatar>
                            <p class="mb-2 font-weight-bold">
                              {{ images.path | trimImageName }}
                            </p>
                          </a>
                        </div>
                      </b-col>
                    </b-row> -->
                  </md-card-content>
                </md-card>

                <!-- Summary Of Implementation Plan -->
                <div class="float-left">
                  <button
                    style="width: 174px"
                    class="btn md-primary  main-btn comman-gradient border-radius font-weight-bold"
                    @click="$router.go(-1)"
                  >
                    حفظ ورجوع
                  </button>
                </div>
              </div>

              <!-- Gfs code Dialog -->
              <md-dialog :md-active.sync="isSelectGFSDialog">
                <md-dialog-title></md-dialog-title>
                <div class="px-5">
                  <h4 style="font-weight: 600">
                    (GFS) مكتبة بنود إحصاءات مالية الحكومة
                  </h4>
                  <b-row>
                    <b-col
                      >تنويه: البيانات المتوفرة في مكتبة البنود تخص بنود إحصاءات
                      مالية الحكومة (GFS) فقط ولا تحتوي على بيانات المشاريع
                      والبرامج</b-col
                    >
                  </b-row>
                  <b-row align-v="center" class="mt-4" style="width: 100%">
                    <b-col md="4">
                      <md-field>
                        <label for="type">رمز البند (GFS) / اسم البند</label>
                        <md-input
                          name="gfsCode"
                          @keyup="onGFSEmpty(gfsCode)"
                          autocomplete="given-name"
                          v-model="gfsCode"
                        />
                      </md-field>
                    </b-col>
                  </b-row>
                  <button
                    class="btn md-primary main-btn border-radius-5 view"
                    @click="onGFSFilter(gfsCode)"
                  >
                    البحث باسم او رقم البند
                  </button>
                  <div style="overflow: auto; height: 380px">
                    <b-table
                      class="mt-4"
                      striped
                      hover
                      :items="gfsModalItems"
                      :fields="gfsModalFields"
                    >
                      <template v-slot:cell(action)="data">
                        <b class="text-info">
                          <button
                            class="btn md-primary main-btn border-radius-5 view"
                            @click="onSelectGFSModal(data.item)"
                          >
                            إضافة البند الى قائمة البنود المستهدفة
                          </button>
                        </b>
                      </template>
                    </b-table>
                    <div class="pagination-div mt-4 mx-5">
                      <b-pagination
                        class="d-inline-flex"
                        v-model="currentPage"
                        :total-rows="totalCountGFS"
                        :per-page="perPage"
                        aria-controls="my-table"
                      ></b-pagination>
                    </div>
                  </div>
                </div>
                <md-dialog-actions></md-dialog-actions>
              </md-dialog>
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>

    <b-row v-else style="position: relative">
      <b-col md="12" class="pl-0">
        <div
          class="d-inline-block main-approver"
          :class="openLogs ? '' : 'main-approver-width'"
        >
          <div>
            <b-row align-h="between" class="pt-2 pb-2">
              <b-col md="6"> </b-col>
              <b-col md="6" class="text-left">
                <span class="h5 pl-5"> تم التسليم من</span>
                <span class="h5">
                  <!-- submitted by -->
                  <strong class="pr-2 pl-3 font-weight-bold h5">
                    {{ generalForm.owner }}</strong
                  >
                </span>
              </b-col>
            </b-row>
            <b-row align-h="between">
              <b-col md="6">
                <img
                  class="cursor"
                  @click="$router.go(-1)"
                  src="/images/icons/back.png"
                />
                <span class="h5 font-weight-bold pr-3">
                  <!-- review Opportunity -->
                  <strong>مراجعة الفرصة ({{ generalForm.name }})</strong>
                </span>
              </b-col>
              <b-col md="6" class="text-left">
                <span class="h5 pl-4"> اخر تحديث</span>
                <span class="h5">
                  <!-- last updated -->
                  <strong class="float-left font-weight-bold h5 pl-3 pr-2">{{
                    reporstSubmission
                  }}</strong>
                </span>
              </b-col>
            </b-row>
            <hr />
          </div>
          <b-row>
            <b-col md="10" class="mr-auto pr-0">
              <md-checkbox
                v-show="checked"
                class="md-primary font-weight-bold md-subheading"
                v-model="Highlight"
              >
                <strong class="pr-2 text-secondary"
                  >تحديد ما تمّ تعديله فقط</strong
                >
              </md-checkbox>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-row>
                <b-col md="2" sm="12">
                  <div
                    id="tabsInfo"
                    class="tabs-approver text-capitalize font-weight-bolder links"
                    :class="
                      currentTab == $t(`${tabs.name}`)
                        ? 'active-tab-approver'
                        : ''
                    "
                    v-for="(tabs, index) in tabsInfo"
                    :key="index"
                    @click="activetabScroll(tabs, $event)"
                  >
                    <!----- Tabs Name ----->
                    <a
                      :href="'#' + $t(`${tabs.name}`)"
                      class="font-weight-bold"
                      :class="
                        step == index + 1 || currentTab == $t(`${tabs.name}`)
                          ? 'exact-tab-text'
                          : 'tab-text-gray'
                      "
                      >{{
                        $t(
                          `${tabs.name}` === $t("reviewopportunity")
                            ? ""
                            : `${tabs.name}`
                        )
                      }}</a
                    >
                  </div>
                </b-col>
                <b-col md="10" sm="12">
                  <div class="scroll" @scroll="onActivate()">
                    <!-- review Opportunity -->

                    <!-- Section General information -->
                    <md-card
                      :id="$t('generalinformation')"
                      class="p-4 mb-5 scrollspy custom-card"
                    >
                      <md-card-header>
                        <h3 class="font-weight-bold d-inline-block text-color">
                          {{ $t("generalinformation") }}
                        </h3>
                      </md-card-header>
                      <md-card-content>
                        <b-row>
                          <b-col md="12" class="mb-3 pr-3">
                            <b-tooltip
                              id="generalinformation"
                              target="name"
                              placement="left"
                            >
                              <p class="p-0 m-0">إضافة ملاحظة</p>
                              <span>{{
                                oldGeneralForm.name !== generalForm.name
                                  ? oldGeneralForm.name
                                  : null
                              }}</span>
                              <hr class="border-white m-2 p-0" />
                              <img
                                @click="
                                  openCommentsec(
                                    (payload = {
                                      name: 'generalinformation',
                                      section: 'name',
                                    })
                                  )
                                "
                                src="/images/icons/comment.png"
                              />
                            </b-tooltip>
                            <span
                              @mouseenter="mouseHover('generalinformation')"
                              @mouseleave="mouseLeave()"
                              class="font-weight-bolder label-font pl-1 review-label pr-1 padding-right"
                              :class="
                                (commentedFeild == 'generalinformation'
                                  ? 'Highlightborderd'
                                  : null) ||
                                  (Highlight &&
                                  generalForm.name !== oldGeneralForm.name
                                    ? 'showHighlight'
                                    : null)
                              "
                              id="name"
                              >{{ $t("oppertunityname") }}</span
                            >
                            <img
                              v-if="checkCommented('generalinformation')"
                              class="chat-bubble pr-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <p class="font-weight-bold md-subheading p-1">
                              {{ generalForm.name }}
                            </p>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col md="12" class="mb-3">
                            <b-tooltip
                              id="owner"
                              target="owner"
                              placement="left"
                            >
                              <p class="p-0 m-0">إضافة ملاحظة</p>
                              <span>{{
                                oldGeneralForm.owner !== generalForm.owner
                                  ? oldGeneralForm.owner
                                  : null
                              }}</span>
                              <hr class="border-white m-2 p-0" />
                              <img
                                @click="
                                  openCommentsec(
                                    (payload = {
                                      name: 'owner',
                                      section: 'owner',
                                    })
                                  )
                                "
                                src="/images/icons/comment.png"
                              />
                            </b-tooltip>
                            <span
                              @mouseenter="mouseHover('owner')"
                              @mouseleave="mouseLeave()"
                              class="font-weight-bolder review-label label-font pr-1 pl-1"
                              :class="
                                (commentedFeild == 'owner'
                                  ? 'Highlightborderd'
                                  : null) ||
                                  (Highlight &&
                                  generalForm.owner !== oldGeneralForm.owner
                                    ? 'showHighlight'
                                    : null)
                              "
                              id="owner"
                              >{{ $t("owner") }}</span
                            >
                            <img
                              v-if="checkCommented('owner')"
                              class="chat-bubble pr-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <p class="md-subheading font-weight-bold pr-1 pl-1">
                              {{ generalForm.owner }}
                            </p>
                          </b-col>
                        </b-row>
                        <b-row class="mb-3">
                          <b-col md="12">
                            <b-tooltip
                              id="Description"
                              target="Description"
                              placement="left"
                            >
                              <p class="p-0 m-0">إضافة ملاحظة</p>
                              <span>{{
                                oldGeneralForm.description !==
                                generalForm.description
                                  ? oldGeneralForm.description
                                  : null
                              }}</span>
                              <hr class="border-white m-2 p-0" />
                              <img
                                @click="
                                  openCommentsec(
                                    (payload = {
                                      name: 'Description',
                                      section: 'description',
                                    })
                                  )
                                "
                                src="/images/icons/comment.png"
                              />
                            </b-tooltip>
                            <span
                              @mouseenter="mouseHover('Description')"
                              @mouseleave="mouseLeave()"
                              :class="
                                commentedFeild == 'Description'
                                  ? 'Highlightborderd'
                                  : null ||
                                    (Highlight &&
                                    generalForm.description !==
                                      oldGeneralForm.description
                                      ? 'showHighlight'
                                      : null)
                              "
                              class="font-weight-bolder pl-1 pr-1 review-label label-font"
                              id="Description"
                              >{{ $t("initiativeDescription") }}</span
                            >
                            <img
                              v-if="checkCommented('Description')"
                              class="chat-bubble pr-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <p
                              class="md-subheading font-weight-bold pl-1 pr-1 fit-content"
                            >
                              {{ generalForm.description }}
                            </p>
                          </b-col>
                        </b-row>
                        <b-row class="mb-3">
                          <b-col md="12">
                            <b-tooltip
                              id="expSaveValue"
                              target="expSaveValue"
                              placement="left"
                            >
                              <p class="p-0 m-0">إضافة ملاحظة</p>
                              <span>{{
                                oldGeneralForm.expSaveValue !==
                                generalForm.expSaveValue
                                  ? formatAsCurrency(
                                      oldGeneralForm.expSaveValue
                                    )
                                  : null
                              }}</span>
                              <hr class="border-white m-2 p-0" />
                              <img
                                @click="
                                  openCommentsec(
                                    (payload = {
                                      name: 'expSaveValue',
                                      section: 'expSaveValue',
                                    })
                                  )
                                "
                                src="/images/icons/comment.png"
                              />
                            </b-tooltip>
                            <span
                              @mouseenter="mouseHover('expSaveValue')"
                              @mouseleave="mouseLeave()"
                              class="font-weight-bolder pl-1 pr-1 review-label label-font"
                              :class="
                                commentedFeild == 'expSaveValue'
                                  ? 'Highlightborderd'
                                  : null ||
                                    (Highlight &&
                                    generalForm.expSaveValue !==
                                      oldGeneralForm.expSaveValue
                                      ? 'showHighlight'
                                      : null)
                              "
                              id="expSaveValue"
                              >{{ $t("totalexpectedsavings") }}</span
                            >
                            <img
                              v-if="checkCommented('expSaveValue')"
                              class="chat-bubble pr-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <p class="md-subheading font-weight-bold pl-1 pr-1">
                              {{ generalForm.expSaveValue }}
                            </p>
                          </b-col>
                        </b-row>
                        <b-row class="mb-3">
                          <b-col md="12">
                            <b-tooltip
                              id="deputyShip"
                              target="deputyShip"
                              placement="left"
                            >
                              <p class="p-0 m-0">إضافة ملاحظة</p>
                              <span>{{
                                oldGeneralForm.deputyShip !==
                                generalForm.deputyShip
                                  ? oldGeneralForm.deputyShip
                                  : null
                              }}</span>
                              <hr class="border-white m-2 p-0" />
                              <img
                                @click="
                                  openCommentsec(
                                    (payload = {
                                      name: 'deputyShip',
                                      section: 'deputyShip',
                                    })
                                  )
                                "
                                src="/images/icons/comment.png"
                              />
                            </b-tooltip>
                            <span
                              id="deputyShip"
                              @mouseenter="mouseHover('deputyShip')"
                              @mouseleave="mouseLeave()"
                              :class="
                                commentedFeild == 'deputyShip'
                                  ? 'Highlightborderd'
                                  : null ||
                                    (Highlight &&
                                    generalForm.deputyShip !==
                                      oldGeneralForm.deputyShip
                                      ? 'showHighlight'
                                      : null)
                              "
                              class="font-weight-bolder pl-1 pr-1 review-label label-font"
                              >{{ $t("department") }}</span
                            >
                            <img
                              v-if="checkCommented('deputyShip')"
                              class="chat-bubble pr-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <p class="md-subheading pr-1 pl-1 font-weight-bold">
                              {{ generalForm.deputyShip }}
                            </p>
                          </b-col>
                        </b-row>
                        <b-row class="mb-3">
                          <b-col md="12">
                            <b-tooltip id="type" target="type" placement="left">
                              <p class="p-0 m-0">إضافة ملاحظة</p>
                              <span>{{
                                oldGeneralForm.type !== generalForm.type
                                  ? oldGeneralForm.type
                                  : null
                              }}</span>
                              <hr class="border-white m-2 p-0" />
                              <img
                                @click="
                                  openCommentsec(
                                    (payload = {
                                      name: 'type',
                                      section: 'type',
                                    })
                                  )
                                "
                                src="/images/icons/comment.png"
                              />
                            </b-tooltip>
                            <span
                              @mouseenter="mouseHover('type')"
                              @mouseleave="mouseLeave()"
                              :class="
                                commentedFeild == 'type'
                                  ? 'Highlightborderd'
                                  : null ||
                                    (Highlight &&
                                    generalForm.type !== oldGeneralForm.type
                                      ? 'showHighlight'
                                      : null)
                              "
                              class="font-weight-bolder pl-1 pr-1 review-label label-font"
                              id="type"
                              >نوع الوفر</span
                            >
                            <img
                              v-if="checkCommented('type')"
                              class="chat-bubble pr-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <p class="md-subheading pr-1 pl-1 font-weight-bold">
                              {{ generalForm.type }}
                            </p>
                          </b-col>
                        </b-row>

                        <b-row class="mb-3" v-if="generalForm.type == 'أخرى'">
                          <b-col md="12">
                            <b-tooltip
                              id="savingTypeDescription"
                              target="savingTypeDescription"
                              placement="left"
                            >
                              <p class="p-0 m-0">إضافة ملاحظة</p>
                              <span>{{
                                oldGeneralForm.savingTypeDescription !==
                                generalForm.savingTypeDescription
                                  ? oldGeneralForm.savingTypeDescription
                                  : null
                              }}</span>
                              <hr class="border-white m-2 p-0" />
                              <img
                                @click="
                                  openCommentsec(
                                    (payload = {
                                      name: 'savingTypeDescription',
                                      section: 'savingTypeDescription',
                                    })
                                  )
                                "
                                src="/images/icons/comment.png"
                              />
                            </b-tooltip>
                            <span
                              @mouseenter="mouseHover('savingTypeDescription')"
                              @mouseleave="mouseLeave()"
                              :class="
                                commentedFeild == 'savingTypeDescription'
                                  ? 'Highlightborderd'
                                  : null ||
                                    (Highlight &&
                                    generalForm.savingTypeDescription !==
                                      oldGeneralForm.savingTypeDescription
                                      ? 'showHighlight'
                                      : null)
                              "
                              class="font-weight-bolder pl-1 pr-1 review-label label-font"
                              id="savingTypeDescription"
                              >{{ $t("otherDescription") }}</span
                            >
                            <img
                              v-if="checkCommented('savingTypeDescription')"
                              class="chat-bubble pr-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <p class="md-subheading pr-1 pl-1 font-weight-bold">
                              {{ generalForm.savingTypeDescription }}
                            </p>
                          </b-col>
                        </b-row>
                        <b-row class="mb-3">
                          <b-col>
                            <b-tooltip
                              id="startDate"
                              target="startDate"
                              placement="left"
                            >
                              <p class="p-0 m-0">إضافة ملاحظة</p>
                              <span>{{
                                oldGeneralForm.startDate !==
                                generalForm.startDate
                                  ? oldGeneralForm.startDate
                                  : null
                              }}</span>
                              <hr class="border-white m-2 p-0" />
                              <img
                                @click="
                                  openCommentsec(
                                    (payload = {
                                      name: 'startDate',
                                      section: 'startDate',
                                    })
                                  )
                                "
                                src="/images/icons/comment.png"
                              />
                            </b-tooltip>
                            <span
                              @mouseenter="mouseHover('startDate')"
                              @mouseleave="mouseLeave()"
                              class="font-weight-bolder pl-1 pr-1 review-label label-font"
                              :class="
                                commentedFeild == 'startDate'
                                  ? 'Highlightborderd'
                                  : null ||
                                    (Highlight &&
                                    generalForm.startDate !==
                                      oldGeneralForm.startDate
                                      ? 'showHighlight'
                                      : null)
                              "
                              id="startDate"
                              >{{ $t("startDate") }}</span
                            >
                            <img
                              v-if="checkCommented('startDate')"
                              class="chat-bubble pr-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <p class="md-subheading pr-1 pl-1 font-weight-bold">
                              {{ formateDate(generalForm.startDate) }}
                            </p>
                          </b-col>
                          <b-col offset-md="7" trigger="click">
                            <b-tooltip
                              id="endDate"
                              target="endDate"
                              placement="left"
                            >
                              <p class="p-0 m-0">إضافة ملاحظة</p>
                              <span>{{
                                oldGeneralForm.endDate !== generalForm.endDate
                                  ? oldGeneralForm.endDate
                                  : null
                              }}</span>
                              <hr class="border-white m-2 p-0" />
                              <img
                                @click="
                                  openCommentsec(
                                    (payload = {
                                      name: 'endDate',
                                      section: 'endDate',
                                    })
                                  )
                                "
                                src="/images/icons/comment.png"
                              />
                            </b-tooltip>
                            <span
                              @mouseenter="mouseHover('endDate')"
                              @mouseleave="mouseLeave()"
                              :class="
                                commentedFeild == 'endDate'
                                  ? 'Highlightborderd'
                                  : null ||
                                    (Highlight &&
                                    generalForm.endDate !==
                                      oldGeneralForm.endDate
                                      ? 'showHighlight'
                                      : null)
                              "
                              class="font-weight-bolder pl-1 pr-1 review-label label-font"
                              id="endDate"
                              >{{ $t("endDate") }}
                            </span>
                            <img
                              v-if="checkCommented('endDate')"
                              class="chat-bubble pr-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <p class="md-subheading pr-1 pl-1 font-weight-bold">
                              {{ formateDate(generalForm.endDate) }}
                            </p>
                          </b-col>
                        </b-row>
                      </md-card-content>
                    </md-card>

                    <!-- Section Finincial Statement -->
                    <div>
                      <md-card
                        class="custom-card mb-5 scrollspy"
                        :id="$t('financialdataandsaving')"
                      >
                        <div class="pr-4 pt-4">
                          <p class="m-1 text-color h3 font-weight-bold">
                            {{ $t("financialdataandsaving") }}
                          </p>
                          <p class="font-weight-bold h5 pb-3 pt-3">
                            {{ $t("GfsCodes") }}
                          </p>
                        </div>
                        <b-table
                          class="customTable pr-4 pl-4"
                          bordered
                          :responsive="true"
                          :items="yearlySavaData"
                          :fields="financialSavingfields"
                        >
                          <template
                            v-slot:cell(gfs)="row"
                            class="demoooooooooooooo"
                          >
                            <b-tooltip
                              :id="'gfs' + `${row.item.total}`"
                              :target="'gfs' + `${row.item.total}`"
                              placement="left"
                            >
                              <p class="p-0 m-0">إضافة ملاحظة</p>
                              <span>{{ lastValue }}</span>
                              <hr class="border-white m-2 p-0" />
                              <img
                                @click="
                                  openCommentsec(
                                    (payload = {
                                      name: 'gfs' + `${row.item.total}`,
                                      section: 'GFS',
                                    }),
                                    (row = row.item)
                                  )
                                "
                                src="/images/icons/comment.png"
                              />
                            </b-tooltip>
                            <img
                              v-if="checkCommented('gfs' + `${row.item.total}`)"
                              class="chat-bubble pr-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="m-0"
                              :class="
                                commentedFeild == 'gfs' + `${row.item.total}`
                                  ? 'HighlightCell'
                                  : null ||
                                    (Highlight &&
                                    matchYearlySave(row, (name = 'gfs')) != null
                                      ? 'showHighlightCell'
                                      : null)
                              "
                              @mouseenter="
                                mouseHover('gfs' + `${row.item.total}`),
                                  lastYearlySave(row, (name = 'gfs'))
                              "
                              @mouseleave="mouseLeave()"
                              :id="'gfs' + `${row.item.total}`"
                            >
                              {{ row.item.gfs }}
                            </span>
                          </template>
                          <template v-slot:cell(clause)="row">
                            <b-tooltip
                              :id="'clause' + `${row.item.total}`"
                              :target="'clause' + `${row.item.total}`"
                              placement="left"
                            >
                              <p class="p-0 m-0">إضافة ملاحظة</p>
                              <span>{{ lastValue }}</span>
                              <hr class="border-white m-2 p-0" />
                              <img
                                @click="
                                  openCommentsec(
                                    (payload = {
                                      name: 'clause' + `${row.item.total}`,
                                      section: 'GFS',
                                    }),
                                    (row = row.item)
                                  )
                                "
                                src="/images/icons/comment.png"
                              />
                            </b-tooltip>
                            <img
                              v-if="
                                checkCommented('clause' + `${row.item.total}`)
                              "
                              class="chat-bubble pr-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="m-0"
                              :class="
                                commentedFeild == 'clause' + `${row.item.total}`
                                  ? 'HighlightCell'
                                  : null ||
                                    (Highlight &&
                                    matchYearlySave(row, (name = 'clause')) !=
                                      null
                                      ? 'showHighlightCell'
                                      : null)
                              "
                              :id="'clause' + `${row.item.total}`"
                              @mouseenter="
                                mouseHover('clause' + `${row.item.total}`),
                                  lastYearlySave(row, (name = 'clause'))
                              "
                              @mouseleave="mouseLeave()"
                            >
                              {{ row.item.clause }}
                            </span>
                          </template>
                          <template v-slot:cell(annualBalance)="row">
                            <b-tooltip
                              :id="'annualBalance' + `${row.item.total}`"
                              :target="'annualBalance' + `${row.item.total}`"
                              placement="left"
                            >
                              <p class="p-0 m-0">إضافة ملاحظة</p>
                              <span>{{ lastValue }}</span>
                              <hr class="border-white m-2 p-0" />
                              <img
                                @click="
                                  openCommentsec(
                                    (payload = {
                                      name:
                                        'annualBalance' + `${row.item.total}`,
                                      section: 'GFS',
                                    }),
                                    (row = row.item)
                                  )
                                "
                                src="/images/icons/comment.png"
                              />
                            </b-tooltip>
                            <img
                              v-if="
                                checkCommented(
                                  'annualBalance' + `${row.item.total}`
                                )
                              "
                              class="h-75 pl-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="m-0"
                              :class="
                                commentedFeild ==
                                'annualBalance' + `${row.item.total}`
                                  ? 'HighlightCell'
                                  : null ||
                                    (Highlight &&
                                    matchYearlySave(
                                      row,
                                      (name = 'annualBalance')
                                    ) != null
                                      ? 'showHighlightCell'
                                      : null)
                              "
                              @mouseenter="
                                mouseHover(
                                  'annualBalance' + `${row.item.total}`
                                ),
                                  lastYearlySave(row, (name = 'annualBalance'))
                              "
                              @mouseleave="mouseLeave()"
                              :id="'annualBalance' + `${row.item.total}`"
                            >
                              {{ row.item.annualBalance }}
                            </span>
                          </template>
                          <template v-slot:cell(valueAfterRecommend)="row">
                            <b-tooltip
                              :id="'valueAfterRecommend' + `${row.item.total}`"
                              :target="
                                'valueAfterRecommend' + `${row.item.total}`
                              "
                              placement="left"
                            >
                              <p class="p-0 m-0">إضافة ملاحظة</p>
                              <span>{{ lastValue }}</span>
                              <hr class="border-white m-2 p-0" />
                              <img
                                @click="
                                  openCommentsec(
                                    (payload = {
                                      name:
                                        'valueAfterRecommend' +
                                        `${row.item.total}`,
                                      section: 'GFS',
                                    }),
                                    (row = row.item)
                                  )
                                "
                                src="/images/icons/comment.png"
                              />
                            </b-tooltip>
                            <img
                              v-if="
                                checkCommented(
                                  'valueAfterRecommend' + `${row.item.total}`
                                )
                              "
                              class="h-75 pl-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="m-0"
                              :class="
                                commentedFeild ==
                                'valueAfterRecommend' + `${row.item.total}`
                                  ? 'HighlightCell'
                                  : null ||
                                    (Highlight &&
                                    matchYearlySave(
                                      row,
                                      (name = 'valueAfterRecommend')
                                    ) != null
                                      ? 'showHighlightCell'
                                      : null)
                              "
                              @mouseenter="
                                mouseHover(
                                  'valueAfterRecommend' + `${row.item.total}`
                                ),
                                  lastYearlySave(
                                    row,
                                    (name = 'valueAfterRecommend')
                                  )
                              "
                              @mouseleave="mouseLeave()"
                              :id="'valueAfterRecommend' + `${row.item.total}`"
                            >
                              {{ row.item.valueAfterRecommend }}
                            </span>
                          </template>
                          <template v-slot:cell(year)="row">
                            <b-tooltip
                              :id="'year' + `${row.item.total}`"
                              :target="'year' + `${row.item.total}`"
                              placement="left"
                            >
                              <p class="p-0 m-0">إضافة ملاحظة</p>
                              <span>{{ lastValue }}</span>
                              <hr class="border-white m-2 p-0" />
                              <img
                                @click="
                                  openCommentsec(
                                    (payload = {
                                      name: 'year' + `${row.item.total}`,
                                      section: 'GFS',
                                    }),
                                    (row = row.item)
                                  )
                                "
                                src="/images/icons/comment.png"
                              />
                            </b-tooltip>
                            <img
                              v-if="
                                checkCommented('year' + `${row.item.total}`)
                              "
                              class="h-75 pl-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="m-0"
                              :class="
                                commentedFeild == 'year' + `${row.item.total}`
                                  ? 'HighlightCell'
                                  : null ||
                                    (Highlight &&
                                    matchYearlySave(row, (name = 'year')) !=
                                      null
                                      ? 'showHighlightCell'
                                      : null)
                              "
                              @mouseenter="
                                mouseHover('year' + `${row.item.total}`),
                                  lastYearlySave(row, (name = 'year'))
                              "
                              @mouseleave="mouseLeave()"
                              :id="'year' + `${row.item.total}`"
                            >
                              {{ row.item.year }}
                            </span>
                          </template>
                        </b-table>
                        <div class="position-relative">
                          <p class="font-weight-bold h5 pb-3 pr-4 pt-3">
                            {{ $t("ExpectedSavings") }}
                          </p>
                          <p
                            class="float-left font-weight-bold pl-4"
                            :class="checkExpectedvalue ? 'text-danger' : null"
                          >
                            إجمالي الوفر المتوقع للفرصة:
                            {{ formatAsCurrency(calculateExpectedSavingNew()) }}
                            ريال سعودي
                          </p>
                          <div
                            v-if="checkExpectedvalue"
                            class="float-left w-100 font-weight-bold pl-4"
                            :class="checkExpectedvalue ? 'text-danger' : null"
                          >
                            <p class="float-left">
                              إجمالي التوزيع السنوي غير متوائم مع إجمالي الوفر
                              المتوقع في قسم المعلومات العامة
                            </p>
                          </div>
                          <!-- <p>إجمالي الوفر المتوقع للفرصة: {{totalExpectedvalue}} ريال سعودي</p> -->
                          <b-table
                            id="expectedtable"
                            class="customTable pl-4 pr-4"
                            bordered
                            :responsive="true"
                            :items="yearlySavaData"
                            :fields="yearlySavefields"
                          >
                            <template v-slot:cell(clause)="row">
                              <b-tooltip
                                id="Clause"
                                :target="`${row.item.clause}`"
                                placement="left"
                              >
                                <p class="p-0 m-0">إضافة ملاحظة</p>
                                <span>{{ lastValue }}</span>
                                <hr class="border-white m-2 p-0" />
                                <img
                                  @click="
                                    openCommentsec(
                                      (payload = {
                                        name: 'clause',
                                        section: 'GFS',
                                      }),
                                      (row = row.item)
                                    )
                                  "
                                  src="/images/icons/comment.png"
                                />
                              </b-tooltip>
                              <span
                                :id="`${row.item.clause}`"
                                @mouseenter="
                                  mouseHover('Clause'),
                                    lastYearlySave(row, (name = 'clause'))
                                "
                                @mouseleave="mouseLeave()"
                              >
                                {{ row.item.clause }}
                              </span>
                            </template>
                            <template v-slot:cell(yearE2019)="row">
                              <b-tooltip
                                :id="'yearE2019' + `${row.item.id}`"
                                :target="'yearE2019' + `${row.item.id}`"
                                placement="left"
                              >
                                <p class="p-0 m-0">إضافة ملاحظة</p>
                                <span>{{ lastValue }}</span>
                                <hr class="border-white m-2 p-0" />
                                <img
                                  @click="
                                    openCommentsec(
                                      (payload = {
                                        name: 'yearE2019' + `${row.item.id}`,
                                        section: 'GFS',
                                      }),
                                      (row = row.item)
                                    )
                                  "
                                  src="/images/icons/comment.png"
                                />
                              </b-tooltip>
                              <img
                                v-if="
                                  checkCommented('yearE2019' + `${row.item.id}`)
                                "
                                class="h-75 pl-1"
                                @click="hideComment()"
                                src="/images/icons/chat_bubble.png"
                              />
                              <span
                                class="m-0"
                                :class="
                                  commentedFeild ==
                                  'yearE2019' + `${row.item.id}`
                                    ? 'HighlightCell'
                                    : null ||
                                      (Highlight &&
                                      matchYearlySave(
                                        row,
                                        (name = 'yearE2019')
                                      ) != null
                                        ? 'showHighlightCell'
                                        : null)
                                "
                                :id="'yearE2019' + `${row.item.id}`"
                                @mouseenter="
                                  mouseHover('yearE2019' + `${row.item.id}`),
                                    lastYearlySave(row, (name = 'yearE2019'))
                                "
                                @mouseleave="mouseLeave()"
                              >
                                {{ row.item.yearE2019 }}
                              </span>
                            </template>
                            <template v-slot:cell(yearE2020)="row">
                              <b-tooltip
                                :id="'yearE2020' + `${row.item.id}`"
                                :target="'yearE2020' + `${row.item.id}`"
                                placement="left"
                              >
                                <p class="p-0 m-0">إضافة ملاحظة</p>
                                <span>{{ lastValue }}</span>
                                <hr class="border-white m-2 p-0" />
                                <img
                                  @click="
                                    openCommentsec(
                                      (payload = {
                                        name: 'yearE2020' + `${row.item.id}`,
                                        section: 'GFS',
                                      }),
                                      (row = row.item)
                                    )
                                  "
                                  src="/images/icons/comment.png"
                                />
                              </b-tooltip>
                              <img
                                v-if="
                                  checkCommented('yearE2020' + `${row.item.id}`)
                                "
                                class="h-75 pl-1"
                                @click="hideComment()"
                                src="/images/icons/chat_bubble.png"
                              />
                              <span
                                class="m-0"
                                :class="
                                  commentedFeild ==
                                  'yearE2020' + `${row.item.id}`
                                    ? 'HighlightCell'
                                    : null ||
                                      (Highlight &&
                                      matchYearlySave(
                                        row,
                                        (name = 'yearE2020')
                                      ) != null
                                        ? 'showHighlightCell'
                                        : null)
                                "
                                :id="'yearE2020' + `${row.item.id}`"
                                @mouseenter="
                                  mouseHover('yearE2020' + `${row.item.id}`),
                                    lastYearlySave(row, (name = 'yearE2020'))
                                "
                                @mouseleave="mouseLeave()"
                              >
                                {{ row.item.yearE2020 }}
                              </span>
                            </template>
                            <template v-slot:cell(yearE2021)="row">
                              <b-tooltip
                                :id="'yearE2021' + `${row.item.id}`"
                                :target="'yearE2021' + `${row.item.id}`"
                                placement="left"
                              >
                                <p class="p-0 m-0">إضافة ملاحظة</p>
                                <span>{{ lastValue }}</span>
                                <hr class="border-white m-2 p-0" />
                                <img
                                  @click="
                                    openCommentsec(
                                      (payload = {
                                        name: 'yearE2021' + `${row.item.id}`,
                                        section: 'GFS',
                                      }),
                                      (row = row.item)
                                    )
                                  "
                                  src="/images/icons/comment.png"
                                />
                              </b-tooltip>
                              <img
                                v-if="
                                  checkCommented('yearE2021' + `${row.item.id}`)
                                "
                                class="h-75 pl-1"
                                @click="hideComment()"
                                src="/images/icons/chat_bubble.png"
                              />
                              <span
                                class="m-0"
                                :class="
                                  commentedFeild ==
                                  'yearE2021' + `${row.item.id}`
                                    ? 'HighlightCell'
                                    : null ||
                                      (Highlight &&
                                      matchYearlySave(
                                        row,
                                        (name = 'yearE2021')
                                      ) != null
                                        ? 'showHighlightCell'
                                        : null)
                                "
                                :id="'yearE2021' + `${row.item.id}`"
                                @mouseenter="
                                  mouseHover('yearE2021' + `${row.item.id}`),
                                    lastYearlySave(row, (name = 'yearE2021'))
                                "
                                @mouseleave="mouseLeave()"
                              >
                                {{ row.item.yearE2021 }}
                              </span>
                            </template>
                            <template v-slot:cell(yearE2022)="row">
                              <b-tooltip
                                :id="'yearE2022' + `${row.item.id}`"
                                :target="'yearE2022' + `${row.item.id}`"
                                placement="left"
                              >
                                <p class="p-0 m-0">إضافة ملاحظة</p>
                                <span>{{ lastValue }}</span>
                                <hr class="border-white m-2 p-0" />
                                <img
                                  @click="
                                    openCommentsec(
                                      (payload = {
                                        name: 'yearE2022' + `${row.item.id}`,
                                        section: 'GFS',
                                      }),
                                      (row = row.item)
                                    )
                                  "
                                  src="/images/icons/comment.png"
                                />
                              </b-tooltip>
                              <img
                                v-if="
                                  checkCommented('yearE2022' + `${row.item.id}`)
                                "
                                class="h-75 pl-1"
                                @click="hideComment()"
                                src="/images/icons/chat_bubble.png"
                              />
                              <span
                                class="m-0"
                                :class="
                                  commentedFeild ==
                                  'yearE2022' + `${row.item.id}`
                                    ? 'HighlightCell'
                                    : null ||
                                      (Highlight &&
                                      matchYearlySave(
                                        row,
                                        (name = 'yearE2022')
                                      ) != null
                                        ? 'showHighlightCell'
                                        : null)
                                "
                                :id="'yearE2022' + `${row.item.id}`"
                                @mouseenter="
                                  mouseHover('yearE2022' + `${row.item.id}`),
                                    lastYearlySave(row, (name = 'yearE2022'))
                                "
                                @mouseleave="mouseLeave()"
                              >
                                {{ row.item.yearE2022 }}
                              </span>
                            </template>
                            <template v-slot:cell(yearE2023)="row">
                              <b-tooltip
                                :id="'yearE2023' + `${row.item.id}`"
                                :target="'yearE2023' + `${row.item.id}`"
                                placement="left"
                              >
                                <p class="p-0 m-0">إضافة ملاحظة</p>
                                <span>{{ lastValue }}</span>
                                <hr class="border-white m-2 p-0" />
                                <img
                                  @click="
                                    openCommentsec(
                                      (payload = {
                                        name: 'yearE2023' + `${row.item.id}`,
                                        section: 'GFS',
                                      }),
                                      (row = row.item)
                                    )
                                  "
                                  src="/images/icons/comment.png"
                                />
                              </b-tooltip>
                              <img
                                v-if="
                                  checkCommented('yearE2023' + `${row.item.id}`)
                                "
                                class="h-75 pl-1"
                                @click="hideComment()"
                                src="/images/icons/chat_bubble.png"
                              />
                              <span
                                class="m-0"
                                :class="
                                  commentedFeild ==
                                  'yearE2023' + `${row.item.id}`
                                    ? 'HighlightCell'
                                    : null ||
                                      (Highlight &&
                                      matchYearlySave(
                                        row,
                                        (name = 'yearE2023')
                                      ) != null
                                        ? 'showHighlightCell'
                                        : null)
                                "
                                :id="'yearE2023' + `${row.item.id}`"
                                @mouseenter="
                                  mouseHover('yearE2023' + `${row.item.id}`),
                                    lastYearlySave(row, (name = 'yearE2023'))
                                "
                                @mouseleave="mouseLeave()"
                              >
                                {{ row.item.yearE2023 }}
                              </span>
                            </template>
                            <template v-slot:cell(eFutureyears)="row">
                              <b-tooltip
                                :id="'eFutureyears' + `${row.item.id}`"
                                :target="'eFutureyears' + `${row.item.id}`"
                                placement="left"
                              >
                                <p class="p-0 m-0">إضافة ملاحظة</p>
                                <span>{{ lastValue }}</span>
                                <hr class="border-white m-2 p-0" />
                                <img
                                  @click="
                                    openCommentsec(
                                      (payload = {
                                        name: 'eFutureyears' + `${row.item.id}`,
                                        section: 'GFS',
                                      }),
                                      (row = row.item)
                                    )
                                  "
                                  src="/images/icons/comment.png"
                                />
                              </b-tooltip>
                              <img
                                v-if="
                                  checkCommented(
                                    'eFutureyears' + `${row.item.id}`
                                  )
                                "
                                class="h-75 pl-1"
                                @click="hideComment()"
                                src="/images/icons/chat_bubble.png"
                              />
                              <span
                                class="m-0"
                                :class="
                                  commentedFeild ==
                                  'eFutureyears' + `${row.item.id}`
                                    ? 'HighlightCell'
                                    : null ||
                                      (Highlight &&
                                      matchYearlySave(
                                        row,
                                        (name = 'eFutureyears')
                                      ) != null
                                        ? 'showHighlightCell'
                                        : null)
                                "
                                @mouseenter="
                                  mouseHover('eFutureyears' + `${row.item.id}`),
                                    lastYearlySave(row, (name = 'eFutureyears'))
                                "
                                @mouseleave="mouseLeave()"
                                :id="'eFutureyears' + `${row.item.id}`"
                              >
                                {{ row.item.eFutureyears }}
                              </span>
                            </template>
                            <template v-slot:cell(Total)="row">
                              <b-tooltip
                                :id="'Total' + `${row.item.id}`"
                                :target="'Total' + `${row.item.id}`"
                                placement="left"
                              >
                                <p class="p-0 m-0">إضافة ملاحظة</p>
                                <span>{{ lastValue }}</span>
                                <hr class="border-white m-2 p-0" />
                                <img
                                  @click="
                                    openCommentsec(
                                      (payload = {
                                        name: 'Total' + `${row.item.id}`,
                                        section: 'GFS',
                                      }),
                                      (row = row.item)
                                    )
                                  "
                                  src="/images/icons/comment.png"
                                />
                              </b-tooltip>
                              <img
                                v-if="
                                  checkCommented('Total' + `${row.item.id}`)
                                "
                                class="h-75 pl-1"
                                @click="hideComment()"
                                src="/images/icons/chat_bubble.png"
                              />
                              <span
                                class="m-0 overflow-wrap"
                                :class="
                                  commentedFeild == 'Total' + `${row.item.id}`
                                    ? 'HighlightCell'
                                    : null ||
                                      (Highlight &&
                                      matchYearlySave(row, (name = 'Total')) !=
                                        null
                                        ? 'showHighlightCell'
                                        : null)
                                "
                                @mouseenter="
                                  mouseHover('Total' + `${row.item.id}`),
                                    lastYearlySave(row, (name = 'Total'))
                                "
                                @mouseleave="mouseLeave()"
                                :id="'Total' + `${row.item.id}`"
                              >
                                {{ calculateExpectedtotal(row.item) }}
                              </span>
                            </template>
                            <template v-slot:custom-foot>
                              <!-- You can customize this however you want, this is just as an example -->
                              <b-tr>
                                <b-td class="font-weight-bold">
                                  {{ $t("Total") }}</b-td
                                >
                                <b-td>
                                  <b-tooltip
                                    :id="'yearE2019'"
                                    :target="'yearE2019'"
                                    placement="left"
                                  >
                                    <p class="p-0 m-0">إضافة ملاحظة</p>
                                    <span>{{ lastValue }}</span>
                                    <hr class="border-white m-2 p-0" />
                                    <img
                                      @click="
                                        openCommentsec(
                                          (payload = {
                                            name: 'yearE2019',
                                            section: 'GFS',
                                          })
                                        )
                                      "
                                      src="/images/icons/comment.png"
                                    />
                                  </b-tooltip>
                                  <img
                                    v-if="checkCommented('yearE2019')"
                                    class="h-75 pl-1"
                                    @click="hideComment()"
                                    src="/images/icons/chat_bubble.png"
                                  />
                                  <span
                                    class="m-0 overflow-wrap"
                                    :class="
                                      commentedFeild == 'yearE2019'
                                        ? 'HighlightCell'
                                        : null
                                    "
                                    @mouseenter="mouseHover('yearE2019')"
                                    @mouseleave="mouseLeave()"
                                    :id="'yearE2019'"
                                  >
                                    {{ calculateExpectedSaving("yearE2019") }}
                                  </span>
                                </b-td>
                                <b-td>
                                  <b-tooltip
                                    :id="'yearE2020'"
                                    :target="'yearE2020'"
                                    placement="left"
                                  >
                                    <p class="p-0 m-0">إضافة ملاحظة</p>
                                    <span>{{ lastValue }}</span>
                                    <hr class="border-white m-2 p-0" />
                                    <img
                                      @click="
                                        openCommentsec(
                                          (payload = {
                                            name: 'yearE2020',
                                            section: 'GFS',
                                          })
                                        )
                                      "
                                      src="/images/icons/comment.png"
                                    />
                                  </b-tooltip>
                                  <img
                                    v-if="checkCommented('yearE2020')"
                                    class="h-75 pl-1"
                                    @click="hideComment()"
                                    src="/images/icons/chat_bubble.png"
                                  />
                                  <span
                                    class="m-0 overflow-wrap"
                                    :class="
                                      commentedFeild == 'yearE2020'
                                        ? 'HighlightCell'
                                        : null
                                    "
                                    @mouseenter="mouseHover('yearE2020')"
                                    @mouseleave="mouseLeave()"
                                    :id="'yearE2020'"
                                  >
                                    {{ calculateExpectedSaving("yearE2020") }}
                                  </span>
                                </b-td>
                                <b-td>
                                  <b-tooltip
                                    :id="'yearE2021'"
                                    :target="'yearE2021'"
                                    placement="left"
                                  >
                                    <p class="p-0 m-0">إضافة ملاحظة</p>
                                    <span>{{ lastValue }}</span>
                                    <hr class="border-white m-2 p-0" />
                                    <img
                                      @click="
                                        openCommentsec(
                                          (payload = {
                                            name: 'yearE2021',
                                            section: 'GFS',
                                          })
                                        )
                                      "
                                      src="/images/icons/comment.png"
                                    />
                                  </b-tooltip>
                                  <img
                                    v-if="checkCommented('yearE2021')"
                                    class="h-75 pl-1"
                                    @click="hideComment()"
                                    src="/images/icons/chat_bubble.png"
                                  />
                                  <span
                                    class="m-0 overflow-wrap"
                                    :class="
                                      commentedFeild == 'yearE2021'
                                        ? 'HighlightCell'
                                        : null
                                    "
                                    @mouseenter="mouseHover('yearE2021')"
                                    @mouseleave="mouseLeave()"
                                    :id="'yearE2021'"
                                  >
                                    {{ calculateExpectedSaving("yearE2021") }}
                                  </span>
                                </b-td>
                                <b-td>
                                  <b-tooltip
                                    :id="'yearE2022'"
                                    :target="'yearE2022'"
                                    placement="left"
                                  >
                                    <p class="p-0 m-0">إضافة ملاحظة</p>
                                    <span>{{ lastValue }}</span>
                                    <hr class="border-white m-2 p-0" />
                                    <img
                                      @click="
                                        openCommentsec(
                                          (payload = {
                                            name: 'yearE2022',
                                            section: 'GFS',
                                          })
                                        )
                                      "
                                      src="/images/icons/comment.png"
                                    />
                                  </b-tooltip>
                                  <img
                                    v-if="checkCommented('yearE2022')"
                                    class="h-75 pl-1"
                                    @click="hideComment()"
                                    src="/images/icons/chat_bubble.png"
                                  />
                                  <span
                                    class="m-0 overflow-wrap"
                                    :class="
                                      commentedFeild == 'yearE2022'
                                        ? 'HighlightCell'
                                        : null
                                    "
                                    @mouseenter="mouseHover('yearE2022')"
                                    @mouseleave="mouseLeave()"
                                    :id="'yearE2022'"
                                  >
                                    {{ calculateExpectedSaving("yearE2022") }}
                                  </span>
                                </b-td>
                                <b-td>
                                  <b-tooltip
                                    :id="'yearE2023'"
                                    :target="'yearE2023'"
                                    placement="left"
                                  >
                                    <p class="p-0 m-0">إضافة ملاحظة</p>
                                    <span>{{ lastValue }}</span>
                                    <hr class="border-white m-2 p-0" />
                                    <img
                                      @click="
                                        openCommentsec(
                                          (payload = {
                                            name: 'yearE2023',
                                            section: 'GFS',
                                          })
                                        )
                                      "
                                      src="/images/icons/comment.png"
                                    />
                                  </b-tooltip>
                                  <img
                                    v-if="checkCommented('yearE2023')"
                                    class="h-75 pl-1"
                                    @click="hideComment()"
                                    src="/images/icons/chat_bubble.png"
                                  />
                                  <span
                                    class="m-0 overflow-wrap"
                                    :class="
                                      commentedFeild == 'yearE2023'
                                        ? 'HighlightCell'
                                        : null
                                    "
                                    @mouseenter="mouseHover('yearE2023')"
                                    @mouseleave="mouseLeave()"
                                    :id="'yearE2023'"
                                  >
                                    {{ calculateExpectedSaving("yearE2023") }}
                                  </span>
                                </b-td>
                                <b-td>
                                  <b-tooltip
                                    :id="'eFutureyears'"
                                    :target="'eFutureyears'"
                                    placement="left"
                                  >
                                    <p class="p-0 m-0">إضافة ملاحظة</p>
                                    <span>{{ lastValue }}</span>
                                    <hr class="border-white m-2 p-0" />
                                    <img
                                      @click="
                                        openCommentsec(
                                          (payload = {
                                            name: 'eFutureyears',
                                            section: 'GFS',
                                          })
                                        )
                                      "
                                      src="/images/icons/comment.png"
                                    />
                                  </b-tooltip>
                                  <img
                                    v-if="checkCommented('eFutureyears')"
                                    class="h-75 pl-1"
                                    @click="hideComment()"
                                    src="/images/icons/chat_bubble.png"
                                  />
                                  <span
                                    class="m-0 overflow-wrap"
                                    :class="
                                      commentedFeild == 'eFutureyears'
                                        ? 'HighlightCell'
                                        : null
                                    "
                                    @mouseenter="mouseHover('eFutureyears')"
                                    @mouseleave="mouseLeave()"
                                    :id="'eFutureyears'"
                                  >
                                    {{
                                      calculateExpectedSaving("eFutureyears")
                                    }}
                                  </span>
                                </b-td>
                                <b-td>
                                  <b-tooltip
                                    :id="'AllTotal'"
                                    :target="'AllTotal'"
                                    placement="left"
                                  >
                                    <p class="p-0 m-0">إضافة ملاحظة</p>
                                    <span>{{ lastValue }}</span>
                                    <hr class="border-white m-2 p-0" />
                                    <img
                                      @click="
                                        openCommentsec(
                                          (payload = {
                                            name: 'AllTotal',
                                            section: 'GFS',
                                          })
                                        )
                                      "
                                      src="/images/icons/comment.png"
                                    />
                                  </b-tooltip>
                                  <img
                                    v-if="checkCommented('AllTotal')"
                                    class="h-75 pl-1"
                                    @click="hideComment()"
                                    src="/images/icons/chat_bubble.png"
                                  />
                                  <span
                                    class="m-0 overflow-wrap"
                                    :class="
                                      commentedFeild == 'AllTotal'
                                        ? 'HighlightCell'
                                        : null
                                    "
                                    @mouseenter="mouseHover('AllTotal')"
                                    @mouseleave="mouseLeave()"
                                    :id="'AllTotal'"
                                  >
                                    {{ calculateExpectedSavingNew() }}
                                  </span>
                                </b-td>
                              </b-tr>
                            </template>
                          </b-table>
                        </div>
                        <div class="position-relative">
                          <p class="font-weight-bold h5 pb-3 pr-4 pt-3">
                            {{ $t("AchivedSavings") }}
                          </p>
                          <p class="float-left font-weight-bold pl-4">
                            إجمالي الوفر المحقق للفرصة:
                            {{ formatAsCurrency(totalAchivedValue) }} ريال سعودي
                          </p>
                          <b-table
                            id="Achivedtable"
                            class="customTable pr-4 pl-4 pb-4"
                            bordered
                            :responsive="true"
                            :items="yearlySavaData"
                            :fields="achivedSavingsfields"
                          >
                            <template v-slot:cell(clause)="row">
                              <b-tooltip
                                id="_Clause"
                                :target="`${row.item.clause}`"
                                placement="left"
                              >
                                <p class="p-0 m-0">إضافة ملاحظة</p>
                                <span>{{ lastValue }}</span>
                                <hr class="border-white m-2 p-0" />
                                <img
                                  @click="
                                    openCommentsec(
                                      (payload = {
                                        name: 'clause',
                                        section: 'GFS',
                                      }),
                                      (row = row.item)
                                    )
                                  "
                                  src="/images/icons/comment.png"
                                />
                              </b-tooltip>
                              <span
                                :id="`${row.item.clause}`"
                                @mouseenter="
                                  mouseHover('clause'),
                                    lastYearlySave(row, (name = 'clause'))
                                "
                                @mouseleave="mouseLeave()"
                              >
                                {{ row.item.clause }}
                              </span>
                            </template>
                            <template v-slot:cell(yearA2019)="row">
                              <b-tooltip
                                :id="'yearA2019' + `${row.item.id}`"
                                :target="'yearA2019' + `${row.item.id}`"
                                placement="left"
                              >
                                <p class="p-0 m-0">إضافة ملاحظة</p>
                                <span>{{ lastValue }}</span>
                                <hr class="border-white m-2 p-0" />
                                <img
                                  @click="
                                    openCommentsec(
                                      (payload = {
                                        name: 'yearA2019' + `${row.item.id}`,
                                        section: 'GFS',
                                      }),
                                      (row = row.item)
                                    )
                                  "
                                  src="/images/icons/comment.png"
                                />
                              </b-tooltip>
                              <img
                                v-if="
                                  checkCommented('yearA2019' + `${row.item.id}`)
                                "
                                class="h-75 pl-1"
                                @click="hideComment()"
                                src="/images/icons/chat_bubble.png"
                              />
                              <span
                                class="m-0"
                                :class="
                                  commentedFeild ==
                                  'yearA2019' + `${row.item.id}`
                                    ? 'HighlightCell'
                                    : null ||
                                      (Highlight &&
                                      matchYearlySave(
                                        row,
                                        (name = 'yearA2019')
                                      ) != null
                                        ? 'showHighlightCell'
                                        : null)
                                "
                                :id="'yearA2019' + `${row.item.id}`"
                                @mouseenter="
                                  mouseHover('yearA2019' + `${row.item.id}`),
                                    lastYearlySave(row, (name = 'yearA2019'))
                                "
                                @mouseleave="mouseLeave()"
                              >
                                {{ row.item.yearA2019 }}
                              </span>
                            </template>
                            <template v-slot:cell(yearA2020)="row">
                              <b-tooltip
                                :id="'yearA2020' + `${row.item.id}`"
                                :target="'yearA2020' + `${row.item.id}`"
                                placement="left"
                              >
                                <p class="p-0 m-0">إضافة ملاحظة</p>
                                <span>{{ lastValue }}</span>
                                <hr class="border-white m-2 p-0" />
                                <img
                                  @click="
                                    openCommentsec(
                                      (payload = {
                                        name: 'yearA2020' + `${row.item.id}`,
                                        section: 'GFS',
                                      }),
                                      (row = row.item)
                                    )
                                  "
                                  src="/images/icons/comment.png"
                                />
                              </b-tooltip>
                              <img
                                v-if="
                                  checkCommented('yearA2020' + `${row.item.id}`)
                                "
                                class="h-75 pl-1"
                                @click="hideComment()"
                                src="/images/icons/chat_bubble.png"
                              />
                              <span
                                class="m-0"
                                :class="
                                  commentedFeild ==
                                  'yearA2020' + `${row.item.id}`
                                    ? 'HighlightCell'
                                    : null ||
                                      (Highlight &&
                                      matchYearlySave(
                                        row,
                                        (name = 'yearA2020')
                                      ) != null
                                        ? 'showHighlightCell'
                                        : null)
                                "
                                :id="'yearA2020' + `${row.item.id}`"
                                @mouseenter="
                                  mouseHover('yearA2020' + `${row.item.id}`),
                                    lastYearlySave(row, (name = 'yearA2020'))
                                "
                                @mouseleave="mouseLeave()"
                              >
                                {{ row.item.yearA2020 }}
                              </span>
                            </template>
                            <template v-slot:cell(yearA2021)="row">
                              <b-tooltip
                                :id="'yearA2021' + `${row.item.id}`"
                                :target="'yearA2021' + `${row.item.id}`"
                                placement="left"
                              >
                                <p class="p-0 m-0">إضافة ملاحظة</p>
                                <span>{{ lastValue }}</span>
                                <hr class="border-white m-2 p-0" />
                                <img
                                  @click="
                                    openCommentsec(
                                      (payload = {
                                        name: 'yearA2021' + `${row.item.id}`,
                                        section: 'GFS',
                                      }),
                                      (row = row.item)
                                    )
                                  "
                                  src="/images/icons/comment.png"
                                />
                              </b-tooltip>
                              <img
                                v-if="
                                  checkCommented('yearA2021' + `${row.item.id}`)
                                "
                                class="h-75 pl-1"
                                @click="hideComment()"
                                src="/images/icons/chat_bubble.png"
                              />
                              <span
                                class="m-0"
                                :class="
                                  commentedFeild ==
                                  'yearA2021' + `${row.item.id}`
                                    ? 'HighlightCell'
                                    : null ||
                                      (Highlight &&
                                      matchYearlySave(
                                        row,
                                        (name = 'yearA2021')
                                      ) != null
                                        ? 'showHighlightCell'
                                        : null)
                                "
                                :id="'yearA2021' + `${row.item.id}`"
                                @mouseenter="
                                  mouseHover('yearA2021' + `${row.item.id}`),
                                    lastYearlySave(row, (name = 'yearA2021'))
                                "
                                @mouseleave="mouseLeave()"
                              >
                                {{ row.item.yearA2021 }}
                              </span>
                            </template>
                            <template v-slot:cell(yearA2022)="row">
                              <b-tooltip
                                :id="'yearA2022' + `${row.item.id}`"
                                :target="'yearA2022' + `${row.item.id}`"
                                placement="left"
                              >
                                <p class="p-0 m-0">إضافة ملاحظة</p>
                                <span>{{ lastValue }}</span>
                                <hr class="border-white m-2 p-0" />
                                <img
                                  @click="
                                    openCommentsec(
                                      (payload = {
                                        name: 'yearA2022' + `${row.item.id}`,
                                        section: 'GFS',
                                      }),
                                      (row = row.item)
                                    )
                                  "
                                  src="/images/icons/comment.png"
                                />
                              </b-tooltip>
                              <img
                                v-if="
                                  checkCommented('yearA2022' + `${row.item.id}`)
                                "
                                class="h-75 pl-1"
                                @click="hideComment()"
                                src="/images/icons/chat_bubble.png"
                              />
                              <span
                                class="m-0"
                                :class="
                                  commentedFeild ==
                                  'yearA2022' + `${row.item.id}`
                                    ? 'HighlightCell'
                                    : null ||
                                      (Highlight &&
                                      matchYearlySave(
                                        row,
                                        (name = 'yearA2022')
                                      ) != null
                                        ? 'showHighlightCell'
                                        : null)
                                "
                                :id="'yearA2022' + `${row.item.id}`"
                                @mouseenter="
                                  mouseHover('yearA2022' + `${row.item.id}`),
                                    lastYearlySave(row, (name = 'yearA2022'))
                                "
                                @mouseleave="mouseLeave()"
                              >
                                {{ row.item.yearA2022 }}
                              </span>
                            </template>
                            <template v-slot:cell(yearA2023)="row">
                              <b-tooltip
                                :id="'yearA2023' + `${row.item.id}`"
                                :target="'yearA2023' + `${row.item.id}`"
                                placement="left"
                              >
                                <p class="p-0 m-0">إضافة ملاحظة</p>
                                <span>{{ lastValue }}</span>
                                <hr class="border-white m-2 p-0" />
                                <img
                                  @click="
                                    openCommentsec(
                                      (payload = {
                                        name: 'yearA2023' + `${row.item.id}`,
                                        section: 'GFS',
                                      }),
                                      (row = row.item)
                                    )
                                  "
                                  src="/images/icons/comment.png"
                                />
                              </b-tooltip>
                              <img
                                v-if="
                                  checkCommented('yearA2023' + `${row.item.id}`)
                                "
                                class="h-75 pl-1"
                                @click="hideComment()"
                                src="/images/icons/chat_bubble.png"
                              />
                              <span
                                class="m-0"
                                :class="
                                  commentedFeild ==
                                  'yearA2023' + `${row.item.id}`
                                    ? 'HighlightCell'
                                    : null ||
                                      (Highlight &&
                                      matchYearlySave(
                                        row,
                                        (name = 'yearA2023')
                                      ) != null
                                        ? 'showHighlightCell'
                                        : null)
                                "
                                :id="'yearA2023' + `${row.item.id}`"
                                @mouseenter="
                                  mouseHover('yearA2023' + `${row.item.id}`),
                                    lastYearlySave(row, (name = 'yearA2023'))
                                "
                                @mouseleave="mouseLeave()"
                              >
                                {{ row.item.yearA2023 }}
                              </span>
                            </template>
                            <template v-slot:cell(aFutureyears)="row">
                              <b-tooltip
                                :id="'aFutureyears' + `${row.item.id}`"
                                :target="'aFutureyears' + `${row.item.id}`"
                                placement="left"
                              >
                                <p class="p-0 m-0">إضافة ملاحظة</p>
                                <span>{{ lastValue }}</span>
                                <hr class="border-white m-2 p-0" />
                                <img
                                  @click="
                                    openCommentsec(
                                      (payload = {
                                        name: 'aFutureyears' + `${row.item.id}`,
                                        section: 'GFS',
                                      }),
                                      (row = row.item)
                                    )
                                  "
                                  src="/images/icons/comment.png"
                                />
                              </b-tooltip>
                              <img
                                v-if="
                                  checkCommented(
                                    'aFutureyears' + `${row.item.id}`
                                  )
                                "
                                class="h-75 pl-1"
                                @click="hideComment()"
                                src="/images/icons/chat_bubble.png"
                              />
                              <span
                                class="m-0"
                                :class="
                                  commentedFeild ==
                                  'aFutureyears' + `${row.item.id}`
                                    ? 'HighlightCell'
                                    : null ||
                                      (Highlight &&
                                      matchYearlySave(
                                        row,
                                        (name = 'aFutureyears')
                                      ) != null
                                        ? 'showHighlightCell'
                                        : null)
                                "
                                @mouseenter="
                                  mouseHover('aFutureyears' + `${row.item.id}`),
                                    lastYearlySave(row, (name = 'aFutureyears'))
                                "
                                @mouseleave="mouseLeave()"
                                :id="'aFutureyears' + `${row.item.id}`"
                              >
                                {{ row.item.aFutureyears }}
                              </span>
                            </template>
                            <template v-slot:cell(total)="row">
                              <b-tooltip
                                :id="'ATotal' + `${row.item.id}`"
                                :target="'ATotal' + `${row.item.id}`"
                                placement="left"
                              >
                                <p class="p-0 m-0">إضافة ملاحظة</p>
                                <span>{{ lastValue }}</span>
                                <hr class="border-white m-2 p-0" />
                                <img
                                  @click="
                                    openCommentsec(
                                      (payload = {
                                        name: 'ATotal' + `${row.item.id}`,
                                        section: 'GFS',
                                      }),
                                      (row = row.item)
                                    )
                                  "
                                  src="/images/icons/comment.png"
                                />
                              </b-tooltip>
                              <img
                                v-if="
                                  checkCommented('ATotal' + `${row.item.id}`)
                                "
                                class="h-75 pl-1"
                                @click="hideComment()"
                                src="/images/icons/chat_bubble.png"
                              />
                              <span
                                class="m-0 overflow-wrap"
                                :class="
                                  commentedFeild == 'ATotal' + `${row.item.id}`
                                    ? 'HighlightCell'
                                    : null ||
                                      (Highlight &&
                                      matchYearlySave(row, (name = 'ATotal')) !=
                                        null
                                        ? 'showHighlightCell'
                                        : null)
                                "
                                @mouseenter="
                                  mouseHover('ATotal' + `${row.item.id}`),
                                    lastYearlySave(row, (name = 'ATotal'))
                                "
                                @mouseleave="mouseLeave()"
                                :id="'ATotal' + `${row.item.id}`"
                              >
                                {{ calculateAchivedTotal(row.item) }}
                              </span>
                            </template>
                            <template v-slot:custom-foot>
                              <!-- You can customize this however you want, this is just as an example -->
                              <b-tr>
                                <b-td class="font-weight-bold">{{
                                  $t("Total")
                                }}</b-td>
                                <b-td>
                                  <b-tooltip
                                    :id="'yearA2019'"
                                    :target="'yearA2019'"
                                    placement="left"
                                  >
                                    <p class="p-0 m-0">إضافة ملاحظة</p>
                                    <span>{{ lastValue }}</span>
                                    <hr class="border-white m-2 p-0" />
                                    <img
                                      @click="
                                        openCommentsec(
                                          (payload = {
                                            name: 'yearA2019',
                                            section: 'GFS',
                                          })
                                        )
                                      "
                                      src="/images/icons/comment.png"
                                    />
                                  </b-tooltip>
                                  <img
                                    v-if="checkCommented('yearA2019')"
                                    class="h-75 pl-1"
                                    @click="hideComment()"
                                    src="/images/icons/chat_bubble.png"
                                  />
                                  <span
                                    class="m-0 overflow-wrap"
                                    :class="
                                      commentedFeild == 'yearA2019'
                                        ? 'HighlightCell'
                                        : null
                                    "
                                    @mouseenter="mouseHover('yearA2019')"
                                    @mouseleave="mouseLeave()"
                                    :id="'yearA2019'"
                                  >
                                    {{ calculateAchivedSaving("yearA2019") }}
                                  </span>
                                </b-td>
                                <b-td>
                                  <b-tooltip
                                    :id="'yearA2020'"
                                    :target="'yearA2020'"
                                    placement="left"
                                  >
                                    <p class="p-0 m-0">إضافة ملاحظة</p>
                                    <span>{{ lastValue }}</span>
                                    <hr class="border-white m-2 p-0" />
                                    <img
                                      @click="
                                        openCommentsec(
                                          (payload = {
                                            name: 'yearA2020',
                                            section: 'GFS',
                                          })
                                        )
                                      "
                                      src="/images/icons/comment.png"
                                    />
                                  </b-tooltip>
                                  <img
                                    v-if="checkCommented('yearA2020')"
                                    class="h-75 pl-1"
                                    @click="hideComment()"
                                    src="/images/icons/chat_bubble.png"
                                  />
                                  <span
                                    class="m-0 overflow-wrap"
                                    :class="
                                      commentedFeild == 'yearA2020'
                                        ? 'HighlightCell'
                                        : null
                                    "
                                    @mouseenter="mouseHover('yearA2020')"
                                    @mouseleave="mouseLeave()"
                                    :id="'yearA2020'"
                                  >
                                    {{ calculateAchivedSaving("yearA2020") }}
                                  </span>
                                </b-td>
                                <b-td>
                                  <b-tooltip
                                    :id="'yearA2021'"
                                    :target="'yearA2021'"
                                    placement="left"
                                  >
                                    <p class="p-0 m-0">إضافة ملاحظة</p>
                                    <span>{{ lastValue }}</span>
                                    <hr class="border-white m-2 p-0" />
                                    <img
                                      @click="
                                        openCommentsec(
                                          (payload = {
                                            name: 'yearA2021',
                                            section: 'GFS',
                                          })
                                        )
                                      "
                                      src="/images/icons/comment.png"
                                    />
                                  </b-tooltip>
                                  <img
                                    v-if="checkCommented('yearA2021')"
                                    class="h-75 pl-1"
                                    @click="hideComment()"
                                    src="/images/icons/chat_bubble.png"
                                  />
                                  <span
                                    class="m-0 overflow-wrap"
                                    :class="
                                      commentedFeild == 'yearA2021'
                                        ? 'HighlightCell'
                                        : null
                                    "
                                    @mouseenter="mouseHover('yearA2021')"
                                    @mouseleave="mouseLeave()"
                                    :id="'yearA2021'"
                                  >
                                    {{ calculateAchivedSaving("yearA2021") }}
                                  </span>
                                </b-td>
                                <b-td>
                                  <b-tooltip
                                    :id="'yearA2022'"
                                    :target="'yearA2022'"
                                    placement="left"
                                  >
                                    <p class="p-0 m-0">إضافة ملاحظة</p>
                                    <span>{{ lastValue }}</span>
                                    <hr class="border-white m-2 p-0" />
                                    <img
                                      @click="
                                        openCommentsec(
                                          (payload = {
                                            name: 'yearA2022',
                                            section: 'GFS',
                                          })
                                        )
                                      "
                                      src="/images/icons/comment.png"
                                    />
                                  </b-tooltip>
                                  <img
                                    v-if="checkCommented('yearA2022')"
                                    class="h-75 pl-1"
                                    @click="hideComment()"
                                    src="/images/icons/chat_bubble.png"
                                  />
                                  <span
                                    class="m-0 overflow-wrap"
                                    :class="
                                      commentedFeild == 'yearA2022'
                                        ? 'HighlightCell'
                                        : null
                                    "
                                    @mouseenter="mouseHover('yearA2022')"
                                    @mouseleave="mouseLeave()"
                                    :id="'yearA2022'"
                                  >
                                    {{ calculateAchivedSaving("yearA2022") }}
                                  </span>
                                </b-td>
                                <b-td>
                                  <b-tooltip
                                    :id="'yearA2023'"
                                    :target="'yearA2023'"
                                    placement="left"
                                  >
                                    <p class="p-0 m-0">إضافة ملاحظة</p>
                                    <span>{{ lastValue }}</span>
                                    <hr class="border-white m-2 p-0" />
                                    <img
                                      @click="
                                        openCommentsec(
                                          (payload = {
                                            name: 'yearA2023',
                                            section: 'GFS',
                                          })
                                        )
                                      "
                                      src="/images/icons/comment.png"
                                    />
                                  </b-tooltip>
                                  <img
                                    v-if="checkCommented('yearA2023')"
                                    class="h-75 pl-1"
                                    @click="hideComment()"
                                    src="/images/icons/chat_bubble.png"
                                  />
                                  <span
                                    class="m-0 overflow-wrap"
                                    :class="
                                      commentedFeild == 'yearA2023'
                                        ? 'HighlightCell'
                                        : null
                                    "
                                    @mouseenter="mouseHover('yearA2023')"
                                    @mouseleave="mouseLeave()"
                                    :id="'yearA2023'"
                                  >
                                    {{ calculateAchivedSaving("yearA2023") }}
                                  </span>
                                </b-td>
                                <b-td>
                                  <b-tooltip
                                    :id="'aFutureyears'"
                                    :target="'aFutureyears'"
                                    placement="left"
                                  >
                                    <p class="p-0 m-0">إضافة ملاحظة</p>
                                    <span>{{ lastValue }}</span>
                                    <hr class="border-white m-2 p-0" />
                                    <img
                                      @click="
                                        openCommentsec(
                                          (payload = {
                                            name: 'aFutureyears',
                                            section: 'GFS',
                                          })
                                        )
                                      "
                                      src="/images/icons/comment.png"
                                    />
                                  </b-tooltip>
                                  <img
                                    v-if="checkCommented('aFutureyears')"
                                    class="h-75 pl-1"
                                    @click="hideComment()"
                                    src="/images/icons/chat_bubble.png"
                                  />
                                  <span
                                    class="m-0 overflow-wrap"
                                    :class="
                                      commentedFeild == 'aFutureyears'
                                        ? 'HighlightCell'
                                        : null
                                    "
                                    @mouseenter="mouseHover('aFutureyears')"
                                    @mouseleave="mouseLeave()"
                                    :id="'aFutureyears'"
                                  >
                                    {{ calculateAchivedSaving("aFutureyears") }}
                                  </span>
                                </b-td>
                                <b-td>
                                  <b-tooltip
                                    :id="'aAllTotal'"
                                    :target="'aAllTotal'"
                                    placement="left"
                                  >
                                    <p class="p-0 m-0">إضافة ملاحظة</p>
                                    <span>{{ lastValue }}</span>
                                    <hr class="border-white m-2 p-0" />
                                    <img
                                      @click="
                                        openCommentsec(
                                          (payload = {
                                            name: 'aAllTotal',
                                            section: 'GFS',
                                          })
                                        )
                                      "
                                      src="/images/icons/comment.png"
                                    />
                                  </b-tooltip>
                                  <img
                                    v-if="checkCommented('aAllTotal')"
                                    class="h-75 pl-1"
                                    @click="hideComment()"
                                    src="/images/icons/chat_bubble.png"
                                  />
                                  <span
                                    class="m-0 overflow-wrap"
                                    :class="
                                      commentedFeild == 'aAllTotal'
                                        ? 'HighlightCell'
                                        : null
                                    "
                                    @mouseenter="mouseHover('aAllTotal')"
                                    @mouseleave="mouseLeave()"
                                    :id="'aAllTotal'"
                                  >
                                    {{ calculateASavingNew() }}
                                  </span>
                                </b-td>
                              </b-tr>
                            </template>
                          </b-table>
                        </div>
                      </md-card>
                    </div>

                    <!-- Calculations Of Savings -->
                    <div class="scrollspy" :id="$t('calculationofsavings')">
                      <md-card class="p-4 mb-5 custom-card">
                        <md-card-header>
                          <h3
                            class="font-weight-bold d-inline-block text-color"
                          >
                            {{ $t("calculationofsavings") }}
                          </h3>
                        </md-card-header>
                        <md-card-content>
                          <b-row class="mb-3">
                            <b-col md="12">
                              <div>
                                <b-tooltip
                                  id="calOfSaving"
                                  target="calOfSaving"
                                  placement="left"
                                >
                                  <p class="p-0 m-0">إضافة ملاحظة</p>
                                  <span>{{
                                    oldcalculationSaving.calOfSaving != null
                                      ? calculationSaving.calOfSaving
                                      : null
                                  }}</span>
                                  <hr class="border-white m-2 p-0" />
                                  <img
                                    @click="
                                      openCommentsec(
                                        (payload = {
                                          name: 'calOfSaving',
                                          section: 'calOfSaving',
                                        })
                                      )
                                    "
                                    src="/images/icons/comment.png"
                                  />
                                </b-tooltip>
                                <span
                                  @mouseenter="mouseHover('calOfSaving')"
                                  @mouseleave="mouseLeave()"
                                  class="font-weight-bolder label-font pl-1 pr-1 review-label padding-right"
                                  :class="
                                    commentedFeild == 'calOfSaving'
                                      ? 'Highlightborderd'
                                      : null ||
                                        (Highlight &&
                                        oldcalculationSaving.calOfSaving !==
                                          calculationSaving.calOfSaving
                                          ? 'showHighlight'
                                          : null)
                                  "
                                  id="calOfSaving"
                                  >{{ $t("calculationofsavings") }}</span
                                >
                                <img
                                  v-if="checkCommented('calOfSaving')"
                                  class="chat-bubble pr-1"
                                  @click="hideComment()"
                                  src="/images/icons/chat_bubble.png"
                                />
                                <p
                                  class="md-subheading pr-1 pl-1 font-weight-bold fit-content"
                                >
                                  {{ calculationSaving.calOfSaving }}
                                </p>
                                <b-tooltip
                                  id="uploadCalcOfSavings"
                                  target="uploadCalcOfSavings"
                                  placement="left"
                                >
                                  <p class="p-0 m-0">إضافة ملاحظة</p>
                                  <hr class="border-white m-2 p-0" />
                                  <img
                                    @click="
                                      openCommentsec(
                                        (payload = {
                                          name: 'uploadCalcOfSavings',
                                          section: 'calOfSaving',
                                        })
                                      )
                                    "
                                    src="/images/icons/comment.png"
                                  />
                                </b-tooltip>
                                <span
                                  id="uploadCalcOfSavings"
                                  @mouseenter="
                                    mouseHover('uploadCalcOfSavings')
                                  "
                                  @mouseleave="mouseLeave()"
                                  :class="{ 'padding-none': hover }"
                                  class="font-weight-bolder label-font pl-2 review-label"
                                >
                                  المرفق
                                </span>
                                <b-table
                                  class="customTable pt-3 pl-4"
                                  bordered
                                  :responsive="true"
                                  :items="fileUrl"
                                  :fields="generalCommentFileUrlFieldsNotDelete"
                                >
                                  <template v-slot:cell(sr)="row">{{
                                    row.index + 1
                                  }}</template>
                                  <template v-slot:cell(fileName)="row">
                                    <b-tooltip
                                      :id="'fileName' + `${row.item.id}`"
                                      :target="'fileName' + `${row.item.id}`"
                                      placement="left"
                                    >
                                      <p class="p-0 m-0">إضافة ملاحظة</p>
                                      <hr class="border-white m-2 p-0" />
                                      <img
                                        @click="
                                          openCommentsec(
                                            (payload = {
                                              name:
                                                'fileName' + `${row.item.id}`,
                                              section: 'calOfSaving',
                                            }),
                                            (row = row.item)
                                          )
                                        "
                                        src="/images/icons/comment.png"
                                      />
                                    </b-tooltip>
                                    <img
                                      v-if="
                                        checkCommented(
                                          'fileName' + `${row.item.id}`
                                        )
                                      "
                                      class="chat-bubble pr-1"
                                      @click="hideComment()"
                                      src="/images/icons/chat_bubble.png"
                                    />
                                    <div
                                      class="d-inline-block pr-3"
                                      :class="
                                        commentedFeild ==
                                        'fileName' + `${row.item.id}`
                                          ? 'HighlightCell'
                                          : null
                                      "
                                      :id="'fileName' + `${row.item.id}`"
                                      v-if="row.item.path"
                                      @mouseenter="
                                        mouseHover(
                                          'fileName' + `${row.item.id}`
                                        )
                                      "
                                      @mouseleave="mouseLeave()"
                                    >
                                      {{ row.item.path | trimImageName }}
                                    </div>
                                    <div
                                      class="d-inline-block pr-3"
                                      :class="
                                        commentedFeild ==
                                        'fileName' + `${row.item.id}`
                                          ? 'HighlightCell'
                                          : null
                                      "
                                      :id="'fileName' + `${row.item.id}`"
                                      v-if="!row.item.path"
                                      @mouseenter="
                                        mouseHover(
                                          'fileName' + `${row.item.id}`
                                        )
                                      "
                                      @mouseleave="mouseLeave()"
                                    >
                                      {{ row.item.name }}
                                    </div>
                                  </template>
                                  <template v-slot:cell(type)="images">
                                    <b-tooltip
                                      :id="'type' + `${images.item.id}`"
                                      :target="'type' + `${images.item.id}`"
                                      placement="left"
                                    >
                                      <p class="p-0 m-0">إضافة ملاحظة</p>
                                      <hr class="border-white m-2 p-0" />
                                      <img
                                        @click="
                                          openCommentsec(
                                            (payload = {
                                              name:
                                                'type' + `${images.item.id}`,
                                              section: 'calOfSaving',
                                            }),
                                            (images = images.item)
                                          )
                                        "
                                        src="/images/icons/comment.png"
                                      />
                                    </b-tooltip>
                                    <img
                                      v-if="
                                        checkCommented(
                                          'type' + `${images.item.id}`
                                        )
                                      "
                                      class="chat-bubble pr-1"
                                      @click="hideComment()"
                                      src="/images/icons/chat_bubble.png"
                                    />
                                    <a
                                      :id="'type' + `${images.item.id}`"
                                      @mouseenter="
                                        mouseHover('type' + `${images.item.id}`)
                                      "
                                      @mouseleave="mouseLeave()"
                                      v-if="images.item.link"
                                      :href="images.item.link"
                                      target="_blank"
                                      style="position: relative"
                                    >
                                      <md-avatar
                                        class="md-avatar-icon"
                                        v-if="images.item.type === 'pdf'"
                                      >
                                        <img
                                          class
                                          src="/images/icons/pdf.png"
                                          alt="Avatar"
                                        />
                                      </md-avatar>
                                      <md-avatar
                                        class
                                        v-else-if="
                                          images.item.type === 'msword'
                                        "
                                      >
                                        <img
                                          src="/images/icons/word.png"
                                          alt="Avatar"
                                        />
                                      </md-avatar>
                                      <md-avatar
                                        class
                                        v-else-if="images.item.type === 'docs'"
                                      >
                                        <img
                                          src="/images/icons/word.png"
                                          alt="Avatar"
                                        />
                                      </md-avatar>
                                      <md-avatar
                                        class
                                        v-else-if="images.item.type === 'xlm'"
                                      >
                                        <img
                                          src="/images/icons/excel.png"
                                          alt="Avatar"
                                        />
                                      </md-avatar>
                                      <md-avatar class v-else>
                                        <img
                                          src="/images/icons/generic-attachment.png"
                                          alt="Avatar"
                                        />
                                      </md-avatar>
                                    </a>
                                    <a
                                      :id="'type' + `${images.item.id}`"
                                      @mouseenter="
                                        mouseHover('type' + `${images.item.id}`)
                                      "
                                      @mouseleave="mouseLeave()"
                                      v-if="images.item.path"
                                      :href="
                                        'http://3.124.65.120' + images.item.path
                                      "
                                      target="_blank"
                                      style="position: relative"
                                    >
                                      <md-avatar
                                        class
                                        v-if="
                                          trimImage(images.item.path) === 'pdf'
                                            ? true
                                            : false
                                        "
                                      >
                                        <img
                                          src="/images/icons/pdf.png"
                                          alt="Avatar"
                                        />
                                      </md-avatar>
                                      <md-avatar
                                        class
                                        v-else-if="
                                          trimImage(images.item.path) ===
                                          'msword'
                                            ? true
                                            : false
                                        "
                                      >
                                        <img
                                          src="/images/icons/word.png"
                                          alt="Avatar"
                                        />
                                      </md-avatar>
                                      <md-avatar
                                        class
                                        v-else-if="
                                          trimImage(images.item.path) === 'docs'
                                            ? true
                                            : false
                                        "
                                      >
                                        <img
                                          src="/images/icons/word.png"
                                          alt="Avatar"
                                        />
                                      </md-avatar>
                                      <md-avatar
                                        class
                                        v-else-if="
                                          trimImage(images.item.path) === 'xlm'
                                            ? true
                                            : false
                                        "
                                      >
                                        <img
                                          src="/images/icons/excel.png"
                                          alt="Avatar"
                                        />
                                      </md-avatar>
                                      <md-avatar class v-else>
                                        <img
                                          src="/images/icons/generic-attachment.png"
                                          alt="Avatar"
                                        />
                                      </md-avatar>
                                    </a>
                                  </template>
                                </b-table>
                              </div>
                            </b-col>
                          </b-row>
                        </md-card-content>
                      </md-card>
                    </div>

                    <!-- implementation Plan -->
                    <div class="scrollspy" :id="$t('implementationsplan')">
                      <md-card
                        class="custom-card mb-5 scrollspy"
                        :id="$t('implementationsplan')"
                      >
                        <div class="pr-4 pt-4">
                          <p class="m-1 text-color h3 font-weight-bold">
                            {{ $t("implementationsplan") }}
                          </p>
                        </div>
                        <b-table
                          class="mt-4 pl-4 pr-4 pb-4"
                          :bordered="true"
                          :responsive="true"
                          :items="mileStones"
                          :fields="ImplementationPlanFields"
                        >
                          <template v-slot:cell(name)="row">
                            <b-tooltip
                              :id="'name' + `${row.item.id}`"
                              :target="'name' + `${row.item.id}`"
                              placement="left"
                            >
                              <p class="p-0 m-0">إضافة ملاحظة</p>
                              <span>{{ lastValue }}</span>
                              <hr class="border-white m-2 p-0" />
                              <img
                                @click="
                                  openCommentsec(
                                    (payload = {
                                      name: 'name' + `${row.item.id}`,
                                      section: 'milestone',
                                    }),
                                    (row = row.item)
                                  )
                                "
                                src="/images/icons/comment.png"
                              />
                            </b-tooltip>
                            <img
                              v-if="checkCommented('name' + `${row.item.id}`)"
                              class="chat-bubble pr-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="m-0"
                              :class="
                                commentedFeild == 'name' + `${row.item.id}`
                                  ? 'HighlightCell'
                                  : null ||
                                    (Highlight &&
                                    matchMileStone(row, (name = 'name')) != null
                                      ? 'showHighlightCell'
                                      : null)
                              "
                              @mouseenter="
                                mouseHover('name' + `${row.item.id}`),
                                  lastMileStone(row, (name = 'name'))
                              "
                              @mouseleave="mouseLeave()"
                              :id="'name' + `${row.item.id}`"
                            >
                              {{ row.item.name }}
                            </span>
                          </template>
                          <template v-slot:cell(targetSDate)="row">
                            <b-tooltip
                              :id="'targetSDate' + `${row.item.id}`"
                              :target="'targetSDate' + `${row.item.id}`"
                              placement="left"
                            >
                              <p class="p-0 m-0">إضافة ملاحظة</p>
                              <span>{{ lastValue }}</span>
                              <hr class="border-white m-2 p-0" />
                              <img
                                @click="
                                  openCommentsec(
                                    (payload = {
                                      name: 'targetSDate' + `${row.item.id}`,
                                      section: 'milestone',
                                    }),
                                    (row = row.item)
                                  )
                                "
                                src="/images/icons/comment.png"
                              />
                            </b-tooltip>
                            <img
                              v-if="
                                checkCommented('targetSDate' + `${row.item.id}`)
                              "
                              class="chat-bubble pr-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="m-0"
                              :class="
                                commentedFeild ==
                                'targetSDate' + `${row.item.id}`
                                  ? 'HighlightCell'
                                  : null ||
                                    (Highlight &&
                                    matchMileStone(
                                      row,
                                      (name = 'targetSDate')
                                    ) != null
                                      ? 'showHighlightCell'
                                      : null)
                              "
                              @mouseenter="
                                mouseHover('targetSDate' + `${row.item.id}`),
                                  lastMileStone(row, (name = 'targetSDate'))
                              "
                              @mouseleave="mouseLeave()"
                              :id="'targetSDate' + `${row.item.id}`"
                            >
                              {{
                                row.item.targetSDate == "0001-01-01" ||
                                row.item.targetSDate == null
                                  ? "N/A"
                                  : formatDateMilestone(row.item.targetSDate)
                              }}
                            </span>
                          </template>
                          <template v-slot:cell(targetEDate)="row">
                            <b-tooltip
                              :id="'targetEDate' + `${row.item.id}`"
                              :target="'targetEDate' + `${row.item.id}`"
                              placement="left"
                            >
                              <p class="p-0 m-0">إضافة ملاحظة</p>
                              <span>{{ lastValue }}</span>
                              <hr class="border-white m-2 p-0" />
                              <img
                                @click="
                                  openCommentsec(
                                    (payload = {
                                      name: 'targetEDate' + `${row.item.id}`,
                                      section: 'milestone',
                                    }),
                                    (row = row.item)
                                  )
                                "
                                src="/images/icons/comment.png"
                              />
                            </b-tooltip>
                            <img
                              v-if="
                                checkCommented('targetEDate' + `${row.item.id}`)
                              "
                              class="chat-bubble pr-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="m-0"
                              :class="
                                commentedFeild ==
                                'targetEDate' + `${row.item.id}`
                                  ? 'HighlightCell'
                                  : null ||
                                    (Highlight &&
                                    matchMileStone(
                                      row,
                                      (name = 'targetEDate')
                                    ) != null
                                      ? 'showHighlightCell'
                                      : null)
                              "
                              @mouseenter="
                                mouseHover('targetEDate' + `${row.item.id}`),
                                  lastMileStone(row, (name = 'targetEDate'))
                              "
                              @mouseleave="mouseLeave()"
                              :id="'targetEDate' + `${row.item.id}`"
                            >
                              {{
                                row.item.targetEDate == "0001-01-01" ||
                                row.item.targetEDate == null
                                  ? "N/A"
                                  : formatDateMilestone(row.item.targetEDate)
                              }}
                            </span>
                          </template>
                          <template v-slot:cell(actualSDate)="row">
                            <b-tooltip
                              :id="'actualSDate' + `${row.item.id}`"
                              :target="'actualSDate' + `${row.item.id}`"
                              placement="left"
                            >
                              <p class="p-0 m-0">إضافة ملاحظة</p>
                              <span>{{ lastValue }}</span>
                              <hr class="border-white m-2 p-0" />
                              <img
                                @click="
                                  openCommentsec(
                                    (payload = {
                                      name: 'actualSDate' + `${row.item.id}`,
                                      section: 'milestone',
                                    }),
                                    (row = row.item)
                                  )
                                "
                                src="/images/icons/comment.png"
                              />
                            </b-tooltip>
                            <img
                              v-if="
                                checkCommented('actualSDate' + `${row.item.id}`)
                              "
                              class="chat-bubble pr-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="m-0"
                              :class="
                                commentedFeild ==
                                'actualSDate' + `${row.item.id}`
                                  ? 'HighlightCell'
                                  : null ||
                                    (Highlight &&
                                    matchMileStone(
                                      row,
                                      (name = 'actualSDate')
                                    ) != null
                                      ? 'showHighlightCell'
                                      : null)
                              "
                              @mouseenter="
                                mouseHover('actualSDate' + `${row.item.id}`),
                                  lastMileStone(row, (name = 'actualSDate'))
                              "
                              @mouseleave="mouseLeave()"
                              :id="'actualSDate' + `${row.item.id}`"
                            >
                              {{
                                row.item.actualSDate == "0001-01-01" ||
                                row.item.actualSDate == null
                                  ? "N/A"
                                  : formatDateMilestone(row.item.actualSDate)
                              }}
                            </span>
                          </template>
                          <template v-slot:cell(actualEDate)="row">
                            <b-tooltip
                              :id="'actualEDate' + `${row.item.id}`"
                              :target="'actualEDate' + `${row.item.id}`"
                              placement="left"
                            >
                              <p class="p-0 m-0">إضافة ملاحظة</p>
                              <span>{{ lastValue }}</span>
                              <hr class="border-white m-2 p-0" />
                              <img
                                @click="
                                  openCommentsec(
                                    (payload = {
                                      name: 'actualEDate' + `${row.item.id}`,
                                      section: 'milestone',
                                    }),
                                    (row = row.item)
                                  )
                                "
                                src="/images/icons/comment.png"
                              />
                            </b-tooltip>
                            <img
                              v-if="
                                checkCommented('actualEDate' + `${row.item.id}`)
                              "
                              class="chat-bubble pr-1"
                              @click="hideComment()"
                              src="/images/icons/chat_bubble.png"
                            />
                            <span
                              class="m-0"
                              :class="
                                commentedFeild ==
                                'actualEDate' + `${row.item.id}`
                                  ? 'HighlightCell'
                                  : null ||
                                    (Highlight &&
                                    matchMileStone(
                                      row,
                                      (name = 'actualEDate')
                                    ) != null
                                      ? 'showHighlightCell'
                                      : null)
                              "
                              @mouseenter="
                                mouseHover('actualEDate' + `${row.item.id}`),
                                  lastMileStone(row, (name = 'actualEDate'))
                              "
                              @mouseleave="mouseLeave()"
                              :id="'actualEDate' + `${row.item.id}`"
                            >
                              {{
                                row.item.actualEDate == "0001-01-01" ||
                                row.item.actualEDate == null
                                  ? "N/A"
                                  : formatDateMilestone(row.item.actualEDate)
                              }}
                            </span>
                          </template>
                          <template v-slot:cell(milstoneStatus)="row">
                            <div :id="'milstoneStatus' + `${row.item.id}`">
                              <div
                                v-if="row.item.milstoneStatus === 'notstarted'"
                                class="grey mx-auto"
                              ></div>
                              <div
                                v-if="row.item.milstoneStatus === 'inprogress'"
                                class="green mx-auto"
                              ></div>
                              <div
                                v-if="row.item.milstoneStatus === 'completed'"
                                class="green mx-auto"
                              ></div>
                              <div
                                v-if="row.item.milstoneStatus === 'yellow'"
                                class="yellow mx-auto"
                              ></div>
                              <div
                                v-if="row.item.milstoneStatus == 'red'"
                                class="red mx-auto"
                              ></div>
                            </div>
                          </template>
                        </b-table>
                        <div class="pr-4 mb-4">
                          <b-row class="mb-3">
                            <b-col md="12">
                              <b-tooltip
                                id="summeryThisMonth"
                                target="summeryThisMonth"
                                placement="left"
                              >
                                <p class="p-0 m-0">إضافة ملاحظة</p>
                                <span>{{
                                  oldsummaryOfInitiativeForm.summeryThisMonth !==
                                  summaryOfInitiativeForm.summeryThisMonth
                                    ? oldsummaryOfInitiativeForm.summeryThisMonth
                                    : null
                                }}</span>
                                <hr class="border-white m-2 p-0" />
                                <img
                                  @click="
                                    openCommentsec(
                                      (payload = {
                                        name: 'summeryThisMonth',
                                        section: 'SummaryOfImplementationPlan',
                                      })
                                    )
                                  "
                                  src="/images/icons/comment.png"
                                />
                              </b-tooltip>

                              <span
                                @mouseenter="mouseHover('summeryThisMonth')"
                                @mouseleave="mouseLeave()"
                                class="font-weight-bolder label-font pl-1 review-label pr-1 padding-right"
                                :class="
                                  commentedFeild == 'summeryThisMonth'
                                    ? 'Highlightborderd'
                                    : null ||
                                      (Highlight &&
                                      summaryOfInitiativeForm.summeryThisMonth !==
                                        oldsummaryOfInitiativeForm.summeryThisMonth
                                        ? 'showHighlight'
                                        : null)
                                "
                                id="summeryThisMonth"
                                >{{
                                  $t(
                                    "SummaryOfWhatHasBeenAchievedThisMonth(Optional)"
                                  )
                                }}</span
                              >
                              <img
                                v-if="checkCommented('summeryThisMonth')"
                                class="chat-bubble pr-1"
                                @click="hideComment()"
                                src="/images/icons/chat_bubble.png"
                              />
                              <p
                                class="md-subheading  font-weight-bold fit-content pl-4"
                              >
                                {{ summaryOfInitiativeForm.summeryThisMonth }}
                              </p>
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col md="12">
                              <b-tooltip
                                id="planNextMonth"
                                target="planNextMonth"
                                placement="left"
                              >
                                <p class="p-0 m-0">إضافة ملاحظة</p>
                                <span>{{
                                  oldsummaryOfInitiativeForm.planNextMonth !==
                                  summaryOfInitiativeForm.planNextMonth
                                    ? oldsummaryOfInitiativeForm.planNextMonth
                                    : null
                                }}</span>
                                <hr class="border-white m-2 p-0" />
                                <img
                                  @click="
                                    openCommentsec(
                                      (payload = {
                                        name: 'planNextMonth',
                                        section: 'SummaryOfImplementationPlan',
                                      })
                                    )
                                  "
                                  src="/images/icons/comment.png"
                                />
                              </b-tooltip>
                              <span
                                @mouseenter="mouseHover('planNextMonth')"
                                @mouseleave="mouseLeave()"
                                class="font-weight-bolder label-font pl-1 review-label pr-1 padding-right"
                                :class="
                                  commentedFeild == 'planNextMonth'
                                    ? 'Highlightborderd'
                                    : null ||
                                      (Highlight &&
                                      summaryOfInitiativeForm.planNextMonth !==
                                        oldsummaryOfInitiativeForm.planNextMonth
                                        ? 'showHighlight'
                                        : null)
                                "
                                id="planNextMonth"
                                >{{
                                  $t(
                                    "SummaryOfAchievementsplannedforNextMonth(Optional)"
                                  )
                                }}</span
                              >
                              <img
                                v-if="checkCommented('planNextMonth')"
                                class="chat-bubble pr-1"
                                @click="hideComment()"
                                src="/images/icons/chat_bubble.png"
                              />
                              <p
                                class="md-subheading fit-content font-weight-bold pl-4"
                              >
                                {{ summaryOfInitiativeForm.planNextMonth }}
                              </p>
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col md="12" class="mt-2">
                              <b-tooltip
                                id="generalComment"
                                target="generalComment"
                                placement="left"
                              >
                                <p class="p-0 m-0">إضافة ملاحظة</p>
                                <span>{{
                                  oldsummaryOfInitiativeForm.generalComment !==
                                  summaryOfInitiativeForm.generalComment
                                    ? oldsummaryOfInitiativeForm.generalComment
                                    : null
                                }}</span>
                                <hr class="border-white m-2 p-0" />
                                <img
                                  @click="
                                    openCommentsec(
                                      (payload = {
                                        name: 'generalComment',
                                        section: 'SummaryOfImplementationPlan',
                                      })
                                    )
                                  "
                                  src="/images/icons/comment.png"
                                />
                              </b-tooltip>
                              <span
                                @mouseenter="mouseHover('generalComment')"
                                @mouseleave="mouseLeave()"
                                class="font-weight-bolder label-font pl-1 review-label pr-1 padding-right"
                                :class="
                                  commentedFeild == 'generalComment'
                                    ? 'Highlightborderd'
                                    : null ||
                                      (Highlight &&
                                      summaryOfInitiativeForm.generalComment !==
                                        oldsummaryOfInitiativeForm.generalComment
                                        ? 'showHighlight'
                                        : null)
                                "
                                id="generalComment"
                                >{{ $t("GeneralComment(Optional)") }}</span
                              >
                              <img
                                v-if="checkCommented('generalComment')"
                                class="chat-bubble pr-1"
                                @click="hideComment()"
                                src="/images/icons/chat_bubble.png"
                              />
                              <p
                                class="md-subheading fit-content font-weight-bold pl-4"
                              >
                                {{ summaryOfInitiativeForm.generalComment }}
                              </p>
                            </b-col>
                          </b-row>
                        </div>
                      </md-card>
                    </div>

                    <!-- Support Required  -->
                    <div class="scrollspy" :id="$t('supportRequired')">
                      <md-card class="p-4 mb-5 custom-card">
                        <md-card-header class="d-inline-flex p-0">
                          <h3 class="font-weight-bold text-color pr-1">
                            {{ $t("supportRequired") }}
                          </h3>
                        </md-card-header>
                        <md-card-content>
                          <b-row class="mb-3">
                            <b-col md="12" class="p-0">
                              <b-tooltip
                                id="supportType"
                                target="supportType"
                                placement="left"
                              >
                                <p class="p-0 m-0">إضافة ملاحظة</p>
                                <span>{{
                                  oldsupport.supportType !== support.supportType
                                    ? oldsupport.supportType
                                    : null
                                }}</span>
                                <hr class="border-white m-2 p-0" />
                                <img
                                  @click="
                                    openCommentsec(
                                      (payload = {
                                        name: 'supportType',
                                        section: 'SupportRequiredDescription',
                                      })
                                    )
                                  "
                                  src="/images/icons/comment.png"
                                />
                              </b-tooltip>
                              <span
                                @mouseenter="mouseHover('supportType')"
                                @mouseleave="mouseLeave()"
                                class="font-weight-bolder review-label pl-1 pr-1 label-font"
                                :class="
                                  commentedFeild == 'supportType'
                                    ? 'Highlightborderd'
                                    : null ||
                                      (Highlight &&
                                      support.supportType !==
                                        oldsupport.supportType
                                        ? 'showHighlight'
                                        : null)
                                "
                                id="supportType"
                                >{{ $t("supportType") }}</span
                              >
                              <img
                                v-if="checkCommented('supportType')"
                                class="chat-bubble pr-1"
                                @click="hideComment()"
                                src="/images/icons/chat_bubble.png"
                              />
                              <p
                                class="md-subheading font-weight-bold pr-1 fit-content"
                              >
                                {{ support.supportType }}
                              </p>
                            </b-col>
                          </b-row>
                          <b-row class="mb-3">
                            <b-col md="12" class="p-0">
                              <b-tooltip
                                id="SupportDescription"
                                target="SupportDescription"
                                placement="left"
                              >
                                <p class="p-0 m-0">إضافة ملاحظة</p>
                                <span>{{
                                  oldsupport.description !== support.description
                                    ? oldsupport.description
                                    : null
                                }}</span>
                                <hr class="border-white m-2 p-0" />
                                <img
                                  @click="
                                    openCommentsec(
                                      (payload = {
                                        name: 'SupportDescription',
                                        section: 'SupportRequiredDescription',
                                      })
                                    )
                                  "
                                  src="/images/icons/comment.png"
                                />
                              </b-tooltip>
                              <span
                                @mouseenter="mouseHover('SupportDescription')"
                                @mouseleave="mouseLeave()"
                                class="font-weight-bolder review-label pl-1 pr-1 label-font"
                                :class="
                                  commentedFeild == 'SupportDescription'
                                    ? 'Highlightborderd'
                                    : null ||
                                      (Highlight &&
                                      support.description !==
                                        oldsupport.description
                                        ? 'showHighlight'
                                        : null)
                                "
                                id="SupportDescription"
                                >{{ $t("SupportDescription") }}</span
                              >
                              <img
                                v-if="checkCommented('SupportDescription')"
                                class="chat-bubble pr-1"
                                @click="hideComment()"
                                src="/images/icons/chat_bubble.png"
                              />
                              <p
                                class="md-subheading pr-1 font-weight-bold fit-content"
                              >
                                {{ support.description }}
                              </p>
                            </b-col>
                          </b-row>
                        </md-card-content>
                      </md-card>
                    </div>

                    <!-- General Comment  -->
                    <div class="scrollspy" :id="$t('GeneralComment')">
                      <md-card class="p-4 mb-5 custom-card">
                        <md-card-header class="d-inline-flex">
                          <h3 class="font-weight-bold text-color">
                            {{ $t("GeneralComment") }}
                          </h3>
                        </md-card-header>
                        <md-card-content>
                          <b-tooltip
                            id="description"
                            target="description"
                            placement="left"
                          >
                            <p class="p-0 m-0">إضافة ملاحظة</p>
                            <span>{{
                              oldgeneralComment.description != null
                                ? generalComment.description
                                : null
                            }}</span>
                            <hr class="border-white m-2 p-0" />
                            <img
                              @click="
                                openCommentsec(
                                  (payload = {
                                    name: 'generalCommentdescription',
                                    id: null,
                                  })
                                )
                              "
                              src="/images/icons/comment.png"
                            />
                          </b-tooltip>
                          <span
                            @mouseenter="
                              mouseHover('generalCommentdescription')
                            "
                            @mouseleave="mouseLeave()"
                            class="font-weight-bolder label-font pl-1 pr-1 review-label padding-right"
                            :class="
                              commentedFeild == 'generalCommentdescription'
                                ? 'Highlightborderd'
                                : null ||
                                  (Highlight &&
                                  oldgeneralComment.description !==
                                    generalComment.description
                                    ? 'showHighlight'
                                    : null)
                            "
                            id="description"
                            >{{ $t("description") }}</span
                          >
                          <img
                            v-if="checkCommented('generalCommentdescription')"
                            class="chat-bubble pr-1"
                            @click="hideComment()"
                            src="/images/icons/chat_bubble.png"
                          />
                          <p
                            class="md-subheading pr-1 pl-1 font-weight-bold fit-content"
                          >
                            {{ generalComment.description }}
                          </p>
                          <b-row
                            v-if="
                              generalComment.uploadMinutesOfMeeting.length > 0
                            "
                          >
                            <b-col md="12" class="pr-2">
                              <span
                                class="font-weight-bolder review-label label-font pr-2"
                                id="uploadMinutesOfMeeting"
                                >المرفق</span
                              >
                              <b-table
                                class="customTable pt-3 pl-4"
                                bordered
                                :responsive="true"
                                :items="generalComment.uploadMinutesOfMeeting"
                                :fields="generalCommentFileUrlFieldsNotDelete"
                              >
                                <template v-slot:cell(sr)="row">{{
                                  row.index + 1
                                }}</template>
                                <template v-slot:cell(fileName)="row">
                                  <b-tooltip
                                    :id="'fileName' + `${row.item.id}`"
                                    :target="'fileName' + `${row.item.id}`"
                                    placement="left"
                                  >
                                    <p class="p-0 m-0">إضافة ملاحظة</p>
                                    <hr class="border-white m-2 p-0" />
                                    <img
                                      @click="
                                        openCommentsec(
                                          (payload = {
                                            name: 'fileName' + `${row.item.id}`,
                                            id: row.item.id,
                                          }),
                                          (row = row.item)
                                        )
                                      "
                                      src="/images/icons/comment.png"
                                    />
                                  </b-tooltip>
                                  <img
                                    v-if="
                                      checkCommented(
                                        'fileName' + `${row.item.id}`
                                      )
                                    "
                                    class="chat-bubble pr-1"
                                    @click="hideComment()"
                                    src="/images/icons/chat_bubble.png"
                                  />
                                  <div
                                    class="m-0 d-inline-block pr-3"
                                    :class="
                                      commentedFeild ==
                                      'fileName' + `${row.item.id}`
                                        ? 'HighlightCell'
                                        : null
                                    "
                                    @mouseenter="
                                      mouseHover('fileName' + `${row.item.id}`)
                                    "
                                    @mouseleave="mouseLeave()"
                                    v-if="row.item.path"
                                    :id="'fileName' + `${row.item.id}`"
                                  >
                                    {{ row.item.path | trimImageName }}
                                  </div>
                                  <div
                                    class="m-0 d-inline-block pr-3"
                                    :class="
                                      commentedFeild ==
                                      'fileName' + `${row.item.id}`
                                        ? 'HighlightCell'
                                        : null
                                    "
                                    @mouseenter="
                                      mouseHover('fileName' + `${row.item.id}`)
                                    "
                                    @mouseleave="mouseLeave()"
                                    v-if="!row.item.path"
                                    :id="'fileName' + `${row.item.id}`"
                                  >
                                    {{ row.item.name }}
                                  </div>
                                </template>
                                <template v-slot:cell(type)="images">
                                  <b-tooltip
                                    :id="'type' + `${images.item.id}`"
                                    :target="'type' + `${images.item.id}`"
                                    placement="left"
                                  >
                                    <p class="p-0 m-0">إضافة ملاحظة</p>
                                    <hr class="border-white m-2 p-0" />
                                    <img
                                      @click="
                                        openCommentsec(
                                          (payload = {
                                            name: 'type' + `${images.item.id}`,
                                            id: images.item.id,
                                          }),
                                          (images = images.item)
                                        )
                                      "
                                      src="/images/icons/comment.png"
                                    />
                                  </b-tooltip>
                                  <img
                                    v-if="
                                      checkCommented(
                                        'type' + `${images.item.id}`
                                      )
                                    "
                                    class="chat-bubble pr-1"
                                    @click="hideComment()"
                                    src="/images/icons/chat_bubble.png"
                                  />
                                  <a
                                    @mouseenter="
                                      mouseHover('type' + `${images.item.id}`)
                                    "
                                    @mouseleave="mouseLeave()"
                                    :id="'type' + `${images.item.id}`"
                                    v-if="images.item.link"
                                    :href="images.item.link"
                                    target="_blank"
                                    style="position: relative"
                                  >
                                    <md-avatar
                                      class="md-avatar-icon"
                                      v-if="images.item.type === 'pdf'"
                                    >
                                      <img
                                        class
                                        src="/images/icons/pdf.png"
                                        alt="Avatar"
                                      />
                                    </md-avatar>
                                    <md-avatar
                                      class
                                      v-else-if="images.item.type === 'msword'"
                                    >
                                      <img
                                        src="/images/icons/word.png"
                                        alt="Avatar"
                                      />
                                    </md-avatar>
                                    <md-avatar
                                      class
                                      v-else-if="images.item.type === 'docs'"
                                    >
                                      <img
                                        src="/images/icons/word.png"
                                        alt="Avatar"
                                      />
                                    </md-avatar>
                                    <md-avatar
                                      class
                                      v-else-if="images.item.type === 'xlm'"
                                    >
                                      <img
                                        src="/images/icons/excel.png"
                                        alt="Avatar"
                                      />
                                    </md-avatar>
                                    <md-avatar class v-else>
                                      <img
                                        src="/images/icons/generic-attachment.png"
                                        alt="Avatar"
                                      />
                                    </md-avatar>
                                    <!-- <p class="font-weight-bold">{{ images.name }}</p> -->
                                  </a>
                                  <a
                                    :id="'type' + `${images.item.id}`"
                                    @mouseenter="
                                      mouseHover('type' + `${images.item.id}`)
                                    "
                                    @mouseleave="mouseLeave()"
                                    v-if="images.item.path"
                                    :href="
                                      'http://3.124.65.120' + images.item.path
                                    "
                                    target="_blank"
                                    style="position: relative"
                                  >
                                    <md-avatar
                                      class
                                      v-if="
                                        trimImage(images.item.path) === 'pdf'
                                          ? true
                                          : false
                                      "
                                    >
                                      <img
                                        src="/images/icons/pdf.png"
                                        alt="Avatar"
                                      />
                                    </md-avatar>
                                    <md-avatar
                                      class
                                      v-else-if="
                                        trimImage(images.item.path) === 'msword'
                                          ? true
                                          : false
                                      "
                                    >
                                      <img
                                        src="/images/icons/word.png"
                                        alt="Avatar"
                                      />
                                    </md-avatar>
                                    <md-avatar
                                      class
                                      v-else-if="
                                        trimImage(images.item.path) === 'docs'
                                          ? true
                                          : false
                                      "
                                    >
                                      <img
                                        src="/images/icons/word.png"
                                        alt="Avatar"
                                      />
                                    </md-avatar>
                                    <md-avatar
                                      class
                                      v-else-if="
                                        trimImage(images.item.path) === 'xlm'
                                          ? true
                                          : false
                                      "
                                    >
                                      <img
                                        src="/images/icons/excel.png"
                                        alt="Avatar"
                                      />
                                    </md-avatar>
                                    <md-avatar class v-else>
                                      <img
                                        src="/images/icons/generic-attachment.png"
                                        alt="Avatar"
                                      />
                                    </md-avatar>
                                  </a>
                                </template>
                              </b-table>
                            </b-col>
                          </b-row>
                        </md-card-content>
                      </md-card>
                    </div>

                    <div
                      class="float-left"
                      style="margin-bottom: 250px !important;"
                    >
                      <button
                        style="width: 174px"
                        class="btn md-primary w-100  main-btn comman-gradient border-radius font-weight-bold"
                        @click="$router.go(-1)"
                      >
                        حفظ وعودة للتقرير الشهري
                      </button>
                    </div>
                    <!-- Summary Of Implementation Plan -->
                    <!-- <div
                      class="scrollspy"
                      :id="$t('summaryofimplementationplan')"
                    >
                      <md-card class="p-4 mb-5 custom-card">
                        <md-card-header class="d-inline-flex">
                          <h3 class="font-weight-bold text-color">
                            {{ $t("summaryofimplementationplan") }}
                          </h3>
                        </md-card-header>
                        <md-card-content>
                          <b-row class="mb-3">
                            <b-col md="12">
                              <b-tooltip
                                id="summeryThisMonth"
                                target="summeryThisMonth"
                                placement="left"
                              >
                                <p class="p-0 m-0">إضافة ملاحظة
</p>
                                <span>{{
                                  oldsummaryOfInitiativeForm.summeryThisMonth !==
                                  summaryOfInitiativeForm.summeryThisMonth
                                    ? oldsummaryOfInitiativeForm.summeryThisMonth
                                    : null
                                }}</span>
                                <hr class="border-white m-2 p-0" />
                                <img
                                  @click="
                                    openCommentsec(
                                      (payload = {
                                        name: 'summeryThisMonth',
                                        section: 'SummaryOfImplementationPlan',
                                      })
                                    )
                                  "
                                  src="/images/icons/comment.png"
                                />
                              </b-tooltip>

                              <span
                                @mouseenter="mouseHover('summeryThisMonth')"
                                @mouseleave="mouseLeave()"
                                class="font-weight-bolder label-font pl-1 review-label pr-1 padding-right"
                                :class="
                                  commentedFeild == 'summeryThisMonth'
                                    ? 'Highlightborderd'
                                    : null ||
                                      (Highlight &&
                                      summaryOfInitiativeForm.summeryThisMonth !==
                                        oldsummaryOfInitiativeForm.summeryThisMonth
                                        ? 'showHighlight'
                                        : null)
                                "
                                id="summeryThisMonth"
                                >{{
                                  $t(
                                    "SummaryOfWhatHasBeenAchievedThisMonth(Optional)"
                                  )
                                }}</span
                              >
                              <img
                                v-if="checkCommented('summeryThisMonth')"
                                class="chat-bubble pr-1"
                                src="/images/icons/chat_bubble.png"
                              />
                              <p
                                class="md-subheading pr-1 pl-2 font-weight-bold"
                              >
                                {{ summaryOfInitiativeForm.summeryThisMonth }}
                              </p>
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col md="12">
                              <b-tooltip
                                id="planNextMonth"
                                target="planNextMonth"
                                placement="left"
                              >
                                <p class="p-0 m-0">إضافة ملاحظة
</p>
                                <span>{{
                                  oldsummaryOfInitiativeForm.planNextMonth !==
                                  summaryOfInitiativeForm.planNextMonth
                                    ? oldsummaryOfInitiativeForm.planNextMonth
                                    : null
                                }}</span>
                                <hr class="border-white m-2 p-0" />
                                <img
                                  @click="
                                    openCommentsec(
                                      (payload = {
                                        name: 'planNextMonth',
                                        section: 'SummaryOfImplementationPlan',
                                      })
                                    )
                                  "
                                  src="/images/icons/comment.png"
                                />
                              </b-tooltip>
                              <span
                                @mouseenter="mouseHover('planNextMonth')"
                                @mouseleave="mouseLeave()"
                                class="font-weight-bolder label-font pl-1 review-label pr-1 padding-right"
                                :class="
                                  commentedFeild == 'planNextMonth'
                                    ? 'Highlightborderd'
                                    : null ||
                                      (Highlight &&
                                      summaryOfInitiativeForm.planNextMonth !==
                                        oldsummaryOfInitiativeForm.planNextMonth
                                        ? 'showHighlight'
                                        : null)
                                "
                                id="planNextMonth"
                                >{{
                                  $t(
                                    "SummaryOfAchievementsplannedforNextMonth(Optional)"
                                  )
                                }}</span
                              >
                              <img
                                v-if="checkCommented('planNextMonth')"
                                class="chat-bubble pr-1"
                                src="/images/icons/chat_bubble.png"
                              />
                              <p
                                class="md-subheading pl-2 pr-1 font-weight-bold"
                              >
                                {{ summaryOfInitiativeForm.planNextMonth }}
                              </p>
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col md="12" class="mt-2">
                              <b-tooltip
                                id="generalComment"
                                target="generalComment"
                                placement="left"
                              >
                                <p class="p-0 m-0">إضافة ملاحظة
</p>
                                <span>{{
                                  oldsummaryOfInitiativeForm.generalComment !==
                                  summaryOfInitiativeForm.generalComment
                                    ? oldsummaryOfInitiativeForm.generalComment
                                    : null
                                }}</span>
                                <hr class="border-white m-2 p-0" />
                                <img
                                  @click="
                                    openCommentsec(
                                      (payload = {
                                        name: 'generalComment',
                                        section: 'SummaryOfImplementationPlan',
                                      })
                                    )
                                  "
                                  src="/images/icons/comment.png"
                                />
                              </b-tooltip>
                              <span
                                @mouseenter="mouseHover('generalComment')"
                                @mouseleave="mouseLeave()"
                                class="font-weight-bolder label-font pl-1 review-label pr-1 padding-right"
                                :class="
                                  commentedFeild == 'generalComment'
                                    ? 'Highlightborderd'
                                    : null ||
                                      (Highlight &&
                                      summaryOfInitiativeForm.generalComment !==
                                        oldsummaryOfInitiativeForm.generalComment
                                        ? 'showHighlight'
                                        : null)
                                "
                                id="generalComment"
                                >{{ $t("GeneralComment(Optional)") }}</span
                              >
                              <img
                                v-if="checkCommented('generalComment')"
                                class="chat-bubble pr-1"
                                src="/images/icons/chat_bubble.png"
                              />
                              <p
                                class="md-subheading pl-2 pr-1 font-weight-bold"
                              >
                                {{ summaryOfInitiativeForm.generalComment }}
                              </p>
                            </b-col>
                          </b-row>
                        </md-card-content>
                      </md-card>
                    </div> -->

                    <!-- </div> -->
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>
    <div class="d-inline p-3 pt-3 sidebar">
      <!--------- comments  open and close ---->
      <img
        v-b-tooltip.hover.right
        title="إضافة ملاحظات"
        class="icon"
        @click="hideComment()"
        src="/images/svg/Chat.svg"
        alt
      />

      <!--------- activity logs comments open and close ---->
      <div class="mt-5">
        <img
          v-b-tooltip.hover.right
          title="سجل الأنشطة
"
          class="icon"
          @click="openActivityLog()"
          src="/images/file.png"
          alt
        />
      </div>

      <!--------- previous comments open and close ---->
      <div class="mt-5">
        <img
          v-b-tooltip.hover.right
          title=" الملاحظات السابقة
"
          class="icon"
          @click="lastCommentSection()"
          src="/images/icons/time.png"
          alt
        />
      </div>
      <!--------- feedback section open and close ---->
      <div class="mt-5" v-if="CseRole">
        <img
          v-b-tooltip.hover.right
          title="أسئلة التقييم
"
          class="icon"
          @click="FeedBackSection()"
          src="/images/icons/contract.png"
          alt
        />
      </div>

      <!--------- Comment Section ------>
      <div
        class="comments-section"
        :class="commentSection ? '' : 'comments-section-change'"
      >
        <b-row class="m-0">
          <div
            id="comment-wrapper"
            class="comment-wrapper"
            :class="{ 'comment-wrapper-height': openComment }"
          >
            <div v-for="(item, index) in userComments" :key="index">
              <div
                @mouseenter="(messageIcons = true), scrollSection(item)"
                @mouseleave="(messageIcons = false), scrollSection(item)"
                class="mb-4 mt-4"
                :id="'name' + `${item.commentedColumn}`"
                :class="
                  hoverColumn !== item.commentedColumn && hover
                    ? 'borderdClassOpacity'
                    : scrollCommentBox(hover, item)
                "
              >
                <div
                  class="user-image-circle mr-2 text-uppercase text-white text-center font-weight-bold"
                  :class="
                    item.loginRole == 'CSE Approver' ? 'CSE-background' : null
                  "
                >
                  {{ item | filterName() }}
                </div>
                <div
                  class="comment-text align-bottom"
                  :class="
                    hoverColumn === item.commentedColumn && hover
                      ? 'borderdClass'
                      : null ||
                        item.loginRole == 'CSE Approver' ||
                        item.loginRole == 'CSE Reviewer A' ||
                        item.loginRole == 'CSE Reviewer B' ||
                        item.loginRole == 'CSE Special Reviewer'
                      ? 'CSE-background'
                      : null
                  "
                >
                  <div
                    class="mb-1 text-capitalize"
                    :class="
                      hoverColumn === item.commentedColumn && hover
                        ? 'text-secondary'
                        : null ||
                          item.loginRole == 'CSE Approver' ||
                          item.loginRole == 'CSE Reviewer A' ||
                          item.loginRole == 'CSE Reviewer B' ||
                          item.loginRole == 'CSE Special Reviewer'
                        ? 'text-light'
                        : 'text-secondary'
                    "
                  >
                    {{
                      item.loginRole == "CSE Approver" ||
                      item.loginRole == "CSE Reviewer A" ||
                      item.loginRole == "CSE Reviewer B" ||
                      item.loginRole == "CSE Special Reviewer"
                        ? "CSE"
                        : item.fromUserName
                    }}
                    <img
                      v-if="
                        (messageIcons && owner == item.fromUserName) ||
                          (messageIcons && CseRole)
                      "
                      @click="editComment(item)"
                      class="float-left"
                      src="/images/svg/Edit.svg"
                    />
                    <img
                      v-if="messageIcons && owner == item.fromUserName"
                      @click="deleteComment(item)"
                      class="float-left"
                      src="/images/svg/delete.svg"
                    />
                  </div>
                  <div
                    :class="
                      hoverColumn === item.commentedColumn && hover
                        ? 'text-dark'
                        : null ||
                          item.loginRole == 'CSE Approver' ||
                          item.loginRole == 'CSE Reviewer A' ||
                          item.loginRole == 'CSE Reviewer B' ||
                          item.loginRole == 'CSE Special Reviewer'
                        ? 'text-light'
                        : null
                    "
                  >
                    {{ item.comment }}
                  </div>
                </div>
                <!-------- Replies Section --------->
                <div
                  class="comment-time d-flex font-weight-bold justify-content-between pl-2"
                >
                  <span @click="createReply(item, index, replyButton)">{{
                    replyIndex === index ? replyButton : "الرد"
                  }}</span>
                  <!-- <span
                    :class="
                      [hoverColumn !== item.commentedColumn && hover]
                        ? ''
                        : 'pl-0'
                    "
                    >{{ item.creationDate | getRelativeTime() }}</span
                  > -->
                </div>
                <div
                  v-for="(reply, index) in item.replies"
                  :key="index"
                  class="mb-2 mt-2"
                >
                  <div
                    class="demo"
                    @mouseenter="replyIcons = true"
                    @mouseleave="replyIcons = false"
                    :class="
                      hoverColumn === reply.columnName && hover
                        ? 'borderdClassOpacity'
                        : null
                    "
                  >
                    <div
                      class="user-image-circle mr-5 align-bottom text-uppercase text-white text-center font-weight-bold"
                    >
                      {{ reply | filterName() }}
                    </div>
                    <div
                      :class="
                        item.loginRole == 'CSE Approver' ||
                        item.loginRole == 'CSE Reviewer A' ||
                        item.loginRole == 'CSE Reviewer B' ||
                        item.loginRole == 'CSE Special Reviewer'
                          ? 'CSE-background'
                          : null
                      "
                      class="comment-text-wraper reply-button-width reply-text align-bottom d-inline-block"
                    >
                      <div
                        class="mb-1 text-capitalize "
                        :class="
                          item.loginRole == 'CSE Approver' ||
                          item.loginRole == 'CSE Reviewer A' ||
                          item.loginRole == 'CSE Reviewer B' ||
                          item.loginRole == 'CSE Special Reviewer'
                            ? 'text-light'
                            : 'text-secondary'
                        "
                      >
                        {{
                          reply.loginRole == "CSE Approver" ||
                          reply.loginRole == "CSE Reviewer A" ||
                          reply.loginRole == "CSE Reviewer B" ||
                          reply.loginRole == "CSE Special Reviewer"
                            ? "CSE"
                            : reply.fromUserName
                        }}
                        <!-- {{ reply.fromUserName }} -->
                        <img
                          v-if="replyIcons && owner == reply.fromUserName"
                          @click="editComment(reply, (check = true))"
                          class="float-left"
                          src="/images/svg/Edit.svg"
                        />
                        <img
                          v-if="replyIcons && owner == reply.fromUserName"
                          @click="deleteComment(reply, (check = true))"
                          class="float-left"
                          src="/images/svg/delete.svg"
                        />
                      </div>
                      <div
                        :class="
                          item.loginRole == 'CSE Approver' ||
                          item.loginRole == 'CSE Reviewer A' ||
                          item.loginRole == 'CSE Reviewer B' ||
                          item.loginRole == 'CSE Special Reviewer'
                            ? 'text-light'
                            : null
                        "
                      >
                        {{ reply.reply }}
                      </div>
                    </div>
                    <!-- <div class="comment-time font-weight-bold float-left pl-2"> -->
                    <!-- <div
                      class="d-flex justify-content-end font-weight-bold comment-time"
                      :class="{
                        'pl-0': hover,
                      }"
                    >
                      {{ reply.creationDate | getRelativeTime() }}
                    </div> -->
                    <!-- </div> -->
                  </div>
                </div>
                <div
                  :class="{ 'mb-5': CreateReply && replyIndex === index }"
                  v-if="CreateReply && replyIndex === index"
                >
                  <div
                    class="user-image-circle mr-5 align-bottom text-uppercase text-white text-center font-weight-bold"
                  >
                    {{ generalForm.owner | name() }}
                  </div>
                  <div
                    class="comment-text-wraper align-bottom d-inline-block w-50"
                  >
                    <b-form-textarea
                      class="commentTextarea reply-button-width font-weight-bold"
                      v-model="replyMessage"
                    ></b-form-textarea>
                  </div>
                  <!-- send reply button -->
                  <md-button
                    class="md-raised md-primary float-left ml-2 reply-button-width text-capitalize font-weight-bold comman-gradient border-radius"
                    @click="saveReply(item)"
                  >
                    ارسال الرد</md-button
                  >
                </div>
                <!-- {{ item. getRelativeTime() }} -->
              </div>
            </div>
          </div>
        </b-row>
        <b-row v-if="openComment" class="mb-3 position-relative">
          <b-col class="pl-4 pr-4">
            <img
              class="CrossButton"
              src="/images/icons/close.png"
              @click="CloseMessageBox()"
            />
            <img
              v-if="CseRole"
              class="V-dots"
              @click="presets = !presets"
              src="/images/icons/v-dots.png"
            />
            <div class="Presets font-weight-bold p-2" v-if="presets">
              <div v-for="(item, index) in filterPresets" :key="index">
                <span
                  @click="(userMessage = item.value), (presets = !presets)"
                  >{{ item.value }}</span
                >
                <hr />
              </div>
            </div>
            <div class="comment-text-wraper">
              <b-form-textarea
                class="commentTextarea font-weight-bold"
                v-model="userMessage"
              ></b-form-textarea>
              <!-- send button -->
              <md-button
                class="md-raised md-primary text-capitalize font-weight-bold comman-gradient border-radius"
                @click="saveComment()"
                >ارسال</md-button
              >
            </div>
          </b-col>
        </b-row>
      </div>
      <!------- Last Report Comments ----->
      <div
        class="comments-section"
        :class="lastComment ? '' : 'comments-section-change'"
      >
        <b-row class="m-0">
          <div
            id="comment-wrapper"
            class="comment-wrapper"
            :class="{ 'comment-wrapper-height': openlastComments }"
          >
            <div v-if="lastcomments.length > 0">
              <div v-for="(item, index) in lastcomments" :key="index">
                <div
                  @mouseenter="(messageIcons = true), scrollSection(item)"
                  @mouseleave="(messageIcons = false), scrollSection(item)"
                  class="mb-4 mt-4"
                  :id="'name' + `${item.commentedColumn}`"
                  :class="
                    hoverColumn !== item.commentedColumn && hover
                      ? 'borderdClassOpacity'
                      : scrollCommentBox(hover, item)
                  "
                >
                  <div
                    class="user-image-circle mr-2 text-uppercase text-white text-center font-weight-bold"
                  >
                    {{ item.fromUserName | name() }}
                  </div>
                  <div
                    class="comment-text align-bottom"
                    :class="{
                      borderdClass:
                        hoverColumn === item.commentedColumn && hover,
                    }"
                  >
                    <div class="mb-1 text-capitalize text-secondary">
                      {{ item.fromUserName }}
                    </div>
                    <div>{{ item.comment }}</div>
                  </div>
                  <!-------- Replies Section --------->
                  <div
                    class="comment-time d-flex font-weight-bold justify-content-end pl-2"
                  >
                    <!-- <span
                      @click="createReply(item, index, replyButton)"
                      disabled="true"
                      >{{ replyIndex === index ? replyButton : "الرد" }}</span
                    > -->
                    <span
                      :class="
                        [hoverColumn !== item.commentedColumn && hover]
                          ? ''
                          : 'pl-0'
                      "
                      >{{ item.creationDate | getRelativeTime() }}</span
                    >
                  </div>
                  <div
                    v-for="(reply, index) in item.replies"
                    :key="index"
                    class="mb-2 mt-2"
                  >
                    <div
                      class="demo"
                      @mouseenter="replyIcons = true"
                      @mouseleave="replyIcons = false"
                      :class="{
                        borderdClassOpacity:
                          hoverColumn === reply.columnName && hover,
                      }"
                    >
                      <div
                        class="user-image-circle mr-5 align-bottom text-uppercase text-white text-center font-weight-bold"
                      >
                        {{ reply.fromUserName | name() }}
                      </div>
                      <div
                        class="comment-text-wraper reply-button-width reply-text align-bottom d-inline-block"
                      >
                        <div class="mb-1 text-capitalize text-secondary">
                          {{ reply.fromUserName }}
                          <img
                            v-if="replyIcons && owner == reply.fromUserName"
                            @click="editComment(reply, (check = true))"
                            class="float-left"
                            src="/images/svg/Edit.svg"
                          />
                          <img
                            v-if="replyIcons && owner == reply.fromUserName"
                            @click="deleteComment(reply, (check = true))"
                            class="float-left"
                            src="/images/svg/delete.svg"
                          />
                        </div>
                        <div>{{ reply.reply }}</div>
                      </div>
                      <!-- <div class="comment-time font-weight-bold float-left pl-2"> -->
                      <div
                        class="d-flex justify-content-end font-weight-bold comment-time"
                        :class="{
                          'pl-0': hover,
                        }"
                      >
                        {{ reply.creationDate | getRelativeTime() }}
                      </div>
                      <!-- </div> -->
                    </div>
                  </div>
                  <div
                    :class="{ 'mb-5': CreateReply && replyIndex === index }"
                    v-if="CreateReply && replyIndex === index"
                  >
                    <div
                      class="user-image-circle mr-5 align-bottom text-uppercase text-white text-center font-weight-bold"
                    >
                      {{ generalForm.owner | name() }}
                    </div>
                    <div
                      class="comment-text-wraper align-bottom d-inline-block w-50"
                    >
                      <b-form-textarea
                        class="commentTextarea reply-button-width font-weight-bold"
                        v-model="replyMessage"
                      ></b-form-textarea>
                    </div>
                    <!-- send reply button -->
                    <md-button
                      class="md-raised md-primary float-left ml-2 reply-button-width text-capitalize font-weight-bold comman-gradient border-radius"
                      @click="saveReply(item)"
                    >
                      ارسال الرد</md-button
                    >
                  </div>
                  <!-- {{ item. getRelativeTime() }} -->
                </div>
              </div>
            </div>
            <div v-else class="pr-5">
              <span class="font-weight-bold h5 mx-5"
                >لا وجود لملاحظات سابقة</span
              >
            </div>
          </div>
        </b-row>
      </div>
      <activity-log
        :showlog="showlog"
        :dataa="data"
        :initiativeId="initiativeId"
        fromType="form"
      />
      <feedBackSection
        :isApprovedByCSE="isApprovedByCSE"
        :CseRole="CseRole"
        :initiativeId="InitiativeID"
        :feedback="feedback"
        :CurrentTab="`${currentTab}`"
      />
    </div>

    <!-- <div class="main-content" v-bind:class="{ full: showlog }">
        <b-row align-h="between" align-v="center">
          <b-col cols="7">
            <img style="vertical-align: text-top; cursor:pointer;margin-left:10px" @click="$router.go('-1')" src="/images/back.png" alt="">
            <h4 style="font-weight: 600; display:inline-block">
              {{ $t("monthlyReportListHeading") }}
            </h4>
          </b-col>
          <b-col cols="5">
            <b-row align-h="end" align-v="center">
            
              <b-col cols="5" v-if="iAmOwner && !hasOnlyEntityInitiatorRole">
                <button
                  class="btn md-primary main-btn border-radius-5"
                  style="width:100%; font-size:14px"
                  @click="isReturnBack = true"
                >
                  {{ $t("submitFeedback") }}
                </button>
              </b-col>
            
            </b-row>
          </b-col>
        
        </b-row>
        <div v-bind:class="{ feedbackBorder: sectionOne }"
          class="main-card p-4 mt-4"
          v-show="!((!formDisabled && hasOnlyEntityInitiatorRole && iAmOwner) || newInitiative)">
          <template>
            <h4 style="font-weight: 600;">{{ $t("initiativeFormFirstSectionHeading") }}</h4>

            <b-row align-v="center" style="width:100%">
              <b-col cols="4">
                <md-field>
                  <label for="surveyName">{{ $t("initiativeName") }}</label>
                  <md-input
                    autocomplete="given-name"
                    v-model="generalForm.name"
                    readonly
                    :disabled="sending || formDisabled"
                  />
                </md-field>
              </b-col>
              <b-col cols="8">
                <md-field>
                  <label for="startDate">{{ $t("initiativeDescription") }}</label>

                  <md-input
                    autocomplete="given-name"
                    v-model="generalForm.description"
                    readonly
                    :disabled="sending || formDisabled"
                  />
                </md-field>
              </b-col>
              <b-col cols="4">
                <md-field>
                  <label for="surveyName">اسم المالك</label>
                  <md-input
                    autocomplete="given-name"
                    v-model="generalForm.owner"
                    readonly
                    :disabled="sending || formDisabled"
                  />
                </md-field>
              </b-col>
              <b-col cols="4">
                <md-field>
                  <label for="surveyName">{{ $t("deputyShip") }}</label>
                  <md-input
                    autocomplete="given-name"
                    v-model="generalForm.deputyShip"
                    readonly
                    :disabled="sending || formDisabled"
                  />
                </md-field>
              </b-col>
              <b-col col="4"></b-col>
              <b-col cols="4">
                <md-field>
                  <label for="endDate"
                    >{{ $t("amountOfProjectedSavings") }} (ريال سعودي)</label
                  >

                  <md-input
                    autocomplete="given-name"
                    @keypress="onlyNumber"
                    @change="expSaveValueCurrencyFormatter"
                    readonly
                    type="text"
                    v-model="generalForm.expSaveValue"
                    :disabled="sending || formDisabled"
                  />
                </md-field>
              </b-col>
              <b-col cols="4">
                <md-field>
                  <label for="type">{{ $t("savingType") }}</label>

                  <md-input
                    autocomplete="given-name"
                    readonly
                    type="text"
                    v-model="generalFormType"
                    :disabled="sending || formDisabled"
                  />
                
                </md-field>
              </b-col>
              <b-col cols="4" v-if="generalFormType == 'other'">
                <md-field>
                  <label for="surveyName">{{ $t("otherDescription") }}</label>
                  <md-input
                    autocomplete="given-name"
                    readonly
                    v-model="generalForm.savingTypeDescription"
                    :disabled="sending || formDisabled"
                  />
                </md-field>
              </b-col>
              <b-col col="4" v-if="generalFormType != 'other'"></b-col>
              <b-col cols="4">
                <md-field>
                  <label for="startDate">{{ $t("startDate") }}</label>
                  <md-input
                    name="startDate"
                    id="startDate"
                    autocomplete="given-name"
                    readonly
                    v-model="generalForm.startDate"
                    :disabled="sending || formDisabled"
                  />
                </md-field>
              </b-col>
              <b-col cols="4">
                <md-field>
                  <label for="endDate">{{ $t("endDate") }}</label>

                  <md-input
                    name="endDate"
                    id="endDate"
                    autocomplete="given-name"
                    v-model="generalForm.endDate"
                    readonly
                    :disabled="sending || formDisabled"
                  />
                </md-field>
              </b-col>
            </b-row>
          </template>
        </div>

        <div v-bind:class="{ feedbackBorder: sectionOne }"
          class="main-card p-4 mt-4"
          v-show="((!formDisabled && hasOnlyEntityInitiatorRole && iAmOwner) || newInitiative)">
          <template>
            <h4 style="font-weight: 600;">{{ $t("initiativeFormFirstSectionHeading") }}</h4>

            <b-row align-v="top" style="width:100%">
              <b-col cols="4">
                <md-field>
                  <label for="surveyName">{{ $t("initiativeName") }}</label>
                  <md-input
                    autocomplete="given-name"
                    v-model="generalForm.name"
                    :disabled="sending || formDisabled"
                  />
                </md-field>
              </b-col>
              <b-col cols="8">
                <md-field>
                  <label for="startDate">{{ $t("initiativeDescription") }}</label>

                  <md-input
                    autocomplete="given-name"
                    v-model="generalForm.description"
                    :disabled="sending || formDisabled"
                  />
                </md-field>
              </b-col>
              <b-col cols="4">
                <md-field>
                  <label for="surveyName">اسم المالك</label>
                  <md-input
                    autocomplete="given-name"
                    v-model="generalForm.owner"
                    :disabled="sending || formDisabled"
                  />
                </md-field>
              </b-col>
              <b-col cols="4">
                <md-field>
                  <label for="surveyName">{{ $t("deputyShip") }}</label>
                  <md-input
                    autocomplete="given-name"
                    v-model="generalForm.deputyShip"
                    :disabled="sending || formDisabled"
                  />
                </md-field>
              </b-col>
              <b-col col="4"></b-col>
              <b-col cols="4">
                <md-field style="margin: 4px 0 10px;">
                  <label for="endDate"
                    >{{ $t("amountOfProjectedSavings") }} (ريال سعودي)</label
                  >

                  <md-input
                    autocomplete="given-name"
                    @keypress="onlyNumber"
                    @change="expSaveValueCurrencyFormatter"
                    type="text"
                    v-model="generalForm.expSaveValue"
                    :disabled="sending || formDisabled"
                  />
                </md-field>
              <div style="margin-bottom:12px">
                {{expSaveValueArabic}}
              </div>
              </b-col>
              <b-col cols="4">
                <md-field>
                  <label for="type">{{ $t("savingType") }}</label>

                  <md-select
                    name="type"
                    id="type"
                    v-model="generalForm.type"
                    md-dense
                    :disabled="sending || formDisabled"
                  >
                    <md-option :value="null">{{
                      $t("selectAnOption")
                    }}</md-option>
                    <md-option value="خفض في الاعتمادات"
                      >خفض في الاعتمادات</md-option
                    >
                    <md-option value="خفض في التكاليف">خفض في التكاليف</md-option>

                  
                    <md-option value="other">{{ $t("other") }}</md-option>
                  </md-select>
                </md-field>
              </b-col>
              <b-col cols="4" v-if="generalForm.type == 'other'">
                <md-field>
                  <label for="surveyName">{{ $t("otherDescription") }}</label>
                  <md-input
                    autocomplete="given-name"
                    v-model="generalForm.savingTypeDescription"
                    :disabled="sending || formDisabled"
                  />
                </md-field>
              </b-col>
              <b-col col="4" v-if="generalForm.type != 'other'"></b-col>
              <b-col cols="4">
              

                <md-datepicker
                  v-show="sending || !formDisabled"
                  v-model="generalForm.startDate"
                  md-immediately
                  name="startDate"
                  id="startDate"
                >
                  <label for="startDate">{{ $t("startDate") }}</label>
                </md-datepicker>
              </b-col>
              <b-col cols="4">
                
                <md-datepicker
                  v-show="sending || !formDisabled"
                  v-model="generalForm.endDate"
                  md-immediately
                  :disabled="sending || formDisabled"
                  name="endDate"
                  id="endDate"
                >
                  <label for="endDate">{{ $t("endDate") }}</label>
                </md-datepicker>
              </b-col>
              <b-col cols="2">
                <button
                  class="btn md-primary main-btn border-radius-5"
                  style="width:100%;font-size:14px"
                  :disabled="sending || !generalForm.editable || formDisabled"
                  @click="saveGeneralForm"
                >
                  {{ isUpdate ? $t("update") : $t("save") }}
                </button>
              </b-col>
            </b-row>
          </template>
        </div>

        <div v-bind:class="{ feedbackBorder: sectionTwo }"
          class="main-card py-4 mt-4" >
          <template>
            <div class="px-4">
              <h4 style="font-weight: 600;">{{ $t("initiativeFormSecondSectionHeading") }}</h4>

              <b-row
                align-v="center"
                style="width:100%"
                v-if="(hasOnlyEntityInitiatorRole && iAmOwner) || newInitiative"
              >
              
                <b-col cols="4" @click="isSelectGFSDialog = true">
                  <md-field>
                    <label for="surveyName">رمز البند (GFS)</label>
                    <md-input
                      autocomplete="given-name"
                      v-model="financialForm.gfs"
                      readonly
                      :disabled="formDisabled"
                    />
                  </md-field>
                </b-col>
                <b-col cols="4" @click="isSelectGFSDialog = true">
                  <md-field>
                    <label for="surveyName">اسم البند</label>
                    <md-input
                      autocomplete="given-name"
                      v-model="financialForm.clause"
                      readonly
                      :disabled="formDisabled"
                    />
                  </md-field>
                </b-col>
                <b-col cols="4">
                
                </b-col>
                <b-col cols="4">
                  <md-field>
                    <label for="startDate"
                      >{{ $t("annualBaseline") }} (ريال سعودي)</label
                    >

                    <md-input
                      autocomplete="given-name"
                      type="text"
                      @keypress="onlyNumber"
                      @change="annualBalanceCurrencyFormatter"
                      v-model="financialForm.annualBalance"
                      :disabled="formDisabled"
                    />
                  </md-field>
                </b-col>

                <b-col cols="4">
                  <md-field>
                    <label for="endDate"
                      >{{ $t("annualWorthAfterOrder") }} (ريال سعودي)</label
                    >

                    <md-input
                      autocomplete="given-name"
                      type="text"
                      @keypress="onlyNumber"
                      @change="valueAfterRecommendCurrencyFormatter"
                      v-model="financialForm.valueAfterRecommend"
                      :disabled="formDisabled"
                    />
                  </md-field>
                </b-col>
                <b-col cols="3"></b-col>
                <b-col
                  cols="5"
                  v-show="!formDisabled && hasOnlyEntityInitiatorRole"
                >
                  <button
                    class="btn md-primary main-btn border-radius-5"
                    style="font-size:14px"
                    :disabled="formDisabled"
                    @click="addFinancialStatement()"
                  >
                    {{ addValueFinancialStatement }}
                  </button>
                </b-col>
                <b-col cols="2"></b-col>
              </b-row>
            </div>
            <b-table
              class="mt-4"
              striped
              hover
              :items="financialSavingStatements"
              :fields="financialSavingFields"
            >
              <template
                v-slot:cell(actions)="data"
                v-if="(hasOnlyEntityInitiatorRole && iAmOwner) || newInitiative"
              >
                <b class="text-info">
                  <button
                    class="btn md-primary main-btn border-radius-5 view"
                    :disabled="formDisabled || !data.item.editable"
                    @click="onViewFinancialSavingForm(data)"
                  >
                    تحديث
                  </button>
                </b>
              </template>

              <template v-slot:cell(annualBalance)="data">
                <span>{{ formatAsCurrency(data.item.annualBalance) }}</span>
              
              </template>

              <template v-slot:cell(valueAfterRecommend)="data">
                <span>{{ formatAsCurrency(data.item.valueAfterRecommend) }}</span>
            
              </template>
            </b-table>
            <h5 v-if="financialSavingStatements.length == 0" class="text-center">
              {{ $t("thereAreCurrentlyNoRecords") }}
            </h5>
          </template>

          <button
            v-if="(hasOnlyEntityInitiatorRole && iAmOwner) || newInitiative"
            class="btn md-primary main-btn border-radius-5 mx-3"
            style="margin: 0 7px;font-size:14px"
            :disabled="
              formDisabled ||
                sending ||
                mainFormSending ||
                !checkFinancialForm ||
                (financialSavingStatements.length == 0 &&
                  Object.keys(tempFinancialForm).length === 0 &&
                  isUpdate)
            "
            @click="saveFinancialSavingForm"
          >
            {{ $t("save") }}
          </button>
        </div>

        <div v-bind:class="{ feedbackBorder: sectionThree }"
          class="main-card py-4 mt-4" >
          <template>
            <div class="px-4">
              <b-row align-h="between" align-v="top">
                <b-col cols="5">
                  <h4  style="font-weight: 600;">{{ $t("savingDuringFinancialYears") }}</h4>
                </b-col>
                <b-col cols="4">
                  <span class="d-block">
                    <strong>إجمالي حجم الوفر المتوقع (ريال سعودي) :</strong>
                    {{
                      generalForm.expSaveValue
                        ? generalForm.expSaveValue
                        : "غير محدد حاليا في قسم المعلومات العامة"
                    }}
                  </span>
                  <div class="d-block">
                    <span>
                      <strong>حجم الوفر المتبقي (ريال سعودي) :</strong>
                    </span>
                    <span v-bind:class="{ colorRed: isClassRed }">
                      {{
                        generalForm.expSaveValue
                          ? getMinusSaveExpected(
                              generalForm.expSaveValue,
                              expectedSaveAmount
                            )
                          : "0"
                      }}
                    </span>
                  </div>
                  <span class="d-block">
                    <strong>إجمالي حجم الوفورات المحققة (ريال سعودي) :</strong>
                    {{ formatAsCurrency(actualSaveAmount) }}
                  </span>
                </b-col>
              </b-row>

              <b-row
                align-v="center"
                style="width:100%"
                v-if="(hasOnlyEntityInitiatorRole && iAmOwner) || newInitiative"
              >
                <b-col cols="3">
                  <h5 style="font-weight: 600;">
                    {{ $t("expectingSavingsThatHasBeenAchieved") }}
                  </h5>
                </b-col>
                <b-col cols="3">
                  <md-field>
                    <label for="type">{{ $t("selectYear") }}</label>

                    <md-select
                      name="type"
                      id="type"
                      v-model="financialYearForm.year"
                      md-dense
                      :disabled="sending || formDisabled"
                    >
                      <md-option :value="null">{{
                        $t("selectAnOption")
                      }}</md-option>
                      <md-option value="2019">2019</md-option>
                      <md-option value="2020">2020</md-option>
                      <md-option value="2021">2021</md-option>
                      <md-option value="2022">2022</md-option>
                      <md-option value="2023">2023</md-option>
                      <md-option value="after 2023">بعد 2023</md-option>
                    </md-select>
                  </md-field>
                </b-col>
                <b-col cols="3" v-show="!formDisabled">
                  <md-field>
                    <label for="startDate"
                      >{{ $t("expectedSavings") }} (ريال سعودي)</label
                    >

                    <md-input
                      autocomplete="given-name"
                      type="text"
                      @keypress="onlyNumber"
                      @change="expectedSaveAmountCurrencyFormatter"
                      v-model="financialYearForm.expectedSaveAmount"
                      :disabled="formDisabled"
                    />
                  </md-field>
                </b-col>
                <b-col cols="3" v-show="!formDisabled">
                  <md-field>
                    <label for="startDate"
                      >{{ $t("actualSavings") }} (ريال سعودي)</label
                    >

                    <md-input
                      autocomplete="given-name"
                      type="text"
                      @keypress="onlyNumber"
                      @change="actualSaveAmountCurrencyFormatter"
                      v-model="financialYearForm.actualSaveAmount"
                      :disabled="formDisabled"
                    />
                  </md-field>
                </b-col>
              
                <b-col
                  cols="3"
                  v-show="
                    (!formDisabled && hasOnlyEntityInitiatorRole && iAmOwner) ||
                      newInitiative
                  "
                >
                  <button
                    class="btn md-primary main-btn border-radius-5"
                    style="width:100%;font-size:14px"
                    :disabled="formDisabled"
                    @click="addFinancialYearsStatement"
                  >
                    {{ addValueFinancialYear }}
                  </button>
                </b-col>
              
              </b-row>
            </div>
            <b-table
              class="mt-4"
              striped
              hover
              :items="yearlySaves"
              :fields="financialYearFields"
            >
              <template
                v-slot:cell(actions)="data"
                v-if="(hasOnlyEntityInitiatorRole && iAmOwner) || newInitiative"
              >
                <b class="text-info">
                  <button
                    class="btn md-primary main-btn border-radius-5 view"
                    :disabled="!data.item.editable || formDisabled"
                    @click="onViewYearsStatementForm(data)"
                  >
                    تحديث
                  </button>
                  <button
                    :disabled="!data.item.editable || formDisabled"
                    class="btn md-delete main-btn border-radius-5 delete m-1"
                    @click="onDeleteYearsStatementForm(data)"
                  >
                    حذف
                  </button>
                </b>
              </template>
              <template v-slot:cell(actualSaveAmount)="data">
                <span v-if="data.item.actualSaveAmount">{{
                  formatAsCurrency(data.item.actualSaveAmount)
                }}</span>
                <span v-else>0</span>
              
              </template>
              <template v-slot:cell(expectedSaveAmount)="data">
                <span>{{ formatAsCurrency(data.item.expectedSaveAmount) }}</span>
              
              </template>
            </b-table>
            <h5 v-if="yearlySaves.length == 0" class="text-center">
              {{ $t("thereAreCurrentlyNoRecords") }}
            </h5>
            <b-table
              v-if="yearlySaves.length > 0"
              class="abc"
              hover
              :items="itemsss"
              thead-class="hidden_header"
              tbody-tr-class="total"
            >
              <template v-slot:cell(a)="data">
                <span>
                  <strong>إجمالي</strong>
                </span>
              
              </template>
              <template v-slot:cell(b)="data">
                <span>
                  <strong>{{
                    sumOfValues(yearlySaves, "expectedSaveAmount")
                  }}</strong>
                </span>
              
              </template>
              <template v-slot:cell(c)="data">
                <span>
                  <strong>{{
                    sumOfValues(yearlySaves, "actualSaveAmount")
                  }}</strong>
                </span>
              
              </template>
            </b-table>
          </template>

        
          <button
            v-show="
              (!formDisabled && hasOnlyEntityInitiatorRole && iAmOwner) ||
                newInitiative
            "
            class="btn md-primary main-btn border-radius-5 mx-3"
            style="font-size:14px"
            :disabled="
              formDisabled ||
                sending ||
                mainFormSending ||
                !checkYearsStatementForm ||
                (yearlySaves.length == 0 &&
                  Object.keys(tempFinancialYearForm).length === 0 &&
                  isUpdate)
            "
            @click="saveYearsStatementForm"
          >
            {{ $t("save") }}
          </button>
        </div>

        <div v-bind:class="{ feedbackBorder: sectionFour }"
          class="main-card p-4 mt-4">
          <template>
            <h4 style="font-weight: 600;">{{ $t("savingsCalculationMechanism") }}</h4>

            <b-row align-v="end" style="width:100%">
              <b-col cols="9">
                <md-field class="mb-0">
                  <label for="subTitle">{{
                    $t("savingsCalculationMechanism")
                  }}</label>
                  <md-textarea
                    v-model="calculationSaving.calOfSaving"
                    name="subTitle"
                    id="subTitle"
                    autocomplete="given-name"
                    :disabled="
                      (sending ||
                        formDisabled ||
                        !hasOnlyEntityInitiatorRole ||
                        !iAmOwner) &&
                        !newInitiative
                    "
                  ></md-textarea>
                </md-field>
              </b-col>
              <b-col
                cols="3"
                v-show="
                  (!formDisabled && hasOnlyEntityInitiatorRole && iAmOwner) ||
                    newInitiative
                "
              >
            
                <label>{{ $t("uploadAttachment") }}</label>
                <input
                  :disabled="sending || formDisabled"
                  type="file"
                  id="imageUpload"
                  ref="file"
                  name="file"
                />
              </b-col>
            </b-row>
            <b-row
              align-v="end"
              class="my-4"
              style="width:100%"
              v-if="Object.keys(calculationSaving).length > 0"
            >
              <b-col cols="12">
                <a
                  v-if="calculationSaving.uploadCalcOfSavings.length > 0"
                  :href="
                    'http://3.124.65.120' +
                      calculationSaving.uploadCalcOfSavings[
                        calculationSaving.uploadCalcOfSavings.length - 1
                      ].path
                  "
                  target="_blank"
                >
                  <span
                    style="font-weight: bold;border: 1px solid;padding: 3px 8px 7px;"
                    >{{ $t("viewAttachment") }}</span
                  >
                </a>
                
              </b-col>
            </b-row>
            <b-row
              align-v="end"
              style="width:100%"
              v-show="
                (!formDisabled && hasOnlyEntityInitiatorRole && iAmOwner) ||
                  newInitiative
              "
            >
              <b-col cols="2">
                <button
                  class="btn md-primary main-btn border-radius-5"
                  style="width:100%;font-size:14px"
                  :disabled="sending || mainFormSending || formDisabled"
                  @click="saveCalculationOfSavingForm"
                >
                  {{ $t("save") }}
                </button>
              </b-col>
            </b-row>
          </template>
        </div>

        <div v-bind:class="{ feedbackBorder: sectionFive }"
          class="main-card py-4 mt-4" >
          <template>
            <div class="px-4">
              <h4 style="font-weight: 600;">{{ $t("implementationPlan") }}</h4>

              <b-row
                align-v="center"
                style="width:100%"
                v-if="(hasOnlyEntityInitiatorRole && iAmOwner) || newInitiative"
              >
                <b-col cols="4">
                  <md-field>
                    <label for="surveyName">اسم المعلم</label>
                    <md-input
                      autocomplete="given-name"
                      v-model="implementationPlanForm.name"
                    />
                  </md-field>
                </b-col>
                <b-col cols="4">
              

                  <md-datepicker
                    v-model="implementationPlanForm.targetSDate"
                    md-immediately
                    :disabled="sending || formDisabled"
                    :md-disabled-dates="disabledDates"
                    name="targetStartDate"
                    id="targetStartDate"
                  >
                    <label for="targetStartDate">{{
                      $t("intendedStartDate")
                    }}</label>
                  </md-datepicker>
              
                </b-col>
                <b-col cols="4">
                  
                  <md-datepicker
                    v-model="implementationPlanForm.targetEDate"
                    md-immediately
                    :disabled="sending || formDisabled"
                    :md-disabled-dates="disabledDates"
                    name="targetEndDate"
                    id="targetEndDate"
                  >
                    <label for="targetEndDate">{{ $t("intendedEndDate") }}</label>
                  </md-datepicker>
                
                </b-col>

                <b-col cols="4">
                  

                  <md-datepicker
                    v-model="implementationPlanForm.actualSDate"
                    md-immediately
                    :disabled="sending || formDisabled"
                    :md-disabled-dates="disabledDates"
                    name="actualStartDate"
                    id="actualStartDate"
                  >
                    <label for="actualStartDate">{{
                      $t("actualStartDate")
                    }}</label>
                  </md-datepicker>
              
                </b-col>
                <b-col cols="4">
                
                  <md-datepicker
                    v-model="implementationPlanForm.actualEDate"
                    md-immediately
                    :disabled="sending || formDisabled"
                    :md-disabled-dates="disabledDates"
                    name="actualEndDate"
                    id="actualEndDate"
                  >
                    <label for="actualEndDate">{{ $t("actualEndDate") }}</label>
                  </md-datepicker>
                
                </b-col>
                <b-col cols="2"></b-col>
                <b-col
                  cols="4"
                  v-show="!formDisabled && hasOnlyEntityInitiatorRole"
                >
                  <button
                    class="btn md-primary main-btn border-radius-5"
                    style="width:100%; font-size:14px"
                    :disabled="formDisabled"
                    @click="addimplementationPlan"
                  >
                    {{ addValueImplementationPlan }}
                  </button>
                </b-col>
              
              </b-row>
            </div>
            <b-table
              class="mt-4"
              striped
              hover
              :items="mileStones"
              :fields="implementationPlanFields"
            >
              <template
                v-slot:cell(actions)="data"
                v-if="(hasOnlyEntityInitiatorRole && iAmOwner) || newInitiative"
              >
                <b class="text-info">
                  <button
                    class="btn md-primary main-btn border-radius-5 view"
                    :disabled="formDisabled"
                    @click="onViewImplementationPlanForm(data)"
                  >
                    {{ $t("edit") }}
                  </button>
                </b>
              </template>
              <template v-slot:cell(targetSDate)="data">
                <span>{{
                  data.item.targetSDate == "0001-01-01" ||
                  data.item.targetSDate == null
                    ? "N/A"
                    : formatDateMilestone(data.item.targetSDate)
                }}</span>
              </template>
              <template v-slot:cell(targetEDate)="data">
                <span>{{
                  data.item.targetEDate == "0001-01-01" ||
                  data.item.targetEDate == null
                    ? "N/A"
                    : formatDateMilestone(data.item.targetEDate)
                }}</span>
              </template>
              <template v-slot:cell(actualSDate)="data">
                <span>{{
                  data.item.actualSDate == "0001-01-01" ||
                  data.item.actualSDate == null
                    ? "N/A"
                    : formatDateMilestone(data.item.actualSDate)
                }}</span>
              </template>
              <template v-slot:cell(actualEDate)="data">
                <span>{{
                  data.item.actualEDate == "0001-01-01" ||
                  data.item.actualEDate == null
                    ? "N/A"
                    : formatDateMilestone(data.item.actualEDate)
                }}</span>
              </template>
            </b-table>
            <h5 v-if="mileStones.length == 0" class="text-center">
              {{ $t("thereAreCurrentlyNoRecords") }}
            </h5>
          </template>

          
          <gantt-elastic
            :options="options"
            :tasks="tasks"
            @tasks-changed="tasksUpdate"
            @options-changed="optionsUpdate"
            @dynamic-style-changed="styleUpdate"
          >
            
          </gantt-elastic>
          <button
            v-show="
              (!formDisabled && hasOnlyEntityInitiatorRole && iAmOwner) ||
                newInitiative
            "
            class="btn md-primary main-btn border-radius-5 mx-3"
            style="font-size:14px"
            :disabled="
              formDisabled ||
                sending ||
                mainFormSending ||
                !checkImplementationPlanForm ||
                (mileStones.length == 0 &&
                  Object.keys(tempImplementationPlanForm).length === 0 &&
                  isUpdate)
            "
            @click="saveImplementationPlanForm"
          >
            {{ $t("save") }}
          </button>
        </div>

        <div v-bind:class="{ feedbackBorder: sectionSix }"
          class="main-card p-4 mt-4" >
          <h4 style="font-weight: 600;">{{ $t("summaryOfInitiatives") }}</h4>
          <b-row align-v="center" style="width:100%">
            <b-col cols="6">
              <md-field>
                <label for="surveyName">{{
                  $t("whatHasBeenAchievedThisMonth")
                }}</label>
                <md-textarea
                  v-model="summaryOfInitiativeForm.summeryThisMonth"
                  name="surveyName"
                  id="surveyName"
                  autocomplete="given-name"
                  :disabled="
                    !(
                      (!formDisabled && hasOnlyEntityInitiatorRole && iAmOwner) ||
                      newInitiative
                    )
                  "
                ></md-textarea>
              </md-field>
            </b-col>

            <b-col cols="6">
              <md-field>
                <label for="surveyName">{{
                  $t("whatIsThePlanOfTheNextMonth")
                }}</label>
                <md-textarea
                  v-model="summaryOfInitiativeForm.planNextMonth"
                  name="surveyName"
                  id="surveyName"
                  autocomplete="given-name"
                  :disabled="
                    !(
                      (!formDisabled && hasOnlyEntityInitiatorRole && iAmOwner) ||
                      newInitiative
                    )
                  "
                ></md-textarea>
              </md-field>
            </b-col>
            <b-col
              cols="2"
              v-show="
                (!formDisabled && hasOnlyEntityInitiatorRole && iAmOwner) ||
                  newInitiative
              "
            >
              <button
                class="btn md-primary main-btn border-radius-5"
                style="width:100%;font-size:14px"
                :disabled="
                  sending || !summaryOfInitiativeForm.editable || formDisabled
                "
                @click="saveSummaryOfInitiativeForm"
              >
                {{ isUpdate ? $t("update") : $t("save") }}
              </button>
            </b-col>
          </b-row>
        </div>

        <b-row class="my-4" align-h="start" align-v="center">
          
          <b-col cols="4">
            <button
              class="btn md-primary main-btn"
              style="width:100%; background:#C8D32D !important;font-size:14px"
              @click="$router.go('-1')"
            >
              {{ $t("returnToThePreviousPage") }}
            </button>
          </b-col>
        </b-row>

        <md-dialog :md-active.sync="isSelectGFSDialog">
          <md-dialog-title></md-dialog-title>
          <div class="px-5">
            <h4 style="font-weight: 600;">ابحث واختر GFS</h4>

            <b-row align-v="center" class="mt-4" style="width:100%">
              <b-col cols="4">
                <md-field>
                  <label for="type">رمز البند (GFS) / اسم البند</label>
                  <md-input
                    name="gfsCode"
                    @keyup="onGFSEmpty(gfsCode)"
                    autocomplete="given-name"
                    v-model="gfsCode"
                  />
                </md-field>
              </b-col>
            
            </b-row>
            <button
              class="btn md-primary main-btn border-radius-5 view"
              @click="onGFSFilter(gfsCode)"
            >
              بحث
            </button>
            <div style="overflow: auto;height: 380px;">
              <b-table
                class="mt-4"
                striped
                hover
                :items="gfsModalItems"
                :fields="gfsModalFields"
              >
                <template v-slot:cell(action)="data">
                  <b class="text-info">
                    <button
                      class="btn md-primary main-btn border-radius-5 view"
                      @click="onSelectGFSModal(data.item)"
                    >
                      أختر
                    </button>
                  </b>
                </template>
              </b-table>
              <div class="pagination-div mt-4 mx-5">
                <b-pagination
                  class="d-inline-flex"
                  v-model="currentPage"
                  :total-rows="totalCountGFS"
                  :per-page="perPage"
                  aria-controls="my-table"
                ></b-pagination>
              </div>
            </div>
          </div>
          <md-dialog-actions></md-dialog-actions>
        </md-dialog>

        <feedBackForm
          :data="propData"
          @closePop="closePop"
          @addLogData="addLogData"
          :feedBackFormObj="feedBackFormObj"
          v-if="isReturnBack"
        />
    </div>-->
  </b-container>
</template>

<script>
// $(document).ready(function () {
//   $(".numberItem").keypress(function (event) {
//     if (event.which != 8 && isNaN(String.fromCharCode(event.which))) {
//       event.preventDefault(); //stop character from entering input
//     }
//   });
// });
import { ar } from "vuejs-datepicker/dist/locale";
import Datepicker from "vuejs-datepicker";
import format from "date-fns/format";
import bus from "../../main";
import { validationMixin } from "vuelidate";
import Tafgeet from "tafgeetjs";
import feedBackForm from "./FeedbackForm";
import feedBackSection from "../CseFeedback";
import ActivityLog from "../ActivityLog";
import rolesMixin from "../../mixins/RolesMixins.js";
import GanttElastic from "gantt-elastic";
import GanttHeader from "gantt-elastic-header";
import dayjs from "dayjs";
// import $ from "jquery";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import { error } from "highcharts";
import moment from "moment";
import Moment from "moment-timezone";
import { BIconHouse } from "bootstrap-vue";

// just helper to get current dates
function getDate(hours) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const timeStamp = new Date(
    currentYear,
    currentMonth,
    currentDay,
    0,
    0,
    0
  ).getTime();
  return new Date(timeStamp + hours * 60 * 60 * 1000).getTime();
}
let tasks = [
  {
    id: 1,
    label: "قم بإحداث بعض الضجيج",
    user:
      '<a href="https://www.google.com/search?q=John+Doe" target="_blank" style="color:#0077c0;">John Doe</a>',
    start: getDate(-24 * 5),
    duration: 15 * 24 * 60 * 60 * 1000,
    // percent: 85,
    type: "project",
    //collapsed: true,
  },
  {
    id: 2,
    label: "With great power comes great responsibility",
    user:
      '<a href="https://www.google.com/search?q=Peter+Parker" target="_blank" style="color:#0077c0;">Peter Parker</a>',
    parentId: 1,
    start: getDate(-24 * 4),
    duration: 4 * 24 * 60 * 60 * 1000,
    // percent: 50,
    type: "milestone",
    collapsed: true,
    style: {
      base: {
        fill: "#1EBC61",
        stroke: "#0EAC51",
      },
    },
  },
  {
    id: 3,
    label: "Courage is being scared to death, but saddling up anyway.",
    user:
      '<a href="https://www.google.com/search?q=John+Wayne" target="_blank" style="color:#0077c0;">John Wayne</a>',
    parentId: 2,
    start: getDate(-24 * 3),
    duration: 2 * 24 * 60 * 60 * 1000,
    // percent: 100,
    type: "task",
  },
  {
    id: 4,
    label: "Put that toy AWAY!",
    user:
      '<a href="https://www.google.com/search?q=Clark+Kent" target="_blank" style="color:#0077c0;">Clark Kent</a>',
    start: getDate(-24 * 2),
    duration: 2 * 24 * 60 * 60 * 1000,
    // percent: 50,
    type: "task",
    dependentOn: [3],
  },
  {
    id: 5,
    label:
      "One billion, gajillion, fafillion... shabadylu...mil...shabady......uh, Yen.",
    user:
      '<a href="https://www.google.com/search?q=Austin+Powers" target="_blank" style="color:#0077c0;">Austin Powers</a>',
    parentId: 4,
    start: getDate(0),
    duration: 2 * 24 * 60 * 60 * 1000,
    // percent: 10,
    type: "milestone",
    style: {
      base: {
        fill: "#0287D0",
        stroke: "#0077C0",
      },
    },
  },
  {
    id: 6,
    label: "Butch Mario and the Luigi Kid",
    user:
      '<a href="https://www.google.com/search?q=Mario+Bros" target="_blank" style="color:#0077c0;">Mario Bros</a>',
    parentId: 5,
    start: getDate(24),
    duration: 1 * 24 * 60 * 60 * 1000,
    // percent: 50,
    type: "task",
    collapsed: true,
    style: {
      base: {
        fill: "#8E44AD",
        stroke: "#7E349D",
      },
    },
  },
  {
    id: 7,
    label: "Devon, the old man wanted me, it was his dying request",
    user:
      '<a href="https://www.google.com/search?q=Knight+Rider" target="_blank" style="color:#0077c0;">Knight Rider</a>',
    parentId: 2,
    dependentOn: [6],
    start: getDate(24 * 2),
    duration: 4 * 60 * 60 * 1000,
    // percent: 20,
    type: "task",
    collapsed: true,
  },
  {
    id: 8,
    label: "Hey, Baby! Anybody ever tell you I have beautiful eyes?",
    user:
      '<a href="https://www.google.com/search?q=Johhny+Bravo" target="_blank" style="color:#0077c0;">Johhny Bravo</a>',
    parentId: 7,
    dependentOn: [7],
    start: getDate(24 * 3),
    duration: 1 * 24 * 60 * 60 * 1000,
    // percent: 0,
    type: "task",
  },
  {
    id: 9,
    label:
      "This better be important, woman. You are interrupting my very delicate calculations.",
    user:
      '<a href="https://www.google.com/search?q=Dexter\'s+Laboratory" target="_blank" style="color:#0077c0;">Dexter\'s Laboratory</a>',
    parentId: 8,
    dependentOn: [8, 7],
    start: getDate(24 * 4),
    duration: 4 * 60 * 60 * 1000,
    // percent: 20,
    type: "task",
    style: {
      base: {
        fill: "#8E44AD",
        stroke: "#7E349D",
      },
    },
  },
  {
    id: 10,
    label: "current task",
    user:
      '<a href="https://www.google.com/search?q=Johnattan+Owens" target="_blank" style="color:#0077c0;">Johnattan Owens</a>',
    start: getDate(24 * 5),
    duration: 24 * 60 * 60 * 1000,
    // percent: 0,
    type: "task",
  },
  {
    id: 11,
    label: "test task",
    user:
      '<a href="https://www.google.com/search?q=Johnattan+Owens" target="_blank" style="color:#0077c0;">Johnattan Owens</a>',
    start: getDate(24 * 6),
    duration: 24 * 60 * 60 * 1000,
    // percent: 0,
    type: "task",
  },
  {
    id: 12,
    label: "test task",
    user:
      '<a href="https://www.google.com/search?q=Johnattan+Owens" target="_blank" style="color:#0077c0;">Johnattan Owens</a>',
    start: getDate(24 * 7),
    duration: 24 * 60 * 60 * 1000,
    // percent: 0,
    type: "task",
    parentId: 11,
  },
  {
    id: 13,
    label: "test task",
    user:
      '<a href="https://www.google.com/search?q=Johnattan+Owens" target="_blank" style="color:#0077c0;">Johnattan Owens</a>',
    start: getDate(24 * 8),
    duration: 24 * 60 * 60 * 1000,
    // percent: 0,
    type: "task",
  },
  {
    id: 14,
    label: "test task",
    user:
      '<a href="https://www.google.com/search?q=Johnattan+Owens" target="_blank" style="color:#0077c0;">Johnattan Owens</a>',
    start: getDate(24 * 9),
    duration: 24 * 60 * 60 * 1000,
    // percent: 0,
    type: "task",
  },
  {
    id: 15,
    label: "test task",
    user:
      '<a href="https://www.google.com/search?q=Johnattan+Owens" target="_blank" style="color:#0077c0;">Johnattan Owens</a>',
    start: getDate(24 * 16),
    duration: 24 * 60 * 60 * 1000,
    // percent: 0,
    type: "task",
  },
];
let options = {
  taskMapping: {
    progress: "percent",
  },
  maxRows: 100,
  maxHeight: 500,
  title: {
    label: "Your project title as html (link or whatever...)",
    html: false,
  },
  row: {
    height: 24,
  },
  calendar: {
    hour: {
      display: true,
    },
  },
  chart: {
    progress: {
      bar: false,
    },
    expander: {
      display: true,
    },
  },
  taskList: {
    expander: {
      straight: false,
    },
    columns: [
      {
        id: 1,
        label: "ID",
        value: "id",
        width: 40,
      },
      {
        id: 2,
        label: "Description",
        value: "label",
        width: 200,
        expander: true,
        html: true,
        events: {
          click({ data, column }) {
            alert("description clicked!\n" + data.label);
          },
        },
      },
      {
        id: 3,
        label: "Assigned to",
        value: "user",
        width: 130,
        html: true,
      },
      {
        id: 3,
        label: "Start",
        value: (task) => dayjs(task.start).format("YYYY-MM-DD"),
        width: 78,
      },
      {
        id: 4,
        label: "Type",
        value: "type",
        width: 68,
      },
      // {
      //   id: 5,
      //   label: "%",
      //   value: "progress",
      //   width: 35,
      //   style: {
      //     "task-list-header-label": {
      //       "text-align": "center",
      //       width: "100%"
      //     },
      //     "task-list-item-value-container": {
      //       "text-align": "center",
      //       width: "100%"
      //     }
      //   }
      // }
    ],
  },
  locale: {
    name: "en",
    Now: "Now",
    "X-Scale": "Zoom-X",
    "Y-Scale": "Zoom-Y",
    "Task list width": "Task list",
    "Before/After": "Expand",
    "Display task list": "Task list",
  },
};

export default {
  name: "monthlyReportForm",
  mixins: [validationMixin, rolesMixin],
  components: {
    ActivityLog,
    feedBackForm,
    GanttElastic,
    GanttHeader,
    feedBackSection,
    Datepicker,
  },
  validations: {
    generalForm: {
      name: {
        required,
      },
      description: {
        required,
      },
      owner: {
        required,
      },
    },
  },
  data() {
    let dateFormat = "yyyy-MM-dd";
    let now = new Date();
    return {
      range: {
        to: null,
        from: null,
      },
      disableStartDates: {
        ranges: [],
      },
      disableEndDates: {
        ranges: [],
      },
      mileStoneRange: {
        dates: null,
      },
      disabledBefore: null,
      disabledAfter: null,
      ar: ar,
      rowIndex: null,
      CseRole: false,
      copyIni: true,
      filterPresets: [],
      CommentPresets: [],
      presets: false,
      lastcomments: [],
      tenantId: null,
      InitiativeNumber: null,
      openLogs: true,
      lastValue: null,
      yearlyIndex: 0,
      commentedFeild: null,
      dropdown: false,
      isApprovedByCSE: null,
      activateScroll: false,
      reporstSubmissiondate: null,
      owner: null,
      messageIcons: false,
      replyIcons: false,
      comment: {},
      show: false,
      hover: false,
      hoverColumn: null,
      commentValue: null,
      replyButton: "الرد",
      replyMessage: null,
      replyIndex: null,
      CreateReply: false,
      monthlyReportId: null,
      userMessage: "",
      userComments: [],
      openComment: false,
      commentFeildName: "",
      Activegfs: true,
      isActive: false,
      sending: false,
      checked: true,
      openlastComments: false,
      feedback: true,
      lastComment: true,
      commentSection: true,
      Highlight: false,
      currentTab: this.$t("generalinformation"),
      viewAttachment: [],
      fileUrl: [],
      sectionStatus: "empty",
      state: true,
      step: 1,
      isActiveGfs: false,
      isActiveClause: false,
      isActiveannualBalance: false,
      isActivevalueAfterRecommend: false,
      isActiveyear: false,
      isActiveyearE2019: false,
      isActiveyearE2020: false,
      isActiveyearE2021: false,
      isActiveyearE2022: false,
      isActiveyearE2023: false,
      isActiveeFutureyears: false,
      isActiveyearA2019: false,
      isActiveyearA2020: false,
      isActiveyearA2021: false,
      isActiveyearA2022: false,
      isActiveyearA2023: false,
      isActiveaFutureyears: false,
      totalExpectedvalue: 0,
      totalAchivedValue: 0,
      yearlySavaData: [],
      generalCommentFileUrlFields: [
        { key: "sr", label: "#" },
        { key: "fileName", label: "اسم الملف" },
        { key: "type", label: "النوع" },
        { key: "delete", label: "حذف" },
      ],
      generalCommentFileUrlFieldsNotDelete: [
        { key: "sr", label: "#" },
        { key: "fileName", label: "اسم الملف" },
        { key: "type", label: "النوع" },
      ],
      yearlySavefields: [
        { key: "clause", label: this.$t("Name") },
        { key: "yearE2019", label: this.$t("Year2019") },
        { key: "yearE2020", label: this.$t("Year2020") },
        { key: "yearE2021", label: this.$t("Year2021") },
        { key: "yearE2022", label: this.$t("Year2022") },
        { key: "yearE2023", label: this.$t("Year2023") },
        { key: "eFutureyears", label: this.$t("FuturesYears") },
        { key: "Total", label: this.$t("Total") },
      ],
      achivedSavingsfields: [
        { key: "clause", label: this.$t("Name") },
        { key: "yearA2019", label: this.$t("Year2019") },
        { key: "yearA2020", label: this.$t("Year2020") },
        { key: "yearA2021", label: this.$t("Year2021") },
        { key: "yearA2022", label: this.$t("Year2022") },
        { key: "yearA2023", label: this.$t("Year2023") },
        { key: "aFutureyears", label: this.$t("FuturesYears") },
        { key: "total", label: this.$t("Total") },
      ],
      tabsInfo: [
        { name: this.$t("generalinformation"), state: { value: "empty" } },
        {
          name: this.$t("financialdataandsaving"),
          state: { value: "empty" },
        },
        { name: this.$t("calculationofsavings"), state: { value: "empty" } },
        { name: this.$t("implementationsplan"), state: { value: "empty" } },
        { name: this.$t("supportRequired"), state: { value: "empty" } },
        { name: this.$t("GeneralComment"), state: { value: "empty" } },
        // {
        //   name: this.$t("summaryofimplementationplan"),
        //   state: { value: "empty" },
        // },
        { name: this.$t("reviewopportunity"), state: { value: "empty" } },
      ],
      isClassRed: false,
      sectionOne: false,
      sectionTwo: false,
      sectionThree: false,
      sectionFour: false,
      sectionFive: false,
      sectionSix: false,
      itemsss: [{ a: "إجمالي", b: "", c: "", d: "" }],
      expectedSaveAmount: 0,
      actualSaveAmount: 0,
      isSelectGFSDialog: false,
      gfsDescriptionModal: null,
      gfsCode: null,
      gfsModalFields: [
        { key: "code", label: "رقم البند" },
        { key: "description", label: "اسم البند" },
        { key: "action", label: this.$t("action") },
      ],
      support: {
        monthlyReportId: null,
        number: null,
        initiativeName: null,
        initiativeId: 0,
        supportType: null,
        description: null,
        id: 0,
      },
      oldsupport: {
        monthlyReportId: null,
        number: null,
        initiativeName: null,
        initiativeId: 0,
        supportType: null,
        description: null,
      },
      generalCommentFile: [],
      generalCommentFileUrl: [],
      generalComment: {
        description: null,
        id: 0,
        monthlyReportId: null,
        number: null,
        initiativeId: null,
        uploadMinutesOfMeeting: [],
      },
      oldgeneralComment: {
        description: null,
        id: 0,
        monthlyReportId: null,
        number: null,
        initiativeId: null,
        uploadMinutesOfMeeting: [],
      },
      totalCountGFS: 0,
      perPage: 10,
      currentPage: 1,
      options: {
        Keyword: "",
        // isActive: true,
        SkipCount: 0,
      },
      gfsModalItems: [],
      gfsModalMainItems: [],
      initiativeId: 0,
      generalFormType: "",
      activities: [
        { title: "Hiking", date: "2019-06-28" },
        { title: "Shopping", date: "2019-06-10" },
        { title: "Trekking", date: "2019-06-22" },
      ],
      typeChart: "first",
      showChart: false,

      showlog: true,
      activityLogs: [],
      InitiativeID: 0,
      options: {},
      feedBackFormObj: {},
      addValueFinancialStatement: this.$t("addNewStatmentGFS"),
      addValueFinancialYear: this.$t("addNewStatmentSaving"),
      addValueImplementationPlan: this.$t("addImplementationPlan"),
      oldsummaryOfInitiativeForm: {
        summeryThisMonth: null,
        planNextMonth: null,
        generalComment: null,
        editable: true,
        sectionStatus: null,
        initiativeId: this.InitiativeID,
        id: 0,
      },
      summaryOfInitiativeForm: {
        summeryThisMonth: null,
        planNextMonth: null,
        editable: true,
        sectionStatus: null,
        generalComment: null,
        initiativeId: this.InitiativeID,
        id: 0,
      },
      oldGeneralForm: {
        name: null,
        description: null,
        expSaveValue: null,
        owner: null,
        deputyShip: null,
        startDate: null,
        endDate: null,
        type: null,
        savingTypeDescription: null,
        editable: true,
        typeOfSaving: "draft",
        id: 0,
      },
      generalForm: {
        name: null,
        description: null,
        expSaveValue: null,
        owner: null,
        deputyShip: null,
        startDate: null,
        endDate: null,
        type: null,
        savingTypeDescription: null,
        editable: true,
        typeOfSaving: "draft",
        id: 0,
      },

      financialForm: {
        clause: null,
        gfs: null,
        annualBalance: null,
        valueAfterRecommend: null,
        initiativeId: this.InitiativeID,
        editable: true,
        id: 0,
      },
      financialSavingStatements: [],

      financialYearForm: {
        year: null,
        actualSaveAmount: null,
        initiativeId: this.InitiativeID,
        editable: true,
        expectedSaveAmount: null,
        id: 0,
      },
      achivedSavings: [],
      expcetdSave: [],
      yearlySaves: [],
      CyearlySaves: [],
      isCalculationSavingData: false,
      lastMonthIniciative: null,
      oldcalculationSaving: {
        calOfSaving: null,
        uploadFiles: [],
        uploadCalcOfSavings: [],
        initiativeId: this.InitiativeID,
        editable: true,
      },
      calculationSaving: {
        calOfSaving: null,
        uploadFiles: [],
        uploadCalcOfSavings: [],
        initiativeId: this.InitiativeID,
        editable: true,
        id: 0,
      },
      calculationOfSavings: [],

      implementationPlanForm: {
        serialNo: null,
        name: "",
        targetSDate: null,
        targetEDate: null,
        actualSDate: null,
        actualEDate: null,
        percentage: null,
        milstoneStatus: "notstarted",
        initiativeId: this.InitiativeID,
        editable: true,
        id: 0,
      },
      mileStones: [
        // {
        //   actualEDate: "0001-01-01",
        //   actualSDate: "0001-01-01",
        //   editable: true,
        //   id: 0,
        //   initiativeId: this.InitiativeID,
        //   name: this.$t("identificationOfOpportunity"),
        //   targetEDate: "0001-01-01",
        //   targetSDate: "0001-01-01",
        // },
        // {
        //   actualEDate: "0001-01-01",
        //   actualSDate: "0001-01-01",
        //   editable: true,
        //   id: 0,
        //   initiativeId: this.InitiativeID,
        //   name: this.$t("detailingTheRecommendation"),
        //   targetEDate: "0001-01-01",
        //   targetSDate: "0001-01-01",
        // },
        // {
        //   actualEDate: "0001-01-01",
        //   actualSDate: "0001-01-01",
        //   editable: true,
        //   id: 0,
        //   initiativeId: this.InitiativeID,
        //   name: this.$t("realizationOfSavings"),
        //   targetEDate: "0001-01-01",
        //   targetSDate: "0001-01-01",
        // },
      ],

      currentOwner: "",
      CmileStones: [],
      isCreateDialog: false,
      mainFormSending: true,
      userSaved: false,
      sending: false,
      lastUser: null,
      currentPage: 1,
      isReturnBack: false,
      // Note `isActive` is left out and will not appear in the rendered table

      financialYearFields: [
        { key: "year", label: this.$t("year") },
        {
          label: this.$t("expectedSavings") + " (ريال سعودي) ",
          key: "expectedSaveAmount",
        },
        {
          label: this.$t("actualSavings") + " (ريال سعودي) ",
          key: "actualSaveAmount",
        },
        { key: "actions", label: this.$t("action") },
      ],
      financialYearItems: [],

      financialSavingFields: [
        { key: "clause", label: this.$t("item") },
        { key: "gfs", label: this.$t("gfs") },
        {
          key: "annualBalance",
          label: this.$t("annualBaseline"),
        },
        { key: "year", label: "تاريخ احتساب خط الأساس" },
        {
          key: "valueAfterRecommend",
          label: this.$t("annualWorthAfterOrder"),
        },
        { key: "actions", label: this.$t("action") },
      ],
      financialSavingfields: [
        { key: "clause", label: this.$t("item") },
        { key: "gfs", label: this.$t("gfs") },
        {
          key: "annualBalance",
          label: this.$t("annualBaseline"),
        },
        { key: "year", label: "تاريخ احتساب خط الأساس" },
        {
          key: "valueAfterRecommend",
          label: this.$t("annualWorthAfterOrder"),
        },
      ],
      oldfinancialSavingStatements: [],
      CfinancialSavingStatements: [],
      financialSavingStatements: [],
      newInitiative: false,
      sortBy: "actualSDate",
      sortDesc: false,
      ImplementationPlanFields: [
        { key: "serialNo", label: "#" },
        { key: "name", label: this.$t("nameOfMentor") },
        {
          key: "targetSDate",
          label: this.$t("intendedStartDate"),
          formatter: (value, key, item) => {
            return format(item.targetSDate, dateFormat);
          },
        },
        {
          key: "targetEDate",
          label: this.$t("intendedEndDate"),
          formatter: (value, key, item) => {
            return format(item.targetEDate, dateFormat);
          },
        },
        { key: "milstoneStatus", label: this.$t("status") },
        // {
        //   key: "actualSDate",
        //   label: this.$t("actualStartDate"),
        //   formatter: (value, key, item) => {
        //     return format(item.actualSDate, dateFormat);
        //   },
        //   sortable: true,
        // },
        // {
        //   key: "actualEDate",
        //   label: this.$t("actualEndDate"),
        //   formatter: (value, key, item) => {
        //     return format(item.actualEDate, dateFormat);
        //   },
        // },
      ],
      implementationPlanFields: [
        { key: "serialNo", label: "#" },
        { key: "name", label: this.$t("nameOfMentor") },
        {
          key: "targetSDate",
          label: this.$t("intendedStartDate"),
          formatter: (value, key, item) => {
            return format(item.targetSDate, dateFormat);
          },
        },
        {
          key: "targetEDate",
          label: this.$t("intendedEndDate"),
          formatter: (value, key, item) => {
            return format(item.targetEDate, dateFormat);
          },
        },
        // {
        //   key: "actualSDate",
        //   label: this.$t("actualStartDate"),
        //   formatter: (value, key, item) => {
        //     return format(item.actualSDate, dateFormat);
        //   },
        //   sortable: true,
        // },
        // {
        //   key: "actualEDate",
        //   label: this.$t("actualEndDate"),
        //   formatter: (value, key, item) => {
        //     return format(item.actualEDate, dateFormat);
        //   },
        // },
        { key: "milstoneStatus", label: this.$t("status") },
        { key: "actions", label: this.$t("action") },
      ],
      isUpdate: false,
      tempFinancialForm: {},
      tempFinancialYearForm: {},
      tempImplementationPlanForm: {},
      propData: {
        sections: [
          "معلومات عامة",
          "البيانات المالية والوفورات",
          "الوفورات خلال السنوات المالية",
          "آلية احتساب الوفر",
          "خطة التنفيذ",
          "ملخص خطة التنفيذ",
        ],
        type: "FeedBack",
      },
      formDisabled: false,
      data: [],
      tasks,
      options,
      dynamicStyle: {},
      lastId: 16,
    };
  },
  watch: {
    currentPage(newPage) {
      this.options.SkipCount = this.perPage * (newPage - 1);
      this.getGFSCodes();
    },
  },
  filters: {
    getRelativeTime(value) {
      let dbDate = value;
      dbDate = dbDate.toString().trim();
      moment.locale("en", {
        relativeTime: {
          future: "in %s",
          past: "%s ago",
          s: "a few seconds",
          ss: "%d seconds",
          m: "a minute",
          mm: "%d minutes",
          h: "an hour",
          hh: "%d hours",
          d: "a day",
          dd: "%d days",
          w: "a week",
          ww: "%d weeks",
          M: "a month",
          MM: "%d months",
          y: "a year",
          yy: "%d years",
        },
      });
      let CurretTimezone = moment.tz.guess(); //-------user current timezone
      let date = moment.utc(dbDate).tz(CurretTimezone);
      return (date = moment(date).fromNow());
    },
    trimImageName: (payload) => {
      if (payload) {
        let newString = payload.split("_");
        return newString[1];
      }
    },
    filterName(payload) {
      if (payload.loginRole) {
        if (
          payload.loginRole == "CSE Approver" ||
          payload.loginRole == "CSE Reviewer A" ||
          payload.loginRole == "CSE Reviewer B" ||
          payload.loginRole == "CSE Special Reviewer"
        ) {
          return "CSE";
        } else {
          let name = payload.fromUserName;
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
        }
      }
    },
    name(payload) {
      if (payload) {
        let name = payload;
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
      }
    },
  },
  computed: {
    checkExpectedvalue() {
      if (
        this.totalExpectedvalue &&
        this.totalExpectedvalue > 0 &&
        this.generalForm.expSaveValue
      ) {
        return this.totalExpectedvalue >
          parseInt(this.generalForm.expSaveValue.replace(/,/g, ""))
          ? true
          : false;
      }
    },
    reporstSubmission() {
      let d = null;
      if (this.reporstSubmissiondate) {
        d = this.reporstSubmissiondate.split("T")[0];
      }
      return d;
    },
    expSaveValueArabic() {
      if (this.generalForm.expSaveValue) {
        return new Tafgeet(
          this.generalForm.expSaveValue.replace(/,/g, ""),
          "SAR"
        ).parse();
      }
    },
    checkFinancialForm() {
      return (
        JSON.stringify(this.tempFinancialForm) !==
        JSON.stringify(this.financialForm)
      );
    },
    checkYearsStatementForm() {
      return (
        JSON.stringify(this.tempFinancialYearForm) !==
        JSON.stringify(this.financialYearForm)
      );
    },
    checkImplementationPlanForm() {
      return (
        JSON.stringify(this.tempImplementationPlanForm) !==
        JSON.stringify(this.implementationPlanForm)
      );
    },
    iAmOwner() {
      if (this.currentOwner == "CSE Special Reviewer") {
        const roles = ["CSE Reviewer A", "CSE Reviewer B"];
        return roles.some((role) => role.includes(this.$user.currentRole()));
      }
      return this.currentOwner === this.$user.currentRole() ? true : false;
    },
    currentRole() {
      return this.$user.currentRole();
    },
  },
  methods: {
    showYears(payload) {
      this.rowIndex = payload.index;
      this.dropdown = !this.dropdown;
    },
    checkCommented(payload) {
      let check = this.userComments.some((item) => {
        if (item.commentedColumn === payload) return true;
        else return false;
      });
      return check;
    },
    getPresets() {
      this.$CommentPresets.getAllpresets().then((res) => {
        if (res.success) {
          // this.CommentPresets = res.data.items;
        }
      });
    },
    getCommentspresets() {
      this.$CommentPresets.getAllCommentspresets().then((res) => {
        if (res.success) {
          this.CommentPresets = [...res.data];
        }
      });
    },
    FeedBackSection() {
      this.initiativeId = this.initiativeId;
      if (this.showlog && this.commentSection && this.lastComment) {
        this.openLogs = !this.openLogs;
        this.feedback = !this.feedback;
        this.$openSide.$emit("open-sidebar", null, null, null, this.feedback);
        return;
      }
      if (!this.commentSection || !this.showlog || !this.lastComment) {
        this.feedback = !this.feedback;
        this.commentSection = !this.feedback;
        this.lastComment = !this.feedback;
        this.showlog = !this.feedback;
        return;
      }
    },
    lastCommentSection() {
      if (this.commentSection && this.showlog && this.feedback) {
        this.lastComment = !this.lastComment;
        this.openLogs = !this.openLogs;
        this.$openSide.$emit("open-sidebar", null, null, this.openLogs, null);
        setTimeout(() => {
          let element = document.getElementById("comment-wrapper");
          element.scrollTop = element.scrollHeight;
        }, 1000);
        return;
      }
      if (!this.commentSection || !this.showlog || !this.feedback) {
        this.lastComment = !this.lastComment;
        this.commentSection = !this.lastComment;
        this.feedback = !this.lastComment;
        this.showlog = !this.lastComment;
        return;
      }
    },
    lastReportComments() {
      let data = {
        InitiativeNumber: this.InitiativeNumber,
        tenantId: this.tenantId,
        ReportId: parseInt(this.monthlyReportId),
        Initiavtiveid: parseInt(this.initiativeId),
      };
      this.$userComments.LastMonthComment(data).then((res) => {
        if (res.success) {
          this.lastcomments = res.data;
          // this.userComments = res.data;
          // let element = document.getElementById("comment-wrapper");
          // element.scrollTop = element.scrollHeight;
        }
        this.$hideLoader();
      });
    },
    openActivityLog() {
      if (this.commentSection && this.lastComment && this.feedback) {
        this.openLogs = !this.openLogs;
        this.showlog = !this.showlog;
        this.$openSide.$emit("open-sidebar", null, this.openLogs, null, null);
        return;
      }
      if (!this.commentSection || !this.lastComment || !this.feedback) {
        this.showlog = !this.showlog;
        this.commentSection = !this.showlog;
        this.feedback = !this.showlog;
        this.lastComment = !this.showlog;
        return;
      }
    },
    matchYearlySave(payload, name) {
      let value = null;
      if (this.CyearlySaves != undefined) {
        for (let i = 0; i < this.CyearlySaves.length; i++) {
          if (payload != undefined) {
            if (
              this.CyearlySaves[payload.index]["old" + `${name}`] !==
              payload.item[`${name}`]
            ) {
              value = this.CyearlySaves[payload.index]["old" + `${name}`];
            }
          }
        }
      }
      return value;
    },
    lastYearlySave(payload, name) {
      let value = null;
      this.lastValue = null;
      if (this.CyearlySaves != undefined) {
        for (let i = 0; i < this.CyearlySaves.length; i++) {
          if (payload != undefined) {
            if (
              this.CyearlySaves[payload.index]["old" + `${name}`] !==
              payload.item[`${name}`]
            ) {
              value = this.CyearlySaves[payload.index]["old" + `${name}`];
            }
          }
        }
      }
      this.lastValue = value;
    },
    matchMileStone(payload, name) {
      let value = null;
      if (this.CmileStones != undefined) {
        for (let i = 0; i < this.CmileStones.length; i++) {
          if (payload != undefined) {
            if (
              this.CmileStones[payload.index]["old" + `${name}`] !==
              payload.item[`${name}`]
            ) {
              value = this.CmileStones[payload.index]["old" + `${name}`];
            }
          }
        }
      }
      return value;
    },
    lastMileStone(payload, name) {
      let value = null;
      if (this.CmileStones != undefined) {
        for (let i = 0; i < this.CmileStones.length; i++) {
          if (payload != undefined) {
            if (
              this.CmileStones[payload.index]["old" + `${name}`] !==
              payload.item[`${name}`]
            ) {
              value = this.CmileStones[payload.index]["old" + `${name}`];
            }
          }
        }
      }
      this.lastValue = value;
    },
    // asssignYear(payload, year = null) {
    //   if (payload.year && payload.id != 0) {
    //     this.yearlySavaData = this.yearlySavaData.map((item) => {
    //       if (item.id === payload.id) {
    //         item.year = year;
    //         this.dropdown = true;
    //       }
    //     });
    //   }
    //   if (!payload.year) {
    //     payload["year"] = year;
    //     this.dropdown = true;
    //   }
    // },
    scrollSection(payload) {
      if (this.messageIcons) {
        this.commentedFeild = payload.commentedColumn;
      } else {
        this.commentedFeild = null;
      }
    },
    scrollCommentBox(payload, item = null) {
      if (payload) {
        let el = document.getElementById("name" + `${item.commentedColumn}`);
        el.scrollIntoView({ block: "start", behavior: "smooth" });
      }
    },
    CloseMessageBox() {
      this.userMessage = null;
      this.openComment = !this.openComment;
    },
    onDeleteFile(e, item, index) {
      e.preventDefault();
      e.stopPropagation();

      this.generalComment.uploadMinutesOfMeeting.splice(index, 1);
      this.generalCommentFileUrl.splice(index, 1);
      // delete this.$refs.file.files[0];
    },
    onDeleteFileCal(e, item, index) {
      e.preventDefault();
      e.stopPropagation();

      this.calculationSaving.uploadCalcOfSavings.splice(index, 1);
      this.fileUrl.splice(index, 1);
      // delete this.$refs.file.files[0];
    },
    editComment(payload, check) {
      if (check) {
        this.openComment = !this.openComment;
        this.userMessage = payload.reply;
        this.comment = payload;
      } else {
        this.openComment = !this.openComment;
        this.userMessage = payload.comment;
        this.comment = payload;
      }
    },
    deleteComment(payload, check) {
      if (check) {
        this.$showLoader();
        this.$userReply.Delete(payload).then((res) => {
          if (res.success) {
            this.getcomments();
          } else {
            this.$swal({
              icon: "error",
              type: "error",
              confirmButtonText: "موافق",
              title: res.message.message,
            });
          }
          this.$hideLoader();
        });
      } else {
        this.$showLoader();
        if (payload.id) {
          let data = {
            id: payload.id,
          };
          this.$userComments.Delete(data).then((res) => {
            if (res.success) {
              this.getcomments();
            } else {
              this.$swal({
                icon: "error",
                type: "error",
                confirmButtonText: "موافق",
                title: res.message.message,
              });
            }
            this.$hideLoader();
          });
        }
      }
    },
    mouseLeave() {
      this.hover = !this.hover;
    },
    mouseHover(payload) {
      if (payload) {
        this.hover = true;
        this.hoverColumn = payload;
      }
    },
    saveReply(payload) {
      let reply = {
        reply: this.replyMessage,
        monthlyReportCommentsID: payload.id,
      };
      this.$showLoader();
      this.$userReply.Create(reply).then((res) => {
        if (res.success) {
          this.replyMessage = "";
          this.replyButton = "الرد";
          this.CreateReply = !this.CreateReply;
          this.getcomments();
        } else {
          this.$swal({
            icon: "error",
            type: "error",
            confirmButtonText: "موافق",
            title: res.message.message,
          });
        }
        this.$hideLoader();
      });
    },
    createReply(payload, index, button) {
      if (
        this.currentOwner === this.currentRole ||
        this.currentRole === "CSE Special Reviewer"
      ) {
        if (!this.isApprovedByCSE) {
          if (button === "الرد") {
            this.replyIndex = index;
            this.CreateReply = true;
            this.replyButton = "إلغاء الرد";
          }
          if (button === "إلغاء الرد") {
            this.replyButton = "الرد";
            this.CreateReply = false;
          }
        }
      }
    },
    saveComment() {
      let element = document.getElementById("comment-wrapper");
      element.scrollTop = element.scrollHeight;
      if (this.comment.reply) {
        this.comment.reply = this.userMessage;
        this.$showLoader();
        this.$userReply.Update(this.comment).then((res) => {
          if (res.success) {
            this.userMessage = null;
            this.openComment = !this.openComment;
            this.getcomments();
          } else {
            this.$swal({
              icon: "error",
              type: "error",
              confirmButtonText: "موافق",
              title: res.message.message,
            });
          }
          this.$hideLoader();
        });
      } else {
        this.comment.comment = this.userMessage;
        if (this.comment.id) {
          this.$userComments.Update(this.comment).then((res) => {
            this.$showLoader();
            if (res.success) {
              this.userMessage = null;
              this.openComment = !this.openComment;
              this.getcomments();
              let element = document.getElementById("comment-wrapper");
              element.scrollTop = element.scrollHeight;
            } else {
              this.$swal({
                icon: "error",
                type: "error",
                confirmButtonText: "موافق",
                title: res.message.message,
              });
            }
            this.$$hideLoader();
          });
        } else {
          (this.comment = {
            monthlyReportId: this.monthlyReportId,
            initiativeID: this.initiativeId,
            comment: this.userMessage,
            commentedColumn: this.commentFeildName.name,
            financialSavingStatementGFS: this.commentValue,
          }),
            this.userComments.push(this.comment);
          this.userMessage = null;
          this.commentFeildName = null;
          this.$showLoader();
          this.$userComments.Create(this.comment).then((res) => {
            if (res.success) {
              this.openComment = !this.openComment;
              this.getcomments();
            } else {
              this.$swal({
                icon: "error",
                type: "error",
                confirmButtonText: "موافق",
                title: res.message.message,
              });
            }
            this.$hideLoader();
          });
        }
      }
    },
    getcomments() {
      let data = {
        id: this.InitiativeID,
        reportid: this.monthlyReportId,
      };
      this.$userComments.GetAllComments(data).then((res) => {
        if (res.success) {
          this.userComments = res.data;
          let element = document.getElementById("comment-wrapper");
          element.scrollTop = element.scrollHeight;
        } else {
          this.$swal({
            icon: "error",
            type: "error",
            confirmButtonText: "موافق",
            title: res.message.message,
          });
        }
        this.$hideLoader();
      });
    },
    openCommentsec(payload = null, row = null) {
      if (this.lastComment && this.showlog && this.feedback) {
        this.filterPresets = [];
        this.userMessage = null;
        if (this.CseRole) {
          this.CommentPresets.forEach((item) => {
            if (payload.section === item.setKey) {
              this.filterPresets.push(item);
            }
          });
        }

        const element = (element) => element.commentedColumn === payload.name;
        let check = this.userComments.some(element);
        if (
          (!check && this.currentOwner === this.currentRole) ||
          (!check && this.currentRole === "CSE Special Reviewer")
        ) {
          this.openComment = true;
        }
        if (!this.isApprovedByCSE) {
          this.commentFeildName = payload;
          if (row) {
            this.commentValue = row.clause;
          }
          this.$root.$emit("bv::hide::tooltip", payload.name);
          if (this.commentSection && this.openLogs) {
            this.openLogs = !this.openLogs;
            this.commentSection = !this.commentSection;
            let element = document.getElementById("comment-wrapper");
            element.scrollTop = element.scrollHeight;
            this.$openSide.$emit(
              "open-sidebar",
              this.commentSection,
              null,
              null,
              null
            );
          }
        }
      }
    },
    generalFileupload() {
      var arr = [];
      event.target.files.forEach((item) => {
        this.generalComment.uploadMinutesOfMeeting.push(item);
        let _ = {
          name: item.name,
          type: item.type.split("/")[1],
          link: URL.createObjectURL(item),
        };
        this.generalCommentFileUrl.push(_);
      });
    },
    handleGeneralFile() {
      document.getElementById("generalcomment").click();
    },
    GeneralCommentSave() {
      if (this.InitiativeID > 0) {
        let formData = new FormData();
        for (
          let i = 0;
          i < this.generalComment.uploadMinutesOfMeeting.length;
          i++
        ) {
          formData.append(
            "uploadFiles",
            this.generalComment.uploadMinutesOfMeeting[i]
          );
        }
        this.generalComment.initiativeId = this.InitiativeID;
        this.generalComment.monthlyReportId = this.generalForm.monthlyReportId;
        formData.append("obj", JSON.stringify(this.generalComment));
        this.sending = true;
        this.$showLoader();
        if (this.generalComment.id > 0) {
          this.$meetingService.update(formData).then((res) => {
            this.generalCommentFile = [];
            this.generalCommentFileUrl = [];
            if (res.success) {
              this.generalComment.uploadMinutesOfMeeting = [];
              this.getInitiative();
              this.step = 7;

              // this.generalComment = res.data;
            } else {
              this.$swal({
                icon: "error",
                type: "error",
                confirmButtonText: "موافق",
                title: res.message.message,
              });
              this.generalComment.uploadMinutesOfMeeting = [];
              this.getInitiative();
              this.$hideLoader();
            }
            // this.$hideLoader();
            this.sending = false;
          });
        } else {
          this.$meetingService.create(formData).then((res) => {
            this.generalCommentFileUrl = [];
            this.generalCommentFile = [];
            if (res.success) {
              this.generalComment.uploadMinutesOfMeeting = [];
              this.getInitiative();
              this.step = 7;
              // this.generalComment = res.data;
            } else {
              this.$swal({
                icon: "error",
                type: "error",
                confirmButtonText: "موافق",
                title: res.message.message,
              });
              this.generalComment.uploadMinutesOfMeeting = [];
              this.getInitiative();
              this.$hideLoader();
            }
            // this.$hideLoader();
            this.sending = false;
          });
        }
      } else {
        this.$swal({
          icon: "error",
          type: "error",
          confirmButtonText: "موافق",
          title: this.$t("formIsEmpty"),
        });
      }
    },
    SaveSupport() {
      this.support.initiativeName = this.generalForm.name;
      this.support.initiativeId = this.initiativeId;
      let id = this.support.id;
      if (!id) {
        this.$showLoader();
        this.$supportService.create(this.support).then((res) => {
          if (res.success) {
            this.step = 6;
            this.support = res.data;
            this.getInitiative();
          } else {
            this.$swal({
              icon: "error",
              type: "error",
              confirmButtonText: "موافق",
              title: res.message.message,
            });
            this.$hideLoader();
          }
          // this.$hideLoader();
          this.sending = false;
        });
      } else {
        this.$showLoader();
        this.$supportService.update(this.support).then((res) => {
          if (res.success) {
            this.step = 6;
            this.support = res.data;
            this.getInitiative();
          } else {
            this.$swal({
              icon: "error",
              type: "error",
              confirmButtonText: "موافق",
              title: res.message.message,
            });
            this.$hideLoader();
          }
          // this.$hideLoader();
          this.sending = false;
        });
      }
    },
    filterRow(payload) {
      if (payload.gfs != null && payload.clause != null) this.Activegfs = true;
    },
    trimImage: function(payload) {
      if (payload) {
        let newString = payload.split(".");
        return newString[1];
      }
    },
    calculateExpectedSavingNew() {
      let sumVal = 0;
      let table = document.getElementById("Expectedtable");
      let _table = document.getElementById("expectedtable");
      if (table) {
        let tbody = table.getElementsByTagName("tbody")[0];
        let tableRow = tbody.getElementsByTagName("tr");
        for (var t = 0; t < tableRow.length; t++) {
          sumVal += parseInt(
            tableRow[t].cells[7]
              .getElementsByTagName("span")[0]
              .innerHTML.replace(/,/g, "")
          );
        }
      }
      if (_table) {
        let tbody = _table.getElementsByTagName("tbody")[0];
        let tableRow = tbody.getElementsByTagName("tr");
        for (var t = 0; t < tableRow.length; t++) {
          sumVal += parseInt(
            tableRow[t].cells[7]
              .getElementsByTagName("span")[0]
              .innerHTML.replace(/,/g, "")
          );
        }
      }
      this.totalExpectedvalue = sumVal;
      return this.totalExpectedvalue
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    calculateASavingNew() {
      let _table = document.getElementById("achived");
      let table = document.getElementById("Achivedtable");
      let sumVal = 0;
      if (_table) {
        let tbody = _table.getElementsByTagName("tbody")[0];
        let tableRow = tbody.getElementsByTagName("tr");
        for (var t = 0; t < tableRow.length; t++) {
          sumVal += parseInt(
            tableRow[t].cells[7]
              .getElementsByTagName("span")[0]
              .innerHTML.replace(/,/g, "")
          );
        }
      }
      if (table) {
        let tbody = table.getElementsByTagName("tbody")[0];
        let tableRow = tbody.getElementsByTagName("tr");
        for (var t = 0; t < tableRow.length; t++) {
          sumVal += parseInt(
            tableRow[t].cells[7]
              .getElementsByTagName("span")[0]
              .innerHTML.replace(/,/g, "")
          );
        }
      }
      this.totalAchivedValue = sumVal;
      return this.totalAchivedValue
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    calculateExpectedtotal(payload) {
      var x = 0;
      if (payload.yearE2019 != null && payload.yearE2019 != "") {
        x += parseInt(payload.yearE2019.replace(/,/g, ""));
      }
      if (payload.yearE2020 != null && payload.yearE2020 != "") {
        x += parseInt(payload.yearE2020.replace(/,/g, ""));
      }
      if (payload.yearE2021 != null && payload.yearE2021 != "") {
        x += parseInt(payload.yearE2021.replace(/,/g, ""));
      }
      if (payload.yearE2022 != null && payload.yearE2022 != "") {
        x += parseInt(payload.yearE2022.replace(/,/g, ""));
      }
      if (payload.yearE2023 != null && payload.yearE2023 != "") {
        x += parseInt(payload.yearE2023.replace(/,/g, ""));
      }
      if (payload.eFutureyears != null && payload.eFutureyears != "") {
        x += parseInt(payload.eFutureyears.replace(/,/g, ""));
      }
      if (x === "NaN") {
        return 0;
      } else {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
    calculateAchivedTotal(payload) {
      var x = 0;
      if (payload.yearA2019 != null && payload.yearA2019 != "") {
        x += parseInt(payload.yearA2019.replace(/,/g, ""));
      }
      if (payload.yearA2020 != null && payload.yearA2020 != "") {
        x += parseInt(payload.yearA2020.replace(/,/g, ""));
      }
      if (payload.yearA2021 != null && payload.yearA2021 != "") {
        x += parseInt(payload.yearA2021.replace(/,/g, ""));
      }
      if (payload.yearA2022 != null && payload.yearA2022 != "") {
        x += parseInt(payload.yearA2022.replace(/,/g, ""));
      }
      if (payload.yearA2023 != null && payload.yearA2023 != "") {
        x += parseInt(payload.yearA2023.replace(/,/g, ""));
      }
      if (payload.aFutureyears != null && payload.aFutureyears != "") {
        x += parseInt(payload.aFutureyears.replace(/,/g, ""));
      }
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    calculateExpectedSaving(item) {
      var x = 0;
      if (item === "yearE2019") {
        for (let i = 0; i < this.yearlySavaData.length; i++) {
          if (this.yearlySavaData[i].yearE2019 != null) {
            x += parseInt(this.yearlySavaData[i].yearE2019.replace(/,/g, ""));
          }
        }
      }
      if (item === "yearE2020") {
        for (let i = 0; i < this.yearlySavaData.length; i++) {
          if (this.yearlySavaData[i].yearE2020 != null) {
            x += parseInt(this.yearlySavaData[i].yearE2020.replace(/,/g, ""));
          }
        }
      }
      if (item === "yearE2021") {
        for (let i = 0; i < this.yearlySavaData.length; i++) {
          if (this.yearlySavaData[i].yearE2021 != null) {
            x += parseInt(this.yearlySavaData[i].yearE2021.replace(/,/g, ""));
          }
        }
      }
      if (item === "yearE2022") {
        for (let i = 0; i < this.yearlySavaData.length; i++) {
          if (this.yearlySavaData[i].yearE2022 != null) {
            x += parseInt(this.yearlySavaData[i].yearE2022.replace(/,/g, ""));
          }
        }
      }
      if (item === "yearE2023") {
        for (let i = 0; i < this.yearlySavaData.length; i++) {
          if (
            this.yearlySavaData[i].yearE2023 != null &&
            this.yearlySavaData[i].yearE2023 != ""
          ) {
            x += parseInt(this.yearlySavaData[i].yearE2023.replace(/,/g, ""));
          }
        }
      }
      if (item === "eFutureyears") {
        for (let i = 0; i < this.yearlySavaData.length; i++) {
          if (this.yearlySavaData[i].eFutureyears != null) {
            x += parseInt(
              this.yearlySavaData[i].eFutureyears.replace(/,/g, "")
            );
          }
        }
      }
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    calculateAchivedSaving(item) {
      var x = 0;
      if (item === "yearA2019") {
        for (let i = 0; i < this.yearlySavaData.length; i++) {
          if (this.yearlySavaData[i].yearA2019 != null) {
            x += parseInt(this.yearlySavaData[i].yearA2019.replace(/,/g, ""));
          }
        }
      }
      if (item === "yearA2020") {
        for (let i = 0; i < this.yearlySavaData.length; i++) {
          if (this.yearlySavaData[i].yearA2020 != null) {
            x += parseInt(this.yearlySavaData[i].yearA2020.replace(/,/g, ""));
          }
        }
      }
      if (item === "yearA2021") {
        for (let i = 0; i < this.yearlySavaData.length; i++) {
          if (this.yearlySavaData[i].yearA2021 != null) {
            x += parseInt(this.yearlySavaData[i].yearA2021.replace(/,/g, ""));
          }
        }
      }
      if (item === "yearA2022") {
        for (let i = 0; i < this.yearlySavaData.length; i++) {
          if (this.yearlySavaData[i].yearA2022 != null) {
            x += parseInt(this.yearlySavaData[i].yearA2022.replace(/,/g, ""));
          }
        }
      }
      if (item === "yearA2023") {
        for (let i = 0; i < this.yearlySavaData.length; i++) {
          if (this.yearlySavaData[i].yearA2023 != null) {
            x += parseInt(this.yearlySavaData[i].yearA2023.replace(/,/g, ""));
          }
        }
      }
      if (item === "aFutureyears") {
        for (let i = 0; i < this.yearlySavaData.length; i++) {
          if (this.yearlySavaData[i].aFutureyears != null) {
            x += parseInt(
              this.yearlySavaData[i].aFutureyears.replace(/,/g, "")
            );
          }
        }
      }
      if (item === "total") {
        for (let i = 0; i < this.yearlySavaData.length; i++) {
          if (this.yearlySavaData[i].total != null) {
            x += parseInt(this.yearlySavaData[i].total.replace(/,/g, ""));
          }
        }
      }
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    deleteGfs(payload) {
      let data = {
        initiativeid: payload.item.initiativeId,
        gfs: payload.item.gfs,
      };
      if (payload.item.id == 0 || !payload.item.id) {
        let length = this.yearlySavaData.length;
        this.yearlySavaData.splice(payload.index, 1);
        this.Activegfs = true;
        setTimeout(() => {
          this.calculateExpectedSavingNew();
          this.calculateASavingNew();
        }, 200);
      } else {
        this.$showLoader();
        this.$financialSavingService.delete(data).then((res) => {
          if (res.success) {
            this.getInitiative();
            setTimeout(() => {
              this.calculateExpectedSavingNew();
              this.calculateASavingNew();
            }, 200);
          } else {
            this.$swal({
              icon: "error",
              type: "error",
              confirmButtonText: "موافق",
              title: res.message.message,
            });
            this.$hideLoader();
          }
          // this.$hideLoader();
          this.sending = false;
        });
      }
    },
    addGfs(payload) {
      if (payload) {
        let _ = {
          clause: null,
          gfs: null,
          annualBalance: null,
          valueAfterRecommend: null,
          initiativeId: this.InitiativeID,
          editable: true,
          id: 0,
          year: null,
        };
        this.yearlySavaData.push(_);
        this.Activegfs = false;
      }
    },
    activetabScroll(index, e) {
      e.preventDefault();
      this.activateScroll = true;
      let el = document.getElementById(`${index.name}`);
      el.scrollIntoView({ block: "start", behavior: "smooth" });
      this.currentTab = this.$t(`${index.name}`);
      setTimeout(() => {
        this.activateScroll = false;
      }, 1000);
      if (this.InitiativeID > 0) this.step = index + 1;
    },
    getValidationClass(fieldName) {
      const field = this.$v.generalForm[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    hideComment() {
      if (this.showlog && this.lastComment && this.feedback) {
        this.openLogs = !this.openLogs;
        this.commentSection = !this.commentSection;
        this.$openSide.$emit(
          "open-sidebar",
          this.commentSection,
          null,
          null,
          null
        );
        setTimeout(() => {
          let element = document.getElementById("comment-wrapper");
          element.scrollTop = element.scrollHeight;
        }, 1000);
        this.openComment = false;
      }
      if (!this.showlog || !this.lastComment || !this.feedback) {
        this.commentSection = !this.commentSection;
        this.showlog = !this.commentSection;
        this.feedback = !this.commentSection;
        this.lastComment = !this.commentSection;
        return;
      }
    },
    updaloadFile() {
      document.getElementById("imageUpload").click();
    },
    handleUploadFile(event) {
      event.target.files.forEach((item) => {
        this.calculationSaving.uploadCalcOfSavings.push(item);
        let _ = {
          name: item.name,
          type: item.type.split("/")[1],
          link: URL.createObjectURL(item),
        };
        this.fileUrl.push(_);
      });
    },
    activetab(index, e) {
      this.currentTab = index.name;
      setTimeout(() => {
        this.calculateExpectedSavingNew();
        this.calculateASavingNew();
      }, 2000);
      if (this.InitiativeID > 0) this.step = index + 1;
    },
    addTask() {
      this.tasks.push({
        id: this.lastId++,
        label:
          '<a href="https://images.pexels.com/photos/423364/pexels-photo-423364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" target="_blank" style="color:#0077c0;">Yeaahh! you have added a task bro!</a>',
        user:
          '<a href="https://images.pexels.com/photos/423364/pexels-photo-423364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" target="_blank" style="color:#0077c0;">Awesome!</a>',
        start: getDate(24 * 3),
        duration: 1 * 24 * 60 * 60 * 1000,
        percent: 50,
        type: "project",
      });
    },
    tasksUpdate(tasks) {
      this.tasks = tasks;
    },
    optionsUpdate(options) {
      this.options = options;
    },
    styleUpdate(style) {
      this.dynamicStyle = style;
    },
    getMinusSaveExpected(expSaveValue, expectedSaveAmount) {
      var val = this.formatBackFromCurrency(expSaveValue) - expectedSaveAmount;
      if (val.toString().includes("-")) {
        this.isClassRed = true;
      } else {
        this.isClassRed = false;
      }
      return this.formatAsCurrency(val);
    },
    sumOfValues(array, type) {
      var sum = 0;
      for (let i = 0; i < array.length; i++) {
        sum = sum + parseInt(array[i][type]);
      }
      if (type == "expectedSaveAmount") {
        this.expectedSaveAmount = sum;
      } else if (type == "actualSaveAmount") {
        this.actualSaveAmount = sum;
      }
      if (sum) {
        return sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      return "0";
    },
    onGFSEmpty(gfsCode) {
      if (!gfsCode) {
        this.getGFSCodes();
      }
    },
    onSelectGFSModal(item) {
      let _ = {
        gfs: item.code,
        clause: item.description,
        initiativeId: this.initiativeId,
        id: 0,
      };
      this.isSelectGFSDialog = false;
      this.yearlySavaData.push(_);
    },
    onGFSFilter(gfs) {
      this.getGFSCodes();
      // var marvelHeroes;
      // marvelHeroes = this.gfsModalMainItems.filter(function(aaa) {
      //   return (
      //     aaa.code.includes(gfs) ||
      //     aaa.description.includes(gfsDescriptionModal)
      //   );
      //   // return aaa;
      // });
      // this.gfsModalItems = marvelHeroes;
    },
    formatDateMilestone(date) {
      let payload = moment(date).format("YYYY-MM-DD");
      return this.formateDate(payload);
    },
    enterYear($event) {
      $event.preventDefault();
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    formatterCurrency(value) {
      if (value) {
        this.yearlySavaData[value.index][value.field.key] = this.yearlySavaData[
          value.index
        ][value.field.key]
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      this.calculateExpectedSavingNew();
    },
    formatAsCurrency(value) {
      if (value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
    formatBackFromCurrency(value) {
      return value.replace(/,/g, "");
    },
    expSaveValueCurrencyFormatter() {
      this.generalForm.expSaveValue = this.generalForm.expSaveValue
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    annualBalanceCurrencyFormatter() {
      this.financialForm.annualBalance = this.financialForm.annualBalance
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    valueAfterRecommendCurrencyFormatter() {
      this.financialForm.valueAfterRecommend = this.financialForm.valueAfterRecommend
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    actualSaveAmountCurrencyFormatter() {
      this.financialYearForm.actualSaveAmount = this.financialYearForm.actualSaveAmount
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    expectedSaveAmountCurrencyFormatter() {
      this.financialYearForm.expectedSaveAmount = this.financialYearForm.expectedSaveAmount
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formateDate(payload) {
      let mlist = {
        "01": "January",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December",
      };
      let day = payload.split("-")[0];
      let month = this.$t(mlist[`${payload.split("-")[1]}`]);
      let year = payload.split("-")[2];
      let fullDate = `${year}` + "-" + `${month}` + "-" + `${day}`;
      return fullDate;
      // return payload;
    },
    disbaledEndDates() {
      var date = new Date(this.implementationPlanForm.targetSDate),
        y = date.getFullYear(),
        m = date.getMonth();
      var endDate = new Date(this.generalForm.endDate);
      var firstDay = new Date(y, m, 1);
      var lastDay = new Date(y, m + 1, 0);
      if (this.implementationPlanForm.targetSDate) {
        let data = {
          to: new Date(this.implementationPlanForm.targetSDate),
          from: new Date(8640000),
        };
        let data2 = {
          to: new Date(lastDay.setDate(lastDay.getDate() + 365)),
          from: new Date(endDate.setDate(endDate.getDate() + 1)),
        };
        this.$set(this.disableEndDates.ranges, 0, data);
        this.$set(this.disableEndDates.ranges, 1, data2);
        // this.disableEndDates.ranges[0] = data;
        // this.disableEndDates.ranges[1] = data2;
      }
    },
    disbaledStartDates() {
      var date = new Date(this.generalForm.startDate),
        y = date.getFullYear(),
        m = date.getMonth();
      var endDate = new Date(this.generalForm.endDate);
      var firstDay = new Date(y, m, 1);
      var lastDay = new Date(y, m + 1, 0);
      let data = {
        to: new Date(this.generalForm.startDate),
        from: new Date(8640000),
      };
      let data2 = {
        to: lastDay.setDate(lastDay.getDate() + 8640000),
        from: endDate.setDate(endDate.getDate() + 1),
      };
      this.disableStartDates.ranges[0] = data;
      this.disableStartDates.ranges[1] = data2;
    },
    disableGeneralDates() {
      if (this.generalForm.startDate != null) {
        this.$set(this.range, "to", new Date(this.generalForm.startDate));
        // this.range.to = new Date(this.generalForm.startDate);
      } else {
        var date = new Date(this.generalForm.startDate),
          y = date.getFullYear(),
          m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 0);
        this.range.to = lastDay;
        this.range.from = firstDay;
      }
    },
    disabledDates(date) {
      var dateeStart = new Date(this.generalForm.startDate);
      var dateeEnd = new Date(this.generalForm.endDate);

      if (!this.implementationPlanForm.targetSDate) {
        return (
          date < dateeStart.setDate(dateeStart.getDate() - 1) ||
          date > dateeEnd.setDate(dateeEnd.getDate())
        );
      } else {
        return (
          date < dateeStart.setDate(dateeStart.getDate() - 1) ||
          date > dateeEnd.setDate(dateeEnd.getDate())
        );
      }
    },
    disbaledEDates(date) {
      var dateeStart = new Date(this.generalForm.startDate);
      var dateeEnd = new Date(this.generalForm.endDate);
      var tagetDate = new Date(this.implementationPlanForm.targetSDate);
      return (
        date >= dateeEnd.setDate(dateeEnd.getDate()) ||
        date < dateeStart.setDate(dateeStart.getDate()) ||
        date < tagetDate.setDate(tagetDate.getDate())
      );
    },
    addLogData(data) {
      this.data.unshift(data);
    },
    closePop() {
      this.isReturnBack = false;
    },
    saveYearsStatementForm() {
      if (
        this.yearlySaves.length > 0 &&
        // this.yearlySaves.forEach((item) => {
        //   if (this.checkIsEmptyObj(item)) {
        //     return true;
        //   }
        // }) &&
        this.InitiativeID > 0
      ) {
        this.sending = true;
        this.$showLoader();
        this.yearlySaves.map((res) => (res.InitiativeID = this.InitiativeID));
        this.$yearlySaveService.create(this.yearlySaves).then((res) => {
          if (res.success) {
            this.financialYearFormReset();
            this.yearlySaves = [];
            this.yearlySaves = res.data;
            this.getInitiative();
            this.step = 4;
            // this.$swal({
            //   icon: "success",
            //   type: "success",
            //   title: "الوفورات خلال السنوات المالية حفظ بنجاح",
            // });
          } else {
            this.$swal({
              icon: "error",
              type: "error",
              confirmButtonText: "موافق",
              title: res.message.message,
            });
            this.$hideLoader();
          }
          // this.$hideLoader();
          this.sending = false;
        });
      } else {
        this.$swal({
          icon: "error",
          type: "error",
          confirmButtonText: "موافق",
          title: this.$t("formIsEmpty"),
        });
      }
    },
    onViewYearsStatementForm(item) {
      this.addValueFinancialYear = this.$t("update");
      this.financialYearForm = this.yearlySaves[item.index];
      Object.assign(this.tempFinancialYearForm, this.financialYearForm);
    },
    onDeleteYearsStatementForm(item) {
      this.yearlySaves.splice(item.index, 1);
      this.sumOfValues(this.yearlySaves, "expectedSaveAmount");
      this.sumOfValues(this.yearlySaves, "actualSaveAmount");
    },
    saveCalculationOfSavingForm() {
      this.fileUrl = [];
      if (
        // !this.checkIsEmptyObj(this.calculationSaving) &&
        this.InitiativeID > 0
      ) {
        let formData = new FormData();
        for (
          let i = 0;
          i < this.calculationSaving.uploadCalcOfSavings.length;
          i++
        ) {
          formData.append(
            "uploadFiles",
            this.calculationSaving.uploadCalcOfSavings[i]
          );
        }
        this.calculationSaving.initiativeId = this.InitiativeID;
        // delete this.calculationSaving["uploadCalcOfSavings"];
        // this.calculationSaving["UploadCalcOfSavings"] = this.calculationSaving.uploadCalcOfSavings;
        formData.append("obj", JSON.stringify(this.calculationSaving));
        // this.calculationOfSavings.push(formData);
        this.sending = true;
        this.$showLoader();
        if (this.calculationSaving.id > 0) {
          this.$calculationOfSavingService.update(formData).then((res) => {
            if (res.success) {
              this.viewAttachment = [];
              this.calculationSavingReset();
              this.getInitiative();
              this.step = 4;
              // this.$swal({
              //   icon: "success",
              //   type: "success",
              //   title: "Form Updated Successfully!",
              // });
              this.calculationSaving = res.data;
            } else {
              this.$swal({
                icon: "error",
                type: "error",
                confirmButtonText: "موافق",
                title: res.message.message,
              });
              this.calculationSaving.uploadCalcOfSavings = [];
              this.$hideLoader();
            }
            // this.$hideLoader();
            this.sending = false;
          });
          this.isCalculationSavingData = true;
        } else {
          this.$calculationOfSavingService.create(formData).then((res) => {
            if (res.success) {
              this.viewAttachment = [];
              this.calculationSavingReset();
              this.getInitiative();
              this.step = 4;
              // this.$swal({
              //   icon: "success",
              //   type: "success",
              //   title: "Form Submitted Successfully!",
              // });
              this.calculationSaving = res.data;
            } else {
              this.$swal({
                icon: "error",
                type: "error",
                confirmButtonText: "موافق",
                title: res.message.message,
              });
              this.viewAttachment = [];
              this.calculationSaving.uploadCalcOfSavings = [];
              this.$hideLoader();
            }
            // this.$hideLoader();
            this.sending = false;
          });
        }
      } else {
        this.$swal({
          icon: "error",
          type: "error",
          confirmButtonText: "موافق",
          title: this.$t("formIsEmpty"),
        });
      }
    },
    saveImplementationPlanForm(payload) {
      if (
        this.mileStones.length > 0 &&
        // this.mileStones.forEach((item) => {
        //   if (this.checkIsEmptyObj(item)) {
        //     return true;
        //   }
        // }) &&
        this.InitiativeID > 0
      ) {
        this.sending = true;
        this.$showLoader();
        this.mileStones.map((res) => (res.InitiativeID = this.InitiativeID));
        this.$mileStoneService.create(this.mileStones).then((res) => {
          if (res.success) {
            this.implementationPlanFormReset();
            this.mileStones = [];
            this.mileStones = res.data;
            this.getInitiative();
            if (payload) {
              this.step = 5;
            }
            // this.$swal({
            //   icon: "success",
            //   type: "success",
            //   title: "Form Submitted Successfully!",
            // });
          } else {
            this.$swal({
              icon: "error",
              type: "error",
              confirmButtonText: "موافق",
              title: res.message.message,
            });
            this.$hideLoader();
          }
          // this.$hideLoader();
          this.sending = false;
        });
      } else {
        this.step = 5;
        // this.$swal({
        //   icon: "error",
        //   type: "error",
        //   title: this.$t("formIsEmpty"),
        // });
      }
    },
    onViewImplementationPlanForm(item) {
      this.addValueImplementationPlan = this.$t("update");
      this.implementationPlanForm = this.mileStones[item.index];
      if (
        this.mileStones[item.index].targetSDate == "0001-01-01" ||
        this.mileStones[item.index].targetSDate == null
      ) {
        this.implementationPlanForm.targetSDate = null;
        this.implementationPlanForm.targetEDate = null;
        // this.implementationPlanForm.actualSDate = null;
        // this.implementationPlanForm.actualEDate = null;
      } else {
        this.implementationPlanForm.targetSDate = this.mileStones[
          item.index
        ].targetSDate.split("T")[0];
        this.implementationPlanForm.targetEDate = this.mileStones[
          item.index
        ].targetEDate.split("T")[0];
        // this.implementationPlanForm.actualSDate = this.mileStones[
        //   item.index
        // ].actualSDate.split("T")[0];
        // this.implementationPlanForm.actualEDate = this.mileStones[
        //   item.index
        // ].actualEDate.split("T")[0];
      }
      Object.assign(
        this.tempImplementationPlanForm,
        this.implementationPlanForm
      );
    },
    onDeleteMilestone(item, index) {
      this.$showLoader();
      this.$mileStoneService.delete(item.item.id).then((res) => {
        if (res.success) {
          this.mileStones.splice(index, 1);
        }
        this.$hideLoader();
      });
      // this.getInitiative();
    },
    removeCommas(payload) {
      let item = {};
      for (const [key, value] of Object.entries(payload)) {
        if (value && value.toString().indexOf(",") > -1) {
          value = value.replace(/,/g, "");
        } else {
          value = value;
        }
      }
    },
    checkKey(payload) {
      this.yearlySavaData.map((item) => {
        if (item.annualBalance) {
          item.annualBalance = payload
            ? item.annualBalance.replace(/,/g, "")
            : item.annualBalance
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        if (item.valueAfterRecommend) {
          item.valueAfterRecommend = payload
            ? item.valueAfterRecommend.replace(/,/g, "")
            : item.valueAfterRecommend
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        if (item.yearE2019) {
          item.yearE2019 = payload
            ? item.yearE2019.replace(/,/g, "")
            : item.yearE2019.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        if (item.yearE2020) {
          item.yearE2020 = payload
            ? item.yearE2020.replace(/,/g, "")
            : item.yearE2020.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        if (item.yearE2021) {
          item.yearE2021 = payload
            ? item.yearE2021.replace(/,/g, "")
            : item.yearE2021.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        if (item.yearE2022) {
          item.yearE2022 = payload
            ? item.yearE2022.replace(/,/g, "")
            : item.yearE2022.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        if (item.yearE2023) {
          item.yearE2023 = payload
            ? item.yearE2023.replace(/,/g, "")
            : item.yearE2023.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        if (item.eFutureyears) {
          item.eFutureyears = payload
            ? item.eFutureyears.replace(/,/g, "")
            : item.eFutureyears
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        if (item.yearA2019) {
          item.yearA2019 = payload
            ? item.yearA2019.replace(/,/g, "")
            : item.yearA2019.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        if (item.yearA2020) {
          item.yearA2020 = payload
            ? item.yearA2020.replace(/,/g, "")
            : item.yearA2020.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        if (item.yearA2021) {
          item.yearA2021 = payload
            ? item.yearA2021.replace(/,/g, "")
            : item.yearA2021.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        if (item.yearA2022) {
          item.yearA2022 = payload
            ? item.yearA2022.replace(/,/g, "")
            : item.yearA2022.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        if (item.yearA2023) {
          item.yearA2023 = payload
            ? item.yearA2023.replace(/,/g, "")
            : item.yearA2023.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        if (item.aFutureyears) {
          item.aFutureyears = payload
            ? item.aFutureyears.replace(/,/g, "")
            : item.aFutureyears
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
      });
    },
    saveFinancialSavingForm() {
      let gfs = [];
      let id = null;
      let gfscode = null;
      this.yearlySavaData.forEach((item) => {
        id = item.id;
        gfscode = item.gfs;
        if (item.gfs) {
          let _ = {
            clause: item.clause,
            gfs: item.gfs,
            year: item.year,
            initiativeId: this.initiativeId,
            annualBalance: item.annualBalance,
            valueAfterRecommend: item.valueAfterRecommend,
          };
          gfs.push(_);
        }
      });
      if (gfscode) {
        this.yearlySavaData.map((item) => {
          (item.annualBalance = ""), (item.valueAfterRecommend = "");
        });
      }

      this.checkKey(true);
      let data = {
        financial: gfs,
        yearlySave: this.yearlySavaData,
      };
      if (
        this.yearlySavaData.length > 0 &&
        this.InitiativeID > 0 &&
        gfscode != null
      ) {
        this.sending = true;
        this.$showLoader();
        if (id == null) {
          this.$financialSavingService.create(data).then((res) => {
            if (res.success) {
              this.getInitiative();
              this.step = 3;
            } else {
              let length = this.yearlySavaData.length;
              this.yearlySavaData.forEach((item) => {
                if (!item.id) {
                  this.yearlySavaData.splice(length - 1, 1);
                }
              });
              this.$swal({
                icon: "error",
                type: "error",
                confirmButtonText: "موافق",
                title: res.message.message,
              });
              this.$hideLoader();
            }
            // this.$hideLoader();
            this.sending = false;
          });
        } else {
          this.$financialSavingService.update(data).then((res) => {
            if (res.success) {
              this.getInitiative();
              this.step = 3;
            } else {
              let length = this.yearlySavaData.length;
              this.yearlySavaData.forEach((item) => {
                if (!item.id) {
                  this.yearlySavaData.splice(length - 1, 1);
                }
              });
              this.getInitiative();
              this.$swal({
                icon: "error",
                type: "error",
                confirmButtonText: "استمر",
                title: res.message.message,
              });
            }
            // this.$hideLoader();
            this.sending = false;
          });
        }
      } else {
        this.step = 3;
      }
    },
    onViewFinancialSavingForm(item) {
      this.addValueFinancialStatement = this.$t("update");
      this.financialForm = this.financialSavingStatements[item.index];
      Object.assign(this.tempFinancialForm, this.financialForm);
    },
    saveGeneralForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        delete this.generalForm["status"];
        if (this.generalForm["summeryThisMonth"] == null) {
          delete this.generalForm["summeryThisMonth"];
        }
        if (this.generalForm["planNextMonth"] == null) {
          delete this.generalForm["planNextMonth"];
        }
        if (this.generalForm["savingTypeDescription"] == null) {
          delete this.generalForm["savingTypeDescription"];
        }
        if (true) {
          if (
            this.generalForm.expSaveValue !== 0 &&
            this.generalForm.expSaveValue != null
          ) {
            if (
              this.generalForm.expSaveValue.toString().indexOf(",") > -1 &&
              this.generalForm.expSaveValue != ""
            ) {
              this.generalForm.expSaveValue = this.generalForm.expSaveValue.replace(
                /,/g,
                ""
              );
            } else {
              this.generalForm.expSaveValue = 0;
            }
          }
          this.sending = true;
          this.$showLoader();
          if (this.InitiativeID <= 0 || this.InitiativeID > 0) {
            if (this.generalForm.startDate) {
              this.generalForm.startDate = moment(
                this.generalForm.startDate
              ).format("yyyy-MM-DD");
            }
            if (this.generalForm.endDate) {
              this.generalForm.endDate = moment(
                this.generalForm.endDate
              ).format("yyyy-MM-DD");
            }
          }
          var req = this.InitiativeID > 0 ? "update" : "create";
          this.$initiativeService[req](this.generalForm)
            .then((res) => {
              if (res.success) {
                this.generalForm = res.data;
                this.expSaveValueCurrencyFormatter();
                this.mainFormSending = false;
                this.InitiativeID = res.data.id;
                this.getInitiative();
                if (req == "create") {
                  localStorage.setItem("yuy111yuy2@@##", this.InitiativeID);
                }
                this.step = 2;
              } else {
                localStorage.removeItem("yuy111yuy2@@##");
                this.$swal({
                  icon: "error",
                  type: "error",
                  confirmButtonText: "موافق",
                  title: res.message.message,
                });
                this.$hideLoader();
              }
              // this.$hideLoader();
              setTimeout(() => {
                this.calculateExpectedSavingNew();
                this.calculateASavingNew();
              }, 2000);
              // this.generalForm.expSaveValue = this.generalForm.expSaveValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              this.sending = false;
            })
            .catch((error) => {
              localStorage.removeItem("yuy111yuy2@@##");
            });
        } else {
          this.$swal({
            icon: "error",
            type: "error",
            confirmButtonText: "موافق",
            title: this.$t("formIsEmpty"),
          });
        }
      } else {
        {
          this.$swal({
            icon: "error",
            type: "error",
            confirmButtonText: "موافق",
            title: "يرجى استكمال الحقول الإلزامية",
          });
        }
      }
    },
    saveSummaryOfInitiativeForm() {
      if (this.checkIsEmptyObj(this.summaryOfInitiativeForm)) {
        if (this.InitiativeID > 0) {
          this.summaryOfInitiativeForm.InitiativeID = this.InitiativeID;
          this.sending = true;
          this.$showLoader();
          // var req = this.isUpdate && this.summaryOfInitiativeForm.editable ? "update" : "create";
          var req = "submitSummaryOfInitiative";
          this.$initiativeService[req](this.summaryOfInitiativeForm)
            .then((res) => {
              if (res.success) {
                this.summaryOfInitiativeForm = res.data;
                this.mainFormSending = false;
                if (req == "create") {
                  localStorage.setItem("yuy111yuy2@@##", this.InitiativeID);
                }
                this.getInitiative();
                this.step = 5;
                // this.$swal({
                //   icon: "success",
                //   type: "success",
                //   title: `Form ${
                //     this.isUpdate && this.summaryOfInitiativeForm.editable
                //       ? "Updated"
                //       : "Created"
                //   } Successfully!`,
                // });
              } else {
                localStorage.removeItem("yuy111yuy2@@##");
                this.$swal({
                  icon: "error",
                  type: "error",
                  confirmButtonText: "موافق",
                  title: res.message.message,
                });
                this.$hideLoader();
              }
              // this.$hideLoader();
              this.sending = false;
            })
            .catch((error) => {
              localStorage.removeItem("yuy111yuy2@@##");
            });
        } else {
          this.$swal({
            icon: "error",
            type: "error",
            confirmButtonText: "موافق",
            title: "Submit Initiative form first",
          });
        }
      } else {
        this.$swal({
          icon: "error",
          type: "error",
          confirmButtonText: "موافق",
          title: this.$t("formIsEmpty"),
        });
      }
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
    addFinancialStatement() {
      // this.financialSavingStatements.push(this.financialForm);
      this.yearlySavaData.push(this.financialForm);
      // this.financialSavingStatements = [
      //   ...new Set(this.financialSavingStatements),
      // ];
      // if (!this.checkIsEmptyObj(this.financialForm)) {
      //   this.financialForm.annualBalance = this.financialForm.annualBalance.replace(
      //     /,/g,
      //     ""
      //   );
      //   this.financialForm.valueAfterRecommend = this.financialForm.valueAfterRecommend.replace(
      //     /,/g,
      //     ""
      //   );
      //   this.financialSavingStatements.push(this.financialForm);
      //   this.financialSavingStatements = [
      //     ...new Set(this.financialSavingStatements),
      //   ];
      // }
      // this.financialFormReset();
      // this.addValueFinancialStatement = this.$t("addNewStatmentGFS");
    },
    addFinancialYearsStatement() {
      // if (!this.checkIsEmptyObj(this.financialYearForm)) {
      if (
        this.financialYearForm.year &&
        this.financialYearForm.expectedSaveAmount
      ) {
        if (this.financialYearForm.actualSaveAmount) {
          if (
            this.financialYearForm.actualSaveAmount.toString().indexOf(",") > -1
          ) {
            this.financialYearForm.actualSaveAmount = this.financialYearForm.actualSaveAmount.replace(
              /,/g,
              ""
            );
          }
        }
        if (
          this.financialYearForm.expectedSaveAmount.toString().indexOf(",") > -1
        ) {
          this.financialYearForm.expectedSaveAmount = this.financialYearForm.expectedSaveAmount.replace(
            /,/g,
            ""
          );
        }
        this.yearlySaves.push(this.financialYearForm);
        this.yearlySaves = [...new Set(this.yearlySaves)];
        this.financialYearFormReset();
        this.addValueFinancialYear = this.$t("addNewStatmentSaving");
      } else {
        this.$swal({
          icon: "error",
          type: "error",
          confirmButtonText: "موافق",
          title: "Fields cannot be empty",
        });
      }
    },
    appendLeadingZeroes(n) {
      if (n <= 9) {
        return "0" + n;
      }
      return n;
    },
    addimplementationPlan() {
      this.showChart = false;
      // if (!this.checkIsEmptyObj(this.implementationPlanForm)) {
      if (this.implementationPlanForm.name) {
        this.$showLoader();
        this.implementationPlanForm.targetEDate = format(
          new Date(this.implementationPlanForm.targetEDate),
          "YYYY-MM-DD"
        );
        this.implementationPlanForm.targetSDate = format(
          new Date(this.implementationPlanForm.targetSDate),
          "YYYY-MM-DD"
        );
        this.mileStones = [...new Set(this.mileStones)];

        let s_no = 1;

        if (this.mileStones.length === 0) {
          this.mileStones.forEach((item) => {
            s_no += 1;
          });
          this.implementationPlanForm.serialNo = s_no;
          this.mileStones.push(this.implementationPlanForm);
        } else {
          if (this.implementationPlanForm.id === 0) {
            let name = (val) => val.name === this.implementationPlanForm.name;
            let check = this.mileStones.some(name);
            if (check) {
              this.implementationPlanForm.serialNo = this.implementationPlanForm.serialNo;
            } else {
              this.mileStones.forEach((item) => {
                s_no += 1;
              });
              this.implementationPlanForm.serialNo = s_no;
              this.mileStones.push(this.implementationPlanForm);
            }
          }
        }
        this.showChart = true;
        this.typeChart = "second";

        this.showChart = true;
        this.$forceUpdate();
        this.implementationPlanFormReset();
        this.saveImplementationPlanForm(false);
        this.$hideLoader();
        this.implementationPlanForm.targetSDate = null;
        this.implementationPlanForm.targetEDate = null;
        this.implementationPlanForm.actualSDate = null;
        this.implementationPlanForm.actualEDate = null;
        this.addValueImplementationPlan = this.$t("addImplementationPlan");
      } else {
        // this.$swal({
        //   icon: "error",
        //   type: "error",
        //   title: "Fields cannot be empty",
        // });
      }
    },
    implementationPlanFormReset() {
      let dateFormat = "YYYY-MM-DD";
      let now = new Date();
      this.implementationPlanForm = {
        name: "",
        targetSDate: null,
        targetEDate: null,
        actualSDate: null,
        actualEDate: null,
        percentage: null,
        initiativeId: this.InitiativeID,
        editable: true,
        id: 0,
      };
    },
    calculationSavingReset() {
      this.calculationSaving = {
        obj: {},
        uploadFiles: [],
        uploadCalcOfSavings: [],
        initiativeId: this.InitiativeID,
        editable: true,
        id: 0,
      };
    },
    financialFormReset() {
      this.financialForm = {
        clause: null,
        gfs: null,
        annualBalance: null,
        valueAfterRecommend: null,
        initiativeId: this.InitiativeID,
        editable: true,
        id: 0,
      };
    },
    financialYearFormReset() {
      this.financialYearForm = {
        year: null,
        actualSaveAmount: null,
        initiativeId: this.InitiativeID,
        editable: true,
        id: 0,
      };
    },
    getActivityLogs() {
      this.options.reportId = this.propData.monthlyReportId;
      this.$monthlyReportsService.getActivityLogs(this.options).then((res) => {
        if (res.success) {
          if (res.data) {
            this.data = res.data;
            for (let i = 0; i < this.data.length; i++) {
              if (this.data[i].section == "معلومات عامة") {
                this.sectionOne = true;
              } else if (this.data[i].section == "البيانات المالية والوفورات") {
                this.sectionTwo = true;
              } else if (
                this.data[i].section == "الوفورات خلال السنوات المالية"
              ) {
                this.sectionThree = true;
              } else if (this.data[i].section == "آلية احتساب الوفر") {
                this.sectionFour = true;
              } else if (this.data[i].section == "خطة التنفيذ") {
                this.sectionFive = true;
              } else if (this.data[i].section == "ملخص خطة التنفيذ") {
                this.sectionSix = true;
              }
            }
          }
        }
      });
    },
    changeStatus(res) {
      if (this.currentOwner === "Entity Initiator") {
        this.tabsInfo.forEach((item) => {
          if (this.$t(`${item.name}`) === this.$t("generalinformation")) {
            item.state.value = res.sectionStatus;
          }
          if (this.$t(`${item.name}`) === this.$t("financialdataandsaving")) {
            let status = "empty";
            let check = null;
            if (res.financialSavingStatements.length > 0) {
              let el = (val) => val.sectionStatus === "Incomplete";
              check = res.financialSavingStatements.some(el);
              if (check) {
                status = "Incomplete";
              } else {
                status = "Complete";
              }
            }
            item.state.value = status;
          }
          if (this.$t(`${item.name}`) === this.$t("calculationofsavings")) {
            res.calculationOfSavings.forEach((payload) => {
              item.state.value = payload.sectionStatus;
            });
          }
          if (this.$t(`${item.name}`) === this.$t("GeneralComment")) {
            if (res.minutesOfMeeting != null) {
              item.state.value = res.minutesOfMeeting.sectionStatus;
            }
          }
          if (this.$t(`${item.name}`) === this.$t("supportRequired")) {
            if (res.supportRequire != null) {
              item.state.value = res.supportRequire.sectionStatus;
            }
          }
          if (this.$t(`${item.name}`) === this.$t("implementationsplan")) {
            let status = "empty";
            let summaryStatus = null;
            let check = null;
            if (res.mileStones.length > 0 || res.summerySectionStatus) {
              let el = (val) => val.sectionStatus === "Complete";
              check = res.mileStones.some(el);
              if (res.summerySectionStatus != null) {
                res.summerySectionStatus === "Complete"
                  ? (summaryStatus = true)
                  : (summaryStatus = false);
              }
              if (check && summaryStatus) {
                status = "Complete";
              } else {
                status = "Incomplete";
              }
              item.state.value = status;
            }
          }
        });
      }
    },
    getInitiative() {
      this.$showLoader();
      this.disabledSearch = true;
      this.$initiativeService.get(this.InitiativeID).then((res) => {
        if (res.success && res.data) {
          this.initiativeId = res.data.id;
          this.monthlyReportId = res.data.monthlyReportId;
          this.currentOwner = res.data.monthlyReport.currentOwner;
          this.InitiativeNumber = res.data.number;
          this.tenantId = res.data.tenantId;
          this.copyIni = res.data.enableFields;
          this.changeStatus(res.data);
          this.makeReport(res.data);
          this.getcomments();
          this.lastReportComments();
          this.isApprovedByCSE = res.data.isApprovedByCSE;
          this.reporstSubmissiondate = res.data.submissionDate;
          this.lastMonthIniciative = res.data.lastMonthIniciative;
          this.sectionStatus = res.data.sectionStatus;
          this.InitiativeID = res.data.id;
          this.propData.initiativeId = res.data.id;
          this.propData.monthlyReportId = res.data.monthlyReportId;
          this.propData.mainData = res.data;
          this.propData.type = "initiative";
          // this.monthlyReportId = res.data.monthlyReportId;
          if (res.data.supportRequire) {
            this.support = res.data.supportRequire;
          }
          res.data.monthlyReportId
            ? (this.support.monthlyReportId = res.data.monthlyReportId)
            : null;
          res.data.financialSavingStatements.forEach((payload) => {
            res.data.yearlySaves.forEach((item) => {
              if (payload.gfs == item.gfs) {
                item.annualBalance = payload.annualBalance;
                item.valueAfterRecommend = payload.valueAfterRecommend;
                item.total = payload.id;
              }
            });
          });
          this.yearlySavaData = res.data.yearlySaves;
          this.checkKey(false);
          if (res.data.minutesOfMeeting) {
            this.generalComment.description = res.data.minutesOfMeeting
              ? res.data.minutesOfMeeting.description
              : null;
            this.generalComment.id = res.data.minutesOfMeeting.id;
            let meetingOfmin = res.data.minutesOfMeeting
              ? res.data.minutesOfMeeting.uploadMinutesOfMeeting
              : null;
            this.generalComment.uploadMinutesOfMeeting = [...meetingOfmin];
            this.generalCommentFileUrl = meetingOfmin;
          }
          this.summaryOfInitiativeForm.summeryThisMonth =
            res.data.summeryThisMonth;
          this.summaryOfInitiativeForm.planNextMonth = res.data.planNextMonth;
          this.summaryOfInitiativeForm.generalComment = res.data.generalComment;

          if (res.data.calculationOfSavings.length > 0) {
            this.calculationSaving = res.data.calculationOfSavings[0];
            this.fileUrl = [
              ...res.data.calculationOfSavings[0].uploadCalcOfSavings,
            ];
            this.isCalculationSavingData = true;
          }
          if (res.data.mileStones && res.data.mileStones.length > 0) {
            this.mileStones = res.data.mileStones;
            for (let i = 0; i < this.mileStones.length; i++) {
              if (this.mileStones[i].targetSDate == null) {
                this.mileStones[i].targetSDate = "0001-01-01";
                this.mileStones[i].targetEDate = "0001-01-01";
                // this.mileStones[i].actualSDate = "0001-01-01";
                // this.mileStones[i].actualEDate = "0001-01-01";
              }
            }
          }
          this.generalForm = res.data;
          this.generalForm.startDate =
            res.data.startDate != null
              ? res.data.startDate.split("T")[0]
              : null;
          this.generalForm.endDate =
            res.data.endDate != null ? res.data.endDate.split("T")[0] : null;
          this.generalForm.expSaveValue = this.generalForm.expSaveValue
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          // this.numberInArabic();
          this.generalFormType = this.generalForm.type;
          if (this.generalFormType == "Cost Avoidance") {
            this.generalFormType = this.$t("savingTypeOptionOne");
          } else if (this.generalFormType == "Cost reduction") {
            this.generalFormType = this.$t("savingTypeOptionTwo");
          } else if (this.generalFormType == "Cashflow management") {
            this.generalFormType = this.$t("savingTypeOptionThree");
          } else if (this.generalFormType == "Sustainable savings") {
            this.generalFormType = this.$t("savingTypeOptionFour");
          }
          // let element = document.getElementById("comment-wrapper");
          // element.scrollIntoView({ block: "end" });
          this.mainFormSending = false;
          this.getActivityLogs();
          this.isUpdate = true;
        }
        this.$hideLoader();
        this.disabledSearch = false;
      });

      this.typeChart = "first";
    },
    getGFSCodes() {
      // this.$showLoader();
      //gfsCodeService
      if (this.gfsCode) {
        this.options.Keyword = this.gfsCode;
      } else {
        this.options.Keyword = "";
      }
      this.$gfsCodeService.getAll(this.options).then((res) => {
        if (res.success && res.data) {
          this.gfsModalMainItems = res.data.items;
          this.gfsModalItems = res.data.items;
          this.totalCountGFS = res.data.totalCount;
        }
      });

      // this.$hideLoader();
    },
    onActivate() {
      if (!this.activateScroll) {
        const mainSection = document.querySelector(".scroll");
        const links = document.querySelector(".links");
        const linksHeight = links.offsetHeight;
        mainSection.querySelectorAll(".scrollspy").forEach((current) => {
          const _ = current;
          let currentElementOffset = _.offsetTop;
          let scrollPosition = mainSection.scrollTop;
          if (currentElementOffset <= scrollPosition + linksHeight) {
            const currentID = current.getAttribute("id");
            this.tabsInfo.forEach((item) => {
              if (currentID === this.$t(`${item.name}`)) {
                this.currentTab = this.$t(`${item.name}`);
                this.step += 1;
              }
            });
          }
        });
      }
    },
    makeReport(payload) {
      if (payload.lastMonthIniciative !== null) {
        this.CyearlySaves = [...payload.lastMonthIniciative.yearlySavesChanges];
        this.oldfinancialSavingStatements = payload.lastMonthIniciative
          ? payload.lastMonthIniciative.financialSavingChanges
          : null;
        this.CfinancialSavingStatements = [
          ...this.oldfinancialSavingStatements,
          ...payload.financialSavingStatements,
        ];
        this.CmileStones = [...payload.lastMonthIniciative.mileStonesChanges];
        this.oldsummaryOfInitiativeForm.summeryThisMonth =
          payload.lastMonthIniciative.summeryThisMonth;
        this.oldsummaryOfInitiativeForm.planNextMonth =
          payload.lastMonthIniciative.planNextMonth;
        this.oldsummaryOfInitiativeForm.generalComment =
          payload.lastMonthIniciative.generalComment;
        payload.lastMonthIniciative.calculationOfSavingsChanges.forEach(
          (item) => {
            this.oldcalculationSaving = item;
          }
        ),
          (this.oldGeneralForm.name = payload.lastMonthIniciative.name);
        this.oldGeneralForm.description =
          payload.lastMonthIniciative.description;
        this.oldGeneralForm.expSaveValue = payload.lastMonthIniciative.expSaveValue
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        (this.oldGeneralForm.owner = payload.lastMonthIniciative.owner),
          (this.oldGeneralForm.deputyShip =
            payload.lastMonthIniciative.deputyShip),
          (this.oldGeneralForm.startDate = payload.lastMonthIniciative.startDate.split(
            "T"
          )[0]),
          (this.oldGeneralForm.endDate = payload.lastMonthIniciative.endDate.split(
            "T"
          )[0]),
          (this.oldGeneralForm.type = payload.lastMonthIniciative.type);
        if (payload.lastMonthIniciative.supportRequireChange != null) {
          this.oldsupport = payload.lastMonthIniciative.supportRequireChange;
        }
      } else {
        this.checked = false;
      }
    },
  },
  mounted() {
    // this.activateScroll = true;
    this.owner = localStorage.getItem("username").replace(/"/g, "");
    if (this.$route.params.initiativeId) {
      this.InitiativeID = this.$route.params.initiativeId;
      localStorage.removeItem("yuy111yuy2@@##");
      this.newInitiative = false;
    } else if (localStorage.getItem("yuy111yuy2@@##")) {
      this.InitiativeID = localStorage.getItem("yuy111yuy2@@##");
      this.newInitiative = false;
    } else {
      this.newInitiative = true;
    }
    this.getInitiative();
    this.getGFSCodes();
    this.getPresets();
    this.getCommentspresets();
    if (this.$user.currentRole() != "Entity Initiator") {
      this.formDisabled = true;
    }
    if (
      this.$user.currentRole() === "CSE Special Reviewer" ||
      this.$user.currentRole() === "CSE Reviewer B" ||
      this.$user.currentRole() === "CSE Reviewer A" ||
      this.$user.currentRole() === "CSE Approver"
    ) {
      this.CseRole = true;
    }
  },
  created() {
    this.$openSide.$on("open-comment", (data) => {
      if (data == this.showlog) {
        this.openLogs = !this.showlog;
        this.showlog = !this.showlog;
        return;
      }
      if (data == this.commentSection) {
        this.openLogs = !this.commentSection;
        this.commentSection = !this.commentSection;
        return;
      }
      if (data == this.lastComment) {
        this.openLogs = !this.lastComment;
        this.lastComment = !this.lastComment;
        return;
      }
      if (this.CseRole) {
        if (data == this.feedback) {
          this.openLogs = !this.feedback;
          this.feedback = !this.feedback;
          return;
        }
      }
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* Css on entity intatior side  */
.icon {
  height: 25px !important;
  widows: 25px !important;
}

.icon-wrapper {
  position: absolute;
  top: 26px;
}

.alternative-table-text {
  font-weight: bolder;
  background-color: #f2f3f4;
  font-size: 16px;
}

.edit-button {
  width: 90px !important;
  height: 40px !important;
  background: #f6f7f8 0% 0% no-repeat padding-box;
  border-radius: 5px;
  color: black;
}

.edit-icon {
  height: 18px !important;
}

.text-color {
  color: #32c4ca !important;
}

.position {
  position: relative;
}

.review-label {
  color: #b5bcc2;
}

.label-font {
  font-size: 16px !important;
}

#label {
  right: 0% !important;
}

.custom-card {
  border-radius: 10px !important;
  box-shadow: 0px 2px 0px #e4e7e9;
  border: 1px solid #e4e7e9;
  margin-bottom: 5% !important;
  background: white;
}

.tabs-info {
  padding: 15px;
  width: 120% !important;
  border-radius: 15px;
  height: 88px;
}

.tabs-info:hover {
  cursor: pointer;
}

.active-tab {
  border-radius: 15px;
  height: 88px !important;
  width: 120% !important;
  overflow: hidden;
  background-color: #e0f2f3;
  color: #1ebec5 !important;
}

.exact-tab-text {
  color: #1ebec5 !important;
}

.active-tab-number {
  border: none !important;
  background-color: #1ebec5;
  color: white !important;
}

.tabs {
  /* position: absolute;
  top: 16px; */
  font-size: 20px;
  /* right: 63px; */
  margin-top: 10px;
  margin-right: 35px;
}

.tab-text-black {
  color: #131c24 !important;
}

.tab-text-gray {
  color: #687784 !important;
}

.button-radius {
  border-radius: 25px;
}

.custom-button {
  height: 49px;
  width: 138px;
  padding: 8px;
  font-size: 16px;
}

.custom-attachment-button {
  border-radius: 5px;
  background-color: #f6f7f8 !important;
}

.indexes {
  border: 1px solid gray;
  width: 25px;
  height: 25px;
  border-radius: 50%;
}

.scroll-one {
  /* height: calc(100vh - 110px) !important; */
  /* overflow: auto; */
}

/* Css on entity Approver side  */

.tabs-approver {
  height: 100px;
  min-width: 150px;
  padding: 15px;
  font-size: 20px;
}

.active-tab-approver {
  background-color: #1ebec51a;
  border-radius: 10px;
}

.tabs-approver:hover {
  cursor: pointer;
}

a:not(.md-button):hover {
  text-decoration: none !important;
}

.scroll {
  /* border: 2px solid black; */
  height: 100vh;
  overflow: auto;
  scrollbar-width: none;
}

.sidebar {
  position: fixed;
  background: #ffffff;
  -webkit-box-shadow: 1px 0px 0px #ddddde;
  box-shadow: 1px 0px 0px #ddddde;
  height: 120vh !important;
  top: 51px;
  left: 0px;
}

.comments-section {
  height: 120vh;
  width: 0;
  position: fixed;
  background: #eef0f2;
  top: 54px;
  left: 63px;
  overflow-x: hidden;
  -webkit-transition: width 1s;
  transition: width 1s;
  scrollbar-width: none;
}

.comments-section-change {
  width: 24%;
  transition: width 1s;
}

.main-approver {
  width: 95%;
  transition: width 1s;
}

.main-approver-width {
  width: 69%;
  transition: width 1s;
}

.showHighlight {
  color: black;
  border-radius: 2px;
  background-color: #ffd800;
  width: fit-content;
  margin-bottom: 1px;
}

.feedbackBorder {
  border: 2px solid #8edee2;
}

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

.assessment {
  width: 25px;
  height: 25px;
  border-radius: 20px;
  margin: auto;
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

.delete {
  font-size: 12px;
  background: red !important;
}

.colorRed {
  color: red !important;
}

.cancel-btn {
  width: 210px;
  height: 40px;
  color: #36bbc0 !important;
  border: 2px solid #36bbc0;
  background: white !important;
  margin: 0 10px;
}

.add-button-wrapper {
  height: 50px;
  width: 200px;
  position: absolute;
  top: 78%;
  right: 39%;
  background-color: white;
}

.add-button-wrapper-two {
  height: 50px;
  width: 200px;
  position: absolute;
  top: 84%;
  right: 39%;
  background-color: white;
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

.md-field .md-error {
  right: 1px !important;
  opacity: 0;
  transform: translate3d(0, -8px, 0);
}

.CustomImage {
  width: 50px !important;
  height: 50px !important;
}

.add-gfs {
  width: 300px;
}

.comment-text-wraper {
  background: white;
  border-radius: 12px;
  border: none;
}

.comment-wrapper {
  overflow: auto;
  height: 680px;
  scrollbar-width: none;
}

.comment-wrapper-height {
  height: 622px;
}

.user-image-circle {
  width: 50px;
  height: 50px;
  border-radius: 50px;
  display: inline-block;
  margin-left: 14px;
  background-color: #687784;
  padding-top: 13px;
  font-size: 20px;
}

.comment-text {
  min-height: 50px;
  width: 295px;
  display: inline-block;
  background: white;
  border-radius: 10px;
  padding: 10px;
  font-weight: bolder;
  font-size: 16px;
  overflow-wrap: break-word;
}

.reply-text {
  min-height: 50px;
  display: inline-block;
  background: white;
  border-radius: 10px;
  padding: 10px;
  font-weight: bolder;
  font-size: 16px;
}

.comment-time {
  margin-right: 72px;
  font-size: 16px;
}

.reply-button-width {
  width: 260px;
}

.borderdClass {
  border: 2px solid pink;
}

.borderdClassOpacity {
  /* width: 388px; */
  filter: opacity(0.5);
}

.position-fixed {
  position: fixed;
}

.generalinformation {
  height: 67px;
  width: 60px;
  left: 1054px;
  border-radius: 5px;
  border: 2px solid white;
  text-align: center;
  font-size: 16px;
  -webkit-box-shadow: 0px 1px 4px 4px whitesmoke;
  box-shadow: 0px 1px 4px 4px whitesmoke;
  background-color: white;
}

.gfsSelect {
  width: 138px;
  border-radius: 10px;
  position: absolute;
  z-index: 22;
  background-color: white;
  overflow-y: auto;
  overflow-wrap: break-word;
  scrollbar-width: none;
  cursor: pointer;
  -webkit-box-shadow: 1px, 1px, 1px, 1px solid;
  box-shadow: 1px, 1px, 1px, 1px solid;
  -webkit-box-shadow: 0px 0px 10px 5px lightgrey;
  box-shadow: 0px 0px 10px 5px lightgrey;
}

.CrossButton {
  position: absolute;
  height: 25px;
  left: 22px;
}
.V-dots {
  position: absolute;
  height: 25px;
  left: 44px;
}
.Presets {
  width: 319px;
  z-index: 12;
  background: white;
  border-radius: 10px;
  position: absolute;
  height: 203px;
  left: 60px;
  top: -167px;
  overflow-y: auto;
  overflow-wrap: break-word;
  scrollbar-width: none;
  -webkit-box-shadow: 1px, 1px, 1px, 1px solid;
  box-shadow: 1px, 1px, 1px, 1px solid;
  -webkit-box-shadow: 0px 0px 10px 5px lightgrey;
  box-shadow: 0px 0px 10px 5px lightgrey;
}
.Highlightborderd {
  border-radius: 2px;
  background-color: pink;
  color: black;
  width: fit-content;
  margin-bottom: 1px;
}

.HighlightCell {
  background-color: pink;
  color: black;
}
.showHighlightCell {
  background-color: #ffd800;
  color: black;
}
.activeBackground {
  background: transparent linear-gradient(80deg, #d3e31d 0%, #6db73a 100%) !important;
  border-radius: 10px;
}
.chat-bubble {
  height: 20px;
}
.gery {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: grey;
}
.grey {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: grey;
}
.yellow {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: yellow;
}
.blue {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: blue;
}
.green {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: green;
}
.red {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: red;
}
.Year-Selector {
  position: absolute;
  left: -10px;
  top: 4px;
}
.mandotary {
  color: red;
  font-size: 40px;
  position: absolute;
  right: -16px;
  top: 5px;
}
.CSE-background {
  background-color: #4fa1b3 !important;
}
.overflow-wrap {
  overflow-wrap: break-word;
}
.fit-content {
  max-width: 1100px !important;
  height: fit-content;
  overflow-wrap: break-word;
  /* white-space: nowrap;
  word-wrap: break-word; */
}
/* @media screen and (min-width: 1600px) {
  .fit-content {
    max-width: 626px !important;
    height: fit-content;
    overflow-wrap: break-word;
  }
} */
</style>
