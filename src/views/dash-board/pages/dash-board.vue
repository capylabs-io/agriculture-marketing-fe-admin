<template>
  <div>
    <v-row>
      <v-col cols="5">
        <div class="neutral100--text text-dp-md font-weight-semibold">
          Báo Cáo Thống Kê
        </div>
      </v-col>
    </v-row>
    <!-- <div class="d-flex justify-space-between align-center mt-6">
      <div class="neutral30-border d-flex column-gap-10 tab border-radius-8">
        <v-btn class="tab1 active text-none text-sm" text @click="tab(1)">
          12 Tháng
        </v-btn>
        <div class="vl"></div>
        <v-btn class="tab2 text-none text-sm" text @click="tab(2)">
          6 tháng
        </v-btn>
        <div class="vl"></div>
        <v-btn class="tab3 text-none text-sm" text @click="tab(3)">
          30 ngày
        </v-btn>
        <div class="vl"></div>
        <v-btn class="tab4 text-none text-sm" text @click="tab(4)">
          7 ngày
        </v-btn>
      </div>
      <div class="d-flex">
        <div class="neutral30-border border-radius-8 overflow-hidden mr-2">
          <v-btn color="white" class="text-none px-3 font-weight-bold" depressed
            ><v-icon class="mr-2">mdi-filter-outline</v-icon>Bộ lọc</v-btn
          >
        </div>

        <div class="neutral30-border border-radius-8 overflow-hidden">
          <v-btn color="white" class="text-none px-3 font-weight-bold" depressed
            ><v-icon class="mr-2">mdi-tray-arrow-up</v-icon>Xuất dữ liệu</v-btn
          >
        </div>
      </div>
    </div> -->
    <v-row class="mt-5">
      <v-col cols="12" xl="4" md="4">
        <v-card
          class="number-card border-radius-12 neutral30-border pa-6"
          :style="{ background: '#FEFEF2' }"
          outlined
        >
          <div class="d-flex align-center">
            <div class="dashboard-icon neutral30-border mr-2"></div>
            <div class="neutral70--text text-md">Tổng số sản phẩm</div>
          </div>

          <div
            class="text-dp-md font-weight-bold neutral100--text text-left mt-4"
          >
            {{
              dashboardStore.dashboard
                ? dashboardStore.dashboard.totalProducts
                : 0
            }}
          </div>

          <router-link to="/product">
            <div class="mt-4 text-xs">Xem chi tiết</div>
          </router-link>
        </v-card>
      </v-col>
      <v-col cols="12" xl="4" md="4">
        <v-card
          class="number-card border-radius-12 neutral30-border pa-6"
          :style="{ background: '#F5F8FF' }"
          outlined
        >
          <div class="d-flex align-center">
            <div class="dashboard-icon neutral30-border mr-2"></div>
            <div class="neutral70--text text-md">Tổng số vật tư</div>
          </div>

          <div
            class="text-dp-md font-weight-bold neutral100--text text-left mt-4"
          >
            {{
              dashboardStore.dashboard
                ? dashboardStore.dashboard.totalSupplies
                : 0
            }}
          </div>
          <router-link to="/supply">
            <div class="mt-4 text-xs">Xem chi tiết</div>
          </router-link>
        </v-card>
      </v-col>
      <v-col cols="12" xl="4" md="4">
        <v-card
          class="number-card border-radius-12 neutral30-border pa-6"
          :style="{ background: '#F4FEF6' }"
          outlined
        >
          <div class="d-flex align-center">
            <div class="dashboard-icon neutral30-border mr-2"></div>
            <div class="neutral70--text text-md">Tổng số bài viết</div>
          </div>

          <div
            class="text-dp-md font-weight-bold neutral100--text text-left mt-4"
          >
            {{
              dashboardStore.dashboard ? dashboardStore.dashboard.totalPosts : 0
            }}
          </div>

          <router-link to="/news">
            <div class="mt-4 text-xs">Xem chi tiết</div>
          </router-link>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-4">
      <v-col cols="12" xl="4" md="4">
        <v-card
          class="number-card border-radius-12 neutral30-border pa-6"
          :style="{ background: '#FEFAFF' }"
          outlined
        >
          <div class="d-flex align-center">
            <div class="dashboard-icon neutral30-border mr-2"></div>
            <div class="neutral70--text text-md">Tổng số giống cây</div>
          </div>

          <div
            class="text-dp-md font-weight-bold neutral100--text text-left mt-4"
          >
            {{
              dashboardStore.dashboard
                ? dashboardStore.dashboard.totalSeedlings
                : 0
            }}
          </div>

          <router-link to="/seed">
            <div class="mt-4 text-xs">Xem chi tiết</div>
          </router-link>
        </v-card>
      </v-col>
      <v-col cols="12" xl="4" md="4">
        <v-card
          class="number-card border-radius-12 neutral30-border pa-6"
          :style="{ background: '#FEF6F4' }"
          outlined
        >
          <div class="d-flex align-center">
            <div class="dashboard-icon neutral30-border mr-2"></div>
            <div class="neutral70--text text-md">Tổng số hội viện</div>
          </div>

          <div
            class="text-dp-md font-weight-bold neutral100--text text-left mt-4"
          >
            {{
              dashboardStore.dashboard ? dashboardStore.dashboard.totalUsers : 0
            }}
          </div>
          <!-- <router-link>
            <div class="mt-4 text-xs">
              Xem chi tiết <v-icon small class="ml-1">mdi-arrow-right</v-icon>
            </div>
          </router-link> -->
        </v-card>
      </v-col>
      <v-col cols="12" xl="4" md="4"> </v-col>
    </v-row>
  </div>
</template>

<script>
import { dashboardStore } from "../stores/dashboardStore";
import { mapStores } from "pinia";
export default {
  computed: {
    ...mapStores(dashboardStore),
  },
  methods: {
    tab(show) {
      this.index = 1;
      const tab1 = document.querySelector(".tab1");
      const tab2 = document.querySelector(".tab2");
      const tab3 = document.querySelector(".tab3");
      const tab4 = document.querySelector(".tab4");
      if (show == 1) {
        tab1.classList.add("active");
        tab2.classList.remove("active");
        tab3.classList.remove("active");
        tab4.classList.remove("active");
      } else if (show == 2) {
        tab1.classList.remove("active");
        tab2.classList.add("active");
        tab3.classList.remove("active");
        tab4.classList.remove("active");
      } else if (show == 3) {
        tab1.classList.remove("active");
        tab2.classList.remove("active");
        tab3.classList.add("active");
        tab4.classList.remove("active");
      } else {
        tab1.classList.remove("active");
        tab2.classList.remove("active");
        tab4.classList.add("active");
        tab3.classList.remove("active");
      }
    },
  },
  mounted() {
    this.dashboardStore.fetchStatistics();
  },
};
</script>

<style lang="scss" scoped>
.tab {
  background-color: white;
  height: max-content;
  width: max-content;
  border-radius: 12px;
}
.vl {
  border-left: 1px solid var(--v-neutral30-base);
}
v-btn {
  border-radius: 0px !important;
}
.active {
  background: var(--v-primary40-base);
  font-weight: bold;
}
.number-card {
  height: 166px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
.dashboard-icon {
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 100px;
}
</style>
