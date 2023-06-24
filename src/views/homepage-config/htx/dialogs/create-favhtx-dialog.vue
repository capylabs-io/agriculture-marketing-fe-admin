<template>
  <v-dialog
    v-model="favhtxStore.favhtxCreateDialog"
    max-width="432px"
    persistent
    absolute
  >
    <v-card class="border-radius-16 pa-4">
      <div class="font-weight-semibold text-lg text-center">
        Thêm Hợp tác xã tiêu biểu
      </div>

      <div class="mt-6">
        <div class="text-sm font-weight-semibold">Nhập mã truy xuất</div>
        <v-text-field
          class="border-radius-6 mt-2"
          v-model="favhtxStore.searchKey"
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
          favhtxStore.filteredfavhtxs &&
          favhtxStore.filteredfavhtxs.length > 0 &&
          favhtxStore.searchKey
        "
      >
        <div
          class="d-flex flex-column align-center justify-center mx-auto search-panel overflow-scroll"
        >
          <div
            class="full-width"
            v-for="(result, index) in favhtxStore.filteredfavhtxs"
            :key="index"
          >
            <Card :htx="result" />
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
import { favhtxStore } from "../store/favhtx-store";
import alert from "@/plugins/alert";

export default {
  components: {
    Card: () => import("../components/htx-card.vue"),
  },
  computed: {
    ...mapStores(favhtxStore),
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
    //     this.favhtxStore.changeCategoryIcon(imageFile);
    //     this.isIconSelected = true;
    //   } else {
    //     this.isIconSelected = false;
    //     console.log("FileReader API not supported!");
    //   }
    // },
    onCancelClicked() {
      this.favhtxStore.favhtxCreateDialog = false;
      this.favhtxStore.searchKey = "";
      this.favhtxStore.filteredfavhtxs = [];
    },
    onClickSearchCode() {
      if (!this.favhtxStore.searchKey) return;
      this.favhtxStore.fetchfavhtxs();
    },
    async onCreateClicked() {
      if (
        !this.favhtxStore.filteredfavhtxs[0].code &&
        !this.favhtxStore.favhtxCodes
      ) {
        alert.error("Không có hợp tác xã nào để thêm!");
        return;
      }
      if (
        this.favhtxStore.favhtxCodes.some((ai) =>
          this.favhtxStore.filteredfavhtxs[0].code.includes(ai)
        )
      ) {
        alert.error(
          "Hợp tác xã đã được thêm, Xin vui lòng chọn hợp tác xã khác!"
        );
        return;
      } else if (this.favhtxStore.favhtxCodes.length >= 4) {
        alert.error("Chỉ được thêm tối đa 4 hợp tác xã tiêu biểu!");
        return;
      }

      this.favhtxStore.favhtxCodes.push(
        this.favhtxStore.filteredfavhtxs[0].code
      );
      await this.favhtxStore.updatefavhtxs();
      this.favhtxStore.searchKey = "";
      this.favhtxStore.filteredfavhtxs = [];
      this.favhtxStore.favhtxCreateDialog = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.search-panel {
  width: 200px !important;
}
</style>
