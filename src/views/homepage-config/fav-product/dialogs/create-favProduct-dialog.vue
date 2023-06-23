<template>
  <v-dialog
    v-model="favProductStore.favProductCreateDialog"
    max-width="432px"
    persistent
    absolute
  >
    <v-card class="border-radius-16 pa-4">
      <div class="font-weight-semibold text-lg text-center">
        Thêm sản phẩm tiêu biểu
      </div>

      <div class="mt-6">
        <div class="text-sm font-weight-semibold">Nhập mã truy xuất</div>
        <v-text-field
          class="border-radius-6 mt-2"
          v-model="favProductStore.searchKey"
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
          favProductStore.filteredfavProducts &&
          favProductStore.filteredfavProducts.length > 0 &&
          favProductStore.searchKey
        "
      >
        <div
          class="d-flex flex-column align-center justify-center mx-auto search-panel overflow-scroll"
        >
          <div
            class="full-width"
            v-for="(result, index) in favProductStore.filteredfavProducts"
            :key="index"
          >
            <Card :product="result" />
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
          <div class="text-xl font-weight-semibold">
            Không tìm thấy sản phẩm
          </div>
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
import { favProductStore } from "../store/favProduct-store";
import alert from "@/plugins/alert";

export default {
  components: {
    Card: () => import("../components/product-card.vue"),
  },
  computed: {
    ...mapStores(favProductStore),
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
    //     this.favProductStore.changeCategoryIcon(imageFile);
    //     this.isIconSelected = true;
    //   } else {
    //     this.isIconSelected = false;
    //     console.log("FileReader API not supported!");
    //   }
    // },
    onCancelClicked() {
      this.favProductStore.favProductCreateDialog = false;
      this.favProductStore.searchKey = null;
      this.favProductStore.filteredfavProducts = null;
    },
    onClickSearchCode() {
      if (!this.favProductStore.searchKey) return;
      this.favProductStore.fetchSearchCodes();
    },
    onCreateClicked() {
      if (
        !this.favProductStore.filteredfavProducts[0].code &&
        !this.favProductStore.favProductCodes
      ) {
        alert.error("Không có sản phẩm nào để thêm!");
        return;
      }
      if (
        this.favProductStore.favProductCodes.some((ai) =>
          this.favProductStore.filteredfavProducts[0].code.includes(ai)
        )
      ) {
        alert.error("Sản phẩm đã được thêm, Xin vui lòng chọn sản phẩm khác!");
        return;
      } else if (this.favProductStore.favProductCodes.length >= 4) {
        alert.error("Chỉ được thêm tối đa 4 sản phẩm tiêu biểu!");
        return;
      }

      this.favProductStore.favProductCodes.push(
        this.favProductStore.filteredfavProducts[0].code
      );
      this.favProductStore.updateFavProducts();
      this.favProductStore.favProductCreateDialog = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.search-panel {
  width: 200px !important;
}
</style>
