<template>
  <div>
    <v-row>
      <v-col cols="5">
        <div class="neutral100--text text-dp-md font-weight-semibold">
          Báo Cáo Thống Kê
        </div>
      </v-col>
    </v-row>
    <v-row>
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

<style></style>
