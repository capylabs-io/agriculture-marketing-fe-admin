<template>
  <v-navigation-drawer
    v-model="contactStore.drawerDetail"
    fixed
    right
    hide-overlay
    temporary
    width="450px"
    class="drawer pb-6"
    app
  >
    <div class="pa-4 drawer-container d-flex flex-column">
      <v-btn
        icon
        elevation="3"
        @click.stop="contactStore.drawerDetail = false"
        class="mb-6"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <div class="text-dp-sm font-weight-semibold">Chi tiết</div>
      <div class="font-weight-semibold mb-2 mt-6">Họ và tên</div>
      <v-text-field
        readonly
        background-color="neutral10"
        type="text"
        class="border-radius-8"
        v-model="contactStore.contact.name"
        placeholder="Phùng thanh độ"
        solo
        outlined
        dense
        flat
      />
      <div class="font-weight-semibold mb-2 mt-3">Email</div>
      <v-text-field
        readonly
        background-color="neutral10"
        type="text"
        v-model="contactStore.contact.email"
        class="border-radius-8"
        placeholder="Phùng thanh độ"
        solo
        outlined
        dense
        flat
      />
      <div class="font-weight-semibold mb-2 mt-3">Số điện thoại</div>
      <v-text-field
        readonly
        background-color="neutral10"
        type="text"
        v-model="contactStore.contact.phone"
        class="border-radius-8"
        placeholder="Phùng thanh độ"
        solo
        outlined
        dense
        flat
      />
      <div class="font-weight-semibold mb-2 mt-3">Tiêu đề thư</div>
      <v-text-field
        readonly
        background-color="neutral10"
        type="text"
        v-model="contactStore.contact.title"
        class="border-radius-8"
        placeholder="Phùng thanh độ"
        solo
        outlined
        dense
        flat
      />
      <div class="font-weight-semibold mb-2 mt-3">Nội dung</div>
      <v-textarea
        type="text"
        v-model="contactStore.contact.content"
        readonly
        background-color="neutral10"
        class="border-radius-8"
        placeholder="Nội dung"
        :rules="[$rules.required]"
        auto-grow
        flat
        solo
        outlined
      />
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapStores } from "pinia";
import { contactStore } from "../store/contact-store";
// import { get } from "lodash";
export default {
  computed: {
    ...mapStores(contactStore),
    // categoryIcon() {
    //   return get(
    //     this.contactStore,
    //     "detailCard.campaignCategory.iconUrl",
    //     require("@/assets/views/category/category-icon-example.png")
    //   );
    // },
  },
  data() {
    return {
      index: 0,
    };
  },
  // methods: {
  //   increase() {
  //     var number = this.contactStore.detailCard.attributes.quantity;
  //     number++;
  //     this.contactStore.detailCard.attributes.quantity = number + "";
  //   },
  //   decrease() {
  //     var number = this.contactStore.detailCard.attributes.quantity;
  //     number--;
  //     this.contactStore.detailCard.attributes.quantity = number + "";
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.drawer-content {
  overflow-x: hidden;
  overflow-y: auto;
}
.status {
  z-index: 99;
}
.drawer-icon {
  border-radius: 100px;
  width: 40px;
  height: 40px;
}

.draw-text {
  height: 400px;
  overflow-y: auto;
}
.col-gap-10 {
  column-gap: 10px;
}
.btn-arrow {
  position: absolute;
  background-color: white;
  z-index: 99;
}
.number {
  background: #d0dbf4;
  width: 50px;
  height: 30px;
}
.drawer {
  z-index: 99;
}
.drawer-container {
}
.amount-container {
  position: sticky;
  bottom: 0;
  right: 0;
}
.drawer-btn {
  position: sticky;
  bottom: 0;
  right: 0;
  width: 100%;
  margin-top: 20px;
}
.unpurchased {
  background: #5752e3;
  padding: 4px, 16px, 4px, 16px;
}
.disable {
}
</style>
