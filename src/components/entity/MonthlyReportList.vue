<template>
  <b-container
    fluid
    id="entityperfromance"
    style="text-align : right; letter-spacing : 0px"
  >
    <div>
      <b-row class="mt-3">
        <b-col md="6">
          <img
            v-if="!entityInitatior"
            class="cursor"
            @click="$router.go(-1)"
            src="/images/icons/back.png"
          />
          <div
            style="font-weight : bold; font-size : 22px; display : inline-block;"
            :class="!entityInitatior ? 'pr-3' : null"
          >
            الصفحة الرئيسية
          </div>
          <div
            class="h4 font-weight-bold"
            :class="!entityInitatior ? 'pr-5' : null"
          >
            التقارير الشهرية
          </div>
        </b-col>
        <b-col md="6">
          <button
            @click="DownloadPdf()"
            class="btn md-primary main-btn comman-gradient border-radius ml-2 float-left"
            style="width: 25%; font-size: 14px"
          >
            download
          </button>
        </b-col>
      </b-row>
      <hr />
      <b-row class>
        <b-col md="12" class="p-4">
          <span class="h5 ml-5">
            اسم الجهة:
            <strong>{{ entityName }}</strong>
          </span>
          <div class="h5" v-if="!entityInitatior">
            قطاع:
            <strong>{{ entitySector }}</strong>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="d-flex justify-content-end">
          <!-- <div>
          <button
            class="btn md-primary main-btn comman-gradient border-radius"
            style="width: 100%; font-size: 14px"
            @click="CopyReport()"
          >
            {{ $t("approve") }}
          </button>
        </div> -->
          <div v-if="this.currentOwner == 'CSE Approver'">
            <button
              v-if="!dontGoBack && iAmOwner"
              class="btn md-primary main-btn comman-gradient border-radius ml-2"
              style="width: 100%; font-size: 14px"
              @click="
                $bvModal.show('confirmMessage'),
                  (forward = true),
                  (CSEApprover = true)
              "
              :disabled="sending"
            >
              {{ $t("approve") }}
            </button>
          </div>
          <!-- <div v-if="!formDisabled && iAmOwner && !firstVisitInitiative">
          <button
            class="btn md-primary main-btn comman-gradient border-radius"
            style="width: 100%; font-size: 14px"
            @click="approveReport()"
            :disabled="sending"
          >
            {{ $t("approveNewReport") }}
          </button>
        </div> -->
          <div
            v-if="findReportTable($user.currentRole(), false)"
            style="margin-left: 6px"
          >
            <button
              v-if="
                (!dontGoBack &&
                  iAmOwner &&
                  $user.currentRole() === currentOwner) ||
                  $user.currentRole() == 'CSE Special Reviewer'
              "
              class="btn md-primary mr-3 d-inline-block main-btn comman-gradient border-radius"
              style="font-size: 14px"
              @click="$bvModal.show('confirmMessage'), (forward = false)"
            >
              {{ $t("returnBackTo") }}
              {{ findReportTable($user.currentRole(), false) }}
            </button>
          </div>
          <div v-if="$user.currentRole() != 'CSE Approver'">
            <div
              v-if="
                ($user.currentRole() === currentOwner && reportMonth) ||
                  ($user.currentRole() === currentOwner && previousMonth)
              "
            >
              <button
                v-if="iAmOwner || $user.currentRole() == 'CSE Special Reviewer'"
                class="btn md-primary d-inline-block comman-gradient main-btn border-radius"
                style="font-size: 14px"
                @click="$bvModal.show('confirmMessage'), (forward = true)"
              >
                {{ $t("submitTo") }}
                {{ findReportTable($user.currentRole(), true) }}
              </button>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <b-card
            style="font-family: 'DIN', Arial, Helvetica, serif !important; border-radius : 10px; text-align : right; letter-spacing : 0px;"
          >
            <div class="d-flex justify-content-between p-4">
              <span class="font-weight-bold h3 color">
                {{ $t("EntitiesPerformance") }}
              </span>
              <div
                class="d-flex d-inline-block justify-content-between lengeds  p-2 w-50"
              >
                <div class="">
                  <img
                    class="icon-border-radius"
                    src="/images/icons/green.png"
                    alt=""
                  />
                  <span class="font-weight-bold">متحقق</span>
                </div>
                <div>
                  <img
                    class="icon-border-radius"
                    src="/images/icons/yellow.png"
                    alt=""
                  />
                  <span class="font-weight-bold">متحقق جزئياً </span>
                </div>
                <div>
                  <img
                    class="icon-border-radius"
                    src="/images/icons/red.png"
                    alt=""
                  />
                  <span class="font-weight-bold">غير متحقق</span>
                </div>
                <div>
                  <img
                    class="icon-border-radius"
                    src="/images/icons/grey.png"
                    alt=""
                  />
                  <span
                    class="font-weight-bold"
                    style="text-align: right; letter-spacing : 0px"
                    >سيتم التقييم لاحقا
                  </span>
                </div>
              </div>
            </div>
            <div class="pl-4 pr-4">
              <div
                class="mb-1 font-weight-bold"
                :class="entityInitatior ? 'custom-text' : 'custom-block'"
              >
                <div class="d-flex justify-content-between">
                  <span class="mt-3 pr-3"> التقييم العام: </span>
                  <div
                    v-if="!isApprovedByCse && entityInitatior"
                    class="mt-3 mx-auto grey"
                  ></div>
                  <div
                    v-else
                    class="mt-3 mx-auto"
                    :class="`${firstSection}`"
                  ></div>
                </div>
              </div>
              <div v-if="entityInitatior">
                <b-table
                  class="entity-performance-table top-radius pl-4 pr-4 table-column-text"
                  tbody-tr-class="tableClass"
                  bordered
                  :items="Performance"
                  :fields="entityPer"
                >
                  <template v-slot:head(elements)="scope">
                    <div>
                      <span>عناصر التقييم</span>
                    </div>
                  </template>
                  <template v-slot:head(commitment)="scope">
                    <img
                      class="tablesIcons"
                      src="/images/icons/asset1.png"
                      alt=""
                    />
                    <img
                      class="float-right tablesIconstwo pt-5"
                      src="/images/icons/aa.png"
                      alt=""
                    />
                    <div>
                      <span class="font-weight-bold1 h5">الالتزام</span>
                      <p class="font-weight-light pt-2">
                        تقييم الالتزام بإرسال التقارير الدورية خلال الشهر المحدد
                      </p>
                    </div>
                  </template>
                  <template v-slot:head(completeThePacking)="scope">
                    <img
                      class="tablesIcons"
                      src="/images/icons/asset2.png"
                      alt=""
                    />
                    <img
                      class="float-right tablesIconstwo pt-5"
                      src="/images/icons/bb.png"
                      alt=""
                    />
                    <div class="">
                      <span class="font-weight-bold1 h5">استكمال التعبئة</span>
                      <p class="font-weight-light pt-2">
                        تقييم اكتمالية التقرير وتعبئة البيانات المطلوبة
                      </p>
                    </div>
                  </template>
                  <template v-slot:head(opportunitieSize)="scope">
                    <img
                      class="tablesIcons"
                      src="/images/icons/asset3.png"
                      alt=""
                    />
                    <img
                      class="float-right tablesIconstwo pt-5"
                      src="/images/icons/gg.png"
                      alt=""
                    />
                    <div>
                      <span class="font-weight-bold1 h5">حجم الفرص</span>
                      <p class="font-weight-light pt-2">
                        تقييم حجم الأثر مقارنة بحجم الميزانية
                      </p>
                    </div>
                  </template>
                  <template v-slot:head(opportunityMechanism)="scope">
                    <img
                      class="tablesIcons"
                      src="/images/icons/asset4.png"
                      alt=""
                    />
                    <img
                      class="float-right tablesIconstwo my-5"
                      src="/images/icons/dd.png"
                      alt=""
                    />
                    <div class="mt-4">
                      <span class="font-weight-bold1 h5"
                        >وضوح الفرصة<br />
                        وآلية احتسابها</span
                      >
                      <p class="font-weight-light pt-2">
                        وضوح تفاصيل الفرصة وتقييم الآلية المتبعة في احتساب الأثر
                        للفرص
                      </p>
                    </div>
                  </template>
                  <template v-slot:head(executionAndSpeed)="scope">
                    <img
                      class="tablesIcons"
                      src="/images/icons/asset5.png"
                      alt=""
                    />
                    <img
                      class="float-right tablesIconstwo pt-5"
                      src="/images/icons/hh.png"
                      alt=""
                    />
                    <div>
                      <span class="font-weight-bold1 h5"
                        >التنفيذ<br />
                        وسرعة الإنجاز</span
                      >
                      <p class="font-weight-light pt-2">
                        تقييم معالم التنفيذ وسرعة الإنجاز
                      </p>
                    </div>
                  </template>
                  <template v-slot:cell(elements)="row" class="tableClass">
                    <div v-if="row.index == 0">التقييم</div>
                    <div v-else-if="row.index == 1">ما تم عمله بنجاح</div>
                    <div v-else-if="row.index == 2">مواطن التحسين</div>
                  </template>
                  <template v-slot:cell(commitment)="row" class="tableClass">
                    <div v-if="row.index === 0 && isApprovedByCse">
                      <div :class="`${SectionA}`" class="mx-auto"></div>
                    </div>
                    <span v-else>{{ row.item.commitment }}</span>
                  </template>
                  <template
                    v-slot:cell(completeThePacking)="row"
                    class="tableClass"
                  >
                    <div v-if="row.index === 0 && isApprovedByCse">
                      <div :class="`${SectionB}`" class="mx-auto"></div>
                    </div>
                    <span v-else>{{ row.item.completeThePacking }}</span>
                  </template>
                  <template
                    v-slot:cell(opportunitieSize)="row"
                    class="tableClass"
                  >
                    <div v-if="row.index === 0 && isApprovedByCse">
                      <div :class="`${SectionC}`" class="mx-auto"></div>
                    </div>
                    <span v-else>{{ row.item.opportunitieSize }}</span>
                  </template>
                  <template
                    v-slot:cell(opportunityMechanism)="row"
                    class="tableClass"
                  >
                    <div v-if="row.index === 0 && isApprovedByCse">
                      <div :class="`${SectionD}`" class="mx-auto"></div>
                    </div>
                    <span v-else>{{ row.item.opportunityMechanism }}</span>
                  </template>
                  <template
                    v-slot:cell(executionAndSpeed)="row"
                    class="tableClass"
                  >
                    <div v-if="row.index === 0 && isApprovedByCse">
                      <div :class="`${SectionE}`" class="mx-auto"></div>
                    </div>
                    <span v-else>{{ row.item.executionAndSpeed }}</span>
                  </template>
                  <template v-slot:custom-foot="data">
                    <b-tr>
                      <b-td colspan="1">تعليقات عامّة من المركز </b-td>
                      <b-td colspan="5" style="background : none !important;">
                        <p v-if="Performance.length > 0 && isApprovedByCse">
                          {{ data.items[1].fourthExtra }}
                        </p>
                      </b-td>
                    </b-tr>
                  </template>
                </b-table>
              </div>
              <div v-else>
                <b-table
                  class="entity-performance-table top-radius pl-4 pr-4 table-column-text"
                  tbody-tr-class="tableClass"
                  bordered
                  :items="Performance"
                  :fields="entityPerActions"
                >
                  <template v-slot:head(elements)="scope">
                    <div>
                      <span>عناصر التقييم</span>
                    </div>
                  </template>
                  <template v-slot:head(commitment)="scope">
                    <img
                      class="tablesIcons"
                      src="/images/icons/asset1.png"
                      alt=""
                    />
                    <img
                      class="float-right tablesIconstwo pt-5"
                      src="/images/icons/aa.png"
                      alt=""
                    />
                    <div>
                      <span class="font-weight-bold h5">الالتزام</span>
                      <p class="font-weight-light pt-2">
                        تقييم الالتزام بإرسال التقارير الدورية خلال الشهر المحدد
                      </p>
                    </div>
                  </template>
                  <template v-slot:head(completeThePacking)="scope">
                    <img
                      class="tablesIcons"
                      src="/images/icons/asset2.png"
                      alt=""
                    />
                    <img
                      class="float-right tablesIconstwo pt-5"
                      src="/images/icons/bb.png"
                      alt=""
                    />
                    <div class="pr-3">
                      <span class="font-weight-bold h5">استكمال التعبئة</span>
                      <p class="font-weight-light pt-2">
                        تقييم اكتمالية التقرير وتعبئة البيانات المطلوبة
                      </p>
                    </div>
                  </template>
                  <template v-slot:head(opportunitieSize)="scope">
                    <img
                      class="tablesIcons"
                      src="/images/icons/asset3.png"
                      alt=""
                    />
                    <img
                      class="float-right tablesIconstwo pt-5"
                      src="/images/icons/gg.png"
                      alt=""
                    />
                    <div>
                      <span class="font-weight-bold h5">حجم الفرص</span>
                      <p class="font-weight-light pt-2">
                        تقييم حجم الأثر مقارنة بحجم الميزانية
                      </p>
                    </div>
                  </template>
                  <template v-slot:head(opportunityMechanism)="scope">
                    <img
                      class="tablesIcons"
                      src="/images/icons/asset4.png"
                      alt=""
                    />
                    <img
                      class="float-right tablesIconstwo my-5"
                      src="/images/icons/dd.png"
                      alt=""
                    />
                    <div class="pt-4 pr-3">
                      <span class="font-weight-bold h5"
                        >وضوح الفرصة<br />
                        وآلية احتسابها</span
                      >
                      <p class="font-weight-light pt-2">
                        وضوح تفاصيل الفرصة وتقييم الآلية المتبعة في احتساب الأثر
                        للفرص
                      </p>
                    </div>
                  </template>
                  <template v-slot:head(executionAndSpeed)="scope">
                    <div>
                      <img
                        class="tablesIcons"
                        src="/images/icons/asset5.png"
                        alt=""
                      />
                      <img
                        class="float-right tablesIconstwo pt-5"
                        src="/images/icons/hh.png"
                        alt=""
                      />
                      <span class="font-weight-bold h5"
                        >التنفيذ<br />
                        وسرعة الإنجاز</span
                      >
                      <p class="font-weight-light pt-2">
                        تقييم معالم التنفيذ وسرعة الإنجاز
                      </p>
                    </div>
                  </template>
                  <template v-slot:cell(elements)="row" class="tableClass">
                    <div v-if="row.index == 0">التقييم</div>
                    <div v-else-if="row.index == 1">ما تم عمله بنجاح</div>
                    <div v-else-if="row.index == 2">مواطن التحسين</div>
                  </template>
                  <template v-slot:cell(commitment)="row" class="tableClass">
                    <div v-if="row.index === 0">
                      <div :class="`${SectionA}`" class="mx-auto"></div>
                    </div>
                    <img
                      v-if="row.index == 1 || row.index == 2 ? true : false"
                      class="V-dots"
                      @click="openPresets(row)"
                      src="/images/icons/v-dots.png"
                    />
                    <div v-if="row.index == 1 || row.index == 2 ? true : false">
                      <div>
                        <b-textarea
                          placeholder="إضافة تعليق"
                          class="tableInput text-center border-0"
                          type="text"
                          v-model="row.item.commitment"
                        />
                      </div>
                      <div
                        class="Presets font-weight-bold p-2"
                        v-if="
                          presets &&
                            `${row.index}` == rowIndex &&
                            rowHeader == 'commitment'
                        "
                      >
                        <div
                          v-for="(item, index) in SelectPreSets(row)"
                          :key="index"
                        >
                          <span
                            @click="
                              (row.item.commitment = item.value),
                                (presets = !presets)
                            "
                            >{{ item.value }}</span
                          >
                          <hr />
                        </div>
                      </div>
                    </div>
                  </template>
                  <template
                    v-slot:cell(completeThePacking)="row"
                    class="tableClass"
                  >
                    <div v-if="row.index === 0">
                      <div :class="`${SectionB}`" class="mx-auto"></div>
                    </div>
                    <img
                      v-if="row.index == 1 || row.index == 2 ? true : false"
                      class="V-dots"
                      @click="openPresets(row)"
                      src="/images/icons/v-dots.png"
                    />
                    <div v-if="row.index == 1 || row.index == 2 ? true : false">
                      <div>
                        <b-textarea
                          placeholder="إضافة تعليق"
                          class="tableInput text-center border-0"
                          type="text"
                          v-model="row.item.completeThePacking"
                        />
                      </div>
                      <div
                        class="Presets font-weight-bold p-2"
                        v-if="
                          presets &&
                            `${row.index}` == rowIndex &&
                            rowHeader == 'completeThePacking'
                        "
                      >
                        <div
                          v-for="(item, index) in SelectPreSets(row)"
                          :key="index"
                        >
                          <span
                            @click="
                              (row.item.completeThePacking = item.value),
                                (presets = !presets)
                            "
                            >{{ item.value }}</span
                          >
                          <hr />
                        </div>
                      </div>
                    </div>
                  </template>
                  <template
                    v-slot:cell(opportunitieSize)="row"
                    class="tableClass"
                  >
                    <div v-if="row.index === 0">
                      <div :class="`${SectionC}`" class="mx-auto"></div>
                    </div>
                    <img
                      v-if="row.index == 1 || row.index == 2 ? true : false"
                      class="V-dots"
                      @click="openPresets(row)"
                      src="/images/icons/v-dots.png"
                    />
                    <div v-if="row.index == 1 || row.index == 2 ? true : false">
                      <div>
                        <b-textarea
                          placeholder="إضافة تعليق"
                          class="tableInput text-center border-0"
                          type="text"
                          v-model="row.item.opportunitieSize"
                        />
                      </div>
                      <div
                        class="Presets font-weight-bold p-2"
                        v-if="
                          presets &&
                            `${row.index}` == rowIndex &&
                            rowHeader == 'opportunitieSize'
                        "
                      >
                        <div
                          v-for="(item, index) in SelectPreSets(row)"
                          :key="index"
                        >
                          <span
                            @click="
                              (row.item.opportunitieSize = item.value),
                                (presets = !presets)
                            "
                            >{{ item.value }}</span
                          >
                          <hr />
                        </div>
                      </div>
                    </div>
                  </template>
                  <template
                    v-slot:cell(opportunityMechanism)="row"
                    class="tableClass"
                  >
                    <div v-if="row.index === 0">
                      <div :class="`${SectionD}`" class="mx-auto"></div>
                    </div>
                    <img
                      v-if="row.index == 1 || row.index == 2 ? true : false"
                      class="V-dots"
                      @click="openPresets(row)"
                      src="/images/icons/v-dots.png"
                    />
                    <div v-if="row.index == 1 || row.index == 2 ? true : false">
                      <div>
                        <b-textarea
                          placeholder="إضافة تعليق"
                          class="tableInput text-center border-0"
                          type="text"
                          v-model="row.item.opportunityMechanism"
                        />
                      </div>
                      <div
                        class="Presets font-weight-bold p-2"
                        v-if="
                          presets &&
                            `${row.index}` == rowIndex &&
                            rowHeader == 'opportunityMechanism'
                        "
                      >
                        <div
                          v-for="(item, index) in SelectPreSets(row)"
                          :key="index"
                        >
                          <span
                            @click="
                              (row.item.opportunityMechanism = item.value),
                                (presets = !presets)
                            "
                            >{{ item.value }}</span
                          >
                          <hr />
                        </div>
                      </div>
                    </div>
                  </template>
                  <template
                    v-slot:cell(executionAndSpeed)="row"
                    class="tableClass"
                  >
                    <div v-if="row.index === 0">
                      <div :class="`${SectionE}`" class="mx-auto"></div>
                    </div>
                    <img
                      v-if="row.index == 1 || row.index == 2 ? true : false"
                      class="V-dots"
                      @click="openPresets(row)"
                      src="/images/icons/v-dots.png"
                    />
                    <div v-if="row.index == 1 || row.index == 2 ? true : false">
                      <div>
                        <b-textarea
                          placeholder="إضافة تعليق"
                          class="tableInput text-center border-0"
                          type="text"
                          v-model="row.item.executionAndSpeed"
                        />
                      </div>
                      <div
                        class="Presets font-weight-bold p-2"
                        v-if="
                          presets &&
                            `${row.index}` == rowIndex &&
                            rowHeader == 'executionAndSpeed'
                        "
                      >
                        <div
                          v-for="(item, index) in SelectPreSets(row)"
                          :key="index"
                        >
                          <span
                            @click="
                              (row.item.executionAndSpeed = item.value),
                                (presets = !presets)
                            "
                            >{{ item.value }}</span
                          >
                          <hr />
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-slot:cell(action)="row" class="tableClass">
                    <md-button
                      :disabled="isApprovedByCse"
                      v-if="row.index !== 0"
                      @click="sendSummary(row.item, buttonText)"
                      class="btn md-primary main-btn comman-gradient border-radius"
                    >
                      {{ row.item.id ? "تحديث" : buttonText }}
                    </md-button>
                  </template>
                  <template v-slot:custom-foot="data">
                    <b-tr>
                      <b-td colspan="1">تعليقات عامّة من المركز </b-td>
                      <b-td colspan="5" style="background : none !important;">
                        <b-form-textarea
                          v-if="Performance.length > 0"
                          v-model="data.items[1].fourthExtra"
                          placeholder="إضافة تعليق"
                          class="border-0"
                        ></b-form-textarea>
                      </b-td>
                      <b-td>
                        <md-button
                          :disabled="isApprovedByCse"
                          v-if="Performance.length > 0"
                          @click="sendSummary(data.items[1], fourthExtra)"
                          class="btn md-primary main-btn comman-gradient border-radius"
                        >
                          {{
                            fourthExtra && data.items[1].fourthExtra === null
                              ? buttonText
                              : "تحديث"
                          }}
                        </md-button>
                      </b-td>
                    </b-tr>
                  </template>
                </b-table>
              </div>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <b-row class="mt-5">
        <b-col md="12">
          <b-card class="custom-card">
            <b-row class="p-4">
              <b-col md="2" class="pt-4">
                <h3 class="font-weight-bold color">
                  {{ $t("SubmissionTimeline") }}
                </h3>
              </b-col>
              <b-col md="2" class="pt-3">
                <div
                  class="d-inline-block"
                  v-if="
                    OnlyentityInitatior === 'Entity Initiator' &&
                      copyButton &&
                      showCopyButton
                  "
                >
                  <button
                    style="width : max-content"
                    class="btn md-primary  main-btn comman-gradient border-radius"
                    @click="onCopyReport()"
                  >
                    نسخ تقرير الشهر الماضي
                  </button>
                </div>
                <div v-else>
                  <md-field>
                    <!-- {{ CurrentYear }} -->
                    <label class="font-weight-bold">اختيار السنة</label>
                    <md-select
                      v-model="CurrentYear"
                      @md-selected="openYearlyreports(CurrentYear)"
                    >
                      <md-option
                        :value="CurrentYear"
                        v-for="(CurrentYear, index) in [
                          '2019',
                          '2020',
                          '2021',
                          '2022',
                          '2023',
                        ]"
                        :key="index"
                        >{{ CurrentYear }}</md-option
                      >
                    </md-select>
                  </md-field>
                </div>
              </b-col>
            </b-row>
            <b-row class="p-4 position-relative">
              <div class="line"></div>
              <b-col
                class="d-inline-block text-center"
                v-for="(item, index) in monthlyReports"
                :key="index"
              >
                <img
                  v-b-tooltip.hover
                  title="Pending Submission"
                  v-if="
                    (item.isSubmitted == false &&
                      item.month == $t(`${previous_month}`) &&
                      !copyButton) ||
                      (item.isSubmitted == false &&
                        item.month === $t(`${month}`) &&
                        item.year === year) ||
                      (item.isSubmitted == null &&
                        item.month === $t(`${month}`) &&
                        item.year === year &&
                        copyButton)
                  "
                  src="/images/icons/pending.png"
                  @click="getReports(item), getReportPerformance(item)"
                  class="image-icon"
                  alt
                />
                <img
                  v-if="
                    (item.isSubmitted == false &&
                      item.month != $t(`${previous_month}`) &&
                      item.year == CurrentYear &&
                      item.month != $t(`${month}`)) ||
                      (item.isSubmitted == false &&
                        copyButton &&
                        item.year == CurrentYear &&
                        item.month != $t(`${month}`))
                  "
                  src="/images/icons/Cross.png"
                  @click="getReports(item), getReportPerformance(item)"
                  class="image-icon"
                  alt
                />
                <img
                  v-if="item.isSubmitted == true"
                  src="/images/icons/Tick.png"
                  @click="getReports(item), getReportPerformance(item)"
                  class="image-icon"
                  alt
                />
                <img
                  v-if="
                    (item.isSubmitted == null &&
                      item.isSubmitted != true &&
                      item.isSubmitted != false &&
                      item.month != $t(`${month}`)) ||
                      (item.isSubmitted == null &&
                        item.isSubmitted != true &&
                        item.isSubmitted != false &&
                        item.year != year) ||
                      (item.isSubmitted == null &&
                        item.isSubmitted != true &&
                        item.isSubmitted != false &&
                        item.year == year &&
                        copyButton == false)
                  "
                  src="/images/icons/NA.png"
                  class="image-icon"
                  alt
                />
                <h5
                  class="font-weight-bold"
                  :class="{
                    color: item.isSubmitted == true && item.month === month,
                  }"
                >
                  {{ item.month }}
                </h5>
                <p
                  class="font-weight-bold"
                  :class="{
                    color: item.isSubmitted == true && item.month === month,
                  }"
                >
                  {{ item.year }}
                </p>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <b-row class="mt-5">
        <b-col>
          <b-card class="custom-card p-4">
            <div class="d-flex justify-content-between">
              <h3 class="font-weight-bold color">حجم الفرص</h3>
              <div
                class="d-flex d-inline-block justify-content-between lengeds p-2"
              >
                <div>
                  <div class="d-inline-block turquoise mt-1"></div>
                  <div class="align-top d-inline-block font-weight-bold pr-2">
                    حجم الوفر المتوقع
                  </div>
                </div>
                <div class="pl-5 pr-2">
                  <div class="d-inline-block blue mt-1"></div>
                  <div class="align-top d-inline-block font-weight-bold pr-2">
                    حجم الوفر المحقّق
                  </div>
                </div>
                <div>
                  <div class="font-weight-bold">
                    ريال
                  </div>
                </div>
              </div>
            </div>
            <b-row>
              <b-col md="3">
                <md-card
                  class="mt-2 overflow-auto pb-2 position-relative pt-2"
                  style="min-height: 160px"
                >
                  <img
                    class="my-5 position-absolute pr-4 w-25"
                    src="/images/icons/savingIcon1.png"
                  />
                  <span class="font-weight-bolder text-info h5 text-secondary"
                    >{{ initativePer }} %</span
                  >
                  <p
                    class="font-weight-bolder h5 mr-auto text-secondary w-75 pr-2"
                  >
                    {{ $t("averageRatioOfSavings") }}
                  </p>
                </md-card>
                <md-card class="pt-5 pb-5 mt-3 position-relative">
                  <img
                    class="position-absolute pr-4 w-25 py-3"
                    src="/images/icons/savingIcon2.png"
                  />
                  <p class="font-weight-bolder h5   text-info text-secondary">
                    {{ totalSavings }}
                  </p>
                  <p
                    class="font-weight-bolder h4 mr-auto text-secondary w-75 pr-2"
                  >
                    {{ $t("totalSavings") }}
                  </p>
                </md-card>
                <md-card class="pt-5 pb-5 position-relative mt-3">
                  <img
                    class="position-absolute pr-4 w-25 py-3"
                    src="/images/icons/dollar.png"
                  />
                  <p class="font-weight-bolder h5  text-info text-secondary">
                    {{ totalBudget }}
                  </p>
                  <p
                    class="font-weight-bolder h4 mr-auto text-secondary w-75 pr-2"
                  >
                    {{ $t("totalBudget") }}
                  </p>
                </md-card>
              </b-col>
              <b-col md="9">
                <div>
                  <canvas id="barChart" height="500"></canvas>
                </div>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <b-row class="mt-5">
        <b-col md="12">
          <b-card class="custom-card">
            <div class="d-flex justify-content-between p-4">
              <div class="d-inline-block">
                <h3 class="font-weight-bold color d-inline-block">
                  قائمة الفرص
                </h3>
              </div>
              <div>
                <div
                  class="d-flex d-inline-block justify-content-between lengeds  p-2"
                >
                  <div class="w-25">
                    <h5 class="font-weight-bold">حالة الفرصة:</h5>
                  </div>
                  <div class="w-25">
                    <div class="d-inline-block blue"></div>
                    <div
                      class="align-top d-inline-block font-weight-bold pr-2 w-75"
                    >
                      منتهية
                    </div>
                  </div>
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
                <div
                  class="d-flex d-inline-block justify-content-between lengeds  p-2"
                >
                  <div class="pl-3">
                    <h5 class="font-weight-bold">
                      وضوح الفرصة وآلية احتسابها <br />التنفيذ وسرعة الإنجاز
                    </h5>
                  </div>
                  <div class="pr-3">
                    <div class="d-inline-block green"></div>
                    <span class="align-top d-inline-block font-weight-bold pr-2"
                      >متحقق
                    </span>
                  </div>
                  <div class="pr-2">
                    <div class="d-inline-block yellow"></div>
                    <div class="align-top d-inline-block font-weight-bold pr-2">
                      متحقق جزئياً
                    </div>
                  </div>
                  <div>
                    <div class="d-inline-block red"></div>
                    <span
                      class="align-top d-inline-block font-weight-bold  pr-2"
                      >غير متحقق
                    </span>
                  </div>
                  <div class="pl-1">
                    <div class="d-inline-block grey"></div>
                    <span class="align-top d-inline-block font-weight-bold pr-2"
                      >سيتم التقييم لاحقا
                    </span>
                  </div>
                </div>
              </div>

              <div
                class="h-100"
                v-if="
                  ($t(`${currentMonth}`) == $t(`${month}`) && copyButton) ||
                    ($t(`${currentMonth}`) == $t(`${previous_month}`) &&
                      copyButton == false)
                "
              >
                <button
                  v-if="
                    (!OnlyentityInitatior === 'Entity Initiator' &&
                      firstVisitInitiative) ||
                      (OnlyentityInitatior === 'Entity Initiator' &&
                        !isSubmittedToCSE)
                  "
                  class="btn md-primary h-100 main-btn comman-gradient border-radius"
                  @click="newIni()"
                >
                  أضف فرصة جديدة
                </button>
              </div>
            </div>
            <div class="pl-4 pr-4">
              <b-table
                class="initative-table"
                bordered
                :items="items"
                :fields="fields"
              >
                <template
                  style="width: 140px; display: contents"
                  v-slot:cell(number)="data"
                >
                  <div @click="openIni(data.item)">{{ data.item.number }}</div>
                </template>
                <template v-slot:cell(name)="data">
                  <div @click="openIni(data.item)">
                    <img
                      v-if="data.item.commentsFlag"
                      class="chat-bubble pr-1"
                      src="/images/icons/chat_bubble.png"
                    />
                    {{ data.item.name }}
                  </div>
                </template>
                <template v-slot:cell(owner)="data">
                  <div @click="openIni(data.item)">{{ data.item.owner }}</div>
                </template>
                <template v-slot:cell(progressStatus)="data">
                  <div @click="openIni(data.item)" class>
                    <div
                      class="circle mx-auto"
                      :class="`${data.item.progressStatus}`"
                    ></div>
                  </div>
                </template>
                <template v-slot:cell(expSaveValue)="data">
                  <div @click="openIni(data.item)">
                    {{ formatAsCurrency(data.item.expSaveValue) }}
                  </div>
                </template>
                <template v-slot:cell(supportRequires)="data">
                  <div
                    @click="openIni(data.item)"
                    v-for="(support, index) in data.item.supportRequires"
                    :key="index"
                  >
                    {{ support.supportType }}
                  </div>
                </template>
                <template v-slot:cell(totalYearsSaving)="data">
                  <div @click="openIni(data.item)">
                    {{ formatAsCurrency(data.item.totalYearsSaving) }}
                  </div>
                </template>
                <template v-slot:cell(fourthComponent)="data">
                  <div @click="openIni(data.item)" class>
                    <div
                      v-if="data.item.fourthComponent"
                      class="circle mx-auto"
                      :class="`${data.item.fourthComponent}`"
                    ></div>
                    <div v-else class="grey mx-auto"></div>
                  </div>
                </template>
                <template v-slot:cell(fifthComponent)="data">
                  <div @click="openIni(data.item)" class>
                    <div
                      v-if="data.item.fifthComponent"
                      class="circle mx-auto"
                      :class="`${data.item.fifthComponent}`"
                    ></div>
                    <div v-else class="grey mx-auto"></div>
                  </div>
                </template>
                <template v-slot:cell(action)="data">
                  <div class="d-flex justify-content-center">
                    <button
                      @click="onDelete(data.item)"
                      :disabled="
                        !(
                          data.item.enableDelete &&
                          OnlyentityInitatior === 'Entity Initiator' &&
                          currentOwner === OnlyentityInitatior
                        )
                      "
                      class="btn border-radius-5 d-inline-block ml-1 border-radius delete text-white"
                    >
                      حذف
                    </button>
                    <button
                      @click="openIni(data.item)"
                      class="btn border-radius-5 d-inline-block ml-1 border-radius comman-gradient text-white"
                    >
                      {{ $t("viewInitiative") }}
                    </button>
                  </div>
                </template>
              </b-table>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <b-row class="mt-5 mb-5">
        <b-col>
          <b-card class="custom-card">
            <div class="p-4">
              <h3 class="font-weight-bold color">
                {{ $t("EntitySpendingsEfficientsMembers") }}
              </h3>
            </div>
            <div class="pl-4 pr-4">
              <b-table
                class="top-radius"
                bordered
                :items="entityUsers"
                :fields="entityFields"
              >
                <template v-slot:cell(index)="data">{{
                  data.index + 1
                }}</template>
                <template v-slot:cell(roleNames)="data">
                  <span
                    v-for="(role, index) in data.item.roleNames"
                    :key="index"
                  >
                    {{ role }}
                  </span>
                </template>
              </b-table>
            </div>
          </b-card>
        </b-col>
      </b-row>

      <b-modal
        id="confirmMessage"
        centered
        :hide-header="true"
        :hide-footer="true"
      >
        <div class="p-5 text-center">
          <h3 v-if="$user.currentRole() === 'CSE Approver' && forward">
            يرجى تأكيد إرسال التقرير إلى الجهة
            <!-- {{ forward }} -->
          </h3>
          <h3
            class=""
            v-if="$user.currentRole() === 'Entity Approver' && forward"
          >
            يرجى تأكيد إرسال التقرير إلى مركز تحقيق كفاءة الإنفاق
          </h3>
          <h3
            class=""
            v-if="$user.currentRole() === 'Entity Approver' && forward == false"
          >
            تم إرسال التقرير إلى المعتمد من الجهة بنجاح
          </h3>
          <h3 class="" v-if="$user.currentRole() === 'CSE Reviewer A'">
            يرجى تأكيد إرسال التقرير إلى المراجع الثاني
          </h3>
          <h3
            class=""
            v-if="$user.currentRole() === 'CSE Reviewer B' && forward"
          >
            يرجى تأكيد إرسال التقرير إلى المعتمد
          </h3>
          <h3
            class=""
            v-if="$user.currentRole() === 'CSE Reviewer B' && forward == false"
          >
            يرجى تأكيد إعادة التقرير إلى المراجع الأول
          </h3>
          <h3
            class=""
            v-if="$user.currentRole() === 'CSE Approver' && forward == false"
          >
            يرجى تأكيد إعادة التقرير إلى المراجع الثاني
          </h3>
          <h3 class="" v-if="$user.currentRole() === 'Entity Initiator'">
            يرجى تأكيد إرسال التقرير إلى المعتمد من الجهة
          </h3>
        </div>
        <div>
          <md-button
            class="btn md-raised comman-gradient border-radius main-btn text-capitalize"
            @click="
              $user.currentRole() === 'CSE Approver' && CSEApprover
                ? onCSEApprover()
                : (confirm = true),
                submitReport(forward),
                $bvModal.hide('confirmMessage')
            "
            >موافقة</md-button
          >
          <md-button
            class="md-raised comman-gradient border-radius main-btn text-capitalize"
            @click="$bvModal.hide('confirmMessage')"
            >إلغاء</md-button
          >
        </div>
      </b-modal>
    </div>
  </b-container>
</template>

<script>
import moment from "moment";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import html2PDF from "jspdf-html2canvas";
export default {
  data() {
    return {
      CSEApprover: false,
      forward: null,
      isApprovedByCse: false,
      rowHeader: null,
      rowIndex: null,
      presets: false,
      preSets: [],
      commitment: [],
      firstSection: "grey",
      SectionA: "grey",
      SectionB: "grey",
      SectionC: "grey",
      SectionD: "grey",
      SectionE: "grey",
      initativePer: null,
      totalBudget: null,
      totalSavings: null,
      CurrentYear: null,
      year: new Date().getFullYear().toString(),
      CurrentRole: null,
      buttonText: "حفظ",
      tenantId: null,
      entityName: null,
      entitySector: null,
      isSubmittedToCSE: false,
      isCurrentMonthReport: false,
      firstVisitInitiative: false,
      showCopyButton: false,
      sending: false,
      formDisabled: false,
      currentOwner: null,
      options: {
        isActive: true,
        SkipCount: 0,
        MaxResultCount: 100,
        action: "",
        monthlyReportId: null,
      },
      currentMonth: null,
      reports: [],
      reportsMonth: {
        يناير: "January",
        فبراير: "February",
        مارس: "March",
        أبريل: "April",
        مايو: "May",
        يونيو: "June",
        يوليو: "July",
        أغسطس: "August",
        سبتمبر: "September",
        أكتوبر: "October",
        نوفمبر: "November",
        ديسمبر: "December",
      },
      month: new Date()
        .toLocaleString("en-us", { month: "long" })
        .toString()
        .toLowerCase(),
      monthlyReports: [
        { month: this.$t("january"), isSubmitted: null, year: null },
        { month: this.$t("february"), isSubmitted: null, year: null },
        { month: this.$t("march"), isSubmitted: null, year: null },
        { month: this.$t("april"), isSubmitted: null, year: null },
        { month: this.$t("may"), isSubmitted: null, year: null },
        { month: this.$t("june"), isSubmitted: null, year: null },
        { month: this.$t("july"), isSubmitted: null, year: null },
        { month: this.$t("august"), isSubmitted: null, year: null },
        { month: this.$t("september"), isSubmitted: null, year: null },
        { month: this.$t("october"), isSubmitted: null, year: null },
        { month: this.$t("november"), isSubmitted: null, year: null },
        { month: this.$t("december"), isSubmitted: null, year: null },
      ],
      fields: [
        { key: "number", label: "#" },
        { key: "name", label: this.$t("oppertunityname") },
        { key: "owner", label: this.$t("owner") },
        { key: "progressStatus", label: "حالة الفرصة" },
        {
          key: "expSaveValue",
          label: "إجمالي الوفر المتوقع كما ورد في التقرير",
        },
        {
          key: "totalYearsSaving",
          label: "إجمالي الوفر المتوقع بحسب التوزيع السنوي (2019-2023)",
        },
        {
          key: "fourthComponent",
          label: "وضوح الفرصة وآلية احتسابها",
        },
        { key: "fifthComponent", label: "التنفيذ وسرعة الإنجاز" },
        // { key: "supportRequires", label: "الدعم المطلوب من الجهة" },
        { key: "action", label: this.$t("action") },
      ],
      fourthExtra: true,
      items: [],
      dataset: [],
      expectedDateset: [],
      Performance: [],
      entityPerActions: [
        {
          key: "elements",
          label: "عناصر التقييم",
          fontSize: 24 + "px",
        },
        { key: "commitment", label: "الالتزام" },
        { key: "completeThePacking", label: "استكمال التعبئة" },
        { key: "opportunitieSize", label: "حجم الفرص" },
        {
          key: "opportunityMechanism",
          label: "وضوح الفرصة وآلية احتسابها",
        },
        { key: "executionAndSpeed", label: "التنفيذ وسرعة الإنجاز" },
        { key: "action", label: this.$t("action") },
      ],
      entityPer: [
        {
          key: "elements",
          label: "عناصر التقييم",
          fontSize: 24 + "px",
        },
        { key: "commitment", label: "الالتزام" },
        { key: "completeThePacking", label: "استكمال التعبئة" },
        { key: "opportunitieSize", label: "حجم الفرص" },
        {
          key: "opportunityMechanism",
          label: "وضوح الفرصة وآلية احتسابها",
        },
        { key: "executionAndSpeed", label: "التنفيذ وسرعة الإنجاز" },
      ],
      entityUsers: [],
      entityFields: [
        { key: "index", label: "#" },
        {
          key: "name",
          label: this.$t("firstName"),
        },
        {
          key: "surname",
          label: this.$t("lastName"),
        },
        {
          key: "emailAddress",
          label: this.$t("emailAddress"),
        },
        {
          key: "phoneNumber",
          label: this.$t("phoneNumber"),
        },
        {
          key: "roleNames",
          label: this.$t("userType"),
        },
      ],
    };
  },
  filters: {
    trimName: function(val) {
      return val.slice(0, 3);
    },
  },
  computed: {
    previous_month() {
      let d = new Date();
      let month = d.getMonth() - 1;
      let mlist = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return mlist[month === -1 ? 11 : month];
    },
    copyButton() {
      let day = moment().format("DD");
      if (day > 10) {
        return true;
      } else {
        return false;
      }
    },
    previousMonth() {
      let day = moment().format("DD");
      if (this.currentMonth != null) {
        return this.currentMonth.split("-")[0] === this.previous_month &&
          day < 10
          ? true
          : false;
      }
    },
    reportMonth() {
      let d = new Date();
      let month = moment.months(d.getMonth());
      if (this.currentMonth != null) {
        return this.currentMonth.split("-")[0] === month ? true : false;
      } else {
        return false;
      }
    },
    OnlyentityInitatior() {
      return this.$user.currentRole();
    },
    entityInitatior() {
      let role = this.$user.currentRole();
      if (role == "Entity Initiator" || role == "Entity Approver") return true;
      // return this.$user.currentRole();
    },
    iAmOwner() {
      if (
        this.currentOwner == "CSE Special Reviewer" ||
        this.currentOwner == "CSE Reviewer B" ||
        this.currentOwner == "CSE Reviewer A"
      ) {
        const roles = ["CSE Reviewer A", "CSE Reviewer B"];
        return roles.some((role) => role.includes(this.$user.currentRole()));
      }
      return this.currentOwner === this.$user.currentRole() ? true : false;
    },
    dontGoBack() {
      const roles = [
        "CSE Special Reviewer",
        "Entity Initiator",
        "CSE Reviewer A",
      ];
      return roles.some((role) => role.includes(this.$user.currentRole()));
    },
  },
  methods: {
    DownloadPdf() {
      var data = document.getElementById("entityperfromance");
      html2PDF(data, {
        jsPDF: {
          format: "a4",
        },

        imageType: "image/jpeg",
        output: "./pdf/generate.pdf",
      });
      // const options = {
      //   letterRendering: true,
      //   pagesplit: true,
      // };
      // html2canvas(data, options).then((canvas) => {
      //   var imgWidth = 200;
      //   var pageHeight = 295;
      //   var imgHeight = (canvas.height * imgWidth) / canvas.width;
      //   var heightLeft = imgHeight;
      //   let pdf = new jsPDF("p", "mm", "a4"); // A4 size page of PDF
      //   const contentDataURL = canvas.toDataURL("image/png");
      //   pdf.addImage(contentDataURL, "PNG", 0, 0, imgWidth, imgHeight);
      //   pdf.save("MYPdf.pdf"); // Generated PDF
      // });
    },
    openPresets(payload) {
      if (!this.isApprovedByCse) {
        this.rowIndex = payload.index;
        this.rowHeader = payload.field.key;
        this.presets = !this.presets;
      }
    },
    SelectPreSets(payload) {
      let _arrPreSetsA = [];
      let _arrPreSetsB = [];
      this.preSets.filter((item) => {
        if (item.setKey === payload.field.key && item.row === "RowA") {
          _arrPreSetsA.push(item);
        }
        if (item.setKey === payload.field.key && item.row === "RowB") {
          _arrPreSetsB.push(item);
        }
      });
      if (payload.index === 1) {
        return _arrPreSetsA;
      } else {
        return _arrPreSetsB;
      }
      // console.log(commitment);
    },
    openYearlyreports(payload) {
      let data = {
        year: payload,
        tenantid: this.tenantId,
      };
      this.$showLoader();
      this.$monthlyReportsService.getYearlyReports(data).then((res) => {
        if (res.success) {
          this.reports = [];
          // this.monthlyReports = [];
          if (res.data.length > 0) {
            this.reports = res.data;
            this.monthlyReports.forEach((item) => (item.isSubmitted = null));
            this.reports.forEach((item) => {
              this.monthlyReports.map((payload) => {
                payload.year = item.name.split("-")[1];
              });
            });
            this.monthlyReports.map((item) => {
              if (
                this.reports.find(
                  (rep) =>
                    item.month.includes(this.getArabicMonth(rep.name)) &&
                    rep.isSubmitted == true
                )
              ) {
                item.isSubmitted = true;
              } else if (
                this.reports.find(
                  (rep) =>
                    item.month.includes(this.getArabicMonth(rep.name)) &&
                    rep.isSubmitted == false
                )
              ) {
                item.isSubmitted = false;
              }
              // console.log(item);
              return item;
            });
          } else {
            this.monthlyReports.forEach((item) => {
              item.isSubmitted = null;
              item.year = this.CurrentYear;
            });
          }
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
    onDelete(payload) {
      let data = {
        id: payload.id,
      };
      this.$showLoader();
      this.$initiativeService.delete(data).then((res) => {
        if (res.success) {
          this.getReports();
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
    sendSummary(payload, buttonText) {
      if (buttonText === true) {
        this.fourthExtra = false;
      }
      let data = {
        monthlyReportId: this.options.monthlyReportId,
        elementsOfEvaluation: null,
        commitment: payload.commitment,
        completeThePacking: payload.completeThePacking,
        opportunitieSize: payload.opportunitieSize,
        opportunityMechanism: payload.opportunityMechanism,
        executionAndSpeed: payload.executionAndSpeed,
        fourthExtra: payload.fourthExtra,
        id: payload.id ? payload.id : 0,
      };
      this.$showLoader();
      if (payload.id) {
        this.$EntityPerformance.Update(data).then((res) => {
          if (res.success) {
            this.getReports();
          } else {
            this.$swal({
              icon: "error",
              type: "error",
              title: error.message.message,
            });
          }
          this.$hideLoader();
        });
      } else {
        this.$EntityPerformance.Create(data).then((res) => {
          if (res.success) {
            this.getReports();
          } else {
            this.$swal({
              icon: "error",
              type: "error",
              title: error.message.message,
            });
          }
          this.$hideLoader();
        });
      }
    },
    onCSEApprover() {
      let data = {
        monthlyReportId: this.options.monthlyReportId,
        feedBacks: null,
      };
      this.$bvModal.hide("confirmMessage");
      this.$showLoader();
      this.$monthlyReportsService.submitFinalReport(data).then((res) => {
        if (res.success) {
          this.getReports();
          this.$swal({
            icon: "success",
            type: "success",
            title: "تم إرسال التقرير إلى الجهة بنجاح",
            confirmButtonText: "موافق",
          }).then(() => {
            // this.isCSEApprover = !this.isCSEApprover;
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
    formatAsCurrency(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
        // if (this.$user.currentRole() == "CSE Approver") {
        //   apiCall = "submitFinalReport";
        // }
        this.options.action = forward
          ? "Submitted the report"
          : "Returned the report";
        this.$monthlyReportsService[apiCall](this.options).then((res) => {
          if (res.success) {
            this.getReports();
            this.getAllEntities();
            let title = null;
            if (this.$user.currentRole() === "Entity Initiator") {
              title = "تم إرسال التقرير إلى المعتمد";
            }
            if (this.$user.currentRole() === "CSE Approver") {
              title = "تم إرسال التقرير إلى المراجع الثاني";
            }
            if (this.$user.currentRole() === "Entity Approver") {
              title = "تم إرسال التقرير إلى مركز تحقيق كفاءة الإنفاق بنجاح";
            }
            if (this.$user.currentRole() === "CSE Reviewer A") {
              title = "تم إرسال التقرير إلى المراجع الثاني";
            }
            if (this.$user.currentRole() === "CSE Reviewer B") {
              title = "تم إرسال التقرير إلى المعتمد من المركز";
            }
            if (
              this.$user.currentRole() === "CSE Reviewer B" &&
              this.options.action === "Returned the report"
            ) {
              title = "تم إعادة التقرير إلى المراجع الأول";
            }
            if (
              this.$user.currentRole() === "Entity Approver" &&
              this.options.action === "Returned the report"
            ) {
              title = "تم إعادة التقرير إلى المنشئ";
            }
            this.$swal({
              icon: "success",
              type: "success",
              confirmButtonText: "موافق",
              title: title,
            });
          } else {
            this.$swal({
              icon: "error",
              type: "error",
              confirmButtonText: "موافق",
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
          } else if (
            currentRole == "CSE Special Reviewer" &&
            this.currentOwner == "CSE Reviewer A"
          ) {
            return "CSE Reviewer B";
          } else if (
            currentRole == "CSE Special Reviewer" &&
            this.currentOwner == "CSE Reviewer B"
          ) {
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
          } else if (
            currentRole == "CSE Special Reviewer" &&
            this.currentOwner == "CSE Reviewer B"
          ) {
            return "CSE Reviewer A";
          }

          break;
        }
      }

      return "";
    },
    openIni(payload) {
      this.$router.push(`/main/monthly-report/initiatives-form/${payload.id}`);
    },
    newIni() {
      localStorage.removeItem("yuy111yuy2@@##");
      this.$router.push("/main/monthly-report/initiatives-form");
    },
    CreateChart() {
      if (this.myChart != null) {
        this.myChart.destroy();
      }
      let _data = this.dataset;
      let expected = this.expectedDateset;
      var ctx = document.getElementById("barChart").getContext("2d");
      Chart.defaults.global.defaultFontStyle = "bold";
      Chart.defaults.global.defaultFontFamily =
        "'DIN', 'Helvetica', 'Arial', sans-serif";
      this.myChart = new Chart(ctx, {
        type: "bar",
        data: {
          fontFamily: "'DIN', 'Helvetica', 'Arial', sans-serif",
          fontSize: 30,
          labels: ["سنين مستقبلية", "2023", "2022", "2021", "2020", "2019"],
          datasets: [
            {
              label: false,
              data: _data,
              backgroundColor: "#2582C5",
              borderWidth: 1,
              maxBarThickness: 20,
              order: 1,
            },
            {
              label: false,
              data: expected,
              backgroundColor: "#1CB2B8",
              borderWidth: 1,
              maxBarThickness: 20,
              order: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          title: {
            display: true,
            position: "bottom",
            fontSize: 20,
            fontFamily: "'DIN', 'Helvetica', 'Arial', sans-serif",
            text: "الخطة الزمنية لظهور أثر الفرص على المدى القريب والمتوسط",
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  fontSize: 16,
                  beginAtZero: true,
                  min: 0,
                  callback: function(value, index, values) {
                    return value
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  },
                },
              },
            ],
            xAxes: [
              {
                ticks: {
                  fontSize: 16,
                },
              },
            ],
          },
        },
      });
    },
    getArabicMonth(item) {
      if (item.split("-")[0] == "January") {
        return this.$t("january");
      } else if (item.split("-")[0] == "February") {
        return this.$t("february");
      } else if (item.split("-")[0] == "March") {
        return this.$t("march");
      } else if (item.split("-")[0] == "April") {
        return this.$t("april");
      } else if (item.split("-")[0] == "May") {
        return this.$t("may");
      } else if (item.split("-")[0] == "June") {
        return this.$t("june");
      } else if (item.split("-")[0] == "July") {
        return this.$t("july");
      } else if (item.split("-")[0] == "August") {
        return this.$t("august");
      } else if (item.split("-")[0] == "September") {
        return this.$t("september");
      } else if (item.split("-")[0] == "October") {
        return this.$t("october");
      } else if (item.split("-")[0] == "November") {
        return this.$t("november");
      } else if (item.split("-")[0] == "December") {
        return this.$t("december");
      }
    },
    getEnglishMonths(item) {
      if (item === this.$t("january")) {
        return "January";
      } else if (item == this.$t("february")) {
        return "February";
      } else if (item == this.$t("march")) {
        return "March";
      } else if (item == this.$t("april")) {
        return "April";
      } else if (item == this.$t("may")) {
        return "May";
      } else if (item == this.$t("june")) {
        return "June";
      } else if (item == this.$t("july")) {
        return "July";
      } else if (item == this.$t("august")) {
        return "August";
      } else if (item == this.$t("september")) {
        return "September";
      } else if (item == this.$t("october")) {
        return "October";
      } else if (item == this.$t("november")) {
        return "November";
      } else if (item == this.$t("december")) {
        return "December";
      }
    },
    getReports(payload) {
      let month = null;
      let date = new Date();
      let year = null;
      if (this.CurrentYear != null) {
        year = this.CurrentYear;
      } else {
        year = `${date.getFullYear()}`;
      }
      if (payload) {
        // let currentMonth = this.$t(`${payload.month}`);
        month = this.getEnglishMonths(this.$t(`${payload.month}`));
      }
      let data = "";
      if (!payload) {
        data = {
          tenantId: this.tenantId,
        };
      } else {
        data = {
          tenantId: this.tenantId,
          name: month + `${"-" + year}`,
          isSubmitted:
            payload.isSubmitted != null ? payload.isSubmitted : false,
          year: year,
        };
      }

      this.$showLoader();
      this.$monthlyReportsService.GetMonthlyReports(data).then((res) => {
        if (res.success) {
          this.dataset = [];
          this.Performance = [];
          this.expectedDateset = [];
          this.items = [];
          this.currentMonth = null;
          this.totalSavings = res.data.totalInitiativeSavings
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.totalBudget = res.data.entityBudget
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.initativePer = res.data.savingpercentage;
          this.options.monthlyReportId = res.data.id;
          if (res.data.initiatives) {
            this.firstVisitInitiative = false;
          }
          if (res.data.getAllIniciatives != null) {
            this.isApprovedByCse = res.data.getAllIniciatives
              ? res.data.getAllIniciatives.isApprovedByCse
              : null;
            this.CurrentYear = res.data.getAllIniciatives
              ? res.data.getAllIniciatives.name.split("-")[1]
              : null;
            this.currentMonth = res.data.getAllIniciatives
              ? res.data.getAllIniciatives.name.split("-")[0]
              : null;
            if (
              res.data.getAllIniciatives.name ==
              this.getFormatedReportName(new Date())
            ) {
              this.isCurrentMonthReport = true;
            }
          }
          this.showCopyButton = res.data.showCopyButton;
          this.entitySector = res.data ? res.data.tenantSector : null;
          this.entityName = res.data ? res.data.tenantName : null;
          this.isSubmittedToCSE = res.data ? res.data.isSubmittedToCSE : null;
          this.currentOwner = res.data.currentOwner;
          if (res.data.entityPerformances.length > 0) {
            this.Performance = res.data.entityPerformances;
            let data = {
              commitment: null,
              completeThePacking: null,
              opportunitieSize: null,
              opportunityMechanism: null,
              executionAndSpeed: null,
              fourthExtra: null,
            };
            this.Performance.splice(0, 0, data);
            if (this.Performance.length >= 1 && this.Performance.length <= 2) {
              for (let i = 0; i < 1; i++) {
                let data = {
                  commitment: null,
                  completeThePacking: null,
                  opportunitieSize: null,
                  opportunityMechanism: null,
                  executionAndSpeed: null,
                  fourthExtra: null,
                };
                this.Performance.push(data);
                // if (this.Performance.length < 4) {
                //   this.Performance.push(data);
                // }
              }
            }
          }
          if (res.data.entityPerformances.length <= 0) {
            for (let i = 0; i < 3; i++) {
              let data = {
                commitment: null,
                completeThePacking: null,
                opportunitieSize: null,
                opportunityMechanism: null,
                executionAndSpeed: null,
                fourthExtra: null,
              };
              this.Performance.push(data);
            }
          }
          this.dataset.push(res.data.achivedYear);
          this.dataset.push(res.data.yearA2023);
          this.dataset.push(res.data.yearA2022);
          this.dataset.push(res.data.yearA2021);
          this.dataset.push(res.data.yearA2020);
          this.dataset.push(res.data.yearA2019);
          this.expectedDateset.push(res.data.expectedYear);
          this.expectedDateset.push(res.data.yearE2023);
          this.expectedDateset.push(res.data.yearE2022);
          this.expectedDateset.push(res.data.yearE2021);
          this.expectedDateset.push(res.data.yearE2020);
          this.expectedDateset.push(res.data.yearE2019);
          if (res.data.initiatives != null) {
            if (res.data.initiatives.length > 0)
              this.items = res.data.initiatives;
          }
          if (res.data.reports) {
            this.reports = res.data.reports;
            this.monthlyReports.forEach((item) => (item.isSubmitted = null));
            this.reports.forEach((item) => {
              this.monthlyReports.map((payload) => {
                payload.year = item.name.split("-")[1];
              });
            });
            this.monthlyReports.map((item) => {
              if (
                this.reports.find(
                  (rep) =>
                    item.month.includes(this.getArabicMonth(rep.name)) &&
                    rep.isSubmitted === true
                )
              ) {
                item.isSubmitted = true;
              } else if (
                this.reports.find(
                  (rep) =>
                    item.month.includes(this.getArabicMonth(rep.name)) &&
                    rep.isSubmitted === false
                )
              ) {
                item.isSubmitted = false;
              }
              return item;
            });
            console.log(this.monthlyReports);
          }
        }
        this.$hideLoader();
        this.CreateChart();
      });
    },
    getAllEntities(payload) {
      this.$showLoader();
      this.$userService
        .getAllTenenat(this.tenantId)
        .then((res) => {
          if (res.success) {
            this.entityUsers = res.data;
            this.$hideLoader();
          } else {
            this.$hideLoader();
          }
        })
        .catch((error) => {});
    },
    getReportPerformance(payload) {
      let month = null;
      let date = new Date();
      let year = null;
      if (this.CurrentYear != null) {
        year = this.CurrentYear;
      } else {
        year = `${date.getFullYear()}`;
      }
      if (payload) {
        // let currentMonth = this.$t(`${payload.month}`);
        month = this.getEnglishMonths(this.$t(`${payload.month}`));
      }
      let data = "";
      if (!payload) {
        data = {
          tenantId: this.tenantId,
        };
      } else {
        data = {
          tenantId: this.tenantId,
          name: month + `${"-" + year}`,
          isSubmitted:
            payload.isSubmitted != null ? payload.isSubmitted : false,
          year: year,
        };
      }
      this.$monthlyReportsService.ReportEvulation(data).then((res) => {
        if (res.success) {
          if (res.data != null) {
            this.firstSection = res.data.firstSection
              ? res.data.firstSection
              : "grey";
            this.SectionA = res.data.sectionA ? res.data.sectionA : "grey";
            this.SectionB = res.data.sectionB ? res.data.sectionB : "grey";
            this.SectionC = res.data.sectionC ? res.data.sectionC : "grey";
            this.SectionD = res.data.sectionD ? res.data.sectionD : "grey";
            this.SectionE = res.data.sectionE ? res.data.sectionE : "grey";
          }
        }
      });
    },
    getEvalluationPreSets() {
      this.$CommentPresets.EvalluationPreSets().then((res) => {
        if (res.success) {
          this.preSets = res.data;
        }
      });
    },
    onCopyReport() {
      this.$showLoader();
      this.$monthlyReportsService
        .copyLastMonthReport(this.tenantId)
        .then((res) => {
          if (res.success) {
            this.getReports();
          }
          this.$$hideLoader();
        });
    },
  },
  mounted() {
    this.getEvalluationPreSets();
    if (
      this.$user.currentRole() === "Entity Initiator" ||
      this.$user.currentRole() === "Entity Approver"
    ) {
      this.CurrentRole = true;
      this.tenantId = localStorage.getItem("tenantId");
      this.getReports();
      this.getReportPerformance();
      this.getAllEntities();
      if (this.$user.currentRole() !== "Entity Initiator") {
        this.formDisabled = true;
      }
      if (this.$user.currentRole() === "Entity Initiator") {
        this.firstVisitInitiative = true;
      }
    } else {
      let tenantId = this.$route.params.tenantId;
      this.tenantId = this.$route.params.tenantId;
      this.getReports(false);
      this.getReportPerformance(false);
      this.getAllEntities(tenantId);
    }
  },
};
</script>

<style scoped>
.Presets {
  width: 230px;
  border-radius: 10px;
  position: absolute;
  left: 4px;
  top: 63px;
  z-index: 22;
  background-color: white;
  overflow-y: auto;
  overflow-wrap: break-word;
  scrollbar-width: none;
  box-shadow: 1px, 1px, 1px, 1px solid;
  box-shadow: 0px 0px 10px 5px lightgrey;
}
.V-dots {
  top: 1px;
  left: 1px;
  position: absolute;
}
.custom-card {
  border-radius: 10px;
}
.custom-card .card-body {
  padding: 0% !important ;
}
.color {
  color: #36bbc0;
}
.submissionTime {
  height: 70px;
  border: 1px solid;
  width: 70px;
  border-radius: 50px;
}
.line {
  width: 91%;
  top: 31%;
  border: 1px solid lightgray;
  position: absolute;
  right: 39px;
}
/* .bar-chart {
  height: 400px;
} */
.image-icon {
  width: 64px;
}
.circle {
  /* height: 25px;
  width: 25px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 14px;
  background-color: gray; */
}
.firstColumn {
  position: absolute;
  right: 169px;
  top: 180px;
}
.secondColumn {
  position: absolute;
  right: 370px;
  top: 180px;
}
.thirdcolumn {
  position: absolute;
  right: 570px;
  top: 180px;
}
.fourthColumn {
  position: absolute;
  left: 390px;
  top: 180px;
}
.fifthColumn {
  position: absolute;
  left: 187px;
  top: 180px;
}
.Icons {
  left: 25px;
  position: absolute;
  top: 110px;
}
.height {
  height: 50px;
}
.custom-text {
  width: 17%;
  height: 50px;
  border-radius: 5px;
  background-color: #eeeeee;
}
.custom-block {
  width: 14.9%;
  height: 50px;
  border-radius: 5px;
  background-color: #eeeeee;
}
.icon-border-radius {
  border-radius: 20px;
  padding-left: 3px;
}
.lengeds {
  /* background-color: #eeeeee; */
}
.tableClass {
  background: #36bbc0;
}
.tableClass > td {
  position: relative;
}
.n-margin {
  margin: -15px;
}
.p-right {
  padding-right: 149px;
}
.padding-right {
  padding-right: 148px;
}
.tablesIcons {
  position: absolute;
  height: 50px;
  left: 0;
  top: -34px;
}
.tablesIconstwo {
  position: absolute;
  right: 2px;
  top: 1px;
}
.delete {
  color: white;
  width: 100px;
  background: red !important;
}
.red {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: red;
}
.green {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: green;
}
.yellow {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: yellow;
}
.Yellow {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: yellow;
}
.grey {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: darkgray;
}
.blue {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: blue;
}
.padding-right {
  padding-right: 75px;
}
.tableInput {
  height: 60px !important;
  width: 90% !important;
  margin: 0 auto;
}
.turquoise {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: #58b3b8;
}
.lengeds-width {
  width: 162px;
}
canvas {
  /* max-width: 860px;
  max-height: 700px !important; */
}

/* waqas css */

.font-weight-bold1 {
  font-size: 1.2vw;
  margin-right: 10px;
  font-weight: 700 !important;
}
.font-weight-bolder {
  font-size: 1.2vw;
  padding-right: 30px;
  margin-right: 1.6rem;
}
.font-weight-light {
  font-size: 1vw;
}
.heading {
  font-size: 22px;
  display: inline-block;
  font-weight: bold;
}
@media screen and (max-width: 1200px) {
  .font-weight-bolder {
    font-size: 1.2vw;
    margin-right: 1rem;
  }
  h3,
  .h3 {
    font-size: 1.4rem;
  }
}
@media screen and (min-width: 1201px) {
  .font-weight-bolder {
    font-size: 1.2vw;

    margin-right: 2.5rem;
  }
}
@media screen and (min-width: 1501px) {
  .font-weight-bolder {
    font-size: 1.2vw;
    padding-right: 60px;
    margin-right: 2.6rem;
  }
}
</style>
