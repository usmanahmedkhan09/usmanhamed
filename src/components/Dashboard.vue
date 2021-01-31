<template>
  <div style="overflow: hidden">
    <b-row
      align-h="between"
      align-v="center"
      v-if="hasEntityRole && Object.keys(dashboardData).length == 0"
    >
      <b-col cols="12">
        <b-alert
          variant="danger"
          show
          dismissible
          style="height: 63px; font-size: 18px; z-index: 99"
        >
          <span style="display: block; margin-top: 5px">{{
            $t("noReportDashboardError")
          }}</span>
        </b-alert>
      </b-col>
    </b-row>
    <div
      v-if="hasEntityRole && Object.keys(dashboardData).length == 0"
      style="
        background: transparent;
        height: 100vh;
        position: absolute;
        top: 0px;
        width: 98.5%;
        z-index: 9;
        right: 0;
      "
    ></div>
    <!-- ADMIN DASHBOARD -->
    <template v-if="hasAdminRole && !hasCSERole && !hasEntityRole">
      <div class="hello">
        <b-row align-h="between" align-v="center">
          <b-col cols="5">
            <h4 style="font-weight: 600">{{ $t("dashboard") }}</h4>
          </b-col>
        </b-row>
        <b-row class="mt-4" align-v="top">
          <b-col cols="3">
            <div
              class="main-card p-4"
              style="min-height: 120px; max-height: 130px"
            >
              <b-row align-h="between" align-v="center">
                <b-col cols="9">
                  <h4
                    style="
                      color: #027c81;
                      font-size: 24px;
                      font-weight: 600;
                      margin-bottom: 0;
                    "
                  >
                    {{ adminItems.numberOfEntities }}
                  </h4>
                </b-col>
                <b-col cols="3">
                  <img class="w-75" src="/images/icons/goventity.png" alt />
                </b-col>
              </b-row>
              <h4 class="mt-4" style="font-size: 1.2rem">
                عدد الجهات الحكومية
              </h4>
            </div>
          </b-col>
          <b-col cols="3">
            <div
              class="main-card p-4"
              style="min-height: 120px; max-height: 130px"
            >
              <b-row align-h="between" align-v="center">
                <b-col cols="9">
                  <h4
                    style="
                      color: #027c81;
                      font-size: 24px;
                      font-weight: 600;
                      margin-bottom: 0;
                    "
                  >
                    {{ adminItems.numberOfEntityUsers }}
                  </h4>
                </b-col>
                <b-col cols="3">
                  <img class="w-75" src="/images/icons/noofuser.png" alt />
                </b-col>
              </b-row>
              <h4 class="mt-4" style="font-size: 1.2rem">
                عدد مستخدمي الجهات الحكومية
              </h4>
            </div>
          </b-col>
          <b-col cols="3">
            <div
              class="main-card p-4"
              style="min-height: 120px; max-height: 130px"
            >
              <b-row align-h="between" align-v="center">
                <b-col cols="9">
                  <h4
                    style="
                      color: #027c81;
                      font-size: 24px;
                      font-weight: 600;
                      margin-bottom: 0;
                    "
                  >
                    {{ adminItems.numberOfCseUsers }}
                  </h4>
                </b-col>
                <b-col cols="3">
                  <img class="w-75" src="/images/icons/noofcse.png" alt />
                </b-col>
              </b-row>
              <h4 class="mt-4" style="font-size: 1.2rem">
                عدد مستخدمي مركز كفاءة الإنفاق
              </h4>
            </div>
          </b-col>
          <b-col cols="3">
            <div
              class="main-card p-4"
              style="min-height: 120px; max-height: 130px"
            >
              <b-row align-h="between" align-v="center">
                <b-col cols="9">
                  <h4
                    style="
                      color: #027c81;
                      font-size: 24px;
                      font-weight: 600;
                      margin-bottom: 0;
                    "
                  >
                    {{ adminItems.numberOfInitiatives }}
                  </h4>
                </b-col>
                <b-col cols="3">
                  <img class="w-75" src="/images/icons/noofcse.png" alt />
                </b-col>
              </b-row>
              <h4 class="mt-4" style="font-size: 1.2rem">
                إجمالي عدد الفرص
              </h4>
            </div>
          </b-col>
          <b-col cols="3" class="mt-4">
            <div
              class="main-card p-4"
              style="min-height: 120px; max-height: 130px"
            >
              <b-row align-h="between" align-v="center">
                <b-col cols="9">
                  <h4
                    style="
                      color: #027c81;
                      font-size: 24px;
                      font-weight: 600;
                      margin-bottom: 0;
                    "
                  >
                    {{ adminItems.numberOfPendingReports }}
                  </h4>
                </b-col>
                <b-col cols="3">
                  <img class="w-75" src="/images/icons/pendingmonth.png" alt />
                </b-col>
              </b-row>
              <h4 class="mt-4" style="font-size: 1.2rem">
                عدد التقارير الشهرية المعلقة
              </h4>
            </div>
          </b-col>
          <b-col cols="3" class="mt-4">
            <div
              class="main-card p-4"
              style="min-height: 120px; max-height: 130px"
            >
              <b-row align-h="between" align-v="center">
                <b-col cols="9">
                  <h4
                    style="
                      color: #027c81;
                      font-size: 24px;
                      font-weight: 600;
                      margin-bottom: 0;
                    "
                  >
                    {{ adminItems.numberOfSubmittedReports }}
                  </h4>
                </b-col>
                <b-col cols="3">
                  <img
                    class="w-75"
                    src="/images/icons/submittedreport.png"
                    alt
                  />
                </b-col>
              </b-row>
              <h4 class="mt-4" style="font-size: 1.2rem">
                عدد التقارير الشهرية المقدمة
              </h4>
            </div>
          </b-col>
          <b-col cols="3" class="mt-4">
            <div
              class="main-card p-4"
              style="min-height: 120px; max-height: 130px"
            >
              <b-row align-h="between" align-v="center">
                <b-col cols="9">
                  <h4
                    style="
                      color: #027c81;
                      font-size: 24px;
                      font-weight: 600;
                      margin-bottom: 0;
                    "
                  >
                    {{ adminItems.numberOfReviewedReports }}
                  </h4>
                </b-col>
                <b-col cols="3">
                  <img
                    class="w-75"
                    src="/images/icons/reviewedreport.png"
                    alt
                  />
                </b-col>
              </b-row>
              <h4 class="mt-4" style="font-size: 1.2rem">
                عدد التقارير الشهرية المراجعة
              </h4>
            </div>
          </b-col>
          <b-col cols="3" class="mt-4">
            <div
              class="main-card p-4"
              style="min-height: 120px; max-height: 130px"
            >
              <b-row align-h="between" align-v="center">
                <b-col cols="9">
                  <h4
                    style="
                      color: #027c81;
                      font-size: 24px;
                      font-weight: 600;
                      margin-bottom: 0;
                    "
                  >
                    {{ formatAsCurrency(adminItems.totalSavings) }}
                  </h4>
                </b-col>
                <b-col cols="3">
                  <img
                    class="w-75"
                    src="/images/icons/reviewedreport.png"
                    alt
                  />
                </b-col>
              </b-row>
              <h4 class="mt-4" style="font-size: 1.2rem">
                إجمالي الوفر المتوقع من جميع الفرص
              </h4>
            </div>
          </b-col>
        </b-row>

        <h3 class="mt-5 font-weight-bold">نتائج برنامج العناصر الأساسية</h3>

        <b-row class="mt-4 mb-4" align-v="top">
          <b-col cols="3" class="mt-4">
            <div
              class="main-card p-4"
              style="min-height: 120px; max-height: 130px"
            >
              <b-row align-h="between" align-v="center">
                <b-col cols="9">
                  <h4
                    style="
                      color: #027c81;
                      font-size: 24px;
                      font-weight: 600;
                      margin-bottom: 0;
                    "
                  >
                    0
                  </h4>
                </b-col>
                <b-col cols="3">
                  <img class="w-75" src="/images/icons/pendingmonth.png" alt />
                </b-col>
              </b-row>
              <h4 class="mt-4" style="font-size: 1.2rem">
                عدد النتائج المعلقة
              </h4>
            </div>
          </b-col>
          <b-col cols="3" class="mt-4">
            <div
              class="main-card p-4"
              style="min-height: 120px; max-height: 130px"
            >
              <b-row align-h="between" align-v="center">
                <b-col cols="9">
                  <h4
                    style="
                      color: #027c81;
                      font-size: 24px;
                      font-weight: 600;
                      margin-bottom: 0;
                    "
                  >
                    0
                  </h4>
                </b-col>
                <b-col cols="3">
                  <img
                    class="w-75"
                    src="/images/icons/submittedreport.png"
                    alt
                  />
                </b-col>
              </b-row>
              <h4 class="mt-4" style="font-size: 1.2rem">
                عدد النتائج المقدمة
              </h4>
            </div>
          </b-col>
          <b-col cols="3" class="mt-4">
            <div
              class="main-card p-4"
              style="min-height: 120px; max-height: 130px"
            >
              <b-row align-h="between" align-v="center">
                <b-col cols="9">
                  <h4
                    style="
                      color: #027c81;
                      font-size: 24px;
                      font-weight: 600;
                      margin-bottom: 0;
                    "
                  >
                    0
                  </h4>
                </b-col>
                <b-col cols="3">
                  <img
                    class="w-75"
                    src="/images/icons/reviewedreport.png"
                    alt
                  />
                </b-col>
              </b-row>
              <h4 class="mt-4" style="font-size: 1.2rem">
                عدد النتائج التي تم مراجعتها
              </h4>
            </div>
          </b-col>
        </b-row>
      </div>
    </template>

    <!-- CSE DASHBOARD -->
    <template v-if="hasCSERole">
      <div class="hello">
        <b-row align-h="between" align-v="center">
          <b-col cols="6">
            <h4 style="font-weight: 600">
              الصفحة الرئيسية / لوحة الأداء الرئيسية / المستوى التنفيذي
            </h4>
          </b-col>
          <!-- <b-col cols="2" style="    margin-right: 10px;">
            <md-field>
              <label for="type">{{$t('governmentEntity')}}</label>

              <md-select
                name="type"
                id="type"
                v-model="tenant_id"
                md-dense
                :disabled="sending || isUpdate"
                @md-selected="getCSEDashboard()"
              >
                <md-option :value="null">{{$t('selectGovernmentEntity')}}</md-option>
                <md-option :value="item.id" v-for="(item, index) in allEntities">{{ item.name }}</md-option>
              </md-select>
            </md-field>
          </b-col>-->
          <b-col cols="4">
            <b-row align-h="between" align-v="center">
              <b-col cols="6">
                <h5 class="top-line-text green">{{ $t("advanced") }}</h5>
              </b-col>
              <b-col cols="6">
                <h5 class="top-line-text yellow">{{ $t("mediumAverage") }}</h5>
              </b-col>
              <b-col cols="6">
                <h5 class="top-line-text cyan">{{ $t("lowAverage") }}</h5>
              </b-col>
              <b-col cols="6">
                <h5 class="top-line-text grey">{{ $t("beginer") }}</h5>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row align-h="start" align-v="center">
          <b-col cols="2">
            <md-field>
              <label for="type">الفئة</label>

              <md-select
                name="type"
                id="type"
                v-model="typeid"
                multiple
                md-dense
                :disabled="sending || isUpdate"
                @md-selected="
                  CSEDashboard(
                    (payload = {
                      tenant_id: null,
                      entitySector: entitySector,
                      typeid: typeid,
                      year: false,
                    }),
                    false
                  )
                "
              >
                <md-option
                  v-for="item in entites"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.typeName }}
                </md-option>
              </md-select>
            </md-field>
          </b-col>
          <b-col cols="2">
            <md-field>
              <label for="type">القطاع </label>

              <md-select
                name="type"
                id="type"
                v-model="entitySector"
                md-dense
                multiple
                @md-selected="
                  CSEDashboard(
                    (payload = {
                      tenant_id: null,
                      entitySector: entitySector,
                      typeid: typeid,
                      year: false,
                    }),
                    false
                  )
                "
              >
                <md-option
                  v-for="(item, index) in UserSectors"
                  :key="`sector${index}`"
                  :value="item.id"
                >
                  {{ item.sectorName }}
                </md-option>
              </md-select>
            </md-field>
          </b-col>
          <b-col cols="4">
            <md-field>
              <label for="type">الجهة الحكوميّة </label>

              <md-select
                name="type"
                id="type"
                v-model="tenant_id"
                md-dense
                @md-selected="
                  CSEDashboard(
                    (payload = {
                      tenant_id: tenant_id,
                      entitySector: entitySector,
                      typeid: typeid,
                      year: false,
                    }),
                    false
                  )
                "
              >
                <md-option
                  v-for="(item, index) in tenantNames"
                  :key="index"
                  :value="item.id"
                  >{{ item.name }}</md-option
                >
              </md-select>
            </md-field>
          </b-col>
        </b-row>

        <b-row class="mt-2" align-h="between" align-v="top">
          <b-col cols="5" class="starTextDiv">
            <div
              class="main-card p-4 mt-4"
              style="height: 592px; min-height: 592px"
            >
              <div
                class="main-card px-4 py-3 m-lg-3 m-xl-2  mt-4 starDiv"
                v-bind:style="{
                  borderRight: `38px solid ${getValues(SectionA)}`,
                }"
              >
                <div style="display: table-cell; position: relative">
                  <span>1</span>
                  <img src="/images/icons/numberstar.png" alt />
                </div>
                <h4 class="pt-3 pr-2 starText">
                  {{ $t("selfAssessment") }}
                </h4>
              </div>
              <div
                class="main-card px-4 py-3 m-lg-3 m-xl-2  mt-4 starDiv"
                v-bind:style="{
                  borderRight: `38px solid ${getValues(SectionB)}`,
                }"
              >
                <div style="display: table-cell; position: relative">
                  <span>2</span>
                  <img src="/images/icons/numberstar.png" alt />
                </div>
                <h4 class="pt-3 pr-2 ">
                  <!-- {{ $t("totalSavings") }} -->
                  استكمال التعبئة
                </h4>
              </div>
              <div
                class="main-card px-4 py-3 m-lg-3 m-xl-2  mt-4 starDiv"
                v-bind:style="{
                  borderRight: `38px solid ${getValues(SectionC)}`,
                }"
              >
                <div style="display: table-cell; position: relative">
                  <span>3</span>
                  <img src="/images/icons/numberstar.png" alt />
                </div>
                <h4 class="pt-3 pr-2 ">
                  {{ $t("commitment") }}
                </h4>
              </div>
              <div
                class="main-card px-4 py-3 m-lg-3 m-xl-2  mt-4 starDiv"
                v-bind:style="{
                  borderRight: `38px solid ${getValues(SectionD)}`,
                }"
              >
                <div style="display: table-cell; position: relative">
                  <span>4</span>
                  <img src="/images/icons/numberstar.png" alt />
                </div>
                <h4 class="pt-3 pr-2 ">
                  {{ $t("requirementsFulfillment") }}
                </h4>
              </div>
              <div
                class="main-card px-4 py-3 m-lg-3 m-xl-2  mt-4 starDiv"
                v-bind:style="{
                  borderRight: `38px solid ${getValues(SectionE)}`,
                }"
              >
                <div style="display: table-cell; position: relative">
                  <span>5</span>
                  <img src="/images/icons/numberstar.png" alt />
                </div>
                <h4 class="pt-3 pr-2 ">
                  {{ $t("execution") }}
                </h4>
              </div>
              <!-- <div
                class="main-card px-4 py-3 m-3 mt-2"
                v-bind:style="{
                  borderRight: `38px solid ${getColor(
                    dashboardData.requirementNotes
                  )}`,
                }"
              >
                <div style="display: inline-block; position: relative">
                  <span
                    style="
                      position: absolute;
                      color: white;
                      font-size: 20px;
                      top: 51%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                    "
                    >6</span
                  >
                  <img src="/images/icons/numberstar.png" alt />
                </div>
                <h4
                  class="m-0 m-3"
                  style="
                    font-weight: 600;
                    display: inline-block;
                    vertical-align: top;
                    font-size: 1.1rem;
                  "
                >
                  برنامج ركائر استدامة كفاءة الإنفاق
                </h4>
              </div> -->
            </div>
          </b-col>
          <b-col cols="7">
            <!-- <md-card
              class="main-card mt-4"
              style="height: 696px; min-height: 696px"
            >
              <md-card-header class="text-center">
                <h3 class="font-weight-bold">الأداء العام</h3>
              </md-card-header>

              <md-card-content>
                <div class="radarChart">
                  <canvas id="myChart" height="521"></canvas>
                </div>
              </md-card-content>
            </md-card> -->
            <div
              class="main-card p-4 mt-4"
              style="height: 592px; min-height: 592px"
            >
              <h4
                class="m-0 mb-2 mt-2"
                style="
                  font-weight: 600;
                  text-align: center;
                  display: block;
                  vertical-align: top;
                  font-size: 1.7rem;
                "
              >
                الأداء العام
              </h4>

              <div class="radarChart" style="height: ">
                <canvas id="RadarChart" height="521"></canvas>
              </div>
            </div>
          </b-col>
        </b-row>

        <b-row align-h="between" align-v="top">
          <b-col cols="7">
            <div class="main-card p-4 mt-4" style="height: 482px">
              <h4>الوفورات</h4>

              <b-row align-h="between" align-v="top">
                <b-col cols="6">
                  <div class="main-card p-4 m-3 mt-2">
                    <b-row align-h="between" align-v="center">
                      <b-col cols="3">
                        <div
                          style="display: inline-block; position: relative; top : -25px"
                        >
                          <img src="/images/icons/savingIcon1.png" alt />
                        </div>
                      </b-col>
                      <b-col cols="9">
                        <h4
                          class="m-0 text-align-saving float-right"
                          style="
                            display: block;
                            vertical-align: top;
                            font-size: 24px;
                            font-weight: 600;
                          "
                        >
                          {{ entityPercentage }}%
                        </h4>
                        <h4 class="m-0 savingPrcntText">
                          {{ $t("averageRatioOfSavings") }}
                        </h4>
                      </b-col>
                    </b-row>
                  </div>
                </b-col>
                <b-col cols="6">
                  <div
                    class="main-card p-4 m-3 mt-2"
                    style="min-height : 128px"
                  >
                    <b-row align-h="between" align-v="center">
                      <b-col cols="3">
                        <div
                          style="display: inline-block; position: relative;  top : -8px"
                        >
                          <img src="/images/icons/savingIcon2.png" alt />
                        </div>
                      </b-col>
                      <b-col cols="9">
                        <div
                          class="m-0 text-align-saving float-right"
                          style="
                            
                            font-size: 24px;
                            font-weight: 600;
                          "
                        >
                          {{ numberofInitiatives }}
                        </div>
                        <h4 class="m-0 savingPrcntText">
                          {{ $t("numberOfOpportunityIdentified") }}
                        </h4>
                      </b-col>
                    </b-row>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12">
                  <div class="barChart">
                    <canvas id="barchart" height="240"></canvas>
                  </div>
                  <!-- <bar-chart
                    :chartData="dataBarset"
                    :bind="true"
                    :width="300"
                    :height="300"
                  ></bar-chart> -->
                </b-col>
              </b-row>
            </div>
          </b-col>
          <b-col cols="5">
            <div
              class="main-card p-4 mt-4 min-height"
              style="height : 95% !important"
            >
              <!-- <h4>General evaluation of the government agency</h4>-->
              <h4>برنامج العناصر الأساسية</h4>
              <!-- GRAPHHHHH -->
              <!-- <round-graph></round-graph> -->
              <div class="BasicElmPrgmImages">
                <div
                  class="single-chart"
                  style="top: 0; left: 0; display: flex"
                >
                  <img
                    class="chart-img"
                    src="/images/charts/Graph_Assets/grey/14@1x.png"
                  />
                  <img
                    class="chart-img"
                    src="/images/charts/Graph_Assets/grey/15@1x.png"
                  />
                </div>
                <div
                  class="single-chart"
                  style="top: 0; right: 0; display: flex"
                >
                  <img
                    class="chart-img"
                    src="/images/charts/Graph_Assets/grey/1@1x.png"
                  />
                  <img
                    class="chart-img"
                    src="/images/charts/Graph_Assets/grey/2@1x.png"
                  />
                  <img
                    class="chart-img"
                    src="/images/charts/Graph_Assets/grey/3@1x.png"
                  />
                  <img
                    class="chart-img"
                    src="/images/charts/Graph_Assets/grey/4@1x.png"
                  />
                  <img
                    class="chart-img"
                    src="/images/charts/Graph_Assets/grey/5@1x.png"
                  />
                </div>
              </div>
              <div class="BasicElmPrgmImages">
                <div
                  class="single-chart"
                  style="bottom: 0; right: 0; display: flex"
                >
                  <img
                    class="chart-img"
                    src="/images/charts/Graph_Assets/grey/10@1x.png"
                  />
                  <img
                    class="chart-img"
                    src="/images/charts/Graph_Assets/grey/11@1x.png"
                  />
                  <img
                    class="chart-img"
                    src="/images/charts/Graph_Assets/grey/12@1x.png"
                  />
                  <img
                    class="chart-img"
                    src="/images/charts/Graph_Assets/grey/13@1x.png"
                  />
                </div>
                <div
                  class="single-chart"
                  style="bottom: 0; left: 0; display: flex"
                >
                  <img
                    class="chart-img"
                    src="/images/charts/Graph_Assets/grey/6@1x.png"
                  />
                  <img
                    class="chart-img"
                    src="/images/charts/Graph_Assets/grey/7@1x.png"
                  />
                  <img
                    class="chart-img"
                    src="/images/charts/Graph_Assets/grey/8@1x.png"
                  />
                  <img
                    class="chart-img"
                    src="/images/charts/Graph_Assets/grey/9@1x.png"
                  />
                </div>
              </div>
            </div>
          </b-col>
        </b-row>

        <b-row align-h="between" align-v="top" class="mb-5">
          <b-col cols="6">
            <div class="main-card p-4 mt-4">
              <b-row align-h="between" align-v="top" style="height: 100px;">
                <b-col cols="4">
                  <!--<h4 style="font-size: 20px;">Monthly Reports</h4>-->
                  <h4 style="font-size: 20px">
                    نظرة عامة عن تسليم ومراجعة التقارير الشهرية
                  </h4>
                </b-col>
                <b-col cols="4">
                  <md-field>
                    <label for="year">{{ $t("year") }}</label>

                    <md-select
                      name="year"
                      id="year"
                      v-model="monthlyReportYear"
                      md-dense
                      :disabled="sending || isUpdate"
                    >
                      <md-option :value="null">{{ $t("year") }}</md-option>
                      <md-option
                        v-for="(year, index) in [
                          '2019',
                          '2020',
                          '2021',
                          '2022',
                          '2023',
                        ]"
                        :value="year"
                        :key="index"
                      >
                        {{ year }}
                      </md-option>
                    </md-select>
                  </md-field>
                </b-col>
                <b-col cols="4">
                  <md-field>
                    <label for="month">{{ $t("month") }}</label>

                    <md-select
                      name="month"
                      id="month"
                      v-model="monthlyReportMonth"
                      md-dense
                      :disabled="sending || isUpdate"
                      @md-selected="
                        CSEDashboard(
                          (payload = {
                            tenant_id: tenant_id,
                            month: monthlyReportMonth,
                            entitySector: entitySector,
                            typeid: typeid,
                            year: true,
                          }),
                          false
                        )
                      "
                    >
                      <md-option :value="null">{{ $t("month") }}</md-option>
                      <md-option value="january">يناير</md-option>
                      <md-option value="february">فبراير</md-option>
                      <md-option value="march">مارس</md-option>
                      <md-option value="april">أبريل</md-option>
                      <md-option value="may">مايو</md-option>
                      <md-option value="june">يونيو</md-option>
                      <md-option value="july">يوليو</md-option>
                      <md-option value="august">أغسطس</md-option>
                      <md-option value="september">سبتمبر</md-option>
                      <md-option value="october">أكتوبر</md-option>
                      <md-option value="november">نوفمبر</md-option>
                      <md-option value="december">ديسمبر</md-option>
                    </md-select>
                  </md-field>
                </b-col>
              </b-row>

              <b-row
                class="mt-3"
                align-h="between"
                align-v="top"
                v-if="checkVar"
              >
                <b-col cols="6">
                  <!-- GRAPHHHHH -->
                  <!--<highcharts :options="donut1ChartOptions"/></highcharts>-->
                  <!-- <canvas id="doughnut"></canvas> -->
                  <!-- <Doughnut :data="doughnutDataset"></Doughnut> -->
                  <div style="width:220px;margin: 0 auto;">
                    <doughnut-chart
                      :chartData="dataDoughnutset1"
                      :width="220"
                      :height="220"
                      :bind="true"
                    ></doughnut-chart>
                  </div>
                </b-col>
                <b-col cols="6">
                  <!-- GRAPHHHHH -->
                  <!--<highcharts :options="donut2ChartOptions"/></highcharts>-->
                  <!-- <span>usman ahmed</span> -->
                  <!-- <Doughnut :data="doughnutDataset2"></Doughnut> -->
                  <div style="width:220px;margin: 0 auto;">
                    <Doughnut-chart
                      :chartData="dataDoughnutset2"
                      :width="220"
                      :height="220"
                      :bind="true"
                    ></Doughnut-chart>
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-col>
          <b-col cols="6">
            <div class="main-card p-4 mt-4">
              <b-row align-h="between" align-v="top" style="height: 100px;">
                <b-col cols="4">
                  <!--<h4 style="font-size: 20px;">Entity Self Evaluation</h4>-->
                  <h4 style="font-size: 20px">
                    نظرة عامة عن تسليم ومراجعة برنامج ركائر استدامة كفاءة
                    الإنفاق
                  </h4>
                </b-col>
                <b-col cols="4">
                  <md-field>
                    <label for="year">{{ $t("year") }}</label>

                    <md-select
                      name="year"
                      id="year"
                      v-model="evaluationYear"
                      md-dense
                      :disabled="sending || isUpdate"
                    >
                      <md-option :value="null">{{ $t("year") }}</md-option>
                      <md-option value="2020">2020</md-option>
                    </md-select>
                  </md-field>
                </b-col>
                <b-col cols="4">
                  <md-field>
                    <label for="month">{{ $t("month") }}</label>

                    <md-select
                      name="month"
                      id="month"
                      v-model="evaluationMonth"
                      md-dense
                      :disabled="sending || isUpdate"
                    >
                      <md-option :value="null">{{ $t("month") }}</md-option>
                      <md-option value="january">يناير</md-option>
                      <md-option value="february">فبراير</md-option>
                      <md-option value="march">مارس</md-option>
                      <md-option value="april">أبريل</md-option>
                      <md-option value="may">مايو</md-option>
                      <md-option value="june">يونيو</md-option>
                      <md-option value="july">يوليو</md-option>
                      <md-option value="august">أغسطس</md-option>
                      <md-option value="september">سبتمبر</md-option>
                      <md-option value="october">أكتوبر</md-option>
                      <md-option value="november">نوفمبر</md-option>
                      <md-option value="december">ديسمبر</md-option>
                    </md-select>
                  </md-field>
                </b-col>
              </b-row>

              <b-row
                class="mt-3"
                align-h="between"
                align-v="top"
                v-if="checkVar"
              >
                <b-col cols="6">
                  <!-- GRAPHHHHH -->
                  <!--<highcharts :options="donut3ChartOptions"/></highcharts>-->
                  <div style="width:220px;margin: 0 auto;">
                    <Doughnut-chart
                      :chartData="dataDoughnutset1"
                      :width="220"
                      :height="220"
                      :bind="true"
                    ></Doughnut-chart>
                  </div>
                </b-col>
                <b-col cols="6">
                  <!-- GRAPHHHHH -->
                  <!--<highcharts :options="donut4ChartOptions"/></highcharts>-->
                  <div style="width:220px;margin: 0 auto;">
                    <Doughnut-chart
                      :chartData="dataDoughnutset2"
                      :width="220"
                      :height="220"
                      :bind="true"
                    ></Doughnut-chart>
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-col>
        </b-row>

        <!-- <div class="main-card p-4 mt-4 mb-5">
          <b-row align-h="between" align-v="top">
            <b-col cols="10">
              <h4>نسبة الإنجاز في تنفيذ المبادرات</h4>
            </b-col>
            <b-col cols="2">
              <b-row align-h="between" align-v="center">
                <b-col cols="12">
                  <h5 class="top-line-text bluee">
                    {{ $t("plannedDelivery") }}
                  </h5>
                </b-col>
                <b-col cols="12" class="mt-1">
                  <h5 class="top-line-text green">
                    {{ $t("achievedDelivery") }}
                  </h5>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row align-h="between" align-v="top">
            <b-col cols="4">
              <md-field>
                <label for="type">{{ $t("initiativeName") }}</label>

                <md-select
                  name="type"
                  id="type"
                  v-model="initiativeType"
                  md-dense
                  :disabled="sending || isUpdate"
                >
                  <md-option :value="null"
                    >Choose a specific Initiative</md-option
                  >
                  <md-option
                    :value="item.name"
                    v-for="(item, index) in dashboardData.initiatives"
                    :key="index"
                    >{{ item.name }}</md-option
                  >
                </md-select>
              </md-field>
            </b-col>
          </b-row>

          <div style="height: 300px">
            <line-chart
              :chartData="dataLineset"
              :bind="true"
              :width="300"
              :height="300"
            ></line-chart>
          </div>
        </div> -->
      </div>
    </template>

    <!-- ENTITY DASHBOARD -->
    <template v-if="hasEntityRole">
      <div class="hello">
        <b-row align-h="between" align-v="center">
          <b-col cols="6">
            <h4 style="font-weight: 600">{{ $t("entityDashboardHeader") }}</h4>
          </b-col>
          <b-col cols="6">
            <b-row align-h="between" align-v="center">
              <b-col cols="3">
                <h5 class="top-line-text green">{{ $t("advanced") }}</h5>
              </b-col>
              <b-col cols="3">
                <h5 class="top-line-text yellow">{{ $t("mediumAverage") }}</h5>
              </b-col>
              <b-col cols="3">
                <h5 class="top-line-text cyan">{{ $t("lowAverage") }}</h5>
              </b-col>
              <b-col cols="3">
                <h5 class="top-line-text grey">{{ $t("beginer") }}</h5>
              </b-col>
            </b-row>
          </b-col>
        </b-row>

        <b-row class="mt-4 " align-h="between" align-v="top">
          <b-col cols="5" class="starTextDiv">
            <div
              class="main-card p-4 mt-4"
              style="height: 592px; min-height: 592px"
            >
              <!-- <h4>Total Expected Saving</h4> -->

              <div
                class="main-card px-4 py-3 m-lg-3 m-xl-2  mt-4 starDiv"
                v-bind:style="{
                  borderRight: `38px solid ${getValues(SectionA)}`,
                }"
              >
                <div style="display: table-cell; position: relative">
                  <span>1</span>
                  <img src="/images/icons/numberstar.png" alt />
                </div>
                <h4 class="pt-3 pr-2 starText">
                  {{ $t("selfAssessment") }}
                </h4>
              </div>
              <div
                class="main-card px-4 py-3 m-lg-3 m-xl-2  mt-4 starDiv"
                v-bind:style="{
                  borderRight: `38px solid ${getValues(SectionB)}`,
                }"
              >
                <div style="display: table-cell; position: relative">
                  <span>2</span>
                  <img src="/images/icons/numberstar.png" alt />
                </div>
                <h4 class="pt-3 pr-2 ">
                  <!-- {{ $t("totalSavings") }} -->
                  استكمال التعبئة
                </h4>
              </div>
              <div
                class="main-card px-4 py-3 m-lg-3 m-xl-2  mt-4 starDiv"
                v-bind:style="{
                  borderRight: `38px solid ${getValues(SectionC)}`,
                }"
              >
                <div style="display: table-cell; position: relative">
                  <span>3</span>
                  <img src="/images/icons/numberstar.png" alt />
                </div>
                <h4 class="pt-3 pr-2">
                  {{ $t("commitment") }}
                </h4>
              </div>
              <div
                class="main-card px-4 py-3 m-lg-3 m-xl-2  mt-4 starDiv"
                v-bind:style="{
                  borderRight: `38px solid ${getValues(SectionD)}`,
                }"
              >
                <div style="display: table-cell; position: relative">
                  <span>4</span>
                  <img src="/images/icons/numberstar.png" alt />
                </div>
                <h4 class="pt-3 pr-2">
                  {{ $t("requirementsFulfillment") }}
                </h4>
              </div>
              <div
                class="main-card px-4 py-3 m-lg-3 m-xl-2  mt-4 starDiv"
                v-bind:style="{
                  borderRight: `38px solid ${getValues(SectionE)}`,
                }"
              >
                <div style="display: table-cell; position: relative">
                  <span>5</span>
                  <img src="/images/icons/numberstar.png" alt />
                </div>
                <h4 class="pt-3 pr-2">
                  {{ $t("execution") }}
                </h4>
              </div>
              <!-- <div
                class="main-card px-4 py-3 m-3 mt-2"
                v-bind:style="{
                  borderRight: `38px solid ${getColor(
                    dashboardData.requirementNotes
                  )}`,
                }"
              >
                <div style="display: inline-block; position: relative">
                  <span
                    style="
                      position: absolute;
                      color: white;
                      font-size: 20px;
                      top: 51%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                    "
                    >6</span
                  >
                  <img src="/images/icons/numberstar.png" alt />
                </div>
                <h4
                  class="m-0 m-3"
                  style="
                    font-weight: 600;
                    display: inline-block;
                    vertical-align: top;
                    font-size: 1.1rem;
                  "
                >
                  برنامج ركائز استدامة كفاءة الإنفاق
                </h4>
              </div> -->
            </div>
          </b-col>
          <b-col cols="7">
            <div
              class="main-card p-4 mt-4"
              style="height: 592px; min-height: 592px"
            >
              <!-- <h4>Overall Performance for 'Entity-Name'</h4> -->
              <h4
                class="m-0 mb-2 mt-2"
                style="
                  font-weight: 600;
                  text-align: center;
                  display: block;
                  vertical-align: top;
                  font-size: 1.7rem;
                "
              >
                الأداء العام
              </h4>

              <!--  -->

              <!-- CHART WILL COME HERE -->
              <!--<highcharts style="padding: 48px 0px;" :options="spiderchartOptionsEntity"></highcharts>-->
              <div class="radarChart" style="position:relative;margin: auto;">
                <canvas id="RadarChart" height="521"></canvas>
              </div>
              <!-- <radar-chart
                v-if="dashboardData && Object.keys(dashboardData).length > 0"
                :chartData="dataSpiderset"
                :bind="true"
                :width="400"
                :height="400"
              ></radar-chart> -->
              <!--  -->
            </div>
          </b-col>
        </b-row>

        <b-row align-h="between" align-v="top">
          <b-col cols="7">
            <div class="main-card p-4 mt-4" style="height: 482px">
              <h4>{{ $t("extentOfOpportunities") }}</h4>

              <b-row align-h="between" align-v="top">
                <b-col cols="6">
                  <div class="main-card p-4 m-3 mt-2">
                    <b-row align-h="between" align-v="center">
                      <b-col cols="3">
                        <div
                          style="display: inline-block; position: relative; top : -25px"
                        >
                          <img src="/images/icons/savingIcon1.png" alt />
                        </div>
                      </b-col>
                      <b-col cols="9">
                        <h4
                          class="m-0 float-right"
                          style="
                            display: block;
                            vertical-align: top;
                            font-size: 24px;
                            font-weight: 600;
                          "
                        >
                          {{ entityPercentage }}%
                        </h4>
                        <h4 class="m-0 savingPrcntText">
                          {{ $t("averageRatioOfSavings") }}
                        </h4>
                      </b-col>
                    </b-row>
                  </div>
                </b-col>
                <b-col cols="6">
                  <div
                    class="main-card p-4 m-3 mt-2"
                    style="min-height : 128px"
                  >
                    <b-row align-h="between" align-v="center">
                      <b-col cols="3">
                        <div
                          style="display: inline-block; position: relative; top : -8px"
                        >
                          <img src="/images/icons/savingIcon2.png" alt />
                        </div>
                      </b-col>
                      <b-col cols="9">
                        <div
                          class="m-0 float-right"
                          style="
                            font-size: 24px;
                            font-weight: 600;
                          "
                        >
                          {{ numberofInitiatives }}
                        </div>
                        <h4 class="m-0 savingPrcntText">
                          {{ $t("numberOfOpportunityIdentified") }}
                        </h4>
                      </b-col>
                    </b-row>
                  </div>
                  <!-- GRAPHHHHH -->
                  <!--<highcharts :options="columnOptions"></highcharts>-->
                  <!-- <canvas id="barChart" :width="300" :height="300"></canvas> -->
                  <!-- <bar-chart
                    :chartData="dataBarset"
                    :bind="true"
                    :width="300"
                    :height="300"
                  ></bar-chart> -->
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12">
                  <div>
                    <canvas id="barchart" height="240" class=""></canvas>
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-col>
          <b-col cols="5">
            <div
              class="main-card p-4 mt-4 min-height"
              style="height : 95% !important"
            >
              <!--<h4>General evaluation of the government agency</h4>-->
              <h4>برنامج العناصر الأساسية</h4>
              <!-- GRAPHHHHH -->
              <!-- <round-graph></round-graph> -->
              <div class="BasicElmPrgmImages">
                <div
                  class="single-chart"
                  style="top: 0; left: 0; display: flex"
                >
                  <img
                    class="chart-img"
                    src="/images/charts/Graph_Assets/grey/14@1x.png"
                  />
                  <img
                    class="chart-img"
                    src="/images/charts/Graph_Assets/grey/15@1x.png"
                  />
                </div>

                <div
                  class="single-chart"
                  style="top: 0; right: 0; display: flex"
                >
                  <img
                    class="chart-img"
                    src="/images/charts/Graph_Assets/grey/1@1x.png"
                  />
                  <img
                    class="chart-img"
                    src="/images/charts/Graph_Assets/grey/2@1x.png"
                  />
                  <img
                    class="chart-img"
                    src="/images/charts/Graph_Assets/grey/3@1x.png"
                  />
                  <img
                    class="chart-img"
                    src="/images/charts/Graph_Assets/grey/4@1x.png"
                  />
                  <img
                    class="chart-img"
                    src="/images/charts/Graph_Assets/grey/5@1x.png"
                  />
                </div>
              </div>
              <div class="BasicElmPrgmImages">
                <div
                  class="single-chart"
                  style="bottom: 0; right: 0; display: flex"
                >
                  <img
                    class="chart-img"
                    src="/images/charts/Graph_Assets/grey/10@1x.png"
                  />
                  <img
                    class="chart-img"
                    src="/images/charts/Graph_Assets/grey/11@1x.png"
                  />
                  <img
                    class="chart-img"
                    src="/images/charts/Graph_Assets/grey/12@1x.png"
                  />
                  <img
                    class="chart-img"
                    src="/images/charts/Graph_Assets/grey/13@1x.png"
                  />
                </div>
                <div
                  class="single-chart"
                  style="bottom: 0; left: 0; display: flex"
                >
                  <img
                    class="chart-img"
                    src="/images/charts/Graph_Assets/grey/6@1x.png"
                  />
                  <img
                    class="chart-img"
                    src="/images/charts/Graph_Assets/grey/7@1x.png"
                  />
                  <img
                    class="chart-img"
                    src="/images/charts/Graph_Assets/grey/8@1x.png"
                  />
                  <img
                    class="chart-img"
                    src="/images/charts/Graph_Assets/grey/9@1x.png"
                  />
                </div>
              </div>
            </div>
          </b-col>
        </b-row>

        <div class="main-card p-4 mt-4 mb-5">
          <b-row align-h="between" align-v="center">
            <b-col md="2">
              <h4 class="d-inline">{{ $t("monthlyReports") }}</h4>
            </b-col>
            <b-col md="3" offset="7">
              <md-field class="w-75">
                <label class="font-weight-bold">اختيار السنة</label>
                <md-select
                  v-model="monthlyReportYear"
                  @md-selected="openYearlyreports(monthlyReportYear)"
                >
                  <md-option value="2019">2019</md-option>
                  <md-option value="2020">2020</md-option>
                  <md-option value="2021">2021</md-option>
                  <md-option value="2022">2022</md-option>
                  <md-option value="2023">2023</md-option>
                </md-select>
              </md-field>
            </b-col>
            <!-- <b-col cols="1">
              <h4 style="color: #1cb2b8">
                {{ this.dashboardData ? this.dashboardData.year : "" }}
              </h4>
            </b-col> -->
          </b-row>

          <div class="mt-4" style="position: relative">
            <!-- <img
              src="/images/icons/arrow.png"
              style="
                position: absolute;
                position: absolute;
                right: -7px;
                top: 25px;
                width: 12px;
              "
              alt
            /> -->
            <!-- <img
              src="/images/icons/arrow.png"
              style="
                position: absolute;
                left: -7px;
                top: 25px;
                width: 12px;
                transform: rotate(180deg);
              "
              alt
            /> -->
            <div
              style="
                position: absolute;
                top: 50%;
                transform: translate(0, -50%);
                left: 3%;
                right: 3%;
              "
            >
              <img style="width: 100%" src="/images/icons/line.png" alt />
            </div>
            <b-row align-v="center" class="px-4">
              <b-col
                cols="1"
                class="text-center"
                v-for="item in monthlyReport"
                :key="item.month"
              >
                <img
                  v-if="item.isSubmitted == true"
                  src="/images/icons/tickstar.png"
                  alt
                />
                <img
                  v-else-if="item.isSubmitted == false"
                  src="/images/icons/crossstar.png"
                  alt
                />
                <img v-else src="/images/icons/default_report.png" alt />
                <h5>{{ item.month }}</h5>
              </b-col>
            </b-row>
          </div>
        </div>

        <!-- <div class="main-card p-4 mt-4 mb-5">
          <b-row align-h="between" align-v="top">
            <b-col cols="10">
              <h4>نسبة الإنجاز في تنفيذ المبادرات</h4>
            </b-col>
            <b-col cols="2">
              <b-row align-h="between" align-v="center">
                <b-col cols="12">
                  <h5 class="top-line-text bluee">
                    {{ $t("plannedDelivery") }}
                  </h5>
                </b-col>
                <b-col cols="12" class="mt-1">
                  <h5 class="top-line-text green">
                    {{ $t("achievedDelivery") }}
                  </h5>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row align-h="between" align-v="top">
            <b-col cols="4">
              <md-field>
                <label for="type">{{ $t("initiativeName") }}</label>

                <md-select
                  v-if="dashboardData.initiatives"
                  name="type"
                  id="type"
                  v-model="initiativeType"
                  md-dense
                  :disabled="sending || isUpdate"
                >
                  <md-option :value="null"
                    >Choose a specific Initiative</md-option
                  >
                  <md-option
                    :value="item.name"
                    v-for="(item, index) in dashboardData.initiatives"
                    :key="index"
                    >{{ item.name }}</md-option
                  >
                </md-select>
              </md-field>
            </b-col>
          </b-row>

          <div style="height: 300px">
            <line-chart
              :chartData="dataLineset"
              :bind="true"
              :width="300"
              :height="300"
            ></line-chart>
          </div>
        </div> -->
      </div>
    </template>
  </div>
</template>

<script>
import RoundGraph from "./RoundGraph";
import rolesMixin from "../mixins/RolesMixins.js";
import RadarChart from "./Charts/RadarChart.js";
import LineChart from "./Charts/LineChart.js";
import BarChart from "./Charts/BarChart.js";
import DoughnutChart from "./Charts/DoughnutChart.js";

export default {
  name: "Dashboard",
  mixins: [rolesMixin],
  components: {
    RoundGraph,
    RadarChart,
    LineChart,
    DoughnutChart,
    BarChart,
  },
  data() {
    return {
      myRadarChart: null,
      _myChart: null,
      entites: [],
      typeid: [],
      firstCall: true,
      entitySector: [],
      doughnutDataset2: [],
      doughnutDataset: [],
      checkVar: false,
      approvedPercentage: null,
      submitterpercentage: null,
      radarDataset: [],
      dataset: [],
      numberofInitiatives: 0,
      entityPercentage: 0.0,
      firstSection: null,
      SectionA: null,
      SectionB: null,
      SectionC: null,
      SectionD: null,
      SectionE: null,
      UserSectors: [],
      tenantNames: [],
      sectorEntity: "all",
      categoryEntity: "all",
      dataSpiderset: {
        // labels: [
        //   "برنامج العناصر الاساسية",
        //   "الالتزام",
        //   "إجمالي الوفورات",
        //   "استكمال المتطلبات",
        //   "التنفيذ"
        // ],
        labels: [
          "برنامج ركائز استدامة كفاءة الإنفاق",
          "الالتزام",
          "استكمال التعبئة",
          "وضوح الفرصة وآلية احتسابها",
          "حجم الفرص",
          "التنفيذ وسرعة الإنجاز",
        ],

        datasets: [
          {
            data: [20, 10, 4, 72, 92],
          },
        ],
      },
      dataDoughnutset1: {
        labels: ["لم يتم التسليم", "تم التسليم"],
        datasets: [
          {
            data: null,
            percentageInnerCutout: 70,
            backgroundColor: ["rgba(85, 170, 228, 1)", "rgba(59, 117, 190, 1)"],
            borderColor: ["#E9DAC6", "#CBCBCB"],
            borderWidth: [1, 1, 1, 1, 1],
          },
        ],
        text: "200",
      },
      dataDoughnutset2: {
        labels: ["قيد المراجعة", "تمت مراجعتها"],
        datasets: [
          {
            label: "TeamB Score",
            data: null,
            backgroundColor: ["rgba(85, 170, 228, 1)", "rgba(59, 117, 190, 1)"],
            borderColor: ["#E9DAC6", "#CBCBCB"],
            borderWidth: [1, 1, 1, 1, 1],
          },
        ],
      },
      dataLineset: {
        labels: ["الربع الأول", "الربع الثاني", "الربع الثالث", "الربع الرابع"],
        datasets: [
          {
            label: ["الإنجاز المخطط"], // Name the series
            data: [0, 30, 40, 100, 20, 20, 30, 40, 80, 100], // Specify the data values array
            fill: false,
            borderColor: "rgba(13,191,194,1)", // Add custom color border (Line)
            backgroundColor: "#2196f3", // Add custom color background (Points and Fill)
            borderWidth: 1, // Specify bar border width
          },
          {
            label: "الإنجاز المحقق", // Name the series
            data: [0, 25, 50, 100, 30, 40, 60, 70, 80, 100], // Specify the data values array
            fill: false,
            borderColor: "rgba(8,199,84,1)", // Add custom color border (Line)
            backgroundColor: "#2196f3", // Add custom color background (Points and Fill)
            borderWidth: 1, // Specify bar border width
          },
        ],
        options: {
          responsive: true, // Instruct chart js to respond nicely.
          maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
          legend: {
            display: false,
            labels: {
              fontColor: "red",
              fontFamily: "'DIN', Arial, Helvetica, serif",
            },
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  fontColor: "white",
                  fontFamily: "'DIN', Arial, Helvetica, serif",
                },
              },
            ],
            xAxes: [
              {
                ticks: {
                  fontColor: "white",
                  fontSize: 18,
                  fontFamily: "'DIN', Arial, Helvetica, serif",
                },
              },
            ],
            pointLabels: {
              fontColor: "red",
              fontFamily: "'DIN', Arial, Helvetica, serif",
            },
          },
        },
      },
      yearlySaves: [],
      year: null,
      dashboardData: {},
      sides: null,
      isUpdate: false,
      sending: false,
      monthlyReportYear: new Date().getFullYear().toString(),
      monthlyReportMonth: "december",
      evaluationYear: null,
      evaluationMonth: null,
      initiativeType: null,
      reports: [],
      CurrentYear: null,
      monthlyReport: [
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
      codeArrays: [
        { label: "Good", value: 4, color: "#5ABC54" },
        { label: "Average", value: 3, color: "#F2C010" },
        { label: "Below average", value: 2, color: "#AFC815" },
        { label: "Begginer", value: 1, color: "#E62E2D" },
      ],
      yourLabels: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      lineChartOptions: {
        title: {
          text: "",
        },

        subtitle: {
          text: "",
        },

        yAxis: {
          min: 0,
          max: 100,
          maxPadding: 0.5,
          title: {
            text: "",
          },
        },

        xAxis: {
          accessibility: {
            rangeDescription: "Range: 2019 to 2025",
          },
        },

        credits: {
          enabled: false,
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
        },

        plotOptions: {
          series: {
            label: {
              connectorAllowed: false,
            },
            pointStart: 2019,
          },
        },

        series: [
          {
            name: "الإنجاز المخطط",
            data: [10, 15, 27, 35, 55, 60, 76],
            color: "#5CBBC0",
          },
          {
            name: "الإنجاز المحقق",
            data: [0, 11, 20, 39, 45, 56, 90],
            color: "#5ABC55",
          },
        ],

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom",
                },
              },
            },
          ],
        },
      },
      spiderchartOptions: {
        chart: {
          polar: true,
          type: "line",
        },

        accessibility: {
          description:
            "A spiderweb chart compares the allocated budget against actual spending within an organization. The spider chart has six spokes. Each spoke represents one of the 6 departments within the organization: sales, marketing, development, customer support, information technology and administration. The chart is interactive, and each data point is displayed upon hovering. The chart clearly shows that 4 of the 6 departments have overspent their budget with Marketing responsible for the greatest overspend of $20,000. The allocated budget and actual spending data points for each department are as follows: Sales. Budget equals $43,000; spending equals $50,000. Marketing. Budget equals $19,000; spending equals $39,000. Development. Budget equals $60,000; spending equals $42,000. Customer support. Budget equals $35,000; spending equals $31,000. Information technology. Budget equals $17,000; spending equals $26,000. Administration. Budget equals $10,000; spending equals $14,000.",
        },

        title: {
          text: "",
          x: -80,
        },

        pane: {
          size: "80%",
        },

        xAxis: {
          categories: [
            "التقييم الذاتي",
            "الالتزام",
            "إجمالي الوفورات",
            "استكمال المتطلبات",
            "التنفيذ",
          ],
          tickmarkPlacement: "on",
          lineWidth: 0,
          reversed: true,
        },

        yAxis: {
          gridLineInterpolation: "polygon",
          lineWidth: 0,
          min: 0,
          opposite: true,
        },

        tooltip: {
          shared: true,
          pointFormat:
            '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>',
        },

        legend: {
          align: "right",
          verticalAlign: "middle",
          layout: "vertical",
        },

        credits: {
          enabled: false,
        },
        series: [
          {
            name: " الجهة ",
            data: [],
            pointPlacement: "on",
          },
        ],

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  align: "center",
                  verticalAlign: "bottom",
                  layout: "horizontal",
                },
                pane: {
                  size: "70%",
                },
              },
            },
          ],
        },
      },
      spiderchartOptionsEntity: {
        chart: {
          polar: true,
          type: "line",
        },

        accessibility: {
          description:
            "A spiderweb chart compares the allocated budget against actual spending within an organization. The spider chart has six spokes. Each spoke represents one of the 6 departments within the organization: sales, marketing, development, customer support, information technology and administration. The chart is interactive, and each data point is displayed upon hovering. The chart clearly shows that 4 of the 6 departments have overspent their budget with Marketing responsible for the greatest overspend of $20,000. The allocated budget and actual spending data points for each department are as follows: Sales. Budget equals $43,000; spending equals $50,000. Marketing. Budget equals $19,000; spending equals $39,000. Development. Budget equals $60,000; spending equals $42,000. Customer support. Budget equals $35,000; spending equals $31,000. Information technology. Budget equals $17,000; spending equals $26,000. Administration. Budget equals $10,000; spending equals $14,000.",
        },

        title: {
          text: "",
          x: -80,
        },

        pane: {
          size: "80%",
        },

        xAxis: {
          categories: [
            "التقييم الذاتي",
            "الالتزام",
            "إجمالي الوفورات",
            "استكمال المتطلبات",
            "التنفيذ",
          ],
          tickmarkPlacement: "on",
          lineWidth: 0,
          reversed: true,
        },

        yAxis: {
          gridLineInterpolation: "polygon",
          lineWidth: 0,
          min: 0,
          opposite: true,
        },

        tooltip: {
          shared: true,
          pointFormat:
            '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>',
        },

        legend: {
          align: "right",
          verticalAlign: "middle",
          layout: "vertical",
        },

        credits: {
          enabled: false,
        },
        series: [
          {
            name: "الجهة",
            data: [],
            pointPlacement: "on",
          },
        ],

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  align: "center",
                  verticalAlign: "bottom",
                  layout: "horizontal",
                },
                pane: {
                  size: "70%",
                },
              },
            },
          ],
        },
      },
      // columnOptions: {
      //     chart: {
      //   type: 'waterfall'
      //     },
      //     title: {
      //         text: ''
      //     },
      //     subtitle: {
      //         text: 'الأرقام بألاف الريالات'
      //     },
      //     xAxis: {
      //         type: 'category',
      //         labels: {
      //             rotation: -45,
      //             style: {
      //                 fontSize: '13px',
      //                 fontFamily: 'DIN, Arial, Helvetica, serif !important'
      //             }
      //         }
      //     },
      //     yAxis: {
      //         min: 0,
      //         title: {
      //             text: ''
      //         }
      //     },
      //     legend: {
      //         enabled: false
      //     },
      //     tooltip: {
      //         pointFormat: '<b>{point.y:.1f}</b>'
      //     },
      //     credits: {
      //       enabled: false
      //     },
      //     series: [{
      //         name: 'Sum',
      //         data: [],
      //         dataLabels: {
      //             enabled: true,
      //             // rotation: -90,
      //             color: '#FFFFFF',
      //             align: 'right',
      //             format: '{point.y:.1f}', // one decimal
      //             // y: 10, // 10 pixels down from the top
      //             style: {
      //                 fontSize: '13px',
      //                 fontFamily: 'DIN, Arial, Helvetica, serif !important'
      //             }
      //         }
      //     },{
      //         name: 'yearlySaveActual',
      //         data: [],
      //         dataLabels: {
      //             enabled: true,
      //             // rotation: -90,
      //             color: '#FFFFFF',
      //             align: 'right',
      //             format: '{point.y:.1f}', // one decimal
      //             // y: 10, // 10 pixels down from the top
      //             style: {
      //                 fontSize: '13px',
      //                 fontFamily: 'DIN, Arial, Helvetica, serif !important'
      //             }
      //         }
      //     },{
      //         name: 'yearlySaveExpected',
      //         data: [],
      //         dataLabels: {
      //             enabled: true,
      //             rotation: -90,
      //             color: '#FFFFFF',
      //             align: 'right',
      //             format: '{point.y:.1f}', // one decimal
      //             y: 10, // 10 pixels down from the top
      //             style: {
      //                 fontSize: '13px',
      //                 fontFamily: 'DIN, Arial, Helvetica, serif !important'
      //             }
      //         }
      //     }]
      // },
      dataBarset: {
        labels: [
          "وفورات لم يتم توزيعها على السنوات",
          "سنين مستقبلية",
          "2023",
          "2022",
          "2021",
          "2020",
          "2019",
          "إجمالي مجموع وفورات الفرص",
        ],
        datasets: [
          {
            label: "الأرقام بألاف الريالات",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 2,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [0, 0, 0],
          },
        ],
      },
      columnOptions: {
        chart: {
          type: "waterfall",
        },

        title: {
          text: "الأرقام بألاف الريالات",
        },

        xAxis: {
          type: "category",
        },

        yAxis: {
          title: {
            text: "الريال السعودي",
          },
        },

        legend: {
          enabled: false,
        },

        tooltip: {
          pointFormat: "<b>${point.y:,.2f}</b> USD",
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            data: [
              {
                name: "اجمالي الوفورات المحققة",
                y: 0,
              },
              {
                name: "المتبقي من الوفورات المحددة",
                y: 0,
              },
              {
                name: "اجمالي الوفورات التي تم تحديدها",
                isSum: true,
                color: "#70d18c",
              },
            ],
            pointPadding: 0,
          },
        ],
      },
      donut1ChartOptions: {
        chart: {
          renderTo: "container",
          type: "pie",
        },
        title: {
          text: "",
        },
        credits: {
          enabled: false,
        },
        yAxis: {
          title: {
            text: "",
          },
        },
        plotOptions: {
          pie: {
            shadow: false,
          },
        },
        tooltip: {
          formatter: function() {
            return "<b>" + this.point.name + "</b>: " + this.y + " %";
          },
        },
        series: [
          {
            name: "Entities",
            data: [
              ["لم يتم التسليم", 6],
              [" تم التسليم", 4],
            ],

            color: ["red", "yellow", "blue"],
            size: "40%",
            innerSize: "45%",
            borderWidth: 1,
            showInLegend: true,
            dataLabels: {
              enabled: false,
            },
          },
        ],
      },
      donut2ChartOptions: {
        chart: {
          renderTo: "container",
          type: "pie",
        },
        title: {
          text: "",
        },
        credits: {
          enabled: false,
        },
        yAxis: {
          title: {
            text: "",
          },
        },
        plotOptions: {
          pie: {
            shadow: false,
          },
        },
        tooltip: {
          formatter: function() {
            return "<b>" + this.point.name + "</b>: " + this.y + " %";
          },
        },
        series: [
          {
            name: "Entities",
            data: [
              ["قيد المراجعة", 6],
              ["تمت مرجعتها", 4],
            ],
            size: "40%",
            innerSize: "45%",
            showInLegend: true,
            dataLabels: {
              enabled: false,
            },
          },
        ],
      },
      donut3ChartOptions: {
        chart: {
          renderTo: "container",
          type: "pie",
        },
        title: {
          text: "",
        },
        credits: {
          enabled: false,
        },
        yAxis: {
          title: {
            text: "",
          },
        },
        plotOptions: {
          pie: {
            shadow: false,
          },
        },
        tooltip: {
          formatter: function() {
            return "<b>" + this.point.name + "</b>: " + this.y + " %";
          },
        },
        series: [
          {
            name: "Entities",
            data: [
              ["لم يتم التسليم", 6],
              [" تم التسليم", 4],
            ],
            size: "40%",
            innerSize: "45%",
            showInLegend: true,
            dataLabels: {
              enabled: false,
            },
          },
        ],
      },
      donut4ChartOptions: {
        chart: {
          renderTo: "container",
          type: "pie",
        },
        title: {
          text: "",
        },
        credits: {
          enabled: false,
        },
        yAxis: {
          title: {
            text: "",
          },
        },
        plotOptions: {
          pie: {
            shadow: false,
          },
        },
        tooltip: {
          formatter: function() {
            return "<b>" + this.point.name + "</b>: " + this.y + " %";
          },
        },
        series: [
          {
            name: "Entities",
            data: [
              ["قيد المراجعة", 6],
              ["تمت مرجعتها", 4],
            ],
            size: "40%",
            innerSize: "45%",
            showInLegend: true,
            dataLabels: {
              enabled: false,
            },
          },
        ],
      },
      title: "",
      VeryGood: 0,
      Good: 0,
      Average: 0,
      Belowaverage: 0,
      Begginer: 4,
      allEntities: [],
      mainAllEntities: [],
      tenant_id: null,
      adminItems: {
        numberOfCseUsers: 0,
        numberOfEntities: 0,
        numberOfEntityUsers: 0,
        numberOfPendingReports: 0,
        numberOfReviewedReports: 0,
        numberOfSubmittedReports: 0,
        numberOfInitiatives: 0,
        totalSavings: 0,
      },
    };
  },
  methods: {
    formatAsCurrency(value) {
      if (value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
    openYearlyreports(payload) {
      let data = {
        year: payload ? payload : this.monthlyReportYear,
        tenantid: window.localStorage.getItem("tenantId"),
      };
      this.$showLoader();
      this.$monthlyReportsService.getYearlyReports(data).then((res) => {
        if (res.success) {
          this.reports = [];
          // this.monthlyReports = [];
          if (res.data.length > 0) {
            this.reports = res.data;
            this.reports.forEach((item) => {
              this.monthlyReport.map((payload) => {
                payload.year = item.name.split("-")[1];
              });
            });
            this.monthlyReport.map((item) => {
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
              return item;
            });
          } else {
            this.monthlyReport.forEach((item) => {
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
    getUserSectors() {
      this.UserSectors = [];
      this.$monthlyReportsService.getSectors().then((res) => {
        if (res.success) {
          // this.sectorId = res.data ? res.data.entitysectorID : null;
          res.data.forEach((item) => {
            this.UserSectors.push(item.entitysector);
          });
          // this.sectorid.push(this.UserSectors)
          // for (let i = 0; i < this.UserSectors.length; i++) {
          //   this.sectorid.push(this.UserSectors[i].id);
          //   break;
          // }
        }
        this.$hideLoader();
      });
    },
    CreateBarChart() {
      if (this._myChart != null) {
        this._myChart.destroy();
      }

      let _data = this.dataset;
      // if (true) {
      var _chart = document.getElementById("barchart").getContext("2d");
      Chart.defaults.global.defaultFontStyle = "bold";
      Chart.defaults.global.defaultFontFamily =
        "'DIN', 'Helvetica', 'Arial', sans-serif";
      this._myChart = new Chart(_chart, {
        type: "bar",
        data: {
          fontFamily: "'DIN', 'Helvetica', 'Arial', sans-serif",
          fontSize: 30,
          labels: [
            "وفورات لم يتم توزيعها",
            "سنين مستقبلية",
            "2023",
            "2022",
            "2021",
            "2020",
            "2019",
            "إجمالي مجموع الوفورات",
          ],
          datasets: [
            {
              label: false,
              data: _data,
              backgroundColor: "#2582C5",
              borderWidth: 1,
              maxBarThickness: 20,
              order: 1,
            },
          ],
        },
        options: {
          events: [],
          responsive: true,
          maintainAspectRatio: false,

          legend: {
            display: false,
          },
          title: {
            display: false,
            position: "bottom",
            fontSize: 20,
            fontFamily: "'DIN', 'Helvetica', 'Arial', sans-serif",
            text: "الخطة الزمنية لظهور أثر الفرص على المدى القريب والمتوسط",
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  fontSize: 12,
                  beginAtZero: true,
                  min: 1,
                  // callback: function(value, index, values) {
                  //   return value
                  //     .toString()
                  //     .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  // },
                  callback: function(labelValue, index, labels) {
                    // console.log(Math.abs(Number(labelValue)));
                    // Nine Zeres for Billions
                    return Math.abs(Number(labelValue)) >= 1.0e9
                      ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(1) + "B"
                      : // Six Zeroes for Millions
                      Math.abs(Number(labelValue)) >= 1.0e6
                      ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(1) + "M"
                      : // Three Zeroes for Thousands
                      Math.abs(Number(labelValue)) >= 1.0e3
                      ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(1) + "K"
                      : Math.abs(Number(labelValue));
                  },
                },
              },
            ],
            xAxes: [
              {
                ticks: {
                  fontSize: 12,
                  callback: function(label, index, labels) {
                    if (/\s/.test(label)) {
                      return label.split(" ");
                    } else {
                      return label;
                    }
                  },
                },
              },
            ],
          },
        },
      });
      // _myChart.destroy();
      // }
    },
    CreateChart() {
      // if (this.hasCSERole) {
      if (this.myRadarChart != null) {
        this.myRadarChart.destroy();
      }
      let _data = this.radarDataset;
      var ctx = document.getElementById("RadarChart").getContext("2d");
      Chart.defaults.global.defaultFontStyle = "bold";
      Chart.defaults.global.defaultFontFamily =
        "'DIN', 'Helvetica', 'Arial', sans-serif";
      this.myRadarChart = new Chart(ctx, {
        type: "radar",
        fontFamily: "'DIN', 'Helvetica', 'Arial', sans-serif",
        data: {
          labels: [
            "الالتزام",
            "استكمال التعبئة",
            "حجم الفرص",
            "وضوح الفرصة وآلية احتسابها",
            "التنفيذ وسرعة الإنجاز",
          ],
          datasets: [
            {
              label: false,
              data: _data,
              borderColor: "#2582C5",
              backgroundColor: "RGBA(37,130,197,0.32)",
              borderWidth: 1,
              order: 1,
            },
          ],
        },
        //     onResize: function(value, index, values) {
        //       console.log('dshfdsfjhdsjhfjhdskjfhkjds')
        //             myRadarChart.data.datasets[0].data = [];
        // // chart.data.labels[5] = "Newly Added";
        // myRadarChart.update();
        // },
        options: {
          events: [],
          responsive: true,
          maintainAspectRatio: false,
          // tooltips: { enabled: false },
          // hover: { mode: null },
          scale: {
            ticks: {
              display: false,
              beginAtZero: true,
              max: 3,
              min: 0,
              stepSize: 1,
              callback: function(value, index, values) {
                return value;
              },
            },
            pointLabels: {
              fontColor: "black",
              fontSize: 17,
              fontFamily: "'DIN', Arial, Helvetica, serif",
              fontStyle: "bold",
            },
          },
          legend: {
            display: false,
          },
        },
      });
      // }
    },
    updateCSEBarChart() {
      const obj = this.dashboardData.yearlySaves.find((temp) => {
        return temp.year == this.year;
      });
      if (obj) {
        this.setBarChart(obj.yearlySaveActual, obj.yearlySaveExpected);
      }
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
    getEntityDashboard() {
      this.$showLoader();
      this.$monthlyReportsService.getEntityDashboard().then((res) => {
        if (res.success && res.data) {
          this.dashboardData = res.data;
          this.monthlyReport.map((item) => {
            if (
              this.dashboardData.reports.find(
                (rep) =>
                  item.month.includes(rep.name.split("-")[0]) &&
                  rep.isSubmitted == true
              )
            ) {
              item.isSubmitted = true;
            } else if (
              this.dashboardData.reports.find(
                (rep) =>
                  item.month.includes(rep.name.split("-")[0]) &&
                  rep.isSubmitted == false
              )
            ) {
              item.isSubmitted = false;
            }
            return item;
          });
          this.columnOptions.series[0].data[0].y = this.dashboardData.yearlySaveActual;
          this.columnOptions.series[0].data[1].y = this.dashboardData.yearlySaveExpected;
          this.dataBarset = {
            labels: [
              "وفورات لم يتم توزيعها على السنوات",
              "2023",
              "2022",
              "2021",
              "2020",
              "2019",
              "إجمالي مجموع وفورات الفرص",
            ],
            datasets: [
              {
                label: "الأرقام بألاف الريالات",
                backgroundColor: "rgba(13,191,194,1)",
                borderColor: "rgba(13,191,194,1)",
                borderWidth: 2,
                hoverBackgroundColor: "rgba(13,191,194,0.4)",
                hoverBorderColor: "rgba(13,191,194,1)",
                data: [
                  this.dashboardData.yearlySaveActual +
                    this.dashboardData.yearlySaveExpected,
                  this.dashboardData.yearlySaveExpected || 0,
                  this.dashboardData.yearlySaveActual || 0,
                ],
              },
            ],
          };
          const tempArr = [];
          Object.values(this.dashboardData).forEach((temp) => {
            if (typeof temp == "string") {
              const hold = this.codeArrays.find((obj) =>
                obj.label.includes(temp)
              );
              if (hold) {
                this[hold.label.replace(/ +/g, "")] += hold.value;
                tempArr.push(hold.value);
                this.spiderchartOptionsEntity.series[0].data.push(hold.value);
              } else {
                this.spiderchartOptionsEntity.series[0].data.push(0);
              }
            }
          });
          /*new spider graph*/
          var siderData = [
            this.Good,
            this.VeryGood,
            this.Average,
            this.Belowaverage,
            this.Begginer,
          ];
          // this.spiderchartOptionsEntity.series[0].data = siderData;
          this.dataSpiderset = {
            labels: this.dataSpiderset.labels,
            datasets: [
              {
                label: "الجهة",
                backgroundColor: "rgba(190,181,198,0.2)",
                borderColor: "rgba(0,181,204,1)",
                pointBackgroundColor: "rgba(179,181,198,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(179,181,198,1)",
                data: tempArr,
              },
            ],
          };
        } else {
        }

        this.$hideLoader();
      });
    },
    getColor(temp) {
      const set = this.codeArrays.find((obj) => obj.label.includes(temp));
      if (set) {
        return set.color;
      }
      return "#808080";
    },
    // onCategorySectorSelect() {
    //   // this.categoryEntity
    //   // this.sectorEntity
    //   this.allEntities = [];
    //   if (this.sectorEntity == "all" && this.categoryEntity == "all") {
    //     this.allEntities = this.mainAllEntities;
    //   } else if (this.sectorEntity == "all" && this.categoryEntity != "all") {
    //     for (let i = 0; i < this.mainAllEntities.length; i++) {
    //       if (this.mainAllEntities[i].tenantType == this.categoryEntity) {
    //         this.allEntities.push(this.mainAllEntities[i]);
    //       }
    //     }
    //   } else if (this.sectorEntity != "all" && this.categoryEntity == "all") {
    //     for (let i = 0; i < this.mainAllEntities.length; i++) {
    //       if (this.mainAllEntities[i].sector == this.sectorEntity) {
    //         this.allEntities.push(this.mainAllEntities[i]);
    //       }
    //     }
    //   } else if (this.sectorEntity != "all" && this.categoryEntity != "all") {
    //     for (let i = 0; i < this.mainAllEntities.length; i++) {
    //       if (
    //         this.mainAllEntities[i].sector == this.sectorEntity &&
    //         this.mainAllEntities[i].tenantType == this.categoryEntity
    //       ) {
    //         this.allEntities.push(this.mainAllEntities[i]);
    //       }
    //     }
    //   }
    //   if (this.allEntities.length > 0) {
    //     this.tenant_id = this.allEntities[0].id;
    //     this.getCSEDashboard();
    //   } else {
    //     this.dashboardData = {};
    //     this.tenant_id = null;
    //   }
    // },
    // getAllEntities() {
    //   this.$showLoader();
    //   this.$entityService.getAllEntities().then((res) => {
    //     if (res.success) {
    //       this.allEntities = res.data;
    //       this.mainAllEntities = res.data;
    //       if (this.allEntities.length > 0) {
    //         // this.tenant_id = this.allEntities[0].id;
    //         this.CSEDashboard();
    //       }
    //     }
    //   });

    //   this.$hideLoader();
    // },
    setBarChart(yearlySaveActual, yearlySaveExpected) {
      this.dataBarset = {
        labels: [
          "وفورات لم يتم توزيعها على السنوات",
          "2023",
          "2022",
          "2021",
          "2020",
          "2019",
          "إجمالي مجموع وفورات الفرص",
        ],
        datasets: [
          {
            label: "الأرقام بألاف الريالات",
            backgroundColor: "rgba(13,191,194,1)",
            borderColor: "rgba(13,191,194,1)",
            borderWidth: 2,
            hoverBackgroundColor: "rgba(13,191,194,0.4)",
            hoverBorderColor: "rgba(13,191,194,1)",
            data: [
              yearlySaveActual + yearlySaveExpected,
              yearlySaveExpected || 0,
              yearlySaveActual || 0,
            ],
          },
        ],
      };
    },
    CSEDashboard(payload = null, check = null) {
      let getAll = null;
      if (this.hasEntityRole) {
        getAll = null;
      } else {
        !payload ? (getAll = "All") : null;
      }
      let data = {
        tenantId: this.hasEntityRole
          ? window.localStorage.getItem("tenantId")
          : null,
        sectorid: [],
        reportname: null,
        typeid: null,
        getAll: getAll,
      };
      if (this.firstCall) {
        this.firstCall = false;
      } else {
        let year = this.monthlyReportYear;
        let month = payload.month;
        data = {
          tenantId: payload.tenant_id != null ? payload.tenant_id : null,
          sectorid: payload.entitySector != null ? payload.entitySector : null,
          reportname: month != null ? month + "-" + year : null,
          typeid: payload.typeid != null ? payload.typeid : null,
          getAll:
            payload.entitySector.length == 0 &&
            payload.typeid.length == 0 &&
            !payload.tenant_id
              ? "All"
              : null,
        };
      }
      if (true) {
        this.$showLoader();
        this.checkVar = false;
        this.$monthlyReportsService.getCSEDashboard(data).then((res) => {
          if (res.success && res.data) {
            this.dataset = [];
            this.entityPercentage = res.data.entityPercentage;
            this.numberofInitiatives = res.data.numberofInitiatives;
            this.tenantNames = res.data.tenantNames;
            this.approvedPercentage =
              res.data.approvedPercentage != null
                ? parseInt(res.data.approvedPercentage)
                : 0;
            this.submitterpercentage =
              res.data.submitterpercentage != null
                ? parseInt(res.data.submitterpercentage)
                : 0;
            this.doughnutDataset = [];
            this.doughnutDataset2 = [];

            this.doughnutDataset.push(parseInt(this.submitterpercentage));
            this.doughnutDataset.push(parseInt(this.tenantNames.length));

            this.doughnutDataset2.push(parseInt(this.approvedPercentage));
            this.doughnutDataset2.push(parseInt(this.submitterpercentage));
            this.dataDoughnutset1.datasets[0].data = this.doughnutDataset;
            this.dataDoughnutset2.datasets[0].data = this.doughnutDataset2;
            this.dataset.push(res.data.expectedSavings);
            this.dataset.push(res.data.expectedYear);
            this.dataset.push(res.data.yearE2023);
            this.dataset.push(res.data.yearE2022);
            this.dataset.push(res.data.yearE2021);
            this.dataset.push(res.data.yearE2020);
            this.dataset.push(res.data.yearE2019);
            this.dataset.push(res.data.graphTotal);

            this.dashboardData = res.data;
            this.radarDataset = [];
            this.dashboardData = res.data;
            this.CreateBarChart();
            this.checkVar = true;
            if (this.hasCSERole) {
              this.getReportEvulation(payload);
              console.log("sdsjagdsagdhsd");
            }
            if (this.hasEntityRole) {
              this.ReportEvulation(payload);
              this.openYearlyreports(payload);
            }
            if (this.dashboardData.reports != null) {
              this.monthlyReport.map((item) => {
                if (
                  this.dashboardData.reports.find(
                    (rep) =>
                      item.month.includes(this.getArabicMonth(rep.name)) &&
                      rep.isSubmitted == true
                  )
                ) {
                  item.isSubmitted = true;
                } else if (
                  this.dashboardData.reports.find(
                    (rep) =>
                      item.month.includes(this.getArabicMonth(rep.name)) &&
                      rep.isSubmitted == false
                  )
                ) {
                  item.isSubmitted = false;
                }
                return item;
              });
            }

            this.columnOptions.series[0].data[0].y = this.dashboardData.yearlySaveActual;
            this.columnOptions.series[0].data[1].y = this.dashboardData.yearlySaveExpected;
            const tempArr = [];
            Object.values(this.dashboardData).forEach((temp) => {
              if (typeof temp == "string") {
                const hold = this.codeArrays.find((obj) =>
                  obj.label.includes(temp)
                );
                if (hold) {
                  this[hold.label.replace(/ +/g, "")] += hold.value;
                  tempArr.push(hold.value);
                  this.spiderchartOptions.series[0].data.push(hold.value);
                } else {
                  tempArr.push(0);
                  this.spiderchartOptions.series[0].data.push(0);
                }
              }
            });
            var siderData = [
              this.Good,
              this.VeryGood,
              this.Average,
              this.Belowaverage,
              this.Begginer,
            ];
            this.spiderchartOptions.series[0].data = tempArr;
            this.makeDataSet();
          } else {
            this.$hideLoader();
          }
        });
      }
    },
    makeDataSet() {
      this.radarDataset = [];
      let dataSet = {
        SectionA: this.SectionA != null ? this.SectionA : "grey",
        SectionB: this.SectionB != null ? this.SectionB : "grey",
        SectionC: this.SectionC != null ? this.SectionC : "grey",
        SectionD: this.SectionD != null ? this.SectionD : "grey",
        SectionE: this.SectionE != null ? this.SectionE : "grey",
      };
      for (const [key, value] of Object.entries(dataSet)) {
        if (value === "red") {
          this.radarDataset.push(1);
        }
        if (value === "yellow") {
          this.radarDataset.push(2);
        }
        if (value === "green") {
          this.radarDataset.push(3);
        }
        if (value === "Yellow") {
          this.radarDataset.push(2);
        }
        if (value === "grey") {
          this.radarDataset.push(0);
        }
      }
      this.CreateChart();
    },
    ReportEvulation(payload) {
      let data2 = {
        tenantId:
          payload != null
            ? payload.tenant_id
            : window.localStorage.getItem("tenantId"),
      };
      this.$monthlyReportsService.ReportEvulation(data2).then((res) => {
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
            this.makeDataSet();
          }
        }
        this.$hideLoader();
      });
    },
    getReportEvulation(payload) {
      let getAll = null;
      console.log(payload);
      if (payload) {
        if (
          payload.entitySector.length == 0 &&
          payload.typeid.length == 0 &&
          !payload.tenant_id
        ) {
          getAll = "All";
        }
      }
      let data2 = {
        tenantId: payload != null ? payload.tenant_id : null,
        sectorid: payload ? payload.entitySector : [],
        reportname: payload ? payload.reportname : null,
        typeid: payload ? payload.typeid : null,
        getAll: !payload ? "All" : getAll,
      };
      this.$monthlyReportsService.CSEReportEvulation(data2).then((res) => {
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
            this.makeDataSet();
          }
        }
        this.$hideLoader();
      });
    },
    getValues(prop) {
      let value = null;
      let color = null;
      if (prop === "red") {
        color = "red";
      }
      if (prop === "yellow") {
        color = "yellow";
      }
      if (prop === "green") {
        color = "green";
      }
      if (prop === null) {
        color = "grey";
      }

      return color;
    },
    getAdminData() {
      this.$showLoader();
      this.$monthlyReportsService.getAdminDashboard().then((res) => {
        if (res.success) {
          this.adminItems = res.data;
        }
      });

      this.$hideLoader();
    },
    AllEntityTypes() {
      this.$entityTypes.getAllEntityTypes().then((res) => {
        if (res.success) {
          res.data.items.forEach((payload) => [this.entites.push(payload)]);
        }
      });
    },
  },
  computed: {},
  mounted() {
    let dashboard = localStorage.getItem("dashboard");
    if (this.hasEntityRole) {
      let payload = {
        tenant_id: window.localStorage.getItem("tenantId"),
      };
      if (dashboard) {
        this.CSEDashboard();
        this.AllEntityTypes();
        // this.ReportEvulation();
      }
    }
    if (this.hasCSERole) {
      this.CSEDashboard();
      this.AllEntityTypes();
      // this.makeDataSet();
      // this.getReportEvulation();
      this.getUserSectors();
    }
    if (this.hasOnlyAdminRole) {
      this.getAdminData();
    }
    let otpCheck = localStorage.getItem("otp");
    if (!otpCheck) {
      this.$router.push("/auth/otp");
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .cross-line::before{
   content:url('/images/icons/line.png');
} */

/* .cross-line::after{
   content:url('/images/icons/line.png');
} */

body.english .text-align-saving {
  text-align: right;
}

body.arabic .text-align-saving {
  text-align: left;
}

.top-line-text {
  font-weight: 600;
}

body.english .top-line-text::before {
  left: -15px;
  right: none;
}

body.arabic .top-line-text::before {
  right: -15px;
  left: none;
}

.top-line-text::before {
  content: "";
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  border-radius: 20px;
  display: inline-block;
}

.top-line-text.green::before {
  background: #5abc54;
}

.top-line-text.yellow::before {
  background: #f2c010;
}

.top-line-text.blue::before {
  background: #afc815;
}

.top-line-text.cyan::before {
  background: #e62e2d;
}

.top-line-text.bluee::before {
  background: #5cbbc0;
}

.top-line-text.grey::before {
  background: #d9d9d9;
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

.chart-img {
  position: absolute;
  width: 100%;
}

.single-chart {
  width: 200px;
  height: 200px;
  border: 3px solid transparent;
  position: relative;
}

#radar-chart {
  width: auto !important;
  height: 100% !important;
  margin: auto !important;
}

.radarChart {
  /* width: 460px; */
  margin: auto;
  position: relative;
}

.barChart {
  /* width: 640px !important; */
  margin: auto;
}

/*--------> waqas css<-----------*/
.BasicElmPrgmImages {
  width: 400px;
  height: 200px;
  margin: 0 auto;
  display: flex;
  direction: ltr;
}

.starTextDiv h4 {
  font-weight: 600;
  display: table-cell;
  vertical-align: top;
  font-size: 1.1rem;
}

.starDiv span {
  position: absolute;
  color: white;
  font-size: 20px;
  top: 51%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.tExpSaving h4 {
  padding: 0;
  font-size: 12px;
}

.savingPrcntText {
  display: inline-block;
  vertical-align: top;
  font-size: 15px;
  font-weight: 600;
}

@media screen and (max-width: 1500px) {
  .BasicElmPrgmImages {
    width: 300px;
    height: 150px;
    margin: 0px auto;
    display: flex;
    direction: ltr;
  }

  .pl-4,
  .px-4 {
    padding-left: 0 !important;
  }

  .starTextDiv h4 {
    font-weight: 600;
    display: table-cell;
    vertical-align: top;
    font-size: 0.8rem;
  }

  .tExpSaving h4 {
    font-size: 15px;
  }

  .savingPrcntText {
    font-size: 12px;
  }
}
</style>
