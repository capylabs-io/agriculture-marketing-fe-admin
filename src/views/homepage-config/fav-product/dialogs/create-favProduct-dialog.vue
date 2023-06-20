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
          placeholder="Ex: NSHL-132219"
          append-icon="mdi-magnify"
          flat
          solo
          outlined
          dense
        ></v-text-field>
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

export default {
  components: {},
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
    },
    async onCreateClicked() {
      await this.favProductStore.createNewCategory();
    },
  },
};
</script>
