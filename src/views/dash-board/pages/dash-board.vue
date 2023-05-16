<template>
  <div>
    <v-row>
      <v-col cols="5">
        <div class="neutral100--text text-dp-md font-weight-semibold">
          Báo Cáo Thống Kê
        </div>
      </v-col>
    </v-row>
    <div class="d-flex justify-space-between align-center mt-6">
      <div class="neutral30-border d-flex column-gap-10 tab border-radius-8">
        <v-btn class="voucher active text-none text-sm" text> 12 Tháng </v-btn>
        <div class="vl"></div>
        <v-btn class="clothes text-none text-sm" text> 6 tháng </v-btn>
        <div class="vl"></div>
        <v-btn class="clothes text-none text-sm" text> 30 ngày </v-btn>
        <div class="vl"></div>
        <v-btn class="clothes text-none text-sm" text> 7 ngày </v-btn>
      </div>
      <div class="d-flex">
        <div class="neutral30-border border-radius-8 overflow-hidden mr-2">
          <v-btn color="white" class="text-none px-3" depressed>Bộ lọc</v-btn>
        </div>

        <div class="neutral30-border border-radius-8 overflow-hidden">
          <v-btn color="white" class="text-none px-3" depressed
            >Xuất dữ liệu</v-btn
          >
        </div>
      </div>
    </div>
    <v-row class="mt-5">
      <v-col cols="12" xl="3">
        <v-card
          class="number-card pa-4 d-flex justify-space-between"
          rounded="12"
          outlined
        >
          <div>
            <div class="text-left neutral70--text text-xs">Total Campaign</div>

            <div class="text-dp-sm font-weight-bold neutral100--text text-left">
              0
            </div>
          </div>
          <v-icon small class="align-self-start">mdi-export</v-icon>
        </v-card>
      </v-col>
      <v-col cols="12" xl="3"
        ><v-card
          class="number-card pa-4 d-flex justify-space-between"
          rounded="12"
          outlined
        >
          <div>
            <div class="text-left neutral70--text text-xs">
              Total Categories
            </div>

            <div class="text-dp-sm font-weight-bold neutral100--text text-left">
              0
            </div>
          </div>
          <v-icon small class="align-self-start">mdi-export</v-icon>
        </v-card>
      </v-col>

      <v-col cols="12" xl="3"
        ><v-card
          class="number-card pa-4 d-flex justify-space-between"
          rounded="12"
          outlined
        >
          <div>
            <div class="text-left neutral70--text text-xs">Campaign Active</div>

            <div class="text-dp-sm font-weight-bold neutral100--text text-left">
              0
            </div>
          </div>
          <v-icon small class="align-self-start">mdi-export</v-icon>
        </v-card>
      </v-col>
      <v-col cols="3"
        ><v-card
          class="number-card pa-4 d-flex justify-space-between"
          rounded="12"
          outlined
        >
          <div>
            <div class="text-left neutral70--text text-xs">Total Purchase</div>

            <div class="text-dp-sm font-weight-bold neutral100--text text-left">
              0
            </div>
          </div>
          <v-icon small class="align-self-start">mdi-export</v-icon>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
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
</style>
