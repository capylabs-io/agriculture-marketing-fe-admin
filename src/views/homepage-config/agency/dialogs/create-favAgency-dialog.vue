<template>
  <v-dialog
    v-model="favAgencyStore.favAgencyCreateDialog"
    max-width="432px"
    persistent
    absolute
  >
    <v-card class="border-radius-16 pa-4">
      <div class="font-weight-semibold text-lg text-center">
        Thêm Đại lý tiêu biểu
      </div>

      <div class="mt-6">
        <div class="text-sm font-weight-semibold">Nhập mã truy xuất</div>
        <v-text-field
          class="border-radius-6 mt-2"
          v-model="favAgencyStore.searchKey"
          placeholder="Ex: NSHL-132219"
          flat
          solo
          outlined
          dense
        >
          <template v-slot:append>
            <div
              class="append-btn border-radius-6 pa-3 mr-n2 cursor-pointer"
              @click="onClickSearchCode"
            >
              <v-icon color="black"> mdi-magnify </v-icon>
            </div>
          </template>
        </v-text-field>
      </div>
      <div
        class="d-flex align-center justify-center mx-auto search-panel"
        v-if="
          favAgencyStore.filteredfavAgencys &&
          favAgencyStore.filteredfavAgencys.length > 0 &&
          favAgencyStore.searchKey
        "
      >
        <div
          class="d-flex flex-column align-center justify-center mx-auto search-panel overflow-scroll"
        >
          <div
            class="full-width"
            v-for="(result, index) in favAgencyStore.filteredfavAgencys"
            :key="index"
          >
            <Card :agency="result" />
          </div>
        </div>
      </div>

      <div class="mt-8" v-else>
        <div class="d-flex flex-column align-center justify-center mt-12">
          <v-img
            max-width="160"
            height="162"
            :src="require('@/assets/search-not-found.png')"
            cover
          ></v-img>
          <div class="text-xl font-weight-semibold">Không tìm thấy</div>
        </div>
      </div>
      <div class="d-flex justify-space-between align-center mt-6">
        <div></div>
        <div class="d-flex align-center">
          <v-btn
            class="text-none border-radius-8 px-2 mr-2 white-bg neutral20-border"
            elevation="0"
            @click="onCancelClicked"
            dense
          >
            Hủy
          </v-btn>
          <v-btn
            class="text-none border-radius-8 px-2"
            color="primary"
            elevation="0"
            @click="onCreateClicked"
            dense
          >
            Thêm
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.upload-container {
  position: relative;
}
.upload-text {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  margin: auto;
  transform: translateY(-50%);
}
</style>

<script>
import { mapStores } from "pinia";
import { favAgencyStore } from "../store/favAgency-store";
import alert from "@/plugins/alert";

export default {
  components: {
    Card: () => import("../components/agency-card.vue"),
  },
  computed: {
    ...mapStores(favAgencyStore),
  },
  data() {
    return {
      createDialog: true,
      image: null,
      isIconSelected: false,
    };
  },
  methods: {
    // onIconSelect(image) {
    //   if (image) {
    //     const imageFile = this.$refs.pictureInput.file;
    //     this.favAgencyStore.changeCategoryIcon(imageFile);
    //     this.isIconSelected = true;
    //   } else {
    //     this.isIconSelected = false;
    //     console.log("FileReader API not supported!");
    //   }
    // },
    onCancelClicked() {
      this.favAgencyStore.favAgencyCreateDialog = false;
      this.favAgencyStore.searchKey = "";
      this.favAgencyStore.filteredfavAgencys = [];
    },
    onClickSearchCode() {
      if (!this.favAgencyStore.searchKey) return;
      this.favAgencyStore.fetchfavAgencys();
    },
    async onCreateClicked() {
      if (
        !this.favAgencyStore.filteredfavAgencys[0].code &&
        !this.favAgencyStore.favAgencyCodes
      ) {
        alert.error("Không có đại lý nào để thêm!");
        return;
      }
      if (
        this.favAgencyStore.favAgencyCodes.some((ai) =>
          this.favAgencyStore.filteredfavAgencys[0].code.includes(ai)
        )
      ) {
        alert.error(
          "đại lý đã được thêm, Xin vui lòng chọn đại lý khác!"
        );
        return;
      } else if (this.favAgencyStore.favAgencyCodes.length >= 4) {
        alert.error("Chỉ được thêm tối đa 4 đại lý tiêu biểu!");
        return;
      }

      this.favAgencyStore.favAgencyCodes.push(
        this.favAgencyStore.filteredfavAgencys[0].code
      );
      await this.favAgencyStore.updatefavAgencys();
      this.favAgencyStore.searchKey = "";
      this.favAgencyStore.filteredfavAgencys = [];
      this.favAgencyStore.favAgencyCreateDialog = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.search-panel {
  width: 200px !important;
}
</style>
